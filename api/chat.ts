import {
  buildRoomEstimate,
  buildSystemPrompt,
  extractDimensions,
  findService,
  type LeadContext,
} from "../artifacts/jk-interior/src/lib/business-data.js"
import { SERVICES_SUMMARY } from "../artifacts/jk-interior/src/lib/services-summary.js"
import {
  type ConversationMemory,
  extractFromText,
  mergeMemory,
  sanitizeMemory,
  updateStage,
  summarizeForPrompt,
} from "../artifacts/jk-interior/src/lib/memory.js"
import { resolveReplyLanguage, type ReplyLanguage } from "../artifacts/jk-interior/src/lib/reply-language.js"

// Vercel Node.js serverless function — no framework, no extra deps (uses global fetch).
// Talks to Groq's OpenAI-compatible chat completions API.
//
// `process` is a Node.js runtime global; declared locally instead of pulling in
// @types/node so this file has zero new dependencies to resolve at build time.
declare const process: { env: Record<string, string | undefined> }

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
// The system prompt is a long block of website data and the whole value of this
// assistant is that it stays inside it. A small/distilled model was measurably
// faster but drifted — inventing rates, answering in English when the visitor
// wrote Hindi, and re-asking for details already in memory. A larger model
// follows the grounding rules reliably and, on Groq's LPUs with streaming on,
// still starts replying in well under a second.
//
// Groq deprecated llama-3.3-70b-versatile (and llama-3.1-8b-instant) for
// free/developer-tier usage in June 2026 — every call to this endpoint started
// failing with a 404 model_not_found until this was updated. openai/gpt-oss-120b
// is Groq's own recommended replacement for the 70b-class model, and is kept as
// the automatic fallback below. Check https://console.groq.com/docs/deprecations
// before pinning a specific model long-term, since Groq has done this before.
//
// `groq/compound` is the primary model: it is openai/gpt-oss-120b underneath,
// but decides on its own, per message, whether to run a real web search before
// answering — so a plain "Hi" or a rate question stays just as fast (no tool
// call triggered), while a question the WEBSITE DATA block can't answer (a
// material comparison, "what's trending in 2026", general upkeep advice) comes
// back with real, current information instead of the model's frozen training
// data or a flat "can't confirm that here." Same endpoint, same API key, no new
// dependency. Set GROQ_MODEL / GROQ_FALLBACK_MODEL to override either.
const GROQ_MODEL = process.env.GROQ_MODEL || "groq/compound"
const GROQ_FALLBACK_MODEL = process.env.GROQ_FALLBACK_MODEL || "openai/gpt-oss-120b"

/** How long to wait for Groq's first byte, and how long a silent stream may stall. */
const UPSTREAM_TIMEOUT_MS = 20_000

type ConvMsg = { role: "user" | "assistant"; content: string }

// ─── Rate limiting ───────────────────────────────────────────────────────────
//
// /api/chat is open to the internet and every call costs tokens. A per-IP
// bucket in module scope survives for the life of a warm lambda, which is enough
// to stop a single browser (or a scraper) hammering it; it is deliberately not a
// distributed limiter, just a cheap ceiling.

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 20
const hits = new Map<string, number[]>()

function clientIp(req: any): string {
  const forwarded = req.headers?.["x-forwarded-for"]
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return String(raw || req.headers?.["x-real-ip"] || "unknown").split(",")[0].trim()
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  // Keep the map from growing without bound on a long-lived warm lambda.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key)
    }
  }
  return recent.length > RATE_LIMIT_MAX
}

// ─── Request parsing ─────────────────────────────────────────────────────────

async function readBody(req: any): Promise<any> {
  if (req.body && typeof req.body === "object") return req.body
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body) } catch { return {} }
  }
  let raw = ""
  for await (const chunk of req) raw += chunk
  try { return JSON.parse(raw) } catch { return {} }
}

/**
 * The last eight turns, with the message currently being answered removed.
 *
 * The widget appends the visitor's message to its own history before posting, so
 * the same text used to arrive twice — once in `history`, once as `message` — and
 * the model saw the customer say everything twice.
 */
function readHistory(raw: unknown, currentMessage: string): ConvMsg[] {
  if (!Array.isArray(raw)) return []
  const cleaned: ConvMsg[] = raw
    .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m: ConvMsg) => ({ role: m.role, content: m.content.slice(0, 1000) }))

  const last = cleaned[cleaned.length - 1]
  if (last && last.role === "user" && last.content.trim() === currentMessage.trim()) cleaned.pop()

  return cleaned.slice(-8)
}

/**
 * When the visitor's message carries a room size, work the estimate out here and
 * hand the model finished figures.
 *
 * Language models multiply badly, and a wrong total on what reads like a
 * quotation is the worst failure this assistant has. `buildRoomEstimate` uses the
 * same published rate band the service cards render, so the numbers in the chat
 * and the numbers on the page cannot disagree.
 */
function groundedEstimateFor(message: string, memory: ConversationMemory): string | undefined {
  const dims = extractDimensions(message)
  if (!dims) return undefined

  const named = findService(message) ?? (memory.preferredMaterial ? findService(memory.preferredMaterial) : null)
  if (named) return buildRoomEstimate(dims.length, dims.width, named)

  // No material named yet — price both ceilings the site lists rather than
  // picking one on the visitor's behalf.
  const ceilings = SERVICES_SUMMARY.filter((s) => s.slug === "gypsum-ceiling" || s.slug === "pvc-false-ceiling")
  if (ceilings.length === 0) return undefined
  return ceilings.map((s) => buildRoomEstimate(dims.length, dims.width, s, { disclaimer: false })).join("\n\n")
}

/**
 * Reads Groq's SSE stream and writes each token's delta text straight to the
 * client as it arrives (plain text, no JSON envelope) — the chat widget already
 * knows how to consume this (see getAIReply's text/plain branch in jk-chat.tsx).
 * Streaming shaves the perceived wait from "one long pause" to "reply starts
 * typing almost immediately," which is most of what makes the assistant feel fast.
 */
async function pipeGroqStream(
  groqRes: Response,
  res: any,
  servedByModel: string,
  recover?: () => Promise<string | null>,
): Promise<string> {
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    "X-Content-Type-Options": "nosniff",
  })

  const reader = groqRes.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ""
  let fullText = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split("\n")
    buffer = lines.pop() ?? ""
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith("data:")) continue
      const payload = trimmed.slice(5).trim()
      if (payload === "[DONE]") continue
      try {
        const parsed = JSON.parse(payload)
        const delta: string | undefined = parsed?.choices?.[0]?.delta?.content
        if (delta) {
          fullText += delta
          res.write(delta)
        }
      } catch (parseErr) {
        // Ignore partial/malformed SSE frames — the buffer above re-joins them
        // next read. Logged (not thrown) because a frame that never rejoins
        // cleanly would otherwise fail completely silently.
        console.error("Groq stream: unparsable SSE frame", parseErr, payload.slice(0, 200))
      }
    }
  }

  // An empty stream is exactly what makes the widget fall back to its offline
  // reply while looking, from the outside, like nothing went wrong. Headers are
  // already sent as 200 text/plain, but nothing has been written to the body
  // yet in this case — so there's still time to recover with a second model
  // before ending the response, rather than shipping an empty reply.
  if (!fullText) {
    console.error(`Groq stream (model=${servedByModel}) completed with no content — check for a tool-only turn or an upstream content filter.`)
    if (recover) {
      const recovered = await recover().catch((err) => {
        console.error("Groq stream recovery request failed", err)
        return null
      })
      if (recovered) {
        res.write(recovered)
        fullText = recovered
      } else {
        console.error("Groq stream recovery also produced no content")
      }
    }
  }

  res.end()
  return fullText
}

/**
 * Groq's 8,000 TPM free-tier cap is easy to hit with this app's system
 * prompt — a single turn can run close to 4,000 tokens on its own. Groq's
 * 429 body names how long to wait (e.g. "Please try again in 2.7s"), so one
 * short retry recovers a burst that would otherwise drop straight to the
 * widget's offline fallback for no real reason.
 */
async function fetchGroqOnce(payload: object, apiKey: string): Promise<Response> {
  const doFetch = () =>
    fetch(GROQ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })

  const first = await doFetch()
  if (first.status !== 429) return first

  const errText = await first.text().catch(() => "")
  const waitMatch = errText.match(/try again in ([\d.]+)s/i)
  const waitMs = Math.min(Math.max(Number(waitMatch?.[1]) * 1000 || 1500, 500), 4000)
  await new Promise((resolve) => setTimeout(resolve, waitMs))
  return doFetch()
}

/**
 * Tries `groq/compound` first, then falls back to the plain model if the
 * account/region doesn't have compound access (404/400) or the request
 * otherwise fails outright. This only re-fetches before anything has been
 * written to the client, so it's safe to do even on the streaming path.
 *
 * Returns which model actually answered alongside the response, so callers
 * can tell a genuinely fresh retry (a different model) from a pointless one
 * (the same model that already answered) when recovering from empty content.
 */
async function fetchGroqWithRetry(
  payload: { model: string; [key: string]: unknown },
  apiKey: string,
): Promise<{ res: Response; model: string }> {
  const primary = await fetchGroqOnce(payload, apiKey)
  if (primary.ok || payload.model === GROQ_FALLBACK_MODEL) return { res: primary, model: payload.model }

  return { res: await fetchGroqOnce({ ...payload, model: GROQ_FALLBACK_MODEL }, apiKey), model: GROQ_FALLBACK_MODEL }
}

/**
 * A plain, non-streaming completion against a specific model — used to recover
 * a reply when the streaming or primary call came back with nothing usable.
 * Compound systems occasionally spend their whole turn on tool orchestration
 * and leave no room for the actual answer; one retry against a different,
 * non-agentic model is far more likely to just answer than repeating the same
 * request against the same model that already came back empty.
 */
async function fetchPlainReply(basePayload: object, model: string, apiKey: string): Promise<string | null> {
  const res = await fetchGroqOnce({ ...basePayload, model, stream: false }, apiKey)
  if (!res.ok) {
    const errText = await res.text().catch(() => "")
    console.error("Groq recovery fetch failed", model, res.status, errText.slice(0, 300))
    return null
  }
  const data = await res.json().catch(() => null)
  const reply: string | undefined = data?.choices?.[0]?.message?.content?.trim()
  return reply || null
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" })
    return
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    // No key configured yet — client gracefully falls back to the local script.
    res.status(200).json({ ok: false, error: "AI backend not configured" })
    return
  }

  if (isRateLimited(clientIp(req))) {
    // 200 + ok:false, like every other failure here, so the widget shows its
    // offline reply (the published rates and the phone numbers) instead of an error.
    res.status(200).json({ ok: false, error: "Too many requests" })
    return
  }

  const wantsStream = typeof req.url === "string" && /[?&]stream=1\b/.test(req.url)

  try {
    const body = await readBody(req)
    const message: string = String(body.message || "").slice(0, 2000).trim()
    if (!message) {
      res.status(400).json({ ok: false, error: "Empty message" })
      return
    }

    const history = readHistory(body.history, message)

    const leadContext: Partial<LeadContext> = body.leadContext && typeof body.leadContext === "object" ? body.leadContext : {}
    const clientMemory = sanitizeMemory(body.memory)

    const userUpdates = extractFromText(message, clientMemory, "user")
    const merged = mergeMemory(clientMemory, userUpdates, true)
    merged.stage = updateStage(merged)
    // Sticky per conversation: a visitor who wrote Hindi and then types just
    // "12x14" is still owed a Hindi reply.
    const replyLanguage: ReplyLanguage = resolveReplyLanguage(message, merged.language)
    merged.language = replyLanguage

    const systemPrompt = buildSystemPrompt({
      ...leadContext,
      memorySummary: summarizeForPrompt(merged),
      replyLanguage,
      groundedEstimate: groundedEstimateFor(message, merged),
    })

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ]

    // Kept separate from the request payload so a recovery retry (a plain,
    // non-streaming call against a different model) can reuse the same
    // messages/temperature without re-threading them through every call site.
    const basePayload = {
      messages,
      // Low temperature on purpose: the system prompt is a fixed block of
      // website data and the reply has to stay inside it. Sampling loosely is
      // what produced invented rates and services people never asked about.
      temperature: 0.3,
      // Compound systems spend some of this budget on tool orchestration
      // (deciding whether to search, framing the query) before any of it
      // reaches the visible reply — 500 was tight enough that a turn could
      // exhaust it on that scaffolding alone and stream back nothing.
      max_tokens: 700,
    }

    const { res: groqRes, model: servedByModel } = await fetchGroqWithRetry(
      { model: GROQ_MODEL, ...basePayload, stream: wantsStream },
      apiKey,
    )

    if (!groqRes.ok) {
      const errText = await groqRes.text().catch(() => "")
      console.error("Groq API error", groqRes.status, errText.slice(0, 500))
      res.status(200).json({ ok: false, error: "AI upstream error" })
      return
    }

    // A genuinely different second model is worth one recovery attempt; retrying
    // the exact model that just answered empty is unlikely to do anything but
    // burn another request.
    const recoveryModel = servedByModel === GROQ_FALLBACK_MODEL ? undefined : GROQ_FALLBACK_MODEL

    // Streaming path: pipe tokens to the client as plain text as they arrive.
    // Response is already sent (text/plain) once this resolves — memory/context
    // extraction for streamed replies happens client-side, so nothing more to do.
    if (wantsStream && groqRes.body) {
      await pipeGroqStream(
        groqRes,
        res,
        servedByModel,
        recoveryModel ? () => fetchPlainReply(basePayload, recoveryModel, apiKey) : undefined,
      )
      return
    }

    const data = await groqRes.json()
    let reply: string | undefined = data?.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      // Groq returned 200 with nothing usable in it — logged because this is
      // exactly the case that otherwise looks, from the widget's offline
      // fallback, indistinguishable from "the AI backend is fine but chose not
      // to answer."
      console.error(`Groq reply (model=${servedByModel}) had no content`, JSON.stringify(data).slice(0, 500))
      if (recoveryModel) reply = (await fetchPlainReply(basePayload, recoveryModel, apiKey)) ?? undefined
    }

    if (!reply) {
      res.status(200).json({ ok: false, error: "Empty AI reply" })
      return
    }

    const botUpdates = extractFromText(reply, merged, "bot")
    const finalMemory = mergeMemory(merged, botUpdates)
    finalMemory.stage = updateStage(finalMemory)
    const activeRoom = finalMemory.rooms.find((r) => r.name === finalMemory.currentRoom)

    res.status(200).json({
      ok: true,
      reply,
      source: "groq",
      updatedContext: {
        roomSize: activeRoom?.size,
        lastTopic: finalMemory.currentRoom,
        city: finalMemory.city,
        service: finalMemory.preferredMaterial,
        conversationStage: finalMemory.stage,
        language: finalMemory.language,
      },
    })
  } catch (err) {
    console.error("api/chat error", err)
    if (!res.headersSent) res.status(200).json({ ok: false, error: "Internal error" })
    else res.end()
  }
}

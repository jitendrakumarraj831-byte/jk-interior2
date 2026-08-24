import { buildSystemPrompt, type LeadContext } from "../artifacts/jk-interior/src/lib/business-data.js"
import {
  type ConversationMemory,
  createMemory,
  extractFromText,
  mergeMemory,
  updateStage,
  summarizeForPrompt,
} from "../artifacts/jk-interior/src/lib/memory.js"

// Vercel Node.js serverless function — no framework, no extra deps (uses global fetch).
// Talks to Groq's OpenAI-compatible chat completions API.
//
// `process` is a Node.js runtime global; declared locally instead of pulling in
// @types/node so this file has zero new dependencies to resolve at build time.
declare const process: { env: Record<string, string | undefined> }

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
// llama-3.1-8b-instant trades a little reasoning depth for roughly 3-4x lower
// per-token latency on Groq's LPUs than the 70b model — for short, templated
// interior-pricing replies the smaller model's answers are indistinguishable
// while the reply starts appearing noticeably faster.
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant"

type ConvMsg = { role: "user" | "assistant"; content: string }

function readMemory(raw: unknown): ConversationMemory {
  const base = createMemory()
  if (!raw || typeof raw !== "object") return base
  return { ...base, ...(raw as Partial<ConversationMemory>), rooms: Array.isArray((raw as any).rooms) ? (raw as any).rooms : base.rooms }
}

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
 * Reads Groq's SSE stream and writes each token's delta text straight to the
 * client as it arrives (plain text, no JSON envelope) — the chat widget already
 * knows how to consume this (see getAIReply's text/plain branch in jk-chat.tsx).
 * Streaming shaves the perceived wait from "one long pause" to "reply starts
 * typing almost immediately," which is most of what makes the assistant feel fast.
 */
async function pipeGroqStream(groqRes: Response, res: any): Promise<string> {
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
      } catch {
        // Ignore partial/malformed SSE frames — the buffer above re-joins them next read.
      }
    }
  }

  res.end()
  return fullText
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

  const wantsStream = typeof req.url === "string" && /[?&]stream=1\b/.test(req.url)

  try {
    const body = await readBody(req)
    const message: string = String(body.message || "").slice(0, 2000).trim()
    if (!message) {
      res.status(400).json({ ok: false, error: "Empty message" })
      return
    }

    const history: ConvMsg[] = Array.isArray(body.history)
      ? body.history
          .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
          .slice(-8)
          .map((m: ConvMsg) => ({ role: m.role, content: m.content.slice(0, 1000) }))
      : []

    const leadContext: Partial<LeadContext> = body.leadContext && typeof body.leadContext === "object" ? body.leadContext : {}
    const clientMemory = readMemory(body.memory)

    const userUpdates = extractFromText(message, clientMemory, "user")
    const merged = mergeMemory(clientMemory, userUpdates, true)
    merged.stage = updateStage(merged)

    const systemPrompt = buildSystemPrompt({ ...leadContext, memorySummary: summarizeForPrompt(merged) })

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ]

    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        // Low temperature on purpose: the system prompt is a fixed block of
        // website data and the reply has to stay inside it. Sampling loosely is
        // what produced invented rates and services people never asked about.
        temperature: 0.3,
        max_tokens: 500,
        stream: wantsStream,
      }),
      signal: AbortSignal.timeout(15000),
    })

    if (!groqRes.ok) {
      const errText = await groqRes.text().catch(() => "")
      console.error("Groq API error", groqRes.status, errText.slice(0, 500))
      res.status(200).json({ ok: false, error: "AI upstream error" })
      return
    }

    // Streaming path: pipe tokens to the client as plain text as they arrive.
    // Response is already sent (text/plain) once this resolves — memory/context
    // extraction for streamed replies happens client-side, so nothing more to do.
    if (wantsStream && groqRes.body) {
      await pipeGroqStream(groqRes, res)
      return
    }

    const data = await groqRes.json()
    const reply: string | undefined = data?.choices?.[0]?.message?.content?.trim()

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
      },
    })
  } catch (err) {
    console.error("api/chat error", err)
    if (!res.headersSent) res.status(200).json({ ok: false, error: "Internal error" })
    else res.end()
  }
}

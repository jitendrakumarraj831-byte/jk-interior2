import { buildSystemPrompt, type LeadContext } from "../artifacts/jk-interior/src/lib/business-data"
import {
  type ConversationMemory,
  createMemory,
  extractFromText,
  mergeMemory,
  updateStage,
  summarizeForPrompt,
} from "../artifacts/jk-interior/src/lib/memory"

// Vercel Node.js serverless function — no framework, no extra deps (uses global fetch).
// Talks to Groq's OpenAI-compatible chat completions API.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile"

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
        temperature: 0.6,
        max_tokens: 500,
      }),
      signal: AbortSignal.timeout(15000),
    })

    if (!groqRes.ok) {
      const errText = await groqRes.text().catch(() => "")
      console.error("Groq API error", groqRes.status, errText.slice(0, 500))
      res.status(200).json({ ok: false, error: "AI upstream error" })
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
    res.status(200).json({ ok: false, error: "Internal error" })
  }
}

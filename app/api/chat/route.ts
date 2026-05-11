import { NextResponse } from "next/server"
import { z } from "zod"
import { buildSystemPrompt, detectIntent, MATERIAL_KNOWLEDGE, COMPARISONS, FAQ, formatPriceEstimate, parseMultiRoomQuery, generateMultiRoomEstimate } from "@/lib/business-data"
import { consultantReply, detectCity, detectService, detectIntent as detectIntentFull, ConversationContext } from "@/lib/consultant-engine"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(3000),
})

const ChatSchema = z.object({
  message: z.string().min(1).max(1500),
  history: z.array(MessageSchema).max(24).optional().default([]),
  leadContext: z
    .object({
      name:     z.string().optional(),
      phone:    z.string().optional(),
      city:     z.string().optional(),
      service:  z.string().optional(),
      budget:   z.string().optional(),
      roomSize: z.string().optional(),
    })
    .optional(),
})

// ── In-memory rate limiter (resets on cold start) ──────────────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 25) return false
  entry.count++
  return true
}

// ── Gemini API call via Replit integration proxy ───────────────────────────
async function callGemini(
  systemPrompt: string,
  history: { role: string; content: string }[],
  currentMessage: string,
  apiKey: string,
  baseUrl: string
): Promise<string> {
  // Replit integration proxy pattern:
  // baseUrl = http://localhost:1106/modelfarm/gemini
  // full URL = {baseUrl}/models/{model}:generateContent?key={apiKey}   (NO /v1beta/)
  const model = "gemini-2.5-flash"
  const url = `${baseUrl}/models/${model}:generateContent?key=${apiKey}`

  // Build Gemini-format conversation (must alternate user/model, end with user)
  const contents: { role: string; parts: { text: string }[] }[] = []

  // Use last 16 messages for context (Gemini context window)
  for (const msg of history.slice(-16)) {
    contents.push({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })
  }
  contents.push({ role: "user", parts: [{ text: currentMessage }] })

  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: {
      maxOutputTokens: 800,
      temperature: 0.75,
      topP: 0.9,
      topK: 40,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH",        threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",  threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT",  threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ],
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 12000)

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(`Gemini ${res.status}: ${JSON.stringify(errData)}`)
    }

    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) throw new Error("Empty Gemini response")
    return text.trim()
  } catch (err) {
    clearTimeout(timeout)
    throw err
  }
}

// ── Smart local fallback using consultant engine ──────────────────────────
function smartFallback(message: string, leadCtx?: { name?: string; service?: string; city?: string }): string {
  const ctx: ConversationContext = {
    name: leadCtx?.name,
    city: leadCtx?.city,
    service: leadCtx?.service,
    messagesExchanged: 0,
  }

  const reply = consultantReply(message, ctx)
  if (reply) return reply

  // Ultimate fallback
  const nm = leadCtx?.name || ""
  return nm
    ? `${nm}, room ka size bata dijiye (jaise 12×14) aur kaunsa kaam chahiye — main abhi estimate nikaalta hoon! 📐`
    : `Room ka size bata dijiye (jaise 10×12 ya 12×14) aur ceiling ya wall paneling? Estimate abhi nikaaluun! 😊`
}

function isOffHours(): boolean {
  const istH = new Date(Date.now() + 5.5 * 3600000).getUTCHours()
  return istH >= 21 || istH < 9
}

// ── POST /api/chat ──────────────────────────────────────────────────────────
export async function POST(req: Request) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a moment." },
      { status: 429 }
    )
  }

  // Parse body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = ChatSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid request", issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { message, history, leadContext } = parsed.data

  // Detect intent for logging / augmentation
  const intent = detectIntent(message)
  console.log(`[/api/chat] intent=${intent} msg="${message.slice(0, 60)}"`)

  // Check API key — Replit integration uses AI_INTEGRATIONS_GEMINI_API_KEY
  const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY ?? process.env.GEMINI_API_KEY
  const baseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL ?? "https://generativelanguage.googleapis.com"

  if (!apiKey || apiKey === "") {
    // Use smart local fallback instead of returning error
    const fallback = smartFallback(message, leadContext)
    return NextResponse.json({ ok: true, reply: fallback, source: "local" })
  }

  // Build system prompt with lead context + intent hint
  const systemPrompt = buildSystemPrompt(leadContext)

  // Normalise history
  const safeHistory = history.map(m => ({
    role: (m.role ?? "user") as string,
    content: m.content ?? "",
  }))

  // Call Gemini
  let reply: string
  try {
    reply = await callGemini(systemPrompt, safeHistory, message, apiKey, baseUrl)
  } catch (err) {
    console.error("[/api/chat] Gemini call failed:", err)
    // Smart local fallback — never leave user with an error
    const fallback = smartFallback(message, leadContext)
    return NextResponse.json({ ok: true, reply: fallback, source: "local" })
  }

  return NextResponse.json({ ok: true, reply, source: "gemini" })
}

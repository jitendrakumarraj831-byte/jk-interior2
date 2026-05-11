import { NextResponse } from "next/server"
import { z } from "zod"
import { buildSystemPrompt } from "@/lib/business-data"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
})

const ChatSchema = z.object({
  message: z.string().min(1).max(1000),
  history: z.array(MessageSchema).max(20).optional().default([]),
  leadContext: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
      city: z.string().optional(),
      service: z.string().optional(),
    })
    .optional(),
})

// Simple in-memory rate limiter (resets on cold start — sufficient for this scale)
const rateMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 20) return false
  entry.count++
  return true
}

// Gemini REST API call
async function callGemini(
  systemPrompt: string,
  history: { role: string; content: string }[],
  currentMessage: string,
  apiKey: string
): Promise<string> {
  const model = "gemini-2.5-flash"
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  // Build Gemini-format conversation (must alternate user/model, end with user)
  const contents: { role: string; parts: { text: string }[] }[] = []
  for (const msg of history.slice(-12)) {
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
      maxOutputTokens: 380,
      temperature: 0.82,
      topP: 0.92,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ],
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

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

  // Check API key
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    // Return signal to client to use local fallback
    return NextResponse.json({ ok: false, error: "AI_UNAVAILABLE" }, { status: 503 })
  }

  // Build system prompt with lead context
  const systemPrompt = buildSystemPrompt(leadContext)

  // Normalise history (Zod v4 may infer optional fields on parsed arrays)
  const safeHistory = history.map(m => ({
    role: (m.role ?? "user") as string,
    content: m.content ?? "",
  }))

  // Call Gemini with retry
  let reply: string
  try {
    reply = await callGemini(systemPrompt, safeHistory, message, apiKey)
  } catch (err) {
    console.error("[/api/chat] Gemini call failed:", err)
    // Return signal to use local fallback
    return NextResponse.json({ ok: false, error: "AI_UNAVAILABLE" }, { status: 503 })
  }

  return NextResponse.json({ ok: true, reply })
}

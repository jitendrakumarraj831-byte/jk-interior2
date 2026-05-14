/**
 * JK Interior — /api/chat Route v3.0
 * ────────────────────────────────────
 * Clean API endpoint:
 * - Input validation + typo normalization
 * - Gemini AI call with timeout safety
 * - Smart local fallback (never blank)
 * - Structured JSON response
 * - Rate limiting
 * - Detailed logging
 */

import { NextResponse } from "next/server"
import { z } from "zod"
import { buildSystemPrompt } from "@/lib/business-data"
import {
  consultantReply,
  detectCity,
  detectService,
  detectIntent,
  detectRoomType,
  normalizeTypos,
  isOffHours,
  type ConversationContext,
} from "@/lib/consultant-engine"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// ─── Request Schema ────────────────────────────────────────────────────────────

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(3000),
})

const ChatSchema = z.object({
  message: z.string().min(1).max(1500),
  history: z.array(MessageSchema).max(24).optional().default([]),
  leadContext: z.object({
    name:       z.string().optional(),
    phone:      z.string().optional(),
    city:       z.string().optional(),
    service:    z.string().optional(),
    budget:     z.enum(["low", "mid", "high"]).optional(),
    roomSize:   z.string().optional(),
    lastTopic:  z.string().optional(),
    lastIntent: z.string().optional(),
  }).optional(),
})

type ChatRequest = z.infer<typeof ChatSchema>

// ─── Structured response ───────────────────────────────────────────────────────

function ok(reply: string, source: "gemini" | "local"): NextResponse {
  return NextResponse.json({ ok: true, reply, source })
}

function err(message: string, status: number): NextResponse {
  return NextResponse.json({ ok: false, error: message }, { status })
}

// ─── Rate limiter ──────────────────────────────────────────────────────────────

const rateMap = new Map<string, { count: number; resetAt: number }>()

function checkRate(ip: string, limit = 25, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

// ─── Gemini API ────────────────────────────────────────────────────────────────

// ─── Groq API ───────────────────────────────────────────────────────────────
async function callGroq(
  systemPrompt: string,
  history: { role: string; content: string }[],
  message: string,
  apiKey: string,
  timeoutMs = 12_000
): Promise<string> {

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },

        signal: controller.signal,

        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",
              content: systemPrompt,
            },

            ...history.map((m) => ({
              role:
                m.role === "assistant"
                  ? "assistant"
                  : "user",

              content: m.content,
            })),

            {
              role: "user",
              content: message,
            },
          ],

          temperature: 0.7,
          max_tokens: 700,
        }),
      }
    )

    clearTimeout(timer)

    if (!res.ok) {
      const bodyText = await res.text()

      console.error("Groq API Error:", {
        status: res.status,
        body: bodyText,
      })

      throw new Error(
        `Groq HTTP ${res.status}: ${bodyText}`
      )
    }

    const data = await res.json()

    const text =
      data?.choices?.[0]?.message?.content

    if (!text?.trim()) {
      throw new Error(
        "Groq returned empty response"
      )
    }

    return text.trim()

  } catch (e) {

    clearTimeout(timer)
    throw e
  }
}

// ─── Smart local fallback ──────────────────────────────────────────────────────
// Builds full context from available data, runs consultant engine,
// then falls back to generic-but-helpful message. NEVER returns blank.

function smartLocalFallback(
  message: string,
  history: { role: string; content: string }[],
  lead?: ChatRequest["leadContext"]
): string {
  // Build context from lead data + recent history
  const ctx: ConversationContext = {
    name:      lead?.name,
    phone:     lead?.phone,
    city:      lead?.city,
    service:   lead?.service,
    roomSize:  lead?.roomSize,
    lastTopic: lead?.lastTopic,
    lastIntent: lead?.lastIntent as any,
    budget:    lead?.budget ?? null,
    messagesExchanged: history.length,
  }

  // Enrich context from last few user messages
  for (const msg of history.slice(-4)) {
    if (msg.role !== "user") continue
    const norm = normalizeTypos(msg.content.toLowerCase())
    if (!ctx.city)     { const c = detectCity(norm);        if (c) ctx.city    = c }
    if (!ctx.service)  { const s = detectService(norm);     if (s) ctx.service = s.name }
    if (!ctx.roomType) { const r = detectRoomType(norm);    if (r) ctx.roomType = r.label }
  }

  // Run consultant engine
  const reply = consultantReply(message, ctx)
  if (reply) return reply

  // Absolute fallback — always price-first, helpful
  const norm = normalizeTypos(message.toLowerCase())
  const oh   = isOffHours()

  if (/price|rate|cost|kitna|lagega|estimate/.test(norm)) {
    return `💰 **JK Interior — Price List**\n\n✨ Gypsum Ceiling — ₹80–140/sq.ft\n🏠 PVC Ceiling — ₹60–120/sq.ft\n🪵 WPC Wall Panels — ₹180–450/sq.ft\n💎 UV Marble Sheets — ₹50–95/sq.ft\n📺 Modular TV Unit — ₹15,000+\n\nRoom ka size batayein (jaise 12×14) — exact estimate nikaal deti hoon! 📐`
  }

  const nm = lead?.name ? `${lead.name} ji, ` : ""
  return oh
    ? `${nm}abhi office hours ke baad hai — team kal 9 AM pe contact karegi. 😊\n\nKoi urgent sawaal? WhatsApp karein: **+91 8651070831**`
    : `${nm}room ka size batao (jaise 12×14) aur kaunsa kaam chahiye — ceiling ya wall paneling?\n\nEstimate abhi nikaal deti hoon! 📐\n\nYa call/WhatsApp: **+91 8651070831**`
}

// ─── POST /api/chat ────────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<NextResponse> {
  // IP + rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  if (!checkRate(ip)) {
    return err("Too many requests. Please wait a moment.", 429)
  }

  // Parse body
  let rawBody: unknown

  try {
    rawBody = await req.json()
  } catch {
    return err("Invalid JSON body", 400)
  }

  // Validate
  const parsed = ChatSchema.safeParse(rawBody)

  if (!parsed.success) {
    return err("Invalid request body", 400)
  }

  const { message, history, leadContext } = parsed.data

  // Normalize + detect intent for logging
  const normMessage = normalizeTypos(message)
  const intent = detectIntent(normMessage)

  console.log(
    `[chat] ip=${ip} intent=${intent} msg="${message.slice(0, 60)}"`
  )

  // API key
const apiKey =
  process.env.GROQ_API_KEY ?? ""

// No API key → use smart local fallback
if (!apiKey) {
  console.log("[chat] No API key — using local fallback")

  const reply = smartLocalFallback(
    message,
    history,
    leadContext
  )

  return ok(reply, "local")
}

// Simple queries → local AI first
const simpleQuery =
  /price|rate|cost|kitna|gypsum|pvc|wpc|ceiling|panel|room|design|contact|call|whatsapp/i.test(
    normMessage.toLowerCase()
  )

// Build system prompt
const systemPrompt = buildSystemPrompt(leadContext)

// AI call
try {

  // Use local AI for simple interior queries
  if (simpleQuery) {
    const localReply = smartLocalFallback(
      message,
      history,
      leadContext
    )

    return ok(localReply, "local")
  }

  // Use Groq for complex conversations
const reply = await callGroq(
  systemPrompt,
  history,
  message,
  apiKey
)

return ok(reply, "groq")

} catch (e: any) {

  console.error("[chat] Groq failed:", {
    message: e?.message,
    stack: e?.stack,
  })

  const errMsg = e?.message || ""

  if (
    errMsg.includes("429") ||
    errMsg.toLowerCase().includes("quota")
  ) {
    console.log(
      "[chat] Groq quota exceeded — switched to local AI"
    )
  }

  const fallback = smartLocalFallback(
    message,
    history,
    leadContext
  )

  return ok(fallback, "local")
}
}

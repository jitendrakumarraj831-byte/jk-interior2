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

interface GeminiMessage { role: "user" | "model"; parts: { text: string }[] }

async function callGemini(
  systemPrompt: string,
  history: { role: string; content: string }[],
  message: string,
  apiKey: string,
  baseUrl: string,
  timeoutMs = 12_000
): Promise<string> {
  const model = "gemini-1.5-flash-latest"
  const url   = `${baseUrl}/models/${model}:generateContent?key=${apiKey}`

  const contents: GeminiMessage[] = [
    ...history.slice(-16).map(m => ({
      role: (m.role === "user" ? "user" : "model") as "user" | "model",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: message }] },
  ]

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: {
          maxOutputTokens: 800,
          temperature: 0.72,
          topP: 0.9,
          topK: 40,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT",       threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        ],
      }),
    })

    clearTimeout(timer)

    if (!res.ok) {
  const bodyText = await res.text()

  console.error("Gemini API Error:", {
    status: res.status,
    body: bodyText,
    url,
  })

  throw new Error(`Gemini HTTP ${res.status}: ${bodyText}`)
    }

    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined
    if (!text?.trim()) throw new Error("Gemini returned empty response")
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

  // API key + Base URL
  const apiKey =
    process.env.AI_INTEGRATIONS_GEMINI_API_KEY ??
    process.env.GEMINI_API_KEY ??
    ""

  const baseUrl =
    process.env.AI_INTEGRATIONS_GEMINI_BASE_URL ??
    "https://generativelanguage.googleapis.com/v1beta"

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

  // Build system prompt
  const systemPrompt = buildSystemPrompt(leadContext)

  // Gemini call
  try {
    const reply = await callGemini(
      systemPrompt,
      history,
      message,
      apiKey,
      baseUrl
    )

    return ok(reply, "gemini")

  } catch (e: any) {
    console.error("[chat] Gemini failed:", {
      message: e?.message,
      stack: e?.stack,
    })

    const fallback = smartLocalFallback(
      message,
      history,
      leadContext
    )

    return ok(fallback, "local")
  }
}

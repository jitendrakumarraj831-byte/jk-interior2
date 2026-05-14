/**
 * JK Interior — /api/chat Route v4.0
 * ────────────────────────────────────
 * Clean 3-layer response system:
 *   Layer 1: Rule engine (consultantReply) — instant, no API call
 *   Layer 2: Groq AI — complex/open conversations
 *   Layer 3: Smart local fallback — if Groq fails, never blank
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
  detectBudgetLevel,
  normalizeTypos,
  isOffHours,
  resolveServiceKey,
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
    roomType:   z.string().optional(),
    lastTopic:  z.string().optional(),
    lastIntent: z.string().optional(),
  }).optional(),
})

type ChatRequest = z.infer<typeof ChatSchema>

// ─── Structured responses ──────────────────────────────────────────────────────

function ok(
  reply: string,
  source: "groq" | "local",
  updatedContext?: { roomSize?: string },
): NextResponse {
  return NextResponse.json({ ok: true, reply, source, ...(updatedContext ? { updatedContext } : {}) })
}

function err(message: string, status: number): NextResponse {
  return NextResponse.json({ ok: false, error: message }, { status })
}

// ─── Rate limiter ──────────────────────────────────────────────────────────────

const rateMap = new Map<string, { count: number; resetAt: number }>()

function checkRate(ip: string, limit = 30, windowMs = 60_000): boolean {
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

// ─── Context builder ───────────────────────────────────────────────────────────
// Converts leadContext + recent history into a ConversationContext for the engine

function buildEngineContext(
  lead: ChatRequest["leadContext"],
  history: { role: string; content: string }[]
): ConversationContext {
  const ctx: ConversationContext = {
    name:      lead?.name,
    phone:     lead?.phone,
    city:      lead?.city,
    service:   lead?.service,
    roomSize:  lead?.roomSize,
    roomType:  lead?.roomType,
    lastTopic: lead?.lastTopic,
    lastIntent: lead?.lastIntent as any,
    budget:    (lead?.budget as "low" | "mid" | "high" | undefined) ?? null,
    messagesExchanged: history.length,
  }

  // Enrich from recent user messages (last 6)
  for (const msg of history.slice(-6)) {
    if (msg.role !== "user") continue
    const norm = normalizeTypos(msg.content.toLowerCase())
    if (!ctx.city)     { const c = detectCity(norm);     if (c) ctx.city     = c }
    if (!ctx.service)  { const s = detectService(norm);  if (s) ctx.service  = s.name }
    if (!ctx.roomType) { const r = detectRoomType(norm); if (r) ctx.roomType = r.label }
    if (!ctx.budget)   { const b = detectBudgetLevel(norm); if (b) ctx.budget = b }
  }

  return ctx
}

// ─── Groq API call ─────────────────────────────────────────────────────────────

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
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...history.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
          { role: "user", content: message },
        ],
        temperature: 0.65,
        max_tokens: 600,
      }),
    })

    clearTimeout(timer)

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Groq ${res.status}: ${body}`)
    }

    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content
    if (!text?.trim()) throw new Error("Groq empty response")

    return text.trim()
  } catch (e) {
    clearTimeout(timer)
    throw e
  }
}

// ─── Generic fallback — never blank ───────────────────────────────────────────

function genericFallback(lead?: ChatRequest["leadContext"], message?: string): string {
  const nm = lead?.name ? `${lead.name} ji, ` : ""
  const oh = isOffHours()

  if (message && /price|rate|cost|kitna|lagega|estimate/.test(message.toLowerCase())) {
    return `💰 **JK Interior — Price Guide**\n\n✨ Gypsum Ceiling — ₹80–140/sq.ft\n🏠 PVC Ceiling — ₹60–120/sq.ft\n🪵 WPC Wall Panels — ₹180–450/sq.ft\n💎 UV Marble Sheets — ₹50–95/sq.ft\n📺 Modular TV Unit — ₹15,000+\n\nRoom ka size bataiye (jaise 12×14) — exact estimate nikaaluun! 📐`
  }

  return oh
    ? `${nm}abhi office hours ke baad hai — team kal 9 AM pe contact karegi. 😊\n\nUrgent? WhatsApp: **+91 8651070831**`
    : `${nm}Room ka size batao (jaise 12×14) aur kaunsa kaam — ceiling ya wall paneling?\n\nEstimate abhi nikaaluun! 📐\n\nYa call/WhatsApp: **+91 8651070831**`
}

// ─── POST /api/chat ────────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<NextResponse> {
  // Rate limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip")
    ?? "unknown"

  if (!checkRate(ip)) {
    return err("Too many requests. Please wait a moment.", 429)
  }

  // Parse + validate body
  let rawBody: unknown
  try {
    rawBody = await req.json()
  } catch {
    return err("Invalid JSON body", 400)
  }

  const parsed = ChatSchema.safeParse(rawBody)
  if (!parsed.success) {
    return err("Invalid request body", 400)
  }

  const { message, history, leadContext } = parsed.data
  const normMessage = normalizeTypos(message)
  const intent = detectIntent(normMessage)

  // Extract room size from message to return as updatedContext
  const dimMatch = normMessage.match(/(\d{1,3})\s*(?:[x×X]|by)\s*(\d{1,3})/)
  const extractedRoomSize = dimMatch
    ? `${dimMatch[1]}x${dimMatch[2]}`
    : leadContext?.roomSize ?? undefined

  console.log(`[chat] ip=${ip} intent=${intent} msg="${message.slice(0, 60)}"`)

  // ── Layer 1: Rule engine — always try first (instant, no API cost)
  const ctx = buildEngineContext(leadContext, history)
  const engineReply = consultantReply(normMessage, ctx)

  if (engineReply) {
    console.log(`[chat] Layer 1 (rule engine) handled intent=${intent}`)
    return ok(engineReply, "local", extractedRoomSize ? { roomSize: extractedRoomSize } : undefined)
  }

  // ── Layer 2: Groq AI — for open/complex conversations the engine didn't handle
  const apiKey = process.env.GROQ_API_KEY ?? ""

  if (!apiKey) {
    console.log("[chat] No API key — using generic fallback")
    return ok(genericFallback(leadContext, message), "local")
  }

  const systemPrompt = buildSystemPrompt(leadContext)

  try {
    const reply = await callGroq(systemPrompt, history, message, apiKey)
    console.log(`[chat] Layer 2 (Groq) responded, ${reply.length} chars`)
    return ok(reply, "groq")
  } catch (e: any) {
    const errMsg = (e?.message || "").toLowerCase()

    if (errMsg.includes("429") || errMsg.includes("quota")) {
      console.warn("[chat] Groq quota exceeded — Layer 3 fallback")
    } else if (errMsg.includes("abort")) {
      console.warn("[chat] Groq timeout — Layer 3 fallback")
    } else {
      console.error("[chat] Groq error:", e?.message)
    }

    // ── Layer 3: Smart local fallback — run engine again with fresh message context
    const fallbackCtx = buildEngineContext(leadContext, history)
    const fallbackReply = consultantReply(normMessage, fallbackCtx)
    return ok(fallbackReply ?? genericFallback(leadContext, message), "local")
  }
}

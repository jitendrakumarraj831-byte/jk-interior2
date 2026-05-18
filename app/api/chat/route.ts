/**
 * JK Interior — /api/chat Route v4.3 (FIXED)
 * ────────────────────────────────────────────
 * FIXES APPLIED:
 *   [F1] dimMatch regex — false positive रोका (time/phone ignore)
 *   [F2] buildSystemPrompt को enriched `ctx` pass किया
 *   [F3] Groq system prompt में customer context clearly inject हो
 *   [F4] Temperature 0.4 — ज़्यादा consistent replies
 *   [F5] Groq को last 10 messages दो (था 8, और better context)
 */

import { NextResponse } from "next/server"
import { z } from "zod"

import { buildSystemPrompt } from "@/lib/business-data"

import {
  consultantReply,
  detectService,
  detectRoomType,
  detectBudgetLevel,
  normalizeTypos,
  isOffHours,
  type ConversationContext,
} from "@/lib/consultant-engine"

import {
  resolveFollowUpIntent,
  shouldShowGreeting,
} from "@/lib/context-engine"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// ─────────────────────────────────────────────────────────────
// Request Schema
// ─────────────────────────────────────────────────────────────

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(3000),
})

const ChatSchema = z.object({
  message: z.string().min(1).max(1500),
  history: z.array(MessageSchema).max(24).optional().default([]),
  leadContext: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
      city: z.string().optional(),
      service: z.string().optional(),
      budget: z.enum(["low", "mid", "high"]).optional(),
      roomSize: z.string().optional(),
      roomType: z.string().optional(),
      lastTopic: z.string().optional(),
      lastIntent: z.string().optional(),
      lastQuestionAsked: z
        .enum(["room_size", "room_type", "city", "budget", "material", "phone", "name"])
        .nullable()
        .optional(),
      conversationStage: z
        .enum(["greeting", "discovery", "consultation", "estimation", "booking"])
        .optional(),
      messagesExchanged: z.number().optional(),
    })
    .optional(),
})

type ChatRequest = z.infer<typeof ChatSchema>

// ─────────────────────────────────────────────────────────────
// Response Helpers
// ─────────────────────────────────────────────────────────────

function ok(
  reply: string,
  source: "groq" | "local",
  updatedContext?: {
    roomSize?: string
    lastTopic?: string
    lastIntent?: string
    lastQuestionAsked?: string | null
    city?: string
    service?: string
    conversationStage?: string
  }
): NextResponse {
  return NextResponse.json(
    { ok: true, reply, source, ...(updatedContext ? { updatedContext } : {}) },
    { headers: { "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*" } }
  )
}

function err(message: string, status: number): NextResponse {
  return NextResponse.json(
    { ok: false, error: message },
    { status, headers: { "Access-Control-Allow-Origin": "*" } }
  )
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  )
}

// ─────────────────────────────────────────────────────────────
// Rate Limiter
// ─────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────
// FIX [F1]: Smarter dimension extractor
// Problem था: "10 baje aana" → 10x? match हो जाता था
// ─────────────────────────────────────────────────────────────

function extractRoomDimensions(text: string): string | null {
  const t = text.toLowerCase()

  // ❌ इन patterns पर dimension match IGNORE करें
  const SKIP_PATTERNS = [
    /\d+\s*(?:baje?|am\b|pm\b)/,           // time: "10 baje", "9 am"
    /\d+\s*(?:din|day|week|month|saal)/,    // duration: "10 din"
    /\d+\s*(?:ghante?|hour|minute)/,        // hours/minutes
    /(?:subah|sham|raat|dopahar)\s*\d+/,    // "subah 10"
    /[6-9]\d{9}/,                           // phone number (10 digit)
    /\d{10,}/,                              // any 10+ digit number
  ]

  for (const skip of SKIP_PATTERNS) {
    if (skip.test(t)) return null
  }

  // ✅ Clear dimension patterns — room context words के साथ prefer करें
  const ROOM_CONTEXT = /room|kamra|hall|bedroom|kitchen|bathroom|ceiling|floor|wall|area|size|maap|dimension|sq|sqft/i
  const hasDimContext = ROOM_CONTEXT.test(t)

  // Pattern 1: "12x10", "12×10", "12*10"
  const m1 = text.match(/(\d{1,3})\s*[x×*]\s*(\d{1,3})/i)
  if (m1) {
    const l = parseInt(m1[1]), w = parseInt(m1[2])
    // Sanity: realistic room size (5–80 feet), not the same (e.g. 12×12 ok, 99×99 no)
    if (l >= 5 && w >= 5 && l <= 80 && w <= 80) {
      return `${Math.max(l, w)}x${Math.min(l, w)}`
    }
  }

  // Pattern 2: "12 by 10" — only if room context present
  if (hasDimContext) {
    const m2 = text.match(/(\d{1,3})\s*(?:feet|ft|foot)?\s*by\s*(\d{1,3})/i)
    if (m2) {
      const l = parseInt(m2[1]), w = parseInt(m2[2])
      if (l >= 5 && w >= 5 && l <= 80 && w <= 80) {
        return `${Math.max(l, w)}x${Math.min(l, w)}`
      }
    }
  }

  return null
}

// ─────────────────────────────────────────────────────────────
// Context Builder
// ─────────────────────────────────────────────────────────────

function buildEngineContext(
  lead: ChatRequest["leadContext"],
  history: Array<{ role: "user" | "assistant"; content: string }>
): ConversationContext {
  const ctx: ConversationContext = {
    name: lead?.name,
    phone: lead?.phone,
    city: lead?.city,
    service: lead?.service,
    roomSize: lead?.roomSize,
    roomType: lead?.roomType,
    lastTopic: lead?.lastTopic,
    lastIntent: lead?.lastIntent as ConversationContext["lastIntent"],
    budget: (lead?.budget as "low" | "mid" | "high" | undefined) ?? null,
    messagesExchanged: lead?.messagesExchanged ?? history.length,
    lastQuestionAsked: lead?.lastQuestionAsked ?? null,
    conversationStage: lead?.conversationStage ?? "discovery",
  }

  // History से enrich करें
  for (const msg of history.slice(-6)) {
    if (msg.role !== "user") continue
    const norm = normalizeTypos(msg.content.toLowerCase())
    if (!ctx.service) { const s = detectService(norm); if (s) ctx.service = s.name }
    if (!ctx.roomType) { const r = detectRoomType(norm); if (r) ctx.roomType = r.label }
    if (!ctx.budget) { const b = detectBudgetLevel(norm); if (b) ctx.budget = b }
  }

  return ctx
}

// ─────────────────────────────────────────────────────────────
// FIX [F3]: Enhanced System Prompt Builder
// Problem था: Groq को customer context नहीं मिलता था properly
// ─────────────────────────────────────────────────────────────

function injectContextIntoSystemPrompt(
  basePrompt: string,
  leadContext: any,
  ctx: any  // ConversationContext
): string {
  const name    = ctx.name    || leadContext?.name
  const city    = ctx.city    || leadContext?.city
  const service = ctx.service || leadContext?.service
  const roomSize = ctx.roomSize || leadContext?.roomSize
  const roomType = ctx.roomType || leadContext?.roomType
  const lastTopic = ctx.lastTopic || leadContext?.lastTopic
  const stage   = ctx.conversationStage || leadContext?.conversationStage || "discovery"

  const contextBlock = `

=== ACTIVE CUSTOMER CONTEXT ===
${name     ? `Name: ${name}`            : "Name: Unknown"}
${city     ? `City: ${city}`            : "City: Not mentioned yet"}
${service  ? `Service: ${service}`      : "Service: Not specified yet"}
${roomSize ? `Room Size: ${roomSize} ft`: "Room Size: Not given yet"}
${roomType ? `Room Type: ${roomType}`   : "Room Type: Not specified"}
${lastTopic? `Last Topic: ${lastTopic}` : ""}
Conversation Stage: ${stage}
================================

=== STRICT RESPONSE RULES ===
1. आप Riya हैं — JK Interior की AI consultant। SIRF interior services के बारे में बात करें।
2. अगर कोई unrelated topic पूछे (cricket, news, politics, jokes) — politely redirect करें:
   "Main sirf JK Interior ke baare mein help kar sakti hoon. Kaunsa room design karna hai?"
3. अगर room size पहले से मिली है (${roomSize || "नहीं मिली"}), तो DOBARA मत पूछो — directly estimate दो।
4. अगर city पहले से मिली है (${city || "नहीं मिली"}), तो DOBARA मत पूछो।
5. Response SHORT रखो — max 5-6 lines। Bullet points use करो।
6. हर response एक clear next step पर खत्म हो।
7. Customer जिस language में बात करे (Hindi/Hinglish/English) — उसी में जवाब दो।
8. Previous context को CONTINUE करो — repeat मत करो।
=============================`

  return basePrompt + contextBlock
}

// ─────────────────────────────────────────────────────────────
// Generic Fallback
// ─────────────────────────────────────────────────────────────

function genericFallback(
  lead?: ChatRequest["leadContext"],
  message?: string
): string {
  const nm = lead?.name ? `${lead.name} ji, ` : ""
  const oh = isOffHours()

  if (lead?.lastTopic) {
    const topicNames: Record<string, string> = {
      pvc: "PVC Ceiling", gypsum: "Gypsum Ceiling",
      wpc: "WPC Wall Panels", uv: "UV Marble Sheets", tvunit: "Modular TV Unit",
    }
    const topicName = topicNames[lead.lastTopic] || lead.lastTopic
    if (lead.roomSize) {
      return `${nm}${topicName} ke liye ${lead.roomSize} room — estimate ready hai!\n\nFree site visit book karein?\n📞 WhatsApp: +91 8651070831`
    }
    return `${nm}${topicName} ke baare mein room ka size batao (jaise 12×14) — exact estimate! 📐`
  }

  if (message && /price|rate|cost|kitna|lagega|estimate/i.test(message)) {
    return `💰 **JK Interior Rates**\n\n✨ Gypsum — ₹80–140/sq.ft\n🏠 PVC — ₹60–120/sq.ft\n🪵 WPC Panels — ₹180–450/sq.ft\n💎 UV Marble — ₹50–95/sq.ft\n📺 TV Unit — ₹15,000+\n\nRoom ka size batao (12×14) — exact estimate nikaaluun! 📐`
  }

  if (oh) {
    return `${nm}Abhi office band hai 🌙\n\nTeam kal 9 AM pe contact karegi.\nUrgent? WhatsApp: +91 8651070831`
  }

  return `${nm}Room ka size batao (jaise 12×14) aur kaunsa kaam — ceiling ya wall paneling?\n\nEstimate abhi nikaaluun! 📐\n\nCall/WhatsApp: +91 8651070831`
}

// ─────────────────────────────────────────────────────────────
// Groq API Call — FIX [F4]: temperature 0.4, FIX [F5]: 10 msgs
// ─────────────────────────────────────────────────────────────

async function callGroq(
  systemPrompt: string,
  history: Array<{ role: "user" | "assistant"; content: string }>,
  message: string,
  apiKey: string,
  timeoutMs = 20_000
): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          // FIX [F5]: था slice(-8), अब slice(-10) — better context
          ...history.slice(-10).map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
          { role: "user", content: message },
        ],
        // FIX [F4]: था 0.65, अब 0.4 — ज़्यादा consistent, कम hallucination
        temperature: 0.4,
        max_tokens: 500,
      }),
    })

    clearTimeout(timer)

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`Groq ${response.status}: ${body}`)
    }

    const data = await response.json()
    const text = data?.choices?.[0]?.message?.content

    if (!text?.trim()) throw new Error("Groq empty response")

    return text.trim()
  } catch (error) {
    clearTimeout(timer)
    throw error
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/chat
// ─────────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown"

    if (!checkRate(ip)) {
      return err("Too many requests. Please wait a moment.", 429)
    }

    let rawBody: unknown
    try {
      rawBody = await req.json()
    } catch {
      return err("Invalid JSON body", 400)
    }

    const parsed = ChatSchema.safeParse(rawBody)
    if (!parsed.success) return err("Invalid request body", 400)

    const { message, history, leadContext } = parsed.data
    const normMessage = normalizeTypos(message?.trim() || "")

    // FIX [F1]: नया smarter dimension extractor use करें
    const extractedRoomSize =
      extractRoomDimensions(normMessage) ??
      leadContext?.roomSize ??
      undefined

    const buildUpdatedContext = (ctx: ConversationContext) => ({
      roomSize: ctx.roomSize || extractedRoomSize,
      lastTopic: ctx.lastTopic,
      lastIntent: ctx.lastIntent,
      lastQuestionAsked: ctx.lastQuestionAsked,
      city: ctx.city,
      service: ctx.service,
      conversationStage: ctx.conversationStage,
    })

    console.log(`[chat] ip=${ip} msg="${message.slice(0, 60)}"`)

    // ── Layer 1: Rule Engine ──────────────────────────────────
    const ctx = buildEngineContext(leadContext, history)

    // Short message follow-up resolution
    if (normMessage.length < 30 && (leadContext?.lastTopic || leadContext?.lastIntent)) {
      const followUpResolution = resolveFollowUpIntent(normMessage, {
        lastIntent: leadContext?.lastIntent,
        lastMaterial: leadContext?.lastTopic,
        lastCity: leadContext?.city,
        lastRoomType: leadContext?.roomType,
        lastBudget: leadContext?.budget,
        lastTopic: leadContext?.lastTopic,
        messagesSinceGreeting: ctx.messagesExchanged || 0,
        isInActivePricing: ctx.lastTopic ? true : false,
      })

      if (followUpResolution.confidence > 0.5) {
        if (followUpResolution.intent === "pricing_continuation") ctx.lastIntent = "pricing"
        else if (followUpResolution.intent === "material_change") ctx.lastIntent = "service-info"
        else if (followUpResolution.intent === "lead_confirmation") ctx.lastIntent = "booking"
      }
    }

    const engineReply = consultantReply(normMessage, ctx)

    if (engineReply) {
      console.log("[chat] Layer 1 handled")
      return ok(engineReply, "local", buildUpdatedContext(ctx))
    }

    // ── Layer 2: Groq ─────────────────────────────────────────
    const apiKey = process.env.GROQ_API_KEY ?? ""

    if (!apiKey) {
      console.warn("[chat] GROQ_API_KEY not set — using fallback")
      return ok(genericFallback(leadContext, message), "local", buildUpdatedContext(ctx))
    }

    // FIX [F2] + [F3]: enriched ctx को system prompt में pass करें
    const systemPrompt = injectContextIntoSystemPrompt(buildSystemPrompt(leadContext), leadContext, ctx)

    try {
      const reply = await callGroq(systemPrompt, history, message, apiKey)
      console.log("[chat] Layer 2 (Groq) success")
      return ok(reply, "groq", buildUpdatedContext(ctx))
    } catch (error: any) {
      const errMsg = String(error?.message || "").toLowerCase()
      if (errMsg.includes("429") || errMsg.includes("quota")) {
        console.warn("[chat] Groq quota exceeded")
      } else if (errMsg.includes("abort")) {
        console.warn("[chat] Groq timeout")
      } else {
        console.error("[chat] Groq error:", error)
      }

      // ── Layer 3: Smart Fallback ───────────────────────────
      return ok(genericFallback(leadContext, message), "local", buildUpdatedContext(ctx))
    }
  } catch (error) {
    console.error("[chat] Fatal server error:", error)
    return err("Internal server error", 500)
  }
       }
  

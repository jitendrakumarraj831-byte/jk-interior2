/**
 * JK Interior — /api/chat Route v4.2
 * ────────────────────────────────────
 * Clean 3-layer response system:
 *   Layer 1: Rule engine (consultantReply) — instant, no API call
 *   Layer 2: Groq AI — complex/open conversations
 *   Layer 3: Smart local fallback — if Groq fails, never blank
 *
 * Fixes in v4.2:
 *   [1] Removed dead consultantReply() duplicate call in Layer 3
 *   [2] Pricing now lives only in genericFallback (single source of truth)
 *   [3] extractedRoomSize now propagated in Layer 2 + Layer 3 returns
 *   [4] Removed unused `intent` variable — detectIntent removed from route
 *   [5] Missing GROQ_API_KEY now logs a clear warning (not silent)
 */

import { NextResponse } from "next/server"
import { z } from "zod"
import { Pool } from "pg"

import { buildSystemPrompt } from "@/lib/business-data"

import {
  consultantReply,
  detectService,
  detectRoomType,
  detectBudgetLevel,
  normalizeTypos,
  isOffHours,
  detectCity,
  getSmartQuickReplies,
  tryExtractPhone,
  tryExtractName,
  type ConversationContext,
} from "@/lib/consultant-engine"

import {
  resolveFollowUpIntent,
  shouldShowGreeting,
} from "@/lib/context-engine"
import {
  buildWebsiteAwareSystemPrompt,
  cleanAssistantReply,
  getChatMetadata,
  getWebsiteKnowledgeReply,
} from "@/lib/chatbot/site-context"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const leadPool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null

// ─────────────────────────────────────────────────────────────
// Request Schema
// ─────────────────────────────────────────────────────────────

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(3000),
})

const ChatSchema = z.object({
  message: z.string().min(1).max(1500),

  history: z
    .array(MessageSchema)
    .max(24)
    .optional()
    .default([]),

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
      // NEW: Enhanced context fields
      lastQuestionAsked: z.enum(['room_size', 'room_type', 'city', 'budget', 'material', 'phone', 'name']).nullable().optional(),
      conversationStage: z.enum(['greeting', 'discovery', 'consultation', 'estimation', 'booking']).optional(),
      messagesExchanged: z.number().optional(),
      leadSaved: z.boolean().optional(),
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
    name?: string
    phone?: string
    budget?: string | null
    roomType?: string
    leadSaved?: boolean
  },
  metadata?: ReturnType<typeof getChatMetadata>
): NextResponse {
  return NextResponse.json(
    {
      ok: true,
      reply,
      source,
      ...(updatedContext ? { updatedContext } : {}),
      ...(metadata ? { metadata } : {}),
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
}

function err(message: string, status: number): NextResponse {
  return NextResponse.json(
    {
      ok: false,
      error: message,
    },
    {
      status,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
}

// ─────────────────────────────────────────────────────────────
// CORS Support
// ─────────────────────────────────────────────────────────────

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
// Rate Limiter (basic in-memory)
// ─────────────────────────────────────────────────────────────

// WARNING:
// In-memory only. Works temporarily.
// Use Redis/Upstash for production scaling.

const rateMap = new Map<
  string,
  {
    count: number
    resetAt: number
  }
>()

function checkRate(
  ip: string,
  limit = 30,
  windowMs = 60_000
): boolean {
  const now = Date.now()

  const entry = rateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    })

    return true
  }

  if (entry.count >= limit) {
    return false
  }

  entry.count++

  return true
}

// ─────────────────────────────────────────────────────────────
// Context Builder
// ─────────────────────────────────────────────────────────────

function buildEngineContext(
  lead: ChatRequest["leadContext"],
  history: Array<{
    role: "user" | "assistant"
    content: string
  }>
): ConversationContext {
  const ctx: ConversationContext = {
    name: lead?.name,
    phone: lead?.phone,
    city: lead?.city,
    service: lead?.service,
    roomSize: lead?.roomSize,
    roomType: lead?.roomType,
    lastTopic: lead?.lastTopic,

    lastIntent:
      lead?.lastIntent as ConversationContext["lastIntent"],

    budget:
      (lead?.budget as
        | "low"
        | "mid"
        | "high"
        | undefined) ?? null,

    messagesExchanged: lead?.messagesExchanged ?? history.length,
    
    // NEW: Enhanced context fields
    lastQuestionAsked: lead?.lastQuestionAsked ?? null,
    conversationStage: lead?.conversationStage ?? 'discovery',
  }

  // Enrich from recent user messages

  for (const msg of history.slice(-6)) {
    if (msg.role !== "user") continue

    const norm = normalizeTypos(
      msg.content.toLowerCase()
    )

    if (!ctx.service) {
      const s = detectService(norm)
      if (s) ctx.service = s.name
    }

    if (!ctx.roomType) {
      const r = detectRoomType(norm)
      if (r) ctx.roomType = r.label
    }

    if (!ctx.budget) {
      const b = detectBudgetLevel(norm)
      if (b) ctx.budget = b
    }
  }

  return ctx
}


function enrichContextFromMessage(
  ctx: ConversationContext,
  lead: ChatRequest["leadContext"],
  rawMessage: string,
  normalizedMessage: string,
  extractedRoomSize?: string
): ConversationContext {
  if (extractedRoomSize) ctx.roomSize = extractedRoomSize

  const service = detectService(normalizedMessage)
  if (service) {
    ctx.service = service.name
    ctx.lastTopic = service.key
  } else if (/\bcharcoal\b|charcol|charcole/i.test(normalizedMessage)) {
    ctx.service = "Charcoal Panel"
    ctx.lastTopic = "charcoal"
  } else if (/\bpop\b|plaster\s*of\s*paris/i.test(normalizedMessage)) {
    ctx.service = "POP / Gypsum Ceiling"
    ctx.lastTopic = "gypsum"
  }

  const room = detectRoomType(normalizedMessage)
  if (room) ctx.roomType = room.label

  const budget = detectBudgetLevel(normalizedMessage)
  if (budget) ctx.budget = budget

  const city = detectCity(normalizedMessage)
  if (city) ctx.city = city

  const phone = tryExtractPhone(rawMessage)
  if (phone) {
    ctx.phone = phone
    ctx.conversationStage = "booking"
  }

  const explicitName = /\b(?:mera\s+naam|my\s+name\s+is|name\s+is|main\s+hoon|mai\s+hoon)\b/i.test(rawMessage)
  if (!ctx.name && (explicitName || lead?.lastQuestionAsked === "name")) {
    const name = tryExtractName(rawMessage)
    if (name && name.length <= 60 && !/^(pvc|gypsum|wpc|price|rate|estimate)$/i.test(name)) {
      ctx.name = name
    }
  }

  if (ctx.phone) {
    ctx.conversationStage = "booking"
  } else if (ctx.roomSize || ctx.service) {
    ctx.conversationStage = "estimation"
  } else if (!ctx.conversationStage) {
    ctx.conversationStage = "discovery"
  }

  return ctx
}

function summarizeChat(history: ChatRequest["history"], message: string): string {
  return [...history.slice(-4), { role: "user" as const, content: message }]
    .map((entry) => `${entry.role}: ${entry.content}`)
    .join(" | ")
    .slice(0, 900)
}

async function saveLeadIfReady(
  ctx: ConversationContext,
  lead: ChatRequest["leadContext"],
  history: ChatRequest["history"],
  message: string
): Promise<boolean> {
  if (!leadPool || lead?.leadSaved || !ctx.phone) return Boolean(lead?.leadSaved)

  const hasUsefulLeadDetail = Boolean(ctx.name || ctx.city || ctx.service || ctx.roomSize || ctx.roomType)
  if (!hasUsefulLeadDetail) return false

  try {
    await leadPool.query(
      `INSERT INTO leads (name, phone, city, service, estimate, preferred_time, chat_summary)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        ctx.name || "Chat Lead",
        ctx.phone,
        ctx.city ?? null,
        ctx.service ?? ctx.lastTopic ?? null,
        ctx.roomSize ? `Room size: ${ctx.roomSize}` : null,
        null,
        summarizeChat(history, message),
      ]
    )
    return true
  } catch (error) {
    console.error("[chat] lead capture failed:", error)
    return false
  }
}

function mergeQuickReplies(ctx: ConversationContext): string[] {
  const replies = new Set<string>(getChatMetadata(ctx).quickReplies)
  for (const reply of getSmartQuickReplies(ctx)) replies.add(reply)
  return Array.from(replies).slice(0, 7)
}

// ─────────────────────────────────────────────────────────────
// Groq API Call
// ─────────────────────────────────────────────────────────────

async function callGroq(
  systemPrompt: string,
  history: Array<{
    role: "user" | "assistant"
    content: string
  }>,
  message: string,
  apiKey: string,
  timeoutMs = 20_000
): Promise<string> {
  const controller = new AbortController()

  const timer = setTimeout(() => {
    controller.abort()
  }, timeoutMs)

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },

        signal: controller.signal,

        body: JSON.stringify({
          model: "llama3-70b-8192",

          messages: [
            {
              role: "system",
              content: systemPrompt,
            },

            ...(history ?? []).map((m) => ({
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

          temperature: 0.65,
          max_tokens: 600,
        }),
      }
    )

    clearTimeout(timer)

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`Groq ${response.status}: ${body}`)
    }

    const data = await response.json()

    const text =
      data &&
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content

    if (!text || !text.trim()) {
      throw new Error("Groq empty response")
    }

    return text.trim()
  } catch (error) {
    clearTimeout(timer)
    throw error
  }
}

// ─────────────────────────────────────────────────────────────
// Generic Fallback
// Context-aware fallback that maintains conversation flow.
// This fires when: GROQ_API_KEY is missing, or Groq fails.
// ─────────────────────────────────────────────────────────────

function genericFallback(
  lead?: Partial<ConversationContext> & { messagesExchanged?: number },
  message?: string
): string {
  const nm = lead?.name
    ? `${lead.name} ji, `
    : ""

  const oh = isOffHours()

  // ── Context-aware responses ──
  // If we have an active topic, stay on topic
  if (lead?.lastTopic) {
    const topicNames: Record<string, string> = {
      pvc: "PVC Ceiling",
      gypsum: "Gypsum Ceiling",
      wpc: "WPC Wall Panels",
      uv: "UV Marble Sheets",
      tvunit: "Modular TV Unit",
    }
    const topicName = topicNames[lead.lastTopic] || lead.lastTopic

    if (lead.roomSize) {
      return `${nm}${topicName} ke liye ${lead.roomSize} room — estimate ready hai!\n\nFree site visit book karein?\n\n📞 WhatsApp: +91 8651070831`
    }
    return `${nm}${topicName} ke baare mein aur jaanna hai?\n\nRoom ka size batao (jaise 12×14) — exact estimate! 📐`
  }

  // Price inquiry
  if (
    message &&
    /price|rate|cost|kitna|lagega|estimate/i.test(message)
  ) {
    return `
💰 **Price Guide**

✨ Gypsum Ceiling — ₹80–140/sq.ft
🏠 PVC Ceiling — ₹60–120/sq.ft
🪵 WPC Wall Panels — ₹180–450/sq.ft
💎 UV Marble Sheets — ₹50–95/sq.ft
📺 Modular TV Unit — ₹15,000+

Room ka size batao (jaise 12×14) — exact estimate nikaaluun! 📐
`.trim()
  }

  // Off-hours response
  if (oh) {
    return `${nm}abhi office band hai 🌙\n\nTeam kal 9 AM pe contact karegi.\n\nUrgent? WhatsApp: +91 8651070831`
  }

  // Default with context awareness
  if (lead?.messagesExchanged && lead.messagesExchanged > 2) {
    // Mid-conversation fallback - don't restart
    return `${nm}Aur kya jaanna chahte ho?\n\n• Material options\n• Price estimate\n• Free site visit\n\nRoom ka size batao ya sawaal poochho! 📐`
  }

  return `${nm}Room ka size batao (jaise 12×14) aur kaunsa kaam — ceiling ya wall paneling?\n\nEstimate abhi nikaaluun! 📐\n\nCall/WhatsApp: +91 8651070831`
}

// ─────────────────────────────────────────────────────────────
// POST /api/chat
// ─────────────────────────────────────────────────────────────

export async function POST(
  req: Request
): Promise<NextResponse> {
  try {
    // ─────────────────────────────────────────
    // IP Detection
    // ─────────────────────────────────────────

    const ip =
      req.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown"

    // ─────────────────────────────────────────
    // Rate Limit
    // ─────────────────────────────────────────

    if (!checkRate(ip)) {
      return err(
        "Too many requests. Please wait a moment.",
        429
      )
    }

    // ─────────────────────────────────────────
    // Parse Body
    // ─────────────────────────────────────────

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

    const {
      message,
      history,
      leadContext,
    } = parsed.data

    const normMessage = normalizeTypos(
      message?.trim() || ""
    )

    // ─────────────────────────────────────────
    // Extract Room Size
    // Shared across all layers so context is
    // never lost regardless of which layer replies.
    // ─────────────────────────────────────────

    const dimMatch = normMessage.match(
      /(\d{1,3})\s*(?:x|×|by)\s*(\d{1,3})/i
    )

    const extractedRoomSize = dimMatch
      ? `${dimMatch[1]}x${dimMatch[2]}`
      : leadContext?.roomSize ?? undefined

    let leadSaved = Boolean(leadContext?.leadSaved)

    // Helper: build updatedContext with all relevant fields
    // This ensures frontend gets the latest context after each response
    const buildUpdatedContext = (ctx: ConversationContext) => ({
      roomSize: ctx.roomSize || extractedRoomSize,
      lastTopic: ctx.lastTopic,
      lastIntent: ctx.lastIntent,
      lastQuestionAsked: ctx.lastQuestionAsked,
      city: ctx.city,
      service: ctx.service,
      conversationStage: ctx.conversationStage,
      name: ctx.name,
      phone: ctx.phone,
      budget: ctx.budget,
      roomType: ctx.roomType,
      leadSaved,
    })

    const buildMetadata = (ctx: ConversationContext) => ({
      ...getChatMetadata(ctx),
      quickReplies: mergeQuickReplies(ctx),
    })

    console.log(
      `[chat] ip=${ip} msg="${message.slice(0, 60)}"`
    )

    // ─────────────────────────────────────────
    // Layer 1 — Rule Engine
    // ─────────────────────────────────────────

    const ctx = enrichContextFromMessage(
      buildEngineContext(leadContext, history),
      leadContext,
      message,
      normMessage,
      extractedRoomSize
    )

    // Enhance context with follow-up resolution for short messages
    // This helps the rule engine understand short replies like "Araria me", "PVC", "kitna lagega"
    if (normMessage.length < 30 && (leadContext?.lastTopic || leadContext?.lastIntent)) {
      const followUpResolution = resolveFollowUpIntent(normMessage, {
        lastIntent: ctx.lastIntent ?? leadContext?.lastIntent,
        lastMaterial: ctx.lastTopic ?? leadContext?.lastTopic,
        lastCity: ctx.city ?? leadContext?.city,
        lastRoomType: ctx.roomType ?? leadContext?.roomType,
        lastBudget: ctx.budget ?? leadContext?.budget,
        lastTopic: ctx.lastTopic ?? leadContext?.lastTopic,
        messagesSinceGreeting: ctx.messagesExchanged || 0,
        isInActivePricing: ctx.lastTopic ? true : false,
      })

      if (followUpResolution.confidence > 0.5) {
        console.log(
          `[chat] Follow-up resolved: ${followUpResolution.intent} (${followUpResolution.reason})`
        )
        // Keep the detected intent for better routing
        if (followUpResolution.intent === "pricing_continuation") {
          ctx.lastIntent = "pricing"
        } else if (followUpResolution.intent === "material_change") {
          ctx.lastIntent = "service-info"
        } else if (followUpResolution.intent === "lead_confirmation") {
          ctx.lastIntent = "booking"
        }
      }
    }

    // Prevent greeting reset mid-conversation
    if (
      ctx.messagesExchanged &&
      ctx.messagesExchanged > 2 &&
      !shouldShowGreeting(normMessage, ctx.messagesExchanged, false)
    ) {
      // If it looks like a greeting but we're mid-conversation, don't mark as greeting
      // The greeting case will be handled specially in the switch statement
    }

    leadSaved = await saveLeadIfReady(ctx, leadContext, history, message)

    const engineReply = consultantReply(normMessage, ctx)

    if (engineReply) {
      console.log("[chat] Layer 1 handled")

      return ok(cleanAssistantReply(engineReply), "local", buildUpdatedContext(ctx), buildMetadata(ctx))
    }

    const websiteKnowledgeReply = getWebsiteKnowledgeReply(normMessage, ctx)

    if (websiteKnowledgeReply) {
      console.log("[chat] Website knowledge handled")

      return ok(cleanAssistantReply(websiteKnowledgeReply), "local", buildUpdatedContext(ctx), buildMetadata(ctx))
    }

    // ─────────────────────────────────────────
    // Layer 2 — Groq
    // ─────────────────────────────────────────

    const apiKey = process.env.GROQ_API_KEY ?? ""

    if (!apiKey) {
      // FIX [5]: warn clearly — this is a config problem, not normal flow
      console.warn(
        "[chat] GROQ_API_KEY is not set — falling back to genericFallback"
      )

      return ok(
        cleanAssistantReply(genericFallback(buildUpdatedContext(ctx), message)),
        "local",
        buildUpdatedContext(ctx),
        buildMetadata(ctx) // Propagate context even on key-missing path
      )
    }

    const systemPrompt = buildWebsiteAwareSystemPrompt(buildSystemPrompt(buildUpdatedContext(ctx)), ctx)

    try {
      const reply = await callGroq(
        systemPrompt,
        history.slice(-12),
        message,
        apiKey
      )

      console.log("[chat] Layer 2 (Groq) success")

      // Propagate context from Groq replies too
      return ok(cleanAssistantReply(reply), "groq", buildUpdatedContext(ctx), buildMetadata(ctx))
    } catch (error: any) {
      const errMsg = String(
        error?.message || ""
      ).toLowerCase()

      if (
        errMsg.includes("429") ||
        errMsg.includes("quota")
      ) {
        console.warn("[chat] Groq quota exceeded")
      } else if (errMsg.includes("abort")) {
        console.warn("[chat] Groq timeout")
      } else {
        console.error("[chat] Groq error:", error)
      }

      // ─────────────────────────────────────
      // Layer 3 — Local Fallback
      //
      // FIX [1]: Removed dead consultantReply() call here.
      // If consultantReply() returned null in Layer 1, it will
      // always return null again with the same inputs — nothing
      // has changed. genericFallback() is the real fallback.
      // FIX [3]: propagate roomSize here too.
      // ─────────────────────────────────────

      return ok(
        cleanAssistantReply(genericFallback(buildUpdatedContext(ctx), message)),
        "local",
        buildUpdatedContext(ctx),
        buildMetadata(ctx)
      )
    }
  } catch (error) {
    console.error("[chat] Fatal server error:", error)

    return err("Internal server error", 500)
  }
}

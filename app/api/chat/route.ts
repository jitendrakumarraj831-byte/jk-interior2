/**
 * JK Interior — /api/chat Route v4.1
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
  detectIntent,
  detectService,
  detectRoomType,
  detectBudgetLevel,
  normalizeTypos,
  isOffHours,
  type ConversationContext,
} from "@/lib/consultant-engine"

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
  updatedContext?: { roomSize?: string }
): NextResponse {
  return NextResponse.json(
    {
      ok: true,
      reply,
      source,
      ...(updatedContext ? { updatedContext } : {}),
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

  messagesExchanged: history.length,
  }

  // Enrich from recent user messages

  for (const msg of history.slice(-6)) {
    if (msg.role !== "user") continue

    const norm = normalizeTypos(
      msg.content.toLowerCase()
    )

    if (!ctx.service) {
      const s = detectService(norm)

      if (s) {
        ctx.service = s.name
      }
    }

    if (!ctx.roomType) {
      const r = detectRoomType(norm)

      if (r) {
        ctx.roomType = r.label
      }
    }

    if (!ctx.budget) {
      const b = detectBudgetLevel(norm)

      if (b) {
        ctx.budget = b
      }
    }
  }

  return ctx
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

      throw new Error(
        `Groq ${response.status}: ${body}`
      )
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
// ─────────────────────────────────────────────────────────────

function genericFallback(
  lead?: ChatRequest["leadContext"],
  message?: string
): string {
  const nm = lead?.name
    ? `${lead.name} ji, `
    : ""

  const oh = isOffHours()

  if (
    message &&
    /price|rate|cost|kitna|lagega|estimate/i.test(
      message
    )
  ) {
    return `
💰 *JK Interior — Price Guide*

✨ Gypsum Ceiling — ₹80–140/sq.ft
🏠 PVC Ceiling — ₹60–120/sq.ft
🪵 WPC Wall Panels — ₹180–450/sq.ft
💎 UV Marble Sheets — ₹50–95/sq.ft
📺 Modular TV Unit — ₹15,000+

Room ka size bataiye (jaise 12×14) — exact estimate nikaaluun! 📐
`.trim()
  }

  return oh
    ? `${nm}abhi office hours ke baad hai — team kal 9 AM pe contact karegi 😊

Urgent? WhatsApp: +91 8651070831`

    : `${nm}Room ka size batao (jaise 12×14) aur kaunsa kaam — ceiling ya wall paneling?

Estimate abhi nikaaluun 📐

Call/WhatsApp: +91 8651070831`
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

    const intent = detectIntent(normMessage)

    // ─────────────────────────────────────────
    // Extract Room Size
    // ─────────────────────────────────────────

    const dimMatch = normMessage.match(
      /(\d{1,3})\s*(?:x|×|by)\s*(\d{1,3})/i
    )

    const extractedRoomSize = dimMatch
      ? `${dimMatch[1]}x${dimMatch[2]}`
      : leadContext?.roomSize ?? undefined

    console.log(
      `[chat] ip=${ip} intent=${intent} msg="${message.slice(
        0,
        60
      )}"`
    )

    // ─────────────────────────────────────────
    // Layer 1 — Rule Engine
    // ─────────────────────────────────────────

    const ctx = buildEngineContext(
      leadContext,
      history
    )

    const engineReply = consultantReply(
      normMessage,
      ctx
    )

    if (engineReply) {
      console.log(
        `[chat] Layer 1 handled intent=${intent}`
      )

      return ok(
        engineReply,
        "local",
        extractedRoomSize
          ? {
              roomSize:
                extractedRoomSize,
            }
          : undefined
      )
    }

    // ─────────────────────────────────────────
    // Layer 2 — Groq
    // ─────────────────────────────────────────

    const apiKey =
      process.env.GROQ_API_KEY ?? ""

    if (!apiKey) {
      console.log(
        "[chat] Missing GROQ_API_KEY"
      )

      return ok(
        genericFallback(
          leadContext,
          message
        ),
        "local"
      )
    }

    const systemPrompt =
      buildSystemPrompt(leadContext)

    try {
      const reply = await callGroq(
        systemPrompt,
        history,
        message,
        apiKey
      )

      console.log(
        `[chat] Layer 2 (Groq) success`
      )

      return ok(reply, "groq")
    } catch (error: any) {
      const errMsg = String(
        error?.message || ""
      ).toLowerCase()

      if (
        errMsg.includes("429") ||
        errMsg.includes("quota")
      ) {
        console.warn(
          "[chat] Groq quota exceeded"
        )
      } else if (
        errMsg.includes("abort")
      ) {
        console.warn(
          "[chat] Groq timeout"
        )
      } else {
        console.error(
          "[chat] Groq error:",
          error
        )
      }

      // ─────────────────────────────────────
      // Layer 3 — Local Fallback
      // ─────────────────────────────────────

      const fallbackCtx =
        buildEngineContext(
          leadContext,
          history
        )

      const fallbackReply =
        consultantReply(
          normMessage,
          fallbackCtx
        )

      return ok(
        fallbackReply ??
          genericFallback(
            leadContext,
            message
          ),
        "local"
      )
    }
  } catch (error) {
    console.error(
      "[chat] Fatal server error:",
      error
    )

    return err(
      "Internal server error",
      500
    )
  }
        }

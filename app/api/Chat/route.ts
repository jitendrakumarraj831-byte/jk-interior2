/**
 * JK Interior — /api/chat Route v5.0 (IMPROVED)
 * ────────────────────────────────────────────────
 * IMPROVEMENTS IN v5.0:
 *   [I1]  Intent detection — granular intents: pricing / booking / material / faq / offtopic / greeting / comparison
 *   [I2]  Contact-gate — WhatsApp/phone only asked during booking/quotation/site-visit, never randomly
 *   [I3]  Repetition guard — last 3 assistant replies checked before sending
 *   [I4]  Stronger Hindi/Hinglish normalizer — typo + transliteration patterns expanded
 *   [I5]  Smart fallback — context-aware, never generic dump
 *   [I6]  Answer-first rule enforced in system prompt and local engine
 *   [I7]  Groq prompt rewritten — fewer hallucinations, no random suggestions
 *   [I8]  Off-topic hard-redirect — no interior answer given for unrelated queries
 *   [I9]  Conversation stage auto-advance logic
 *   [I10] Budget/room/city dedup — never re-ask what we already know
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
    roomType?: string
    budget?: string
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
// [I1] Intent Detector — granular, priority-ordered
// ─────────────────────────────────────────────────────────────

type Intent =
  | "greeting"
  | "pricing"
  | "booking"
  | "material_info"
  | "comparison"
  | "faq"
  | "off_topic"
  | "affirmation"
  | "negation"
  | "unknown"

function detectIntent(text: string, ctx: ConversationContext): Intent {
  const t = text.toLowerCase()

  // Greeting
  if (/^(hi|hello|hey|namaste|namaskar|hii|helo|hy|hye|good\s*(morning|evening|afternoon)|salam|assalam)\b/.test(t)) {
    return "greeting"
  }

  // Affirmation / Negation (for follow-up context)
  if (/^(ha(n|a)?n?|haan|yes|okay|ok|bilkul|zaroor|sure|theek|thik|sahi|right|correct|perfect|done|proceed)\b/.test(t)) {
    return "affirmation"
  }
  if (/^(nahi|no|nope|mat|band karo|ruk|stop|cancel|baad mein|later)\b/.test(t)) {
    return "negation"
  }

  // Booking / Site Visit — must be before pricing so "quote bhejo" doesn't become pricing
  if (
    /\b(book|booking|appointment|visit|site visit|ghar aao|aa jao|bulao|milna|demo|consultation|schedule|free visit|quotation bhejo|quote bhejo|estimate bhejo)\b/.test(t)
  ) {
    return "booking"
  }

  // Pricing
  if (
    /\b(price|pricing|rate|cost|kitna|lagega|lagta|budget|estimate|paisa|rupee|rs\b|₹|cheap|costly|expensive|affordable|how much|kitne mein|kitne ka|total|charge|fee|sqft|per foot|per sq)\b/.test(t)
  ) {
    return "pricing"
  }

  // Comparison
  if (
    /\b(better|best|vs|versus|compare|differ|difference|konsa|kaun sa|which one|zyada|kam|acha|bekar|suggest|recommend)\b/.test(t)
  ) {
    return "comparison"
  }

  // Material / Service info
  if (
    /\b(gypsum|pvc|wpc|uv|marble|panel|ceiling|wall|floor|modular|tv unit|wardrobe|kitchen|false ceiling|design|texture|color|rang|finish|look|style|badhiya|material|quality|thickness|durability|waterproof|fire)\b/.test(t)
  ) {
    return "material_info"
  }

  // FAQ — business / process questions
  if (
    /\b(guarantee|warranty|how long|kitne din|kitne time|process|install|labor|worker|team|experience|kab se|kitne saal|review|feedback|trust|legit|real|fake|scam|safe)\b/.test(t)
  ) {
    return "faq"
  }

  // Off-topic detection
  if (
    /\b(cricket|ipl|football|movie|film|news|politics|election|weather|joke|meme|recipe|khana|game|song|music|gf|girlfriend|bf|love|date|shaadi|marriage|job|naukri|stock|share market|crypto|bitcoin)\b/.test(t)
  ) {
    return "off_topic"
  }

  return "unknown"
}

// ─────────────────────────────────────────────────────────────
// [I2] Contact Gate — only trigger for booking-stage requests
// ─────────────────────────────────────────────────────────────

function needsContactCollection(intent: Intent, ctx: ConversationContext): boolean {
  // Already have phone — no need
  if (ctx.phone) return false
  // Only ask contact during booking intent
  return intent === "booking"
}

// ─────────────────────────────────────────────────────────────
// [I3] Repetition Guard
// ─────────────────────────────────────────────────────────────

function isRepetitive(
  newReply: string,
  history: Array<{ role: "user" | "assistant"; content: string }>
): boolean {
  const lastAssistantReplies = history
    .filter((m) => m.role === "assistant")
    .slice(-3)
    .map((m) => m.content.trim().toLowerCase())

  const normalizedNew = newReply.trim().toLowerCase()

  for (const prev of lastAssistantReplies) {
    // Similarity check: if >70% of words overlap, it's repetitive
    const prevWords = new Set(prev.split(/\s+/).filter((w) => w.length > 3))
    const newWords = normalizedNew.split(/\s+/).filter((w) => w.length > 3)
    if (newWords.length === 0) continue
    const overlap = newWords.filter((w) => prevWords.has(w)).length
    if (overlap / newWords.length > 0.7) return true
  }
  return false
}

// ─────────────────────────────────────────────────────────────
// [I4] Enhanced Hindi/Hinglish Normalizer (extended)
// ─────────────────────────────────────────────────────────────

function enhancedNormalize(text: string): string {
  // First apply library normalizer
  let t = normalizeTypos(text)

  // Extended Hindi/Hinglish patterns
  const patterns: [RegExp, string][] = [
    // Common typos / alternate spellings
    [/\bgypsum\b/gi, "gypsum"],
    [/\bjipsum\b/gi, "gypsum"],
    [/\bgipsum\b/gi, "gypsum"],
    [/\bpv[ck]\b/gi, "pvc"],
    [/\bwpc\b/gi, "wpc"],
    [/\bsiling\b/gi, "ceiling"],
    [/\bseeling\b/gi, "ceiling"],
    [/\bwall panel\b/gi, "wall panel"],
    [/\bwallpanel\b/gi, "wall panel"],
    [/\bmodular\b/gi, "modular"],
    [/\bmoduler\b/gi, "modular"],
    [/\bkitna\b/gi, "kitna"],
    [/\bkitne?\b/gi, "kitna"],
    [/\bkitni\b/gi, "kitna"],
    [/\bhoga\b/gi, "lagega"],
    [/\bkarega\b/gi, "lagega"],
    [/\bparega\b/gi, "lagega"],
    [/\bthoda\b/gi, "thoda"],
    [/\bthodi\b/gi, "thoda"],
    [/\bhaan\b/gi, "haan"],
    [/\bnahi(n)?\b/gi, "nahi"],
    [/\bnahin\b/gi, "nahi"],
    [/\bacha\b/gi, "acha"],
    [/\bachha\b/gi, "acha"],
    [/\bacha\b/gi, "acha"],
    [/\bbhai\b/gi, "bhai"],
    [/\byaar\b/gi, "yaar"],
    [/\bbata(o|na)?\b/gi, "batao"],
    [/\bdekha(o|na)?\b/gi, "dikhao"],
    [/\bsamjha(o|na)?\b/gi, "samjhao"],
  ]

  for (const [regex, replacement] of patterns) {
    t = t.replace(regex, replacement)
  }

  return t
}

// ─────────────────────────────────────────────────────────────
// [F1] Smarter dimension extractor (MULTI-ROOM SUPPORTED)
// ─────────────────────────────────────────────────────────────

function extractRoomDimensions(text: string): string | null {
  const t = text.toLowerCase()

  const SKIP_PATTERNS = [
    /\d+\s*(?:baje?|am\b|pm\b)/,
    /\d+\s*(?:din|day|week|month|saal)/,
    /\d+\s*(?:ghante?|hour|minute)/,
    /(?:subah|sham|raat|dopahar)\s*\d+/,
    /[6-9]\d{9}/,
    /\d{10,}/,
  ]

  for (const skip of SKIP_PATTERNS) {
    if (skip.test(t)) return null
  }

  // --- यहाँ से नया मल्टी-रूम चेक शुरू होता है ---
  // हम चेक करेंगे कि क्या मैसेज में एक से ज्यादा साइज पैटर्न्स मौजूद हैं
  const allMatches = [...text.matchAll(/(\d{1,3})\s*[x×*]\s*(\d{1,3})/gi)];
  
  if (allMatches.length > 1) {
    // अगर 1 से ज़्यादा रूम के साइज मिले, तो हम एक स्पेशल फ्लैग रिटर्न करेंगे 
    // जिसे हमारा POST फंक्शन नीचे समझ जाएगा।
    return "MULTI_ROOM_DETECTED";
  }
  // --- मल्टी-रूम चेक ख़त्म ---

  const ROOM_CONTEXT =
    /room|kamra|hall|bedroom|kitchen|bathroom|ceiling|floor|wall|area|size|maap|dimension|sq|sqft/i
  const hasDimContext = ROOM_CONTEXT.test(t)

  // Pattern 1: "12x10", "12×10", "12*10"
  const m1 = text.match(/(\d{1,3})\s*[x×*]\s*(\d{1,3})/i)
  if (m1) {
    const l = parseInt(m1[1]),
      w = parseInt(m1[2])
    if (l >= 5 && w >= 5 && l <= 80 && w <= 80) {
      return `${Math.max(l, w)}x${Math.min(l, w)}`
    }
  }

  // Pattern 2: "12 by 10" — only if room context present
  if (hasDimContext) {
    const m2 = text.match(/(\d{1,3})\s*(?:feet|ft|foot)?\s*by\s*(\d{1,3})/i)
    if (m2) {
      const l = parseInt(m2[1]),
        w = parseInt(m2[2])
      if (l >= 5 && w >= 5 && l <= 80 && w <= 80) {
        return `${Math.max(l, w)}x${Math.min(l, w)}`
      }
    }
  }

  // Pattern 3: "about 15x12" or "approx 14x11"
  const m3 = text.match(/(?:about|approx|around|lagbhag|kareeb)\s+(\d{1,3})\s*[x×*]\s*(\d{1,3})/i)
  if (m3) {
    const l = parseInt(m3[1]),
      w = parseInt(m3[2])
    if (l >= 5 && w >= 5 && l <= 80 && w <= 80) {
      return `${Math.max(l, w)}x${Math.min(l, w)}`
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

  // Enrich from recent history
  for (const msg of history.slice(-6)) {
    if (msg.role !== "user") continue
    const norm = enhancedNormalize(msg.content.toLowerCase())
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

// ─────────────────────────────────────────────────────────────
// [I9] Conversation Stage Auto-Advance
// ─────────────────────────────────────────────────────────────

function advanceStage(
  currentStage: ConversationContext["conversationStage"],
  intent: Intent,
  ctx: ConversationContext
): ConversationContext["conversationStage"] {
  if (!currentStage || currentStage === "greeting") {
    if (intent !== "greeting" && intent !== "off_topic") return "discovery"
  }
  if (currentStage === "discovery") {
    if (ctx.service || ctx.roomType) return "consultation"
  }
  if (currentStage === "consultation") {
    if (ctx.roomSize || intent === "pricing") return "estimation"
  }
  if (currentStage === "estimation") {
    if (intent === "booking" || intent === "affirmation") return "booking"
  }
  return currentStage ?? "discovery"
}

// ─────────────────────────────────────────────────────────────
// [I5] Smart Context-Aware Fallback (no random contact dumps)
// ─────────────────────────────────────────────────────────────

function smartFallback(
  lead: ChatRequest["leadContext"] | undefined,
  message: string,
  intent: Intent,
  ctx: ConversationContext
): string {
  const nm = lead?.name ? `${lead.name} ji, ` : ""
  const oh = isOffHours()

  // Off-topic redirect — [I8]
  if (intent === "off_topic") {
    return `${nm}Main JK Interior ki Riya hoon — interior design aur renovation mein help karti hoon. Kaunsa room design karna hai? 😊`
  }

  // Booking request — now is the right time to ask for contact
  if (intent === "booking") {
    if (ctx.phone) {
      return oh
        ? `${nm}Booking note kar li hai! 🙌 Team kal 9 AM pe call karegi. Urgent ho toh WhatsApp karein: +91 8651070831`
        : `${nm}Booking note kar li! 🙌 Hum aapko 2-3 ghante mein call karenge. WhatsApp: +91 8651070831`
    }
    return `${nm}Bilkul! Free site visit arrange kar dete hain. 📞 Apna WhatsApp number share karein — team aapko call karegi.`
  }

  // Pricing inquiry — answer first, ask room size only if missing
  if (intent === "pricing") {
    const topicName = ctx.lastTopic
      ? { pvc: "PVC Ceiling", gypsum: "Gypsum Ceiling", wpc: "WPC Wall Panels", uv: "UV Marble Sheets", tvunit: "TV Unit" }[ctx.lastTopic] || ctx.lastTopic
      : null

    if (topicName && ctx.roomSize) {
      const parts = ctx.roomSize.split("x").map(Number).filter(n => !isNaN(n) && n > 0)
      const area = parts.length >= 2 ? parts[0] * parts[1] : parts[0] || 0
      if (area > 0) {
        const isGypsum = topicName.includes("Gypsum")
        const low = isGypsum ? area * 100 : area * 70
        const high = isGypsum ? area * 140 : area * 120
        return `${nm}${topicName} ke liye rough estimate:\n• ₹${low.toLocaleString("en-IN")}–₹${high.toLocaleString("en-IN")}\n\nFinal quote ke liye free site visit? 📐`
      }
    }
    if (topicName) {
      return `${nm}${topicName} ke liye room ka size batao (jaise 12×14 ft) — exact estimate nikaalta hoon! 📐`
    }
    return `💰 JK Interior Rates:\n• Gypsum Ceiling — ₹80–140/sq.ft\n• PVC Ceiling — ₹60–120/sq.ft\n• WPC Panels — ₹180–450/sq.ft\n• UV Marble Sheets — ₹50–95/sq.ft\n• Modular TV Unit — ₹15,000 se shuru\n\nKaunse kaam ka estimate chahiye?`
  }

  // Off-hours without booking intent
  if (oh) {
    return `${nm}Abhi office band hai 🌙 Team kal 9 AM pe available hogi. Tab tak koi sawaal ho toh puchh sakte hain!`
  }

  // Context-aware discovery nudge — ask only what we don't know
  if (!ctx.service && !ctx.roomType) {
    return `${nm}Kaunsa kaam karwana hai — ceiling design, wall panels, modular furniture, ya kuch aur? Batao, estimate nikaalte hain! 🏠`
  }
  if (ctx.service && !ctx.roomSize) {
    return `${nm}${ctx.service} ke liye room ka size batao (jaise 12×14 ft) — rough estimate abhi milegi! 📐`
  }
  if (ctx.service && ctx.roomSize) {
    return `${nm}${ctx.service} — ${ctx.roomSize} ft room. Ek kaam karte hain, free site visit fix karte hain? Bilkul free hai! 🏡`
  }

  return `${nm}Kya jaanna chahte hain — pricing, design ideas, ya site visit? Batao! 😊`
}

// ─────────────────────────────────────────────────────────────
// [I7] Rewritten Groq System Prompt Builder
// ─────────────────────────────────────────────────────────────

function buildGroqSystemPrompt(
  basePrompt: string,
  leadContext: ChatRequest["leadContext"],
  ctx: ConversationContext,
  intent: Intent
): string {
  const name = ctx.name || leadContext?.name
  const city = ctx.city || leadContext?.city
  const service = ctx.service || leadContext?.service
  const roomSize = ctx.roomSize || leadContext?.roomSize
  const roomType = ctx.roomType || leadContext?.roomType
  const lastTopic = ctx.lastTopic || leadContext?.lastTopic
  const stage = ctx.conversationStage || leadContext?.conversationStage || "discovery"
  const hasPhone = !!(ctx.phone || leadContext?.phone)

  const contextBlock = `

=== CURRENT CUSTOMER STATE ===
Name: ${name || "unknown"}
City: ${city || "not mentioned"}
Service Interest: ${service || "not specified"}
Room Size: ${roomSize ? roomSize + " ft" : "not given"}
Room Type: ${roomType || "not specified"}
Last Topic: ${lastTopic || "none"}
Conversation Stage: ${stage}
Detected Intent: ${intent}
Phone Collected: ${hasPhone ? "YES — do NOT ask again" : "no"}
================================

=== YOUR IDENTITY ===
You are Riya, a friendly and knowledgeable AI consultant for JK Interior.
You help customers with: Gypsum Ceiling, PVC Ceiling, WPC Wall Panels, UV Marble Sheets, Modular TV Units, Wardrobes, Kitchen Interiors.

=== STRICT RULES (follow every single one) ===
1. ANSWER THE USER'S EXACT QUESTION FIRST — then add context or next step.
2. Never repeat information already given in this conversation.
3. Do NOT ask for room size if it's already known (${roomSize || "not yet given — you may ask once"}).
4. Do NOT ask for city if already known (${city || "not yet given"}).
5. Do NOT ask for WhatsApp/phone unless the customer explicitly asks to book, get a quote, or schedule a visit.
6. If the topic is off-topic (cricket, politics, news, jokes, food, relationships), respond ONLY with:
   "Main sirf JK Interior ke services ke baare mein help kar sakti hoon. Kaunsa room design karna hai?" — nothing else.
7. Language: reply in the SAME language the customer used (Hindi / Hinglish / English). Don't switch.
8. Length: max 5–6 lines. Use bullet points only for pricing or feature lists.
9. Tone: warm, human, helpful — not robotic or salesy.
10. End with ONE clear next step (a question, a suggestion, or an offer) — never end flatly.
11. Never hallucinate prices. Use only: Gypsum ₹80–140/sqft, PVC ₹60–120/sqft, WPC ₹180–450/sqft, UV Marble ₹50–95/sqft, TV Unit ₹15k+.
12. Never mention competitor brands or compare with outside companies.
======================================`

  return basePrompt + contextBlock
}

// ─────────────────────────────────────────────────────────────
// Groq API Call
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
          ...history.slice(-10).map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
          { role: "user", content: message },
        ],
        temperature: 0.35,   // Lower = more consistent, fewer hallucinations
        max_tokens: 450,     // Enforce conciseness
        top_p: 0.9,
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

    // [I4] Enhanced normalize
    const normMessage = enhancedNormalize(message?.trim() || "")

    // Extract room dimensions
    const extractedRoomSize =
      extractRoomDimensions(normMessage) ?? leadContext?.roomSize ?? undefined

    // ─── [NEW MULTI-ROOM HANDLING START] ───
    if (extractedRoomSize === "MULTI_ROOM_DETECTED") {
      const { detectMultiRoomSizes } = await import("@/lib/consultant-engine")
      const multiRooms = detectMultiRoomSizes(normMessage)

      if (multiRooms.length > 1) {
        let totalArea = 0;
        let breakdownText = "";
        
        const minRate = 80;
        const maxRate = 140;

        multiRooms.forEach((room, index) => {
          const minCost = room.area * minRate;
          const maxCost = room.area * maxRate;
          totalArea += room.area;
          breakdownText += `${index + 1}. **${room.roomName}** (${room.length}×${room.width} = ${room.area} sq.ft): ₹${minCost.toLocaleString('en-IN')} – ₹${maxCost.toLocaleString('en-IN')}\n`;
        });

        const grandMin = totalArea * minRate;
        const grandMax = totalArea * maxRate;

        const multiRoomReply = `जी बिल्कुल, आपके सभी ${multiRooms.length} कमरों का कुल एरिया **${totalArea} sq.ft** होता है। पीवीसी (PVC) फॉल्स सीलिंग का अनुमानित खर्च नीचे ब्रेकअप के साथ दिया गया है:\n\n${breakdownText}\n💰 **कुल अनुमानित बजट (Grand Total):** ₹${grandMin.toLocaleString('en-IN')} से ₹${grandMax.toLocaleString('en-IN')} के बीच।\n\n✨ इस बजट में मटेरियल, लेबर और फिनिशिंग सब शामिल है। क्या आप डिज़ाइन कैटलॉग देखने और FINAL नाप के लिए **फ्री साइट विजिट** बुक करना चाहेंगे?`;

        const multiRoomContext = {
          roomSize: `${totalArea} sqft`,
          lastTopic: "pvc",
          lastIntent: "pricing",
          lastQuestionAsked: "site_visit",
          city: leadContext?.city,
          service: "pvc",
          roomType: "multi-room",
          budget: leadContext?.budget,
          conversationStage: leadContext?.conversationStage,
        };

        return ok(multiRoomReply, "local", multiRoomContext)
      }
    }
    // ─── [NEW MULTI-ROOM HANDLING END] ───

    // Build engine context
    const ctx = buildEngineContext(leadContext, history)

    // Fill missing fields from leadContext
    if (!ctx.city && leadContext?.city) ctx.city = leadContext.city
    if (!ctx.service && leadContext?.service) ctx.service = leadContext.service
    if (!ctx.roomType && leadContext?.roomType) ctx.roomType = leadContext.roomType
    if (!ctx.budget && leadContext?.budget) ctx.budget = leadContext.budget
    if (!ctx.roomSize && extractedRoomSize) ctx.roomSize = extractedRoomSize
    if (!ctx.phone && leadContext?.phone) ctx.phone = leadContext.phone

    // [I1] Detect intent
    const intent = detectIntent(normMessage, ctx)

    // [I9] Auto-advance conversation stage
    ctx.conversationStage = advanceStage(ctx.conversationStage, intent, ctx)

    const buildUpdatedContext = () => ({
      roomSize: ctx.roomSize || extractedRoomSize,
      lastTopic: ctx.lastTopic,
      lastIntent: intent,
      lastQuestionAsked: ctx.lastQuestionAsked,
      city: ctx.city || leadContext?.city,
      service: ctx.service || leadContext?.service,
      roomType: ctx.roomType || leadContext?.roomType,
      budget: ctx.budget || leadContext?.budget,
      conversationStage: ctx.conversationStage,
    })

    console.log(`[chat] ip=${ip} intent=${intent} stage=${ctx.conversationStage} msg="${message.slice(0, 60)}"`)

    // ── [I8] Hard off-topic redirect (before any engine call) ──
    if (intent === "off_topic") {
      const redirect =
        "Main sirf JK Interior ke services ke baare mein help kar sakti hoon. Kaunsa room design karna hai? 😊"
      return ok(redirect, "local", buildUpdatedContext())
    }

    // ── Layer 1: Follow-up resolution ────────────────────────
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

    // ── Layer 2: Rule Engine ──────────────────────────────────
    const engineReply = consultantReply(normMessage, ctx)

    if (engineReply) {
      // [I3] Repetition check
      if (!isRepetitive(engineReply, history)) {
        console.log("[chat] Layer 1 (rule engine) handled")
        return ok(engineReply, "local", buildUpdatedContext())
      }
      // If repetitive, fall through to Groq for a fresh angle
      console.log("[chat] Rule engine reply repetitive — escalating to Groq")
    }

    // ── Layer 3: Groq AI ──────────────────────────────────────
    const apiKey = process.env.GROQ_API_KEY ?? ""

    if (!apiKey) {
      console.warn("[chat] GROQ_API_KEY not set — using smart fallback")
      return ok(smartFallback(leadContext, message, intent, ctx), "local", buildUpdatedContext())
    }

    // [I7] Rewritten system prompt with full context + strict rules
    const systemPrompt = buildGroqSystemPrompt(buildSystemPrompt(leadContext), leadContext, ctx, intent)

    try {
      const reply = await callGroq(systemPrompt, history, message, apiKey)

      // [I3] Groq reply repetition check
      if (isRepetitive(reply, history)) {
        console.log("[chat] Groq reply repetitive — using smart fallback")
        return ok(smartFallback(leadContext, message, intent, ctx), "local", buildUpdatedContext())
      }

      console.log("[chat] Layer 3 (Groq) success")
      return ok(reply, "groq", buildUpdatedContext())
    } catch (error: any) {
      const errMsg = String(error?.message || "").toLowerCase()
      if (errMsg.includes("429") || errMsg.includes("quota")) {
        console.warn("[chat] Groq quota exceeded")
      } else if (errMsg.includes("abort")) {
        console.warn("[chat] Groq timeout")
      } else {
        console.error("[chat] Groq error:", error)
      }

      // ── Layer 4: Smart Fallback ───────────────────────────
      return ok(smartFallback(leadContext, message, intent, ctx), "local", buildUpdatedContext())
    }
  } catch (error) {
    console.error("[chat] Fatal server error:", error)
    return err("Internal server error", 500)
  }
  }

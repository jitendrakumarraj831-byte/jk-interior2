import { NextResponse } from "next/server"
import { z } from "zod"
import { buildSystemPrompt, detectIntent, MATERIAL_KNOWLEDGE, COMPARISONS, FAQ, formatPriceEstimate, parseMultiRoomQuery, generateMultiRoomEstimate } from "@/lib/business-data"

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

// ── Smart local fallback using business knowledge ──────────────────────────
function smartFallback(message: string, leadCtx?: { name?: string; service?: string; city?: string }): string {
  const t   = message.toLowerCase().trim()
  const nm  = leadCtx?.name || ""
  const knownCity = leadCtx?.city || ""
  const knownSvc  = leadCtx?.service || ""

  // ── Context detection helpers
  const CITY_MAP: Record<string, string> = {
    forbesganj: "Forbesganj", araria: "Araria", purnia: "Purnia", purnea: "Purnia",
    jogbani: "Jogbani", narpatganj: "Narpatganj", raniganj: "Raniganj",
    supaul: "Supaul", chhatapur: "Chhatapur", tribeniganj: "Tribeniganj",
    kishanganj: "Kishanganj", katihar: "Katihar",
  }
  const detectedCity = Object.entries(CITY_MAP).find(([k]) => t.includes(k))?.[1] || knownCity

  const roomMatch    = t.match(/(\d+)\s*room|ek\s*room|do\s*room|1\s*room|2\s*room|3\s*room/)
  const roomCount    = roomMatch ? (roomMatch[1] || "1") : null
  const hasHall      = /\bhall\b|\bdrawing room\b/.test(t)
  const hasKitchen   = /\bkitchen\b/.test(t)
  const hasBathroom  = /\bbathroom\b|\btoilet\b/.test(t)
  const hasDimension = /\d+\s*[x×by]\s*\d+/.test(t)
  const wantsWork    = /karwana|lagwana|karna|banana|chahiye|chahta|chahti|karwa/.test(t)
  const budgetLow    = /kam budget|budget kam|sasta|cheap|affordable|low budget|budget tight/.test(t)
  const wantsWaterproof = /waterproof|water proof/.test(t) || hasKitchen || hasBathroom

  // ── Room size estimate (has dimensions)
  const dimMatch = t.match(/(\d{1,2})\s*[x×by]\s*(\d{1,2})/)
  if (dimMatch) {
    const l = parseInt(dimMatch[1])
    const w = parseInt(dimMatch[2])
    const svc = t.includes("pvc") ? "pvc" : t.includes("wpc") ? "wpc" :
                t.includes("uv") || t.includes("marble") ? "uv" :
                t.includes("gypsum") ? "gypsum" : "gypsum"
    const svcName = svc === "pvc" ? "PVC Ceiling" : svc === "wpc" ? "WPC Wall Panel" :
                    svc === "uv" ? "UV Marble Sheet" : "Gypsum Ceiling"
    return formatPriceEstimate(l, w, svc, svcName) +
      `\n\nExact quote ke liye free site visit — call/WhatsApp: **+91 8651070831** 📞`
  }

  // ── Multi-room estimate — check before single-room logic
  const multiRooms = parseMultiRoomQuery(t)
  if (multiRooms) {
    const est = generateMultiRoomEstimate(multiRooms)
    const cta = detectedCity
      ? `\n\n📞 Free site visit ke liye WhatsApp karein: **+91 8651070831** — same day possible! ✅`
      : `\n\nAap kis city mein hain? City batao toh free site visit arrange ho sakti hai! 😊`
    return est + cta
  }

  // ── City + room work intent → ask size + material
  if (detectedCity && (roomCount || hasHall) && wantsWork && !hasDimension) {
    const cityLine = `${detectedCity} mein bilkul karte hain hum! 😊`
    const roomLine = roomCount ? `${roomCount} room` : "hall"
    if (knownSvc) {
      return `${cityLine}\n${knownSvc} ke liye ${roomLine} ka size bata dijiye — jaise 10×12 ya 12×14? Estimate abhi nikaalta hoon! 📐`
    }
    return `${cityLine}\n${roomLine} ke liye room ka approximate size bata dijiye — jaise 10×12 ya 12×14?\n\nAur ceiling ke liye PVC ya Gypsum prefer karenge, ya abhi decide nahi kiya?`
  }

  // ── Hall without size → suggest Gypsum, ask size
  if (hasHall && !hasDimension && !roomCount && wantsWork) {
    return `Hall ke liye Gypsum ceiling sabse popular choice hai — cove lighting ke saath bilkul amazing lagti hai! ✨\n\nHall ka size approx kitna hai? Jaise 14×16 ya 16×18? Size batao toh estimate abhi bata deta hoon.`
  }

  // ── Kitchen / Bathroom → PVC recommendation + ask size
  if ((hasKitchen || hasBathroom) && wantsWork && !hasDimension) {
    const room = hasKitchen ? "Kitchen" : "Bathroom"
    return `${room} ke liye PVC ceiling best hai — 100% waterproof, termite-proof, zero maintenance. 💧\n\n${room} ka size kya hai (jaise 8×10)? Estimate abhi nikaaluun!`
  }

  // ── Budget low → PVC recommendation + ask size
  if (budgetLow && !hasDimension) {
    return `Budget-friendly ke liye PVC ceiling best option hai — ₹60–120/sq.ft, waterproof bhi hai aur maintenance zero. 😊\n\nRoom ka size kya hai? Size batao toh estimate nikaaluun!`
  }

  // ── Waterproof asked directly
  if (wantsWaterproof && !wantsWork && !hasDimension) {
    return `Waterproof ke liye PVC ceiling (₹60–120/sq.ft) perfect hai — 100% waterproof, 20+ saal ki life. 💧\n\nKaunsi room ke liye chahiye aur size kya hai? Estimate abhi de deta hoon!`
  }

  // ── Comparisons
  if ((t.includes("pvc") && t.includes("gypsum")) ||
      (t.includes("difference") && (t.includes("pvc") || t.includes("gypsum")))) {
    return COMPARISONS["pvc-vs-gypsum"]
  }
  if ((t.includes("wpc") && (t.includes("uv") || t.includes("marble"))) ||
      (t.includes("better") && (t.includes("wpc") || t.includes("marble")))) {
    return COMPARISONS["wpc-vs-uv"]
  }

  // ── Material info
  if (t.includes("gypsum")) {
    const m = MATERIAL_KNOWLEDGE.gypsum
    return `✨ **Gypsum False Ceiling** — ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n⏱ Installation: ${m.installTime}\n🛡 ${m.warranty}\n\nRoom ka size bata dijiye — estimate nikaalta hoon! 😊`
  }
  if (t.includes("pvc")) {
    const m = MATERIAL_KNOWLEDGE.pvc
    return `🏠 **PVC False Ceiling** — ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n⏱ ${m.installTime}\n🛡 ${m.warranty}\n\nKaunsi room ke liye? Size batao toh estimate bhi deta hoon! 😊`
  }
  if (t.includes("wpc") || t.includes("wood panel") || t.includes("louver")) {
    const m = MATERIAL_KNOWLEDGE.wpc
    return `🪵 **WPC Wall Panels** — ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n⏱ ${m.installTime}\n🛡 ${m.warranty}\n\nTV wall ka size bata dijiye — estimate nikaaluun! 💪`
  }
  if (t.includes("uv") || t.includes("marble")) {
    const m = MATERIAL_KNOWLEDGE.uv
    return `💎 **UV Marble Sheets** — ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n⏱ ${m.installTime}\n🛡 ${m.warranty}\n\nWall ka size bata dijiye — estimate abhi deta hoon!`
  }
  if (t.includes("tv unit") || t.includes("tv panel") || t.includes("tv cabinet")) {
    const m = MATERIAL_KNOWLEDGE.tvunit
    return `📺 **Modular TV Unit** — ${m.price}\n\n✅ ${m.features.slice(0, 3).join(" | ")}\n\n🎯 Size & price:\n• 6-8 ft: ${m.sizes.small}\n• 8-10 ft: ${m.sizes.medium}\n• 10-14 ft: ${m.sizes.large}\n\nTV wall ka width bata dijiye — custom design ke liye free site visit available! 📐`
  }

  // ── FAQ matching
  for (const faq of FAQ) {
    if (faq.q.some(kw => t.includes(kw))) return faq.a
  }

  // ── Price intent → ask for size to give real estimate
  const PRICE_KW = ["price","cost","rate","kimat","daam","kitna","kharcha","budget","lagat","paisa","quote","how much","lagega"]
  if (PRICE_KW.some(k => t.includes(k))) {
    return `Estimate ke liye room ka size batao (jaise 12×14) aur material — PVC ya Gypsum ceiling?\n\nSize milte hi abhi calculate kar deta hoon! 📐`
  }

  // ── Booking intent
  const BOOK_KW = ["visit","book","site visit","bulao","aao","appointment","free visit","quotation"]
  if (BOOK_KW.some(k => t.includes(k))) {
    const oh = isOffHours()
    return `📅 **Free Site Visit — Bilkul Free!**\n\nHamare expert aayenge, measurements lenge, aur same day accurate quotation denge. Koi hidden charge nahi!\n\n📞 **+91 8651070831** pe call/WhatsApp karein${oh ? "\n\n🌙 Abhi office hours ke baad hai — team kal 9 baje contact karegi!" : " — aaj hi fix ho sakti hai! ✅"}`
  }

  // ── Default — ask for the most useful next detail
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


import { useCallback, useEffect, useRef, useState } from "react"
import { galleryImages } from "@/lib/gallery-data"
import { motion, AnimatePresence } from "framer-motion"
import {
  CALL_NUMBER,
  WA_NUMBER,
  PHONE_PRIMARY_DISPLAY,
  PHONE_SECONDARY_DISPLAY,
  INITIAL_QUICK_REPLIES,
  buildRoomEstimate,
  estimateDisclaimer,
  extractDimensions,
  findService,
  isSizeOnlyMessage,
  type Dimensions,
} from "@/lib/business-data"
import { copyFor } from "@/lib/assistant-copy"
import { resolveReplyLanguage, type ReplyLanguage } from "@/lib/reply-language"
import { SERVICES_SUMMARY } from "@/lib/services-summary"
import { AssistantMark } from "@/components/ui/assistant-mark"
import { AssistantLauncher } from "@/components/ui/assistant-launcher"
import {
  type ConversationMemory,
  createMemory,
  clearMemory,
  loadMemory,
  saveMemory,
  extractFromText,
  mergeMemory,
  updateStage,
} from "@/lib/memory"

// ── Types ──────────────────────────────────────────────────────────────────────
type Role    = "bot" | "user"
type MsgKind = "text" | "card"
/** `galleryType` names a gallery category whose photos render under the bubble. */
type Message = { id: number; role: Role; text: string; kind?: MsgKind; cardData?: LeadCard; galleryType?: string }
type ConvMsg = { role: "user" | "assistant"; content: string }
type Lead    = { name: string; phone: string; city?: string; service?: string }
type LeadCard = Lead & { timestamp: string; estimate?: string; preferredTime?: string }
/** Which booking detail the assistant is currently waiting for. */
type CollectStep = "name" | "phone" | "city" | "time"

// ── Config ─────────────────────────────────────────────────────────────────────
// Contact numbers and the service-area list come from lib/business-data.ts and
// lib/seo.ts — the same source the rest of the site renders from.
const CITY_MAP: Record<string, string> = {
  forbesganj: "Forbesganj", araria: "Araria", purnia: "Purnia",
  purnea: "Purnia", kishanganj: "Kishanganj", katihar: "Katihar",
  narpatganj: "Narpatganj", raniganj: "Raniganj", jogbani: "Jogbani",
  supaul: "Supaul", chhatapur: "Chhatapur", tribeniganj: "Tribeniganj",
  bhargama: "Bhargama", palasi: "Palasi",
}

const QUICK_ACTION_MAP: Record<string, string> = {
  "📂 View Designs": "Show me your ceiling design photos",
  "✨ Book a Free Site Visit": "I would like to book a free site visit",
}

// ── Helpers ────────────────────────────────────────────────────────────────────
let _id = 0
const uid   = () => ++_id
const mk    = (role: Role, text: string, kind?: MsgKind, cardData?: LeadCard): Message =>
  ({ id: uid(), role, text, kind: kind ?? "text", cardData })
const mkId  = (id: number, role: Role, text: string, kind?: MsgKind, cardData?: LeadCard): Message =>
  ({ id, role, text, kind: kind ?? "text", cardData })
const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

/**
 * Outside the hours business-facts.ts publishes: Mon–Sat 8:00 AM – 8:00 PM,
 * Sunday 9:00 AM – 6:00 PM. Sunday used to be treated as a weekday, so the
 * header claimed "Online now" at 7 PM on a Sunday, when nobody is.
 */
function isOffHours(): boolean {
  const parts = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric", hour12: false, weekday: "short", timeZone: "Asia/Kolkata",
  }).formatToParts(new Date())
  const istH = parseInt(parts.find(p => p.type === "hour")?.value ?? "12", 10)
  const isSunday = parts.find(p => p.type === "weekday")?.value === "Sun"
  return isSunday ? istH >= 18 || istH < 9 : istH >= 20 || istH < 8
}

function tryExtractPhone(raw: string): string | null {
  const m = raw.replace(/\D/g, "").match(/(?:0|91)?([6-9]\d{9})/)
  return m ? m[1] : null
}

function tryExtractName(raw: string): string {
  const phone = tryExtractPhone(raw)
  let s = phone ? raw.replace(phone, "").replace(/\b91\b/g, "").trim() : raw
  const stops = /\b(my|name|is|i|am|this|phone|number|mobile|contact|mera|naam|hai|hoon|ka|ki|ke|mujhe|main|me|aur|or|sir|madam)\b/gi
  s = s.replace(stops, " ").replace(/[^a-zA-Z\u0900-\u097F\s]/g, " ").replace(/\s+/g, " ").trim()
  const parts = s.split(/\s+/).filter(p => p.length > 1)
  return parts.slice(0, 2).join(" ")
}

function detectCity(t: string): string | null {
  for (const [key, val] of Object.entries(CITY_MAP)) {
    if (t.includes(key)) return val
  }
  return null
}

/** Names the service the visitor means, using the website's own service list. */
function detectService(t: string): string | null {
  return findService(t)?.name ?? null
}

/**
 * Instant estimate for a room the visitor has sized, calculated from the rate
 * band published on the service card — no rates of its own.
 *
 * Only used for a message that is *just* a size (see `isSizeOnlyMessage`).
 * Anything with a real question in it goes to the model, which is handed these
 * same figures already worked out.
 */
function generateEstimateFromDimensions(
  length: number,
  width: number,
  service: string | null,
  leadName: string | undefined,
  language: ReplyLanguage,
): string {
  const t = copyFor(language)
  const greeting = t.estimateIntro(leadName)
  const matched = service ? findService(service) : null

  if (matched) return `${greeting}${buildRoomEstimate(length, width, matched, { language })}${t.estimateClosing}`

  // No material named yet — price the two ceilings the site lists rather than
  // guessing one on the visitor's behalf.
  const ceilings = SERVICES_SUMMARY.filter(sv => sv.slug === "gypsum-ceiling" || sv.slug === "pvc-false-ceiling")
  const both = ceilings.map(sv => buildRoomEstimate(length, width, sv, { disclaimer: false, language })).join("\n\n")
  return `${greeting}${both}\n\n${estimateDisclaimer(language)} ${t.chooseMaterial}${t.estimateClosing}`
}

// ── Gallery ───────────────────────────────────────────────────────────────────
/**
 * The gallery category to show under a reply, or undefined when the visitor
 * wasn't asking to see anything.
 *
 * Worked out from the visitor's message before the reply is requested, because
 * the reply now streams: the old code only attached photos on the non-streaming
 * branch, so with the AI backend live "View Designs" answered in words and never
 * actually showed a design.
 */
function galleryCategoryFor(text: string, lastTopic: string | null, service?: string): string | undefined {
  if (!/photo|photos|pic|image|images|gallery|dikhao|dikha|dekh|show|design|kaam|काम|फोटो|दिखा|डिज़ाइन/i.test(text)) {
    return undefined
  }
  const haystack = `${text} ${lastTopic ?? ""} ${service ?? ""}`.toLowerCase()
  if (/gypsum|jipsum|pop\b|false\s*ceil/.test(haystack))                  return "Gypsum False Ceiling"
  if (/\bpvc\b/.test(haystack))                                           return "PVC Ceiling"
  if (/wpc|wall\s*panel|fluted|uv\s*marble|louver|louvre/.test(haystack)) return "WPC fluted panels & uv marble Sheet"
  if (/grid|mineral|office\s*ceil/.test(haystack))                         return "Grid Ceiling"
  if (/tv\s*unit|tv\s*cabinet|television|\btv\b/.test(haystack))          return "TV Unit Design"
  if (/grass|turf|garden/.test(haystack))                                  return "Artificial Grass"
  // Asked for designs with nothing named — show the finish the site sells most.
  return "Gypsum False Ceiling"
}

// ── store admin lead ──────────────────────────────────────────────────────────
function storeAdminLead(lead: Lead, estimate?: string, preferredTime?: string, chatHistory?: ConvMsg[]) {
  try {
    const raw = localStorage.getItem("jk_admin_leads") || "[]"
    const leads: LeadCard[] = JSON.parse(raw)
    const entry: LeadCard = { ...lead, timestamp: new Date().toISOString(), estimate, preferredTime }
    leads.unshift(entry)
    localStorage.setItem("jk_admin_leads", JSON.stringify(leads.slice(0, 100)))
  } catch {}
  const chat_summary = chatHistory && chatHistory.length > 0
    ? chatHistory
        .filter(m => m.role === "user")
        .slice(-5)
        .map(m => m.content.slice(0, 120))
        .join(" | ")
        .slice(0, 800)
    : undefined
  saveLeadToDB({ name: lead.name, phone: lead.phone, city: lead.city, service: lead.service, estimate, preferred_time: preferredTime, chat_summary })
}

function saveLeadToDB(data: { name: string; phone: string; city?: string; service?: string; estimate?: string; preferred_time?: string; chat_summary?: string }) {
  try {
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {})
  } catch {}
}

function extractEstimateSummary(text: string): string | null {
  const rng = text.match(/(₹[\d,]+ – ₹[\d,]+)/)
  return rng ? rng[1] : null
}

/**
 * A visitor part-way through booking a site visit who suddenly asks something
 * else — a rate, a warranty, photos — or who sends a new room size.
 *
 * Without this, the booking flow swallowed everything: whatever was typed at the
 * "what is your name?" question was stored as the name, and the question itself
 * went unanswered. The assistant now answers, then picks the booking back up.
 */
const COLLECTION_ESCAPE_RE =
  /\?|？|\b(kya|kaise|kaisa|kaisi|kitna|kitne|kitni|kyun|kyu|kahan|kab|rate|rates|price|cost|kharcha|charge|warranty|guarantee|photo|photos|pic|design|designs|gallery|dikhao|dikha|sample|what|how|why|when|where|which|much|show|difference|better|matlab)\b|(क्या|कितना|कितने|कितनी|कैसे|क्यों|कहाँ|कहां|कब|दिखा|रेट|फोटो|डिज़ाइन|डिजाइन|वारंटी)/i

function isCollectionEscape(text: string, step: CollectStep, dims: Dimensions | null): boolean {
  // A valid answer to the exact question that was asked always wins.
  if (step === "phone" && tryExtractPhone(text)) return false
  if (step === "city" && detectCity(text.toLowerCase())) return false
  // A room size typed here is a new room to price, never a name or a visit time.
  if (dims && step !== "time") return true
  return COLLECTION_ESCAPE_RE.test(text)
}

/** How long the assistant may stay silent before the request is given up on. */
const IDLE_TIMEOUT_MS = 15_000

const LEAD_INTENT_RE = /\b(site\s*visit|book\s*(?:visit|karo|karein)|karwana\s*(?:hai|h\b)|visit\s*chahiye|free\s*visit|milna\s*chahta|milna\s*chahti|baat\s*karni\s*hai|sampark\s*karo|visit\s*book|appointment|bulao\s*(?:ji|please)?|aao\s*(?:zara|ji|please)?|booking\s*karni|visit\s*chahiye|aana\s*hai|visit\s*confirm)\b/i

// ── AI API call ────────────────────────────────────────────────────────────────
async function getAIReply(
  message: string,
  history: ConvMsg[],
  lead: Partial<Lead> | null,
  sessionId: string,
  memory?: ConversationMemory,
  onChunk?: (partial: string, isFirst: boolean) => void,
  extras?: { roomSize?: string | null; lastTopic?: string | null; lastQuestionAsked?: string | null; messagesExchanged?: number },
): Promise<{ 
  reply: string; 
  source: "groq" | "local"; 
  updatedContext?: {
    roomSize?: string
    lastTopic?: string
    lastIntent?: string
    city?: string
    service?: string
    lastQuestionAsked?: string | null
    conversationStage?: string
  }
} | null> {
  try {
    const useStream = typeof onChunk === "function"
    const url = useStream ? "/api/chat?stream=1" : "/api/chat"

    // A single AbortSignal.timeout() used to cover the whole request, streaming
    // included — so any reply that took longer than the deadline to finish
    // arriving was cut off mid-sentence and thrown away. The timer below is an
    // *idle* one instead: it fires only when nothing has arrived for a while, and
    // is pushed back by every chunk.
    const controller = new AbortController()
    let idleTimer = setTimeout(() => controller.abort(), IDLE_TIMEOUT_MS)
    const keepAlive = () => {
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => controller.abort(), IDLE_TIMEOUT_MS)
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history: history.slice(-8),
        sessionId,
        memory: memory ?? undefined,
        leadContext: {
  name:      lead?.name      || undefined,
  phone:     lead?.phone     || undefined,
  city:      lead?.city      || undefined,
  service:   lead?.service   || undefined,
  roomSize:  extras?.roomSize  || undefined,
  lastTopic: extras?.lastTopic || undefined,
  messagesExchanged: extras?.messagesExchanged || 0,
  lastQuestionAsked: extras?.lastQuestionAsked || null,
  conversationStage: (extras?.messagesExchanged ?? 0) > 6 ? "consultation" : (extras?.messagesExchanged ?? 0) > 2 ? "discovery" : "greeting",
},
      }),
      signal: controller.signal,
    })
    if (!res.ok) {
      clearTimeout(idleTimer)
      // A non-2xx here means the widget is about to fall back to its offline
      // script — logging why keeps that silent-looking swap diagnosable instead
      // of indistinguishable from "the AI just decided not to answer."
      console.error(`[JK Chat] /api/chat responded ${res.status}; falling back to offline reply.`)
      return null
    }
    const contentType = res.headers.get("content-type") || ""

    if (contentType.includes("text/plain") && res.body && onChunk) {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ""
      let isFirst = true
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          keepAlive()
          const chunk = decoder.decode(value, { stream: true })
          if (!chunk) continue
          fullText += chunk
          onChunk(fullText, isFirst)
          isFirst = false
        }
      } catch (err) {
        // Connection dropped part-way. Whatever arrived is a real, complete-enough
        // sentence far more often than not — keep it rather than wiping the reply
        // and replacing it with the offline notice.
        if (!fullText.trim()) {
          console.error("[JK Chat] AI stream dropped before any content arrived; falling back to offline reply.", err)
          return null
        }
      } finally {
        clearTimeout(idleTimer)
      }
      if (!fullText.trim()) {
        console.error("[JK Chat] AI stream completed with empty content; falling back to offline reply.")
        return null
      }
      return { reply: fullText, source: "groq" }
    }

    clearTimeout(idleTimer)
    const data = await res.json()
    if (!data.ok || !data.reply) {
      console.error("[JK Chat] AI backend returned no usable reply; falling back to offline reply.", data.error)
      return null
    }
    return {
      reply: data.reply as string,
      source: (data.source as "groq" | "local") ?? "groq",
      updatedContext: data.updatedContext ?? undefined,
    }
  } catch (err) {
    console.error("[JK Chat] AI request failed; falling back to offline reply.", err)
    return null
  }
}

/**
 * Offline reply — used only when /api/chat is unreachable (no key configured, a
 * network drop, an upstream timeout). It deliberately answers nothing on its
 * own: it repeats the rate published on the matching service card, or points at
 * the phone. Every scripted answer this widget used to carry has been removed,
 * because a second, hand-written copy of the business facts is exactly how the
 * assistant ended up quoting services and rates the website doesn't offer.
 */
function localFallback(
  input: string,
  lead: Partial<Lead> | null,
  roomSize: string | null | undefined,
  language: ReplyLanguage,
): string {
  const t = copyFor(language)
  const service = findService(input) || (lead?.service ? findService(lead.service) : null)

  if (service && roomSize) {
    const [l, w] = roomSize.split("x").map(Number)
    if (Number.isFinite(l) && Number.isFinite(w)) {
      return `${buildRoomEstimate(l, w, service, { language })}\n\n📞 ${PHONE_PRIMARY_DISPLAY} · ${PHONE_SECONDARY_DISPLAY}`
    }
  }

  if (service) {
    return [
      `**${service.name}** — ${service.price} · ${service.installTime}`,
      ``,
      `${service.whereUsedFirst}. ${service.avoid}`,
      ``,
      t.askSizeFor(service.name),
    ].join("\n")
  }

  const rateList = SERVICES_SUMMARY.map(sv => `• ${sv.name} — ${sv.price}`).join("\n")
  return [t.offlineIntro, ``, rateList, ``, t.offlineOutro].join("\n")
}

// These two are always pinned as the first chips in the strip
const PINNED_QUICK_ACTIONS = ["📂 View Designs", "✨ Book a Free Site Visit"] as const

/**
 * Chips only ever suggest something the website can actually answer — a listed
 * service, an estimate, the free site visit. Nothing about trends, colour
 * schemes or materials JK Interior doesn't fit.
 */
function getContextualQuickReplies(
  hasLead: boolean,
  hasEstimate: boolean,
  lastBotText: string,
  lastTopic: string | null,
): string[] {
  let contextual: string[]
  if (hasEstimate) {
    contextual = ["Book a free site visit", "Warranty", "Payment options"]
  } else if (hasLead) {
    const current = lastTopic ? findService(lastTopic) : null
    const others = SERVICES_SUMMARY.filter(sv => sv.slug !== current?.slug).slice(0, 2)
    contextual = current
      ? [`${current.name} estimate`, ...others.map(sv => `${sv.name} rate`)]
      : ["I need an estimate", ...others.map(sv => `${sv.name} rate`)]
  } else {
    contextual = INITIAL_QUICK_REPLIES.slice(0, 4)
  }
  return [...PINNED_QUICK_ACTIONS, ...contextual]
}

// ── Icons ──────────────────────────────────────────────────────────────────────
const IChatBubble = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>)
const IClose = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-[18px] w-[18px]"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>)
const ISend = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>)
const IWA = () => (<svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.054 23.447a.5.5 0 00.611.61l5.7-1.461A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>)
const ICal = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>)
const IPhone = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2.74h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.34a16 16 0 0 0 6.06 6.06l1.66-1.66a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>)

// ── Mic Icon ──────────────────────────────────────────────────────────────────
const IMic = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
)

// ── MicStop Icon ──────────────────────────────────────────────────────────────
const IMicStop = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <rect x="6" y="6" width="12" height="12" rx="2"/>
  </svg>
)

// Rich text renderer
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g)
  return (<>{parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong>
    if (p.startsWith("*") && p.endsWith("*"))   return <em key={i} className="not-italic text-[11px] opacity-70">{p.slice(1, -1)}</em>
    return <span key={i}>{p}</span>
  })}</>)
}

// Typing dots
const TypingDots = () => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex items-end gap-2">
    <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-gold-600 to-gold-800 flex items-center justify-center shadow-sm">
      <AssistantMark className="h-3 w-3 text-white" />
    </div>
    <div className="rounded-2xl rounded-bl-sm px-4 py-3 shadow-md bg-white border border-gray-100">
      <div className="flex gap-[5px] items-center h-[14px]">
        {[0, 160, 320].map(d => (
          <motion.span
            key={d}
            className="h-[7px] w-[7px] rounded-full bg-gold-500"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: d / 1000 }}
          />
        ))}
      </div>
    </div>
  </motion.div>
)

// Lead confirmation card
function LeadConfirmCard({ data, language }: { data: LeadCard; language: ReplyLanguage }) {
  const t = copyFor(language)
  const rows = [
    { label: "👤 Name",    value: data.name },
    { label: "📱 Phone",   value: data.phone },
    { label: "📍 City",    value: data.city       || "—" },
    { label: "🔧 Service", value: data.service    || "—" },
    ...(data.estimate     ? [{ label: "💰 Estimate",  value: data.estimate }]     : []),
    ...(data.preferredTime ? [{ label: "📅 Visit",     value: data.preferredTime }] : []),
  ]
  const d  = new Date(data.timestamp)
  const ts = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`
  const waMsg = [`🏠 JK Interior Inquiry`,`👤 ${data.name}`,`📱 ${data.phone}`,data.city && `📍 ${data.city}`,data.service && `🔧 ${data.service}`,data.estimate && `💰 Estimate: ${data.estimate}`,data.preferredTime && `📅 Visit: ${data.preferredTime}`,"\nPlease confirm the free site visit. 🙏"].filter(Boolean).join("\n")
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`
  const bookHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hello JK Interior, this is ${data.name}${data.city ? ` from ${data.city}` : ""}. I would like to book a free site visit${data.preferredTime ? ` — ${data.preferredTime}` : ""}. Please confirm.`)}`
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-bl-sm overflow-hidden border border-gold-200 shadow-lg bg-white">
      <div className="bg-gradient-to-r from-gold-700 to-gold-500 px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-2">
        <span className="text-lg shrink-0">🎉</span>
        <div className="min-w-0"><p className="text-[11px] md:text-xs font-bold text-white leading-tight">{t.cardTitle}</p><p className="text-[9px] md:text-[10px] text-white/70">{ts}</p></div>
      </div>
      <div className="px-3 md:px-4 py-2 md:py-2.5 space-y-1.5">
        {rows.map(r => (<div key={r.label} className="flex items-start gap-2 text-[11px] md:text-xs"><span className="text-gray-500 shrink-0 w-16 md:w-20 text-[10px] md:text-[11px] font-medium">{r.label}</span><span className="font-semibold break-all text-[11px] md:text-[12px] text-gray-800 flex-1">{r.value}</span></div>))}
      </div>
      <div className="px-3 md:px-4 pb-3 md:pb-3.5 pt-1 md:pt-1.5 space-y-2">
        <p className="text-[10px] md:text-[11px] text-gold-700 font-semibold text-center bg-gold-50 rounded-lg py-1.5">{t.teamWillContact}</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2 md:py-2.5 text-[10px] md:text-[11px] font-bold text-white hover:opacity-90 transition-all"><IWA /> WhatsApp</a>
          <a href={bookHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gold-700 py-2 md:py-2.5 text-[10px] md:text-[11px] font-bold text-white hover:bg-gold-600 transition-all"><ICal /> Confirm on WhatsApp</a>
        </div>
      </div>
    </motion.div>
  )
}

const welcomeMessage = (language: ReplyLanguage) => mk("bot", copyFor(language).welcome)

// ── Main Component ────────────────────────────────────────────────────────────
// NOTE: The large WhatsApp and Call buttons visible below the chat are rendered
// in the PARENT PAGE (not here). Remove them from your page layout/component.
// Example: Delete any <a href="https://wa.me/..."> and <a href="tel:..."> buttons
// that appear outside this JKChat component in your page JSX.
/**
 * `startOpen` is passed by App when the visitor clicked the launcher before this
 * chunk had loaded — the panel then opens as soon as it arrives, so the click
 * isn't swallowed by the download.
 */
export default function JKChat({ startOpen = false }: { startOpen?: boolean }) {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(startOpen)
  const [messages, setMsgs] = useState<Message[]>(() => [welcomeMessage("english")])
  const [input, setInput] = useState("")
  const [lead, setLead] = useState<Partial<Lead> | null>(null)
  const [lastTopic, setLastTopic] = useState<string | null>(null)
  const [roomSize, setRoomSize] = useState<string | null>(null)
  const [typing, setTyping] = useState(false)
  const [aiMode, setAiMode] = useState(true)
  const [offHours, setOffHours] = useState(false)
  const [memory, setMemory] = useState<ConversationMemory>(createMemory)
  const memoryRef = useRef<ConversationMemory>(memory)
  /**
   * The language every reply — the model's and the widget's own scripted lines —
   * is written in. Sticky per conversation, so a visitor who has been typing
   * Hinglish and then sends just "12x14" is still answered in Hinglish.
   */
  const [language, setLanguage] = useState<ReplyLanguage>("english")
  const languageRef = useRef<ReplyLanguage>("english")
  const t = copyFor(language)

  // ── Voice / Speech-to-Text State ──────────────────────────────────────────
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  const historyRef = useRef<ConvMsg[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const sendLock       = useRef(false)
  const sessionIdRef   = useRef<string>(Math.random().toString(36).slice(2, 10))
  const streamingIdRef = useRef<number | null>(null)
  const [collectStep, setCollectStep] = useState<CollectStep | null>(null)
  const [pendingEstimate, setPendingEstimate] = useState<string | null>(null)

  useEffect(() => { memoryRef.current = memory }, [memory])
  useEffect(() => { languageRef.current = language }, [language])

  // ── Check voice support ───────────────────────────────────────────────────
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      setVoiceSupported(true)
      const recognition = new SpeechRecognition()
      recognition.lang = "hi-IN"      // Hindi primary
      recognition.interimResults = true
      recognition.continuous = false
      recognition.maxAlternatives = 1

      recognition.onresult = (event: any) => {
        let transcript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        setInput(transcript)
      }
      recognition.onend = () => {
        setIsListening(false)
      }
      recognition.onerror = () => {
        setIsListening(false)
      }
      recognitionRef.current = recognition
    }
    return () => {
      recognitionRef.current?.abort?.()
      recognitionRef.current = null
    }
  }, [])

  // ── Start / Stop Voice ────────────────────────────────────────────────────
  const toggleVoice = useCallback(() => {
    if (!recognitionRef.current) return
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setInput("")
      recognitionRef.current.start()
      setIsListening(true)
    }
  }, [isListening])

  // Mount immediately. This chunk is only downloaded once the visitor has asked
  // for the assistant (or the browser prefetched it while idle), so deferring
  // again here only added latency to a click that already happened. The state
  // still exists to keep localStorage and Web Speech access out of prerender.
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => { setOffHours(isOffHours()) }, [])
  useEffect(() => { document.body[open ? "setAttribute" : "removeAttribute"]("data-chat-open", "1") }, [open])

  useEffect(() => {
    const savedMem = loadMemory()
    memoryRef.current = savedMem
    setMemory(savedMem)
    if (savedMem.language && savedMem.language !== "english") {
      setLanguage(savedMem.language)
      languageRef.current = savedMem.language
      // The welcome was rendered in English before storage could be read — swap
      // it for the returning visitor's language rather than greeting them twice.
      setMsgs(prev => (prev.length === 1 && prev[0].role === "bot" ? [welcomeMessage(savedMem.language!)] : prev))
    }
    try {
      const raw = localStorage.getItem("jk_chat_v5")
      if (raw) {
        const { lead: l, topic: tp } = JSON.parse(raw)
        if (l) {
          setLead(l)
          setLastTopic(tp ?? null)
          if (!savedMem.name && l.name) {
            const updated = mergeMemory(savedMem, { name: l.name, phone: l.phone, city: l.city })
            memoryRef.current = updated
            setMemory(updated)
            saveMemory(updated)
          }
        }
      }
    } catch {}
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    requestAnimationFrame(() => el.scrollTo({ top: el.scrollHeight, behavior: messages.length > 3 ? "smooth" : "auto" }))
  }, [messages, typing, open])
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => inputRef.current?.focus(), 350)
    return () => clearTimeout(timer)
  }, [open])

  const persist = (l: Partial<Lead> | null, tp: string | null) => {
    try { localStorage.setItem("jk_chat_v5", JSON.stringify({ lead: l, topic: tp })) } catch {}
  }


  // Core send
  const send = useCallback(async (override?: string) => {
    // Map pinned quick-action chip labels → actual message text sent to the API
    const text = (QUICK_ACTION_MAP[override ?? ""] ?? (override ?? input)).trim()
    if (!text || typing || sendLock.current) return

    // Stop listening if voice was active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }

    sendLock.current = true
    setInput("")
    setMsgs(prev => [...prev, mk("user", text)].slice(-100))
    setTyping(true)

    // Everything below can throw on unexpected input (a malformed memory blob,
    // a network primitive that isn't there). Without this wrapper, an
    // exception anywhere past this point left `sendLock` stuck `true` forever
    // — the chat would show "typing…" and silently refuse every message after
    // until the widget was reset. The `finally` guarantees the lock always
    // clears, whatever branch is taken or however it exits.
    try {

      // Settle the language first: every scripted line produced in this turn — the
      // estimate, the booking questions, the offline notice — has to come out in
      // the same language the model is being told to answer in.
      const replyLanguage = resolveReplyLanguage(text, languageRef.current)
      languageRef.current = replyLanguage
      setLanguage(replyLanguage)
      const say = copyFor(replyLanguage)

      // History as the model should see it — without the message being answered,
      // which is passed separately. Appending first meant the visitor's words
      // arrived twice on every single turn.
      const historyBefore = historyRef.current
      historyRef.current = [...historyBefore, { role: "user", content: text }]

      {
        // Merged unconditionally, not only when something was extracted: the turn
        // counter and the language belong in memory whatever the visitor typed,
        // and `summarizeForPrompt` keys off that counter.
        const memUpd = extractFromText(text, memoryRef.current, "user")
        const merged = mergeMemory(memoryRef.current, { ...memUpd, language: replyLanguage }, true)
        merged.stage = updateStage(merged)
        memoryRef.current = merged
        setMemory(merged)
        saveMemory(merged)
      }

      const dims = extractDimensions(text)
      const serviceFromMsg = detectService(text.toLowerCase())
      const currentService = serviceFromMsg || lead?.service || null
      const galleryType = galleryCategoryFor(text, lastTopic, currentService ?? undefined)

      // ✅ Service save (only if not already known)
      if (serviceFromMsg && !lead?.service) {
        const updLead = { ...(lead || {}), service: serviceFromMsg }
        setLead(updLead)
        persist(updLead, serviceFromMsg.toLowerCase().replace(/\s+/g, "-"))
        setLastTopic(serviceFromMsg.toLowerCase().replace(/\s+/g, "-"))
      }

      // Mid-booking, the visitor may simply ask something else. Detecting that and
      // answering it — then picking the booking back up — is the difference between
      // an assistant and a form: "PVC ka rate kya hai?" typed at the name question
      // used to be saved as the customer's name.
      const divertedStep = collectStep && isCollectionEscape(text, collectStep, dims) ? collectStep : null

      const resumeCollection = async () => {
        if (!divertedStep) return
        await delay(600)
        const reask =
          divertedStep === "name"  ? say.askName :
          divertedStep === "phone" ? say.askPhone :
          divertedStep === "city"  ? say.askCity :
                                     say.askTime(lead?.city)
        const line = `${say.resumeCollection} ${reask}`
        historyRef.current = [...historyRef.current, { role: "assistant", content: line }]
        setMsgs(prev => [...prev, mk("bot", line)])
      }

      // ── Instant estimate ──────────────────────────────────────────────────────
      // Only for a message that is *nothing but* a room size. A message that also
      // carries a question ("12x14 hall, warranty kitni hai?") goes to the model,
      // which receives these very figures already worked out — answering the size
      // and ignoring the question is what made the assistant feel deaf.
      if (dims && isSizeOnlyMessage(text, dims) && !galleryType) {
        if (!divertedStep) setCollectStep(null)
        await delay(400)
        const estimateReply = generateEstimateFromDimensions(dims.length, dims.width, currentService, lead?.name, replyLanguage)
        const estSummary = extractEstimateSummary(estimateReply)
        if (estSummary) setPendingEstimate(estSummary)
        historyRef.current = [...historyRef.current, { role: "assistant", content: estimateReply }]
        setMsgs(prev => [...prev, mk("bot", estimateReply)])

        // Record the estimate so the assistant never re-asks for a size it has,
        // or re-quotes a room it has already priced.
        const estUpd = extractFromText(estimateReply, memoryRef.current, "bot")
        if (Object.keys(estUpd).length > 0) {
          const merged = mergeMemory(memoryRef.current, estUpd)
          merged.stage = updateStage(merged)
          memoryRef.current = merged
          setMemory(merged)
          saveMemory(merged)
        }

        const newRoomSize = `${dims.length}x${dims.width}`
        setRoomSize(newRoomSize)
        const svcSlug = currentService ? currentService.toLowerCase().replace(/\s+/g, "-") : lastTopic
        if (svcSlug) setLastTopic(svcSlug)
        const newLead = { ...(lead || {}), ...(currentService && !lead?.service ? { service: currentService } : {}) }
        setLead(newLead)
        persist(newLead, svcSlug)
        await resumeCollection()
        return
      }

      // ── Booking details, one field at a time ──────────────────────────────────
      if (collectStep && !divertedStep) {
        let collReply = ""
        const tLower = text.toLowerCase()
        if (collectStep === "name") {
          const extractedName = tryExtractName(text)
          const name = extractedName || text.trim()
          if (!name || name.length < 2) {
            collReply = say.askNameAgain
          } else {
            const updated = { ...(lead || {}), name }
            setLead(updated); persist(updated, lastTopic)
            setCollectStep("phone")
            collReply = say.thanksAskPhone(name)
          }
        } else if (collectStep === "phone") {
          const phone = tryExtractPhone(text)
          if (!phone) collReply = say.askPhoneAgain
          else {
            const city = detectCity(tLower) || lead?.city
            const updated = { ...(lead || {}), phone, city: city || undefined }
            setLead(updated); persist(updated, lastTopic)
            if (city) { setCollectStep("time"); collReply = say.askTime(city) }
            else { setCollectStep("city"); collReply = say.askCity }
          }
        } else if (collectStep === "city") {
          const city = detectCity(tLower) || (text.trim().length > 2 ? text.trim() : null)
          if (!city) collReply = say.askCityAgain
          else {
            const updated = { ...(lead || {}), city }
            setLead(updated); persist(updated, lastTopic)
            setCollectStep("time")
            collReply = say.askTime(city)
          }
        } else if (collectStep === "time") {
          const preferredTime = text.trim()
          setCollectStep(null)
          const finalLead: Lead = {
            name:    lead?.name    || "Friend",
            phone:   lead?.phone   || "",
            city:    lead?.city,
            service: lead?.service,
          }
          storeAdminLead(finalLead, pendingEstimate || undefined, preferredTime, historyRef.current)
          const card: LeadCard = {
            ...finalLead,
            estimate:      pendingEstimate || undefined,
            preferredTime,
            timestamp:     new Date().toISOString(),
          }
          historyRef.current = [...historyRef.current, { role: "assistant", content: say.bookingConfirmed }]
          setMsgs(prev => [...prev, mk("bot", "lead_card", "card", card)])
          return
        }

        historyRef.current = [...historyRef.current, { role: "assistant", content: collReply }]
        setMsgs(prev => [...prev, mk("bot", collReply)])
        return
      }

      const svc = serviceFromMsg
      const city = detectCity(text.toLowerCase())
      const extractedPhone = tryExtractPhone(text)
      let updatedLead = lead ? { ...lead } : null
      if (extractedPhone && !lead?.phone) {
        const extractedName = tryExtractName(text)
        updatedLead = { ...(lead || {}), phone: extractedPhone, name: extractedName || lead?.name || "Friend", city: city || lead?.city, service: svc || lead?.service }
        setLead(updatedLead)
        storeAdminLead(updatedLead as Lead, pendingEstimate || undefined, undefined, historyRef.current)
      } else {
        // Save city and/or service together — don't lose one when both are detected
        const needsCity    = city && !lead?.city
        const needsService = svc  && !lead?.service
        if (needsCity || needsService) {
          updatedLead = {
            ...(lead || {}),
            ...(needsCity    ? { city }        : {}),
            ...(needsService ? { service: svc } : {}),
          }
          setLead(updatedLead)
        }
      }

      let reply: string | null = null
      let wasStreamed = false

      if (aiMode) {
        const aiResult = await getAIReply(
          text,
          historyBefore,
          updatedLead,
          sessionIdRef.current,
          memoryRef.current,
          (partial, isFirst) => {
            wasStreamed = true
            if (isFirst) {
              setTyping(false)
              const newId = uid()
              streamingIdRef.current = newId
              setMsgs(prev => [...prev, mkId(newId, "bot", partial)])
            } else if (streamingIdRef.current !== null) {
              const sid = streamingIdRef.current
              setMsgs(prev => prev.map(m => m.id === sid ? { ...m, text: partial } : m))
            }
          },
          { roomSize, lastTopic, messagesExchanged: memoryRef.current.messagesExchanged },
        )
        if (aiResult) {
          reply = aiResult.reply
          if (aiResult.updatedContext) {
            const ctx = aiResult.updatedContext
            if (ctx.roomSize && !roomSize) setRoomSize(ctx.roomSize)
            if (ctx.lastTopic && ctx.lastTopic !== lastTopic) setLastTopic(ctx.lastTopic)
            if (ctx.city || ctx.service) {
              setLead(prev => ({
                ...prev,
                city: ctx.city || prev?.city,
                service: ctx.service || prev?.service,
              }))
            }
          }
        }
      }

      if (!reply) {
        if (wasStreamed && streamingIdRef.current !== null) {
          setMsgs(prev => prev.filter(m => m.id !== streamingIdRef.current))
          streamingIdRef.current = null
          setTyping(true)
        }
        wasStreamed = false
        await delay(400)
        reply = localFallback(text, updatedLead, roomSize, replyLanguage)
      }

      historyRef.current = [...historyRef.current, { role: "assistant", content: reply }]

      {
        const replyUpd = extractFromText(reply, memoryRef.current, "bot")
        if (Object.keys(replyUpd).length > 0) {
          const merged = mergeMemory(memoryRef.current, replyUpd)
          merged.stage = updateStage(merged)
          memoryRef.current = merged
          setMemory(merged)
          saveMemory(merged)
        }
      }

      const newTopic = svc ? svc.toLowerCase().replace(/\s+/g, "-") : lastTopic
      if (svc && newTopic) {
        const slug = newTopic
        const prevTopics = memoryRef.current.topicHistory
        if (!prevTopics.includes(slug)) {
          const topicMem = mergeMemory(memoryRef.current, {
            topicHistory: [slug, ...prevTopics].slice(0, 15),
            previousTopics: { ...memoryRef.current.previousTopics, [slug]: true },
          })
          memoryRef.current = topicMem
          setMemory(topicMem)
          saveMemory(topicMem)
        }
      }

      setLastTopic(newTopic)
      persist(updatedLead, newTopic)
      const estSummary = extractEstimateSummary(reply)
      if (estSummary && !pendingEstimate) setPendingEstimate(estSummary)

      const finalStreamId = streamingIdRef.current
      streamingIdRef.current = null

      setMsgs(prev => {
        // `galleryType` is applied on both branches. It used to be set only on the
        // non-streaming one, so with the AI backend live the "View Designs" button
        // answered in words and never showed a single photo.
        let next: Message[]
        if (wasStreamed && finalStreamId !== null) {
          next = prev.map(m => m.id === finalStreamId ? { ...m, text: reply!, galleryType } : m)
        } else {
          next = [...prev, { ...mk("bot", reply as string), galleryType }]
        }
        if (extractedPhone && !lead?.phone && updatedLead?.phone) {
          const card: LeadCard = { name: updatedLead.name || "Friend", phone: updatedLead.phone!, city: updatedLead.city, service: updatedLead.service, estimate: pendingEstimate || estSummary || undefined, timestamp: new Date().toISOString() }
          next = [...next, mk("bot", "lead_card", "card", card)]
        }
        return next
      })

      if (divertedStep) {
        setTyping(false)
        await resumeCollection()
        return
      }

      const hasLeadIntent = LEAD_INTENT_RE.test(text.toLowerCase()) && !updatedLead?.phone && !extractedPhone && !dims
      if (hasLeadIntent) {
        setTyping(false); await delay(1100); setTyping(true); await delay(700)
        let startMsg: string
        if (updatedLead?.name && updatedLead?.phone) {
          startMsg = say.askTime(updatedLead.city)
          setCollectStep("time")
        } else if (updatedLead?.name) {
          startMsg = `${updatedLead.name} — ${say.askPhone}`
          setCollectStep("phone")
        } else {
          startMsg = say.askName
          setCollectStep("name")
        }
        historyRef.current = [...historyRef.current, { role: "assistant", content: startMsg }]
        setMsgs(prev => [...prev, mk("bot", startMsg)])
        setTyping(false)
        return
      }
    } finally {
      setTyping(false)
      sendLock.current = false
    }
  }, [input, lead, typing, lastTopic, roomSize, aiMode, collectStep, pendingEstimate, isListening])

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }

  const lastBotMsg = messages.filter(m => m.role === "bot").slice(-1)[0]?.text || ""
  const hasEstimate = lastBotMsg.includes("₹") || !!pendingEstimate
  const qrSet = getContextualQuickReplies(!!lead?.phone, hasEstimate, lastBotMsg, lastTopic)
  const statusText = offHours ? t.statusOffHours : t.statusOnline

  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes jk-voice-ring { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.4); opacity: 0.2; } }
        @keyframes jk-soundwave { 0%, 100% { height: 6px; } 50% { height: 18px; } }
        .scrollbar-luxury::-webkit-scrollbar { width: 4px; }
        .scrollbar-luxury::-webkit-scrollbar-track { background: #eef2f0; border-radius: 8px; }
        .scrollbar-luxury::-webkit-scrollbar-thumb { background: #b8d9cc; border-radius: 8px; }
        .jk-voice-pulse { animation: jk-voice-ring 1.2s ease-in-out infinite; }
        .jk-soundbar { animation: jk-soundwave 0.6s ease-in-out infinite; }
        .jk-soundbar:nth-child(2) { animation-delay: 0.1s; }
        .jk-soundbar:nth-child(3) { animation-delay: 0.2s; }
        .jk-soundbar:nth-child(4) { animation-delay: 0.15s; }
        .jk-soundbar:nth-child(5) { animation-delay: 0.05s; }
      `}</style>

      {/* ── Floating Button — Modern AI Chat Bubble ────────────────────────── */}
      {!open && (
        <AssistantLauncher onOpen={() => setOpen(true)} />
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.985 }}
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
            className="fixed z-50 flex flex-col overflow-hidden shadow-[0_24px_80px_rgba(15,23,42,0.25)] bottom-0 left-0 right-0 h-[94dvh] max-h-[720px] rounded-t-[28px] md:bottom-6 md:left-auto md:right-6 md:h-[640px] md:w-[420px] md:rounded-[28px] bg-white/85 backdrop-blur-2xl border border-white/50"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between px-4 py-2.5 md:px-5 md:py-3 bg-gradient-to-r from-[#141c26] via-[#1f2a37] to-[#2e3b4a] text-white">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="relative flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/30 shrink-0">
                  <AssistantMark className="h-4 w-4 md:h-[18px] md:w-[18px] text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-gold-300 border-2 border-gold-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-bold leading-tight truncate">JK Interior AI Assistant</p>
                  <p className="text-[10px] text-white/70 font-medium">{statusText}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => {
                    setMsgs([welcomeMessage("english")])
                    setLead(null)
                    setLastTopic(null)
                    setRoomSize(null)
                    setCollectStep(null)
                    setPendingEstimate(null)
                    setLanguage("english")
                    languageRef.current = "english"
                    historyRef.current = []
                    const freshMem = createMemory()
                    memoryRef.current = freshMem
                    setMemory(freshMem)
                    // clearMemory() removes the key lib/memory.ts actually writes.
                    // This used to delete "jk_chat_memory_v2", a key nothing has
                    // ever written, so a cleared conversation — name, phone,
                    // rooms and all — came straight back on the next page load.
                    clearMemory()
                    try { localStorage.removeItem("jk_chat_v5") } catch {}
                  }}
                  title="Clear the conversation"
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 text-white/70 hover:text-white text-[11px] font-bold transition-colors"
                >↺</button>
                <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"><IClose /></button>
              </div>
            </div>

            {aiMode && (
              <div className="shrink-0 flex items-center gap-2 px-3 md:px-4 py-1.5 bg-gold-50 border-b border-gold-100">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse shrink-0" />
                <p className="text-[9px] md:text-[10px] text-gold-700 font-medium">AI powered · instant estimates</p>
              </div>
            )}

            {/* Voice listening indicator bar */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="shrink-0 flex items-center gap-3 px-4 py-2 bg-red-50 border-b border-red-100"
                >
                  <div className="flex items-end gap-[3px] h-[16px]">
                    {[1,2,3,4,5].map((_, i) => (
                      <span
                        key={i}
                        className="w-[3px] rounded-full bg-red-500 jk-soundbar"
                        style={{ height: [6, 12, 16, 10, 6][i], animationDelay: `${i * 0.08}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-red-600 font-semibold">{t.listening} 👂</p>
                  <button
                    onClick={toggleVoice}
                    className="ml-auto text-[9px] text-red-500 font-bold border border-red-300 rounded-full px-2 py-0.5 hover:bg-red-100"
                  >Stop</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 min-h-0 overflow-y-auto px-3 md:px-4 py-3.5 md:py-5 space-y-3 scrollbar-luxury"
              style={{ background: "linear-gradient(180deg, #f7faf9 0%, #ffffff 45%, #f6fbfa 100%)" }}
            >
              {messages.map((m, idx) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.018, 0.12), duration: 0.24 }}
                  className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "bot" && m.kind !== "card" && (
                    <div className="shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-gold-600 to-gold-800 flex items-center justify-center">
                      <AssistantMark className="h-3 w-3 text-white" />
                    </div>
                  )}
                  {m.role === "bot" && m.kind === "card" && <div className="h-6 w-6 shrink-0" />}

                  {m.kind === "card" && m.cardData ? (
                    <LeadConfirmCard data={m.cardData} language={language} />
                  ) : (
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] whitespace-pre-line rounded-2xl px-3 md:px-4 py-2 md:py-2.5 text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed shadow-sm ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-[#1b5c52] to-[#2f8a7a] text-white rounded-br-md break-words shadow-[0_8px_24px_rgba(31,111,97,0.22)]"
                          : "bg-white/95 text-slate-700 rounded-bl-md border border-slate-200/80 break-words shadow-[0_8px_20px_rgba(15,23,42,0.08)]"
                      }`}
                    >
                      <RichText text={m.text} />
                      {m.galleryType && (
                        <div className="mt-2 md:mt-3 flex gap-2 md:gap-3 overflow-x-auto pb-1.5">
                          {galleryImages
                            .filter(img => img.category === m.galleryType)
                            .slice(0, 6)
                            .map((img, i) => (
                              <img key={i} src={img.src} alt={img.alt} loading="lazy" decoding="async" fetchPriority="low" className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl object-cover border border-gray-200 shrink-0" />
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
              {typing && <div className="px-1"><TypingDots /></div>}
            </div>

            {/* ── Quick Action Buttons (pinned) ── */}
            <div className="shrink-0 flex gap-2 px-3 md:px-4 pt-2.5 pb-1.5 bg-white/80 backdrop-blur border-t border-slate-200/70 overflow-x-auto">
              <button
                onClick={() => send("📂 View Designs")}
                disabled={typing}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gold-300 bg-gradient-to-r from-gold-50 to-gold-100 px-3 py-2 text-[11px] md:text-[12px] font-semibold text-gold-800 shadow-sm hover:from-gold-100 hover:to-gold-200 hover:shadow-md active:scale-95 transition-all disabled:opacity-40 whitespace-nowrap min-w-[140px]"
              >
                <span className="text-base leading-none">📂</span>
                <span>View Designs</span>
              </button>
              <button
                onClick={() => send("✨ Book a Free Site Visit")}
                disabled={typing}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gold-600 bg-gradient-to-r from-gold-600 to-gold-500 px-3 py-2 text-[11px] md:text-[12px] font-semibold text-white shadow-sm hover:from-gold-500 hover:to-gold-400 hover:shadow-md active:scale-95 transition-all disabled:opacity-40 whitespace-nowrap min-w-[140px]"
              >
                <span className="text-base leading-none">✨</span>
                <span>Book a Site Visit</span>
              </button>
            </div>

            {/* ── Contextual Quick Reply Chips ── */}
            <div className="shrink-0 flex gap-2 overflow-x-auto px-3 md:px-4 pb-[max(10px,env(safe-area-inset-bottom))] bg-white/80 scrollbar-luxury">
              {qrSet.filter(q => !["📂 View Designs", "✨ Book a Free Site Visit"].includes(q)).map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={typing}
                  className="shrink-0 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50 active:scale-95 transition-all whitespace-nowrap disabled:opacity-40"
                >
                  {q}
                </button>
              ))}
            </div>



            {/* Input Row — with Voice Mic Button */}
            <div className="shrink-0 flex items-center gap-2 border-t border-slate-200/80 bg-white/90 backdrop-blur px-3 py-2.5 pb-[max(10px,env(safe-area-inset-bottom))]">
              {/* Voice Mic Button — always visible */}
              <motion.button
                onClick={voiceSupported ? toggleVoice : undefined}
                whileTap={{ scale: 0.9 }}
                className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                  isListening
                    ? "bg-red-500 text-white shadow-lg"
                    : voiceSupported
                    ? "bg-gold-100 border border-gold-400 text-gold-800 hover:bg-gold-200"
                    : "bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed"
                }`}
                title={isListening ? "Recording — tap to stop" : voiceSupported ? "Dictate your message" : "Voice input is not supported here"}
              >
                {isListening && (
                  <span className="absolute inset-0 rounded-full bg-red-400 opacity-40 animate-ping" />
                )}
                {isListening ? <IMicStop /> : <IMic />}
              </motion.button>

              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder={isListening ? t.listening : t.placeholder}
                className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-colors"
                autoComplete="off"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || typing}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#144a41] to-[#1f6f61] text-white shadow-lg hover:shadow-xl active:scale-90 transition-all disabled:opacity-40"
              >
                <ISend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { galleryImages } from "@/lib/gallery-data"
import { motion, AnimatePresence } from "framer-motion"
import {
  MATERIAL_KNOWLEDGE,
  COMPARISONS,
  FAQ,
  formatPriceEstimate,
  parseMultiRoomQuery,
  generateMultiRoomEstimate,
  INITIAL_QUICK_REPLIES,
} from "@/lib/business-data"
import {
  type ConversationMemory,
  createMemory,
  loadMemory,
  saveMemory,
  extractFromText,
  mergeMemory,
  updateStage,
  getBudgetContext,
} from "@/lib/memory"

// ── Types ──────────────────────────────────────────────────────────────────────
type Role    = "bot" | "user"
type MsgKind = "text" | "card"
type Message = { id: number; role: Role; text: string; kind?: MsgKind; cardData?: LeadCard }
type ConvMsg = { role: "user" | "assistant"; content: string }
type Lead    = { name: string; phone: string; city?: string; service?: string }
type LeadCard = Lead & { timestamp: string; estimate?: string; preferredTime?: string }

// ── Config ─────────────────────────────────────────────────────────────────────
const WA_NUMBER   = "918651070831"
const CALL_NUMBER = "+918651070831"
const AREAS       = ["Forbesganj", "Araria", "Jogbani", "Raniganj", "Narpatganj", "Kursakanta", "Tribeniganj", "Chhatapur", "Supaul", "Purnia"]

const CITY_MAP: Record<string, string> = {
  forbesganj: "Forbesganj", araria: "Araria", purnia: "Purnia",
  purnea: "Purnia", kishanganj: "Kishanganj", katihar: "Katihar",
  narpatganj: "Narpatganj", raniganj: "Raniganj", jogbani: "Jogbani",
  supaul: "Supaul", chhatapur: "Chhatapur", tribeniganj: "Tribeniganj",
  bhargama: "Bhargama", palasi: "Palasi",
}

// ── Helpers ────────────────────────────────────────────────────────────────────
let _id = 0
const uid   = () => ++_id
const pick  = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
const has   = (t: string, kw: string[]) => kw.some(k => t.includes(k))
const mk    = (role: Role, text: string, kind?: MsgKind, cardData?: LeadCard): Message =>
  ({ id: uid(), role, text, kind: kind ?? "text", cardData })
const mkId  = (id: number, role: Role, text: string, kind?: MsgKind, cardData?: LeadCard): Message =>
  ({ id, role, text, kind: kind ?? "text", cardData })
const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

function isOffHours(): boolean {
  const istH = new Date(Date.now() + 5.5 * 3600000).getUTCHours()
  return istH >= 21 || istH < 9
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

function detectService(t: string): string | null {
  if (t.includes("pvc")) return "PVC Ceiling"
  if (t.includes("gypsum") || t.includes("pop ") || t.includes("plaster")) return "Gypsum Ceiling"
  if (t.includes("wpc") || t.includes("louver") || t.includes("wood panel")) return "WPC Wall Panels"
  if (t.includes("uv ") || t.includes("marble")) return "UV Marble Sheets"
  if (t.includes("tv unit") || t.includes("tv panel") || t.includes("tv wall")) return "Modular TV Unit"
  if (t.includes("fluted")) return "Fluted Panels"
  if (t.includes("false ceiling") || t.includes("ceiling") || t.includes("chhat")) return "False Ceiling"
  if (t.includes("wall panel") || t.includes("deewar") || t.includes("accent wall")) return "Wall Panels"
  if (t.includes("complete interior") || t.includes("full interior") || t.includes("poora ghar")) return "Complete Interior"
  return null
}

// ─── DIMENSIONS ENGINE (NO LOOP) ──────────────────────────────────────────────
function extractDimensions(text: string): { length: number; width: number; rawMatch: string } | null {
  const patterns = [
    /(\d+(?:\.\d+)?)\s*[x×*]\s*(\d+(?:\.\d+)?)/i,
    /(\d+(?:\.\d+)?)\s*(?:feet|ft)?\s*by\s*(\d+(?:\.\d+)?)/i,
    /(\d+(?:\.\d+)?)\s*(?:length|lg|len)[^\d]*(\d+(?:\.\d+)?)/i,
  ]
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      let l = parseFloat(match[1])
      let w = parseFloat(match[2])
      if (!isNaN(l) && !isNaN(w) && l > 0 && w > 0) {
        if (l < w) [l, w] = [w, l] // normalize to length >= width
        return { length: l, width: w, rawMatch: match[0] }
      }
    }
  }
  return null
}

function getPremiumAdvice(area: number, materialType: string): string {
  if (area > 250) return "For this spacious area, we recommend a cove lighting design with premium Gypsum or WPC panels to enhance the luxury feel."
  if (area > 150) return "Great size! You can add elegant LED strips around the perimeter for a modern, high-end atmosphere."
  if (materialType.includes("WPC")) return "WPC panels will give a rich wooden texture – perfect for a feature wall or TV unit backdrop."
  if (materialType.includes("PVC")) return "PVC is lightweight and waterproof – ideal for kitchens or balconies, with zero maintenance."
  return "We can customize the design with subtle indirect lighting to elevate the look."
}

function generateEstimateFromDimensions(
  length: number,
  width: number,
  service: string | null,
  leadName?: string
): string {
  const area = Math.round(length * width)
  const materialKey = service?.toLowerCase().includes("pvc") ? "pvc" :
                      service?.toLowerCase().includes("gypsum") ? "gypsum" :
                      service?.toLowerCase().includes("wpc") ? "wpc" :
                      service?.toLowerCase().includes("uv") ? "uv" : "gypsum"
  const materialName = materialKey === "pvc" ? "PVC Ceiling" :
                       materialKey === "wpc" ? "WPC Wall Panels" :
                       materialKey === "uv" ? "UV Marble Sheets" : "Gypsum Ceiling"
  
  let priceRange = ""
  let priceLow = 0, priceHigh = 0
  switch (materialKey) {
    case "pvc": priceLow = 60; priceHigh = 120; break
    case "gypsum": priceLow = 80; priceHigh = 140; break
    case "wpc": priceLow = 180; priceHigh = 450; break
    case "uv": priceLow = 50; priceHigh = 95; break
  }
  const estimatedTotalLow = Math.round(area * priceLow)
  const estimatedTotalHigh = Math.round(area * priceHigh)
  priceRange = `₹${priceLow} – ₹${priceHigh} / sq.ft`
  
  const greeting = leadName ? `${leadName} ji, ` : ""
  const advice = getPremiumAdvice(area, materialName)
  
  return `${greeting}according to your **${length}' × ${width}'** room (${area} sq.ft), the estimate for **${materialName}** is:\n\n💰 ${priceRange}\n📐 Total project range: **₹${estimatedTotalLow.toLocaleString()} – ₹${estimatedTotalHigh.toLocaleString()}**\n\n✨ ${advice}\n\nWould you like me to arrange a **free site visit** for an exact quote? Just say "Book Visit" or share your preferred date.`
}

// ── store admin lead ──────────────────────────────────────────────────────────
function storeAdminLead(lead: Lead, estimate?: string, preferredTime?: string) {
  try {
    const raw = localStorage.getItem("jk_admin_leads") || "[]"
    const leads: LeadCard[] = JSON.parse(raw)
    const entry: LeadCard = { ...lead, timestamp: new Date().toISOString(), estimate, preferredTime }
    leads.unshift(entry)
    localStorage.setItem("jk_admin_leads", JSON.stringify(leads.slice(0, 100)))
  } catch {}
  saveLeadToDB({ name: lead.name, phone: lead.phone, city: lead.city, service: lead.service, estimate, preferred_time: preferredTime })
}

function saveLeadToDB(data: { name: string; phone: string; city?: string; service?: string; estimate?: string; preferred_time?: string }) {
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
  const std = text.match(/Standard[^:\n]*:\s*(₹[\d,]+ – ₹[\d,]+)/)
  if (std) return std[1]
  const rng = text.match(/(₹[\d,]+ – ₹[\d,]+)/)
  return rng ? rng[1] : null
}

const LEAD_INTENT_RE = /\b(site\s*visit|book\s*(?:visit|karo|karein)|karwana\s*(?:hai|h\b)|visit\s*chahiye|free\s*visit|milna\s*chahta|milna\s*chahti|baat\s*karni\s*hai|sampark\s*karo|visit\s*book|appointment|bulao\s*(?:ji|please)?|aao\s*(?:zara|ji|please)?|booking\s*karni|visit\s*chahiye|aana\s*hai|visit\s*confirm)\b/i

// ── AI API call (with streaming support) ───────────────────────────────────────
async function getAIReply(
  message: string,
  history: ConvMsg[],
  lead: Partial<Lead> | null,
  sessionId: string,
  memory?: ConversationMemory,
  onChunk?: (partial: string, isFirst: boolean) => void,
): Promise<{ reply: string; source: "gemini" | "local" } | null> {
  try {
    const useStream = typeof onChunk === "function"
    const url = useStream ? "/api/chat?stream=1" : "/api/chat"
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history: history.slice(-16),
        sessionId,
        memory: memory ?? undefined,
        leadContext: lead
          ? {
              name:    lead.name    || undefined,
              phone:   lead.phone   || undefined,
              city:    lead.city    || undefined,
              service: lead.service || undefined,
            }
          : undefined,
      }),
      signal: AbortSignal.timeout(30000),
    })
    if (!res.ok) return null
    const contentType = res.headers.get("content-type") || ""

    // ── Streaming path (Gemini text/plain) ──────────────────────────────────
    if (contentType.includes("text/plain") && res.body && onChunk) {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ""
      let isFirst = true
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        if (!chunk) continue
        fullText += chunk
        onChunk(fullText, isFirst)
        isFirst = false
      }
      return fullText ? { reply: fullText, source: "gemini" } : null
    }

    // ── JSON path (rule-based or non-streaming fallback) ─────────────────────
    const data = await res.json()
    if (!data.ok || !data.reply) return null
    return { reply: data.reply as string, source: (data.source as "gemini" | "local") ?? "gemini" }
  } catch {
    return null
  }
}

// ── Local fallback (rich knowledge-base) ────────────────────────────────────────
function localFallback(input: string, lead: Partial<Lead> | null): string {
  const t  = input.toLowerCase().trim()
  const nm = lead?.name || ""
  const oh = isOffHours()

  // Greetings
  const GREET_KW = ["hi","hello","hey","namaste","namaskar","helo","good morning","good evening","good afternoon","hy","hii","salam","kaise ho"]
  if (has(t, GREET_KW) && t.length < 35) return pick([
    `Namaste${nm ? " " + nm : ""}! ✨ I'm Riya, JK Interior's premium AI consultant.\n\nShare your room dimensions (e.g., 12×10) or ask about PVC, Gypsum, WPC – I’ll give you an instant estimate with design advice.`,
    `Welcome${nm ? " " + nm : ""} to JK Interior! 🏠 Luxury interiors made affordable. Tell me your room size and I’ll craft a custom quote.`,
  ])

  if (has(t, ["thank","shukriya","dhanyawad","thanks","thx","great","perfect"])) return `You're welcome${nm ? " " + nm : ""}! 🙏 Always here to help you design your dream space.`

  // Material specific
  if (t.includes("gypsum") || (t.includes("pop ") && !t.includes("popular"))) {
    const m = MATERIAL_KNOWLEDGE.gypsum
    const isWaterQ = has(t, ["paani","water","bathroom","nami","moisture","geela"])
    if (isWaterQ) return `Gypsum is not waterproof. For bathrooms/kitchens, choose **PVC ceiling** – 100% waterproof, ₹60-120/sq.ft. \n\nWould you like a site visit to see samples?`
    return `✨ **Gypsum False Ceiling** – ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n❌ Avoid: ${m.avoidIn}\n⏱ Install: ${m.installTime}\n🛡 ${m.warranty}\n\nReply with your room size for a precise quote.`
  }

  if (t.includes("pvc")) {
    const m = MATERIAL_KNOWLEDGE.pvc
    return `🏠 **PVC False Ceiling** – ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n⏱ Install: ${m.installTime}\n🛡 ${m.warranty}\n\nSend dimensions like 12×10 – I'll calculate total cost instantly.`
  }

  if (t.includes("wpc") || t.includes("wood panel")) {
    const m = MATERIAL_KNOWLEDGE.wpc
    return `🪵 **WPC Wall Panels** – ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n⏱ Install: ${m.installTime}\n🛡 ${m.warranty}\n\nPerfect for accent walls or TV units. Want a free consultation?`
  }

  if (t.includes("uv ") || t.includes("marble")) {
    const m = MATERIAL_KNOWLEDGE.uv
    return `💎 **UV Marble Sheets** – ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n❌ Avoid: ${m.avoidIn}\n⏱ Install: ${m.installTime}\n🛡 ${m.warranty}`
  }

  if (t.includes("tv unit")) {
    const m = MATERIAL_KNOWLEDGE.tvunit
    return `📺 **Modular TV Unit** – ${m.price}\n\nCustom designs available!\n📐 Size & price:\n• 6-8 ft: ${m.sizes.small}\n• 8-10 ft: ${m.sizes.medium}\n• 10-14 ft: ${m.sizes.large}\n\nLED backlight adds a premium touch.`
  }

  if (/\bmodular\s*kitchen\b|\bkitchen\s*cabinet\b|\bkitchen\s*design\b/.test(t)) {
    return `🍳 **Modular Kitchen** – ₹60,000 – ₹2,00,000\n\nFully custom — L-shape, U-shape, parallel layouts. Soft-close hinges, pull-outs, laminates/acrylic shutters.\n\nShare kitchen dimensions for an exact quote!`
  }

  if (/\bwardrobe\b|\bwardrop\b|\balmirah\b|\bcupboard\b|\balmari\b/.test(t)) {
    return `🚪 **Custom Wardrobe** – ₹800–₹2,000/sq.ft\n\nFloor-to-ceiling storage — sliding or hinged doors, LED inside option, fully customized shelves & drawers.\n\nShare bedroom size and wardrobe dimensions for a quote!`
  }

  // Budget amount query — "₹2 lakh mein kya ho jayega"
  if (/(?:lakh|lac\b|hazar|hajar)/.test(t) && /(?:mein|budget|kya|hoga|milega)/.test(t)) {
    const budgetAmt = extractBudgetAmount(t)
    if (budgetAmt) {
      const num = parseFloat(budgetAmt.replace(/[₹k,]/g, "")) * (budgetAmt.includes("k") ? 1000 : 1)
      if (num < 30000) return `${budgetAmt} budget mein: 1 room PVC ceiling ho sakti hai (₹60-120/sq.ft). Room ka size batao!`
      if (num < 80000) return `${budgetAmt} mein 1-2 rooms ka ceiling kaam hoga. Gypsum (hall) + PVC (kitchen/bath) – best combo!\n\nRoom details share karo!`
      if (num < 150000) return `${budgetAmt} mein 2BHK ki full ceiling + 1 accent wall WPC panel ho sakti hai. Rooms batao!`
      return `${budgetAmt} budget ke saath premium 2BHK interior possible hai — Gypsum cove lighting, WPC TV wall, UV marble bathroom!\n\nFree site visit: **+91 8651070831**`
    }
  }

  // Pricing intent
  if (has(t, ["price","cost","rate","kimat","daam","kitna","kharcha","budget","quote"])) {
    return `💰 **JK Interior – Luxury & Standard Price List**\n\n✨ Gypsum Ceiling    ₹80–₹140 / sq.ft\n🏠 PVC Ceiling       ₹60–₹120 / sq.ft\n🪵 WPC Wall Panels   ₹180–₹450 / sq.ft\n💎 UV Marble Sheets  ₹50–₹95 / sq.ft\n📺 Modular TV Unit   ₹15,000+\n🏛️ Fluted Panels     ₹200–₹500 / sq.ft\n🏢 Grid Ceiling      ₹45–₹90 / sq.ft\n🍳 Modular Kitchen   ₹60,000+\n🚪 Custom Wardrobe   ₹800/sq.ft+\n\nGive me your room dimensions for an exact estimate!`
  }

  // Booking
  if (has(t, ["visit","book","site visit","measurement","quotation","bulao","aao","free visit"])) {
    return `📅 **Free Site Visit** – No hidden charges. Our expert will measure, suggest designs, and give a final quote.\n\n📞 **+91 8651070831** (call/WhatsApp)${oh ? "\n🌙 Off-hours – we'll call tomorrow 9 AM." : " – available now!"}`
  }

  // Default
  return pick([
    nm ? `${nm}, share your room dimensions (like 12×10 or 14×12) and I’ll give you a detailed premium estimate!` : `Hi there! I'm Riya, your interior AI consultant. Give me your room size (e.g., 12×10) and I'll prepare a luxury estimate instantly ✨`,
    `Room dimensions please? (e.g., 12 feet by 14 feet) – then I can calculate costs, material suggestions, and design advice.`,
  ])
}

// ── Budget amount extractor ("₹2 lakh", "50 hazar", "1.5 lakh") ──────────────
function extractBudgetAmount(text: string): string | null {
  const t = text.toLowerCase().replace(/,/g, "")
  const lakhM = t.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lac|l\b)/)
  if (lakhM) {
    const val = parseFloat(lakhM[1]) * 100000
    return `₹${(val / 1000).toFixed(0)}k`
  }
  const hzrM = t.match(/(\d+(?:\.\d+)?)\s*(?:hazar|hajar|thousand|k\b)/)
  if (hzrM) {
    const val = parseFloat(hzrM[1]) * 1000
    return `₹${val.toLocaleString("en-IN")}`
  }
  const rupM = t.match(/₹\s*(\d+(?:\.\d+)?)/)
  if (rupM) {
    const val = parseFloat(rupM[1])
    if (val > 1000) return `₹${val.toLocaleString("en-IN")}`
  }
  return null
}

// ── Quick replies (dynamic based on context) ──────────────────────────────────
function getContextualQuickReplies(
  hasLead: boolean,
  hasEstimate: boolean,
  lastBotText: string,
  lastTopic: string | null,
): string[] {
  if (hasEstimate) return ["Book Free Visit", "Add LED Lighting", "Color Ideas", "Call Expert"]
  if (hasLead) {
    if (lastTopic?.includes("pvc"))      return ["Get Quote", "Book Site Visit", "PVC vs Gypsum", "WPC Panels"]
    if (lastTopic?.includes("gypsum"))   return ["Book Site Visit", "Add Cove Lighting", "PVC vs Gypsum", "Maintenance Tips"]
    if (lastTopic?.includes("wpc"))      return ["Book Site Visit", "Get Quote", "WPC vs UV Marble", "Color Ideas"]
    if (lastTopic?.includes("uv"))       return ["Book Site Visit", "Get Quote", "UV Marble Care", "Bathroom Design"]
    if (lastTopic?.includes("tv"))       return ["Book Site Visit", "Add LED Backlight", "Get Quote", "WPC Panels"]
    if (lastTopic?.includes("color"))    return ["Hall Colors", "Bedroom Colors", "Book Site Visit", "WPC Panels"]
    if (lastTopic?.includes("trend"))    return ["Fluted Panels", "Gypsum Ceiling", "WPC TV Wall", "Book Site Visit"]
    if (lastTopic?.includes("acoustic")) return ["Home Theatre", "Get Quote", "Book Site Visit", "Flooring"]
    if (lastTopic?.includes("floor"))    return ["Laminate Rate", "Vinyl Rate", "Book Site Visit", "Complete Package"]
    return ["Get Estimate", "Book Site Visit", "Color Ideas", "Latest Trends"]
  }
  const initial = INITIAL_QUICK_REPLIES.slice(0, 4)
  return [...initial, "2026 Trends"]
}

// ── Icons (inline SVG) ────────────────────────────────────────────────────────
const IChatBubble = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>)
const IClose = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-[18px] w-[18px]"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>)
const ISend = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>)
const IWA = () => (<svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.054 23.447a.5.5 0 00.611.61l5.7-1.461A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>)
const ICal = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>)
const IPhone = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2.74h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.34a16 16 0 0 0 6.06 6.06l1.66-1.66a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>)
const ISparkle = () => (<svg viewBox="0 0 24 24" className="h-3 w-3 fill-current"><path d="M12 2l1.8 5.4L19.2 6l-4.2 3.6L16.8 15 12 11.4 7.2 15l1.8-5.4L4.8 6l5.4 1.4z"/></svg>)

// Rich text renderer
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g)
  return (<>{parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong>
    if (p.startsWith("*") && p.endsWith("*"))   return <em key={i} className="not-italic text-[11px] opacity-70">{p.slice(1, -1)}</em>
    return <span key={i}>{p}</span>
  })}</>)
}

// Typing dots with framer motion
const TypingDots = () => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex items-end gap-2">
    <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-sm">
      <span className="text-[8px] font-black text-white tracking-tight">JK</span>
    </div>
    <div className="rounded-2xl rounded-bl-sm px-4 py-3 shadow-md bg-white border border-gray-100">
      <div className="flex gap-[5px] items-center h-[14px]">
        {[0, 160, 320].map(d => (
          <motion.span
            key={d}
            className="h-[7px] w-[7px] rounded-full bg-emerald-500"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: d / 1000 }}
          />
        ))}
      </div>
    </div>
  </motion.div>
)

// Lead confirmation card
function LeadConfirmCard({ data }: { data: LeadCard }) {
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
  const waMsg = [`🏠 JK Interior Inquiry`,`👤 ${data.name}`,`📱 ${data.phone}`,data.city && `📍 ${data.city}`,data.service && `🔧 ${data.service}`,data.estimate && `💰 Estimate: ${data.estimate}`,data.preferredTime && `📅 Visit: ${data.preferredTime}`,"\nFree site visit confirm kar dijiye! 🙏"].filter(Boolean).join("\n")
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`
  const bookHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi JK Interior! Main ${data.name} hoon${data.city ? ` (${data.city})` : ""}. Free site visit book karna chahta/chahti hoon${data.preferredTime ? ` — ${data.preferredTime}` : ""}. Please confirm! 🙏`)}`
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[85%] rounded-2xl rounded-bl-sm overflow-hidden border border-emerald-200 shadow-xl bg-white">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 px-3.5 py-2.5 flex items-center gap-2.5">
        <span className="text-lg">🎉</span>
        <div><p className="text-xs font-bold text-white leading-tight">Booking Confirmed!</p><p className="text-[10px] text-white/65">{ts}</p></div>
      </div>
      <div className="px-3.5 py-2.5 space-y-1.5">
        {rows.map(r => (<div key={r.label} className="flex items-start gap-2 text-xs"><span className="text-gray-400 shrink-0 w-20 text-[11px]">{r.label}</span><span className="font-semibold break-all text-[12px] text-gray-800">{r.value}</span></div>))}
      </div>
      <div className="px-3.5 pb-3.5 pt-1 space-y-2">
        <p className="text-[11px] text-emerald-700 font-semibold text-center bg-emerald-50 rounded-lg py-1.5">✅ Our team will contact you shortly!</p>
        <div className="flex gap-2">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2.5 text-[11px] font-bold text-white hover:opacity-90 transition-all"><IWA /> WhatsApp Now</a>
          <a href={bookHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-[11px] font-bold text-white hover:bg-emerald-500 transition-all"><ICal /> Book Visit</a>
        </div>
      </div>
    </motion.div>
  )
}

const WELCOME_MSG = mk(
  "bot",
  "Namaste 😊\n\nMain Riya hoon — JK Interior ki AI consultant.\n\nAap gypsum ceiling, PVC, WPC wall panels, TV unit, lighting, ya room design ke baare me kuch bhi pooch sakte hain.\n\n📐 Room ka size bata dijiye (jaise 12×10) — main turant estimate aur best suggestion bata dungi ✨"
)
// ── Main Component ────────────────────────────────────────────────────────────
export default function JKChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMsgs] = useState<Message[]>([WELCOME_MSG])
  const [input, setInput] = useState("")
  const [lead, setLead] = useState<Partial<Lead> | null>(null)
  const [lastTopic, setLastTopic] = useState<string | null>(null)
  const [typing, setTyping] = useState(false)
  const [aiMode, setAiMode] = useState(true)
  const [offHours, setOffHours] = useState(false)
  // ── Conversation memory (persistent across page refreshes) ────────────────
  const [memory, setMemory] = useState<ConversationMemory>(createMemory)
  const memoryRef = useRef<ConversationMemory>(memory)

  const historyRef = useRef<ConvMsg[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const sendLock       = useRef(false)
  const sessionIdRef   = useRef<string>(Math.random().toString(36).slice(2, 10))
  const streamingIdRef = useRef<number | null>(null)
  const [collectStep, setCollectStep] = useState<null | "name" | "phone" | "city" | "time">(null)
  const [pendingEstimate, setPendingEstimate] = useState<string | null>(null)

  // Keep memory ref in sync with state
  useEffect(() => { memoryRef.current = memory }, [memory])

  useEffect(() => { setOffHours(isOffHours()) }, [])
  useEffect(() => { document.body[open ? "setAttribute" : "removeAttribute"]("data-chat-open", "1") }, [open])

  // Load persisted data from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    // Load rich memory
    const savedMem = loadMemory()
    memoryRef.current = savedMem
    setMemory(savedMem)

    // Legacy flat lead + topic
    try {
      const raw = localStorage.getItem("jk_chat_v5")
      if (raw) {
        const { lead: l, topic: tp } = JSON.parse(raw)
        if (l) {
          setLead(l)
          setLastTopic(tp ?? null)
          // Sync identity fields from legacy lead into memory if missing
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
    requestAnimationFrame(() => el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }))
  }, [messages, typing, open])
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 350) }, [open])

  const persist = (l: Partial<Lead> | null, tp: string | null) => {
    try { localStorage.setItem("jk_chat_v5", JSON.stringify({ lead: l, topic: tp })) } catch {}
  }

  // Update memory from a user or bot message and persist it
  const updateMemory = useCallback((text: string, source: "user" | "bot") => {
    const updates = extractFromText(text, memoryRef.current, source)
    if (Object.keys(updates).length === 0) return
    const merged = mergeMemory(
      memoryRef.current,
      updates,
      source === "user", // increment message count only for user msgs
    )
    merged.stage = updateStage(merged)
    memoryRef.current = merged
    setMemory(merged)
    saveMemory(merged)
    // Sync identity back to lead state if newly discovered
    setLead(prev => {
      const needsSync =
        (!prev?.name && merged.name) ||
        (!prev?.city && merged.city)
      if (!needsSync) return prev
      return {
        ...(prev ?? {}),
        name: prev?.name || merged.name,
        city: prev?.city || merged.city,
      }
    })
  }, [])

  // Core send with dimension anti-loop
  const send = useCallback(async (override?: string) => {
    const text = (override ?? input).trim()
    if (!text || typing || sendLock.current) return

    sendLock.current = true
    setInput("")
    setMsgs(prev => [...prev, mk("user", text)])
    setTyping(true)

    historyRef.current = [...historyRef.current, { role: "user", content: text }]

    // ── Extract context from user message into persistent memory ─────────────
    {
      const memUpd = extractFromText(text, memoryRef.current, "user")
      if (Object.keys(memUpd).length > 0) {
        const merged = mergeMemory(memoryRef.current, memUpd, true)
        merged.stage = updateStage(merged)
        memoryRef.current = merged
        setMemory(merged)
        saveMemory(merged)
      }
    }

    // ---- DIMENSION HANDLER (NO LOOP) ----
    const dims = extractDimensions(text)
    const serviceFromMsg = detectService(text.toLowerCase())
    const currentService = serviceFromMsg || lead?.service || null
    
    if (dims && !collectStep) {
      await delay(400)
      const estimateReply = generateEstimateFromDimensions(dims.length, dims.width, currentService, lead?.name)
      const estSummary = extractEstimateSummary(estimateReply)
      if (estSummary) setPendingEstimate(estSummary)
      historyRef.current = [...historyRef.current, { role: "assistant", content: estimateReply }]
      setMsgs(prev => [...prev, mk("bot", estimateReply)])
      // Update lead service if missing
      if (!lead?.service && currentService) {
        const newLead = { ...(lead || {}), service: currentService }
        setLead(newLead)
        persist(newLead, lastTopic)
      }
      setTyping(false)
      sendLock.current = false
      return
    }

    // ---- LEAD COLLECTION MODE ----
    if (collectStep) {
      const tLower = text.toLowerCase()
      await delay(600)
      let collReply = ""
      if (collectStep === "name") {
        const phone = tryExtractPhone(text)
        const nameRaw = phone ? text.replace(phone, "").replace(/\b91\b/, "") : text
        const name = tryExtractName(nameRaw)
        if (name.length < 2) collReply = `Please write your full name – like "Rahul Kumar" or "Priya Singh" 😊`
        else {
          const city = detectCity(tLower) || lead?.city
          const updated = { ...(lead || {}), name, ...(phone ? { phone } : {}), city: city || lead?.city }
          setLead(updated); persist(updated, lastTopic)
          if (phone && city) { setCollectStep("time"); collReply = `${name} ji! ✅ When is a good time for site visit? (e.g., Saturday morning)` }
          else if (phone) { setCollectStep("city"); collReply = `${name} ji, got your number! 📱 Which city are you in?` }
          else { setCollectStep("phone"); collReply = `${name} ji! Share your WhatsApp number 📱` }
        }
      } else if (collectStep === "phone") {
        const phone = tryExtractPhone(text)
        if (!phone) collReply = `Valid 10-digit mobile number needed.`
        else {
          const city = detectCity(tLower) || lead?.city
          const updated = { ...(lead || {}), phone, city: city || undefined }
          setLead(updated); persist(updated, lastTopic)
          if (city) { setCollectStep("time"); collReply = `Number saved! 📱 When should we schedule the visit?` }
          else { setCollectStep("city"); collReply = `Thanks! Which city? (Araria, Forbesganj, Purnia, etc.)` }
        }
      } else if (collectStep === "city") {
        const city = detectCity(tLower) || (text.trim().length > 2 ? text.trim() : null)
        if (!city) collReply = `Please tell your city name.`
        else {
          const updated = { ...(lead || {}), city }
          setLead(updated); persist(updated, lastTopic)
          setCollectStep("time")
          collReply = `${city} – perfect! 📍 When would you like a site visit? (day/time)`
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
        storeAdminLead(finalLead, pendingEstimate || undefined, preferredTime)
        const card: LeadCard = {
          ...finalLead,
          estimate:      pendingEstimate || undefined,
          preferredTime,
          timestamp:     new Date().toISOString(),
        }
        // Push ONLY the card — avoids duplicate confirmation text
        historyRef.current = [...historyRef.current, { role: "assistant", content: "Booking confirmed! Team will contact you shortly." }]
        setMsgs(prev => [...prev, mk("bot", "lead_card", "card", card)])
        setTyping(false)
        sendLock.current = false
        return
      }
      historyRef.current = [...historyRef.current, { role: "assistant", content: collReply }]
      setMsgs(prev => [...prev, mk("bot", collReply)])
      setTyping(false)
      sendLock.current = false
      return
    }

    // ---- NORMAL AI / FALLBACK FLOW ----
    const svc = detectService(text.toLowerCase())
    const city = detectCity(text.toLowerCase())
    const extractedPhone = tryExtractPhone(text)
    let updatedLead = lead ? { ...lead } : null
    if (extractedPhone && !lead?.phone) {
      const extractedName = tryExtractName(text)
      updatedLead = { ...(lead || {}), phone: extractedPhone, name: extractedName || lead?.name || "Friend", city: city || lead?.city, service: svc || lead?.service }
      setLead(updatedLead)
      storeAdminLead(updatedLead as Lead, pendingEstimate || undefined)
    } else if (city && !lead?.city) { updatedLead = { ...(lead || {}), city }; setLead(updatedLead) }
    else if (svc && !lead?.service) { updatedLead = { ...(lead || {}), service: svc }; setLead(updatedLead) }

    let reply: string | null = null
    let wasStreamed = false

    if (aiMode) {
      const aiResult = await getAIReply(
        text,
        historyRef.current.slice(0, -1),
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
      )
      if (aiResult) reply = aiResult.reply
    }

    if (!reply) {
      if (wasStreamed && streamingIdRef.current !== null) {
        setMsgs(prev => prev.filter(m => m.id !== streamingIdRef.current))
        streamingIdRef.current = null
        setTyping(true)
      }
      wasStreamed = false
      await delay(400)
      reply = localFallback(text, updatedLead)
    }

    historyRef.current = [...historyRef.current, { role: "assistant", content: reply }]

    // ── Extract estimates + context from bot reply into memory ───────────────
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

    // Track topic in memory topicHistory
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
      let next: Message[]
      if (wasStreamed && finalStreamId !== null) {
        next = prev.map(m => m.id === finalStreamId ? { ...m, text: reply! } : m)
      } else {
        next = [...prev, mk("bot", reply as string)]
      }
      if (extractedPhone && !lead?.phone && updatedLead?.phone) {
        const card: LeadCard = { name: updatedLead.name || "Friend", phone: updatedLead.phone!, city: updatedLead.city, service: updatedLead.service, estimate: pendingEstimate || estSummary || undefined, timestamp: new Date().toISOString() }
        next = [...next, mk("bot", "lead_card", "card", card)]
      }
      return next
    })

    const hasLeadIntent = LEAD_INTENT_RE.test(text.toLowerCase()) && !updatedLead?.phone && !extractedPhone
    if (hasLeadIntent) {
      setTyping(false); await delay(1100); setTyping(true); await delay(700)
      const startMsg = updatedLead?.name ? `${updatedLead.name} ji! For free site visit, please share your WhatsApp number 📱` : `Please share your name to book a free site visit 😊`
      setCollectStep(updatedLead?.name ? "phone" : "name")
      historyRef.current = [...historyRef.current, { role: "assistant", content: startMsg }]
      setMsgs(prev => [...prev, mk("bot", startMsg)])
      setTyping(false)
      sendLock.current = false
      return
    }

    setTyping(false)
    sendLock.current = false
  }, [input, lead, typing, lastTopic, aiMode, collectStep, pendingEstimate])

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }

  const lastBotMsg = messages.filter(m => m.role === "bot").slice(-1)[0]?.text || ""
  const hasEstimate = lastBotMsg.includes("₹") || !!pendingEstimate
  const qrSet = getContextualQuickReplies(!!lead?.phone, hasEstimate, lastBotMsg, lastTopic)

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lead?.name ? `Hello JK Interior, I'm ${lead.name} ${lead.phone ? `(${lead.phone})` : ""} – need interior work.` : "Hello JK Interior, need interior work.")}`
  const bookHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lead?.name ? `Hi JK Interior! ${lead.name} wants a free site visit.` : "Hi JK Interior! Free site visit please.")}`
  const statusText = offHours ? "🌙 Opens 9 AM • WhatsApp available" : "🟢 Online — Premium Consultant"

  return (
    <>
      <style>{`
        @keyframes jk-ring { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.9); opacity: 0; } }
        .scrollbar-luxury::-webkit-scrollbar { width: 4px; }
        .scrollbar-luxury::-webkit-scrollbar-track { background: #eef2f0; border-radius: 8px; }
        .scrollbar-luxury::-webkit-scrollbar-thumb { background: #b8d9cc; border-radius: 8px; }
      `}</style>

      {!open && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-[5.5rem] left-4 z-50 md:bottom-24 md:left-6"
          style={{ width: 54, height: 54 }}
        >
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-60 animate-ping" style={{ animation: "jk-ring 1.8s ease-out infinite" }} />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-xl">
            <IChatBubble />
          </span>
          <span className="absolute -top-1 -right-1 flex items-center gap-0.5 rounded-full bg-amber-400 px-1.5 py-0.5 text-[8px] font-black text-amber-900 shadow"><ISparkle />AI</span>
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed z-50 flex flex-col overflow-hidden shadow-2xl bottom-0 left-0 right-0 h-[92dvh] max-h-[680px] rounded-t-3xl md:bottom-6 md:left-auto md:right-6 md:h-[620px] md:w-[420px] md:rounded-2xl bg-white/95 backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between px-5 py-3.5 bg-gradient-to-r from-emerald-800 to-emerald-600 text-white">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20 font-black text-sm ring-2 ring-white/30">JK<span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-300 border-2 border-emerald-600" /></div>
                <div><p className="text-sm font-bold leading-tight">Riya — AI Consultant</p><p className="text-[10px] text-white/80">{statusText}</p></div>
              </div>
              <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20"><IClose /></button>
            </div>

            {aiMode && <div className="shrink-0 flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border-b border-emerald-100"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /><p className="text-[10px] text-emerald-700 font-medium">Powered by Gemini AI + Luxury Estimator</p></div>}

            {/* Messages */}
<div
  ref={scrollRef}
  className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-3 scrollbar-luxury"
  style={{ background: "linear-gradient(145deg, #f8faf7 0%, #ffffff 100%)" }}
>
  {messages.map((m, idx) => (
    <motion.div
      key={m.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.03 }}
      className={`flex items-end gap-2 ${
        m.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {m.role === "bot" && m.kind !== "card" && (
        <div className="shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
          <span className="text-[8px] font-black text-white">JK</span>
        </div>
      )}

      {m.role === "bot" && m.kind === "card" && (
        <div className="h-6 w-6 shrink-0" />
      )}

      {m.kind === "card" && m.cardData ? (
        <LeadConfirmCard data={m.cardData} />
      ) : (
        <div
          className={`max-w-[82%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed shadow-sm ${
            m.role === "user"
              ? "bg-gradient-to-br from-emerald-700 to-emerald-500 text-white rounded-br-sm"
              : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
          }`}
        >
          <RichText text={m.text} />

          {(m as any).galleryType && (
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {galleryImages
                .filter(
                  (img) =>
                    img.category === (m as any).galleryType
                )
                .slice(0, 6)
                .map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    className="w-40 h-40 rounded-xl object-cover border"
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  ))}

  {typing && <TypingDots />}
</div>

{/* Dynamic Quick Replies */}
            <div className="shrink-0 flex gap-1.5 overflow-x-auto px-3 py-2 bg-white border-t border-gray-100 scrollbar-luxury">
              {qrSet.map(q => (
                <button key={q} onClick={() => send(q)} disabled={typing} className="shrink-0 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 active:scale-95 transition-all whitespace-nowrap disabled:opacity-40">{q}</button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="shrink-0 flex gap-2 border-t border-gray-200 bg-white px-3 py-2">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-2 py-2.5 text-xs font-bold text-white"><IWA /> WhatsApp</a>
              <a href={`tel:${CALL_NUMBER}`} className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2.5 text-xs font-bold text-emerald-700"><IPhone /> Call</a>
              {lead?.phone && <a href={bookHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-2 py-2.5 text-xs font-bold text-white"><ICal /> Book Visit</a>}
            </div>

            {/* Input */}
            <div className="shrink-0 flex items-center gap-2 border-t border-gray-200 bg-white px-3 py-2.5 pb-[max(10px,env(safe-area-inset-bottom))]">
              <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey} placeholder="Ask about sizes, materials, or book a visit..." className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-[13px] text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" autoComplete="off" />
              <button onClick={() => send()} disabled={!input.trim() || typing} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white shadow hover:bg-emerald-600 active:scale-90 transition-all disabled:opacity-40"><ISend /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

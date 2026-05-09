"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// ── Types ─────────────────────────────────────────────────────────────────────
type Role    = "bot" | "user"
type MsgKind = "text" | "card"
type Message = { id: number; role: Role; text: string; kind?: MsgKind; cardData?: LeadCard }
type LeadStage = "name_phone" | "city" | "service" | "budget" | "done"
type Lead = { name: string; phone: string; city?: string; service?: string; budget?: string }
type LeadCard  = Lead & { timestamp: string }
type ReplyResult = {
  reply: string
  kind?: MsgKind
  cardData?: LeadCard
  newLead?: Partial<Lead>
  newStage?: LeadStage
  newTopic?: string | null
}

// ── Config ────────────────────────────────────────────────────────────────────
const WA_NUMBER   = "918651070831"
const CALL_NUMBER = "+918651070831"
const DISPLAY_AREAS = ["Forbesganj", "Araria", "Purnia", "Kishanganj", "Katihar", "Narpatganj", "Raniganj", "Jogbani", "Supaul"]

// ── Known Bihar cities for area detection ─────────────────────────────────────
const CITY_MAP: Record<string, string> = {
  forbesganj: "Forbesganj", araria: "Araria", purnia: "Purnia",
  purnea: "Purnia", kishanganj: "Kishanganj", katihar: "Katihar",
  narpatganj: "Narpatganj", raniganj: "Raniganj", jogbani: "Jogbani",
  supaul: "Supaul", chhatapur: "Chhatapur", tribeniganj: "Tribeniganj",
  bhargama: "Bhargama", palasi: "Palasi", sikti: "Sikti",
}

// ── Keyword groups ────────────────────────────────────────────────────────────
const PRICE_KW   = ["price","cost","rate","kimat","daam","kitna","kharcha","budget","lagat","paisa","rupee","rs ","quote","how much","lagega","mehnga","sasta","charge","amount","per sqft","per sq"]
const BOOK_KW    = ["visit","book","site visit","measurement","quotation","bulao","aao","milna","survey","appointment","aana","schedule","aa jao","bula lo","bhejo"]
const QUALITY_KW = ["guarantee","warranty","waterproof","quality","bharosa","trust","kitne saal","durable","material","isi","certified","strong","safe","reliable","tuta","girta","peeling","damage"]
const GREET_KW   = ["hi","hello","hey","namaste","namaskar","helo","good morning","good evening","good afternoon","hy","hii","salam","hola"]
const THANKS_KW  = ["thank","shukriya","dhanyawad","thanks","thx","bahut accha","great","perfect","nice","superb","awesome","shabash","bahut badiya","wah","waah"]
const AREA_KW    = ["area","location","where","kahan","serve","district","kaun sa","konsa","aata hai","karte ho","available","cover"]
const HELP_KW    = ["help","madad","support","info","information","details","batao","bata","samjhao","kya hai","kaise","what is","tell me"]
const CALL_KW    = ["call","phone","contact","baat","number","reach","milna","talk"]
const NO_KW      = ["nahi","no","not","band","busy","later","baad mein","abhi nahi","thik hai","ok","okay","theek"]

// ── Service knowledge ─────────────────────────────────────────────────────────
const SERVICES: Record<string, { name: string; emoji: string; short: string; desc: string; waterproof: boolean }> = {
  pvc:    { name: "PVC False Ceiling",    emoji: "🏠", short: "PVC",    waterproof: true,  desc: "Waterproof, termite-proof, dust-free.\nBudget-friendly premium finish — 10+ saal ki life.\nKitchen, bathroom, hall — sab jagah perfect!" },
  gypsum: { name: "Gypsum False Ceiling", emoji: "✨", short: "Gypsum", waterproof: false, desc: "Elegant smooth finish — cove lighting, POP designs.\nBest for living rooms & bedrooms.\nNote: Dry areas ke liye ideal hai." },
  wpc:    { name: "WPC Wall Paneling",    emoji: "🪵", short: "WPC",    waterproof: true,  desc: "Moisture-resistant eco-friendly wood-look panels.\nTV unit, accent wall, full room — sab possible.\nLuxury wood look at very affordable price!" },
  marble: { name: "UV Marble Sheets",     emoji: "💎", short: "Marble", waterproof: true,  desc: "High-gloss marble finish — scratch-resistant, hygienic.\nWall, kitchen, counter — everywhere premium looks.\nReal marble se 80% sasta, 2x shine!" },
  grid:   { name: "Grid Ceiling",         emoji: "🏢", short: "Grid",   waterproof: false, desc: "Clean modular ceiling for offices, shops, clinics.\nEasy wiring & AC access — neat professional look.\nFast installation, very low maintenance." },
  grass:  { name: "Artificial Grass",     emoji: "🌿", short: "Grass",  waterproof: true,  desc: "Evergreen low-maintenance turf — balconies & terraces.\nNo watering, always fresh garden look!\nBest for feature walls & kids rooms too." },
  interior:{ name: "Complete Interior",   emoji: "🏡", short: "Full",   waterproof: false, desc: "Full home: ceiling + wall paneling + TV unit + kitchen.\nOne team, one timeline, guaranteed quality.\nForbesganj ki most trusted interior team!" },
}

// ── Business hours (IST UTC+5:30) ─────────────────────────────────────────────
function isOffHours(): boolean {
  const utcMs = Date.now()
  const istH  = new Date(utcMs + 5.5 * 3600000).getUTCHours()
  return istH >= 21 || istH < 8
}
function offHoursSuffix(): string {
  return "\n\n🌙 _Abhi office hours ke baad hai. Hamare team kal subah 8 baje tak aapko call karegi!_"
}

// ── Response packs ────────────────────────────────────────────────────────────
const PRICE_GENERIC = [
  "💰 Bilkul! Pricing per sq. ft. hoti hai — material, design aur room size pe depend karti hai.\n\n📐 Room ka size share karein ya WhatsApp pe photo bhejein — same day **free estimate** milegi!",
  "💸 Ji haan 😊 Rate depend karta hai design aur material quality pe.\n\nSabse best hai ek free site visit — hum wahan aayenge, measure karenge, aur turant quotation denge. Koi hidden charge nahi! ✅",
  "💰 Har project alag hota hai — size + material + design se price decide hoti hai.\n\nBest hoga agar room dimensions WhatsApp pe bhejein — main turant estimate dunga! 👍",
]

const QUALITY_GENERIC = [
  "✅ **Bilkul!** JK Interior sirf ISI-certified, fully waterproof materials use karta hai.\n\n🏆 5 saal ki **written warranty** • 5000+ sqft installed • 100+ happy clients across Bihar!",
  "💪 Ji haan sir! Hamare saare materials ISI certified hain.\n\n5 saal ki written guarantee — koi bhi issue → **free repair**. That's our promise! 🙏",
]

const BOOK_REPLIES = (name: string, offHours: boolean) => {
  const suffix = offHours ? offHoursSuffix() : " Aaj hi appointment fix ho sakti hai! ✅"
  return [
    `📅 **Bilkul ${name}!** Site visit **bilkul free** hai.\n\nNeeche "Book Visit" tap karein ya WhatsApp karein —${suffix}`,
    `✅ Site visit ke liye main abhi hi arrange kar sakta hoon!\n\nNeeche "Book Visit" button dabayein — hamare expert ${offHours ? "kal subah" : "24 ghante mein"} call karenge. 🙌`,
  ]
}

const GREET_REPLIES = (name?: string) => [
  `Namaste ${name || ""}! 😊 JK Interior mein aapka swagat hai!\n\nMain aapki kaise help kar sakta hoon? Neeche se choose karein ya seedha poochhein.`,
  `Arey waah! 😄 ${name ? name + " ji, " : ""}aap aaye!\n\nKya aap ceiling ya wall paneling ke baare mein poochhna chahte hain?`,
  `Hi ${name || "there"}! 👋 Namaste!\n\nAaj main aapke liye kya kar sakta hoon?`,
]

const FALLBACK_REPLIES = [
  "😊 Mujhe bilkul samajh nahi aaya — neeche se choose karein:\n\n• PVC Ceiling\n• Gypsum Ceiling\n• Price / Rate\n• Book Site Visit\n• Call Now\n\nYa WhatsApp pe directly likhein!",
  "🤔 Ek baar aur try karein ya neeche buttons se choose karein:\n\n• PVC / Gypsum / WPC / UV Marble\n• Price\n• Site Visit\n• Our Areas",
]

// ── Context-aware quality replies ──────────────────────────────────────────────
function contextualQuality(topic: string | null): string {
  if (!topic || !SERVICES[topic]) return QUALITY_GENERIC[Math.floor(Math.random() * QUALITY_GENERIC.length)]
  const s = SERVICES[topic]
  if (s.waterproof) {
    return `Ji haan! ✅ **${s.name}** fully waterproof hai — 100% water resistant, mold-proof bhi.\n\n5 saal ki written warranty ke saath. Koi darr nahi! 😊`
  }
  return `${s.emoji} **${s.name}** ke baare mein — yeh dry areas ke liye best hai.\n\nAgar wet areas (bathroom/kitchen) chahiye toh hum PVC recommend karenge. Dono ka combination bhi kar sakte hain! 👍`
}

// ── Context-aware price replies ────────────────────────────────────────────────
function contextualPrice(topic: string | null): string {
  if (!topic || !SERVICES[topic]) return PRICE_GENERIC[Math.floor(Math.random() * PRICE_GENERIC.length)]
  const s = SERVICES[topic]
  return `💰 **${s.name}** ki pricing per sq. ft. hoti hai.\n\nRate depend karta hai:\n• Room size (sqft)\n• Design complexity\n• Material grade\n\n📐 Best hoga free site visit lein — same day exact quotation milegi! Koi hidden charge nahi. ✅`
}

// ── Helpers ───────────────────────────────────────────────────────────────────
let _id = 0
const uid  = () => ++_id
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
const has  = (t: string, kw: string[]) => kw.some(k => t.includes(k))
const mk   = (role: Role, text: string, kind?: MsgKind, cardData?: LeadCard): Message =>
  ({ id: uid(), role, text, kind: kind ?? "text", cardData })

function detectServiceKey(t: string): string | null {
  if (t.includes("pvc")) return "pvc"
  if (t.includes("gypsum") || t.includes("pop ") || t.includes("plaster")) return "gypsum"
  if (t.includes("wpc") || t.includes("louver") || t.includes("wood panel")) return "wpc"
  if (t.includes("uv ") || t.includes("marble") || t.includes("sangmarmar")) return "marble"
  if (t.includes("grid ceiling") || t.includes("grid tile")) return "grid"
  if (t.includes("grass") || t.includes("turf") || t.includes("ghans")) return "grass"
  if (t.includes("complete interior") || t.includes("full interior") || t.includes("poora ghar") || t.includes("pura ghar")) return "interior"
  if (t.includes("false ceiling") || t.includes("ceiling") || t.includes("chhat")) return "gypsum"
  if (t.includes("wall panel") || t.includes("deewar") || t.includes("diwar") || t.includes("tv panel") || t.includes("tv unit") || t.includes("accent wall")) return "wpc"
  if (t.includes("interior") || t.includes("home decor") || t.includes("renovation") || t.includes("renovation")) return "interior"
  return null
}

function detectCityInText(t: string): string | null {
  for (const [key, val] of Object.entries(CITY_MAP)) {
    if (t.includes(key)) return val
  }
  return null
}

function extractPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "")
  const m = digits.match(/(?:0|91)?([6-9]\d{9})/)
  return m ? m[1] : null
}

function isValidPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone)
}

function extractName(raw: string): string {
  const phone = extractPhone(raw)
  let s = phone ? raw.replace(new RegExp(phone.replace(/\+/g, "\\+"), "g"), "").replace(/\b91\b/g, "").trim() : raw
  const stops = /\b(my|name|is|i|am|this|phone|number|mobile|contact|mera|naam|hai|hoon|ka|ki|ke|mujhe|main|me|aur|or|sir|madam)\b/gi
  s = s.replace(stops, " ")
       .replace(/[^a-zA-Z\u0900-\u097F\s]/g, " ")
       .replace(/\s+/g, " ")
       .trim()
  const parts = s.split(/\s+/).filter(p => p.length > 1)
  return parts.slice(0, 2).join(" ")
}

// ── Admin lead storage ─────────────────────────────────────────────────────────
function storeAdminLead(lead: Lead) {
  try {
    const raw   = localStorage.getItem("jk_admin_leads") || "[]"
    const leads: LeadCard[] = JSON.parse(raw)
    const entry: LeadCard   = { ...lead, timestamp: new Date().toISOString() }
    leads.unshift(entry)
    localStorage.setItem("jk_admin_leads", JSON.stringify(leads.slice(0, 100)))
  } catch {}
}

// ── Core reply engine ─────────────────────────────────────────────────────────
function buildReply(
  input: string,
  lead: Lead | null,
  stage: LeadStage,
  lastTopic: string | null,
): ReplyResult {
  const t    = input.toLowerCase().trim()
  const name = lead?.name || ""

  // ── Always-on: service lookup (sets context) ──────────────────────────────
  const sk = detectServiceKey(t)
  if (sk) {
    const s = SERVICES[sk]
    return {
      reply: `${s.emoji} **${s.name}**\n\n${s.desc}\n\n📍 ${DISPLAY_AREAS.slice(0, 4).join(", ")} aur nearby areas mein available.\n\nFree quote chahiye? 👇`,
      newTopic: sk,
    }
  }

  // ── Context-aware quality (uses lastTopic) ────────────────────────────────
  if (has(t, QUALITY_KW)) {
    return { reply: contextualQuality(lastTopic) }
  }

  // ── Context-aware price (uses lastTopic) ──────────────────────────────────
  if (has(t, PRICE_KW)) {
    return { reply: contextualPrice(lastTopic) }
  }

  // ── Booking intent ─────────────────────────────────────────────────────────
  if (has(t, BOOK_KW)) {
    const oh = isOffHours()
    return { reply: pick(BOOK_REPLIES(name, oh)) }
  }

  // ── Call request ──────────────────────────────────────────────────────────
  if (has(t, CALL_KW) && !has(t, BOOK_KW)) {
    const oh = isOffHours()
    return {
      reply: oh
        ? `📞 Hum aapko zaroor call karenge!\n\n🌙 Abhi raat ka time hai — hamare team **kal subah 8 baje** aapko call karegi.\n\nYa abhi WhatsApp pe message karein — hum available hain! 💬`
        : `📞 **Call karein:** +91 86510 70831\n\nYa WhatsApp pe message karein — turant reply milegi! 💬`,
    }
  }

  // ── Negative / dismissal ──────────────────────────────────────────────────
  if (has(t, NO_KW) && t.length < 25) {
    return { reply: `Theek hai ${name}! 😊 Koi baat nahi.\n\nJab bhi zaroorat ho — hum yahan hain. JK Interior — Forbesganj ka most trusted name! 🏡` }
  }

  // ── Area / city question ──────────────────────────────────────────────────
  if (has(t, AREA_KW)) {
    const city = detectCityInText(t)
    if (city) {
      return { reply: `📍 **${city}** — haan, hum wahan kaam karte hain! 👍\n\nHum in saare areas mein available hain:\n${DISPLAY_AREAS.join(" • ")}\n\nFree site visit book karein! 🙌` }
    }
    return { reply: `📍 Hum in areas mein kaam karte hain:\n\n${DISPLAY_AREAS.join(" • ")}\n\nAur bhi nearby Bihar areas covered hain! Apna city batayein — main confirm karta hoon. 😊` }
  }

  // ── Inline city mention ────────────────────────────────────────────────────
  const mentionedCity = detectCityInText(t)
  if (mentionedCity && t.length < 40) {
    return { reply: `📍 **${mentionedCity}** mein hum regularly kaam karte hain! 💪\n\nWahan aapke liye free site visit arrange ho sakti hai. Kab convenient hai aapko? 😊` }
  }

  // ── Greetings ─────────────────────────────────────────────────────────────
  if (has(t, GREET_KW)) {
    return { reply: pick(GREET_REPLIES(name)) }
  }

  // ── Thanks ────────────────────────────────────────────────────────────────
  if (has(t, THANKS_KW)) {
    return { reply: `Shukriya ${name}! 🙏 Hamesha aapki seva ke liye taiyaar hain. JK Interior — quality ka bharosa! ✨` }
  }

  // ── Help ─────────────────────────────────────────────────────────────────
  if (has(t, HELP_KW)) {
    return { reply: `Zaroor! 😊 Main yahan hoon. Kuch bhi poochhein:\n\n🏠 PVC / Gypsum Ceiling\n🪵 WPC / UV Marble Wall Panels\n💰 Price & Estimates\n📅 Site Visit Booking\n📍 Service Areas\n\nNeeche se choose karein! 👇` }
  }

  // ── Lead collection flow ──────────────────────────────────────────────────
  if (stage === "name_phone") {
    const rawPhone = input.replace(/\D/g, "").replace(/^0+/, "").replace(/^91/, "")
    if (!rawPhone || rawPhone.length < 10) {
      return { reply: "📱 Apna naam aur **10-digit phone number** share karein.\n\n*Example: Rahul 9876543210*\n*Ya sirf: 9876543210*\n\nYa neeche quick reply se shuru karein! 👇" }
    }
    if (!isValidPhone(rawPhone)) {
      return { reply: "⚠️ Phone number sahi nahi laga. Please **6-9 se shuru hone wala 10-digit** number share karein.\n\n*Example: 9876543210*" }
    }
    const extractedName = extractName(input) || "Friend"
    return {
      reply: `Shukriya **${extractedName}**! 🎉 Number note ho gaya.\n\nAap kaunse city/area mein hain?\n_(Forbesganj, Araria, Purnia, Kishanganj, etc.)_`,
      newLead: { name: extractedName, phone: rawPhone },
      newStage: "city",
    }
  }

  if (stage === "city") {
    const city = detectCityInText(t) || input.trim().split(/\s+/).slice(0, 2).join(" ")
    return {
      reply: `📍 **${city}** — bahut accha! Hum wahan kaam karte hain. 👍\n\nAapko konsi service chahiye?\n\n🏠 PVC Ceiling\n✨ Gypsum Ceiling\n🪵 WPC Wall Panel\n💎 UV Marble Sheet\n🏡 Complete Interior\n• Kuch aur`,
      newLead: { city },
      newStage: "service",
    }
  }

  if (stage === "service") {
    const svc = input.trim()
    return {
      reply: `✅ **${svc}** — noted! Bahut badiya choice hai! 😊\n\nAapka approximate budget kya hai?\n\n• Under ₹50,000\n• ₹50,000 – ₹1 Lakh\n• ₹1 Lakh – ₹2 Lakh\n• ₹2 Lakh+\n• Abhi decide nahi kiya`,
      newLead: { service: svc },
      newStage: "budget",
    }
  }

  if (stage === "budget") {
    const bgt = input.trim()
    const completeLead: Lead = { ...lead!, budget: bgt }
    const card: LeadCard = { ...completeLead, timestamp: new Date().toISOString() }
    storeAdminLead(completeLead)
    return {
      reply: "lead_card",
      kind: "card",
      cardData: card,
      newLead: { budget: bgt },
      newStage: "done",
    }
  }

  return { reply: pick(FALLBACK_REPLIES) }
}

// ── Quick reply sets ──────────────────────────────────────────────────────────
const QR_INITIAL = ["PVC Ceiling", "Gypsum Ceiling", "WPC Panels", "Price / Rate", "Book Site Visit"]
const QR_DONE    = ["PVC Ceiling", "Gypsum Ceiling", "Price / Rate", "Book Site Visit", "Quality & Warranty", "Our Areas"]
const QR_CITY    = ["Forbesganj", "Araria", "Purnia", "Kishanganj", "Katihar"]
const QR_SERVICE = ["PVC Ceiling", "Gypsum Ceiling", "WPC Panels", "UV Marble", "Complete Interior"]
const QR_BUDGET  = ["Under ₹50,000", "₹50K–₹1L", "₹1L–₹2L", "₹2L+", "Decide later"]

function getQR(stage: LeadStage, hasLead: boolean): string[] {
  if (stage === "city")    return QR_CITY
  if (stage === "service") return QR_SERVICE
  if (stage === "budget")  return QR_BUDGET
  if (stage === "done" || hasLead) return QR_DONE
  return QR_INITIAL
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const IChatBubble = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const IClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const ISend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 translate-x-px" aria-hidden>
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)
const IWA = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current shrink-0" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.054 23.447a.5.5 0 00.611.61l5.7-1.461A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.389l-.36-.214-3.733.957.993-3.618-.235-.373A9.818 9.818 0 1112 21.818z"/>
  </svg>
)
const ICal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 shrink-0" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const IPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 shrink-0" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2.74h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.34a16 16 0 0 0 6.06 6.06l1.66-1.66a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

// ── RichText renderer (bold + italic) ────────────────────────────────────────
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>
        if (p.startsWith("*") && p.endsWith("*")) return <em key={i} className="not-italic text-gray-500 text-[11px]">{p.slice(1, -1)}</em>
        return <span key={i}>{p}</span>
      })}
    </>
  )
}

// ── Typing dots ───────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      <div className="h-6 w-6 shrink-0 rounded-full bg-emerald-600 flex items-center justify-center">
        <span className="text-[9px] font-black text-white">JK</span>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-3">
          {[0, 150, 300].map(d => (
            <span key={d} className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Lead confirmation card ────────────────────────────────────────────────────
function LeadConfirmCard({ data, waHref, bookHref }: { data: LeadCard; waHref: string; bookHref: string }) {
  const rows = [
    { label: "👤 Name",    value: data.name },
    { label: "📱 Phone",   value: data.phone },
    { label: "📍 City",    value: data.city    || "—" },
    { label: "🔧 Service", value: data.service || "—" },
    { label: "💰 Budget",  value: data.budget  || "—" },
  ]
  const d = new Date(data.timestamp)
  const ts = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`

  return (
    <div className="w-full max-w-[82%] rounded-2xl rounded-bl-none overflow-hidden border border-emerald-200 shadow-md bg-white">
      <div className="bg-emerald-600 px-3 py-2 flex items-center gap-2">
        <span className="text-base">🎉</span>
        <div>
          <p className="text-xs font-bold text-white leading-tight">Lead Confirmed!</p>
          <p className="text-[10px] text-white/70">{ts}</p>
        </div>
      </div>
      <div className="px-3 py-2.5 space-y-1.5">
        {rows.map(r => (
          <div key={r.label} className="flex items-start gap-2 text-xs">
            <span className="text-gray-500 shrink-0 w-20">{r.label}</span>
            <span className="font-semibold text-gray-800 break-all">{r.value}</span>
          </div>
        ))}
      </div>
      <div className="px-3 pb-3 pt-1 space-y-2">
        <p className="text-[11px] text-emerald-700 font-semibold text-center bg-emerald-50 rounded-lg py-1.5">
          ✅ JK Interior team aapko jald contact karegi!
        </p>
        <div className="flex gap-2">
          <a href={waHref} target="_blank" rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#25D366] py-2 text-[11px] font-bold text-white hover:opacity-90 active:scale-95 transition-all"
          >
            <IWA /> WhatsApp
          </a>
          <a href={bookHref} target="_blank" rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-2 text-[11px] font-bold text-white hover:opacity-90 active:scale-95 transition-all"
          >
            <ICal /> Book Visit
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function JKChat() {
  const [open,      setOpen]      = useState(false)
  const [messages,  setMsgs]      = useState<Message[]>(() => [
    mk("bot", "नमस्ते! 👋 Welcome to **JK Interior**!\n\nApna naam aur 10-digit phone number share karein — main aapko best consultation dunga.\n\n*Example: Rahul 9876543210*"),
  ])
  const [input,     setInput]     = useState("")
  const [lead,      setLead]      = useState<Lead | null>(null)
  const [stage,     setStage]     = useState<LeadStage>("name_phone")
  const [lastTopic, setLastTopic] = useState<string | null>(null)
  const [typing,    setTyping]    = useState(false)
  const scrollRef                 = useRef<HTMLDivElement>(null)
  const inputRef                  = useRef<HTMLInputElement>(null)
  const sendLock                  = useRef(false)

  // Set body attribute so floating buttons can hide themselves reliably
  useEffect(() => {
    if (open) {
      document.body.setAttribute("data-chat-open", "1")
    } else {
      document.body.removeAttribute("data-chat-open")
    }
    return () => { document.body.removeAttribute("data-chat-open") }
  }, [open])

  // Restore from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("jk_chat_v4")
      if (raw) {
        const { lead: l, stage: s, topic: tp } = JSON.parse(raw)
        if (l) { setLead(l); setStage(s ?? "done"); setLastTopic(tp ?? null) }
      }
    } catch {}
  }, [])

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    requestAnimationFrame(() => el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }))
  }, [messages, typing, open])

  // Focus on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const persist = (l: Lead, s: LeadStage, tp: string | null) => {
    try { localStorage.setItem("jk_chat_v4", JSON.stringify({ lead: l, stage: s, topic: tp })) } catch {}
  }

  const send = useCallback((override?: string) => {
    const text = (override ?? input).trim()
    if (!text || typing || sendLock.current) return

    sendLock.current = true
    setInput("")
    setMsgs(prev => [...prev, mk("user", text)])
    setTyping(true)

    const delay = 500 + Math.random() * 400
    setTimeout(() => {
      const { reply, kind, cardData, newLead: nl, newStage: ns, newTopic: nt } = buildReply(text, lead, stage, lastTopic)

      const updatedLead  = nl ? { ...lead, ...nl } as Lead : lead
      const updatedStage = ns ?? stage
      const updatedTopic = nt !== undefined ? nt : (nl || ns ? lastTopic : lastTopic)

      if (nl || ns) {
        if (updatedLead) setLead(updatedLead)
        setStage(updatedStage)
      }
      if (nt !== undefined) setLastTopic(nt)
      if (updatedLead) persist(updatedLead, updatedStage, updatedTopic)

      setTyping(false)
      setMsgs(prev => [...prev, mk("bot", reply, kind, cardData)])
      sendLock.current = false
    }, delay)
  }, [input, lead, stage, lastTopic, typing])

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() }
  }

  const waHref   = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lead ? `Hello JK Interior, main ${lead.name} (${lead.phone}) hoon. Mujhe interior work karwana hai.` : "Hello JK Interior, mujhe interior work karwana hai.")}`
  const bookHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lead ? `Hi JK Interior, I'm ${lead.name} (${lead.phone}). I'd like to book a free site visit.` : "Hi JK Interior, I'd like to book a free site visit.")}`

  const qrSet = getQR(stage, !!lead)

  return (
    <>
      {/* ── Toggle button ─────────────────────────────────────────────────── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open JK Interior chat"
          className="fixed bottom-[5.5rem] left-4 z-50 flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_4px_20px_rgba(5,150,105,0.45)] transition-all hover:scale-110 hover:bg-emerald-500 active:scale-95 md:bottom-24 md:left-6"
          style={{ height: 52, width: 52 }}
        >
          <IChatBubble />
        </button>
      )}

      {/* ── Chat window ────────────────────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="JK Interior Chat"
          className="fixed z-50 flex flex-col rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden
                     bottom-[5.5rem] left-3 right-3 h-[78vh] max-h-[560px]
                     md:left-auto md:bottom-6 md:right-6 md:h-[590px] md:w-[390px]
                     animate-in fade-in zoom-in-95 slide-in-from-bottom-6 duration-300"
          style={{ background: "rgba(255,255,255,0.99)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between px-4 py-3 bg-emerald-600 text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 font-black text-sm">
                JK
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-300 border-2 border-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">JK Interior Assistant</p>
                <p className="text-[10px] opacity-70 leading-none mt-0.5">
                  {isOffHours() ? "🌙 Opens 8 AM • WhatsApp available" : "🟢 Online — Forbesganj • Araria • Purnia"}
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1.5 hover:bg-white/20 transition-colors">
              <IClose />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-3 bg-[#f7faf9] scrollbar-luxury">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-end gap-1.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && (
                  <div className="shrink-0 h-6 w-6 rounded-full bg-emerald-600 flex items-center justify-center mb-0.5">
                    <span className="text-[9px] font-black text-white">JK</span>
                  </div>
                )}
                {m.kind === "card" && m.cardData ? (
                  <LeadConfirmCard data={m.cardData} waHref={waHref} bookHref={bookHref} />
                ) : (
                  <div className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-emerald-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                  }`}>
                    <RichText text={m.text} />
                  </div>
                )}
              </div>
            ))}
            {typing && <TypingDots />}
          </div>

          {/* Quick replies */}
          <div className="shrink-0 flex gap-1.5 overflow-x-auto px-3 py-2 bg-white border-t border-gray-100 scrollbar-luxury">
            {qrSet.map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={typing}
                className="shrink-0 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 active:scale-95 transition-all whitespace-nowrap disabled:opacity-40 touch-manipulation"
              >
                {q}
              </button>
            ))}
          </div>

          {/* CTA row */}
          <div className="shrink-0 flex gap-2 border-t border-gray-100 bg-white px-3 py-2">
            <a href={waHref} target="_blank" rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-2 py-2 text-xs font-bold text-white hover:opacity-90 active:scale-95 transition-all touch-manipulation"
            >
              <IWA /> WhatsApp
            </a>
            <a href={`tel:${CALL_NUMBER}`}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 active:scale-95 transition-all touch-manipulation"
            >
              <IPhone /> Call
            </a>
            {lead && (
              <a href={bookHref} target="_blank" rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-2 py-2 text-xs font-bold text-white hover:bg-emerald-500 active:scale-95 transition-all touch-manipulation"
              >
                <ICal /> Book Visit
              </a>
            )}
          </div>

          {/* Input */}
          <div className="shrink-0 flex items-center gap-2 border-t border-gray-200 bg-white px-3 py-2.5">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={stage === "name_phone" ? "Naam + phone: Rahul 9876543210" : stage === "city" ? "Apna city/area likhein…" : stage === "service" ? "Service chunein ya likhein…" : stage === "budget" ? "Budget batayein…" : "Kuch bhi poochhein…"}
              className="flex-1 min-w-0 rounded-full border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-emerald-400 focus:bg-white transition-colors"
              autoComplete="off"
              inputMode="text"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || typing}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation"
            >
              <ISend />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

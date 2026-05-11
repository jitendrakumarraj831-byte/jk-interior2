"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  MATERIAL_KNOWLEDGE,
  COMPARISONS,
  FAQ,
  formatPriceEstimate,
} from "@/lib/business-data"

// ── Types ──────────────────────────────────────────────────────────────────────
type Role    = "bot" | "user"
type MsgKind = "text" | "card"
type Message = { id: number; role: Role; text: string; kind?: MsgKind; cardData?: LeadCard }
type ConvMsg = { role: "user" | "assistant"; content: string }
type Lead    = { name: string; phone: string; city?: string; service?: string }
type LeadCard = Lead & { timestamp: string }

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

function storeAdminLead(lead: Lead) {
  try {
    const raw = localStorage.getItem("jk_admin_leads") || "[]"
    const leads: LeadCard[] = JSON.parse(raw)
    const entry: LeadCard = { ...lead, timestamp: new Date().toISOString() }
    leads.unshift(entry)
    localStorage.setItem("jk_admin_leads", JSON.stringify(leads.slice(0, 100)))
  } catch {}
}

// ── AI API call ────────────────────────────────────────────────────────────────
async function getAIReply(
  message: string,
  history: ConvMsg[],
  lead: Partial<Lead> | null
): Promise<{ reply: string; source: "gemini" | "local" } | null> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history: history.slice(-16),
        leadContext: lead
          ? {
              name:    lead.name    || undefined,
              phone:   lead.phone   || undefined,
              city:    lead.city    || undefined,
              service: lead.service || undefined,
            }
          : undefined,
      }),
      signal: AbortSignal.timeout(12000),
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data.ok || !data.reply) return null
    return { reply: data.reply as string, source: (data.source as "gemini" | "local") ?? "gemini" }
  } catch {
    return null
  }
}

// ── Context-aware consultant reasoning ────────────────────────────────────────
function consultantReply(t: string, lead: Partial<Lead> | null): string | null {
  const city    = detectCity(t)
  const svc     = detectService(t)
  const knownCity = city || lead?.city
  const knownSvc  = svc  || lead?.service

  // detect room count mentions
  const roomMatch = t.match(/(\d+)\s*room|ek\s*room|do\s*room|teen\s*room|char\s*room|1\s*room|2\s*room|3\s*room|4\s*room/)
  const roomCount = roomMatch ? (roomMatch[1] || (t.includes("ek") ? "1" : t.includes("do") ? "2" : t.includes("teen") ? "3" : "1")) : null
  const hasHall   = /\bhall\b|\bdrawing room\b|\bbaithak\b/.test(t)
  const hasBedroom= /\bbedroom\b|\bkamra\b|\broom\b/.test(t)
  const hasKitchen= /\bkitchen\b|\bradhoi\b/.test(t)
  const hasBathroom= /\bbathroom\b|\btoilet\b|\blatrine\b/.test(t)
  const hasDimension = /\d+\s*[x×by]\s*\d+/.test(t)
  const wantsWork = /karwana|lagwana|karna|banana|chahiye|chahta|chahti|karwa/.test(t)
  const budgetLow = /kam budget|budget kam|sasta|cheap|affordable|kitna kharcha|low budget|budget tight|budget nahi/.test(t)
  const wantsWaterproof = /waterproof|water proof|bathroom|kitchen|paani/.test(t)
  const wantsPremium = /premium|luxury|achha|accha|best|sundar|beautiful|designer/.test(t)
  const askingPrice = /kitna|price|rate|cost|kharcha|lagega|estimate|quote|budget/.test(t)

  // ── City + room intent (no material yet) — ask size or material
  if ((knownCity || city) && (roomCount || hasHall || hasBedroom) && wantsWork && !hasDimension && !knownSvc) {
    const cityLine = knownCity ? `${knownCity} mein bilkul karte hain hum! 😊` : ""
    const roomLine = roomCount ? `${roomCount} room` : hasHall ? "hall" : "room"
    return `${cityLine ? cityLine + "\n" : ""}${roomLine} ke liye room ka approximate size bata dijiye — jaise 10×12 ya 12×14?\n\nAur ceiling ke liye PVC ya Gypsum prefer karenge, ya abhi decide nahi kiya?`
  }

  // ── City + room intent (with material) — ask size
  if ((knownCity || city) && (roomCount || hasHall || hasBedroom) && wantsWork && !hasDimension && knownSvc) {
    const cityLine = knownCity ? `${knownCity} mein karte hain! 👍` : ""
    return `${cityLine ? cityLine + " " : ""}${knownSvc} ke liye ${roomCount ? roomCount + " room" : "room"} ka size bata dijiye — jaise 10×12 ya 12×14? Estimate abhi nikaalta hoon! 📐`
  }

  // ── Hall mentioned without service or size
  if (hasHall && !hasDimension && !knownSvc && !roomCount) {
    return `Hall ke liye Gypsum ceiling sabse popular choice hai — cove lighting ke saath bilkul amazing lagti hai! ✨\n\nHall ka size approx kitna hai? Jaise 14×16 ya 16×18? Size batao toh estimate abhi bata deti hoon.`
  }

  // ── Kitchen / Bathroom — suggest PVC directly
  if ((hasKitchen || hasBathroom) && wantsWork && !hasDimension) {
    const room = hasKitchen ? "kitchen" : "bathroom"
    return `${room.charAt(0).toUpperCase() + room.slice(1)} ke liye PVC ceiling best hai — 100% waterproof, termite-proof, zero maintenance. 💧\n\n${room.charAt(0).toUpperCase() + room.slice(1)} ka size kya hai (jaise 8×10 ya 10×12)? Estimate abhi nikaaluun!`
  }

  // ── Budget low hint — recommend PVC, ask size
  if (budgetLow && !hasDimension) {
    return `Budget-friendly ke liye PVC ceiling best option hai — ₹60–120/sq.ft, waterproof bhi hai aur maintenance zero. 😊\n\nRoom ka size kya hai? Estimate nikaaluun!`
  }

  // ── Waterproof intent — confirm PVC/UV, ask room
  if (wantsWaterproof && !hasKitchen && !hasBathroom && !hasDimension && !knownSvc) {
    return `Waterproof ke liye PVC ceiling (₹60–120/sq.ft) ya UV Marble Sheets (₹50–95/sq.ft) — dono 100% waterproof hain. 💧\n\nKaunsi room ke liye chahiye? Size bata dijiye toh exact estimate de deti hoon!`
  }

  // ── Premium interest — suggest Gypsum/WPC, ask what room
  if (wantsPremium && !hasDimension && !knownSvc) {
    return `Premium look ke liye Gypsum cove ceiling ya WPC wall panels — dono bahut stunning lagte hain! ✨\n\nKis room ke liye hai — hall, bedroom, ya kuch aur? Size bata dijiye toh estimate nikaaluun.`
  }

  // ── Asking price/estimate without enough context
  if (askingPrice && !hasDimension && !knownSvc && t.length < 60) {
    return `Estimate ke liye room ka size batao (jaise 12×14) aur material — PVC ya Gypsum ceiling?\n\nSize milte hi abhi calculate kar deti hoon! 📐`
  }

  // ── PVC is the right choice? — confirm + ask room
  if (/pvc sahi|pvc theek|pvc accha|pvc lena|pvc lagwana/.test(t)) {
    return `Haan, PVC excellent choice hai! 100% waterproof, 20+ saal ki life, kabhi repaint nahi. 🏠\n\nKaunsi room ke liye — bedroom, kitchen, ya hall? Size batao toh estimate bhi bata sakti hoon.`
  }

  return null
}

// ── Local fallback (rich knowledge-base powered) ────────────────────────────
function localFallback(input: string, lead: Partial<Lead> | null): string {
  const t  = input.toLowerCase().trim()
  const nm = lead?.name || ""
  const oh = isOffHours()

  // ── Consultant reasoning first — handles context-rich messages
  const consultantResponse = consultantReply(t, lead)
  if (consultantResponse) return consultantResponse

  // ── Greetings
  const GREET_KW = ["hi","hello","hey","namaste","namaskar","helo","good morning","good evening","good afternoon","hy","hii","salam","kaise ho"]
  if (has(t, GREET_KW) && t.length < 35) return pick([
    `Namaste${nm ? " " + nm : ""}! 😊 Main Riya hoon, JK Interior ki AI consultant.\n\nCeiling ya wall paneling ke baare mein poochhein, ya room ka size batayein — estimate abhi nikaalta hoon!`,
    `Hello${nm ? " " + nm : ""}! 🏠 JK Interior mein swagat hai. Ceiling, wall panels, pricing — kuch bhi poochhein, main help karungi!`,
  ])

  // ── Thanks
  const THANKS_KW = ["thank","shukriya","dhanyawad","thanks","thx","bahut accha","great","perfect","nice","superb","awesome","shabash","badiya","wah","theek hai"]
  if (has(t, THANKS_KW) && t.length < 40) return `Bahut shukriya${nm ? " " + nm : ""}! 🙏 Koi bhi sawaal ho toh main yahaan hoon. JK Interior mein aapki seva karna hamara farz hai! ✨`

  // ── Room size estimate (e.g. "12x14", "10 by 12", "10×10")
  const dimMatch = t.match(/(\d{1,2})\s*[x×by]\s*(\d{1,2})/)
  if (dimMatch) {
    const l = parseInt(dimMatch[1])
    const w = parseInt(dimMatch[2])
    const svc = t.includes("pvc") ? "pvc" :
                t.includes("wpc") ? "wpc" :
                t.includes("uv") || t.includes("marble") ? "uv" :
                t.includes("gypsum") ? "gypsum" : "gypsum"
    const svcName = svc === "pvc" ? "PVC Ceiling" : svc === "wpc" ? "WPC Wall Panel" :
                    svc === "uv" ? "UV Marble Sheet" : "Gypsum Ceiling"
    return formatPriceEstimate(l, w, svc, svcName) +
      `\n\nExact quote ke liye free site visit — call/WhatsApp: **+91 8651070831** 📞`
  }

  // ── Material comparisons
  const bothPvcGypsum = (t.includes("pvc") && t.includes("gypsum")) ||
    ((t.includes("difference") || t.includes("better") || t.includes("konsa") || t.includes("kaunsa") || t.includes("vs")) && (t.includes("pvc") || t.includes("gypsum")))
  if (bothPvcGypsum) return COMPARISONS["pvc-vs-gypsum"]

  const bothWpcUv = (t.includes("wpc") && (t.includes("uv") || t.includes("marble"))) ||
    ((t.includes("difference") || t.includes("better") || t.includes("konsa") || t.includes("vs")) && t.includes("wpc"))
  if (bothWpcUv) return COMPARISONS["wpc-vs-uv"]

  const pvcWpcCompare = t.includes("pvc") && t.includes("wpc")
  if (pvcWpcCompare) return COMPARISONS["pvc-vs-wpc"]

  // ── Deep material info
  if (t.includes("gypsum") || (t.includes("pop ") && !t.includes("popular"))) {
    const m = MATERIAL_KNOWLEDGE.gypsum
    const isWaterQ = has(t, ["paani","water","bathroom","nami","moisture","geela"])
    if (isWaterQ) return `Gypsum ceiling waterproof nahi hoti — bathroom ya kitchen ke liye **PVC ceiling** best hai (₹60-120/sq.ft, 100% waterproof).\n\nHall aur bedroom ke liye gypsum perfect hai! 😊 Koi sawaal?`
    return `✨ **Gypsum False Ceiling** — ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n❌ Avoid: ${m.avoidIn}\n⏱ Install time: ${m.installTime}\n🛡 ${m.warranty}\n\nFree site visit mein exact design dekhein! 📐`
  }

  if (t.includes("pvc")) {
    const m = MATERIAL_KNOWLEDGE.pvc
    return `🏠 **PVC False Ceiling** — ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n⏱ Install time: ${m.installTime}\n🛡 ${m.warranty}\n\nHar ghar ke liye perfect — koi bhi room ho! Site visit free hai. 😊`
  }

  if (t.includes("wpc") || (t.includes("wood panel")) || t.includes("louver")) {
    const m = MATERIAL_KNOWLEDGE.wpc
    return `🪵 **WPC Wall Panels** — ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n⏱ Install time: ${m.installTime}\n🛡 ${m.warranty}\n\nTV wall ke liye #1 choice! Free site visit book karein? 💪`
  }

  if (t.includes("uv ") || t.includes("uv-") || t.includes("marble") || t.includes("marble sheet")) {
    const m = MATERIAL_KNOWLEDGE.uv
    return `💎 **UV Marble Sheets** — ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n❌ Avoid: ${m.avoidIn}\n⏱ Install time: ${m.installTime}\n🛡 ${m.warranty}`
  }

  if (t.includes("tv unit") || t.includes("tv panel") || t.includes("tv cabinet") || t.includes("tv wall")) {
    const m = MATERIAL_KNOWLEDGE.tvunit
    return `📺 **Modular TV Unit** — ${m.price}\n\nCustom designed for your exact room!\n\n📐 Size & price:\n• 6-8 ft: ${m.sizes.small}\n• 8-10 ft: ${m.sizes.medium}\n• 10-14 ft: ${m.sizes.large}\n\nLED lighting bhi add ho sakti hai. Design dekhne ke liye free visit karein! 🎨`
  }

  if (t.includes("fluted") || t.includes("ribbed") || t.includes("louver panel") || t.includes("3d panel")) {
    return `🏛️ **Fluted / Louver Panels** (₹200–₹500/sq.ft)\n\nModern 3D textured look — abhi ka sabse trending wall design! Feature walls, reception areas, office lobby ke liye perfect. WPC material mein available hai.\n\nFree site visit mein samples dekhein! ✨`
  }

  if (t.includes("grid") || t.includes("office ceiling") || t.includes("mineral")) {
    return `🏢 **Grid Ceiling** (₹45–₹90/sq.ft)\n\nCommercial offices, shops, hospitals ke liye standard. Easy maintenance — AC aur electrical ke liye convenient access. Quick installation — 1 floor in 2-3 days.\n\nFree quotation ke liye call karein! 📞`
  }

  if (t.includes("complete interior") || t.includes("full interior") || t.includes("poora ghar") || t.includes("pura ghar") || t.includes("full home")) {
    return `🏡 **Complete Interior Package**\n\nFull home: Ceiling + Wall Panels + TV Unit + Kitchen — ek team, ek timeline!\n\n✅ One point of contact\n✅ Combo discount available\n✅ 5-year warranty on everything\n✅ 500+ full home projects done\n\nRoom by room estimate ke liye **free consultation** book karein! 🙌`
  }

  if (t.includes("artificial grass") || t.includes("grass") || t.includes("turf")) {
    return `🌿 **Artificial Grass** (₹40–₹120/sq.ft)\n\nBalcony, terrace, wall decor ke liye perfect! Zero maintenance — kabhi cut nahi karna, kabhi dry nahi hoti. UV resistant, weatherproof.\n\nFree site visit available! 😊`
  }

  // ── FAQ matching
  for (const faq of FAQ) {
    if (faq.q.some(kw => t.includes(kw))) return faq.a
  }

  // ── Pricing intent
  const PRICE_KW = ["price","cost","rate","kimat","daam","kitna","kharcha","budget","lagat","paisa","quote","how much","lagega","charge","per sqft","per sq","mahnga","sasta","kitne mein"]
  if (has(t, PRICE_KW)) {
    return `💰 **JK Interior — Price List**\n\n✨ Gypsum Ceiling    ₹80–₹140 / sq.ft\n🏠 PVC Ceiling       ₹60–₹120 / sq.ft\n🪵 WPC Wall Panels   ₹180–₹450 / sq.ft\n💎 UV Marble Sheets  ₹50–₹95 / sq.ft\n📺 Modular TV Unit   ₹15,000+\n🏛️ Fluted Panels     ₹200–₹500 / sq.ft\n🏢 Grid Ceiling      ₹45–₹90 / sq.ft\n\nRoom ka size batayein (jaise 12×14) — main estimate nikaal deti hoon! 📐`
  }

  // ── Quality/warranty intent
  const QUALITY_KW = ["guarantee","warranty","waterproof","quality","bharosa","trust","kitne saal","durable","material","isi","certified","strong","tuta","girta","peeling","life","chalega"]
  if (has(t, QUALITY_KW)) {
    return `✅ **JK Interior Quality Guarantee:**\n\n🏆 **5 saal ki written warranty** — koi bhi issue aaye, free repair\n🔬 ISI-certified, branded materials — koi duplicate nahi\n💧 Waterproof options available for every room\n👷 8+ saal ka experience, 500+ completed projects\n\nAapka kaam safe hands mein hai! 🙏`
  }

  // ── Booking intent
  const BOOK_KW = ["visit","book","site visit","measurement","quotation","bulao","aao","milna","survey","appointment","schedule","bula lo","free visit","aana hai"]
  if (has(t, BOOK_KW)) {
    return `📅 **Free Site Visit — Bilkul Free!**\n\nHamare expert aayenge, measurements lenge, aur same day exact quotation denge. Koi hidden charge nahi, koi obligation nahi!\n\n📞 **+91 8651070831** pe call/WhatsApp karein${oh ? "\n\n🌙 Abhi office hours ke baad hai — team kal 9 baje contact karegi!" : " — aaj hi schedule ho sakta hai! ✅"}`
  }

  // ── Call intent
  const CALL_KW = ["call","phone","contact","baat","number","reach","talk"]
  if (has(t, CALL_KW)) {
    return oh
      ? `📞 **+91 8651070831**\n\n🌙 Abhi raat ka time hai — team **kal subah 9 baje** aapko call karegi. Ya WhatsApp pe message karein — hum available hain! 💬`
      : `📞 **Call karein:** +91 8651070831\n\nYa neeche WhatsApp button tap karein — seedha baat karein hamare expert se! 💬`
  }

  // ── Area/location intent
  const AREA_KW = ["area","location","where","kahan","serve","district","kaun sa","aata hai","available","cover","city"]
  if (has(t, AREA_KW)) {
    const city = detectCity(t)
    if (city) return `📍 **${city}** — haan, hum wahan kaam karte hain! 👍\n\nHum cover karte hain:\n${AREAS.join(" • ")}\n\nFree site visit book karein! 🙌`
    return `📍 Hum in sabhi areas mein kaam karte hain:\n\n${AREAS.join(" • ")}\n\nApna city batayein — main confirm kar deti hoon! 😊`
  }

  // City mention alone
  const city = detectCity(t)
  if (city && t.length < 50) return `📍 **${city}** mein hum regularly kaam karte hain! 💪\n\nFree site visit arrange ho sakti hai — ceiling ya wall paneling kisliye chahiye? 😊`

  // ── LED / Lighting
  if (t.includes("led") || t.includes("light") || t.includes("cove light") || t.includes("strip")) {
    return `✨ **LED Cove Lighting** gypsum ceiling ke saath add kar sakte hain:\n• Running cost: ₹40–₹80/running ft\n• WPC TV wall LED backlight: ₹2,000–₹5,000\n\nBahut premium look aata hai! Night mein ghar cinema jaisa lagta hai 😍\n\nFree site visit mein design discuss karein!`
  }

  // ── Default — ask for the most useful next detail
  return pick([
    nm
      ? `${nm}, room ka size bata dijiye (jaise 12×14) — main abhi estimate nikaalta hoon! 📐`
      : `Room ka size bata dijiye (jaise 10×12 ya 12×14) aur kaunsa kaam chahiye — ceiling ya wall paneling? Estimate abhi nikaaluun! 😊`,
    `Thoda aur bata dijiye — kaunsi room ke liye hai aur approximately size kya hoga? Size milte hi estimate bata deti hoon! 📐`,
  ])
}

// ── Quick replies ──────────────────────────────────────────────────────────────
const QR_INITIAL  = ["PVC Ceiling", "Gypsum Ceiling", "WPC Panels", "Price List", "Free Site Visit"]
const QR_GENERAL  = ["PVC Ceiling", "Gypsum Ceiling", "Price / Rate", "Book Site Visit", "Quality & Warranty", "Our Areas"]
const QR_SERVICE  = ["Price / Rate", "Quality & Warranty", "Book Site Visit", "Other Services"]

function getQR(lastTopic: string | null, hasLead: boolean): string[] {
  if (hasLead)    return QR_GENERAL
  if (lastTopic)  return QR_SERVICE
  return QR_INITIAL
}

// ── Inline icons (no external dep) ────────────────────────────────────────────
const IChatBubble = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const IClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const ISend = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 translate-x-px" aria-hidden>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
)
const IWA = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current shrink-0" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.054 23.447a.5.5 0 00.611.61l5.7-1.461A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.389l-.36-.214-3.733.957.993-3.618-.235-.373A9.818 9.818 0 1112 21.818z"/>
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
const ISparkle = () => (
  <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden>
    <path d="M12 2l1.8 5.4L19.2 6l-4.2 3.6L16.8 15 12 11.4 7.2 15l1.8-5.4L4.8 6l5.4 1.4z"/>
  </svg>
)

// ── Rich text renderer ─────────────────────────────────────────────────────────
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong>
        if (p.startsWith("*") && p.endsWith("*"))   return <em key={i} className="not-italic text-[11px] opacity-70">{p.slice(1, -1)}</em>
        return <span key={i}>{p}</span>
      })}
    </>
  )
}

// ── Typing indicator ───────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-end gap-2 animate-in fade-in duration-200">
      <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-sm">
        <span className="text-[8px] font-black text-white tracking-tight">JK</span>
      </div>
      <div className="rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm bg-white border border-gray-100">
        <div className="flex gap-[5px] items-center h-[14px]">
          {[0, 160, 320].map(d => (
            <span
              key={d}
              className="h-[7px] w-[7px] rounded-full bg-emerald-400"
              style={{ animation: `jk-bounce 1.2s ease-in-out ${d}ms infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Lead card ──────────────────────────────────────────────────────────────────
function LeadConfirmCard({ data, waHref, bookHref }: { data: LeadCard; waHref: string; bookHref: string }) {
  const rows = [
    { label: "👤 Name",    value: data.name },
    { label: "📱 Phone",   value: data.phone },
    { label: "📍 City",    value: data.city    || "—" },
    { label: "🔧 Service", value: data.service || "—" },
  ]
  const d  = new Date(data.timestamp)
  const ts = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`

  return (
    <div className="w-full max-w-[85%] rounded-2xl rounded-bl-sm overflow-hidden border border-emerald-200 shadow-md bg-white animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-3.5 py-2.5 flex items-center gap-2.5">
        <span className="text-lg">🎉</span>
        <div>
          <p className="text-xs font-bold text-white leading-tight">Lead Confirmed!</p>
          <p className="text-[10px] text-white/65">{ts}</p>
        </div>
      </div>
      <div className="px-3.5 py-2.5 space-y-1.5">
        {rows.map(r => (
          <div key={r.label} className="flex items-start gap-2 text-xs">
            <span className="text-gray-400 shrink-0 w-20 text-[11px]">{r.label}</span>
            <span className="font-semibold text-gray-800 break-all text-[12px]">{r.value}</span>
          </div>
        ))}
      </div>
      <div className="px-3.5 pb-3.5 pt-1 space-y-2">
        <p className="text-[11px] text-emerald-700 font-semibold text-center bg-emerald-50 rounded-lg py-1.5 border border-emerald-100">
          ✅ JK Interior team aapko jald contact karegi!
        </p>
        <div className="flex gap-2">
          <a href={waHref} target="_blank" rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2.5 text-[11px] font-bold text-white hover:opacity-90 active:scale-95 transition-all touch-manipulation"
          >
            <IWA /> WhatsApp
          </a>
          <a href={bookHref} target="_blank" rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-[11px] font-bold text-white hover:bg-emerald-500 active:scale-95 transition-all touch-manipulation"
          >
            <ICal /> Book Visit
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Welcome message ────────────────────────────────────────────────────────────
const WELCOME_MSG = mk(
  "bot",
  "नमस्ते! 👋 Main **Riya** hoon — JK Interior ki AI consultant!\n\nGypsum ya PVC ceiling, WPC wall panels, pricing, room estimate — kuch bhi poochhein. Main aapko sahi direction dene mein help karungi. 😊\n\n_Room ka size batayein — estimate abhi nikaal deti hoon!_"
)

// ── Main component ─────────────────────────────────────────────────────────────
export default function JKChat() {
  const [open,      setOpen]      = useState(false)
  const [messages,  setMsgs]      = useState<Message[]>([WELCOME_MSG])
  const [input,     setInput]     = useState("")
  const [lead,      setLead]      = useState<Partial<Lead> | null>(null)
  const [lastTopic, setLastTopic] = useState<string | null>(null)
  const [typing,    setTyping]    = useState(false)
  const [aiMode,    setAiMode]    = useState(true)
  const [offHours,  setOffHours]  = useState(false)  // client-only, avoids hydration mismatch
  const historyRef                = useRef<ConvMsg[]>([])
  const scrollRef                 = useRef<HTMLDivElement>(null)
  const inputRef                  = useRef<HTMLInputElement>(null)
  const sendLock                  = useRef(false)

  // ── Resolve off-hours status on client only (avoids SSR/client mismatch)
  useEffect(() => { setOffHours(isOffHours()) }, [])

  // ── body attribute so CSS can hide floating buttons when chat is open
  useEffect(() => {
    document.body[open ? "setAttribute" : "removeAttribute"]("data-chat-open", "1")
    return () => { document.body.removeAttribute("data-chat-open") }
  }, [open])

  // ── Restore persisted lead from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("jk_chat_v5")
      if (raw) {
        const { lead: l, topic: tp } = JSON.parse(raw)
        if (l) { setLead(l); setLastTopic(tp ?? null) }
      }
    } catch {}
  }, [])

  // ── Auto-scroll on new messages
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    requestAnimationFrame(() => el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }))
  }, [messages, typing, open])

  // ── Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350)
  }, [open])

  const persist = (l: Partial<Lead> | null, tp: string | null) => {
    try { localStorage.setItem("jk_chat_v5", JSON.stringify({ lead: l, topic: tp })) } catch {}
  }

  // ── Core send handler (async, AI-first with rule-based fallback)
  const send = useCallback(async (override?: string) => {
    const text = (override ?? input).trim()
    if (!text || typing || sendLock.current) return

    sendLock.current = true
    setInput("")
    setMsgs(prev => [...prev, mk("user", text)])
    setTyping(true)

    // Update conversation history for AI
    historyRef.current = [...historyRef.current, { role: "user", content: text }]

    // Detect service/city from user message
    const svc  = detectService(text.toLowerCase())
    const city = detectCity(text.toLowerCase())

    // Extract phone number if present
    const extractedPhone = tryExtractPhone(text)
    let updatedLead = lead ? { ...lead } : null

    if (extractedPhone && !lead?.phone) {
      const extractedName = tryExtractName(text)
      updatedLead = {
        ...(lead || {}),
        phone: extractedPhone,
        name: extractedName || lead?.name || "Friend",
        city: city || lead?.city,
        service: svc || lead?.service,
      }
      setLead(updatedLead)
      storeAdminLead(updatedLead as Lead)
    } else if (city && !lead?.city) {
      updatedLead = { ...(lead || {}), city }
      setLead(updatedLead)
    } else if (svc && !lead?.service) {
      updatedLead = { ...(lead || {}), service: svc }
      setLead(updatedLead)
    }

    // Natural typing delay
    await delay(550 + Math.random() * 450)

    // Try AI — smart local fallback on failure
    let reply: string | null = null
    if (aiMode) {
      const aiResult = await getAIReply(text, historyRef.current.slice(0, -1), updatedLead)
      if (aiResult) {
        reply = aiResult.reply
        // Only disable AI mode if server itself is unreachable (null result)
        // If server returns local fallback (source: "local"), keep aiMode on
      } else {
        // Server unreachable — disable AI mode and use pure local fallback
        setAiMode(false)
      }
    }
    if (!reply) reply = localFallback(text, updatedLead)

    // Update history with bot reply
    historyRef.current = [...historyRef.current, { role: "assistant", content: reply }]

    // Update topic tracking
    const newTopic = svc ? svc.toLowerCase().replace(/\s+/g, "-") : lastTopic
    setLastTopic(newTopic)
    persist(updatedLead, newTopic)

    // Add reply(s) to messages
    setMsgs(prev => {
      const next = [...prev, mk("bot", reply as string)]
      // Show lead card if we just captured their phone
      if (extractedPhone && !lead?.phone && updatedLead?.phone) {
        const card: LeadCard = {
          name:      updatedLead.name    || "Friend",
          phone:     updatedLead.phone!,
          city:      updatedLead.city,
          service:   updatedLead.service,
          timestamp: new Date().toISOString(),
        }
        next.push(mk("bot", "lead_card", "card", card))
      }
      return next
    })

    setTyping(false)
    sendLock.current = false
  }, [input, lead, typing, lastTopic, aiMode])

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() }
  }

  const waHref   = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lead?.name ? `Hello JK Interior, main ${lead.name} hoon${lead.phone ? ` (${lead.phone})` : ""}. Mujhe interior work karwana hai.` : "Hello JK Interior, mujhe interior work karwana hai. Please share details.")}`
  const bookHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lead?.name ? `Hi JK Interior! Main ${lead.name}${lead.phone ? ` (${lead.phone})` : ""}. Free site visit book karna chahta/chahti hoon.` : "Hi JK Interior! Free site visit book karna chahta hoon.")}`
  const qrSet    = getQR(lastTopic, !!lead?.phone)

  const statusText = offHours
    ? "🌙 Opens 9 AM • WhatsApp available"
    : "🟢 Online — Forbesganj • Araria • Purnia"

  return (
    <>
      {/* ── Bounce keyframes (injected once) */}
      <style>{`
        @keyframes jk-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: .6; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes jk-ring {
          0% { transform: scale(1); opacity: .7; }
          100% { transform: scale(1.9); opacity: 0; }
        }
      `}</style>

      {/* ── Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open JK Interior AI chat"
          className="fixed bottom-[5.5rem] left-4 z-50 md:bottom-24 md:left-6"
          style={{ width: 54, height: 54 }}
        >
          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-full bg-emerald-400 opacity-60"
            style={{ animation: "jk-ring 1.8s ease-out infinite" }}
            aria-hidden
          />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-[0_4px_20px_rgba(5,150,105,0.5)] hover:shadow-[0_4px_28px_rgba(5,150,105,0.7)] transition-shadow hover:scale-110 active:scale-95">
            <IChatBubble />
          </span>
          {/* AI badge */}
          <span className="absolute -top-1 -right-1 flex items-center gap-0.5 rounded-full bg-amber-400 px-1.5 py-0.5 text-[8px] font-black text-amber-900 shadow">
            <ISparkle />AI
          </span>
        </button>
      )}

      {/* ── Chat window */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="JK Interior Chat"
          className="fixed z-50 flex flex-col overflow-hidden shadow-2xl
                     bottom-0 left-0 right-0 h-[92dvh] max-h-[680px] rounded-t-3xl
                     md:bottom-6 md:left-auto md:right-6 md:h-[600px] md:w-[400px] md:rounded-2xl
                     animate-in fade-in slide-in-from-bottom-6 duration-300"
          style={{ background: "rgba(255,255,255,0.99)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
        >
          {/* ── Header */}
          <div className="flex shrink-0 items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-700 to-emerald-500 text-white">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 font-black text-sm ring-2 ring-white/30">
                JK
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-300 border-2 border-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-[13px] font-bold leading-tight">JK Interior AI</p>
                  <span className="flex items-center gap-0.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[8px] font-black">
                    <ISparkle />AI
                  </span>
                </div>
                <p className="text-[10px] text-white/70 leading-none mt-0.5">{statusText}</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 active:scale-90 transition-all"
            >
              <IClose />
            </button>
          </div>

          {/* ── AI indicator banner (shows while AI is active) */}
          {aiMode && (
            <div className="shrink-0 flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border-b border-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <p className="text-[10px] text-emerald-700 font-medium">Powered by AI — Gemini 2.0 Flash</p>
            </div>
          )}

          {/* ── Messages */}
          <div
            ref={scrollRef}
            className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-3 scrollbar-luxury"
            style={{ background: "linear-gradient(180deg, #f0fdf4 0%, #f7f9f8 100%)" }}
          >
            {messages.map((m, idx) => (
              <div
                key={m.id}
                className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                style={{ animationDelay: `${Math.min(idx * 20, 100)}ms` }}
              >
                {/* Bot avatar */}
                {m.role === "bot" && m.kind !== "card" && (
                  <div className="shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-0.5 shadow-sm">
                    <span className="text-[8px] font-black text-white">JK</span>
                  </div>
                )}
                {/* Lead card spacer */}
                {m.role === "bot" && m.kind === "card" && <div className="h-6 w-6 shrink-0" />}

                {/* Content */}
                {m.kind === "card" && m.cardData ? (
                  <LeadConfirmCard data={m.cardData} waHref={waHref} bookHref={bookHref} />
                ) : (
                  <div
                    className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-br-sm shadow-md shadow-emerald-200"
                        : "bg-white text-gray-800 rounded-bl-sm border border-gray-100 shadow-sm"
                    }`}
                  >
                    <RichText text={m.text} />
                  </div>
                )}
              </div>
            ))}
            {typing && <TypingDots />}
          </div>

          {/* ── Quick replies */}
          <div className="shrink-0 flex gap-1.5 overflow-x-auto px-3 py-2 bg-white border-t border-gray-100 scrollbar-luxury">
            {qrSet.map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={typing}
                className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 active:scale-95 transition-all whitespace-nowrap disabled:opacity-40 touch-manipulation"
              >
                {q}
              </button>
            ))}
          </div>

          {/* ── CTA buttons */}
          <div className="shrink-0 flex gap-2 border-t border-gray-100 bg-white px-3 py-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-2 py-2.5 text-xs font-bold text-white hover:opacity-90 active:scale-95 transition-all touch-manipulation"
            >
              <IWA /> WhatsApp
            </a>
            <a
              href={`tel:${CALL_NUMBER}`}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 active:scale-95 transition-all touch-manipulation"
            >
              <IPhone /> Call
            </a>
            {lead?.phone && (
              <a
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-2 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 active:scale-95 transition-all touch-manipulation"
              >
                <ICal /> Book Visit
              </a>
            )}
          </div>

          {/* ── Input */}
          <div className="shrink-0 flex items-center gap-2 border-t border-gray-200 bg-white px-3 py-2.5 pb-[max(10px,env(safe-area-inset-bottom))]">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Kuch bhi poochhein…"
              className="flex-1 min-w-0 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-[13px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all"
              autoComplete="off"
              inputMode="text"
              maxLength={500}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || typing}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md shadow-emerald-200 hover:bg-emerald-500 active:scale-90 transition-all disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none touch-manipulation"
            >
              <ISend />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

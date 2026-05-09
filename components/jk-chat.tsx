"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// ── Types ─────────────────────────────────────────────────────────────────────
type Role = "bot" | "user"
type Message = { id: number; role: Role; text: string }
type LeadStage = "name_phone" | "city" | "service" | "budget" | "done"
type Lead = { name: string; phone: string; city?: string; service?: string; budget?: string }

// ── Config ────────────────────────────────────────────────────────────────────
const WA_NUMBER = "918651070831"
const CALL_NUMBER = "+918651070831"
const AREAS = ["Forbesganj", "Araria", "Purnia", "Narpatganj", "Raniganj", "Jogbani", "Supaul"]

// ── Keyword groups ────────────────────────────────────────────────────────────
const PRICE_KW   = ["price","cost","rate","kimat","daam","kitna","kharcha","budget","lagat","paisa","rupee","rs ","quote","estimate","how much","lagega","mehnga","sasta","charge","amount"]
const BOOK_KW    = ["visit","book","call","site visit","measurement","estimate","quotation","bulao","aao","milna","survey","appointment","aana","schedule","fix","confirm"]
const QUALITY_KW = ["guarantee","warranty","waterproof","quality","bharosa","trust","kitne saal","durable","material","isi","certified","strong","safe","reliable"]
const GREET_KW   = ["hi","hello","hey","namaste","namaskar","helo","good morning","good evening","good afternoon","hy","hii","sup","hola","salam"]
const THANKS_KW  = ["thank","shukriya","dhanyawad","thanks","thx","bahut accha","great","perfect","nice","superb","awesome","shabash","bahut badiya"]
const AREA_KW    = ["area","location","where","kahan","serve","city","district","place","shahar","town","near","kaun sa","konsa"]
const HELP_KW    = ["help","madad","support","assist","guidance","info","information","details","batao","bata","samjhao"]

// ── Service knowledge ─────────────────────────────────────────────────────────
const SERVICES: Record<string, { name: string; emoji: string; desc: string }> = {
  pvc:      { name: "PVC False Ceiling",  emoji: "🏠", desc: "Waterproof, termite-proof, easy maintenance.\nBudget-friendly premium finish jo 10+ saal tikti hai.\nBest for kitchens, bathrooms & all rooms." },
  gypsum:   { name: "Gypsum False Ceiling", emoji: "✨", desc: "Elegant smooth finish ceiling with hidden lighting.\nPOP designs, cove lighting, tray ceilings — sab possible!\nBest for living rooms & bedrooms." },
  wpc:      { name: "WPC Wall Paneling",  emoji: "🪵", desc: "Moisture-resistant eco-friendly wood-look panels.\nPerfect for TV unit, accent walls, full room paneling.\nLuxury look at very affordable price." },
  marble:   { name: "UV Marble Sheets",   emoji: "💎", desc: "High-gloss marble-look panels — scratch-resistant, hygienic.\nWall, floor, kitchen counter — everywhere looks premium.\nReal marble se 80% sasta!" },
  grid:     { name: "Grid Ceiling",       emoji: "🏢", desc: "Clean modular ceiling for offices, shops & clinics.\nEasy wiring & AC access. Neat professional look.\nFast installation, low maintenance." },
  grass:    { name: "Artificial Grass",   emoji: "🌿", desc: "Evergreen, low-maintenance turf for balconies & terraces.\nAlways fresh garden look — no watering needed!\nBest for feature walls & kids rooms too." },
  interior: { name: "Complete Interior",  emoji: "🏡", desc: "Full home interior — ceiling + wall paneling + TV unit + kitchen.\nOne team, one timeline, guaranteed quality.\nForbesganj ki sabse trusted interior team!" },
}

// ── Response packs (random variation) ────────────────────────────────────────
const PRICE_PACK = [
  "💰 Pricing per sq. ft. hoti hai — material aur design ke hisaab se.\n\n📐 Room ka size share karein ya WhatsApp pe photo bhejein — same day free estimate milegi!",
  "💸 Har project alag hota hai — size + material se price decide hoti hai.\n\nBest hoga agar room dimensions WhatsApp pe bhejein. Main turant estimate dunga! 👍",
  "💰 Rate depend karta hai material quality aur design pe.\n\nFree site visit mein exact quotation milegi — koi hidden charge nahi! ✅",
]

const QUALITY_PACK = [
  "✅ JK Interior sirf ISI-certified, waterproof materials use karta hai.\n\n🏆 5 saal ki written warranty • 5000+ sqft installed • 100+ happy clients Bihar mein!",
  "💪 Hamare saare materials ISI certified aur fully waterproof hain.\n\n5 saal ki written guarantee — koi bhi issue → free repair. That's our promise! 🙏",
]

const FALLBACK_PACK = [
  "🤔 Seedha choose karein:\n\n• PVC Ceiling\n• Gypsum Ceiling\n• Price / Rate\n• Book Site Visit\n• Call Now\n• WhatsApp\n\nYa neeche se button tap karein!",
  "😅 Mujhe samajh nahi aaya — neeche se option chunein ya WhatsApp pe directly likhein!\n\n• PVC / Gypsum / WPC / UV Marble\n• Price\n• Site Visit",
]

const GREET_PACK = (name?: string) => [
  `Namaste ${name || ""}! 😊 Kya main aapki help kar sakta hoon?\n\nNeeche buttons se choose karein ya seedha type karein.`,
  `Hi ${name || "there"}! 👋 JK Interior mein aapka swagat hai!\n\nAaj main aapke liye kya kar sakta hoon?`,
]

const BOOK_PACK = (name?: string) => [
  `📅 Bilkul ${name || ""}! Site visit bilkul **free** hai.\n\n"Book Visit" button dabayein ya WhatsApp karein — aaj hi appointment fix ho sakti hai! ✅`,
  `✅ ${name || "Aap"} ke liye site visit book karna bahut aasaan hai!\n\nNeeche "Book Visit" tap karein — 24 ghante mein hamare expert call karenge. 🙌`,
]

// ── Helpers ───────────────────────────────────────────────────────────────────
let _id = 0
const uid = () => ++_id
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
const has  = (t: string, kw: string[]) => kw.some(k => t.includes(k))
const msg  = (role: Role, text: string): Message => ({ id: uid(), role, text })

function detectServiceKey(t: string): string | null {
  if (t.includes("pvc")) return "pvc"
  if (t.includes("gypsum") || t.includes("pop") || t.includes("plaster")) return "gypsum"
  if (t.includes("wpc") || t.includes("louver")) return "wpc"
  if (t.includes("uv ") || t.includes("marble") || t.includes("sangmarmar")) return "marble"
  if (t.includes("grid")) return "grid"
  if (t.includes("grass") || t.includes("turf") || t.includes("ghans")) return "grass"
  if (t.includes("complete interior") || t.includes("full interior") || t.includes("poora ghar")) return "interior"
  if (t.includes("false ceiling") || t.includes("ceiling") || t.includes("chhat")) return "gypsum"
  if (t.includes("wall panel") || t.includes("deewar") || t.includes("diwar") || t.includes("tv panel") || t.includes("tv unit")) return "wpc"
  if (t.includes("interior") || t.includes("design") || t.includes("ghar") || t.includes("home decor")) return "interior"
  return null
}

function extractPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "")
  const m = digits.match(/(?:0|91)?([6-9]\d{9})/)
  return m ? m[1] : null
}

function extractName(raw: string): string {
  const phone = extractPhone(raw)
  let s = phone ? raw.replace(new RegExp(phone, "g"), "").replace(/91/g, "").trim() : raw
  const stops = /\b(my|name|is|i|am|this|phone|number|mobile|contact|mera|naam|hai|hoon|ka|ki|ke|mujhe|main|me|aur|or)\b/gi
  s = s.replace(stops, " ")
       .replace(/[^a-zA-Z\u0900-\u097F\s]/g, " ")
       .replace(/\s+/g, " ")
       .trim()
  const parts = s.split(/\s+/).filter(p => p.length > 1)
  return parts.slice(0, 2).join(" ")
}

// ── Core reply engine ─────────────────────────────────────────────────────────
function buildReply(
  input: string,
  lead: Lead | null,
  stage: LeadStage,
): { reply: string; newLead?: Partial<Lead>; newStage?: LeadStage } {
  const t = input.toLowerCase()
  const name = lead?.name || ""

  // Service lookup — always available
  const sk = detectServiceKey(t)
  if (sk) {
    const s = SERVICES[sk]
    return { reply: `${s.emoji} **${s.name}**\n\n${s.desc}\n\n📍 Hum ${AREAS.slice(0, 4).join(", ")} aur nearby areas mein install karte hain.\n\nFree quote chahiye? 👇 WhatsApp karein!` }
  }

  // Intent overrides
  if (has(t, PRICE_KW))   return { reply: pick(PRICE_PACK) }
  if (has(t, BOOK_KW))    return { reply: pick(BOOK_PACK(name)) }
  if (has(t, QUALITY_KW)) return { reply: pick(QUALITY_PACK) }
  if (has(t, GREET_KW))   return { reply: pick(GREET_PACK(name)) }
  if (has(t, THANKS_KW))  return { reply: `Shukriya ${name}! 🙏 Koi bhi sawaal ho toh zaroor poochhein. Hum hamesha ready hain!` }
  if (has(t, AREA_KW))    return { reply: `📍 Hum in areas mein kaam karte hain:\n\n${AREAS.join(" • ")}\n\nAur bhi nearby areas covered hain — ek baar WhatsApp pe confirm karein!` }
  if (has(t, HELP_KW))    return { reply: `Zaroor! Main aapki kaise help kar sakta hoon?\n\n• Koi service ke baare mein jaanna hai?\n• Price / Rate chahiye?\n• Site visit book karni hai?\n\nNeeche se choose karein! 👇` }

  // ── Lead flow (stage machine) ──────────────────────────────────────────────
  if (stage === "name_phone") {
    const phone = extractPhone(input)
    if (!phone) {
      return { reply: "📱 Please apna naam aur 10-digit phone number share karein.\n\n*Example: Rahul 9876543210*\n\nYa neeche Quick Reply buttons se shuru karein." }
    }
    const name = extractName(input) || "Friend"
    return {
      reply: `Shukriya **${name}**! 🎉 Aapka number note ho gaya.\n\nAap kaunse city/area mein hain?\n_(Forbesganj, Araria, Purnia, etc.)_`,
      newLead: { name, phone },
      newStage: "city",
    }
  }

  if (stage === "city") {
    const city = input.trim().split(/\s+/).slice(0, 2).join(" ")
    return {
      reply: `📍 **${city}** — hum wahan kaam karte hain! 👍\n\nAapko konsi service chahiye?\n\n• PVC Ceiling\n• Gypsum Ceiling\n• WPC Wall Panel\n• UV Marble Sheet\n• Complete Interior\n• Kuch aur`,
      newLead: { city },
      newStage: "service",
    }
  }

  if (stage === "service") {
    const svc = input.trim()
    return {
      reply: `✅ **${svc}** — noted!\n\nAapka approximate budget kya hai?\n\n• Under ₹50,000\n• ₹50,000 – ₹1 Lakh\n• ₹1 Lakh – ₹2 Lakh\n• ₹2 Lakh+\n• Abhi decide nahi kiya`,
      newLead: { service: svc },
      newStage: "budget",
    }
  }

  if (stage === "budget") {
    const bgt = input.trim()
    return {
      reply: `🎉 Shukriya! Aapki details note ho gayi:\n\n👤 **${lead!.name}** | 📱 ${lead!.phone}\n📍 ${lead!.city || "—"} | 🔧 ${lead!.service || "—"}\n💰 Budget: ${bgt}\n\n✅ **JK Interior ki team aapko jald hi contact karegi!**\n\nKoi aur sawaal? Neeche se choose karein. 👇`,
      newLead: { budget: bgt },
      newStage: "done",
    }
  }

  return { reply: pick(FALLBACK_PACK) }
}

// ── Quick reply sets ──────────────────────────────────────────────────────────
const QR_INITIAL = ["PVC Ceiling", "Gypsum Ceiling", "WPC Panels", "Price / Rate", "Book Site Visit"]
const QR_DONE    = ["PVC Ceiling", "Gypsum Ceiling", "Price / Rate", "Book Site Visit", "Quality & Warranty", "Our Areas"]

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
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.054 23.447a.5.5 0 00.611.61l5.7-1.461A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.389l-.36-.214-3.733.957.993-3.618-.235-.373A9.818 9.818 0 1112 21.818z"/>
  </svg>
)
const ICal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const IPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2.74h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.34a16 16 0 0 0 6.06 6.06l1.66-1.66a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

// ── Render text with basic markdown (bold + italic) ──────────────────────────
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>
        if (p.startsWith("*") && p.endsWith("*")) return <em key={i} className="not-italic text-gray-500 text-xs">{p.slice(1, -1)}</em>
        return <span key={i}>{p}</span>
      })}
    </>
  )
}

// ── Typing dots ──────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex justify-start items-end gap-2">
      <div className="h-6 w-6 shrink-0 rounded-full bg-emerald-600 flex items-center justify-center">
        <span className="text-[9px] font-black text-white">JK</span>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-3">
          {[0, 150, 300].map((d) => (
            <span key={d} className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function JKChat() {
  const [open, setOpen]       = useState(false)
  const [messages, setMsgs]   = useState<Message[]>(() => [
    msg("bot", "नमस्ते! 👋 Welcome to **JK Interior**!\n\nApna naam aur 10-digit phone number share karein — main aapko best consultation dunga.\n\n*Example: Rahul 9876543210*"),
  ])
  const [input, setInput]     = useState("")
  const [lead, setLead]       = useState<Lead | null>(null)
  const [stage, setStage]     = useState<LeadStage>("name_phone")
  const [typing, setTyping]   = useState(false)
  const scrollRef             = useRef<HTMLDivElement>(null)
  const inputRef              = useRef<HTMLInputElement>(null)

  // Restore saved lead
  useEffect(() => {
    try {
      const raw = localStorage.getItem("jk_chat_v3")
      if (raw) {
        const { lead: l, stage: s } = JSON.parse(raw)
        if (l) { setLead(l); setStage(s ?? "done") }
      }
    } catch {}
  }, [])

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    requestAnimationFrame(() => el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }))
  }, [messages, typing, open])

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const saveLead = (l: Lead, s: LeadStage) => {
    try { localStorage.setItem("jk_chat_v3", JSON.stringify({ lead: l, stage: s })) } catch {}
  }

  const send = useCallback((override?: string) => {
    const text = (override ?? input).trim()
    if (!text || typing) return
    setInput("")

    setMsgs(prev => [...prev, msg("user", text)])
    setTyping(true)

    const delay = 550 + Math.random() * 350
    setTimeout(() => {
      const { reply, newLead: nl, newStage: ns } = buildReply(text, lead, stage)

      const updatedLead = nl ? { ...lead, ...nl } as Lead : lead
      const updatedStage: LeadStage = ns ?? stage

      if (nl || ns) {
        if (updatedLead) setLead(updatedLead)
        setStage(updatedStage)
        if (updatedLead) saveLead(updatedLead, updatedStage)
      }

      setTyping(false)
      setMsgs(prev => [...prev, msg("bot", reply)])
    }, delay)
  }, [input, lead, stage, typing])

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() }
  }

  const waHref   = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lead ? `Hello JK Interior, main ${lead.name} (${lead.phone}) hoon. Mujhe interior work karwana hai.` : "Hello JK Interior, mujhe interior work karwana hai.")}`
  const bookHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lead ? `Hi JK Interior, I'm ${lead.name} (${lead.phone}). I'd like to book a free site visit.` : "Hi JK Interior, I'd like to book a free site visit.")}`

  const qrSet = lead || stage !== "name_phone" ? QR_DONE : QR_INITIAL

  return (
    <>
      {/* Floating toggle button */}
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

      {/* Chat window */}
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
          {/* ── Header ── */}
          <div className="flex shrink-0 items-center justify-between px-4 py-3 bg-emerald-600 text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 font-black text-sm">
                JK
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-300 border-2 border-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">JK Interior Assistant</p>
                <p className="text-[10px] opacity-70 leading-none mt-0.5">Forbesganj • Araria • Purnia • Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1.5 hover:bg-white/20 transition-colors">
              <IClose />
            </button>
          </div>

          {/* ── Messages ── */}
          <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-3 bg-[#f7faf9] scrollbar-luxury">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-end gap-1.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && (
                  <div className="shrink-0 h-6 w-6 rounded-full bg-emerald-600 flex items-center justify-center mb-0.5">
                    <span className="text-[9px] font-black text-white">JK</span>
                  </div>
                )}
                <div
                  className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-emerald-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                  }`}
                >
                  <RichText text={m.text} />
                </div>
              </div>
            ))}
            {typing && <TypingDots />}
          </div>

          {/* ── Quick replies ── */}
          <div className="shrink-0 flex gap-1.5 overflow-x-auto px-3 py-2 bg-white border-t border-gray-100 scrollbar-luxury">
            {qrSet.map((q) => (
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

          {/* ── CTA row ── */}
          <div className="shrink-0 flex gap-2 border-t border-gray-100 bg-white px-3 py-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-2 py-2 text-xs font-bold text-white hover:opacity-90 active:scale-95 transition-all touch-manipulation"
            >
              <IWA /> WhatsApp
            </a>
            <a
              href={`tel:${CALL_NUMBER}`}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 active:scale-95 transition-all touch-manipulation"
            >
              <IPhone /> Call
            </a>
            {lead && (
              <a
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-2 py-2 text-xs font-bold text-white hover:bg-emerald-500 active:scale-95 transition-all touch-manipulation"
              >
                <ICal /> Book Visit
              </a>
            )}
          </div>

          {/* ── Input ── */}
          <div className="shrink-0 flex items-center gap-2 border-t border-gray-200 bg-white px-3 py-2.5">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={stage === "name_phone" ? "Naam + phone: Rahul 9876543210" : "Kuch bhi poochhein…"}
              className="flex-1 min-w-0 rounded-full border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-emerald-400 focus:bg-white transition-colors"
              autoComplete="off"
              inputMode="text"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || typing}
              aria-label="Send message"
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

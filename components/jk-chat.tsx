"use client"

import { useEffect, useRef, useState } from "react"

type Message = {
  role: "bot" | "user"
  text: string
}

type Lead = {
  name: string
  phone: string
}

const WHATSAPP_NUMBER = "918651070831"
const SERVICE_AREAS = ["Forbesganj", "Araria", "Purnia", "Narpatganj", "Raniganj"]

const WELCOME_MESSAGE: Message = {
  role: "bot",
  text: "नमस्ते! 👋 Welcome to JK Interior!\n\nApna naam aur 10-digit phone number share karein — main aapko personalized consultation dunga.\n\n(e.g. Rahul 9876543210)",
}

const SERVICE_KNOWLEDGE: Record<string, string> = {
  pvc: "🏠 PVC Wall Paneling — waterproof, termite-proof, easy to maintain. Budget-friendly premium finish jo saalon tak tikti hai.",
  gypsum: "✨ Gypsum Ceiling — elegant false ceiling with smooth finish, hidden lighting, aur modern designs ke liye perfect.",
  wpc: "🪵 WPC Louvers & Panels — moisture-resistant, eco-friendly. TV unit ya accent wall ke liye luxury wood look.",
  marble: "💎 UV Marble Sheets — high-gloss marble look, scratch-resistant, hygienic. Real marble se kaafi sasta.",
  grid: "🏢 Grid Ceiling — offices, shops, clinics ke liye clean modular ceiling. Wiring aur AC access easy.",
  grass: "🌿 Artificial Grass — low-maintenance, evergreen turf for balconies, terraces, aur feature walls.",
  interior: "🏡 Complete Interior — hum full home interior karte hain: ceiling, wall paneling, TV unit, kitchen — sab ek jagah.",
}

const QUICK_REPLIES = ["PVC Ceiling", "Gypsum Ceiling", "WPC Panels", "Price / Rate", "Book Site Visit", "Hamara Area"]

function detectService(t: string): string | null {
  if (t.includes("pvc")) return SERVICE_KNOWLEDGE.pvc
  if (t.includes("gypsum") || t.includes("pop") || t.includes("chhat") || t.includes("ceiling")) return SERVICE_KNOWLEDGE.gypsum
  if (t.includes("wpc") || t.includes("louver") || t.includes("panel") || t.includes("deewar") || t.includes("diwar") || t.includes("wall")) return SERVICE_KNOWLEDGE.wpc
  if (t.includes("uv") || t.includes("marble") || t.includes("sangmarmar")) return SERVICE_KNOWLEDGE.marble
  if (t.includes("grid")) return SERVICE_KNOWLEDGE.grid
  if (t.includes("grass") || t.includes("turf") || t.includes("ghans")) return SERVICE_KNOWLEDGE.grass
  if (t.includes("interior") || t.includes("design") || t.includes("ghar") || t.includes("home") || t.includes("room")) return SERVICE_KNOWLEDGE.interior
  return null
}

function extractPhone(text: string): string | null {
  const digits = text.replace(/\D/g, "")
  const match = digits.match(/\d{10}/)
  return match ? match[0] : null
}

function extractName(text: string): string {
  const phone = text.replace(/\d+/g, "").trim()
  const stopWords = /\b(my|name|is|i|am|this|phone|number|mobile|contact|mera|naam|hai|hoon|ka|ki|ke)\b/gi
  const cleaned = phone.replace(stopWords, " ").replace(/\s+/g, " ").trim()
  if (!cleaned) return ""
  const parts = cleaned.split(/\s+/).filter(p => p.length > 1)
  return parts.slice(0, 2).join(" ")
}

function botReply(input: string, lead: Lead | null): string {
  const t = input.toLowerCase()

  const service = detectService(t)
  if (service) return `${service}\n\nHum yeh ${SERVICE_AREAS.join(", ")} aur aas-paas install karte hain. Free quote chahiye?`

  if (
    t.includes("price") || t.includes("cost") || t.includes("rate") ||
    t.includes("charge") || t.includes("budget") || t.includes("daam") ||
    t.includes("kimat") || t.includes("kitna") || t.includes("paisa") ||
    t.includes("rupee") || t.includes("rs") || t.includes("quote") ||
    t.includes("how much") || t.includes("kharcha") || t.includes("lagega")
  )
    return "💰 Pricing per sq. ft. hoti hai aur material quality pe depend karti hai.\n\nApne room ka size share karein ya WhatsApp pe hamare expert se baat karein — turant estimate milegi!"

  if (
    t.includes("location") || t.includes("area") || t.includes("where") ||
    t.includes("serve") || t.includes("kahan") || t.includes("kaha") ||
    t.includes("jagah") || t.includes("city") || t.includes("district")
  )
    return `📍 Hum in areas mein kaam karte hain:\n${SERVICE_AREAS.join(" • ")}\n\nAur bhi nearby areas covered hain — check karne ke liye WhatsApp karein.`

  if (
    t.includes("visit") || t.includes("book") || t.includes("appointment") ||
    t.includes("bulao") || t.includes("aao") || t.includes("milna") ||
    t.includes("survey") || t.includes("measurement")
  )
    return `📅 ${lead?.name || "Aap"} ke liye site visit book ho sakti hai!\n\nNeeche "Book Visit" button dabayein — hamare team aapse 24 ghante mein contact karega.`

  if (
    t.includes("quality") || t.includes("material") || t.includes("guarantee") ||
    t.includes("warranty") || t.includes("guarantee") || t.includes("bharosa") ||
    t.includes("kitne saal") || t.includes("kitna time") || t.includes("waterproof")
  )
    return "✅ JK Interior uses ISI-certified, waterproof materials with 5-year written warranty.\n\n5000+ sqft installed, 100+ happy clients across Bihar."

  if (
    t.includes("hi") || t.includes("hello") || t.includes("hey") ||
    t.includes("namaste") || t.includes("namaskar") || t.includes("helo")
  )
    return `Namaste ${lead?.name || ""}! 😊\n\nIn services ke baare mein poochhein:\n• PVC / Gypsum Ceiling\n• WPC / UV Marble Panels\n• Grid Ceiling / Artificial Grass\n• Price & Site Visit`

  if (
    t.includes("thank") || t.includes("shukriya") || t.includes("dhanyawad") || t.includes("thanks")
  )
    return `Shukriya ${lead?.name || ""}! 🙏 Koi bhi sawaal ho toh zaroor poochhein. Hum hamesha ready hain!`

  return `🤔 Samajh nahi aaya. Neeche se koi option select karein ya directly poochhein:\n\n• PVC, Gypsum, WPC, UV Marble\n• Price / Rate\n• Site Visit Book\n• Apna Area\n\nYa WhatsApp pe directly message karein!`
}

const IconChat = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const IconClose = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const IconSend = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)
const IconPin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)
const IconCal = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

export default function SmartAIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [lead, setLead] = useState<Lead | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("jk_lead")
      if (saved) setLead(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, open])

  const addMessages = (userText: string, replyText: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      { role: "bot", text: replyText },
    ])
  }

  const send = (overrideText?: string) => {
    const text = (overrideText ?? input).trim()
    if (!text) return
    if (!overrideText) setInput("")

    let reply: string
    if (!lead) {
      const phone = extractPhone(text)
      if (!phone) {
        reply = "📱 Please apna 10-digit phone number share karein.\n\nExample: Rahul 9876543210"
      } else {
        const name = extractName(text) || "Friend"
        const newLead: Lead = { name, phone }
        setLead(newLead)
        try { localStorage.setItem("jk_lead", JSON.stringify(newLead)) } catch {}
        reply = `Shukriya ${name}! 🎉 Aap register ho gaye hain.\n\nAb poochhein — PVC, Gypsum, WPC, UV Marble, Grid Ceiling, Price ya Site Visit ke baare mein!`
      }
    } else {
      reply = botReply(text, lead)
    }
    addMessages(text, reply)
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send()
  }

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lead ? `Hi JK Interior, I'm ${lead.name} (${lead.phone}). I'd like a consultation.` : "Hi JK Interior, I'd like a consultation."
  )}`
  const bookHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lead ? `Hi, I'm ${lead.name} (${lead.phone}). I'd like to book a site visit.` : "I'd like to book a site visit."
  )}`

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open JK Interior chat"
          className="fixed bottom-[5.5rem] left-4 z-50 flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_4px_20px_rgba(5,150,105,0.45)] transition-all hover:scale-110 hover:bg-emerald-500 active:scale-95 md:bottom-24 md:left-6"
          style={{ height: "52px", width: "52px" }}
        >
          <IconChat className="h-5 w-5" />
        </button>
      )}

      {open && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl border border-emerald-200
                     bottom-[5.5rem] right-3 left-3 h-[80vh] max-h-[560px]
                     md:left-auto md:bottom-6 md:right-6 md:h-[580px] md:w-[380px]
                     animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-emerald-600 text-white shrink-0">
            <div>
              <p className="text-sm font-bold leading-tight">JK Interior Assistant</p>
              <p className="flex items-center gap-1 text-[11px] opacity-80">
                <IconPin className="h-3 w-3" /> Forbesganj • Araria • Purnia
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1 hover:bg-white/20 transition-colors">
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-4 scrollbar-luxury bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-emerald-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-200 shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies — shown only after lead is captured */}
          {lead && (
            <div className="flex gap-1.5 overflow-x-auto px-3 py-2 bg-white border-t border-gray-100 scrollbar-luxury shrink-0">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="shrink-0 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex gap-2 border-t border-gray-200 bg-white px-3 py-2 shrink-0">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#25D366] px-3 py-2 text-xs font-bold text-white hover:opacity-90 transition-opacity"
            >
              WhatsApp
            </a>
            {lead && (
              <a
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:opacity-90 transition-opacity"
              >
                <IconCal className="h-3.5 w-3.5" /> Book Visit
              </a>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-gray-200 bg-white px-3 py-2.5 shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={lead ? "Kuch bhi poochhein…" : "Naam aur phone number likhein"}
              className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-emerald-400 focus:bg-white transition-all"
            />
            <button
              onClick={() => send()}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 transition-colors active:scale-95"
            >
              <IconSend className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

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
  text: "Welcome to JK Interior! May I know your Name and 10-digit Phone Number to provide a personalized consultation?",
}

const SERVICE_KNOWLEDGE: Record<string, string> = {
  pvc: "PVC Wall Paneling — waterproof, termite-proof, and easy to maintain. A premium, budget-friendly finish that lasts for years.",
  gypsum:
    "Gypsum Ceiling — perfect for elegant false ceilings with smooth finish, hidden lighting, and modern designs.",
  wpc: "WPC Louvers & Panels — moisture-resistant, eco-friendly, and ideal for accent walls or TV units with a luxury wood look.",
  "uv marble":
    "UV Marble Sheets — high-gloss marble-look panels that are scratch-resistant, hygienic, and far more affordable than real marble.",
  grid: "Grid Ceiling — clean modular ceiling perfect for offices, shops, and clinics, allowing easy access for wiring and AC.",
  "artificial grass":
    "Artificial Grass — evergreen, low-maintenance turf perfect for balconies, terraces, and feature walls.",
}

function detectService(text: string): string | null {
  const t = text.toLowerCase()
  if (t.includes("pvc")) return SERVICE_KNOWLEDGE.pvc
  if (t.includes("gypsum") || t.includes("pop")) return SERVICE_KNOWLEDGE.gypsum
  if (t.includes("wpc")) return SERVICE_KNOWLEDGE.wpc
  if (t.includes("uv") || t.includes("marble")) return SERVICE_KNOWLEDGE["uv marble"]
  if (t.includes("grid")) return SERVICE_KNOWLEDGE.grid
  if (t.includes("grass") || t.includes("turf")) return SERVICE_KNOWLEDGE["artificial grass"]
  return null
}

function extractPhone(text: string): string | null {
  const digits = text.replace(/\D/g, "")
  const match = digits.match(/\d{10}/)
  return match ? match[0] : null
}

function extractName(text: string): string {
  const cleaned = text
    .replace(/\d+/g, "")
    .replace(/[^a-zA-Z\s]/g, " ")
    .replace(/\b(my|name|is|i|am|this|phone|number|mobile|contact)\b/gi, "")
    .trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  return parts.slice(0, 3).join(" ")
}

function botReply(input: string, lead: Lead | null): string {
  const t = input.toLowerCase()
  const service = detectService(t)
  if (service) return `${service}\n\nWe install this across ${SERVICE_AREAS.join(", ")}. Want a free quote?`
  if (t.includes("price") || t.includes("cost") || t.includes("rate") || t.includes("charge") || t.includes("budget"))
    return "Pricing is calculated per sq. ft. based on material quality. Please share your room dimensions, or tap WhatsApp to chat with our expert."
  if (t.includes("location") || t.includes("area") || t.includes("where") || t.includes("serve"))
    return `We proudly serve ${SERVICE_AREAS.join(", ")} and nearby regions.`
  if (t.includes("visit") || t.includes("book") || t.includes("appointment"))
    return `Great ${lead?.name || "there"}! Tap the "Book Site Visit" button below and our team will reach out shortly.`
  if (t.includes("hi") || t.includes("hello") || t.includes("hey"))
    return `Hi ${lead?.name || "there"}! Ask me about PVC, Gypsum, WPC, UV Marble, Grid Ceiling, or Artificial Grass.`
  return "I'm your JK Interior specialist. Ask about PVC, Gypsum, WPC, UV Marble, Grid Ceiling, or Artificial Grass — or request pricing."
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

  const send = () => {
    const text = input.trim()
    if (!text) return
    const userMsg: Message = { role: "user", text }
    setInput("")
    let reply: string
    if (!lead) {
      const phone = extractPhone(text)
      if (!phone) {
        reply = "Please share a valid 10-digit phone number along with your name so I can assist with services and pricing."
      } else {
        const name = extractName(text) || "Friend"
        const newLead: Lead = { name, phone }
        setLead(newLead)
        try {
          localStorage.setItem("jk_lead", JSON.stringify(newLead))
        } catch {}
        reply = `Thanks ${name}! You're all set. Ask me anything about PVC, Gypsum, WPC, UV Marble, Grid Ceiling or Artificial Grass. We serve ${SERVICE_AREAS.join(", ")}.`
      }
    } else {
      reply = botReply(text, lead)
    }
    setMessages((prev) => [...prev, userMsg, { role: "bot", text: reply }])
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
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 animate-in zoom-in-50 fade-in duration-500"
          style={{ backgroundColor: "#2563eb" }}
        >
          <IconChat className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl
                     bottom-[2.5%] right-[5%] left-[5%] h-[90vh]
                     md:left-auto md:bottom-5 md:right-5 md:h-[600px] md:w-[380px]
                     animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-300"
          style={{
            backgroundColor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(37,99,235,0.15)",
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white" style={{ backgroundColor: "#2563eb" }}>
            <div>
              <p className="text-sm font-semibold leading-tight">JK Interior Assistant</p>
              <p className="flex items-center gap-1 text-[11px] opacity-90">
                <IconPin className="h-3 w-3" /> Forbesganj • Araria • Purnia
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1 hover:bg-white/20">
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm shadow-sm ${
                    m.role === "user" ? "text-white rounded-br-sm" : "bg-white/90 text-gray-800 rounded-bl-sm border border-blue-100"
                  }`}
                  style={m.role === "user" ? { backgroundColor: "#2563eb" } : undefined}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-blue-100/60 bg-white/60 px-3 py-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#25D366] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90"
            >
              WhatsApp
            </a>
            {lead && (
              <a
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90"
                style={{ backgroundColor: "#2563eb" }}
              >
                <IconCal className="h-3.5 w-3.5" /> Book Site Visit
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-blue-100/60 bg-white/80 px-3 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={lead ? "Ask about services or pricing…" : "Your name & 10-digit phone"}
              className="flex-1 rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-sm outline-none focus:border-blue-400"
            />
            <button
              onClick={send}
              aria-label="Send"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm"
              style={{ backgroundColor: "#2563eb" }}
            >
              <IconSend className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

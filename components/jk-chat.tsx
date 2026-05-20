"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
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

// ── EXACT FAQ ANSWERS — Fixed Questions ka Fixed Answer ───────────────────────
const EXACT_FAQ_FIXED: Array<{ patterns: RegExp; answer: string }> = [
  {
    // Greetings — broad match
    patterns: /^(hi+|hello+|hey+|namaste|namaskar|helo|good\s*(morning|evening|afternoon|night)|hy|hii+|salam|kaise\s*ho|kya\s*haal|kya\s*chal|wassup|sup|haan\s*ji|ha\s*ji|ji\s*haan|ji)$/i,
    answer: `🌟 Namaste! JK Interior mein aapka swagat hai!\n\nMain Riya hoon — aapki interior design consultant 😊\n\nAap pooch sakte hain:\n✅ Kisi bhi material ki rate (PVC, Gypsum, WPC...)\n✅ Apne room ka estimate\n✅ Design ideas ya suggestions\n\nKya jaanna chahte hain? Batao!`,
  },
  {
    // Price list
    patterns: /\b(price\s*list|rate\s*list|sab\s*ka\s*rate|all\s*(?:material\s*)?rate|poori\s*list|full\s*list|sabhi\s*rate|saari\s*rate|complete\s*rate)\b/i,
    answer: `📋 **JK Interior – Complete Rate List**\n\n✨ Gypsum False Ceiling   ₹80 – ₹140 / sq.ft\n🏠 PVC False Ceiling     ₹60 – ₹120 / sq.ft\n🪵 WPC Wall Panels       ₹180 – ₹450 / sq.ft\n💎 UV Marble Sheets      ₹50 – ₹95 / sq.ft\n📺 Modular TV Unit       ₹15,000 – ₹60,000\n🏛️ Fluted Panels         ₹200 – ₹500 / sq.ft\n🏢 Grid Ceiling          ₹45 – ₹90 / sq.ft\n🍳 Modular Kitchen       ₹60,000 – ₹2,00,000\n🚪 Custom Wardrobe       ₹800 – ₹2,000 / sq.ft\n\n📞 Free site visit & exact quote: **+91 8651070831**`,
  },
  {
    // Warranty / guarantee
    patterns: /\b(warranty|guarantee|kitne\s*saal\s*(?:ki\s*)?(?:warranty|guarantee)|how\s*many\s*years|kitni\s*guarantee|kitni\s*warranty|long\s*lasting|toot\s*(?:jayega|jaaye|gaya)|टूट|खराब\s*(?:ho|hoga)|kharab)\b/i,
    answer: `🛡️ **JK Interior Warranty**\n\n✅ Gypsum Ceiling – **5 साल** की warranty\n✅ PVC Ceiling – **10 साल** की warranty\n✅ WPC Wall Panels – **7 साल** की warranty\n✅ UV Marble Sheets – **5 साल** की warranty\n✅ Modular TV Unit – **2 साल** की warranty\n\n🔧 Material defect pe free replacement milega\n📞 +91 8651070831`,
  },
  {
    // Installation time
    patterns: /(?:installation|install|kaam|lagan[ae]|fit\s*karn[ae]|lagwane)\s*(?:mein\s*)?(?:kitna|kab|time|din|waqt|samay)|(?:kitne\s*din\s*(?:mein\s*)?(?:hoga|lagega|complete|ban|taiyar))|(?:kab\s*(?:tak|milega|taiyar|complete|hoga))/i,
    answer: `⏱️ **Installation Time**\n\n✅ PVC Ceiling (1 room) – **1–2 दिन**\n✅ Gypsum Ceiling (1 room) – **2–4 दिन**\n✅ WPC Wall Panels – **2–3 दिन**\n✅ UV Marble Sheets – **1–2 दिन**\n✅ TV Unit (Modular) – **3–5 दिन**\n✅ Full Home Interior – **15–30 दिन**\n\n📞 Exact timeline ke liye: **+91 8651070831**`,
  },
  {
    // Contact
    patterns: /\b(?:(?:aapka|JK\s*interior\s*ka|company\s*ka|tumhara|apka)\s*)?(?:contact|phone\s*number|number\s*do|number\s*kya|helpline|customer\s*care|number\s*batao|call\s*karo|kaise\s*contact|kahan\s*mile|address)\b/i,
    answer: `📞 **JK Interior – Contact Us**\n\n📱 WhatsApp & Call: **+91 8651070831**\n🕐 Timing: **सोमवार–शनिवार, सुबह 9 बजे – रात 9 बजे**\n📍 Forbesganj, Araria, Bihar\n\n💬 WhatsApp pe message karo ya seedha call karo! 🙏`,
  },
  {
    // Site visit / free visit
    patterns: /\b(free\s*(?:site\s*)?visit|site\s*visit|free\s*consultation|ghar\s*(?:aa?o|aana)|visit\s*chahiye|measurement\s*(?:chahiye|karo|karna)|ghar\s*aake|aap\s*aao|koi\s*aaye|banda\s*bhejo|expert\s*bhejo)\b/i,
    answer: `📅 **Free Site Visit – 100% Free!**\n\n✅ Hamare expert aapke ghar aayenge\n✅ Room measure karenge\n✅ Best design suggest karenge\n✅ Exact quote on-the-spot milega\n✅ Koi hidden charge nahi!\n\n📞 Book karo: **+91 8651070831**\nYa "Book Visit" button dabao niche 👇`,
  },
  {
    // Waterproof / bathroom ceiling
    patterns: /\b(waterproof|(?:bathroom|kitchen|toilet|balcony)\s*(?:ke\s*liye\s*)?(?:ceiling|chhat|panel)|wet\s*area|(?:paani|baarish|nami|moisture|seepage|selan)\s*(?:se\s*)?(?:safe|resist|bachao|problem))\b/i,
    answer: `💧 **Waterproof Options**\n\n✅ **PVC Ceiling** – 100% waterproof, bathroom/kitchen ke liye best\n   Rate: ₹60–120 / sq.ft\n\n❌ Gypsum – waterproof NAHI hai, wet areas me avoid karo\n\n✅ **UV Marble Sheets** – bathroom walls ke liye perfect\n   Rate: ₹50–95 / sq.ft\n\nRoom ka size bata dijiye — turant estimate nikaalta hoon! 📐`,
  },
  {
    // Gypsum vs PVC comparison
    patterns: /\b(gypsum\s*vs\s*pvc|pvc\s*vs\s*gypsum|kaunsa\s*(?:better|behtar|acha|sahi|lena\s*chahiye)|(?:gypsum|pvc)\s*(?:mein\s*)?(?:kya\s*)?(?:difference|antar|fark|alag)|dono\s*mein|konsa\s*(?:lu|loon|lu\s*main|better))\b/i,
    answer: `⚖️ **Gypsum vs PVC – Full Comparison**\n\n| Feature | Gypsum | PVC |\n|---------|--------|-----|\n| Rate | ₹80–140 | ₹60–120 |\n| Look | Premium | Clean |\n| Waterproof | ❌ No | ✅ Yes |\n| Durability | 5 yr | 10 yr |\n| Best For | Hall/Bedroom | Kitchen/Bath |\n\n🏆 **Suggestion:** Hall me Gypsum + Kitchen/Bathroom me PVC — best combo!\n\n📞 Free consultation: **+91 8651070831**`,
  },
  {
  
    // Service areas
    patterns: /\b(?:konse|kahan[\s-]*kahan|kahan\s*(?:service|kaam|milega|tak|dete)|service\s*area|areas?\s*(?:cover|covered|mein)|kahan\s*kaam|which\s*cit(?:y|ies)|kahan\s*milega|kahan\s*tak|aate\s*ho|aate\s*hain|kaam\s*karte\s*ho|service\s*dete|kahan\s*dete)\b/i,
    answer: `📍 **JK Interior – Service Areas**\n\n✅ Forbesganj ✅ Araria ✅ Jogbani\n✅ Raniganj ✅ Narpatganj ✅ Kursakanta\n✅ Tribeniganj ✅ Chhatapur ✅ Supaul ✅ Purnia\n\nAur bhi nearby areas cover karte hain!\n📞 **+91 8651070831**`,
  },
  {
    // Payment
    patterns: /\b(?:payment|advance|payment\s*mode|upi|(?:cash|online)\s*payment|kitna\s*advance|deposit|paise\s*(?:kaise|kab)|bhaav|how\s*to\s*pay|pehle\s*paise|paisa\s*kab)\b/i,
    answer: `💳 **Payment Details**\n\n✅ UPI / PhonePe / GPay accepted\n✅ Cash payment bhi chalega\n✅ Site visit ke baad 30–50% advance\n✅ Kaam complete hone pe remaining payment\n✅ No full advance required!\n\n📞 Details ke liye: **+91 8651070831**`,
  },
  {
    // LED / lighting
    patterns: /\b(?:led|cove\s*light(?:ing)?|indirect\s*light(?:ing)?|led\s*strip|light\s*design|rgb\s*light|celing\s*light|ceiling\s*light|light\s*(?:chahiye|lagani|lagwana|rate|cost|kitna))\b/i,
    answer: `💡 **LED Lighting Options**\n\n✅ Cove Lighting (Gypsum ke saath) – ₹40–80 / running ft\n✅ LED Strip (RGB/White) – ₹30–60 / running ft\n✅ Spot Lights – ₹200–500 / piece\n✅ Backlit TV Panel – ₹800–2000\n\n✨ LED lighting se room ka look 3x premium ho jaata hai!\n\nRoom size bata dijiye — LED estimate bhi saath mein dunga 🙏`,
  },
  {
    // Quality / materials
    patterns: /\b(?:quality|acha\s*(?:material|maal)|genuine|original|local\s*nahi|brand(?:ed)?|trusted|reliable|jhooth\s*nahi|sach\s*mein|accha\s*kaam|guarantee\s*hai|bharosa)\b/i,
    answer: `✅ **JK Interior – Quality Assurance**\n\nHum sirf branded aur ISI-certified materials use karte hain:\n\n🏆 **Trusted Brands:** Armstrong, Saint-Gobain, Hunter Douglas\n🔧 **Professional Installation** – 5+ saal experienced team\n⭐ **500+ Happy Customers** in Araria & surroundings\n🛡️ Material warranty – 2 se 10 saal tak\n\nKisi bhi doubt ke liye free site visit arrange kar sakte hain!\n📞 +91 8651070831`,
  },
  {
    // Maintenance / cleaning
    patterns: /\b(?:maintenance|clean(?:ing)?|saaf|safai|dhona|dust|dhool|kitna\s*kharcha\s*(?:maintenance|repair)|repair|thik\s*karna|toot\s*gaya)\b/i,
    answer: `🧹 **Maintenance Guide**\n\n✅ **PVC Ceiling** – Sirf wet cloth se pocha lagao. Zero maintenance!\n✅ **Gypsum** – Dry soft cloth ya vacuum. Water se bachao.\n✅ **WPC Panels** – Damp cloth se saaf karo. Termite-proof!\n✅ **UV Marble** – Glass cleaner se shiny rakhna easy hai.\n\n💡 Sab materials long-lasting hain — agar professionally lagaaye jayein.\n📞 Koi problem ho toh call karo: **+91 8651070831**`,
  },
  {
    // Thank you
    patterns: /^(?:thanks?|shukriya|dhanyawad|shukriya\s*ji|bahut\s*shukriya|thank\s*you|thx|ty|ji\s*shukriya|acha\s*hai|great|nice|perfect|bahut\s*acha|bilkul\s*sahi|theek\s*hai|ok\s*ji|okay\s*ji)$/i,
    answer: `Khushi hui madad karke! 😊🙏\n\nKoi aur sawaal ho toh zaroor puchho — main hamesha yahan hoon.\n\n📞 Direct baat karni ho: **+91 8651070831**`,
  },
  {
    // Who are you / intro
    patterns: /^(?:kaun\s*ho|tum\s*kaun|aap\s*kaun|who\s*are\s*you|what\s*are\s*you|kya\s*ho\s*tum|bot\s*ho|ai\s*ho|real\s*ho|human\s*ho|riya\s*kaun)$/i,
    answer: `Main **Riya** hoon — JK Interior ki AI consultant! 🤖✨\n\nMain aapki help kar sakti hoon:\n✅ Room estimate nikalna\n✅ Material suggestions (PVC, Gypsum, WPC...)\n✅ Design ideas\n✅ Free site visit book karna\n\nKya jaanna chahte ho? Bato! 😊`,
  },
  {
    // Fluted panels
    patterns: /\b(?:fluted\s*panel|fluted\s*wall|fluted\s*design|fluted\s*rate|fluted\s*ceiling)\b/i,
    answer: `🏛️ **Fluted Panels**\n\nFluted panels ek premium decorative wall treatment hai!\n\n💰 Rate: ₹200 – ₹500 / sq.ft\n✅ Perfect for TV walls, living room accent walls\n✅ Modern & luxury look\n✅ Available in multiple wood finishes\n⏱️ Installation: 2–3 din\n\nWall size bataiye — exact estimate nikaalte hain! 📐`,
  },
  {
    // Grid ceiling
    patterns: /\b(?:grid\s*ceiling|grid\s*tile|office\s*ceiling|false\s*grid|mineral\s*fiber|grid\s*ka\s*rate)\b/i,
    answer: `🏢 **Grid Ceiling (Office/Commercial)**\n\n💰 Rate: ₹45 – ₹90 / sq.ft\n✅ Best for offices, shops, showrooms\n✅ Easy maintenance — tiles replace karna easy\n✅ Fire resistant options available\n⏱️ Installation: 1–2 din per room\n\nArea size batao — estimate nikaalta hoon! 📐`,
  },
{
    // Office location / address
    patterns: /\b(?:office\s*(?:kahan|kaha|hai|address|location)|location\s*(?:kya|kahan|batao|hai)|aapka\s*(?:office|address|location|ghar|showroom)|showroom\s*(?:kahan|hai)|kahan\s*(?:ho|hain|hai)\s*aap|address\s*(?:kya|batao|do|chahiye))\b/i,
    answer: `📍 **JK Interior – Office Location**\n\n🏢 Forbesganj, Araria District, Bihar\n\n✅ Hum ghar aake FREE site visit karte hain\n✅ Aapko office aane ki zaroorat nahi!\n\n📞 Call/WhatsApp: **+91 8651070831**\n🕐 Timing: Mon–Sat, 9 AM – 9 PM`,
  },
]

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

// ── EXACT FAQ MATCHER ─────────────────────────────────────────────────────────
function matchExactFAQ(text: string): string | null {
  for (const faq of EXACT_FAQ_FIXED) {
    if (faq.patterns.test(text)) return faq.answer
  }
  return null
    }

// ─── DIMENSIONS ENGINE ────────────────────────────────────────────────────────
function extractDimensions(text: string): { length: number; width: number; rawMatch: string } | null {
  const t = text.toLowerCase()

  // ❌ Time/date patterns को IGNORE करें — यही main bug था
  const IGNORE_PATTERNS = [
    /\d+\s*(?:baj[eo]?|am\b|pm\b)/i,         // "12 baje", "10 am"
    /\d+\s*(?:din|day|week|month|saal|year)/i, // "10 din mein"
    /\d+\s*(?:january|february|march|april|may|june|july|august|september|october|november|december)/i,
    /(?:subah|sham|raat|dopahar)\s*\d+/i,      // "subah 10"
    /\d+\s*(?:ghante|hour|minute|second)/i,     // "2 ghante"
    /(?:call|phone|number|contact)\s*\d+/i,     // phone numbers
    /\d{10,}/,                                  // 10+ digit numbers = phone
    /\b(?:ek|do|teen|char|paanch)\s+(?:din|week|month)\b/i, // "teen din"
  ]

  for (const pattern of IGNORE_PATTERNS) {
    if (pattern.test(t)) return null
  }

  // ✅ Dimension patterns — सिर्फ clear size indicators
  const patterns = [
    // "12x10", "12×10", "12*10" — most common
    /(\d+(?:\.\d+)?)\s*[x×*]\s*(\d+(?:\.\d+)?)\s*(?:feet|ft|foot|फ़ीट|sqft)?/i,
   /(\d+(?:\.\d+)?)\s+[x×*]\s*(\d+(?:\.\d+)?)\s*(?:feet|ft|foot|फ़ीट|sqft)?/i,
    // "12 by 10 feet"
    /(\d+(?:\.\d+)?)\s*(?:feet|ft|foot)?\s*by\s*(\d+(?:\.\d+)?)\s*(?:feet|ft|foot)?/i,
    // "length 12 width 10" / "12 feet length 10 feet width"
    /(\d+(?:\.\d+)?)\s*(?:feet|ft)?\s*(?:length|lg|len|lambai|लंबाई)[^\d]{0,10}(\d+(?:\.\d+)?)/i,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      let l = parseFloat(match[1])
      let w = parseFloat(match[2])

      // Sanity check — realistic room sizes only (5ft to 100ft)
      if (isNaN(l) || isNaN(w) || l < 5 || w < 5 || l > 100 || w > 100) continue
      
      // अगर एक ही number repeat हो (जैसे 10x10 ok है, but 99x99 suspicious)
      if (l > 60 && w > 60) continue

      if (l < w) [l, w] = [w, l]
      return { length: l, width: w, rawMatch: match[0] }
    }
  }
  return null
        }

function getPremiumAdvice(area: number, materialType: string): string {
  if (area > 250) return "Itne bade area ke liye cove lighting design best rahega — Gypsum ya WPC ke saath ekdum premium look aayega!"
  if (area > 150) return "Achha size hai! Perimeter pe LED strip lagane se modern aur high-end look milega."
  if (materialType.includes("WPC")) return "WPC panels TV wall ya bedroom ke liye perfect — rich wooden texture deta hai."
  if (materialType.includes("PVC")) return "PVC waterproof hai — kitchen ya balcony ke liye ideal, zero maintenance."
  return "Subtle indirect lighting se room ka look aur bhi premium ho jaayega!"
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
  
  return `${greeting}aapke **${length}' × ${width}'** room (${area} sq.ft) ka estimate:\n\n💰 Rate: ${priceRange}\n📐 Total kharcha: **₹${estimatedTotalLow.toLocaleString()} – ₹${estimatedTotalHigh.toLocaleString()}**\n\n✨ ${advice}\n\n📅 Free site visit ke liye "Book Visit" bolein ya apna naam batao! 😊`  
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
  const std = text.match(/Standard[^:\n]*:\s*(₹[\d,]+ – ₹[\d,]+)/)
  if (std) return std[1]
  const rng = text.match(/(₹[\d,]+ – ₹[\d,]+)/)
  return rng ? rng[1] : null
}

const LEAD_INTENT_RE = /\b(site\s*visit|book\s*(?:visit|karo|karein)|karwana\s*(?:hai|h\b)|visit\s*chahiye|free\s*visit|milna\s*chahta|milna\s*chahti|baat\s*karni\s*hai|sampark\s*karo|visit\s*book|appointment|bulao\s*(?:ji|please)?|aao\s*(?:zara|ji|please)?|booking\s*karni|visit\s*chahiye|aana\s*hai|visit\s*confirm)\b/i

// ── AI API call ────────────────────────────────────────────────────────────────
async function getAIReply(
  message: string,
  history: ConvMsg[],
  lead: Partial<Lead> | null,
  sessionId: string,
  memory?: ConversationMemory,
  onChunk?: (partial: string, isFirst: boolean) => void,
  extras?: { roomSize?: string | null; lastTopic?: string | null; messagesExchanged?: number },
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
  lastQuestionAsked: extras?.lastTopic || null,
  conversationStage: (extras?.messagesExchanged ?? 0) > 6 ? "consultation" : (extras?.messagesExchanged ?? 0) > 2 ? "discovery" : "greeting",
},
      }),
      signal: AbortSignal.timeout(12000),
    })
    if (!res.ok) return null
    const contentType = res.headers.get("content-type") || ""

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
      return fullText ? { reply: fullText, source: "groq" } : null
    }

    const data = await res.json()
    if (!data.ok || !data.reply) return null
    return {
      reply: data.reply as string,
      source: (data.source as "groq" | "local") ?? "groq",
      updatedContext: data.updatedContext ?? undefined,
    }
  } catch {
    return null
  }
}

// ── Local fallback ─────────────────────────────────────────────────────────────
function localFallback(input: string, lead: Partial<Lead> | null): string {
  const t  = input.toLowerCase().trim()
  const nm = lead?.name || ""
  const oh = isOffHours()

  // ── EXACT FAQ CHECK FIRST ─────────────────────────────────────────────────
  const exactAnswer = matchExactFAQ(input)
  if (exactAnswer) return exactAnswer

  // ── Thank you / positive reactions ────────────────────────────────────────
  if (has(t, ["thank","shukriya","dhanyawad","thanks","thx","great","perfect","bahut acha","bahut accha","wah","wow","zabardast","mast"])) {
    return `Khushi hui madad karke${nm ? ", " + nm : ""}! 😊🙏\n\nKoi aur sawaal ho toh batao — main hamesha yahan hoon.\n📞 +91 8651070831`
  }

  // ── Material: Gypsum ──────────────────────────────────────────────────────
  if (t.includes("gypsum") || (t.includes("pop ") && !t.includes("popular")) || t.includes("plaster of paris")) {
    const m = MATERIAL_KNOWLEDGE.gypsum
    const isWaterQ = has(t, ["paani","water","bathroom","nami","moisture","geela","baarish","toilet"])
    if (isWaterQ) return `Gypsum ceiling bathroom/kitchen ke liye suitable **nahi** hai — paani se kharab ho jaati hai.\n\nBathroom ke liye **PVC Ceiling** best hai:\n✅ 100% waterproof\n💰 ₹60–120 / sq.ft\n⏱️ 1–2 din installation\n\nRoom size bataiye — estimate nikaalta hoon! 📐`
    const rateQ = has(t, ["rate","price","cost","kitna","daam","kimat","kharcha"])
    if (rateQ) return `✨ **Gypsum False Ceiling Rate**\n\n💰 Standard: ₹80–100 / sq.ft\n💎 Premium (cove design): ₹100–140 / sq.ft\n\n✅ Best for hall, bedroom, drawing room\n✅ LED cove lighting ke saath bahut sundar lagta hai\n🛡️ 5 saal warranty\n\nRoom ka size batao — exact total cost nikaalta hoon! 📐`
    return `✨ **Gypsum False Ceiling** – ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n❌ Avoid in: ${m.avoidIn}\n⏱️ Install: ${m.installTime}\n🛡️ ${m.warranty}\n\nRoom size bhejo (jaise 12×14) — estimate turant nikalti hoon!`
  }

  // ── Material: PVC ─────────────────────────────────────────────────────────
  if (t.includes("pvc")) {
    const m = MATERIAL_KNOWLEDGE.pvc
    const rateQ = has(t, ["rate","price","cost","kitna","daam","kimat","kharcha"])
    if (rateQ) return `🏠 **PVC Ceiling Rate**\n\n💰 Standard: ₹60–90 / sq.ft\n💎 Premium: ₹90–120 / sq.ft\n\n✅ 100% waterproof — bathroom & kitchen ke liye best\n✅ Low maintenance\n🛡️ 10 saal warranty\n\nRoom ka size batao — exact total nikaalta hoon! 📐`
    return `🏠 **PVC False Ceiling** – ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n⏱️ Install: ${m.installTime}\n🛡️ ${m.warranty}\n\nDimensions bhejo jaise 12×10 — total cost instantly nikalega!`
  }

  // ── Material: WPC ─────────────────────────────────────────────────────────
  if (t.includes("wpc") || t.includes("wood panel") || t.includes("wooden panel") || t.includes("louver")) {
    const m = MATERIAL_KNOWLEDGE.wpc
    const rateQ = has(t, ["rate","price","cost","kitna","daam","kimat","kharcha"])
    if (rateQ) return `🪵 **WPC Wall Panel Rate**\n\n💰 Standard: ₹180–300 / sq.ft\n💎 Premium: ₹300–450 / sq.ft\n\n✅ Waterproof & termite-proof\n✅ TV wall, bedroom accent wall ke liye best\n🛡️ 7 saal warranty\n\nWall size batao — exact quote nikaalta hoon! 📐`
    return `🪵 **WPC Wall Panels** – ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n⏱️ Install: ${m.installTime}\n🛡️ ${m.warranty}\n\nAccent wall ya TV background ke liye perfect! Dimensions chahiye?`
  }

  // ── Material: UV Marble ───────────────────────────────────────────────────
  if (t.includes("uv ") || t.includes("uv marble") || (t.includes("marble") && !t.includes("natural marble"))) {
    const m = MATERIAL_KNOWLEDGE.uv
    const rateQ = has(t, ["rate","price","cost","kitna","daam","kimat","kharcha"])
    if (rateQ) return `💎 **UV Marble Sheet Rate**\n\n💰 Standard: ₹50–70 / sq.ft\n💎 Premium: ₹70–95 / sq.ft\n\n✅ Bathroom walls, kitchen backsplash ke liye best\n✅ Glossy finish, easy cleaning\n🛡️ 5 saal warranty\n\nArea size batao — estimate nikalte hain! 📐`
    return `💎 **UV Marble Sheets** – ${m.price}\n\n${m.description}\n\n✅ Best for: ${m.bestFor}\n❌ Avoid: ${m.avoidIn}\n⏱️ Install: ${m.installTime}\n🛡️ ${m.warranty}`
  }

  // ── TV Unit ───────────────────────────────────────────────────────────────
  if (t.includes("tv unit") || t.includes("tv panel") || t.includes("tv wall") || t.includes("tv cabinet") || /\btv\b/.test(t)) {
    const m = MATERIAL_KNOWLEDGE.tvunit
    return `📺 **Modular TV Unit** – ${m.price}\n\nCustom designs available!\n📐 Size ke hisaab se price:\n• 6–8 ft: ${m.sizes.small}\n• 8–10 ft: ${m.sizes.medium}\n• 10–14 ft: ${m.sizes.large}\n\n✅ LED backlight, WPC ya laminate finish\n✅ Storage with shutters bhi available\n\nTV unit ka size batao — exact quote nikaalta hoon!`
  }

  // ── Modular Kitchen ───────────────────────────────────────────────────────
  if (/\bmodular\s*kitchen\b|\bkitchen\s*(?:cabinet|design|renovation|banana|banwana|rate|cost)\b/.test(t)) {
    return `🍳 **Modular Kitchen** – ₹60,000 – ₹2,00,000\n\nFully custom — L-shape, U-shape, straight layouts available.\n✅ Soft-close hinges, pull-out shelves\n✅ Laminates, acrylic, glass shutters\n✅ Chimney & hob fitting bhi karein\n\nKitchen ka size share karo — detailed quote nikalte hain!`
  }

  // ── Wardrobe ──────────────────────────────────────────────────────────────
  if (/\bwardrobe\b|\bwardrop\b|\balmirah\b|\bcupboard\b|\balmari\b|\bkapdon\s*ki\s*cabinet\b/.test(t)) {
    return `🚪 **Custom Wardrobe** – ₹800–₹2,000/sq.ft\n\nFloor-to-ceiling storage — sliding ya hinged doors.\n✅ LED inside option\n✅ Custom shelves & drawers\n✅ Mirror shutters available\n\nBedroom size aur wardrobe dimensions share karo!`
  }
// ── Office / location query ───────────────────────────────────────────────
  if (has(t, ["office","location","address","showroom","kahan ho","kahan hain","ghar kahan","office kahan"])) {
    return `📍 **JK Interior – Location**\n\nHumara office **Forbesganj, Araria, Bihar** mein hai.\n\n✅ Lekin hum aapke **ghar aake FREE site visit** karte hain — aapko aane ki zaroorat nahi!\n\n📞 **+91 8651070831**`
  }
 
  // ── Services list query ───────────────────────────────────────────────────
  if (has(t, ["kya kya service","kya service","kaun kaun si service","services kya","kya kya kaam","kya kya milega","kaun si service","services list","aap kya kya","kya kya hai","kya kya karte"])) {
    return `🏠 **JK Interior – Hamari Services**\n\n✨ Gypsum False Ceiling\n🏠 PVC False Ceiling\n🪵 WPC Wall Panels\n💎 UV Marble Sheets\n📺 Modular TV Unit\n🏛️ Fluted Panels\n🏢 Grid Ceiling (Office)\n🍳 Modular Kitchen\n🚪 Custom Wardrobe\n💡 LED Cove Lighting\n\nKisi bhi service ka rate ya estimate chahiye? Bas batao! 😊\n📞 +91 8651070831`
  }

  // ── Budget queries ────────────────────────────────────────────────────────
  if (/(?:lakh|lac\b|hazar|hajar)/.test(t) && /(?:mein|budget|kya|hoga|milega|ho\s*sakta|kaafi)/.test(t)) {
    const budgetAmt = extractBudgetAmount(t)
    if (budgetAmt) {
      const num = parseFloat(budgetAmt.replace(/[₹k,]/g, "")) * (budgetAmt.includes("k") ? 1000 : 1)
      if (num < 30000) return `${budgetAmt} budget mein 1 room ki PVC ceiling aaram se ho jaayegi (₹60–120/sq.ft).\n\nRoom ka size batao!`
      if (num < 80000) return `${budgetAmt} mein 1–2 rooms ka ceiling kaam ho jaayega.\n\nBest combo: Gypsum (hall) + PVC (kitchen/bathroom)\n\nRooms batao — estimate nikalte hain!`
      if (num < 150000) return `${budgetAmt} mein 2BHK ki full ceiling + 1 WPC accent wall ho sakti hai.\n\nRooms ki details share karo!`
      return `${budgetAmt} budget ke saath premium 2BHK interior possible hai:\n✅ Gypsum cove lighting\n✅ WPC TV wall\n✅ UV marble bathroom\n\nFree site visit book karein: **+91 8651070831**`
    }
  }

  // ── Price/rate general query ──────────────────────────────────────────────
  if (has(t, ["price","cost","rate","kimat","daam","kitna","kharcha","budget","quote","paisa","rupaye","rupees"])) {
    // If a specific service is in context, give that price
    if (lead?.service) {
      const svcL = lead.service.toLowerCase()
      if (svcL.includes("pvc")) return `🏠 **PVC Ceiling Rate: ₹60–120 / sq.ft**\n\nRoom ka size bataiye — exact total nikalte hain! (jaise 12×14)`
      if (svcL.includes("gypsum")) return `✨ **Gypsum Ceiling Rate: ₹80–140 / sq.ft**\n\nRoom ka size bataiye — exact total nikalte hain! (jaise 12×14)`
      if (svcL.includes("wpc")) return `🪵 **WPC Panel Rate: ₹180–450 / sq.ft**\n\nWall size bataiye — exact estimate nikalte hain!`
    }
    return `💰 **JK Interior – Rate List**\n\n✨ Gypsum Ceiling    ₹80–₹140 / sq.ft\n🏠 PVC Ceiling       ₹60–₹120 / sq.ft\n🪵 WPC Wall Panels   ₹180–₹450 / sq.ft\n💎 UV Marble Sheets  ₹50–₹95 / sq.ft\n📺 Modular TV Unit   ₹15,000+\n🏛️ Fluted Panels     ₹200–₹500 / sq.ft\n🍳 Modular Kitchen   ₹60,000+\n🚪 Custom Wardrobe   ₹800/sq.ft+\n\nKisi specific cheez ka rate chahiye? Ya room size batao — exact estimate nikalte hain!`
  }

  // ── Visit / booking ───────────────────────────────────────────────────────
  if (has(t, ["visit","book","site visit","measurement","quotation","bulao","aao","free visit","aana","aaye","bhejo"])) {
    if (lead?.phone) {
      return `📅 **Free Site Visit booked!**\n\n✅ Hamare expert jald aapke ghar aayenge.\n📞 +91 8651070831`
    }
    return `📅 **Free Site Visit** – Koi hidden charge nahi!\n\nBook karne ke liye aapka naam batao 😊`
        }

  // ── City mentioned ────────────────────────────────────────────────────────
  const cityMentioned = detectCity(t)
  if (cityMentioned) {
    const svc = lead?.service?.toLowerCase() || ""
    if (has(t, ["pvc"]) || svc.includes("pvc")) {
      return `✅ ${cityMentioned} mein PVC ceiling ka kaam hota hai! 💪\n\n💰 Rate: ₹60–120 / sq.ft | Waterproof ✅\n\nRoom size bataiye — exact estimate nikalte hain 📐`
    }
    if (has(t, ["gypsum","false ceiling"]) || svc.includes("gypsum")) {
      return `✅ ${cityMentioned} mein Gypsum false ceiling available hai! ✨\n\n💰 Rate: ₹80–140 / sq.ft | Premium look ✅\n\nRoom size bataiye — exact estimate nikalte hain 📐`
    }
    if (has(t, ["wpc","wall panel"]) || svc.includes("wpc")) {
      return `✅ ${cityMentioned} mein WPC wall panels available hain! 🪵\n\n💰 Rate: ₹180–450 / sq.ft | Waterproof ✅\n\nWall size bataiye — exact estimate nikalte hain 📐`
    }
    if (lead?.service) {
      return `✅ ${cityMentioned} mein **${lead.service}** ka kaam hota hai! 💪\n\nRoom ka size bataiye — exact estimate nikalte hain! 📐\n📞 +91 8651070831`
    }
    return `✅ ${cityMentioned} mein JK Interior ki services available hain! 💪\n\n🏠 PVC | ✨ Gypsum | 🪵 WPC | 💎 UV Marble | 📺 TV Unit\n\n📞 Free site visit: **+91 8651070831**`
  }

  // ── "Haan/ha/okay" short affirmative replies ─────────────────────────────
  if (/^(haan|ha|ok|okay|theek|theek\s*hai|bilkul|zaroor|sure|yes|yep|hmm|accha|acha)$/i.test(t)) {
    if (lead?.service) return `Bilkul! ${lead.service} ke baare mein kya jaanna chahte hain?\n\n✅ Rate chahiye?\n✅ Room size estimate?\n✅ Free site visit book karni hai?`
    return `Batao — main aapki help ke liye yahan hoon! 😊\n\nKya jaanna chahte hain:\n✅ Kisi material ka rate\n✅ Room estimate\n✅ Design ideas`
  }

  // ── "Nahi/no" short rejection ─────────────────────────────────────────────
  if (/^(nahi|nahi\s*ji|nope|no|na|nope|nahin)$/i.test(t)) {
    return `Koi baat nahi! 😊 Kuch aur poochna ho toh batao.\n\nMain yahan hoon — gypsum, PVC, WPC, pricing, ya koi bhi sawaal! 🙏`
  }

  // ── Design / ideas / color / trends queries ───────────────────────────────
  if (has(t, ["design","idea","color","colour","rang","trend","2025","2026","latest","modern","style","look","beautiful","sundar","khubsurat"])) {
    return `🎨 **2025–26 Interior Trends**\n\n✅ **Fluted/Louver panels** — TV wall pe most popular\n✅ **Cove lighting** (Gypsum ceiling + LED strip)\n✅ **WPC wooden finish** — bedroom accent walls\n✅ **UV marble** — bathroom statement walls\n✅ **Earth tones** — beige, terracotta, sage green\n\nKaunse room ke liye design chahiye? Hall, bedroom, bathroom?\n\n📞 Free consultation: **+91 8651070831**`
  }

  // ── Comparison queries ────────────────────────────────────────────────────
  if (/(?:better|behtar|acha|sahi|difference|fark|antar|vs|versus|ya)/.test(t) && /(?:gypsum|pvc|wpc|uv|marble|ceiling|panel)/.test(t)) {
    return `⚖️ Quick comparison:\n\n🏆 **Hall/Drawing Room** → Gypsum (premium look, LED cove)\n🏆 **Kitchen/Bathroom** → PVC (100% waterproof)\n🏆 **TV Wall/Bedroom** → WPC panels (woody luxury feel)\n🏆 **Bathroom walls** → UV Marble sheets\n\nKaunse room ke liye soch rahe hain? Main exact suggestion dunga! 😊`
  }

  // ── Estimation without dimensions — ask for size ─────────────────────────
  if (has(t, ["estimate","quotation","quote","total","kitna aayega","kitna lagega","total cost","kitne ka","kitna hoga"])) {
    const svcName = lead?.service || "ceiling/interior"
    return `📐 **${nm ? nm + " ji, aapke " : "Aapke "}${svcName} ka estimate nikaalte hain!**\n\nBas room ka size batao:\n\nJaise: **12×14** ya **15 feet by 12 feet**\n\nMain turant calculate kar dunga! ✨`
  }


  // ── Smart contextual fallback — sirf tab jab koi keyword match na ho ─────
  const prevTopic = lead?.service
  const isGeneralQuery = has(t, ["service","kya","kaun","kya kya","batao","bolo","list","sab","poori"])
  if (prevTopic && !isGeneralQuery) {
    return `${nm ? nm + " ji, " : ""}**${prevTopic}** ke baare mein aur kuch jaanna chahte hain?\n\n✅ Rate chahiye?\n✅ Room ka estimate?\n✅ Free site visit book karni hai?\n\nBas batao! 😊`
        }

  // ── True last resort — helpful, not pushy ────────────────────────────────
  return `Aapka sawaal samajh nahi aaya — thoda aur clearly batao! 😊\n\nMain in topics mein help kar sakta hoon:\n✅ Ceiling rates (PVC / Gypsum)\n✅ Wall panels (WPC / Fluted / UV Marble)\n✅ TV unit / Kitchen / Wardrobe\n✅ Room size estimate\n\nKya jaanna hai? 🙏`
}

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

// ── Icons ──────────────────────────────────────────────────────────────────────
const IChatBubble = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>)
const IClose = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-[18px] w-[18px]"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>)
const ISend = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>)
const IWA = () => (<svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.054 23.447a.5.5 0 00.611.61l5.7-1.461A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>)
const ICal = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>)
const IPhone = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2.74h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.34a16 16 0 0 0 6.06 6.06l1.66-1.66a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>)
const ISparkle = () => (<svg viewBox="0 0 24 24" className="h-3 w-3 fill-current"><path d="M12 2l1.8 5.4L19.2 6l-4.2 3.6L16.8 15 12 11.4 7.2 15l1.8-5.4L4.8 6l5.4 1.4z"/></svg>)

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
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-bl-sm overflow-hidden border border-emerald-200 shadow-lg bg-white">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-2">
        <span className="text-lg shrink-0">🎉</span>
        <div className="min-w-0"><p className="text-[11px] md:text-xs font-bold text-white leading-tight">Booking Confirmed!</p><p className="text-[9px] md:text-[10px] text-white/70">{ts}</p></div>
      </div>
      <div className="px-3 md:px-4 py-2 md:py-2.5 space-y-1.5">
        {rows.map(r => (<div key={r.label} className="flex items-start gap-2 text-[11px] md:text-xs"><span className="text-gray-400 shrink-0 w-16 md:w-20 text-[10px] md:text-[11px] font-medium">{r.label}</span><span className="font-semibold break-all text-[11px] md:text-[12px] text-gray-800 flex-1">{r.value}</span></div>))}
      </div>
      <div className="px-3 md:px-4 pb-3 md:pb-3.5 pt-1 md:pt-1.5 space-y-2">
        <p className="text-[10px] md:text-[11px] text-emerald-700 font-semibold text-center bg-emerald-50 rounded-lg py-1.5">✅ Our team will contact you shortly!</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2 md:py-2.5 text-[10px] md:text-[11px] font-bold text-white hover:opacity-90 transition-all"><IWA /> WhatsApp</a>
          <a href={bookHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2 md:py-2.5 text-[10px] md:text-[11px] font-bold text-white hover:bg-emerald-500 transition-all"><ICal /> Book Visit</a>
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
// NOTE: The large WhatsApp and Call buttons visible below the chat are rendered
// in the PARENT PAGE (not here). Remove them from your page layout/component.
// Example: Delete any <a href="https://wa.me/..."> and <a href="tel:..."> buttons
// that appear outside this JKChat component in your page JSX.
export default function JKChat() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [messages, setMsgs] = useState<Message[]>([WELCOME_MSG])
  const [input, setInput] = useState("")
  const [lead, setLead] = useState<Partial<Lead> | null>(null)
  const [lastTopic, setLastTopic] = useState<string | null>(null)
  const [roomSize, setRoomSize] = useState<string | null>(null)
  const [typing, setTyping] = useState(false)
  const [aiMode, setAiMode] = useState(true)
  const [offHours, setOffHours] = useState(false)
  const [memory, setMemory] = useState<ConversationMemory>(createMemory)
  const memoryRef = useRef<ConversationMemory>(memory)

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
  const [collectStep, setCollectStep] = useState<null | "name" | "phone" | "city" | "time">(null)
  const [pendingEstimate, setPendingEstimate] = useState<string | null>(null)

  useEffect(() => { memoryRef.current = memory }, [memory])

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

  useEffect(() => {
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback
    if (ric) {
      ric(() => setMounted(true), { timeout: 2000 })
    } else {
      const t = setTimeout(() => setMounted(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  useEffect(() => { setOffHours(isOffHours()) }, [])
  useEffect(() => { document.body[open ? "setAttribute" : "removeAttribute"]("data-chat-open", "1") }, [open])

  useEffect(() => {
    const savedMem = loadMemory()
    memoryRef.current = savedMem
    setMemory(savedMem)
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
    requestAnimationFrame(() => el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }))
  }, [messages, typing, open])
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 350) }, [open])

  const persist = (l: Partial<Lead> | null, tp: string | null) => {
    try { localStorage.setItem("jk_chat_v5", JSON.stringify({ lead: l, topic: tp })) } catch {}
  }


  // Core send
  const send = useCallback(async (override?: string) => {
    const text = (override ?? input).trim()
    if (!text || typing || sendLock.current) return

    // ✅ Service हर message में detect करके तुरंत save करो
    const detectedSvc = detectService(text.toLowerCase())
    if (detectedSvc) {
      setLead(prev => {
        const updated = { ...(prev || {}), service: detectedSvc }
        persist(updated, detectedSvc.toLowerCase().replace(/\s+/g, "-"))
        return updated
      })
      setLastTopic(detectedSvc.toLowerCase().replace(/\s+/g, "-"))
    }

    // Stop listening if voice was active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }

    sendLock.current = true
    setInput("")
    setMsgs(prev => [...prev, mk("user", text)].slice(-100))
    setTyping(true)

    historyRef.current = [...historyRef.current, { role: "user", content: text }]

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

    const dims = extractDimensions(text)
    const serviceFromMsg = detectService(text.toLowerCase())
    const currentService = serviceFromMsg || lead?.service || null

    
    // ✅ Service save
if (serviceFromMsg && !lead?.service) {
  const updLead = { ...(lead || {}), service: serviceFromMsg }
  setLead(updLead)
  persist(updLead, serviceFromMsg.toLowerCase().replace(/\s+/g, "-"))
}

// ✅ Dimensions मिले तो हमेशा estimate nikalo — collectStep ignore karo
if (dims) {
  setCollectStep(null)
  await delay(400)
  const estimateReply = generateEstimateFromDimensions(dims.length, dims.width, currentService, lead?.name)
  const estSummary = extractEstimateSummary(estimateReply)
  if (estSummary) setPendingEstimate(estSummary)
  historyRef.current = [...historyRef.current, { role: "assistant", content: estimateReply }]
  setMsgs(prev => [...prev, mk("bot", estimateReply)])
  const newRoomSize = `${dims.length}x${dims.width}`
  setRoomSize(newRoomSize)
  const svcSlug = currentService ? currentService.toLowerCase().replace(/\s+/g, "-") : lastTopic
  if (svcSlug) setLastTopic(svcSlug)
  const newLead = { ...(lead || {}), ...(currentService && !lead?.service ? { service: currentService } : {}) }
  setLead(newLead)
  persist(newLead, svcSlug)
  setTyping(false)
  sendLock.current = false
  return
    }

// ✅ CollectStep block — बिल्कुल अलग, ऊपर वाले से जुड़ा नहीं
if (collectStep) {
  let collReply = ""
const tLower = text.toLowerCase()
  if (collectStep === "name") {
    const extractedName = tryExtractName(text)
    const name = extractedName || text.trim()
    if (!name || name.length < 2) {
      collReply = `Aapka naam sahi se nahi mila. Kripya sirf apna naam likho (jaise: Rahul, Priya) 😊`
    } else {
      const updated = { ...(lead || {}), name }
      setLead(updated); persist(updated, lastTopic)
      setCollectStep("phone")
      collReply = `${name} ji, aapka WhatsApp number share karein please 📱`
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
    storeAdminLead(finalLead, pendingEstimate || undefined, preferredTime, historyRef.current)
    const card: LeadCard = {
      ...finalLead,
      estimate:      pendingEstimate || undefined,
      preferredTime,
      timestamp:     new Date().toISOString(),
    }
    historyRef.current = [...historyRef.current, { role: "assistant", content: "Booking confirmed! Team will contact you shortly." }]
    setMsgs(prev => [...prev, mk("bot", "lead_card", "card", card)])
    setTyping(false)
    sendLock.current = false
    return
  }

  // phone/city steps का shared footer
  historyRef.current = [...historyRef.current, { role: "assistant", content: collReply }]
  setMsgs(prev => [...prev, mk("bot", collReply)])
  setTyping(false)
  sendLock.current = false
  return
} // ← यह बंद करता है if (collectStep) को

    const svc = detectService(text.toLowerCase())
    const city = detectCity(text.toLowerCase())
    const extractedPhone = tryExtractPhone(text)
    let updatedLead = lead ? { ...lead } : null
    if (extractedPhone && !lead?.phone) {
      const extractedName = tryExtractName(text)
      updatedLead = { ...(lead || {}), phone: extractedPhone, name: extractedName || lead?.name || "Friend", city: city || lead?.city, service: svc || lead?.service }
      setLead(updatedLead)
      storeAdminLead(updatedLead as Lead, pendingEstimate || undefined, undefined, historyRef.current)
    } else if (city && !lead?.city) { updatedLead = { ...(lead || {}), city }; setLead(updatedLead) }
    else if (svc && !lead?.service) { updatedLead = { ...(lead || {}), service: svc }; setLead(updatedLead) }

    let reply: string | null = null
    let wasStreamed = false

    if (aiMode) {
      const aiResult = await getAIReply(
        text,
        historyRef.current,
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
        { roomSize, lastTopic, messagesExchanged: historyRef.current.length },
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
      reply = localFallback(text, updatedLead)
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
      let next: Message[]
      if (wasStreamed && finalStreamId !== null) {
        next = prev.map(m => m.id === finalStreamId ? { ...m, text: reply! } : m)
      } else {
        const botMessage = mk("bot", reply as string) as any

        const userWantsPhoto = /photo|photos|image|images|gallery|dikhao|dekh|show|design\s+dekh|kaam\s+dekh/i.test(text)
        if (userWantsPhoto) {
          const ut = text.toLowerCase()
          let cat: string | undefined
          if (/gypsum|pop\b|false\s*ceil/.test(ut))                      cat = "Gypsum False Ceiling"
          else if (/\bpvc\b/.test(ut))                                    cat = "PVC Ceiling"
          else if (/wpc|wall\s*panel|fluted|uv\s*marble|louver/.test(ut)) cat = "WPC fluted panels & uv marble Sheet"
          else if (/grid|mineral|office\s*ceil/.test(ut))                 cat = "Grid Ceiling"
          else if (/tv\s*unit|tv\s*cabinet|television|\btv\b/.test(ut))   cat = "TV Unit Design"
          else if (/grass|turf|garden/.test(ut))                         cat = "Artificial Grass"
          else if (lastTopic?.includes("gypsum"))  cat = "Gypsum False Ceiling"
          else if (lastTopic?.includes("pvc"))     cat = "PVC Ceiling"
          else if (lastTopic?.includes("wpc") || lastTopic?.includes("wall")) cat = "WPC fluted panels & uv marble Sheet"
          else if (lastTopic?.includes("grid"))    cat = "Grid Ceiling"
          else if (lastTopic?.includes("tv"))      cat = "TV Unit Design"
          else if (lastTopic?.includes("grass"))   cat = "Artificial Grass"
          else if (updatedLead?.service?.toLowerCase().includes("gypsum")) cat = "Gypsum False Ceiling"
          else if (updatedLead?.service?.toLowerCase().includes("pvc"))    cat = "PVC Ceiling"
          else if (updatedLead?.service?.toLowerCase().includes("wpc"))    cat = "WPC fluted panels & uv marble Sheet"
          else if (updatedLead?.service?.toLowerCase().includes("grid"))   cat = "Grid Ceiling"
          else if (updatedLead?.service?.toLowerCase().includes("tv"))     cat = "TV Unit Design"
          else cat = "Gypsum False Ceiling"
          botMessage.galleryType = cat
        }

        next = [...prev, botMessage]
      }
      if (extractedPhone && !lead?.phone && updatedLead?.phone) {
        const card: LeadCard = { name: updatedLead.name || "Friend", phone: updatedLead.phone!, city: updatedLead.city, service: updatedLead.service, estimate: pendingEstimate || estSummary || undefined, timestamp: new Date().toISOString() }
        next = [...next, mk("bot", "lead_card", "card", card)]
      }
      return next
    })

    const hasLeadIntent = LEAD_INTENT_RE.test(text.toLowerCase()) && !updatedLead?.phone && !extractedPhone && !dims
    if (hasLeadIntent) {
      setTyping(false); await delay(1100); setTyping(true); await delay(700)
      let startMsg: string
      if (updatedLead?.name && updatedLead?.phone) {
        startMsg = `${updatedLead.name} ji, kab aana chahenge? (din aur samay batao) 📅`
        setCollectStep("time")
      } else if (updatedLead?.name) {
        startMsg = `${updatedLead.name} ji! Free site visit ke liye aapka WhatsApp number chahiye 📱`
        setCollectStep("phone")
      } else {
        startMsg = `Free site visit book karne ke liye, pehle aapka naam batao 😊`
        setCollectStep("name")
      }
      historyRef.current = [...historyRef.current, { role: "assistant", content: startMsg }]
      setMsgs(prev => [...prev, mk("bot", startMsg)])
      setTyping(false)
      sendLock.current = false
      return
    }

    setTyping(false)
    sendLock.current = false
  }, [input, lead, typing, lastTopic, roomSize, aiMode, collectStep, pendingEstimate, isListening])

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }

  const lastBotMsg = messages.filter(m => m.role === "bot").slice(-1)[0]?.text || ""
  const hasEstimate = lastBotMsg.includes("₹") || !!pendingEstimate
  const qrSet = getContextualQuickReplies(!!lead?.phone, hasEstimate, lastBotMsg, lastTopic)
  const statusText = offHours ? "🌙 Opens 9 AM • WhatsApp available" : "🟢 Online — Premium Consultant"

  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes jk-ring { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.9); opacity: 0; } }
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

      {/* ── Floating Button — Glossy Green Mic ────────────────────────────── */}
      {!open && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-4 z-50 md:bottom-28 md:right-6"
          style={{ width: 72, height: 72 }}
          aria-label="Open chat"
        >
          {/* Pulsing glow ring */}
          <span className="absolute inset-0 rounded-full bg-[#6fe86f] opacity-30" style={{ animation: "jk-ring 2.2s ease-out infinite" }} />

          {/* Metallic outer ring — matches screenshot */}
          <span className="absolute inset-0 rounded-full shadow-2xl"
            style={{
              background: "conic-gradient(from 135deg, #c0c0c0, #888, #d4d4d4, #666, #c0c0c0)",
              padding: "5px",
            }}
          />

          {/* Inner green glossy button */}
          <span className="absolute inset-[5px] rounded-full overflow-hidden flex items-center justify-center"
            style={{ background: "linear-gradient(145deg, #7de87d 0%, #4cc94c 35%, #2e9e2e 70%, #1d6e1d 100%)" }}
          >
            {/* Glossy top-left highlight */}
            <span className="absolute top-[4%] left-[8%] w-[60%] h-[45%] rounded-full bg-white/40"
              style={{ filter: "blur(3px)" }}
            />
            {/* Classic broadcast mic SVG */}
            <svg viewBox="0 0 56 56" fill="none" className="relative z-10" style={{ width: 38, height: 38 }} aria-hidden="true">
              {/* Left sound waves */}
              <path d="M9 20 Q3 28 9 36" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M13 16 Q5 28 13 40" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75"/>
              {/* Right sound waves */}
              <path d="M47 20 Q53 28 47 36" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M43 16 Q51 28 43 40" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75"/>
              {/* Mic capsule (top rounded) */}
              <rect x="20" y="8" width="16" height="22" rx="8" fill="white"/>
              {/* Grille lines inside mic */}
              <line x1="20" y1="16" x2="36" y2="16" stroke="#2e9e2e" strokeWidth="1.8"/>
              <line x1="20" y1="20" x2="36" y2="20" stroke="#2e9e2e" strokeWidth="1.8"/>
              <line x1="20" y1="24" x2="36" y2="24" stroke="#2e9e2e" strokeWidth="1.8"/>
              {/* Mic yoke / arms */}
              <line x1="22" y1="29" x2="22" y2="34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="34" y1="29" x2="34" y2="34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              {/* Mic arc bottom */}
              <path d="M17 30 Q17 40 28 40 Q39 40 39 30" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
              {/* Stand pole */}
              <line x1="28" y1="40" x2="28" y2="47" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              {/* Base */}
              <ellipse cx="28" cy="48" rx="8" ry="3" fill="white"/>
            </svg>
          </span>

          {/* AI badge */}
          <span className="absolute -top-1 -right-0.5 flex items-center gap-0.5 rounded-full bg-amber-400 px-1.5 py-0.5 text-[8px] font-black text-amber-900 shadow-md z-20">
            <ISparkle />AI
          </span>
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed z-50 flex flex-col overflow-hidden shadow-2xl bottom-0 left-0 right-0 h-[92dvh] max-h-[680px] rounded-t-3xl md:bottom-6 md:left-auto md:right-6 md:h-[620px] md:w-[420px] md:rounded-2xl bg-white/98 backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between px-4 py-3 md:px-5 md:py-3.5 bg-gradient-to-r from-emerald-800 to-emerald-600 text-white">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="relative flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-white/20 font-black text-[10px] md:text-sm ring-2 ring-white/30 shrink-0">
                  JK
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-300 border-2 border-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-bold leading-tight truncate">Riya — AI Consultant</p>
                  <p className="text-[9px] md:text-[10px] text-white/75">{statusText}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => {
                    setMsgs([WELCOME_MSG])
                    setLead(null)
                    setLastTopic(null)
                    setRoomSize(null)
                    setCollectStep(null)
                    setPendingEstimate(null)
                    historyRef.current = []
                    const freshMem = createMemory()
                    memoryRef.current = freshMem
                    setMemory(freshMem)
                    try { localStorage.removeItem("jk_chat_v5"); localStorage.removeItem("jk_chat_memory_v2") } catch {}
                  }}
                  title="Clear chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 text-white/70 hover:text-white text-[11px] font-bold transition-colors"
                >↺</button>
                <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"><IClose /></button>
              </div>
            </div>

            {aiMode && (
              <div className="shrink-0 flex items-center gap-2 px-3 md:px-4 py-1.5 bg-emerald-50 border-b border-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <p className="text-[9px] md:text-[10px] text-emerald-700 font-medium">Powered by AI + Luxury Estimator</p>
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
                  <p className="text-[10px] text-red-600 font-semibold">Bol raha hoon... (Sun rahi hoon 👂)</p>
                  <button
                    onClick={toggleVoice}
                    className="ml-auto text-[9px] text-red-500 font-bold border border-red-300 rounded-full px-2 py-0.5 hover:bg-red-100"
                  >Rok do</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 min-h-0 overflow-y-auto px-3 md:px-4 py-3 md:py-4 space-y-3 scrollbar-luxury"
              style={{ background: "linear-gradient(145deg, #f8faf7 0%, #ffffff 100%)" }}
            >
              {messages.map((m, idx) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "bot" && m.kind !== "card" && (
                    <div className="shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                      <span className="text-[8px] font-black text-white">JK</span>
                    </div>
                  )}
                  {m.role === "bot" && m.kind === "card" && <div className="h-6 w-6 shrink-0" />}

                  {m.kind === "card" && m.cardData ? (
                    <LeadConfirmCard data={m.cardData} />
                  ) : (
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] whitespace-pre-line rounded-2xl px-3 md:px-4 py-2 md:py-2.5 text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed shadow-sm ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-emerald-700 to-emerald-500 text-white rounded-br-sm break-words"
                          : "bg-white text-gray-800 rounded-bl-sm border border-gray-200 break-words"
                      }`}
                    >
                      <RichText text={m.text} />
                      {(m as any).galleryType && (
                        <div className="mt-2 md:mt-3 flex gap-2 md:gap-3 overflow-x-auto pb-1.5">
                          {galleryImages
                            .filter(img => img.category === (m as any).galleryType)
                            .slice(0, 6)
                            .map((img, i) => (
                              <Image key={i} src={img.src} alt={img.alt} width={160} height={160} className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl object-cover border border-gray-200 shrink-0" />
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
              {typing && <TypingDots />}
            </div>

            {/* Quick Replies */}
            <div className="shrink-0 flex gap-1.5 overflow-x-auto px-3 md:px-4 py-2 bg-white border-t border-gray-100 scrollbar-luxury">
              {qrSet.map(q => (
                <button key={q} onClick={() => send(q)} disabled={typing} className="shrink-0 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-[10px] md:text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 active:scale-95 transition-all whitespace-nowrap disabled:opacity-40">{q}</button>
              ))}
            </div>



            {/* Input Row — with Voice Mic Button */}
            <div className="shrink-0 flex items-center gap-1.5 border-t border-gray-200 bg-white px-3 py-2 pb-[max(8px,env(safe-area-inset-bottom))]">
              {/* Voice Mic Button — always visible */}
              <motion.button
                onClick={voiceSupported ? toggleVoice : undefined}
                whileTap={{ scale: 0.9 }}
                className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                  isListening
                    ? "bg-red-500 text-white shadow-lg"
                    : voiceSupported
                    ? "bg-emerald-100 border border-emerald-400 text-emerald-800 hover:bg-emerald-200"
                    : "bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed"
                }`}
                title={isListening ? "Recording... tap to stop" : voiceSupported ? "Bolkar type karo" : "Voice not supported"}
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
                placeholder={isListening ? "Bol raha hoon... 🎙️" : "Type karo ya mic se bolo..."}
                className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-colors"
                autoComplete="off"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || typing}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white shadow hover:bg-emerald-600 active:scale-90 transition-all disabled:opacity-40"
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
       

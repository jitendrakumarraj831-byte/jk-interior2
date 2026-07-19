
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
const CALL_NUMBER = "+918541849118"
const AREAS       = ["Forbesganj", "Araria", "Jogbani", "Raniganj", "Narpatganj", "Kursakanta", "Tribeniganj", "Chhatapur", "Supaul", "Purnia"]

const CITY_MAP: Record<string, string> = {
  forbesganj: "Forbesganj", araria: "Araria", purnia: "Purnia",
  purnea: "Purnia", kishanganj: "Kishanganj", katihar: "Katihar",
  narpatganj: "Narpatganj", raniganj: "Raniganj", jogbani: "Jogbani",
  supaul: "Supaul", chhatapur: "Chhatapur", tribeniganj: "Tribeniganj",
  bhargama: "Bhargama", palasi: "Palasi",
}

const QUICK_ACTION_MAP: Record<string, string> = {
  "📂 डिज़ाइन देखें": "Mujhe PVC ceiling ka design catalog dekhna hai",
  "✨ Free Site Visit बुक करें": "Mujhe free site visit book karni hai",
}

// ── EXACT FAQ ANSWERS — Fixed Questions ka Fixed Answer ───────────────────────
const EXACT_FAQ_FIXED: Array<{ patterns: RegExp; answer: string }> = [
  {
    // Greetings — broad match
    patterns: /^(hi+|hello+|hey+|namaste|namaskar|helo|good\s*(morning|evening|afternoon|night)|hy|hii+|salam|kaise\s*ho|kya\s*haal|kya\s*chal|wassup|sup|haan\s*ji|ha\s*ji|ji\s*haan|ji)$/i,
    answer: `🌟 नमस्ते! JK Interior में आपका स्वागत है!\n\nमैं **JK Interior AI Assistant** हूं — आपका इंटीरियर डिज़ाइन कंसल्टेंट 😊\n\nआप पूछ सकते हैं:\n✅ किसी भी मटेरियल का रेट (PVC, Gypsum, WPC...)\n✅ अपने रूम का estimate\n✅ डिज़ाइन आइडिया या सुझाव\n\nक्या जानना चाहते हैं? बताइए!`,
  },
  {
    // Price list
    patterns: /\b(price\s*list|rate\s*list|sab\s*ka\s*rate|all\s*(?:material\s*)?rate|poori\s*list|full\s*list|sabhi\s*rate|saari\s*rate|complete\s*rate)\b/i,
    answer: `📋 **JK Interior – पूरी रेट लिस्ट**\n\n✨ Gypsum False Ceiling   ₹75 – ₹210 / sq.ft\n🏠 PVC False Ceiling     ₹75 – ₹150 / sq.ft\n🪵 WPC Wall Panel       ₹180 – ₹650 / sq.ft\n💎 UV Marble Sheet      ₹45 – ₹120 / sq.ft\n📺 Modular TV Unit       ₹15,000 – ₹75,000+\n🏛️ Fluted Panel         ₹200 – ₹500 / sq.ft\n🏢 Grid Ceiling          ₹45 – ₹115 / sq.ft\n🍳 Modular Kitchen       ₹60,000 – ₹2,00,000\n🚪 Custom Wardrobe       ₹800 – ₹2,000 / sq.ft\n\n📞 Free Site Visit और exact कोटेशन: **+91 8541849118**`,
  },
  {
    // Warranty / guarantee
    patterns: /\b(warranty|guarantee|kitne\s*saal\s*(?:ki\s*)?(?:warranty|guarantee)|how\s*many\s*years|kitni\s*guarantee|kitni\s*warranty|long\s*lasting|toot\s*(?:jayega|jaaye|gaya)|टूट|खराब\s*(?:ho|hoga)|kharab)\b/i,
    answer: `🛡️ **JK Interior की Warranty**\n\n✅ **1 साल की लिखित Warranty** — हर installation पर\n\n📅 मटेरियल की उम्र:\n• PVC Ceiling — 20+ साल\n• Gypsum Ceiling — 10–15 साल\n• WPC Wall Panel — 15–20 साल\n• UV Marble Sheet — 15+ साल\n• Modular TV Unit — 8–10 साल\n\n🔧 Warranty के दौरान कोई भी खराबी हो तो फ्री रिपेयर मिलेगी\n📞 +91 8541849118`,
  },
  {
    // Installation time
    patterns: /(?:installation|install|kaam|lagan[ae]|fit\s*karn[ae]|lagwane)\s*(?:mein\s*)?(?:kitna|kab|time|din|waqt|samay)|(?:kitne\s*din\s*(?:mein\s*)?(?:hoga|lagega|complete|ban|taiyar))|(?:kab\s*(?:tak|milega|taiyar|complete|hoga))/i,
    answer: `⏱️ **कितने दिन में हो जाएगा**\n\n✅ PVC Ceiling (1 कमरा) – **1–2 दिन**\n✅ Gypsum Ceiling (1 कमरा) – **2–4 दिन**\n✅ WPC Wall Panel – **2–3 दिन**\n✅ UV Marble Sheet – **1–2 दिन**\n✅ TV Unit (Modular) – **3–5 दिन**\n✅ पूरे घर का इंटीरियर – **15–30 दिन**\n\n📞 सही-सही टाइमलाइन के लिए: **+91 8541849118**`,
  },
  {
    // Contact
    patterns: /\b(?:(?:aapka|JK\s*interior\s*ka|company\s*ka|tumhara|apka)\s*)?(?:contact|phone\s*number|number\s*do|number\s*kya|helpline|customer\s*care|number\s*batao|call\s*karo|kaise\s*contact|kahan\s*mile|address)\b/i,
    answer: `📞 **JK Interior से संपर्क करें**\n\n📱 WhatsApp और Call: **+91 8541849118**\n🕐 समय: **सोमवार–शनिवार, सुबह 9 बजे – रात 9 बजे**\n📍 फोर्बेसगंज, अररिया, बिहार\n\n💬 WhatsApp पर मैसेज कर दीजिए या सीधे कॉल कर लीजिए! 🙏`,
  },
  {
    // Site visit / free visit
    patterns: /\b(free\s*(?:site\s*)?visit|site\s*visit|free\s*consultation|ghar\s*(?:aa?o|aana)|visit\s*chahiye|measurement\s*(?:chahiye|karo|karna)|ghar\s*aake|aap\s*aao|koi\s*aaye|banda\s*bhejo|expert\s*bhejo)\b/i,
    answer: `📅 **Site Visit बुक करें – 100% Free!**\n\n✅ हमारा एक्सपर्ट आपके घर आएगा\n✅ रूम की माप लेगा\n✅ सबसे सही डिज़ाइन सुझाएगा\n✅ वहीं मौके पर exact कोटेशन मिल जाएगी\n✅ कोई छुपा हुआ खर्च नहीं!\n\n📞 बुक करें: **+91 8541849118**\nया नीचे "Book Visit" बटन दबाइए 👇`,
  },
  {
    // Waterproof / bathroom ceiling
    patterns: /\b(waterproof|(?:bathroom|kitchen|toilet|balcony)\s*(?:ke\s*liye\s*)?(?:ceiling|chhat|panel)|wet\s*area|(?:paani|baarish|nami|moisture|seepage|selan)\s*(?:se\s*)?(?:safe|resist|bachao|problem))\b/i,
    answer: `💧 **Waterproof ऑप्शन**\n\n✅ **PVC Ceiling** – 100% पानी का असर नहीं, बाथरूम-किचन के लिए बेस्ट\n   रेट: ₹75–150 / sq.ft\n\n❌ Gypsum – पानी से नहीं बचती, गीली जगह में मत लगाइए\n\n✅ **UV Marble Sheet** – बाथरूम की दीवार के लिए एकदम सही\n   रेट: ₹45–120 / sq.ft\n\nरूम का साइज़ बता दीजिए — तुरंत estimate निकाल देता हूं! 📐`,
  },
  {
    // Gypsum vs PVC comparison
    patterns: /\b(gypsum\s*vs\s*pvc|pvc\s*vs\s*gypsum|kaunsa\s*(?:better|behtar|acha|sahi|lena\s*chahiye)|(?:gypsum|pvc)\s*(?:mein\s*)?(?:kya\s*)?(?:difference|antar|fark|alag)|dono\s*mein|konsa\s*(?:lu|loon|lu\s*main|better))\b/i,
    answer: `⚖️ **Gypsum vs PVC – पूरी तुलना**\n\n| बात | Gypsum | PVC |\n|---------|--------|-----|\n| रेट | ₹75–210 | ₹75–150 |\n| लुक | प्रीमियम | क्लीन |\n| पानी से बचाव | ❌ नहीं | ✅ हां |\n| टिकाऊपन | 5 साल | 10 साल |\n| सबसे सही | हॉल/बेडरूम | किचन/बाथरूम |\n\n🏆 **सुझाव:** हॉल में Gypsum + किचन-बाथरूम में PVC — यही सबसे बढ़िया कॉम्बो है!\n\n📞 Free Consultation: **+91 8541849118**`,
  },
  {
  
    // Service areas
    patterns: /\b(?:konse|kahan[\s-]*kahan|kahan\s*(?:service|kaam|milega|tak|dete)|service\s*area|areas?\s*(?:cover|covered|mein)|kahan\s*kaam|which\s*cit(?:y|ies)|kahan\s*milega|kahan\s*tak|aate\s*ho|aate\s*hain|kaam\s*karte\s*ho|service\s*dete|kahan\s*dete)\b/i,
    answer: `📍 **JK Interior – सर्विस एरिया**\n\n✅ फोर्बेसगंज ✅ अररिया ✅ जोगबनी\n✅ रानीगंज ✅ नरपतगंज ✅ कुर्साकाँटा\n✅ त्रिवेणीगंज ✅ छतापुर ✅ सुपौल ✅ पूर्णिया\n\nइसके आसपास की जगहों पर भी हम पहुंच जाते हैं!\n📞 **+91 8541849118**`,
  },
  {
    // Payment
    patterns: /\b(?:payment|advance|payment\s*mode|upi|(?:cash|online)\s*payment|kitna\s*advance|deposit|paise\s*(?:kaise|kab)|bhaav|how\s*to\s*pay|pehle\s*paise|paisa\s*kab)\b/i,
    answer: `💳 **पेमेंट की जानकारी**\n\n✅ UPI / PhonePe / GPay चलता है\n✅ Cash भी दे सकते हैं\n✅ Site Visit के बाद 30–50% एडवांस\n✅ बाकी पैसा काम पूरा होने पर\n✅ पूरा एडवांस देने की ज़रूरत नहीं!\n\n📞 पूरी जानकारी के लिए: **+91 8541849118**`,
  },
  {
    // LED / lighting
    patterns: /\b(?:led|cove\s*light(?:ing)?|indirect\s*light(?:ing)?|led\s*strip|light\s*design|rgb\s*light|celing\s*light|ceiling\s*light|light\s*(?:chahiye|lagani|lagwana|rate|cost|kitna))\b/i,
    answer: `💡 **LED लाइटिंग के ऑप्शन**\n\n✅ Cove Light (Gypsum के साथ) – ₹40–80 / running ft\n✅ LED Strip (RGB/White) – ₹30–60 / running ft\n✅ Spot Light – ₹200–500 / पीस\n✅ Backlit TV Panel – ₹800–2000\n\n✨ LED लाइटिंग से रूम का लुक 3 गुना प्रीमियम हो जाता है!\n\nरूम का साइज़ बता दीजिए — साथ में LED का estimate भी दे दूंगा 🙏`,
  },
  {
    // Quality / materials
    patterns: /\b(?:quality|acha\s*(?:material|maal)|genuine|original|local\s*nahi|brand(?:ed)?|trusted|reliable|jhooth\s*nahi|sach\s*mein|accha\s*kaam|guarantee\s*hai|bharosa)\b/i,
    answer: `✅ **JK Interior – मटेरियल की क्वालिटी**\n\nहम सिर्फ ब्रांडेड और ISI-Certified मटेरियल इस्तेमाल करते हैं:\n\n🏆 **भरोसेमंद ब्रांड:** Armstrong, Saint-Gobain, Hunter Douglas\n🔧 **प्रोफेशनल इंस्टॉलेशन** – 5+ साल के अनुभवी टीम से\n⭐ **500+ खुश ग्राहक** अररिया और आसपास\n🛡️ मटेरियल की वारंटी – 2 से 10 साल तक\n\nकोई शक हो तो Free Site Visit करवा सकते हैं!\n📞 +91 8541849118`,
  },
  {
    // Maintenance / cleaning
    patterns: /\b(?:maintenance|clean(?:ing)?|saaf|safai|dhona|dust|dhool|kitna\s*kharcha\s*(?:maintenance|repair)|repair|thik\s*karna|toot\s*gaya)\b/i,
    answer: `🧹 **साफ-सफाई कैसे करें**\n\n✅ **PVC Ceiling** – सिर्फ गीले कपड़े से पोंछ दें। कुछ और करना ही नहीं!\n✅ **Gypsum** – सूखे कपड़े या वैक्यूम से। पानी से बचाइए।\n✅ **WPC Panel** – हल्के गीले कपड़े से साफ करें। कीड़े का डर नहीं!\n✅ **UV Marble** – Glass Cleaner से चमकदार बनी रहती है, आसान है।\n\n💡 सही तरीके से लगाया गया मटेरियल सालों-साल चलता है।\n📞 कोई परेशानी हो तो कॉल करें: **+91 8541849118**`,
  },
  {
    // Thank you
    patterns: /^(?:thanks?|shukriya|dhanyawad|shukriya\s*ji|bahut\s*shukriya|thank\s*you|thx|ty|ji\s*shukriya|acha\s*hai|great|nice|perfect|bahut\s*acha|bilkul\s*sahi|theek\s*hai|ok\s*ji|okay\s*ji)$/i,
    answer: `खुशी हुई मदद करके! 😊🙏\n\nकोई और सवाल हो तो ज़रूर पूछिए — मैं हमेशा यहां हूं।\n\n📞 सीधे बात करनी हो: **+91 8541849118**`,
  },
  {
    // Who are you / intro
    patterns: /^(?:kaun\s*ho|tum\s*kaun|aap\s*kaun|who\s*are\s*you|what\s*are\s*you|kya\s*ho\s*tum|bot\s*ho|ai\s*ho|real\s*ho|human\s*ho|assistant\s*kaun)$/i,
    answer: `मैं **JK Interior AI Assistant** हूं! 🤖✨\n\nमैं आपकी इन चीज़ों में मदद कर सकता हूं:\n✅ रूम का estimate निकालना\n✅ मटेरियल के सुझाव (PVC, Gypsum, WPC...)\n✅ डिज़ाइन आइडिया\n✅ Free Site Visit बुक करना\n\nक्या जानना चाहते हैं? बताइए! 😊`,
  },
  {
    // Fluted panels
    patterns: /\b(?:fluted\s*panel|fluted\s*wall|fluted\s*design|fluted\s*rate|fluted\s*ceiling)\b/i,
    answer: `🏛️ **Fluted Panel**\n\nFluted Panel एक प्रीमियम डेकोरेटिव वॉल ट्रीटमेंट है!\n\n💰 रेट: ₹200 – ₹500 / sq.ft\n✅ TV वॉल, लिविंग रूम की Accent Wall के लिए एकदम सही\n✅ मॉडर्न और लग्ज़री लुक\n✅ कई लकड़ी वाले फिनिश में मिल जाता है\n⏱️ Installation: 2–3 दिन\n\nवॉल का साइज़ बताइए — exact estimate निकालते हैं! 📐`,
  },
  {
    // Grid ceiling
    patterns: /\b(?:grid\s*ceiling|grid\s*tile|office\s*ceiling|false\s*grid|mineral\s*fiber|grid\s*ka\s*rate)\b/i,
    answer: `🏢 **Grid Ceiling (ऑफिस/कमर्शियल)**\n\n💰 रेट: ₹45 – ₹115 / sq.ft\n✅ ऑफिस, दुकान, शोरूम के लिए बेस्ट\n✅ मेंटेनेंस आसान — टाइल बदलना आसान है\n✅ आग से सुरक्षित ऑप्शन भी मिलता है\n⏱️ Installation: 1–2 दिन प्रति कमरा\n\nएरिया का साइज़ बता दीजिए — estimate निकाल देता हूं! 📐`,
  },
{
    // Office location / address
    patterns: /\b(?:office\s*(?:kahan|kaha|hai|address|location)|location\s*(?:kya|kahan|batao|hai)|aapka\s*(?:office|address|location|ghar|showroom)|showroom\s*(?:kahan|hai)|kahan\s*(?:ho|hain|hai)\s*aap|address\s*(?:kya|batao|do|chahiye))\b/i,
    answer: `📍 **JK Interior – ऑफिस लोकेशन**\n\n🏢 फोर्बेसगंज, अररिया ज़िला, बिहार\n\n✅ हम घर आकर FREE Site Visit करते हैं\n✅ आपको ऑफिस आने की ज़रूरत ही नहीं!\n\n📞 Call/WhatsApp: **+91 8541849118**\n🕐 समय: सोमवार–शनिवार, सुबह 9 बजे – रात 9 बजे`,
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
  const istH = parseInt(
    new Intl.DateTimeFormat("en-IN", { hour: "numeric", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date()),
    10
  )
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

// ── DIMENSIONS ENGINE ────────────────────────────────────────────────────────
function extractDimensions(text: string): { length: number; width: number; rawMatch: string } | null {
  const t = text.toLowerCase()

  // ✅ Time/date patterns को IGNORE करें — लेकिन अगर dimensions भी हैं तो dimensions को priority दें
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

  // First check if ANY ignore pattern matches
  const hasIgnorePattern = IGNORE_PATTERNS.some(pattern => pattern.test(t))
  // But don't skip dimensions if they're also present
  if (hasIgnorePattern) {
    // Check if dimensions are present — if yes, continue; if no, skip
    const hasDimensionPattern = /(\d+(?:\.\d+)?)\s*[x×*]\s*(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?)\s*[x×*]\s*(\d+(?:\.\d+)?)\s*(?:feet|ft)/.test(t)
    if (!hasDimensionPattern) return null
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
  if (area > 250) return "इतने बड़े एरिया के लिए Cove Light वाला डिज़ाइन सबसे बेहतर रहेगा — Gypsum या WPC के साथ लुक एकदम प्रीमियम आएगा!"
  if (area > 150) return "साइज़ अच्छा है! किनारे पर LED Strip लगाने से मॉडर्न और हाई-एंड लुक मिलेगा।"
  if (materialType.includes("WPC")) return "WPC Panel TV वॉल या बेडरूम के लिए एकदम सही — लकड़ी जैसा भरा-पूरा टेक्सचर देता है।"
  if (materialType.includes("PVC")) return "PVC पानी से नहीं डरती — किचन या बालकनी के लिए एकदम सही, कुछ करना भी नहीं पड़ता।"
  return "हल्की इनडायरेक्ट लाइटिंग से कमरे का लुक और भी प्रीमियम हो जाएगा!"
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
                       materialKey === "wpc" ? "WPC Wall Panel" :
                       materialKey === "uv" ? "UV Marble Sheet" : "Gypsum Ceiling"
  
  let priceRange = ""
  let priceLow = 0, priceHigh = 0
  switch (materialKey) {
    case "pvc": priceLow = 80; priceHigh = 140; break
    case "gypsum": priceLow = 80; priceHigh = 140; break
    case "wpc": priceLow = 180; priceHigh = 450; break
    case "uv": priceLow = 50; priceHigh = 95; break
  }
  const estimatedTotalLow = Math.round(area * priceLow)
  const estimatedTotalHigh = Math.round(area * priceHigh)
  priceRange = `₹${priceLow} – ₹${priceHigh} / sq.ft`
  
  const greeting = leadName ? `${leadName} जी, ` : ""
  const advice = getPremiumAdvice(area, materialName)

  return `${greeting}आपके **${length}' × ${width}'** रूम (${area} sq.ft) का estimate:\n\n💰 रेट: ${priceRange}\n📐 कुल खर्च: **₹${estimatedTotalLow.toLocaleString()} – ₹${estimatedTotalHigh.toLocaleString()}**\n\n✨ ${advice}\n\n📅 Free Site Visit के लिए "Book Visit" बोलिए या अपना नाम बता दीजिए! 😊`
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

function localFallback(input: string, lead: Partial<Lead> | null, roomSize?: string | null): string {
  const t  = input.toLowerCase().trim()
  const nm = lead?.name || ""
  const oh = isOffHours()

  // ── EXACT FAQ CHECK FIRST ─────────────────────────────────────────────────
  const exactAnswer = matchExactFAQ(input)
  if (exactAnswer) return exactAnswer

  // ── Thank you / positive reactions ────────────────────────────────────────
  if (has(t, ["thank","shukriya","dhanyawad","thanks","thx","great","perfect","bahut acha","bahut accha","wah","wow","zabardast","mast"])) {
    return `खुशी हुई मदद करके${nm ? ", " + nm : ""}! 😊🙏\n\nकोई और सवाल हो तो बताइए — मैं यहीं हूं।\n📞 +91 8541849118`
  }

  // ── Material: Gypsum ──────────────────────────────────────────────────────
  if (t.includes("gypsum") || (t.includes("pop ") && !t.includes("popular")) || t.includes("plaster of paris")) {
    const m = MATERIAL_KNOWLEDGE.gypsum
    const isWaterQ = has(t, ["paani","water","bathroom","nami","moisture","geela","baarish","toilet"])
    if (isWaterQ) return `Gypsum Ceiling बाथरूम-किचन के लिए **सही नहीं** है — पानी से खराब हो जाती है।\n\nबाथरूम के लिए **PVC Ceiling** सबसे बेहतर रहेगी:\n✅ 100% पानी का असर नहीं\n💰 ₹75–150 / sq.ft\n⏱️ 1–2 दिन में इंस्टॉलेशन\n\nरूम का साइज़ बताइए — estimate निकालता हूं! 📐`
    const rateQ = has(t, ["rate","price","cost","kitna","daam","kimat","kharcha"])
    if (rateQ) return `✨ **Gypsum False Ceiling का रेट**\n\n💰 स्टैंडर्ड: ₹75–130 / sq.ft\n💎 प्रीमियम (Cove डिज़ाइन): ₹135–210 / sq.ft\n\n✅ हॉल, बेडरूम, ड्रॉइंग रूम के लिए बढ़िया\n✅ LED Cove Light के साथ बहुत सुंदर लगती है\n🛡️ 1 साल की लिखित Warranty\n\nरूम का साइज़ बता दीजिए — exact टोटल निकाल देता हूं! 📐`
    if (roomSize) {
      const [l, w] = roomSize.split("x").map(Number)
      return generateEstimateFromDimensions(l, w, "Gypsum Ceiling", lead?.name || undefined)
    }
    return `✨ **Gypsum False Ceiling** – ${m.price}\n\n${m.description}\n\n✅ सबसे सही: ${m.bestFor}\n❌ मत लगाइए: ${m.avoidIn}\n⏱️ Install: ${m.installTime}\n🛡️ ${m.warranty}\n\nरूम का साइज़ भेज दीजिए (जैसे 12×14) — estimate तुरंत निकाल देता हूं!`
  }

  // ── Material: PVC ─────────────────────────────────────────────────────────
  if (t.includes("pvc")) {
    const m = MATERIAL_KNOWLEDGE.pvc
    const rateQ = has(t, ["rate","price","cost","kitna","daam","kimat","kharcha"])
    if (rateQ) return `🏠 **PVC Ceiling का रेट**\n\n💰 स्टैंडर्ड: ₹75–115 / sq.ft\n💎 प्रीमियम: ₹120–150 / sq.ft\n\n✅ 100% पानी का असर नहीं — बाथरूम-किचन के लिए बेस्ट\n✅ मेंटेनेंस लगभग ज़ीरो\n🛡️ 1 साल की लिखित Warranty\n\nरूम का साइज़ बता दीजिए — exact टोटल निकाल देता हूं! 📐`
    if (roomSize) {
      const [l, w] = roomSize.split("x").map(Number)
      return generateEstimateFromDimensions(l, w, "PVC Ceiling", lead?.name || undefined)
    }
    return `🏠 **PVC False Ceiling** – ${m.price}\n\n${m.description}\n\n✅ सबसे सही: ${m.bestFor}\n⏱️ Install: ${m.installTime}\n🛡️ ${m.warranty}\n\nसाइज़ भेज दीजिए जैसे 12×10 — टोटल कॉस्ट तुरंत निकल जाएगी!`
  }

  // ── Material: WPC ─────────────────────────────────────────────────────────
  if (t.includes("wpc") || t.includes("wood panel") || t.includes("wooden panel") || t.includes("louver")) {
    const m = MATERIAL_KNOWLEDGE.wpc
    const rateQ = has(t, ["rate","price","cost","kitna","daam","kimat","kharcha"])
    if (rateQ) return `🪵 **WPC Wall Panel का रेट**\n\n💰 स्टैंडर्ड: ₹180–390 / sq.ft\n💎 प्रीमियम: ₹390–650 / sq.ft\n\n✅ पानी और कीड़े का असर नहीं\n✅ TV वॉल, बेडरूम एक्सेंट वॉल के लिए बेस्ट\n🛡️ 1 साल की लिखित Warranty\n\nवॉल का साइज़ बता दीजिए — exact कोटेशन निकाल देता हूं! 📐`
    if (roomSize) {
      const [l, w] = roomSize.split("x").map(Number)
      return generateEstimateFromDimensions(l, w, "WPC Wall Panels", lead?.name || undefined)
    }
    return `🪵 **WPC Wall Panel** – ${m.price}\n\n${m.description}\n\n✅ सबसे सही: ${m.bestFor}\n⏱️ Install: ${m.installTime}\n🛡️ ${m.warranty}\n\nAccent Wall या TV बैकग्राउंड के लिए एकदम सही! साइज़ बता दें?`
  }

  // ── Material: UV Marble ───────────────────────────────────────────────────
  if (t.includes("uv ") || t.includes("uv marble") || (t.includes("marble") && !t.includes("natural marble"))) {
    const m = MATERIAL_KNOWLEDGE.uv
    const rateQ = has(t, ["rate","price","cost","kitna","daam","kimat","kharcha"])
    if (rateQ) return `💎 **UV Marble Sheet का रेट**\n\n💰 स्टैंडर्ड: ₹45–80 / sq.ft\n💎 प्रीमियम: ₹80–120 / sq.ft\n\n✅ बाथरूम की दीवार, किचन बैकस्प्लैश के लिए बेस्ट\n✅ चमकदार फिनिश, साफ करना आसान\n🛡️ 1 साल की लिखित Warranty\n\nएरिया का साइज़ बताइए — estimate निकालते हैं! 📐`
    if (roomSize) {
      const [l, w] = roomSize.split("x").map(Number)
      return generateEstimateFromDimensions(l, w, "UV Marble Sheets", lead?.name || undefined)
    }
    return `💎 **UV Marble Sheet** – ${m.price}\n\n${m.description}\n\n✅ सबसे सही: ${m.bestFor}\n❌ मत लगाइए: ${m.avoidIn}\n⏱️ Install: ${m.installTime}\n🛡️ ${m.warranty}`
  }

  // ── TV Unit ───────────────────────────────────────────────────────────────
  if (t.includes("tv unit") || t.includes("tv panel") || t.includes("tv wall") || t.includes("tv cabinet") || /\btv\b/.test(t)) {
    const m = MATERIAL_KNOWLEDGE.tvunit
    return `📺 **Modular TV Unit** – ${m.price}\n\nकस्टम डिज़ाइन भी बनते हैं!\n📐 साइज़ के हिसाब से कीमत:\n• 6–8 फुट: ${m.sizes.small}\n• 8–10 फुट: ${m.sizes.medium}\n• 10–14 फुट: ${m.sizes.large}\n\n✅ LED Backlight, WPC या Laminate फिनिश\n✅ शटर वाला स्टोरेज भी मिल जाता है\n\nTV Unit का साइज़ बता दीजिए — exact कोटेशन निकाल देता हूं!`
  }

  // ── Modular Kitchen ─────────────────────────────────────────────────────
  if (/\bmodular\s*kitchen\b|\bkitchen\s*(?:cabinet|design|renovation|banana|banwana|rate|cost)\b/.test(t)) {
    return `🍳 **Modular Kitchen** – ₹60,000 – ₹2,00,000\n\nपूरी तरह कस्टम — L-shape, U-shape, स्ट्रेट लेआउट सब बनते हैं।\n✅ Soft-close hinges, pull-out शेल्फ़\n✅ Laminate, acrylic, glass शटर\n✅ चिमनी और हॉब की फिटिंग भी कर देते हैं\n\nKitchen का साइज़ बता दीजिए — डिटेल कोटेशन निकाल देता हूं!`
  }

  // ── Wardrobe ──────────────────────────────────────────────────────────────
  if (/\bwardrobe\b|\bwardrop\b|\balmirah\b|\bcupboard\b|\balmari\b|\bkapdon\s*ki\s*cabinet\b/.test(t)) {
    return `🚪 **Custom Wardrobe** – ₹800–₹2,000/sq.ft\n\nफर्श से छत तक स्टोरेज — Sliding या Hinged दोनों डोर मिल जाते हैं।\n✅ अंदर LED का ऑप्शन\n✅ कस्टम शेल्फ़ और ड्रॉअर\n✅ मिरर शटर भी लगा सकते हैं\n\nबेडरूम का साइज़ और वॉर्डरोब की नाप बता दीजिए!`
  }

  // ── Office / location query ───────────────────────────────────────────────
  if (has(t, ["office","location","address","showroom","kahan ho","kahan hain","ghar kahan","office kahan"])) {
    return `📍 **JK Interior – ऑफिस**\n\nहमारा ऑफिस **फोर्बेसगंज, अररिया, बिहार** में है।\n\n✅ लेकिन हम आपके **घर आकर FREE Site Visit** करते हैं — आपको आने की ज़रूरत ही नहीं!\n\n📞 **+91 8541849118**`
  }

  // ── Services list query ───────────────────────────────────────────────────
  if (has(t, ["kya kya service","kya service","kaun kaun si service","services kya","kya kya kaam","kya kya milega","kaun si service","services list","aap kya kya","kya kya hai","kya kya karte"])) {
    return `🏠 **JK Interior – हमारी सर्विस**\n\n✨ Gypsum False Ceiling\n🏠 PVC False Ceiling\n🪵 WPC Wall Panel\n💎 UV Marble Sheet\n📺 Modular TV Unit\n🏛️ Fluted Panel\n🏢 Grid Ceiling (ऑफिस के लिए)\n🍳 Modular Kitchen\n🚪 Custom Wardrobe\n💡 LED Cove Light\n\nकिसी भी सर्विस का रेट या estimate चाहिए? बस बताइए! 😊\n📞 +91 8541849118`
  }

  // ── Complete/full home interior ───────────────────────────────────────────
  if (has(t, ["complete interior","full interior","poora ghar","pura ghar","2bhk","3bhk","flat interior","ghar banana","ghar design","full home","complete home"])) {
    return `🏠 **Complete Home Interior Package**\n\nहम पूरे घर का इंटीरियर करते हैं:\n✅ हर कमरे की Ceiling (Gypsum/PVC)\n✅ TV वॉल + Accent Wall (WPC/Fluted)\n✅ Modular Kitchen\n✅ Wardrobe\n✅ पूरे घर में LED लाइटिंग\n\n💰 **2BHK का अंदाज़न खर्च:** ₹2,50,000 – ₹5,00,000\n💰 **3BHK का अंदाज़न खर्च:** ₹4,00,000 – ₹8,00,000\n*(मटेरियल और डिज़ाइन पर निर्भर करता है)*\n\n📞 Free Site Visit के लिए: **+91 8541849118**`
  }

  // ── Budget queries ────────────────────────────────────────────────────────
  if (/(?:lakh|lac\b|hazar|hajar)/.test(t) && /(?:mein|budget|kya|hoga|milega|ho\s*sakta|kaafi)/.test(t)) {
    const budgetAmt = extractBudgetAmount(t)
    if (budgetAmt) {
      const num = parseFloat(budgetAmt.replace(/[₹k,]/g, "")) * (budgetAmt.includes("k") ? 1000 : 1)
      if (num < 30000) return `${budgetAmt} के बजट में 1 कमरे की PVC Ceiling आराम से लग जाएगी (₹75–150/sq.ft)।\n\nरूम का साइज़ बताइए!`
      if (num < 80000) return `${budgetAmt} में 1-2 कमरों का Ceiling का काम हो जाएगा।\n\nसबसे अच्छा कॉम्बो: हॉल में Gypsum + किचन-बाथरूम में PVC\n\nकमरे बताइए — estimate निकालते हैं!`
      if (num < 150000) return `${budgetAmt} में 2BHK की पूरी Ceiling + 1 WPC Accent Wall हो सकती है।\n\nकमरों की डिटेल बता दीजिए!`
      return `${budgetAmt} के बजट में प्रीमियम 2BHK इंटीरियर बन सकता है:\n✅ Cove Light के साथ Gypsum\n✅ WPC TV वॉल\n✅ UV Marble बाथरूम\n\nFree Site Visit बुक करें: **+91 8541849118**`
    }
  }

  // ── Price/rate general query ──────────────────────────────────────────────
  if (has(t, ["price","cost","rate","kimat","daam","kitna","kharcha","budget","quote","paisa","rupaye","rupees"])) {
    if (lead?.service) {
      const svcL = lead.service.toLowerCase()
      if (svcL.includes("pvc")) return `🏠 **PVC Ceiling का रेट: ₹75–150 / sq.ft**\n\nरूम का साइज़ बताइए — exact टोटल निकाल देता हूं! (जैसे 12×14)`
      if (svcL.includes("gypsum")) return `✨ **Gypsum Ceiling का रेट: ₹75–210 / sq.ft**\n\nरूम का साइज़ बताइए — exact टोटल निकाल देता हूं! (जैसे 12×14)`
      if (svcL.includes("wpc")) return `🪵 **WPC Panel का रेट: ₹180–650 / sq.ft**\n\nवॉल का साइज़ बताइए — exact estimate निकाल देता हूं!`
    }
    return `💰 **JK Interior – रेट लिस्ट**\n\n✨ Gypsum Ceiling    ₹75–₹210 / sq.ft\n🏠 PVC Ceiling       ₹75–₹150 / sq.ft\n🪵 WPC Wall Panel   ₹180–₹650 / sq.ft\n💎 UV Marble Sheet  ₹45–₹120 / sq.ft\n📺 Modular TV Unit   ₹15,000+\n🏛️ Fluted Panel     ₹200–₹500 / sq.ft\n🍳 Modular Kitchen   ₹60,000+\n🚪 Custom Wardrobe   ₹800/sq.ft+\n\nकिसी खास चीज़ का रेट चाहिए? या रूम का साइज़ बताइए — exact estimate निकाल देता हूं!`
  }

  // ── Visit / booking ───────────────────────────────────────────────────────
  if (has(t, ["visit","book","site visit","measurement","quotation","bulao","aao","free visit","aana","aaye","bhejo"])) {
    if (lead?.phone) {
      return `📅 **Site Visit बुक हो गई!**\n\n✅ हमारा एक्सपर्ट जल्दी ही आपके घर आएगा।\n📞 +91 8541849118`
    }
    return `📅 **Site Visit बुक करें** – कोई छुपा हुआ खर्च नहीं!\n\nबुक करने के लिए अपना नाम बता दीजिए 😊`
  }

  // ── City mentioned ────────────────────────────────────────────────────────
  const cityMentioned = detectCity(t)
  if (cityMentioned) {
    const svc = lead?.service?.toLowerCase() || ""
    if (has(t, ["pvc"]) || svc.includes("pvc")) {
      return `✅ ${cityMentioned} में PVC Ceiling का काम होता है! 💪\n\n💰 रेट: ₹75–150 / sq.ft | पानी का असर नहीं ✅\n\nरूम का साइज़ बताइए — exact estimate निकालते हैं 📐`
    }
    if (has(t, ["gypsum","false ceiling"]) || svc.includes("gypsum")) {
      return `✅ ${cityMentioned} में Gypsum False Ceiling बनाते हैं! ✨\n\n💰 रेट: ₹75–210 / sq.ft | प्रीमियम लुक ✅\n\nरूम का साइज़ बताइए — exact estimate निकालते हैं 📐`
    }
    if (has(t, ["wpc","wall panel"]) || svc.includes("wpc")) {
      return `✅ ${cityMentioned} में WPC Wall Panel भी लगाते हैं! 🪵\n\n💰 रेट: ₹180–650 / sq.ft | पानी का असर नहीं ✅\n\nवॉल का साइज़ बताइए — exact estimate निकालते हैं 📐`
    }
    if (lead?.service) {
      return `✅ ${cityMentioned} में **${lead.service}** का काम होता है! 💪\n\nरूम का साइज़ बताइए — exact estimate निकालते हैं! 📐\n📞 +91 8541849118`
    }
    return `✅ ${cityMentioned} में JK Interior की सर्विस उपलब्ध है! 💪\n\n🏠 PVC | ✨ Gypsum | 🪵 WPC | 💎 UV Marble | 📺 TV Unit\n\n📞 Free Site Visit: **+91 8541849118**`
  }

  // ── Short affirmative ─────────────────────────────────────────────────────
  if (/^(haan|ha|ok|okay|theek|theek\s*hai|bilkul|zaroor|sure|yes|yep|hmm|accha|acha)$/i.test(t)) {
    if (lead?.service) return `हां भाई! ${lead.service} के बारे में क्या जानना चाहते हैं?\n\n✅ रेट चाहिए?\n✅ रूम का estimate?\n✅ Free Site Visit बुक करनी है?`
    return `बताइए — मैं आपकी मदद के लिए यहीं हूं! 😊\n\nक्या जानना चाहते हैं:\n✅ किसी मटेरियल का रेट\n✅ रूम का estimate\n✅ डिज़ाइन आइडिया`
  }

  // ── Short rejection ───────────────────────────────────────────────────────
  if (/^(nahi|nahi\s*ji|nope|no|na|nahin)$/i.test(t)) {
    return `कोई बात नहीं! 😊 कुछ और पूछना हो तो बताइए।\n\nमैं यहीं हूं — Gypsum, PVC, WPC, रेट, या कोई भी सवाल! 🙏`
  }

  // ── Design / trends ───────────────────────────────────────────────────────
  if (has(t, ["design","idea","color","colour","rang","trend","2025","2026","latest","modern","style","look","beautiful","sundar","khubsurat"])) {
    return `🎨 **2025–26 के इंटीरियर ट्रेंड**\n\n✅ **Fluted/Louver Panel** — TV वॉल पर सबसे ज़्यादा पसंद किया जा रहा है\n✅ **Cove Light** (Gypsum Ceiling + LED Strip)\n✅ **WPC वुडन फिनिश** — बेडरूम की Accent Wall के लिए\n✅ **UV Marble** — बाथरूम की स्टेटमेंट वॉल के लिए\n✅ **हल्के मिट्टी वाले रंग** — बेज, टेराकोटा, सेज ग्रीन\n\nकिस कमरे के लिए डिज़ाइन चाहिए? हॉल, बेडरूम, बाथरूम?\n\n📞 Free Consultation: **+91 8541849118**`
  }

  // ── Comparison ────────────────────────────────────────────────────────────
  if (/(?:better|behtar|acha|sahi|difference|fark|antar|vs|versus|ya)/.test(t) && /(?:gypsum|pvc|wpc|uv|marble|ceiling|panel)/.test(t)) {
    return `⚖️ जल्दी में तुलना:\n\n🏆 **हॉल/ड्रॉइंग रूम** → Gypsum (प्रीमियम लुक, LED Cove)\n🏆 **किचन/बाथरूम** → PVC (100% पानी का असर नहीं)\n🏆 **TV वॉल/बेडरूम** → WPC Panel (लकड़ी जैसा लग्ज़री फील)\n🏆 **बाथरूम की दीवार** → UV Marble Sheet\n\nकिस कमरे के लिए सोच रहे हैं? मैं एक्ज़ैक्ट सुझाव दे दूंगा! 😊`
  }

  // ── Estimate without dimensions ───────────────────────────────────────────
  if (has(t, ["estimate","quotation","quote","total","kitna aayega","kitna lagega","total cost","kitne ka","kitna hoga"])) {
    const svcName = lead?.service || "ceiling/interior"
    return `📐 **${nm ? nm + " जी, आपके " : "आपके "}${svcName} का estimate निकालते हैं!**\n\nबस रूम का साइज़ बता दीजिए:\n\nजैसे: **12×14** या **15 फुट by 12 फुट**\n\nमैं तुरंत निकाल कर बता देता हूं! ✨`
  }

  // ── Smart contextual fallback ─────────────────────────────────────────────
  const prevTopic = lead?.service
  const isGeneralQuery = has(t, ["service","kya","kaun","kya kya","batao","bolo","list","sab","poori"])
  if (prevTopic && !isGeneralQuery) {
    return `${nm ? nm + " जी, " : ""}**${prevTopic}** के बारे में और कुछ जानना चाहते हैं?\n\n✅ रेट चाहिए?\n✅ रूम का estimate?\n✅ Free Site Visit बुक करनी है?\n\nबस बताइए! 😊`
  }

  // ── Last resort ───────────────────────────────────────────────────────────
  return `आपका सवाल पूरी तरह समझ नहीं आया — थोड़ा और साफ़ बता दीजिए! 😊\n\nमैं इन चीज़ों में मदद कर सकता हूं:\n✅ Ceiling का रेट (PVC / Gypsum)\n✅ Wall Panel (WPC / Fluted / UV Marble)\n✅ TV Unit / Kitchen / Wardrobe\n✅ रूम का estimate\n\nक्या जानना है? 🙏`
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

// These two are always pinned as the first chips in the strip
const PINNED_QUICK_ACTIONS = ["📂 डिज़ाइन देखें", "✨ Free Site Visit बुक करें"] as const

function getContextualQuickReplies(
  hasLead: boolean,
  hasEstimate: boolean,
  lastBotText: string,
  lastTopic: string | null,
): string[] {
  let contextual: string[]
  if (hasEstimate) contextual = ["LED लाइटिंग जोड़ें", "रंग के आइडिया", "एक्सपर्ट को कॉल करें"]
  else if (hasLead) {
    if (lastTopic?.includes("pvc"))      contextual = ["कोटेशन चाहिए", "PVC vs Gypsum", "WPC Panel"]
    else if (lastTopic?.includes("gypsum"))   contextual = ["Cove Light जोड़ें", "PVC vs Gypsum", "मेंटेनेंस टिप्स"]
    else if (lastTopic?.includes("wpc"))      contextual = ["कोटेशन चाहिए", "WPC vs UV Marble", "रंग के आइडिया"]
    else if (lastTopic?.includes("uv"))       contextual = ["कोटेशन चाहिए", "UV Marble की देखभाल", "बाथरूम डिज़ाइन"]
    else if (lastTopic?.includes("tv"))       contextual = ["LED Backlight जोड़ें", "कोटेशन चाहिए", "WPC Panel"]
    else if (lastTopic?.includes("color"))    contextual = ["हॉल के रंग", "बेडरूम के रंग", "WPC Panel"]
    else if (lastTopic?.includes("trend"))    contextual = ["Fluted Panel", "Gypsum Ceiling", "WPC TV वॉल"]
    else if (lastTopic?.includes("acoustic")) contextual = ["Home Theatre", "कोटेशन चाहिए", "Flooring"]
    else if (lastTopic?.includes("floor"))    contextual = ["Laminate का रेट", "Vinyl का रेट", "Complete Package"]
    else                                      contextual = ["Estimate चाहिए", "रंग के आइडिया", "नए ट्रेंड"]
  } else {
    contextual = [...INITIAL_QUICK_REPLIES.slice(0, 3), "2026 के ट्रेंड"]
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
const ISparkle = () => (<svg viewBox="0 0 24 24" className="h-3 w-3 fill-current"><path d="M12 2l1.8 5.4L19.2 6l-4.2 3.6L16.8 15 12 11.4 7.2 15l1.8-5.4L4.8 6l5.4 1.4z"/></svg>)

// JK Interior AI Assistant logo — sparkle cluster used everywhere the bot avatar appears
const IAssistantLogo = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 3.2c.5 2.7 1.1 4.4 2 5.3.9.9 2.6 1.5 5.3 2-2.7.5-4.4 1.1-5.3 2-.9.9-1.5 2.6-2 5.3-.5-2.7-1.1-4.4-2-5.3-.9-.9-2.6-1.5-5.3-2 2.7-.5 4.4-1.1 5.3-2 .9-.9 1.5-2.6 2-5.3z"/>
    <path d="M19 2.4c.24 1.13.53 1.86.9 2.24.38.37 1.11.66 2.24.9-1.13.24-1.86.53-2.24.9-.37.38-.66 1.11-.9 2.24-.24-1.13-.53-1.86-.9-2.24-.38-.37-1.11-.66-2.24-.9 1.13-.24 1.86-.53 2.24-.9.37-.38.66-1.11.9-2.24z" opacity="0.75"/>
  </svg>
)

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
      <IAssistantLogo className="h-3 w-3 text-white" />
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
    { label: "👤 नाम",     value: data.name },
    { label: "📱 फोन",     value: data.phone },
    { label: "📍 शहर",     value: data.city       || "—" },
    { label: "🔧 सर्विस",  value: data.service    || "—" },
    ...(data.estimate     ? [{ label: "💰 Estimate",  value: data.estimate }]     : []),
    ...(data.preferredTime ? [{ label: "📅 Visit",     value: data.preferredTime }] : []),
  ]
  const d  = new Date(data.timestamp)
  const ts = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`
  const waMsg = [`🏠 JK Interior Inquiry`,`👤 ${data.name}`,`📱 ${data.phone}`,data.city && `📍 ${data.city}`,data.service && `🔧 ${data.service}`,data.estimate && `💰 Estimate: ${data.estimate}`,data.preferredTime && `📅 Visit: ${data.preferredTime}`,"\nFree Site Visit confirm kar dijiye! 🙏"].filter(Boolean).join("\n")
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`
  const bookHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`नमस्ते JK Interior! मैं ${data.name} हूं${data.city ? ` (${data.city})` : ""}। Free Site Visit बुक करना चाहता/चाहती हूं${data.preferredTime ? ` — ${data.preferredTime}` : ""}। कृपया कन्फर्म करें! 🙏`)}`
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-bl-sm overflow-hidden border border-emerald-200 shadow-lg bg-white">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-2">
        <span className="text-lg shrink-0">🎉</span>
        <div className="min-w-0"><p className="text-[11px] md:text-xs font-bold text-white leading-tight">बुकिंग कन्फर्म हो गई!</p><p className="text-[9px] md:text-[10px] text-white/70">{ts}</p></div>
      </div>
      <div className="px-3 md:px-4 py-2 md:py-2.5 space-y-1.5">
        {rows.map(r => (<div key={r.label} className="flex items-start gap-2 text-[11px] md:text-xs"><span className="text-gray-500 shrink-0 w-16 md:w-20 text-[10px] md:text-[11px] font-medium">{r.label}</span><span className="font-semibold break-all text-[11px] md:text-[12px] text-gray-800 flex-1">{r.value}</span></div>))}
      </div>
      <div className="px-3 md:px-4 pb-3 md:pb-3.5 pt-1 md:pt-1.5 space-y-2">
        <p className="text-[10px] md:text-[11px] text-emerald-700 font-semibold text-center bg-emerald-50 rounded-lg py-1.5">✅ हमारी टीम जल्दी ही आपसे बात करेगी!</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2 md:py-2.5 text-[10px] md:text-[11px] font-bold text-white hover:opacity-90 transition-all"><IWA /> WhatsApp</a>
          <a href={bookHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-700 py-2 md:py-2.5 text-[10px] md:text-[11px] font-bold text-white hover:bg-emerald-600 transition-all"><ICal /> Visit बुक करें</a>
        </div>
      </div>
    </motion.div>
  )
}

const WELCOME_MSG = mk(
  "bot",
  "नमस्ते 😊\n\nमैं **JK Interior AI Assistant** हूं।\n\nGypsum Ceiling, PVC, WPC Wall Panel, TV Unit, लाइटिंग या रूम डिज़ाइन के बारे में कुछ भी पूछ सकते हैं।\n\n📐 रूम का साइज़ बता दीजिए (जैसे 12×10) — मैं तुरंत estimate और सबसे सही सुझाव बता देता हूं ✨"
)

// ── Main Component ────────────────────────────────────────────────────────────
// NOTE: The large WhatsApp and Call buttons visible below the chat are rendered
// in the PARENT PAGE (not here). Remove them from your page layout/component.
// Example: Delete any <a href="https://wa.me/..."> and <a href="tel:..."> buttons
// that appear outside this JKChat component in your page JSX.
export default function JKChat() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
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

  // ── Handle chat opening — instant load, no waiting screen ──────────────
  useEffect(() => {
    if (open) {
      // Show content immediately; tiny frame delay just to let paint flush
      const timer = setTimeout(() => setIsInitializing(false), 80)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [open])

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

  useEffect(() => {
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback
    if (ric) {
      ric(() => setMounted(true), { timeout: 2000 })
      return undefined
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

    
    // ✅ Service save (only if not already known)
    if (serviceFromMsg && !lead?.service) {
      const updLead = { ...(lead || {}), service: serviceFromMsg }
      setLead(updLead)
      persist(updLead, serviceFromMsg.toLowerCase().replace(/\s+/g, "-"))
      setLastTopic(serviceFromMsg.toLowerCase().replace(/\s+/g, "-"))
    }

// ✅ Dimensions मिले तो हमेशा estimate nikalo — collectStep ignore karo
if (dims) {
  try {
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
  } finally {
    setTyping(false)
    sendLock.current = false
  }
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
      collReply = `आपका नाम ठीक से नहीं मिला। कृपया सिर्फ अपना नाम लिखिए (जैसे: राहुल, प्रिया) 😊`
    } else {
      const updated = { ...(lead || {}), name }
      setLead(updated); persist(updated, lastTopic)
      setCollectStep("phone")
      collReply = `${name} जी, अपना WhatsApp नंबर बता दीजिए 📱`
    }
  } else if (collectStep === "phone") {
    const phone = tryExtractPhone(text)
    if (!phone) collReply = `कृपया 10 डिजिट का सही मोबाइल नंबर लिखिए 📱`
    else {
      const city = detectCity(tLower) || lead?.city
      const updated = { ...(lead || {}), phone, city: city || undefined }
      setLead(updated); persist(updated, lastTopic)
      if (city) { setCollectStep("time"); collReply = `नंबर सेव हो गया! 📱 Site Visit के लिए कौन सा दिन और समय ठीक रहेगा?` }
      else { setCollectStep("city"); collReply = `शुक्रिया! आप किस शहर में हैं? (अररिया, फोर्बेसगंज, पूर्णिया, आदि)` }
    }
  } else if (collectStep === "city") {
    const city = detectCity(tLower) || (text.trim().length > 2 ? text.trim() : null)
    if (!city) collReply = `कृपया अपने शहर का नाम बता दीजिए।`
    else {
      const updated = { ...(lead || {}), city }
      setLead(updated); persist(updated, lastTopic)
      setCollectStep("time")
      collReply = `${city} – बढ़िया! 📍 Site Visit के लिए कौन सा दिन और समय ठीक रहेगा?`
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
    historyRef.current = [...historyRef.current, { role: "assistant", content: "बुकिंग कन्फर्म हो गई! हमारी टीम जल्दी ही आपसे बात करेगी।" }]
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
        startMsg = `${updatedLead.name} जी, कब आना चाहेंगे? (दिन और समय बता दीजिए) 📅`
        setCollectStep("time")
      } else if (updatedLead?.name) {
        startMsg = `${updatedLead.name} जी! Free Site Visit के लिए आपका WhatsApp नंबर चाहिए 📱`
        setCollectStep("phone")
      } else {
        startMsg = `Free Site Visit बुक करने के लिए, पहले अपना नाम बता दीजिए 😊`
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
  const statusText = offHours ? "सुबह 9 बजे से उपलब्ध" : "अभी ऑनलाइन • कुछ ही सेकंड में जवाब"

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

      {/* ── Floating Button — Modern AI Chat Bubble ────────────────────────── */}
      {!open && (
        <motion.button
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 340, damping: 22 }}
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 z-50 md:bottom-24 md:right-6"
          style={{ width: 62, height: 62 }}
          aria-label="Open chat with JK Interior AI Assistant"
        >
          {/* Soft ambient glow */}
          <span
            className="absolute -inset-2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(16,185,129,0.28) 0%, transparent 70%)",
              animation: "jk-ring 2.8s ease-out infinite",
            }}
          />

          {/* Main pill — rich teal-to-emerald gradient */}
          <span
            className="absolute inset-0 rounded-[20px] shadow-[0_8px_28px_rgba(16,185,129,0.45)]"
            style={{
              background: "linear-gradient(140deg, #0d9f72 0%, #059669 45%, #047857 100%)",
            }}
          />

          {/* Subtle inner shimmer */}
          <span
            className="absolute inset-0 rounded-[20px] opacity-40"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 55%)",
            }}
          />

          {/* Chat bubble icon */}
          <span className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }} aria-hidden="true">
              {/* Chat bubble body */}
              <rect x="4" y="6" width="32" height="22" rx="8" fill="white" opacity="0.95"/>
              {/* Bubble tail */}
              <path d="M10 28 L7 34 L17 29" fill="white" opacity="0.95"/>
              {/* Three dots inside */}
              <circle cx="13" cy="17" r="2.4" fill="#059669"/>
              <circle cx="20" cy="17" r="2.4" fill="#059669"/>
              <circle cx="27" cy="17" r="2.4" fill="#059669"/>
              {/* Sparkle top-right */}
              <path d="M31 5 L32 8 L35 9 L32 10 L31 13 L30 10 L27 9 L30 8Z" fill="white" opacity="0.85"/>
            </svg>
          </span>

          {/* "AI" label pill at top-right */}
          <span className="absolute -top-1.5 -right-1 flex items-center gap-0.5 rounded-full bg-white px-1.5 py-0.5 text-[8px] font-black text-emerald-700 shadow-lg z-20 leading-none">
            <ISparkle />AI
          </span>
        </motion.button>
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
            <div className="flex shrink-0 items-center justify-between px-4 py-2.5 md:px-5 md:py-3 bg-gradient-to-r from-[#0f2f2a] via-[#11453d] to-[#1f6f61] text-white">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="relative flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/30 shrink-0">
                  <IAssistantLogo className="h-4 w-4 md:h-[18px] md:w-[18px] text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-300 border-2 border-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-bold leading-tight truncate">JK Interior AI Assistant</p>
                  <p className="text-[10px] text-white/70 font-medium">{statusText}</p>
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
                  title="चैट साफ़ करें"
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 text-white/70 hover:text-white text-[11px] font-bold transition-colors"
                >↺</button>
                <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"><IClose /></button>
              </div>
            </div>

            {aiMode && (
              <div className="shrink-0 flex items-center gap-2 px-3 md:px-4 py-1.5 bg-emerald-50 border-b border-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <p className="text-[9px] md:text-[10px] text-emerald-700 font-medium">AI से चलता है + तुरंत Estimate</p>
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
                  <p className="text-[10px] text-red-600 font-semibold">आप बोलिए... (सुन रहा हूं 👂)</p>
                  <button
                    onClick={toggleVoice}
                    className="ml-auto text-[9px] text-red-500 font-bold border border-red-300 rounded-full px-2 py-0.5 hover:bg-red-100"
                  >रोक दें</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading Screen */}
            <AnimatePresence>
              {isInitializing && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50"
                >
                  {/* Animated greeting */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="flex flex-col items-center gap-4"
                  >
                    {/* Animated avatar */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg"
                    >
                      <IAssistantLogo className="h-7 w-7 md:h-9 md:w-9 text-white" />
                    </motion.div>

                    {/* Loading text */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-center"
                    >
                      <h2 className="text-lg md:text-xl font-bold text-emerald-900">JK Interior AI Assistant</h2>
                      <p className="text-xs md:text-sm text-emerald-600 mt-1">आपकी बात शुरू करने की तैयारी हो रही है</p>
                    </motion.div>

                    {/* Animated dots */}
                    <motion.div className="flex gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          className="h-2 w-2 rounded-full bg-emerald-600"
                        />
                      ))}
                    </motion.div>
                  </motion.div>
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
                    <div className="shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                      <IAssistantLogo className="h-3 w-3 text-white" />
                    </div>
                  )}
                  {m.role === "bot" && m.kind === "card" && <div className="h-6 w-6 shrink-0" />}

                  {m.kind === "card" && m.cardData ? (
                    <LeadConfirmCard data={m.cardData} />
                  ) : (
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] whitespace-pre-line rounded-2xl px-3 md:px-4 py-2 md:py-2.5 text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed shadow-sm ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-[#1b5c52] to-[#2f8a7a] text-white rounded-br-md break-words shadow-[0_8px_24px_rgba(31,111,97,0.22)]"
                          : "bg-white/95 text-slate-700 rounded-bl-md border border-slate-200/80 break-words shadow-[0_8px_20px_rgba(15,23,42,0.08)]"
                      }`}
                    >
                      <RichText text={m.text} />
                      {(m as any).galleryType && (
                        <div className="mt-2 md:mt-3 flex gap-2 md:gap-3 overflow-x-auto pb-1.5">
                          {galleryImages
                            .filter(img => img.category === (m as any).galleryType)
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
                onClick={() => send("📂 डिज़ाइन देखें")}
                disabled={typing}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-gradient-to-r from-emerald-50 to-emerald-100 px-3 py-2 text-[11px] md:text-[12px] font-semibold text-emerald-800 shadow-sm hover:from-emerald-100 hover:to-emerald-200 hover:shadow-md active:scale-95 transition-all disabled:opacity-40 whitespace-nowrap min-w-[140px]"
              >
                <span className="text-base leading-none">📂</span>
                <span>डिज़ाइन देखें</span>
              </button>
              <button
                onClick={() => send("✨ Free Site Visit बुक करें")}
                disabled={typing}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-600 bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 py-2 text-[11px] md:text-[12px] font-semibold text-white shadow-sm hover:from-emerald-500 hover:to-emerald-400 hover:shadow-md active:scale-95 transition-all disabled:opacity-40 whitespace-nowrap min-w-[140px]"
              >
                <span className="text-base leading-none">✨</span>
                <span>Site Visit बुक करें</span>
              </button>
            </div>

            {/* ── Contextual Quick Reply Chips ── */}
            <div className="shrink-0 flex gap-2 overflow-x-auto px-3 md:px-4 pb-[max(10px,env(safe-area-inset-bottom))] bg-white/80 scrollbar-luxury">
              {qrSet.filter(q => !["📂 डिज़ाइन देखें", "✨ Free Site Visit बुक करें"].includes(q)).map(q => (
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
                    ? "bg-emerald-100 border border-emerald-400 text-emerald-800 hover:bg-emerald-200"
                    : "bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed"
                }`}
                title={isListening ? "रिकॉर्ड हो रहा है... रोकने के लिए दबाएं" : voiceSupported ? "बोल कर टाइप करें" : "Voice यहां सपोर्ट नहीं करता"}
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
                placeholder={isListening ? "सुन रहा हूं... बोलिए" : "डिज़ाइन, रेट या Site Visit के बारे में पूछें..."}
                className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-colors"
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


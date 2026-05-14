/**
 * JK Interior — Consultant Engine v4.0
 * ─────────────────────────────────────
 * Production-grade AI consultant logic.
 *
 * Architecture:
 *  1. Types & Constants
 *  2. Normalizer        — typo/spelling fix before any processing
 *  3. Service resolver  — single helper: text → context fallback
 *  4. Detectors         — city, service, room, intent, budget
 *  5. Recommender       — material recommendation by room + budget
 *  6. Responders        — one function per intent (clean, reusable)
 *  7. Context Resolver  — follow-up awareness
 *  8. Main Engine       — orchestrates everything
 *  9. Quick Replies     — context-aware chip generator
 */

import {
  SERVICE_CATALOG,
  COMPARISONS,
  FAQ,
  formatPriceEstimate,
  parseMultiRoomQuery,
  generateMultiRoomEstimate,
} from "./business-data"

// ─────────────────────────────────────────────────────────────────────────────
// 1. TYPES & CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

export type Intent =
  | "greeting" | "thanks" | "complaint" | "booking" | "call-request"
  | "comparison" | "pricing" | "room-estimate" | "waterproof" | "design"
  | "installation" | "budget" | "negotiation" | "confused" | "image-reference"
  | "quality" | "area" | "service-info" | "general"

export interface ConversationContext {
  name?: string
  phone?: string
  city?: string
  service?: string
  budget?: "low" | "mid" | "high" | null
  roomType?: string
  roomSize?: string
  lastTopic?: string
  lastIntent?: Intent
  estimateGiven?: string
  messagesExchanged: number
  askedSize?: boolean
}

export interface LeadCard {
  name: string
  phone: string
  city?: string
  service?: string
  estimate?: string
  preferredTime?: string
  timestamp: string
}

const WA = "+91 8651070831"

const ALL_AREAS = [
  "Forbesganj", "Araria", "Jogbani", "Raniganj", "Narpatganj",
  "Kursakanta", "Tribeniganj", "Chhatapur", "Supaul", "Purnia",
]

const CITY_MAP: Record<string, string> = {
  forbesganj: "Forbesganj", farbisganj: "Forbesganj", forbesgunj: "Forbesganj",
  araria: "Araria", arariya: "Araria",
  purnia: "Purnia", purnea: "Purnia",
  kishanganj: "Kishanganj", katihar: "Katihar",
  narpatganj: "Narpatganj", narpatgang: "Narpatganj",
  raniganj: "Raniganj", jogbani: "Jogbani",
  supaul: "Supaul", chhatapur: "Chhatapur", tribeniganj: "Tribeniganj",
  bhargama: "Bhargama", palasi: "Palasi", kursakanta: "Kursakanta",
  patna: "Patna", muzaffarpur: "Muzaffarpur", bhagalpur: "Bhagalpur",
  darbhanga: "Darbhanga", gaya: "Gaya",
}

// ── Dimension regex — handles 10x12, 10×12, 10 by 12, 10X12
const DIM_REGEX = /(\d{1,3})\s*(?:[x×X]|by)\s*(\d{1,3})/i

// ── Derive PRICE_MAP from SERVICE_CATALOG (single source of truth)
const PRICE_MAP: Record<string, { range: string; premium?: string }> = Object.fromEntries(
  SERVICE_CATALOG.map(s => [s.key, { range: s.priceRange }])
)
// Extra premium annotations
PRICE_MAP.gypsum = { range: "₹80–140/sq.ft", premium: "₹120–200/sq.ft (with LED cove)" }
PRICE_MAP.pvc    = { range: "₹60–120/sq.ft", premium: "₹90–150/sq.ft (designer textures)" }
PRICE_MAP.wpc    = { range: "₹180–450/sq.ft", premium: "₹350–600/sq.ft (premium fluted)" }

// ── Service name display map
const SERVICE_NAME: Record<string, string> = {
  pvc:    "PVC Ceiling",
  gypsum: "Gypsum Ceiling",
  wpc:    "WPC Wall Panels",
  uv:     "UV Marble Sheets",
  grid:   "Grid Ceiling",
  fluted: "Fluted Panels",
  tvunit: "Modular TV Unit",
  acoustic: "Acoustic Panels",
  flooring: "Laminate Flooring",
  grass:  "Artificial Grass",
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. NORMALIZER — fix typos BEFORE any detection
// ─────────────────────────────────────────────────────────────────────────────

export function normalizeTypos(text: string): string {
  return text
    .replace(/\bpri[sz]e[sd]?\b/gi, "price")
    .replace(/\bprizz\b/gi, "price")
    .replace(/\bpri[sc]e\b/gi, "price")
    // Hinglish price signals
    .replace(/\bkitna\s+lagega\b/gi, "price kitna lagega")
    .replace(/\bkitna\s+padega\b/gi, "price kitna padega")
    .replace(/\bkitne\s+mein\b/gi,   "price kitne mein")
    .replace(/\bkitna\s+hai\b/gi,    "price kitna hai")
    .replace(/\bkitna\s+hoga\b/gi,   "price kitna hoga")
    .replace(/\bkya\s+rate\b/gi,     "price rate")
    .replace(/\brate\s+kya\b/gi,     "price rate")
    .replace(/\bkitna\s+paisa\b/gi,  "price kitna paisa")
    // Gypsum typos
    .replace(/\bgyps[ua]n\b/gi, "gypsum")
    .replace(/\bgyps[ma]\b/gi,  "gypsum")
    .replace(/\bgysum\b/gi,     "gypsum")
    .replace(/\bgypzum\b/gi,    "gypsum")
    .replace(/\bjipsum\b/gi,    "gypsum")
    .replace(/\bjisum\b/gi,     "gypsum")
    // PVC typos
    .replace(/\bpv[si]\b/gi, "pvc")
    .replace(/\bpwc\b/gi,    "pvc")
    // WPC typos
    .replace(/\bw[cp][cp]\b/gi, "wpc")
    // Ceiling typos
    .replace(/\bceil+ing\b/gi, "ceiling")
    .replace(/\bce[il]+ng\b/gi, "ceiling")
    .replace(/\bsieling\b/gi,   "ceiling")
    .replace(/\bchath\b/gi,     "ceiling")
    // Room typos
    .replace(/\bbathro[mu]m\b/gi, "bathroom")
    .replace(/\bkitchi[nm]\b/gi,  "kitchen")
    // Modular typos
    .replace(/\bmod[ue]l[ae]r\b/gi, "modular")
    // Greeting normalization
    .replace(/\bkya\s+hal\b/gi,    "kya haal")
    .replace(/\bkaise\s+hain\b/gi, "kaise ho")
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SERVICE KEY RESOLVER — single source, used everywhere
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolves service key from text first, then falls back to context.
 * This allows "kitna lagega?" to auto-use the current service the user is
 * viewing / previously discussed.
 */
export function resolveServiceKey(t: string, ctx: ConversationContext): string {
  // Text-first detection
  if (/\bpvc\b/.test(t))                             return "pvc"
  if (/\bgypsum\b|\bpop\b|\bplaster\b/.test(t))      return "gypsum"
  if (/\bwpc\b|\bwood\s*panel\b|\blouver\b/.test(t)) return "wpc"
  if (/\buv\b|\bmarble\s*sheet\b|\buv\s*marble\b/.test(t)) return "uv"
  if (/\bgrid\b|\boffice\s*ceiling\b/.test(t))       return "grid"
  if (/\bfluted\b|\bribbed\b/.test(t))               return "fluted"
  if (/\btv\s*(unit|panel|wall)\b/.test(t))          return "tvunit"
  if (/\bacoustic\b|\bsoundproof\b/.test(t))         return "acoustic"
  if (/\bflooring\b|\blaminate\b/.test(t))           return "flooring"
  if (/\bgrass\b|\bturf\b/.test(t))                  return "grass"

  // Context fallback — lastTopic takes priority (most recent topic)
  if (ctx.lastTopic) return ctx.lastTopic

  // Parse service name stored in context
  if (ctx.service) {
    const s = ctx.service.toLowerCase()
    if (s.includes("pvc"))     return "pvc"
    if (s.includes("gypsum"))  return "gypsum"
    if (s.includes("wpc"))     return "wpc"
    if (s.includes("uv") || s.includes("marble")) return "uv"
    if (s.includes("grid"))    return "grid"
    if (s.includes("fluted"))  return "fluted"
    if (s.includes("tv"))      return "tvunit"
    if (s.includes("acoustic")) return "acoustic"
    if (s.includes("flooring") || s.includes("laminate")) return "flooring"
  }

  // Room-type based default
  if (ctx.roomType) {
    const r = ctx.roomType.toLowerCase()
    if (r.includes("kitchen") || r.includes("bathroom")) return "pvc"
    if (r.includes("office")) return "grid"
  }

  return "gypsum" // sensible default
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. DETECTORS
// ─────────────────────────────────────────────────────────────────────────────

export function detectCity(text: string): string | null {
  const t = text.toLowerCase().replace(/[^a-z\s]/g, "")
  for (const [key, val] of Object.entries(CITY_MAP)) {
    if (t.includes(key)) return val
  }
  return null
}

const SERVICE_PATTERNS: Array<[RegExp, string, string]> = [
  [/\bpvc\b/,                                                                 "PVC Ceiling",         "pvc"],
  [/\bgypsum\b|\bpop\b|\bplaster\b/,                                          "Gypsum Ceiling",      "gypsum"],
  [/\bwpc\b|\bwood\s*panel\b|\blouver\b/,                                     "WPC Wall Panels",     "wpc"],
  [/\buv\b|\bmarble\s*sheet\b|\buv\s*marble\b/,                               "UV Marble Sheets",    "uv"],
  [/\btv\s*(unit|panel|wall|cabinet)\b|\btelevision\b/,                       "Modular TV Unit",     "tvunit"],
  [/\bfluted\b|\bribbed\b|\b3d\s*panel\b/,                                    "Fluted Panels",       "fluted"],
  [/\bgrid\b|\boffice\s*ceiling\b|\bmineral\s*fiber\b/,                       "Grid Ceiling",        "grid"],
  [/\bacoustic\b|\bsoundproof\b|\becho\b/,                                    "Acoustic Panels",     "acoustic"],
  [/\blaminate\b|\bflooring\b|\bwooden\s*floor\b/,                            "Laminate Flooring",   "flooring"],
  [/\bfalse\s*ceiling\b|\bceiling\b|\bchhat\b/,                               "False Ceiling",       "gypsum"],
  [/\bwall\s*panel\b|\baccent\s*wall\b|\bdeewar\b/,                           "Wall Panels",         "wpc"],
  [/\bcomplete\s*interior\b|\bfull\s*interior\b|\bpoora\s*ghar\b|\bpura\s*ghar\b|\bfull\s*home\b/, "Complete Interior", "interior"],
  [/\bartificial\s*grass\b|\bturf\b/,                                         "Artificial Grass",    "grass"],
  [/\bkitchen\b|\brasoi\b/,                                                   "Kitchen Interior",    "pvc"],
  [/\bbedroom\b|\bkamra\b/,                                                   "Bedroom Interior",    "gypsum"],
  [/\boffice\b/,                                                              "Office Interior",     "grid"],
]

export function detectService(text: string): { name: string; key: string } | null {
  const t = normalizeTypos(text.toLowerCase())
  for (const [pat, name, key] of SERVICE_PATTERNS) {
    if (pat.test(t)) return { name, key }
  }
  return null
}

const ROOM_PATTERNS: Array<[RegExp, string, boolean]> = [
  [/\bhall\b|\bdrawing\s*room\b|\bliving\s*room\b|\bbaithak\b|\bdarbar\b/,  "Hall",       false],
  [/\bbedroom\b|\bbed\s*room\b|\bkamra\b/,                                   "Bedroom",    false],
  [/\bkitchen\b|\brasoi\b/,                                                   "Kitchen",    true],
  [/\bbathroom\b|\btoilet\b|\bwashroom\b|\blatrine\b/,                        "Bathroom",   true],
  [/\boffice\b|\bcabin\b/,                                                    "Office",     false],
  [/\breception\b/,                                                            "Reception",  false],
  [/\bbalcony\b|\bbalkani\b/,                                                 "Balcony",    true],
  [/\bpooja\b|\bmandir\b|\bpuja\b/,                                           "Pooja Room", false],
  [/\bdining\b/,                                                               "Dining",     false],
  [/\bshop\b|\bshowroom\b|\bdukaan\b/,                                        "Shop",       false],
]

export function detectRoomType(text: string): { label: string; isWet: boolean } | null {
  const t = normalizeTypos(text.toLowerCase())
  for (const [pat, label, isWet] of ROOM_PATTERNS) {
    if (pat.test(t)) return { label, isWet }
  }
  return null
}

export function detectBudgetLevel(text: string): "low" | "mid" | "high" | null {
  const t = normalizeTypos(text.toLowerCase())
  if (/\bsasta\b|\bcheap\b|\baffordable\b|\bkam\s*budget\b|\bbudget\s*tight\b|\bminimum\b|\bbasic\b|\blow\s*budget\b/.test(t)) return "low"
  if (/\bpremium\b|\bluxury\b|\bhigh\s*end\b|\bexpensive\b|\bdesigner\b/.test(t)) return "high"
  if (/\bstandard\b|\bmid\b|\bmedium\b|\bnormal\b/.test(t)) return "mid"
  return null
}

// ── Intent keyword groups
const KW: Record<string, string[]> = {
  greeting:    ["hi", "hello", "hey", "namaste", "namaskar", "helo", "good morning", "good evening", "good afternoon", "hy", "hii", "salam", "kaise ho", "kya haal", "how are you", "hlo"],
  thanks:      ["thank", "shukriya", "dhanyawad", "thanks", "thx", "bahut accha", "great", "perfect", "superb", "awesome", "shabash", "badiya", "wah", "bdhiya"],
  complaint:   ["problem", "issue", "complaint", "shikayat", "girna", "toota", "peeling", "leaking", "broken", "repair", "thik karo", "kharab", "nahi chal raha"],
  booking:     ["visit", "book", "site visit", "measurement", "bulao", "aao", "milna", "survey", "appointment", "schedule", "bula lo", "free visit", "aana hai", "book karo", "karwana hai", "shuru karein", "kab aao", "aap aa sakte"],
  waterproof:  ["waterproof", "water proof", "paani", "seepage", "moisture", "humidity", "geela", "nami", "barish", "water resistant", "leak", "bheega"],
  design:      ["design", "modern", "simple", "luxury", "latest", "trending", "beautiful", "sundar", "stylish", "cove", "pop design", "3d", "texture", "look", "style"],
  install:     ["kitne din", "kitna time", "kab tak", "jaldi", "time lagega", "installation", "install", "fitting", "din lagega", "urgent", "kitna samay"],
  budget:      ["kam budget", "budget kam", "sasta", "cheap", "affordable", "low budget", "budget tight", "sasta option", "minimum", "basic", "simple wala", "kam mein"],
  negotiation: ["final rate", "discount", "offer", "chhut", "kam karo", "negotiate", "last price", "best price", "sample", "bharosa", "trust"],
  confused:    ["samajh nahi", "nahi aa raha", "kya sahi", "aap batao", "confused", "pata nahi", "decide nahi", "doubt", "madad", "guide", "suggest karo", "kya lagaun"],
  image:       ["photo", "image", "picture", "pic", "aisa design", "reference", "sample dikha", "pinterest", "instagram"],
  call:        ["call karo", "phone karo", "number do", "call back", "contact karo", "call karein"],
  area:        ["area", "location", "kahan", "serve", "district", "aata hai", "available", "cover", "jila", "service area", "kis city"],
  quality:     ["guarantee", "warranty", "quality", "bharosa", "trust", "kitne saal", "durable", "isi", "certified", "strong", "life", "chalega", "original", "branded", "tikau"],
  pricing:     ["price", "cost", "rate", "kimat", "daam", "kitna", "kharcha", "lagat", "paisa", "quote", "how much", "lagega", "charge", "per sqft", "mahnga", "estimate", "quotation", "labour", "fitting charge", "rupaye", "rs ", "kitne rupaye"],
  service:     ["service", "kya karte", "kya milta", "bataiye", "samjhao", "kya kaam", "kya options"],
}

// Strict comparison — ONLY explicit compare signals
const COMPARE_EXPLICIT = [" vs ", " versus ", " compare ", "difference between", "better than", "konsa better", "kaunsa better", "mein se kaunsa", "ya phir"]
const COMPARE_MATERIAL = [
  /pvc.{0,10}(vs|versus|ya|or|aur).{0,10}gypsum/i,
  /gypsum.{0,10}(vs|versus|ya|or|aur).{0,10}pvc/i,
  /wpc.{0,10}(vs|versus|ya|or|aur).{0,10}(uv|marble)/i,
  /(uv|marble).{0,10}(vs|versus|ya|or|aur).{0,10}wpc/i,
  /pvc.{0,10}(vs|versus|ya|or|aur).{0,10}wpc/i,
  /gypsum.{0,10}(vs|versus|ya|or|aur).{0,10}wpc/i,
]

const has = (t: string, kws: string[]) => kws.some(k => t.includes(k))

export function detectIntent(text: string): Intent {
  const norm = normalizeTypos(text)
  const t = norm.toLowerCase().trim()

  // Greeting & social — short only
  if (has(t, KW.greeting) && t.length < 35)  return "greeting"
  if (has(t, KW.thanks) && t.length < 50)    return "thanks"
  if (has(t, KW.complaint))                  return "complaint"

  // Dimension in text → estimate always
  if (DIM_REGEX.test(t)) return "room-estimate"

  if (has(t, KW.booking))     return "booking"
  if (has(t, KW.call))        return "call-request"

  // Comparison — strict
  const isCompare = COMPARE_EXPLICIT.some(kw => (` ${t} `).includes(kw)) ||
                    COMPARE_MATERIAL.some(pat => pat.test(t))
  if (isCompare) return "comparison"

  if (has(t, KW.waterproof))  return "waterproof"
  if (has(t, KW.install))     return "installation"
  if (has(t, KW.budget))      return "budget"
  if (has(t, KW.negotiation)) return "negotiation"
  if (has(t, KW.confused))    return "confused"
  if (has(t, KW.image))       return "image-reference"
  if (has(t, KW.area))        return "area"
  if (has(t, KW.quality))     return "quality"
  if (has(t, KW.design))      return "design"
  // Pricing — after normalizeTypos converts Hinglish signals
  if (has(t, KW.pricing))     return "pricing"
  if (has(t, KW.service))     return "service-info"

  return "general"
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. RECOMMENDER
// ─────────────────────────────────────────────────────────────────────────────

export function recommendMaterial(
  roomType: string | null,
  isWet: boolean,
  budget: "low" | "mid" | "high" | null
): { primary: string; reason: string; alternative?: string; altReason?: string } {
  if (isWet) return {
    primary: "PVC Ceiling",
    reason: "100% waterproof, zero maintenance, 20+ saal ki life",
    alternative: "UV Marble Sheets",
    altReason: "wall cladding ke liye bhi 100% waterproof",
  }
  if (roomType === "Hall" || roomType === "Dining") {
    return budget === "low"
      ? { primary: "PVC Ceiling", reason: "budget-friendly, waterproof", alternative: "Gypsum Ceiling", altReason: "thoda zyada mein premium cove lighting" }
      : { primary: "Gypsum Ceiling", reason: "premium cove lighting, POP designs — hall ke liye best", alternative: "PVC Ceiling", altReason: "budget-friendly option" }
  }
  if (roomType === "Bedroom") {
    return budget === "low"
      ? { primary: "PVC Ceiling", reason: "affordable, zero maintenance, wood textures available" }
      : { primary: "Gypsum Ceiling", reason: "smooth finish, LED cove — bedroom ke liye elegant", alternative: "PVC Ceiling", altReason: "budget option" }
  }
  if (roomType === "Office" || roomType === "Shop" || roomType === "Reception") {
    return { primary: "Grid Ceiling", reason: "commercial standard, easy maintenance, AC access", alternative: "Gypsum Ceiling", altReason: "premium office look ke liye" }
  }
  return budget === "low"
    ? { primary: "PVC Ceiling", reason: "most affordable, waterproof, zero maintenance" }
    : { primary: "Gypsum Ceiling", reason: "premium look, cove lighting", alternative: "PVC Ceiling", altReason: "budget-friendly waterproof option" }
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. RESPONDERS — one function per intent
// ─────────────────────────────────────────────────────────────────────────────

function r_greeting(ctx: ConversationContext): string {
  const nm = ctx.name ? ` ${ctx.name}` : ""
  const opts = [
    `Namaste${nm}! 😊 Main Riya hoon — JK Interior ki AI consultant.\n\nCeiling, wall panels, TV unit, pricing — kuch bhi poochhein!`,
    `Hello${nm}! 🏠 JK Interior mein swagat hai.\n\nPVC, gypsum, WPC ya room estimate — sab pooch sakte hain!`,
    `Namaste${nm}! Main Riya hoon. 👋\n\nCeiling, wall panel ya full interior — kaunsa kaam karwana chahte hain?`,
  ]
  return pick(opts)
}

function r_thanks(ctx: ConversationContext): string {
  const nm = ctx.name ? ` ${ctx.name}` : ""
  return `Shukriya${nm}! 🙏 Koi sawaal ho toh main yahaan hoon.\n\nFree site visit book karein — **${WA}** 😊`
}

function r_complaint(): string {
  return `Mujhe khed hai. 😔 Detail mein batayein — kya hua, kab hua?\n\nTeam ko abhi inform karti hoon.\n\n📞 Direct: **${WA}**`
}

function r_booking(ctx: ConversationContext, input?: string): string {
  const t = (input || "").toLowerCase()

  // Pricing/material question mixed in — redirect
  if (/price|rate|cost|kitna|estimate|gypsum|pvc|wpc|ceiling|panel/i.test(t)) {
    return r_pricing(t, ctx)
  }

  if (ctx.phone) {
    return `Aapki inquiry note hai! 😊\n\nTeam jald contact karegi. Ya seedha: **${WA}**`
  }
  if (ctx.name) {
    return `${ctx.name} ji 😊\n\nFree site visit ke liye WhatsApp number share karein 📱`
  }
  return `Free site visit bilkul free hai! 😊\n\nAapka naam bata dijiye?`
}

function r_call(): string {
  return isOffHours()
    ? `📞 **${WA}**\n\nAbhi raat ka time hai — team kal 9 AM pe call karegi.\nYa WhatsApp message karein — 24/7 available! 💬`
    : `📞 **Call / WhatsApp: ${WA}**\n\nHamare expert se seedha baat karein!`
}

function r_comparison(t: string): string {
  if ((t.includes("pvc") && t.includes("gypsum")) || /ceiling.{0,20}(vs|versus|compare|differ)/.test(t))
    return COMPARISONS["pvc-vs-gypsum"]
  if (t.includes("wpc") && (t.includes("uv") || t.includes("marble")))
    return COMPARISONS["wpc-vs-uv"]
  if (t.includes("pvc") && t.includes("wpc"))
    return COMPARISONS["pvc-vs-wpc"]
  return `Kya compare karna hai?\n\n🏠 **PVC vs Gypsum** — ceiling ke liye\n🪵 **WPC vs UV Marble** — wall ke liye\n\nBataiye — honest comparison de deta hoon!`
}

function r_pricing(t: string, ctx: ConversationContext): string {
  const dimMatch = DIM_REGEX.exec(t)

  // Has dimensions → give estimate immediately
  if (dimMatch) {
    const l = parseInt(dimMatch[1]), w = parseInt(dimMatch[2])
    const key = resolveServiceKey(t, ctx)
    ctx.roomSize  = `${l}x${w}`
    ctx.lastTopic = key
    return formatPriceEstimate(l, w, key, SERVICE_NAME[key] || "Gypsum Ceiling") +
      `\n\n📞 Exact quote: free site visit — **${WA}**`
  }

  // Specific material requested (from text or context)
  const key = resolveServiceKey(t, ctx)

  // Only show specific service price if something was clearly identified
  const hasSpecific = /\b(pvc|gypsum|wpc|uv|marble|grid|fluted|tvunit|acoustic|flooring|grass)\b/.test(t)
                   || ctx.lastTopic || ctx.service

  if (hasSpecific) {
    const p = PRICE_MAP[key]
    ctx.lastTopic = key
    const name = SERVICE_NAME[key] || key
    const lines = [`**${name}** — ${p?.range || "custom quote"}`]
    if (p?.premium) lines.push(`Premium: ${p.premium}`)

    if (ctx.roomSize) {
      const [l, w] = ctx.roomSize.split("x").map(Number)
      if (l && w) {
        const est = formatPriceEstimate(l, w, key, name)
        return est + `\n\n📞 Exact quote: **${WA}**`
      }
      lines.push(`\nAapne room size ${ctx.roomSize} bataya tha — exact estimate nikaalta hoon!`)
    } else {
      lines.push(`\nRoom ka size bataiye (jaise 12×14) — exact estimate abhi nikaaluun! 📐`)
    }
    return lines.join("\n")
  }

  // Room-context price recommendation
  if (ctx.roomType) {
    const rec = recommendMaterial(ctx.roomType, false, ctx.budget ?? null)
    const recKey = rec.primary.toLowerCase().includes("pvc") ? "pvc"
                 : rec.primary.toLowerCase().includes("gypsum") ? "gypsum"
                 : rec.primary.toLowerCase().includes("grid") ? "grid" : "gypsum"
    return `${ctx.roomType} ke liye **${rec.primary}** — ${PRICE_MAP[recKey]?.range}\n\nRoom ka size bataiye — exact estimate nikaaluun!`
  }

  // Full price list
  return `💰 **JK Interior — Price Guide**

✨ Gypsum Ceiling — ${PRICE_MAP.gypsum.range}
🏠 PVC Ceiling — ${PRICE_MAP.pvc.range}
🪵 WPC Wall Panels — ${PRICE_MAP.wpc.range}
💎 UV Marble Sheets — ${PRICE_MAP.uv?.range}
📺 Modular TV Unit — ${PRICE_MAP.tvunit?.range}
🏛 Fluted Panels — ${PRICE_MAP.fluted?.range}
🏢 Grid Ceiling — ${PRICE_MAP.grid?.range}

Room ka size bataiye — exact estimate abhi nikaaluun! 📐`
}

function r_estimate(t: string, ctx: ConversationContext): string {
  const dimMatch = DIM_REGEX.exec(t)
  if (!dimMatch) return r_pricing(t, ctx)

  const l = parseInt(dimMatch[1]), w = parseInt(dimMatch[2])
  const key = resolveServiceKey(t, ctx)
  ctx.roomSize  = `${l}x${w}`
  ctx.lastTopic = key

  return formatPriceEstimate(l, w, key, SERVICE_NAME[key] || "Gypsum Ceiling") +
    `\n\nExact quote ke liye free site visit — **${WA}** 📞`
}

function r_waterproof(t: string, room: { label: string; isWet: boolean } | null): string {
  const wetRoom = room?.isWet || t.includes("bathroom") || t.includes("kitchen")
  if (wetRoom) {
    const label = t.includes("bathroom") ? "Bathroom" : t.includes("kitchen") ? "Kitchen" : (room?.label || "Is room")
    return `${label} ke liye **PVC Ceiling** (${PRICE_MAP.pvc.range}) — 100% waterproof, 20+ saal ki life. 💧\n\nWalls ke liye **UV Marble Sheets** (${PRICE_MAP.uv?.range}) bhi 100% waterproof!\n\nRoom ka size? Estimate nikaaluun!`
  }
  return `Waterproof ke liye 2 best options:\n\n🏠 **PVC Ceiling** — ${PRICE_MAP.pvc.range}\n💎 **UV Marble Sheets** — ${PRICE_MAP.uv?.range}\n\nDono 100% waterproof! Kaunsi room ke liye?`
}

function r_design(t: string, roomType?: string): string {
  const room = roomType || (
    t.includes("hall")    ? "Hall"    :
    t.includes("bedroom") ? "Bedroom" :
    t.includes("tv")      ? "TV"      :
    t.includes("office")  ? "Office"  : null
  )
  if (room === "Hall" || room === "Dining")
    return `Hall ke liye trending:\n\n✨ **Gypsum cove ceiling** — LED strip ke saath\n🪵 **WPC fluted panels** — TV wall pe 3D look\n💎 **UV marble accent** — premium finish\n\nHall ka size?`
  if (room === "Bedroom")
    return `Bedroom ke liye:\n\n✨ **Gypsum ceiling** — soft cove lighting\n🪵 **WPC headboard wall** — luxury look\n🏠 **PVC ceiling** — budget-friendly\n\nBedroom ka size?`
  if (room === "TV")
    return `TV wall ke liye:\n\n🪵 **WPC fluted panels** — #1 trending 3D look\n📺 **Modular TV unit** — custom + LED backlight\n💎 **UV marble backdrop** — premium low cost\n\nTV wall ka width?`
  if (room === "Office")
    return `Office ke liye:\n\n🏢 **Grid ceiling** — commercial standard\n✨ **Gypsum** — premium reception look\n🪵 **WPC panels** — professional feel\n\nSpace ka size?`
  return `Modern interior ke liye:\n\n✨ Gypsum cove — hall/bedroom\n🪵 WPC fluted — TV wall\n💎 UV marble — bathroom/kitchen\n🏠 PVC — budget, har room\n\nKis room ke liye design chahiye?`
}

function r_installation(t: string): string {
  if (t.includes("pvc"))    return `PVC ceiling — **1 room mein sirf 1 din!** Poore ghar mein 3-4 din. 💨\n\nJaldi start? **${WA}**`
  if (t.includes("gypsum")) return `Gypsum ceiling — **2-3 din/room**, poore ghar mein 5-7 din. ⏱\n\nBook: **${WA}**`
  if (t.includes("wpc"))    return `WPC paneling — **1-2 din/wall**. Minimum disturbance! 🪵\n\nBook: **${WA}**`
  return `Installation time:\n\n🏠 PVC — 1 din/room\n✨ Gypsum — 2-3 din/room\n🪵 WPC — 1-2 din/wall\n💎 UV marble — 1-2 din/room\n\nKaunsa kaam karwana hai?`
}

function r_budget(room: { label: string; isWet: boolean } | null): string {
  if (room?.isWet) return `Budget mein **PVC Ceiling** best — ${PRICE_MAP.pvc.range}, 100% waterproof! ${room.label} ke liye perfect. 💧\n\nRoom ka size?`
  return `Budget-friendly options:\n\n🏠 **PVC Ceiling** — ${PRICE_MAP.pvc.range} (waterproof + zero maintenance)\n💎 **UV Marble** — ${PRICE_MAP.uv?.range} (walls ke liye marble look)\n\nRoom size batao — estimate nikaaluun!`
}

function r_negotiation(t: string): string {
  if (t.includes("discount") || t.includes("offer") || t.includes("kam karo") || t.includes("chhut"))
    return `Already competitive pricing — koi hidden charges nahi! Multiple rooms ek saath → **combo discount** available hai. 💰\n\nFree site visit: **${WA}**`
  return `Bilkul bharosa karein! 🙏\n\n✅ 1 saal ki written warranty\n✅ ISI-certified materials\n✅ 500+ projects, 8+ saal experience\n✅ Kaam se pehle material sample\n\nFree site visit mein sab khud dekh sakte hain!`
}

function r_confused(ctx: ConversationContext, room: { label: string; isWet: boolean } | null): string {
  if (ctx.roomType || room) {
    const rt = ctx.roomType || room!.label
    const rec = recommendMaterial(rt, room?.isWet ?? false, ctx.budget ?? null)
    return `Koi baat nahi! 😊\n\n${rt} ke liye: **${rec.primary}** — ${rec.reason}${rec.alternative ? `\n\nAlternative: **${rec.alternative}** — ${rec.altReason}` : ""}\n\nRoom ka size batao — estimate bhi de deti hoon!`
  }
  return `Koi baat nahi! Main guide karti hoon. 😊\n\n1. Kaunsi room? (Hall, Bedroom, Kitchen, Bathroom)\n2. Budget: basic ya premium?\n\nYeh batao — best option suggest karti hoon!`
}

function r_quality(): string {
  return `JK Interior Quality:\n\n✅ 1 saal ki **written warranty** — koi issue, free repair\n✅ **ISI-certified** branded materials\n✅ 100% waterproof options available\n✅ **8+ saal, 500+ projects**\n\nKaam se pehle material sample dikhaya jaata hai! 🙏`
}

function r_area(t: string, knownCity?: string): string {
  const city = detectCity(t) || knownCity
  if (city) {
    return `📍 **${city}** — haan, hum wahan kaam karte hain! 😊\n\nJK Interior ka base Forbesganj & Araria hai, nearby cities bhi cover hoti hain.\n\nKaunsa kaam karwana hai?`
  }
  return `📍 Main service area: **Forbesganj & Araria**\n\nNearby cities:\nJogbani • Raniganj • Narpatganj • Kursakanta\nTribeniganj • Chhatapur • Supaul • Purnia\n\nAap kis city mein hain? 😊`
}

function r_serviceInfo(): string {
  return `JK Interior ki services:\n\n✨ Gypsum Ceiling — ${PRICE_MAP.gypsum.range}\n🏠 PVC Ceiling — ${PRICE_MAP.pvc.range}\n🪵 WPC Wall Panels — ${PRICE_MAP.wpc.range}\n💎 UV Marble Sheets — ${PRICE_MAP.uv?.range}\n📺 Modular TV Unit — ${PRICE_MAP.tvunit?.range}\n🏛 Fluted Panels — ${PRICE_MAP.fluted?.range}\n🏢 Grid Ceiling — ${PRICE_MAP.grid?.range}\n🌿 Artificial Grass — ${PRICE_MAP["artificial-grass"]?.range}\n\nKis service ke baare mein jaanna hai?`
}

function r_materialDetail(t: string, ctx: ConversationContext): string | null {
  if (t.includes("gypsum")) {
    if (/water|bathroom|nami|moisture|geela/.test(t))
      return `Gypsum waterproof nahi hoti! Bathroom/kitchen ke liye **PVC** best (${PRICE_MAP.pvc.range}).\n\nHall/bedroom ke liye gypsum perfect. Room size?`
    return `**Gypsum Ceiling** — ${PRICE_MAP.gypsum.range}\n\nCove lighting, POP designs, premium smooth finish. Hall aur bedroom ke liye #1 choice!\n\nInstall: 2-3 din/room | Warranty: 1 saal\n\nRoom size bataiye!`
  }
  if (t.includes("pvc"))
    return `**PVC Ceiling** — ${PRICE_MAP.pvc.range}\n\n100% waterproof, termite-proof, 20+ saal ki life. Zero maintenance!\n\nInstall: sirf 1 din/room | Warranty: 1 saal\n\nRoom size?`
  if (t.includes("wpc") || t.includes("wood panel") || t.includes("louver"))
    return `**WPC Wall Panels** — ${PRICE_MAP.wpc.range}\n\nPremium wood look, moisture resistant, zero maintenance. TV wall ke liye #1 choice!\n\nInstall: 1-2 din/wall | Warranty: 1 saal`
  if (/\buv\b|\bmarble\s*sheet\b/.test(t))
    return `**UV Marble Sheets** — ${PRICE_MAP.uv?.range}\n\nReal marble look at 70% less cost! 100% waterproof, scratch resistant.\n\nBathroom, kitchen walls ke liye best. Size bataiye!`
  if (/\btv\s*(unit|panel|wall)\b/.test(t))
    return `**Modular TV Unit** — ${PRICE_MAP.tvunit?.range}\n\nSizes:\n• 6-8 ft: ₹15k–25k\n• 8-10 ft: ₹25k–40k\n• 10-14 ft: ₹40k–70k+\n\nLED lighting bhi add ho sakti hai!`
  if (t.includes("fluted") || t.includes("ribbed") || t.includes("3d panel"))
    return `**Fluted Panels** — ${PRICE_MAP.fluted?.range}\n\n2025-26 ka #1 trending wall design! 3D textured look, modern feel.\n\nWall ka size?`
  if (t.includes("grid") || t.includes("office ceiling"))
    return `**Grid Ceiling** — ${PRICE_MAP.grid?.range}\n\nOffices, shops, hospitals ke liye standard. Easy AC/electrical access.\n\nArea size bataiye!`
  if (t.includes("acoustic") || t.includes("soundproof"))
    return `**Acoustic Panels** — ${PRICE_MAP.acoustic?.range}\n\nEcho kam, sound quality improve. Home theatre, studio, conference room ke liye best!\n\nArea ka size?`
  if (t.includes("flooring") || t.includes("laminate"))
    return `**Laminate Flooring** — ${PRICE_MAP.flooring?.range}\n\nReal wood look, scratch resistant, easy to clean. Bedroom aur living room ke liye.\n\nRoom size?`
  if (t.includes("complete interior") || t.includes("full interior") || t.includes("poora ghar") || t.includes("pura ghar"))
    return `**Complete Interior Package**\n\nFull home: Ceiling + Wall Panels + TV Unit — ek team, ek timeline!\n\n✅ Combo discount available\n✅ 1-year warranty on everything\n✅ 500+ full home projects\n\nFree consultation: **${WA}**`
  if (t.includes("led") || t.includes("cove light") || t.includes("strip light"))
    return `**LED Cove Lighting** (Gypsum ke saath):\n• ₹40–80/running ft\n• TV wall backlight: ₹2,000–₹5,000\n\nRaat mein ghar cinema jaisa! 😍\n\nRoom size bataiye!`
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. CONTEXT RESOLVER — follow-up awareness
// ─────────────────────────────────────────────────────────────────────────────

export function resolveContextualFollowUp(
  input: string,
  ctx: ConversationContext
): string | null {
  const t = normalizeTypos(input.toLowerCase().trim())
  if (t.length > 100) return null

  const prevTopic  = (ctx.lastTopic || "").toLowerCase()
  const prevIntent = ctx.lastIntent

  // "lighting ke saath?" / "led bhi?"
  if (/\b(led|light|cove|strip|backlight)\b/.test(t)) {
    if (prevTopic.includes("gypsum") || ctx.service?.toLowerCase().includes("gypsum")) {
      let ledLine = "Room size batao toh LED ke saath total estimate de deti hoon!"
      if (ctx.roomSize) {
        const [l, w] = ctx.roomSize.split("x").map(Number)
        if (l && w) {
          const perim = 2 * (l + w)
          const lo = Math.round(perim * 40 / 100) * 100
          const hi = Math.round(perim * 80 / 100) * 100
          ledLine = `${ctx.roomSize} room mein roughly ₹${lo.toLocaleString("en-IN")}–₹${hi.toLocaleString("en-IN")} extra.`
        }
      }
      return `Gypsum + LED cove:\n\n✨ **₹40–80/running ft**\n${ledLine}\n\nRaat mein ghar cinema jaisa! 😍`
    }
  }

  // "gypsum wala kitna?" after PVC discussion
  if (/gypsum/.test(t) && prevTopic.includes("pvc") && (prevIntent === "pricing" || prevIntent === "room-estimate")) {
    if (ctx.roomSize) {
      const [l, w] = ctx.roomSize.split("x").map(Number)
      if (l && w) return formatPriceEstimate(l, w, "gypsum", "Gypsum Ceiling") + `\n\n📞 Free site visit: **${WA}**`
    }
    return `Gypsum ceiling — ${PRICE_MAP.gypsum.range} (PVC se thoda premium, cove lighting possible).\n\nRoom size batao!`
  }

  // "pvc wala?" after gypsum discussion
  if (/pvc/.test(t) && prevTopic.includes("gypsum") && (prevIntent === "pricing" || prevIntent === "room-estimate")) {
    if (ctx.roomSize) {
      const [l, w] = ctx.roomSize.split("x").map(Number)
      if (l && w) return formatPriceEstimate(l, w, "pvc", "PVC Ceiling") + `\n\n📞 Free site visit: **${WA}**`
    }
    return `PVC ceiling — ${PRICE_MAP.pvc.range} (gypsum se sasta + 100% waterproof).\n\nRoom size?`
  }

  // User gives ONLY dimensions (no material context) — use last topic
  const dimOnly = DIM_REGEX.exec(t)
  if (dimOnly && !/(pvc|gypsum|wpc|uv|grid|fluted|acoustic|flooring)/.test(t)) {
    if (prevTopic && prevIntent === "pricing") {
      const l = parseInt(dimOnly[1]), w = parseInt(dimOnly[2])
      ctx.roomSize = `${l}x${w}`
      return formatPriceEstimate(l, w, prevTopic, SERVICE_NAME[prevTopic] || prevTopic) +
        `\n\n📞 Exact quote: **${WA}**`
    }
  }

  // "bina LED ke?" / "without lighting?"
  if (/\b(without|bina|nahi chahiye|sirf ceiling)\b/.test(t) && ctx.lastTopic) {
    const key = ctx.lastTopic
    return `Bina LED ke **${SERVICE_NAME[key] || key}** — ${PRICE_MAP[key]?.range || "custom quote"}\n\nRoom size batao!`
  }

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. MAIN ENGINE
// ─────────────────────────────────────────────────────────────────────────────

export function consultantReply(
  input: string,
  ctx: ConversationContext
): string | null {
  const normalized = normalizeTypos(input)
  const t = normalized.toLowerCase().trim()

  // Detect all signals
  const intent = detectIntent(normalized)
  const city   = detectCity(t)
  const svcObj = detectService(t)
  const room   = detectRoomType(t)
  const budget = detectBudgetLevel(t)

  // Update context with new signals
  if (city   && !ctx.city)    ctx.city    = city
  if (svcObj && !ctx.service) ctx.service = svcObj.name
  if (budget)                 ctx.budget  = budget
  if (room)                   ctx.roomType = room.label
  ctx.lastIntent = intent

  // Track material topic for follow-ups
  const svcKey = resolveServiceKey(t, { ...ctx, lastTopic: undefined, service: undefined })
  if (svcKey !== "gypsum" || t.includes("gypsum")) {
    // Only update lastTopic when something explicit is in the text
    if (/(pvc|gypsum|wpc|uv|marble|grid|fluted|acoustic|flooring|grass|tvunit|tv\s*(unit|panel|wall))/.test(t)) {
      ctx.lastTopic = svcKey
    }
  }
  if (svcObj) ctx.lastTopic = svcObj.key

  const hasDim    = DIM_REGEX.test(t)
  const wantsWork = /karwana|lagwana|chahiye|chahta|chahti|karwa|lagana|install|lagao|banana/.test(t)

  // ── 1. Context-aware follow-up FIRST
  const followUp = resolveContextualFollowUp(input, ctx)
  if (followUp) return followUp

  // ── 2. Multi-room estimate
  // Skip if text contains a dimension pattern — those are room sizes, not room counts
  const multiRooms = !DIM_REGEX.test(t) ? parseMultiRoomQuery(t) : null
  if (multiRooms) {
    const est = generateMultiRoomEstimate(multiRooms)
    ctx.estimateGiven = est.slice(0, 80)
    const cta = ctx.city
      ? `\n\n📞 ${ctx.city} mein free site visit — **${WA}**`
      : `\n\nAap kis city mein hain? City batao toh free site visit!`
    return est + cta
  }

  // ── 3. Intent priority routing
  switch (intent) {
    case "greeting":        return r_greeting(ctx)
    case "thanks":          return r_thanks(ctx)
    case "complaint":       return r_complaint()
    case "booking":         return r_booking(ctx, t)
    case "call-request":    return r_call()
    case "comparison":      return r_comparison(t)
    case "room-estimate":   return r_estimate(t, ctx)
    case "pricing":         return r_pricing(t, ctx)
    case "waterproof":      return r_waterproof(t, room)
    case "design":          return r_design(t, ctx.roomType)
    case "installation":    return r_installation(t)
    case "budget":          return r_budget(room)
    case "negotiation":     return r_negotiation(t)
    case "confused":        return r_confused(ctx, room)
    case "image-reference": return `Design reference dekh ke bilkul bana sakte hain! 🎨\n\nFree site visit mein photo dikhaiye — expert usi style mein estimate denge.\n\nPhoto WhatsApp pe bhejein: **${WA}**`
    case "quality":         return r_quality()
    case "area":            return r_area(t, ctx.city)
    case "service-info":    return r_serviceInfo()
  }

  // ── 4. City mention alone
  if (city && t.length < 50 && !svcObj) {
    return `**${city}** mein hum regularly kaam karte hain! 💪\n\nCeiling ya wall paneling ke liye kya chahiye? Room size batao!`
  }

  // ── 5. Deep material info
  const matDetail = r_materialDetail(t, ctx)
  if (matDetail) return matDetail

  // ── 6. FAQ matching
  for (const faq of FAQ) {
    if (faq.q.some((kw: string) => t.includes(kw))) return faq.a
  }

  // ── 7. Context-based smart default
  if (ctx.roomType && ctx.service && !hasDim && !ctx.askedSize) {
    ctx.askedSize = true
    return `${ctx.service} — ${ctx.roomType} ke liye accha choice! 👍\n\nRoom ka size batao (jaise 10×12 ya 12×14) — estimate abhi nikaaluun!`
  }
  if (ctx.roomType && !hasDim) {
    const rec = recommendMaterial(ctx.roomType, room?.isWet ?? false, ctx.budget ?? null)
    return `${ctx.roomType} ke liye **${rec.primary}** best hai — ${rec.reason}${rec.alternative ? `\nAlternative: **${rec.alternative}** — ${rec.altReason}` : ""}\n\nSize batao (jaise 12×14) — estimate!`
  }
  if (svcObj && !room && !hasDim) {
    return `**${svcObj.name}** — accha choice! Kaunsi room ke liye — hall, bedroom, kitchen?\n\nRoom type aur size batao!`
  }
  if (ctx.city && wantsWork && !hasDim) {
    const rec = recommendMaterial(ctx.roomType || null, room?.isWet ?? false, ctx.budget ?? null)
    return `${ctx.city} mein karte hain! 👍\n\n**${rec.primary}** — ${rec.reason}\n\nRoom ka size batao!`
  }

  // ── 8. Return null → Groq handles it
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. QUICK REPLIES — context-aware chips
// ─────────────────────────────────────────────────────────────────────────────

export function getSmartQuickReplies(ctx: ConversationContext): string[] {
  const i = ctx.lastIntent
  if (i === "pricing" || i === "room-estimate") return ["Book Site Visit", "Compare Materials", "LED bhi chahiye?", "Other Services"]
  if (i === "comparison")   return ["Get Estimate", "Book Site Visit", "Budget Options", "Premium Options"]
  if (i === "design")       return ["Get Estimate", "Book Site Visit", "Material Options", "LED Lighting"]
  if (i === "booking")      return ["WhatsApp Now", "Call Now", "Other Services"]
  if (i === "waterproof")   return ["PVC Rate", "UV Marble Rate", "Book Site Visit"]
  if (i === "budget")       return ["PVC Ceiling", "UV Marble", "Get Estimate", "Book Site Visit"]
  if (i === "quality")      return ["Book Site Visit", "PVC Ceiling", "Gypsum Ceiling"]
  if (i === "area")         return ["Get Estimate", "Book Site Visit", "Our Services"]
  if (i === "installation") return ["Book Site Visit", "Get Estimate", "Call Now"]
  if (ctx.phone)            return ["Book Site Visit", "Get Estimate", "Other Services"]
  return ["PVC Ceiling", "Gypsum Ceiling", "Price List", "Free Site Visit", "Compare"]
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES (exported)
// ─────────────────────────────────────────────────────────────────────────────

export function tryExtractPhone(raw: string): string | null {
  const m = raw.replace(/\D/g, "").match(/(?:0|91)?([6-9]\d{9})/)
  return m ? m[1] : null
}

export function tryExtractName(raw: string): string {
  const phone = tryExtractPhone(raw)
  let s = phone ? raw.replace(phone, "").replace(/\b91\b/g, "") : raw
  const stops = /\b(my|name|is|i|am|this|phone|number|mobile|contact|mera|naam|hai|hoon|ka|ki|ke|mujhe|main|me|aur|or|sir|madam|ji|bhai|sahab)\b/gi
  s = s.replace(stops, " ").replace(/[^a-zA-Z\u0900-\u097F\s]/g, " ").replace(/\s+/g, " ").trim()
  return s.split(/\s+/).filter(p => p.length > 1).slice(0, 2).join(" ")
}

export function isOffHours(): boolean {
  const h = new Date(Date.now() + 5.5 * 3600000).getUTCHours()
  return h >= 21 || h < 9
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export { ALL_AREAS, CITY_MAP }

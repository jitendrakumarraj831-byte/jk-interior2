/**
 * JK Interior — Consultant Engine v3.0
 * ─────────────────────────────────────
 * Modular, production-ready AI consultant logic.
 *
 * Architecture:
 *  1. Types & Constants
 *  2. Normalizer        — typo/spelling fix before any processing
 *  3. Detectors         — city, service, room, intent, budget
 *  4. Recommender       — material recommendation by room + budget
 *  5. Responders        — one function per intent (clean, reusable)
 *  6. Context Resolver  — follow-up awareness ("lighting ke saath?")
 *  7. Main Engine       — orchestrates all of the above
 *  8. Quick Replies     — context-aware chip generator
 */

import {
  MATERIAL_KNOWLEDGE,
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
  roomSize?: string       // e.g. "12x14"
  lastTopic?: string      // "gypsum" | "pvc" | "wpc" | "uv" etc.
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
  purnia: "Purnia",  purnea: "Purnia",
  kishanganj: "Kishanganj", katihar: "Katihar",
  narpatganj: "Narpatganj", narpatgang: "Narpatganj",
  raniganj: "Raniganj", jogbani: "Jogbani",
  supaul: "Supaul", chhatapur: "Chhatapur", tribeniganj: "Tribeniganj",
  bhargama: "Bhargama", palasi: "Palasi", kursakanta: "Kursakanta",
  patna: "Patna", muzaffarpur: "Muzaffarpur", bhagalpur: "Bhagalpur",
  darbhanga: "Darbhanga", gaya: "Gaya",
}

// Price map — single source of truth
const PRICE_MAP: Record<string, { range: string; premium?: string }> = {
  gypsum: { range: "₹80–140/sq.ft", premium: "₹120–200/sq.ft (with LED cove)" },
  pvc:    { range: "₹60–120/sq.ft" },
  wpc:    { range: "₹180–450/sq.ft" },
  uv:     { range: "₹50–95/sq.ft" },
  fluted: { range: "₹200–500/sq.ft" },
  grid:   { range: "₹45–90/sq.ft" },
  grass:  { range: "₹40–120/sq.ft" },
  tvunit: { range: "₹15,000–₹60,000+" },
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. NORMALIZER — fix typos BEFORE any detection
// ─────────────────────────────────────────────────────────────────────────────

export function normalizeTypos(text: string): string {
  return text
    // Price typos
    .replace(/\bpri[sz]e[sd]?\b/gi, "price")
    .replace(/\bprizz\b/gi, "price")
    .replace(/\bpri[sc]e\b/gi, "price")
    // Hinglish price signals → mark as pricing
    .replace(/\bkitna\s+lagega\b/gi, "price kitna lagega")
    .replace(/\bkitna\s+padega\b/gi, "price kitna padega")
    .replace(/\bkitne\s+mein\b/gi,   "price kitne mein")
    .replace(/\bkitna\s+hai\b/gi,    "price kitna hai")
    .replace(/\bkitna\s+hoga\b/gi,   "price kitna hoga")
    // Gypsum typos
    .replace(/\bgyps[ua]n\b/gi, "gypsum")
    .replace(/\bgyps[ma]\b/gi,  "gypsum")
    .replace(/\bgysum\b/gi,     "gypsum")
    .replace(/\bgypzum\b/gi,    "gypsum")
    .replace(/\bjipsum\b/gi,    "gypsum")
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
// 3. DETECTORS
// ─────────────────────────────────────────────────────────────────────────────

export function detectCity(text: string): string | null {
  const t = text.toLowerCase().replace(/[^a-z\s]/g, "")
  for (const [key, val] of Object.entries(CITY_MAP)) {
    if (t.includes(key)) return val
  }
  return null
}

const SERVICE_PATTERNS: Array<[RegExp, string, string]> = [
  [/\bpvc\b/,                                                           "PVC Ceiling",        "pvc"],
  [/\bgypsum\b|\bpop\b|\bplaster\b/,                                    "Gypsum Ceiling",     "gypsum"],
  [/\bwpc\b|\bwood\s*panel\b|\blouver\b/,                               "WPC Wall Panels",    "wpc"],
  [/\buv\b|\bmarble\s*sheet\b|\buv\s*marble\b/,                         "UV Marble Sheets",   "uv"],
  [/\btv\s*(unit|panel|wall|cabinet)\b|\btelevision\b/,                 "Modular TV Unit",    "tvunit"],
  [/\bfluted\b|\bribbed\b|\b3d\s*panel\b/,                              "Fluted Panels",      "fluted"],
  [/\bgrid\b|\boffice\s*ceiling\b|\bmineral\s*fiber\b/,                 "Grid Ceiling",       "grid"],
  [/\bfalse\s*ceiling\b|\bceiling\b|\bchhat\b/,                         "False Ceiling",      "gypsum"],
  [/\bwall\s*panel\b|\baccent\s*wall\b|\bdeewar\b/,                     "Wall Panels",        "wpc"],
  [/\bcomplete\s*interior\b|\bfull\s*interior\b|\bpoora\s*ghar\b|\bpura\s*ghar\b|\bfull\s*home\b/, "Complete Interior", "interior"],
  [/\bartificial\s*grass\b|\bturf\b/,                                   "Artificial Grass",   "grass"],
  [/\bkitchen\b|\brasoi\b/,                                             "Kitchen Interior",   "pvc"],
  [/\bbedroom\b|\bkamra\b/,                                             "Bedroom Interior",   "gypsum"],
  [/\boffice\b/,                                                        "Office Interior",    "grid"],
]

export function detectService(text: string): { name: string; key: string } | null {
  const t = normalizeTypos(text.toLowerCase())
  for (const [pat, name, key] of SERVICE_PATTERNS) {
    if (pat.test(t)) return { name, key }
  }
  return null
}

const ROOM_PATTERNS: Array<[RegExp, string, boolean]> = [
  [/\bhall\b|\bdrawing\s*room\b|\bliving\s*room\b|\bbaithak\b|\bdarbar\b/,  "Hall",         false],
  [/\bbedroom\b|\bbed\s*room\b|\bkamra\b/,                                   "Bedroom",      false],
  [/\bkitchen\b|\brasoi\b/,                                                   "Kitchen",      true],
  [/\bbathroom\b|\btoilet\b|\bwashroom\b|\blatrine\b/,                        "Bathroom",     true],
  [/\boffice\b|\bcabin\b/,                                                    "Office",       false],
  [/\breception\b/,                                                            "Reception",    false],
  [/\bbalcony\b|\bbalkani\b/,                                                 "Balcony",      true],
  [/\bpooja\b|\bmandir\b|\bpuja\b/,                                           "Pooja Room",   false],
  [/\bdining\b/,                                                               "Dining Room",  false],
  [/\bshop\b|\bshowroom\b|\bdukaan\b/,                                        "Shop",         false],
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
  if (/\bsasta\b|\bcheap\b|\baffordable\b|\bkam\s*budget\b|\bbudget\s*kam\b|\bminimum\b|\bbasic\b|\blow\s*budget\b/.test(t)) return "low"
  if (/\bpremium\b|\bluxury\b|\bhigh\s*end\b|\bexpensive\b|\bdesigner\b/.test(t)) return "high"
  if (/\bstandard\b|\bmid\b|\bmedium\b|\bnormal\b/.test(t)) return "mid"
  return null
}

// Intent keyword sets — defined once, reused
const KW: Record<string, string[]> = {
  greeting:   ["hi", "hello", "hey", "namaste", "namaskar", "helo", "good morning", "good evening", "good afternoon", "hy", "hii", "salam", "kaise ho", "kya haal", "how are you"],
  thanks:     ["thank", "shukriya", "dhanyawad", "thanks", "thx", "bahut accha", "great", "perfect", "superb", "awesome", "shabash", "badiya", "wah"],
  complaint:  ["problem", "issue", "complaint", "shikayat", "girna", "toota", "peeling", "leaking", "broken", "repair", "thik karo"],
  booking:    ["visit", "book", "site visit", "measurement", "bulao", "aao", "milna", "survey", "appointment", "schedule", "bula lo", "free visit", "aana hai", "book karo", "karwana hai", "shuru karein"],
  waterproof: ["waterproof", "water proof", "paani", "seepage", "moisture", "humidity", "geela", "nami", "barish", "water resistant", "leak"],
  design:     ["design", "designer", "modern", "simple", "luxury", "latest", "trending", "beautiful", "sundar", "stylish", "cove", "pop design", "3d", "fluted", "texture"],
  install:    ["kitne din", "kitna time", "kab tak", "jaldi", "time lagega", "installation", "install", "fitting", "din lagega", "urgent"],
  budget:     ["kam budget", "budget kam", "sasta", "cheap", "affordable", "low budget", "budget tight", "sasta option", "minimum", "basic", "simple wala"],
  negotiation:["final rate", "discount", "offer", "chhut", "kam karo", "negotiate", "last price", "best price", "asli material", "bharosa", "sample", "dikhao"],
  confused:   ["samajh nahi", "nahi aa raha", "kya sahi", "aap batao", "confused", "pata nahi", "decide nahi", "doubt", "madad", "guide", "suggest karo"],
  image:      ["photo", "image", "picture", "pic", "aisa design", "reference", "sample dikha", "pinterest", "instagram"],
  call:       ["call karo", "phone karo", "number do", "call back", "contact karo"],
  area:       ["area", "location", "kahan", "serve", "district", "aata hai", "available", "cover", "jila", "service area"],
  quality:    ["guarantee", "warranty", "quality", "bharosa", "trust", "kitne saal", "durable", "isi", "certified", "strong", "life", "chalega", "original", "branded"],
  pricing:    ["price", "cost", "rate", "kimat", "daam", "kitna", "kharcha", "lagat", "paisa", "quote", "how much", "lagega", "charge", "per sqft", "mahnga", "estimate", "quotation", "labour", "fitting charge"],
  service:    ["service", "kaam", "kya karte", "kya milta", "bataiye", "samjhao"],
}

// Strict comparison patterns — ONLY explicit compare signals
const COMPARE_EXPLICIT = [" vs ", " versus ", " compare ", "difference between", "better than", "konsa better", "kaunsa better"]
const COMPARE_MATERIAL = [
  /pvc.{0,8}(vs|versus|ya|or|aur).{0,8}gypsum/i,
  /gypsum.{0,8}(vs|versus|ya|or|aur).{0,8}pvc/i,
  /wpc.{0,8}(vs|versus|ya|or|aur).{0,8}(uv|marble)/i,
  /(uv|marble).{0,8}(vs|versus|ya|or|aur).{0,8}wpc/i,
  /pvc.{0,8}(vs|versus|ya|or|aur).{0,8}wpc/i,
]

const has = (t: string, kws: string[]) => kws.some(k => t.includes(k))

export function detectIntent(text: string): Intent {
  const norm = normalizeTypos(text)
  const t = norm.toLowerCase().trim()

  // Order matters — most specific first
  if (has(t, KW.greeting) && t.length < 35) return "greeting"
  if (has(t, KW.thanks)   && t.length < 40) return "thanks"
  if (has(t, KW.complaint))   return "complaint"
  if (has(t, KW.booking))     return "booking"
  if (/\d+\s*[x×by]\s*\d+/.test(t)) return "room-estimate"

  // Comparison — STRICT: explicit word OR material pair
  const isCompare = COMPARE_EXPLICIT.some(kw => (` ${t} `).includes(kw)) ||
                    COMPARE_MATERIAL.some(pat => pat.test(t))
  if (isCompare) return "comparison"

  if (has(t, KW.waterproof)) return "waterproof"
  if (has(t, KW.install))    return "installation"
  if (has(t, KW.budget))     return "budget"
  if (has(t, KW.negotiation))return "negotiation"
  if (has(t, KW.confused))   return "confused"
  if (has(t, KW.image))      return "image-reference"
  if (has(t, KW.call))       return "call-request"
  if (has(t, KW.area))       return "area"
  if (has(t, KW.quality))    return "quality"
  if (has(t, KW.design))     return "design"
  // Pricing last — catches "kitna lagega" after normalizeTypos converts it
  if (has(t, KW.pricing))    return "pricing"
  if (has(t, KW.service))    return "service-info"

  return "general"
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. RECOMMENDER
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
  if (roomType === "Hall" || roomType === "Dining Room") {
    return budget === "low"
      ? { primary: "PVC Ceiling", reason: "budget-friendly, zero maintenance", alternative: "Gypsum Ceiling", altReason: "thoda extra mein premium cove lighting" }
      : { primary: "Gypsum Ceiling", reason: "premium cove lighting, POP designs — hall ke liye best", alternative: "PVC Ceiling", altReason: "budget-friendly option" }
  }
  if (roomType === "Bedroom") {
    return budget === "low"
      ? { primary: "PVC Ceiling", reason: "affordable, zero maintenance, wood textures available" }
      : { primary: "Gypsum Ceiling", reason: "smooth finish, LED cove lighting — bedroom ke liye elegant", alternative: "PVC Ceiling", altReason: "budget option" }
  }
  if (roomType === "Office" || roomType === "Shop" || roomType === "Reception") {
    return { primary: "Grid Ceiling", reason: "commercial standard, easy maintenance, AC access", alternative: "Gypsum Ceiling", altReason: "premium office look ke liye" }
  }
  return budget === "low"
    ? { primary: "PVC Ceiling", reason: "most affordable, waterproof, zero maintenance" }
    : { primary: "Gypsum Ceiling", reason: "premium look, cove lighting", alternative: "PVC Ceiling", altReason: "budget-friendly waterproof option" }
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. RESPONDERS — one clean function per intent
// ─────────────────────────────────────────────────────────────────────────────

function r_greeting(ctx: ConversationContext): string {
  const nm = ctx.name ? ` ${ctx.name}` : ""
  const greetings = [
    `Namaste${nm}! 😊 Main Riya hoon — JK Interior ki AI consultant.\n\nCeiling, wall panels, pricing, room estimate — kuch bhi poochhein!`,
    `Hello${nm}! 🏠 JK Interior mein swagat hai.\n\nPVC, gypsum, WPC panels ya room estimate — sab pooch sakte hain!`,
    `Namaste${nm}! Main Riya hoon. 👋\n\nAaj kaunsa kaam karwana chahte hain — ceiling, wall panel, ya full interior?`,
  ]
  return pick(greetings)
}

function r_thanks(ctx: ConversationContext): string {
  const nm = ctx.name ? ` ${ctx.name}` : ""
  return `Bahut shukriya${nm}! 🙏 Koi bhi sawaal ho toh main yahaan hoon. JK Interior mein seva hamara farz hai!`
}

function r_complaint(): string {
  return `Mujhe bahut dukh hua sunke. 😔\n\nPlease detail mein batayein — kya hua aur kab hua? Main team ko abhi inform karti hoon.\n\n📞 Direct: **${WA}** — hum hamesha ready hain!`
}

function r_booking(
  ctx: ConversationContext,
  input?: string
): string {

  const t = (input || "").toLowerCase()

  // Pricing / material questions → don't ask for number
  if (
    /price|rate|cost|kitna|estimate|gypsum|pvc|wpc|ceiling|panel/i.test(t)
  ) {
    return r_pricing(t, ctx)
  }

  // Already has phone
  if (ctx.phone) {
    return `Aapki inquiry already note hai! 😊

Team aapko jald contact karegi.

Ya seedha call/WhatsApp: **${WA}**`
  }

  // Has name but no phone
  if (ctx.name) {
    return `${ctx.name} ji 😊

Free site visit aur exact quotation ke liye WhatsApp number share karein 📱`
  }

  // No details yet
  return `Free site visit bilkul free hai 😊

Pehle aapka naam bata dijiye?`
}

function r_call(): string {
  const oh = isOffHours()
  return oh
    ? `📞 **${WA}**\n\nAbhi raat ka time hai — team kal 9 AM pe call karegi. Ya WhatsApp pe message karein — 24/7 available! 💬`
    : `📞 **Call karein: ${WA}**\n\nYa neeche WhatsApp button tap karein — hamare expert se seedha baat karein!`
}

function r_comparison(t: string): string {
  if ((t.includes("pvc") && t.includes("gypsum")) || /ceiling.{0,20}(vs|versus|compare|differ)/.test(t))
    return COMPARISONS["pvc-vs-gypsum"]
  if (t.includes("wpc") && (t.includes("uv") || t.includes("marble")))
    return COMPARISONS["wpc-vs-uv"]
  if (t.includes("pvc") && t.includes("wpc"))
    return COMPARISONS["pvc-vs-wpc"]
  return `Kya compare karna hai?\n\n🏠 **PVC vs Gypsum** — ceiling ke liye\n🪵 **WPC vs UV Marble** — wall ke liye\n\nBataiye — detailed honest comparison de deta hoon!`
}

function r_pricing(t: string, ctx: ConversationContext): string {
  const dimMatch = t.match(/(\d{1,2})\s*[x×by]\s*(\d{1,2})/)

  // Material-specific with dimensions
  if (dimMatch) {
    const l = parseInt(dimMatch[1]), w = parseInt(dimMatch[2])
    const key = t.includes("pvc") ? "pvc"
              : t.includes("wpc") ? "wpc"
              : t.includes("uv") || t.includes("marble") ? "uv"
              : t.includes("grid") ? "grid"
              : t.includes("gypsum") ? "gypsum"
              : ctx.lastTopic || ctx.service || "pvc"
    const nameMap: Record<string, string> = { pvc: "PVC Ceiling", wpc: "WPC Wall Panel", uv: "UV Marble Sheet", grid: "Grid Ceiling", gypsum: "Gypsum Ceiling" }
    return formatPriceEstimate(l, w, key, nameMap[key] || "Gypsum Ceiling") + `\n\n📞 Exact quote ke liye free site visit: **${WA}**`
  }

  // Material-specific price (no dimensions yet)
  const matKey = t.includes("pvc") ? "pvc"
               : t.includes("gypsum") ? "gypsum"
               : t.includes("wpc") ? "wpc"
               : t.includes("uv") || t.includes("marble") ? "uv"
               : t.includes("grid") ? "grid"
               : t.includes("fluted") ? "fluted"
               : null

  if (matKey) {
    const p = PRICE_MAP[matKey]
    const nameMap: Record<string, string> = {
      pvc: "PVC Ceiling", gypsum: "Gypsum Ceiling", wpc: "WPC Wall Panels",
      uv: "UV Marble Sheets", grid: "Grid Ceiling", fluted: "Fluted Panels",
    }
    const lines = [`**${nameMap[matKey]}** — ${p.range}`]
    if (p.premium) lines.push(`Premium: ${p.premium}`)
    lines.push(`\nRoom ka size batao (jaise 12×14) — exact estimate abhi nikaaluun! 📐`)
    return lines.join("\n")
  }

  // Room-context price recommendation
  if (ctx.roomType) {
    const rec = recommendMaterial(ctx.roomType, false, ctx.budget ?? null)
    return `${ctx.roomType} ke liye **${rec.primary}** — ${PRICE_MAP[rec.primary.toLowerCase().includes("pvc") ? "pvc" : "gypsum"].range}\n\nRoom ka size batao (jaise 12×14) — exact estimate nikaaluun!`
  }
// Full price list — always helpful
  return `💰 **JK Interior — Price List**\n\n✨ Gypsum Ceiling — ${PRICE_MAP.gypsum.range}\n🏠 PVC Ceiling — ${PRICE_MAP.pvc.range}\n🪵 WPC Wall Panels — ${PRICE_MAP.wpc.range}\n💎 UV Marble Sheets — ${PRICE_MAP.uv.range}\n📺 Modular TV Unit — ${PRICE_MAP.tvunit.range}\n🏛 Fluted Panels — ${PRICE_MAP.fluted.range}\n🏢 Grid Ceiling — ${PRICE_MAP.grid.range}\n\nRoom ka size batayein — main exact estimate nikaal deti hoon! 📐`
}

function r_estimate(t: string, ctx: ConversationContext): string {
  const dimMatch = t.match(/(\d{1,2})\s*[x×by]\s*(\d{1,2})/)
  if (!dimMatch) return r_pricing(t, ctx)

  const l = parseInt(dimMatch[1]), w = parseInt(dimMatch[2])
  const key = t.includes("pvc") ? "pvc"
          : t.includes("wpc") ? "wpc"
          : t.includes("uv") || t.includes("marble") ? "uv"
          : t.includes("grid") ? "grid"
          : t.includes("gypsum") ? "gypsum"
          : ctx.lastTopic || ctx.service || "pvc"
  const nameMap: Record<string, string> = {
    pvc: "PVC Ceiling", wpc: "WPC Wall Panel", uv: "UV Marble Sheet",
    grid: "Grid Ceiling", gypsum: "Gypsum Ceiling"
  }
  ctx.roomSize = `${l}x${w}`
  ctx.lastTopic = key
  return formatPriceEstimate(l, w, key, nameMap[key] || "Gypsum Ceiling") +
    `\n\nExact quote ke liye free site visit — **${WA}** 📞`
}

function r_waterproof(t: string, room: { label: string; isWet: boolean } | null): string {
  const wetRoom = room?.isWet || t.includes("bathroom") || t.includes("kitchen")
  if (wetRoom) {
    const label = t.includes("bathroom") ? "Bathroom" : t.includes("kitchen") ? "Kitchen" : (room?.label || "Wet area")
    return `${label} ke liye **PVC Ceiling** (${PRICE_MAP.pvc.range}) perfect hai — 100% waterproof, termite-proof, 20+ saal ki life. 💧\n\nWalls ke liye **UV Marble Sheets** (${PRICE_MAP.uv.range}) — bhi 100% waterproof!\n\nRoom ka size kya hai? Estimate nikaaluun!`
  }
  return `Waterproof ke liye 2 best options:\n\n🏠 **PVC Ceiling** — ${PRICE_MAP.pvc.range}\n💎 **UV Marble Sheets** — ${PRICE_MAP.uv.range}\n\nDono 100% waterproof! Kaunsi room ke liye chahiye?`
}

function r_design(t: string, roomType?: string): string {
  const room = roomType || (t.includes("hall") ? "Hall" : t.includes("bedroom") ? "Bedroom" : t.includes("tv") ? "TV" : t.includes("office") ? "Office" : null)
  if (room === "Hall" || room === "Hall") return `Hall ke liye best modern designs:\n\n✨ **Gypsum cove ceiling** — LED strip ke saath cinema jaisa effect\n🪵 **WPC fluted panels** — TV wall pe 3D look\n💎 **UV marble accent wall** — premium finish\n\nHall ka size kitna hai? Estimate de deti hoon!`
  if (room === "Bedroom") return `Bedroom ke liye trending:\n\n✨ **Gypsum ceiling** — soft cove lighting, warm glow\n🪵 **WPC headboard wall** — luxury wood-look\n🏠 **PVC ceiling** — budget-friendly, wood textures\n\nBedroom ka size batao!`
  if (room === "TV") return `TV wall ke liye:\n\n🪵 **WPC fluted panels** — #1 trending, 3D textured look\n📺 **Modular TV unit** — custom + LED backlight\n💎 **UV marble backdrop** — premium at low cost\n\nTV wall ka width kitna hai?`
  if (room === "Office") return `Office/Shop ke liye:\n\n🏢 **Grid ceiling** — commercial standard\n✨ **Gypsum ceiling** — premium reception look\n🪵 **WPC panels** — professional feel\n\nSpace ka size batao!`
  return `Modern interior ke liye best options:\n\n✨ Gypsum cove ceiling — hall/bedroom\n🪵 WPC fluted panels — TV wall\n💎 UV marble sheets — bathroom/kitchen\n🏠 PVC ceiling — budget-friendly, har room\n\nKis room ke liye design chahiye?`
}

function r_installation(t: string): string {
  if (t.includes("pvc"))    return `PVC ceiling — **1 room mein sirf 1 din!** Poore ghar mein 3-4 din. 💨\n\nJaldi start? Book: **${WA}**`
  if (t.includes("gypsum")) return `Gypsum ceiling — **2-3 din/room**, poore ghar mein 5-7 din. ⏱\n\nKoi delay nahi — timeline fixed! **${WA}**`
  if (t.includes("wpc"))    return `WPC paneling — **1-2 din/wall**. Minimum disturbance! 🪵\n\nBook: **${WA}**`
  return `Installation time:\n\n🏠 PVC — 1 din/room\n✨ Gypsum — 2-3 din/room\n🪵 WPC — 1-2 din/wall\n💎 UV marble — 1-2 din/room\n\nKaunsa kaam karwana hai?`
}

function r_budget(room: { label: string; isWet: boolean } | null): string {
  if (room?.isWet) return `Budget mein **PVC Ceiling** best — ${PRICE_MAP.pvc.range}, 100% waterproof, zero maintenance. ${room.label} ke liye perfect! 💧\n\nRoom ka size batao!`
  return `Budget-friendly options:\n\n🏠 **PVC Ceiling** — ${PRICE_MAP.pvc.range} (sabse affordable + waterproof)\n💎 **UV Marble Sheets** — ${PRICE_MAP.uv.range} (walls ke liye marble look)\n\nRoom size batao — estimate nikaaluun!`
}

function r_negotiation(t: string): string {
  if (t.includes("discount") || t.includes("offer") || t.includes("kam karo") || t.includes("chhut"))
    return `JK Interior mein already competitive pricing — koi hidden charges nahi! Multiple rooms ek saath karwane pe **combo discount** available hai. 💰\n\nFree site visit mein transparent quotation — book karein: **${WA}**`
  return `Bharosa bilkul karein! 🙏\n\n✅ **1 saal ki written warranty** — koi issue, free repair\n✅ **ISI-certified materials** — koi duplicate nahi\n✅ **500+ completed projects** — 8+ saal experience\n✅ **Kaam se pehle material sample** dikhaya jaata hai\n\nFree site visit mein sab khud dekh sakte hain!`
}

function r_confused(ctx: ConversationContext, room: { label: string; isWet: boolean } | null): string {
  if (ctx.roomType || room) {
    const rt = ctx.roomType || room!.label
    const rec = recommendMaterial(rt, room?.isWet ?? false, ctx.budget ?? null)
    return `Koi baat nahi, main help karti hoon! 😊\n\n${rt} ke liye: **${rec.primary}** — ${rec.reason}${rec.alternative ? `\n\nAlternative: **${rec.alternative}** — ${rec.altReason}` : ""}\n\nRoom ka size batao (jaise 12×14) — estimate bhi de deti hoon!`
  }
  return `Koi baat nahi! Step by step guide karti hoon. 😊\n\n1. Kaunsi room ke liye? (Hall, Bedroom, Kitchen, Bathroom)\n2. Budget: basic ya premium?\n\nYeh batao — best option recommend karungi!`
}

function r_quality(): string {
  return `JK Interior Quality Guarantee:\n\n✅ **1 saal ki written warranty** — koi bhi issue, free repair\n✅ **ISI-certified branded materials** — koi duplicate nahi\n✅ **100% waterproof options** available\n✅ **8+ saal experience, 500+ projects**\n\nKaam shuru hone se pehle material sample bhi dikhaya jaata hai! 🙏`
}

function r_area(t: string, knownCity?: string): string {
  const city = detectCity(t) || knownCity

  if (city) {
    return `📍 **${city}** — haan ji, hum wahan kaam karte hain 😊

JK Interior ka main service area Forbesganj & Araria hai, lekin nearby cities bhi cover karte hain.

✅ Free site visit available
✅ Modern ceiling & wall panel work
✅ Bihar local team

Aapko kaunsa kaam karwana hai — gypsum, PVC, WPC ya full interior?`
  }

  return `📍 JK Interior ka main service area Forbesganj & Araria hai.

Hum nearby areas me bhi kaam karte hain:
• Jogbani
• Raniganj
• Narpatganj
• Kursakanta
• Tribeniganj
• Chhatapur
• Supaul
• Purnia

Aap apna city batayein 😊`
}

function r_serviceInfo(): string {
  return `JK Interior ki services:\n\n✨ Gypsum Ceiling — ${PRICE_MAP.gypsum.range}\n🏠 PVC Ceiling — ${PRICE_MAP.pvc.range}\n🪵 WPC Wall Panels — ${PRICE_MAP.wpc.range}\n💎 UV Marble Sheets — ${PRICE_MAP.uv.range}\n📺 Modular TV Unit — ${PRICE_MAP.tvunit.range}\n🏛 Fluted Panels — ${PRICE_MAP.fluted.range}\n🏢 Grid Ceiling — ${PRICE_MAP.grid.range}\n🌿 Artificial Grass — ${PRICE_MAP.grass.range}\n\nKis service ke baare mein detail chahiye?`
}

function r_materialDetail(t: string): string | null {
  const m = MATERIAL_KNOWLEDGE
  if (t.includes("gypsum")) {
    if (/water|bathroom|nami|moisture|geela/.test(t))
      return `Gypsum waterproof nahi hoti — bathroom/kitchen ke liye **PVC** best hai (${PRICE_MAP.pvc.range}).\n\nHall/bedroom ke liye gypsum perfect hai! Room size batao.`
    return `**Gypsum False Ceiling** — ${m.gypsum.price}\n\n${m.gypsum.description}\n\nBest for: ${m.gypsum.bestFor}\nAvoid: ${m.gypsum.avoidIn}\nInstall: ${m.gypsum.installTime}\nWarranty: ${m.gypsum.warranty}\n\nRoom ka size batao — estimate nikaalta hoon!`
  }
  if (t.includes("pvc")) return `**PVC False Ceiling** — ${m.pvc.price}\n\n${m.pvc.description}\n\nBest for: ${m.pvc.bestFor}\nInstall: ${m.pvc.installTime}\nWarranty: ${m.pvc.warranty}\n\nRoom size batao!`
  if (t.includes("wpc") || t.includes("wood panel") || t.includes("louver")) return `**WPC Wall Panels** — ${m.wpc.price}\n\n${m.wpc.description}\n\nBest for: ${m.wpc.bestFor}\nInstall: ${m.wpc.installTime}\nWarranty: ${m.wpc.warranty}\n\nTV wall ke liye #1 choice!`
  if (/\buv\b|\bmarble\s*sheet\b/.test(t)) return `**UV Marble Sheets** — ${m.uv.price}\n\n${m.uv.description}\n\nBest for: ${m.uv.bestFor}\nAvoid: ${m.uv.avoidIn}\nInstall: ${m.uv.installTime}`
  if (/\btv\s*(unit|panel|wall)\b/.test(t)) {
    const tv = m.tvunit
    return `**Modular TV Unit** — ${tv.price}\n\nSizes:\n- 6-8 ft: ${tv.sizes.small}\n- 8-10 ft: ${tv.sizes.medium}\n- 10-14 ft: ${tv.sizes.large}\n\nLED lighting bhi add ho sakti hai!`
  }
  if (t.includes("fluted") || t.includes("ribbed") || t.includes("3d panel")) return `**Fluted / Louver Panels** (${PRICE_MAP.fluted.range})\n\nModern 3D textured look — abhi ka #1 trending wall design! Wall size batao.`
  if (t.includes("grid") || t.includes("office ceiling")) return `**Grid Ceiling** (${PRICE_MAP.grid.range})\n\nOffices, shops, hospitals ke liye standard. Easy maintenance. Office size batao!`
  if (t.includes("complete interior") || t.includes("full interior") || t.includes("poora ghar") || t.includes("pura ghar"))
    return `**Complete Interior Package**\n\nFull home: Ceiling + Wall Panels + TV Unit + Kitchen — ek team, ek timeline!\n\n- Combo discount available\n- 1-year warranty on everything\n- 500+ full home projects\n\nFree consultation book karein: **${WA}**`
  if (t.includes("led") || t.includes("cove light") || t.includes("strip light"))
    return `**LED Cove Lighting** ke saath gypsum ceiling:\n- ₹40–80/running ft\n- TV wall LED backlight: ₹2,000–₹5,000\n\nRaat mein ghar cinema jaisa! 😍`
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. CONTEXT RESOLVER — follow-up awareness
// ─────────────────────────────────────────────────────────────────────────────

export function resolveContextualFollowUp(
  input: string,
  ctx: ConversationContext
): string | null {
  const t = normalizeTypos(input.toLowerCase().trim())
  // Only process short follow-ups
  if (t.length > 90) return null

  const prevTopic  = (ctx.lastTopic || ctx.service || "").toLowerCase()
  const prevIntent = ctx.lastIntent

  // "lighting ke saath?" / "led bhi?" — add LED to previous gypsum estimate
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
      return `Gypsum ceiling ke saath LED cove lighting:\n\n✨ **₹40–80/running ft**\n${ledLine}\n\nRaat mein ghar cinema jaisa! 😍`
    }
    return `LED Cove Lighting ke saath ceiling bahut premium lagti hai! ✨\n\n- Gypsum + LED: ₹40–80/running ft\n- WPC TV wall backlight: ₹2,000–₹5,000\n\nFree site visit mein design discuss karein!`
  }

  // "gypsum wala kitna?" after PVC discussion
  if (/gypsum/.test(t) && prevTopic.includes("pvc") && (prevIntent === "pricing" || prevIntent === "room-estimate")) {
    if (ctx.roomSize) {
      const [l, w] = ctx.roomSize.split("x").map(Number)
      if (l && w) return formatPriceEstimate(l, w, "gypsum", "Gypsum Ceiling") + `\n\n📞 Free site visit: **${WA}**`
    }
    return `Gypsum ceiling — ${PRICE_MAP.gypsum.range} (PVC se thoda premium, cove lighting possible).\n\nRoom size batao — dono ka comparison estimate de deti hoon!`
  }

  // "pvc wala?" after gypsum discussion
  if (/pvc/.test(t) && prevTopic.includes("gypsum") && (prevIntent === "pricing" || prevIntent === "room-estimate")) {
    if (ctx.roomSize) {
      const [l, w] = ctx.roomSize.split("x").map(Number)
      if (l && w) return formatPriceEstimate(l, w, "pvc", "PVC Ceiling") + `\n\n📞 Free site visit: **${WA}**`
    }
    return `PVC ceiling — ${PRICE_MAP.pvc.range} (gypsum se sasta + 100% waterproof).\n\nRoom size batao!`
  }

  // "bina LED ke?" / "without lighting?"
  if (/\b(without|bina|nahi chahiye|sirf ceiling)\b/.test(t) && prevIntent === "pricing" && ctx.service) {
    const key = ctx.service.toLowerCase().includes("gypsum") ? "gypsum" : "pvc"
    return `Bina LED ke **${ctx.service}** — ${PRICE_MAP[key]?.range || "custom quote"}\n\nRoom ka size batao — exact estimate de deti hoon!`
  }

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. MAIN ENGINE
// ─────────────────────────────────────────────────────────────────────────────

export function consultantReply(
  input: string,
  ctx: ConversationContext
): string | null {
  // Normalize typos first — always
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
  if (t.includes("gypsum"))   ctx.lastTopic = "gypsum"
  else if (t.includes("pvc")) ctx.lastTopic = "pvc"
  else if (t.includes("wpc")) ctx.lastTopic = "wpc"
  else if (t.includes("uv") || t.includes("marble")) ctx.lastTopic = "uv"
  else if (svcObj)            ctx.lastTopic = svcObj.key

  const hasDim    = /\d+\s*[x×by]\s*\d+/.test(t)
  const wantsWork = /karwana|lagwana|chahiye|chahta|chahti|karwa|lagana|install|lagao|banana/.test(t)

  // ── 1. Context-aware follow-up FIRST
  const followUp = resolveContextualFollowUp(input, ctx)
  if (followUp) return followUp

  // ── 2. Multi-room estimate
  const multiRooms = parseMultiRoomQuery(t)
  if (multiRooms) {
    const est = generateMultiRoomEstimate(multiRooms)
    ctx.estimateGiven = est.slice(0, 80)
    const cta = ctx.city
      ? `\n\n📞 ${ctx.city} mein free site visit — WhatsApp: **${WA}** — same day possible!`
      : `\n\nAap kis city mein hain? City batao toh free site visit arrange karein!`
    return est + cta
  }

  // ── 3. Intent priority routing
  switch (intent) {
    case "greeting":       return r_greeting(ctx)
    case "thanks":         return r_thanks(ctx)
    case "complaint":      return r_complaint()
    case "booking":        return r_booking(ctx, t)
    case "call-request":   return r_call()
    case "comparison":     return r_comparison(t)
    case "room-estimate":  return r_estimate(t, ctx)
    case "pricing":        return r_pricing(t, ctx)
    case "waterproof":     return r_waterproof(t, room)
    case "design":         return r_design(t, ctx.roomType)
    case "installation":   return r_installation(t)
    case "budget":         return r_budget(room)
    case "negotiation":    return r_negotiation(t)
    case "confused":       return r_confused(ctx, room)
    case "image-reference":return `Design reference dekh kar bilkul bana sakte hain! 🎨\n\nFree site visit mein photo dikhaiye — expert usi style ka estimate denge.\n\nPhoto WhatsApp pe bhej sakte hain: **${WA}**`
    case "quality":        return r_quality()
    case "area":           return r_area(t, ctx.city)
    case "service-info":   return r_serviceInfo()
  }

  // ── 4. City alone mention
  if (city && t.length < 50 && !svcObj) {
    return `**${city}** mein hum regularly kaam karte hain! 💪\n\nCeiling ya wall paneling ke liye kya chahiye? Room size batao toh estimate de deti hoon!`
  }

  // ── 5. Deep material info
  const matDetail = r_materialDetail(t)
  if (matDetail) return matDetail

  // ── 6. FAQ matching
  for (const faq of FAQ) {
    if (faq.q.some((kw: string) => t.includes(kw))) return faq.a
  }

  // ── 7. Context-based smart default
  if (ctx.roomType && ctx.service && !hasDim) {
    ctx.askedSize = true
    return `${ctx.service} ${ctx.roomType} ke liye accha choice hai! 👍\n\n${ctx.roomType} ka size batao (jaise 10×12 ya 12×14) — estimate abhi calculate kar deta hoon!`
  }
  if (ctx.roomType && !hasDim) {
    const rec = recommendMaterial(ctx.roomType, room?.isWet ?? false, ctx.budget ?? null)
    return `${ctx.roomType} ke liye **${rec.primary}** best hai — ${rec.reason}${rec.alternative ? `\nAlternative: **${rec.alternative}** — ${rec.altReason}` : ""}\n\nSize batao (jaise 12×14) — estimate nikaaluun!`
  }
  if (svcObj && !room && !hasDim) {
    return `${svcObj.name} — accha choice! Kaunsi room ke liye chahiye — hall, bedroom, kitchen?\n\nRoom type aur size batao toh estimate de sakti hoon!`
  }
  if (ctx.city && wantsWork && !hasDim) {
    const rec = recommendMaterial(ctx.roomType || null, room?.isWet ?? false, ctx.budget ?? null)
    return `${ctx.city} mein karte hain! 👍\n\n${ctx.roomType || "Room"} ke liye **${rec.primary}** — ${rec.reason}\n\nRoom ka size batao — estimate abhi nikaalta hoon!`
  }

  // ── 8. Return null → let AI or generic fallback handle
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. QUICK REPLIES — context-aware
// ─────────────────────────────────────────────────────────────────────────────

export function getSmartQuickReplies(ctx: ConversationContext): string[] {
  const i = ctx.lastIntent
  if (i === "pricing" || i === "room-estimate") return ["Book Site Visit", "Compare Materials", "Other Services", "Quality & Warranty"]
  if (i === "comparison")    return ["Get Estimate", "Book Site Visit", "Budget Options", "Premium Options"]
  if (i === "design")        return ["Get Estimate", "Book Site Visit", "Material Options"]
  if (i === "booking")       return ["WhatsApp Now", "Call Now", "Other Services"]
  if (i === "waterproof")    return ["PVC Rate", "UV Marble Rate", "Book Site Visit"]
  if (i === "budget")        return ["PVC Ceiling", "UV Marble", "Get Estimate", "Book Site Visit"]
  if (i === "quality")       return ["Book Site Visit", "PVC Ceiling", "Gypsum Ceiling"]
  if (i === "area")          return ["Get Estimate", "Book Site Visit", "Our Services"]
  if (i === "installation")  return ["Book Site Visit", "Get Estimate", "Call Now"]
  if (ctx.phone)             return ["Book Site Visit", "Get Estimate", "Other Services"]
  return ["PVC Ceiling", "Gypsum Ceiling", "Price List", "Free Site Visit", "Our Areas"]
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
  

/**
 * JK Interior — Consultant Engine v5.0
 * ─────────────────────────────────────
 * Human-like AI interior consultant logic.
 *
 * Architecture:
 *  1. Types & Constants
 *  2. Normalizer        — typo/spelling fix before any processing
 *  3. Service resolver  — text → context fallback
 *  4. Detectors         — city, service, room, intent, budget
 *  5. Recommender       — material recommendation by room + budget
 *  6. Responders        — one function per intent
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
  | "quality" | "area" | "service-info" | "vastu" | "competitor" | "urgent" | "general"

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
  askedRoomType?: boolean
  askedName?: boolean
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

// ── Dimension regex — handles 10x12, 10×12, 10 by 12, 10X12, 10 X 12
const DIM_REGEX = /(\d{1,3})\s*(?:[x×X]|\bby\b)\s*(\d{1,3})/i

// ── Derive PRICE_MAP from SERVICE_CATALOG (single source of truth)
const PRICE_MAP: Record<string, { range: string; premium?: string }> = Object.fromEntries(
  SERVICE_CATALOG.map(s => [s.key, { range: s.priceRange }])
)
PRICE_MAP.gypsum           = { range: "₹80–140/sq.ft",   premium: "₹120–200/sq.ft (with LED cove)" }
PRICE_MAP.pvc              = { range: "₹60–120/sq.ft",   premium: "₹90–150/sq.ft (designer textures)" }
PRICE_MAP.wpc              = { range: "₹180–450/sq.ft",  premium: "₹350–600/sq.ft (premium fluted)" }
PRICE_MAP.uv               = { range: "₹50–95/sq.ft",    premium: "₹80–120/sq.ft (premium designs)" }
PRICE_MAP.grid             = { range: "₹45–90/sq.ft" }
PRICE_MAP.fluted           = { range: "₹200–500/sq.ft" }
PRICE_MAP.acoustic         = { range: "₹150–400/sq.ft" }
PRICE_MAP.flooring         = { range: "₹80–200/sq.ft" }
PRICE_MAP["artificial-grass"] = { range: "₹40–120/sq.ft" }
PRICE_MAP.led              = { range: "₹40–80/running ft" }
PRICE_MAP.wallpaper        = { range: "₹15–60/sq.ft" }
PRICE_MAP.tvunit           = { range: "₹15,000–60,000+" }

// ── Service display names
const SERVICE_NAME: Record<string, string> = {
  pvc:              "PVC Ceiling",
  gypsum:           "Gypsum Ceiling",
  wpc:              "WPC Wall Panels",
  uv:               "UV Marble Sheets",
  grid:             "Grid Ceiling",
  fluted:           "Fluted Panels",
  tvunit:           "Modular TV Unit",
  acoustic:         "Acoustic Panels",
  flooring:         "Laminate Flooring",
  grass:            "Artificial Grass",
  "artificial-grass": "Artificial Grass",
  led:              "LED Cove Lighting",
  wallpaper:        "Wallpaper",
  interior:         "Complete Interior",
  louver:           "Louver Panels",
}

// ── Helper: pick random item from array
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ── Helper: format name greeting
function nm(ctx: ConversationContext): string {
  return ctx.name ? ` ${ctx.name} ji` : ""
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. NORMALIZER — fix typos BEFORE any detection
// ─────────────────────────────────────────────────────────────────────────────

export function normalizeTypos(text: string): string {
  return text
    // Price signals — Hinglish
    .replace(/\bkitna\s+lagega\b/gi,   "price kitna lagega")
    .replace(/\bkitna\s+padega\b/gi,   "price kitna padega")
    .replace(/\bkitne\s+mein\b/gi,     "price kitne mein")
    .replace(/\bkitna\s+hai\b/gi,      "price kitna hai")
    .replace(/\bkitna\s+hoga\b/gi,     "price kitna hoga")
    .replace(/\bkitna\s+kharch\b/gi,   "price kitna kharch")
    .replace(/\bkharcha\s+kitna\b/gi,  "price kharcha kitna")
    .replace(/\bkya\s+rate\b/gi,       "price rate")
    .replace(/\brate\s+kya\b/gi,       "price rate")
    .replace(/\bkitna\s+paisa\b/gi,    "price kitna paisa")
    .replace(/\bkitne\s+rupaye\b/gi,   "price kitne rupaye")
    .replace(/\bpri[sz]e[sd]?\b/gi,    "price")
    .replace(/\bprizz\b/gi,            "price")
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
    .replace(/\bchhath\b/gi,    "ceiling")
    // Room typos
    .replace(/\bbathro[mu]m\b/gi, "bathroom")
    .replace(/\bkitchi[nm]\b/gi,  "kitchen")
    // Modular typos
    .replace(/\bmod[ue]l[ae]r\b/gi, "modular")
    // Greeting normalization
    .replace(/\bkya\s+hal\b/gi,    "kya haal")
    .replace(/\bkaise\s+hain\b/gi, "kaise ho")
    // Casual filler words — strip before intent detection
    // "bhai gypsum ka rate kya hai yaar" → "gypsum ka rate kya hai"
    .replace(/\b(bhai|yaar|yar|bro|dost|yrr|yr)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim()
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SERVICE KEY RESOLVER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolves service key from text first, then falls back to context.
 * Never returns a stale default if lastTopic is set.
 */
export function resolveServiceKey(t: string, ctx: ConversationContext): string {
  // Text-first detection (explicit mention wins)
  if (/\bpvc\b/.test(t))                                            return "pvc"
  if (/\bgypsum\b|\bpop\b|\bplaster\b/.test(t))                    return "gypsum"
  if (/\bwpc\b|\bwood\s*panel\b|\blouver\b/.test(t))               return "wpc"
  if (/\buv\b|\bmarble\s*sheet\b|\buv\s*marble\b/.test(t))         return "uv"
  if (/\bgrid\b|\boffice\s*ceiling\b/.test(t))                     return "grid"
  if (/\bfluted\b|\bribbed\b|\b3d\s*panel\b/.test(t))              return "fluted"
  if (/\btv\s*(unit|panel|wall|cabinet)\b|\btelevision\b/.test(t)) return "tvunit"
  if (/\bacoustic\b|\bsoundproof\b/.test(t))                       return "acoustic"
  if (/\bflooring\b|\blaminate\b/.test(t))                         return "flooring"
  if (/\bgrass\b|\bturf\b/.test(t))                                return "artificial-grass"
  if (/\bwallpaper\b/.test(t))                                     return "wallpaper"
  if (/\bled\b|\bcove\s*light\b/.test(t))                          return "led"

  // Context fallback — lastTopic is most recent topic
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

  // Room-type based intelligent default
  if (ctx.roomType) {
    const r = ctx.roomType.toLowerCase()
    if (r.includes("kitchen") || r.includes("bathroom") || r.includes("balcony")) return "pvc"
    if (r.includes("office") || r.includes("shop")) return "grid"
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
  [/\bpvc\b/,                                                                  "PVC Ceiling",          "pvc"],
  [/\bgypsum\b|\bpop\b|\bplaster\b/,                                           "Gypsum Ceiling",       "gypsum"],
  [/\bwpc\b|\bwood\s*panel\b/,                                                 "WPC Wall Panels",      "wpc"],
  [/\buv\b|\bmarble\s*sheet\b|\buv\s*marble\b/,                                "UV Marble Sheets",     "uv"],
  [/\btv\s*(unit|panel|wall|cabinet)\b|\btelevision\b/,                        "Modular TV Unit",      "tvunit"],
  [/\bfluted\b|\bribbed\b|\b3d\s*panel\b/,                                     "Fluted Panels",        "fluted"],
  [/\bgrid\b|\boffice\s*ceiling\b|\bmineral\s*fiber\b/,                        "Grid Ceiling",         "grid"],
  [/\bacoustic\b|\bsoundproof\b|\becho\b/,                                     "Acoustic Panels",      "acoustic"],
  [/\blaminate\b|\bflooring\b|\bwooden\s*floor\b/,                             "Laminate Flooring",    "flooring"],
  [/\blouver\b|\blouver\s*panel\b/,                                             "Louver Panels",        "wpc"],
  [/\bwallpaper\b/,                                                             "Wallpaper",            "wallpaper"],
  [/\bled\b|\bcove\s*light|\bstrip\s*light/,                                    "LED Cove Lighting",    "led"],
  [/\bfalse\s*ceiling\b|\bceiling\b|\bchhat\b/,                                "False Ceiling",        "gypsum"],
  [/\bwall\s*panel\b|\baccent\s*wall\b|\bdeewar\b/,                            "Wall Panels",          "wpc"],
  [/\bcomplete\s*interior\b|\bfull\s*interior\b|\bpoora\s*ghar\b|\bpura\s*ghar\b|\bfull\s*home\b/, "Complete Interior", "interior"],
  [/\bartificial\s*grass\b|\bturf\b/,                                           "Artificial Grass",     "artificial-grass"],
]

export function detectService(text: string): { name: string; key: string } | null {
  const t = normalizeTypos(text.toLowerCase())
  for (const [pat, name, key] of SERVICE_PATTERNS) {
    if (pat.test(t)) return { name, key }
  }
  return null
}

const ROOM_PATTERNS: Array<[RegExp, string, boolean]> = [
  [/\bhall\b|\bdrawing\s*room\b|\bliving\s*room\b|\bbaithak\b|\bdarbar\b/, "Hall",       false],
  [/\bbedroom\b|\bbed\s*room\b|\bkamra\b/,                                  "Bedroom",    false],
  [/\bkitchen\b|\brasoi\b/,                                                  "Kitchen",    true],
  [/\bbathroom\b|\btoilet\b|\bwashroom\b|\blatrine\b/,                       "Bathroom",   true],
  [/\boffice\b|\bcabin\b/,                                                   "Office",     false],
  [/\breception\b/,                                                           "Reception",  false],
  [/\bbalcony\b|\bbalkani\b/,                                                "Balcony",    true],
  [/\bpooja\b|\bmandir\b|\bpuja\b/,                                          "Pooja Room", false],
  [/\bdining\b/,                                                              "Dining",     false],
  [/\bshop\b|\bshowroom\b|\bdukaan\b/,                                       "Shop",       false],
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
  if (/\bsasta\b|\bcheap\b|\baffordable\b|\bkam\s*budget\b|\bbudget\s*tight\b|\bminimum\b|\bbasic\b|\blow\s*budget\b|\bsabse\s*sasta\b|\bsasta\s*wala\b|\bsabse\s*kam\b/.test(t)) return "low"
  if (/\bpremium\b|\bluxury\b|\bhigh\s*end\b|\bexpensive\b|\bdesigner\b|\bbest\s*wala\b|\bsabse\s*accha\b/.test(t)) return "high"
  if (/\bstandard\b|\bmid\b|\bmedium\b|\bnormal\b/.test(t)) return "mid"
  return null
}

// ── Intent keyword groups
const KW: Record<string, string[]> = {
  greeting:    ["hi", "hello", "hey", "namaste", "namaskar", "helo", "good morning", "good evening", "good afternoon", "hy", "hii", "salam", "kaise ho", "kya haal", "how are you", "hlo", "assalamualaikum", "jai hind"],
  thanks:      ["thank", "shukriya", "dhanyawad", "thanks", "thx", "bahut accha", "great", "perfect", "superb", "awesome", "shabash", "badiya", "wah", "bdhiya", "bilkul sahi", "ekdum sahi", "achha laga", "acha laga", "accha laga", "baat karke", "helpful", "bahut helpful", "helpful rahi", "helpful tha", "maza aaya", "maja aaya", "khushi hui", "helpful hai", "bohot accha"],
  complaint:   ["problem", "issue", "complaint", "shikayat", "girna", "toota", "peeling", "leaking", "broken", "repair", "thik karo", "kharab", "nahi chal raha"],
  booking:     ["site visit", "measurement", "bulao", "survey", "appointment", "schedule", "bula lo", "free visit", "aana hai", "book karo", "shuru karein", "kab aao", "aap aa sakte", "visit karo", "aao ghar", "ghar aao", "kab aa sakte"],
  waterproof:  ["waterproof", "water proof", "paani", "seepage", "moisture", "humidity", "geela", "nami", "barish", "water resistant", "leak", "bheega", "namkin"],
  design:      ["design", "modern", "luxury", "latest", "trending", "beautiful", "sundar", "stylish", "cove", "pop design", "3d", "texture", "kaisa dikhega", "kaisa dikhta", "dikhaiye", "design chahiye", "design dikhao"],
  install:     ["kitne din", "kitna time", "kab tak", "time lagega", "installation", "install", "fitting", "din lagega", "urgent", "kitna samay", "kab start"],
  budget:      ["sasta", "cheap", "affordable", "low budget", "budget tight", "sasta option", "minimum", "basic", "simple wala", "kam mein", "sabse sasta", "saste mein", "budget mein"],
  negotiation: ["final rate", "discount", "offer", "chhut", "kam karo", "negotiate", "last price", "best price", "sample", "thoda kam", "aur kam"],
  confused:    ["samajh nahi", "nahi aa raha", "kya sahi", "aap batao", "confused", "pata nahi", "decide nahi", "doubt", "madad", "guide", "suggest karo", "kya lagaun", "kya better", "konsa loon", "kaunsa loon"],
  image:       ["photo", "image", "picture", "pic", "aisa design", "reference", "sample dikha", "pinterest", "instagram", "design dikhaiye"],
  call:        ["call karo", "phone karo", "number do", "call back", "contact karo", "call karein", "phone number"],
  area:        ["area", "location", "kahan", "serve", "district", "aata hai", "available", "cover", "jila", "service area", "kis city", "aate ho"],
  quality:     ["guarantee", "warranty", "quality", "bharosa", "trust", "kitne saal", "durable", "isi", "certified", "strong", "life", "chalega", "original", "branded", "tikau"],
  pricing:     ["price", "cost", "rate", "kimat", "daam", "kitna", "kharcha", "lagat", "paisa", "quote", "how much", "kitna lagega", "kaisa lagega", "charge", "per sqft", "mahnga", "estimate", "quotation", "labour", "fitting charge", "rupaye", "rs ", "kitne rupaye", "kharch"],
  service:     ["service", "kya karte", "kya milta", "bataiye", "samjhao", "kya kaam", "kya options", "kya kya hai"],
  vastu:       ["vastu", "vaastu", "vastu shastra", "vastu ke hisaab", "direction", "north facing", "south facing", "east facing", "west facing", "disha"],
  competitor:  ["competitor", "dusri company", "doosri company", "xyz company", "kisi aur se", "kisi doosre se", "market mein", "se sasta", "se accha", "se better", "se kam", "bahar se", "kisi aur company", "doosra"],
  urgent:      ["kal tak", "aaj chahiye", "abhi chahiye", "jaldi chahiye", "urgent hai", "asap", "kal karwana", "aaj hi", "turant", "jaldi se", "bahut jaldi", "emergency", "kal se shuru"],
}

// Strict comparison — ONLY explicit compare signals
const COMPARE_EXPLICIT = [" vs ", " versus ", " compare ", "difference between", "better than", "konsa better", "kaunsa better", "mein se kaunsa", "ya phir", "aur konsa"]
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

  // Dimension in text → estimate is ALWAYS top priority
  if (DIM_REGEX.test(t)) return "room-estimate"

  // Greeting & social — short messages only
  if (has(t, KW.greeting) && t.length < 40)  return "greeting"
  // "Aapse baat karke achha laga" type closing messages
  if (/\b(baat\s*karke|helpful\s*(rahi|tha|hai)|achha\s*laga|acha\s*laga|accha\s*laga|maza\s*aaya|maja\s*aaya)\b/.test(t)) return "thanks"
  if (has(t, KW.thanks) && t.length < 80)    return "thanks"
  if (has(t, KW.complaint))                  return "complaint"

  // Explicit booking signals (not just "visit" as a word in passing)
  const bookingStrong = ["site visit", "free visit", "aana hai", "book karo", "shuru karein", "kab aao", "aap aa sakte", "ghar aao", "visit karo"]
  if (bookingStrong.some(k => t.includes(k))) return "booking"

  if (has(t, KW.call)) return "call-request"

  // Comparison — strict
  const isCompare = COMPARE_EXPLICIT.some(kw => (` ${t} `).includes(kw)) ||
                    COMPARE_MATERIAL.some(pat => pat.test(t))
  if (isCompare) return "comparison"

  if (has(t, KW.waterproof))  return "waterproof"
  if (has(t, KW.install))     return "installation"
  if (has(t, KW.quality))     return "quality"
  if (has(t, KW.area))        return "area"
  if (has(t, KW.image))       return "image-reference"
  if (has(t, KW.negotiation)) return "negotiation"
  if (has(t, KW.confused))    return "confused"

  // Pricing BEFORE design — "kaisa lagega", "kitna lagega" are pricing, not design
  if (has(t, KW.pricing)) return "pricing"
  if (has(t, KW.budget))  return "budget"
  if (has(t, KW.design))  return "design"
  if (has(t, KW.service)) return "service-info"

  // Specific intent detection for new cases
  if (has(t, KW.vastu))      return "vastu"
  if (has(t, KW.competitor)) return "competitor"
  if (has(t, KW.urgent))     return "urgent"

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
    altReason: "walls ke liye marble look + 100% waterproof",
  }
  if (roomType === "Hall" || roomType === "Dining") {
    return budget === "low"
      ? { primary: "PVC Ceiling", reason: "budget-friendly, waterproof, zero maintenance", alternative: "Gypsum Ceiling", altReason: "thodi zyada investment, premium look" }
      : { primary: "Gypsum Ceiling", reason: "premium cove lighting, POP designs — hall ke liye best", alternative: "PVC Ceiling", altReason: "budget-friendly alternative" }
  }
  if (roomType === "Bedroom") {
    return budget === "low"
      ? { primary: "PVC Ceiling", reason: "affordable, zero maintenance, wood textures available" }
      : { primary: "Gypsum Ceiling", reason: "smooth finish, LED cove lighting — bedroom ke liye elegant", alternative: "PVC Ceiling", altReason: "budget option" }
  }
  if (roomType === "Office" || roomType === "Shop" || roomType === "Reception") {
    return { primary: "Grid Ceiling", reason: "commercial standard, easy maintenance, AC duct access", alternative: "Gypsum Ceiling", altReason: "premium cabin/reception look" }
  }
  if (roomType === "Balcony") {
    return { primary: "PVC Ceiling", reason: "weather-proof, zero maintenance, outdoor-safe" }
  }
  if (roomType === "Pooja Room") {
    return { primary: "Gypsum Ceiling", reason: "elegant finish, can be designed with arch/dome", alternative: "PVC Ceiling", altReason: "budget-friendly option" }
  }
  return budget === "low"
    ? { primary: "PVC Ceiling", reason: "most affordable, waterproof, zero maintenance" }
    : { primary: "Gypsum Ceiling", reason: "premium look, cove lighting", alternative: "PVC Ceiling", altReason: "budget-friendly waterproof option" }
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. RESPONDERS — one function per intent
// ─────────────────────────────────────────────────────────────────────────────

function r_greeting(ctx: ConversationContext): string {
  const n = nm(ctx)
  const opts = [
    `Namaste${n}! 😊 Main Riya hoon — JK Interior ki consultant.\n\nCeiling, wall panels, TV unit ya pricing — kuch bhi poochhein!`,
    `Hello${n}! 🏠 JK Interior mein aapka swagat hai.\n\nPVC, gypsum, WPC ya room estimate — sab pooch sakte hain!`,
    `Namaste${n}! 👋 Main Riya hoon.\n\nKaunsa kaam karwana hai — ceiling, wall paneling ya kuch aur?`,
  ]
  return pick(opts)
}

function r_thanks(ctx: ConversationContext): string {
  const n = nm(ctx)
  const opts = [
    `Shukriya${n}! 🙏 Koi sawaal ho toh poochhte rehna.\n\nFree site visit chahiye? **${WA}** pe WhatsApp karein!`,
    `Bahut shukriya${n}! 😊 Aur koi sawaal?\n\nFree site visit — **${WA}**`,
    `Khushi hui${n} ki baat helpful lagi! 😊\n\nJab bhi room ka kaam karwana ho — main hoon. Free site visit ke liye WhatsApp: **${WA}**`,
    `Shukriya${n}! 🙏 Aap ke ghar ki design sundar hogi.\n\nKuch aur poochna ho toh batayein — main hoon!`,
    `Bahut accha laga baat karke${n}! 😊 Jab bhi estimate ya design chahiye — direct poochh lena.\n\nWhatsApp: **${WA}**`,
  ]
  return pick(opts)
}

function r_complaint(): string {
  return `Mujhe khed hai! 😔 Please detail mein bataiye — kya hua aur kab?\n\nTeam ko abhi inform karta hoon.\n\n📞 Direct call/WhatsApp: **${WA}**`
}

function r_booking(ctx: ConversationContext): string {
  if (ctx.phone) {
    return `Bilkul${nm(ctx)}! 😊 Team jald contact karegi.\n\nYa seedha WhatsApp: **${WA}**`
  }
  if (ctx.name) {
    return `${ctx.name} ji, free site visit ke liye apna WhatsApp number share karein! 📱`
  }
  return `Free site visit bilkul free hai! 😊\n\nAapka naam aur number bata dijiye — team appoint karti hoon.`
}

function r_call(): string {
  return isOffHours()
    ? `📞 **${WA}**\n\nAbhi office hours ke baad hai — team kal 9 AM pe call karegi.\nYa WhatsApp message karein, reply milega! 💬`
    : `📞 **Call / WhatsApp: ${WA}**\n\nAbhi available hain — seedha baat karein hamare expert se!`
}

function r_comparison(t: string): string {
  if ((t.includes("pvc") && t.includes("gypsum")) || /ceiling.{0,20}(vs|versus|compare|differ)/.test(t))
    return COMPARISONS["pvc-vs-gypsum"]
  if (t.includes("wpc") && (t.includes("uv") || t.includes("marble")))
    return COMPARISONS["wpc-vs-uv"]
  if (t.includes("pvc") && t.includes("wpc"))
    return COMPARISONS["pvc-vs-wpc"]
  return `Kya compare karna hai?\n\n🏠 **PVC vs Gypsum** — ceiling ke liye\n🪵 **WPC vs UV Marble** — wall ke liye\n\nBataiye — honest comparison dungi!`
}

/**
 * Pricing responder — ALWAYS uses lastTopic/roomSize from context.
 * Never asks for something user already gave.
 */
function r_pricing(t: string, ctx: ConversationContext): string {
  const dimMatch = DIM_REGEX.exec(t)

  // Dimensions in this message → give estimate immediately
  if (dimMatch) {
    return r_estimate(t, ctx)
  }

  const key = resolveServiceKey(t, ctx)
  const p = PRICE_MAP[key]
  const name = SERVICE_NAME[key] || key

  // Update topic tracking
  ctx.lastTopic = key

  // If we already have room size → give estimate directly
  if (ctx.roomSize) {
    const parts = ctx.roomSize.split("x").map(Number)
    if (parts.length === 2 && parts[0] && parts[1]) {
      const [l, w] = parts
      return formatPriceEstimate(l, w, key, name) + `\n\n📞 Exact quote ke liye: **${WA}**`
    }
  }

  // Show price range for service
  const lines: string[] = [`**${name}** — ${p?.range || "custom quote"}`]
  if (p?.premium) lines.push(`Premium: ${p.premium}`)

  // Ask for size only if we haven't already
  if (!ctx.askedSize) {
    ctx.askedSize = true
    lines.push(`\nRoom ka size bataiye (jaise 12×14) — exact estimate abhi nikaaluun! 📐`)
  } else {
    lines.push(`\n📞 Exact quote: free site visit — **${WA}**`)
  }

  return lines.join("\n")
}

/**
 * Estimate responder — extracts dimensions, resolves service from context.
 */
function r_estimate(t: string, ctx: ConversationContext): string {
  const dimMatch = DIM_REGEX.exec(t)
  if (!dimMatch) return r_pricing(t, ctx)

  const l = parseInt(dimMatch[1]), w = parseInt(dimMatch[2])
  const key = resolveServiceKey(t, ctx)
  const name = SERVICE_NAME[key] || "Ceiling"

  // Persist to context
  ctx.roomSize  = `${l}x${w}`
  ctx.lastTopic = key

  return formatPriceEstimate(l, w, key, name) +
    `\n\n📞 Exact quote ke liye free site visit — **${WA}**`
}

function r_waterproof(t: string, room: { label: string; isWet: boolean } | null, ctx: ConversationContext): string {
  const wetRoom = room?.isWet || /bathroom|kitchen|balcony/.test(t)
  const label = room?.label || (
    t.includes("bathroom") ? "Bathroom" :
    t.includes("kitchen")  ? "Kitchen"  :
    t.includes("balcony")  ? "Balcony"  : null
  )

  if (wetRoom) {
    const sizeAsk = ctx.roomSize
      ? `\n\n${label || "Room"} ka size ${ctx.roomSize} — estimate nikaaluun?`
      : `\n\nRoom ka size bataiye (jaise 10×12) — exact estimate abhi! 📐`
    return `${label || "Is room"} ke liye **PVC Ceiling** best — ${PRICE_MAP.pvc.range}, 100% waterproof, 20+ saal ki life. 💧\n\nWalls ke liye **UV Marble** (${PRICE_MAP.uv?.range}) — real marble look, 100% waterproof!${sizeAsk}`
  }
  return `Waterproof ke liye 2 best options:\n\n🏠 **PVC Ceiling** — ${PRICE_MAP.pvc.range}\n💎 **UV Marble Sheets** — ${PRICE_MAP.uv?.range}\n\nDono 100% waterproof! Kaunsi room ke liye?`
}

function r_design(t: string, ctx: ConversationContext): string {
  const roomType = ctx.roomType || (
    t.includes("hall") || t.includes("living") ? "Hall"    :
    t.includes("bedroom")                       ? "Bedroom" :
    t.includes("tv")                            ? "TV"      :
    t.includes("office")                        ? "Office"  :
    t.includes("kitchen")                       ? "Kitchen" : null
  )

  const sizeAsk = ctx.roomSize ? "" : "\n\nSize bataiye — exact estimate dungi!"

  if (roomType === "Hall" || roomType === "Dining")
    return `Hall ke liye trending designs:\n\n✨ **Gypsum cove ceiling** — LED strip ke saath\n🪵 **WPC fluted panels** — TV wall pe 3D look\n💎 **UV marble accent** — premium feel${sizeAsk}`
  if (roomType === "Bedroom")
    return `Bedroom ke liye:\n\n✨ **Gypsum ceiling** — soft cove lighting\n🪵 **WPC headboard wall** — luxury look\n🏠 **PVC ceiling** — budget-friendly${sizeAsk}`
  if (roomType === "TV")
    return `TV wall ke liye:\n\n🪵 **WPC fluted panels** — #1 trending 3D look\n📺 **Modular TV unit** — custom + LED backlight\n💎 **UV marble backdrop** — premium low cost${sizeAsk}`
  if (roomType === "Office")
    return `Office ke liye:\n\n🏢 **Grid ceiling** — commercial standard\n✨ **Gypsum** — premium cabin look\n🪵 **WPC panels** — professional feel${sizeAsk}`
  if (roomType === "Kitchen")
    return `Kitchen ke liye:\n\n🏠 **PVC ceiling** — 100% waterproof, zero maintenance\n💎 **UV Marble walls** — marble look, easy clean${sizeAsk}`
  return `Modern interior ke liye:\n\n✨ Gypsum cove — hall/bedroom\n🪵 WPC fluted — TV wall\n💎 UV marble — bathroom/kitchen\n🏠 PVC — budget, har room\n\nKis room ke liye?`
}

function r_installation(t: string, ctx: ConversationContext): string {
  const key = resolveServiceKey(t, ctx)
  // Urgent timeline query — specific response
  if (/kal\s*tak|aaj\s*(hi|chahiye)|abhi\s*chahiye|urgent|asap|turant/.test(t)) {
    const oh = isOffHours()
    return oh
      ? `Urgent request samajh aa gayi! ⚡\n\nAbhi WhatsApp karein — kal ke liye slot confirm karte hain:\n📱 **${WA}**`
      : `Kal tak possible hai! ⚡\n\n🏠 PVC — sirf 1 din\n✨ Gypsum — 2-3 din (kal tak 1 room ho sakta)\n\nAbhi WhatsApp karein — slot book karte hain:\n📱 **${WA}**`
  }
  if (key === "pvc" || t.includes("pvc"))
    return `PVC ceiling — **1 room mein sirf 1 din!** Poore ghar mein 3-4 din. ⚡\n\nJaldi start karwana chahte hain? **${WA}**`
  if (key === "gypsum" || t.includes("gypsum"))
    return `Gypsum ceiling — **2-3 din/room**, poore ghar mein 5-7 din. ⏱\n\nBook karein: **${WA}**`
  if (key === "wpc" || t.includes("wpc"))
    return `WPC paneling — **1-2 din/wall**. Minimum dust, minimum disturbance! 🪵\n\nBook: **${WA}**`
  return `Installation time:\n\n🏠 PVC — 1 din/room\n✨ Gypsum — 2-3 din/room\n🪵 WPC — 1-2 din/wall\n💎 UV marble — 1-2 din/room\n🏢 Grid — 1 din/room\n\nKaunsa kaam karwana hai?`
}

function r_budget(room: { label: string; isWet: boolean } | null, ctx: ConversationContext): string {
  const sizeAsk = ctx.roomSize ? "" : "\n\nRoom ka size bataiye — estimate nikaaluun!"
  if (room?.isWet || ctx.roomType?.match(/kitchen|bathroom|balcony/i))
    return `Budget mein **PVC Ceiling** best — ${PRICE_MAP.pvc.range}, 100% waterproof! ${room?.label || ctx.roomType} ke liye perfect. 💧${sizeAsk}`
  return `Budget-friendly options:\n\n🏠 **PVC Ceiling** — ${PRICE_MAP.pvc.range} (waterproof + zero maintenance)\n💎 **UV Marble** — ${PRICE_MAP.uv?.range} (marble look, walls ke liye)\n\nDono mein se kaunsa room ke liye?${sizeAsk}`
}

function r_negotiation(t: string): string {
  if (/discount|offer|kam\s*karo|chhut|thoda\s*kam/.test(t))
    return `Hamare rates already competitive hain — koi hidden charge nahi! 💰\n\nEk saath multiple rooms karwane pe **combo discount** milta hai.\n\nFree site visit: **${WA}**`
  return `Bilkul bharosa karein! 🙏\n\n✅ 1 saal ki written warranty\n✅ ISI-certified materials\n✅ 500+ projects, 8+ saal ka experience\n✅ Kaam se pehle material sample\n\nFree site visit mein khud dekh sakte hain!`
}

function r_confused(ctx: ConversationContext, room: { label: string; isWet: boolean } | null): string {
  const roomLabel = ctx.roomType || room?.label
  if (roomLabel) {
    // Check isWet from detected room OR from ctx.roomType string directly
    const isWet = room?.isWet ?? /kitchen|bathroom|balcony/i.test(ctx.roomType || "")
    const rec = recommendMaterial(roomLabel, isWet, ctx.budget ?? null)
    const sizeAsk = ctx.roomSize ? "" : "\n\nRoom ka size batao — estimate bhi de dungi!"
    return `Koi baat nahi! 😊\n\n${roomLabel} ke liye: **${rec.primary}** — ${rec.reason}${rec.alternative ? `\n\nAlternative: **${rec.alternative}** — ${rec.altReason}` : ""}${sizeAsk}`
  }
  return `Main guide karungi! 😊\n\n1️⃣ Kaunsi room? (Hall, Bedroom, Kitchen, Bathroom)\n2️⃣ Budget basic hai ya premium?\n\nBataiye — best option suggest karungi!`
}

function r_quality(ctx: ConversationContext): string {
  const n = nm(ctx)
  return `JK Interior Quality${n}:\n\n✅ **1 saal ki written warranty** — koi issue, free repair\n✅ **ISI-certified** branded materials\n✅ 100% waterproof options\n✅ **8+ saal, 500+ projects**\n✅ Kaam se pehle material sample\n\nNishchint rahein — quality guarantee hai! 🙏`
}

function r_area(t: string, knownCity?: string, ctx?: ConversationContext): string {
  const city = detectCity(t) || knownCity
  if (city) {
  const isMain = ["Forbesganj", "Araria"].includes(city)
  const cityLine = `✅ **${city}** mein bilkul kaam karte hain!${isMain ? " 💪 (hamara main area)" : " 😊"}`
  const topic = ctx?.lastTopic || ctx?.service
  if (topic) {
    const topicName: Record<string, string> = {
      gypsum: "Gypsum Ceiling", pvc: "PVC Ceiling",
      wpc: "WPC Wall Panels", uv: "UV Marble Sheets", tvunit: "Modular TV Unit",
    }
    const readable = topicName[topic] || topic
    const sizePrompt = ctx?.roomSize
      ? `Room size already noted — estimate nikaalte hain!`
      : `Room ka size batao (jaise 12×14) — exact estimate abhi nikalti hoon! 📐`
    return `${cityLine}\n\n${readable} ke liye — ${sizePrompt}\n\n📞 **${WA}**`
  }
  return `${cityLine}\n\nKaunsa kaam karwana hai? Room size bataiye — estimate abhi! 📐`
  }
  return `📍 Main service area: **Forbesganj & Araria**\n\nNearby cities:\nJogbani • Raniganj • Narpatganj • Kursakanta\nTribeniganj • Chhatapur • Supaul • Purnia\n\nAap kis city mein hain?`
}

function r_serviceInfo(): string {
  return `JK Interior ki services:\n\n✨ Gypsum Ceiling — ${PRICE_MAP.gypsum.range}\n🏠 PVC Ceiling — ${PRICE_MAP.pvc.range}\n🪵 WPC Wall Panels — ${PRICE_MAP.wpc.range}\n💎 UV Marble Sheets — ${PRICE_MAP.uv?.range}\n📺 Modular TV Unit — ${PRICE_MAP.tvunit?.range}\n🏛️ Fluted Panels — ${PRICE_MAP.fluted?.range}\n🏢 Grid Ceiling — ${PRICE_MAP.grid?.range}\n🌿 Artificial Grass — ${PRICE_MAP["artificial-grass"]?.range}\n\nKis service ke baare mein jaanna hai?`
}

/**
 * Deep material info — handles specific material questions with details.
 */
function r_materialDetail(t: string, ctx: ConversationContext): string | null {
  const sizeAsk = ctx.roomSize ? "" : "\n\nRoom ka size bataiye — exact estimate nikaaluun! 📐"
  const sizeCalc = (key: string, name: string) => {
    if (!ctx.roomSize) return sizeAsk
    const parts = ctx.roomSize.split("x").map(Number)
    if (parts.length === 2 && parts[0] && parts[1])
      return "\n\n" + formatPriceEstimate(parts[0], parts[1], key, name) + `\n\n📞 **${WA}**`
    return sizeAsk
  }

  if (t.includes("gypsum")) {
    if (/water|bathroom|nami|moisture|geela/.test(t))
      return `Gypsum waterproof nahi hoti! 🚫\n\nBathroom/kitchen ke liye **PVC Ceiling** (${PRICE_MAP.pvc.range}) best hai — 100% waterproof.\n\nHall/bedroom ke liye gypsum perfect. Room size?`
    ctx.lastTopic = "gypsum"
    return `**Gypsum Ceiling** — ${PRICE_MAP.gypsum.range}\n\n✨ Cove lighting, POP designs, premium smooth finish\n📅 Install: 2-3 din/room | Warranty: 1 saal\n🏆 Hall aur bedroom ke liye #1 choice${sizeCalc("gypsum", "Gypsum Ceiling")}`
  }
  if (t.includes("pvc")) {
    ctx.lastTopic = "pvc"
    return `**PVC Ceiling** — ${PRICE_MAP.pvc.range}\n\n💧 100% waterproof, termite-proof, 20+ saal ki life\n⚡ Install: sirf 1 din/room | Warranty: 1 saal\n✅ Zero maintenance — kabhi repaint nahi${sizeCalc("pvc", "PVC Ceiling")}`
  }
  if (t.includes("wpc") || t.includes("wood panel") || t.includes("louver")) {
    ctx.lastTopic = "wpc"
    return `**WPC Wall Panels** — ${PRICE_MAP.wpc.range}\n\n🪵 Premium wood look, moisture resistant\n📅 Install: 1-2 din/wall | Warranty: 1 saal\n🏆 TV wall ke liye #1 trending choice${sizeCalc("wpc", "WPC Wall Panels")}`
  }
  if (/\buv\b|\bmarble\s*sheet\b/.test(t)) {
    ctx.lastTopic = "uv"
    return `**UV Marble Sheets** — ${PRICE_MAP.uv?.range}\n\n💎 Real marble look at 70% less cost!\n💧 100% waterproof, scratch resistant\n🏆 Bathroom, kitchen walls ke liye best${sizeCalc("uv", "UV Marble Sheets")}`
  }
  if (/\btv\s*(unit|panel|wall)\b/.test(t)) {
    ctx.lastTopic = "tvunit"
    return `**Modular TV Unit** — ${PRICE_MAP.tvunit?.range}\n\nSizes:\n• 6–8 ft: ₹15k–25k\n• 8–10 ft: ₹25k–40k\n• 10–14 ft: ₹40k–70k+\n\nLED backlight add ho sakti hai! TV wall ka width?`
  }
  if (t.includes("fluted") || t.includes("ribbed") || t.includes("3d panel")) {
    ctx.lastTopic = "fluted"
    return `**Fluted Panels** — ${PRICE_MAP.fluted?.range}\n\n🏛️ 2025-26 ka #1 trending wall design! 3D textured look.\n\nWall ka size?`
  }
  if (t.includes("grid") || t.includes("office ceiling")) {
    ctx.lastTopic = "grid"
    return `**Grid Ceiling** — ${PRICE_MAP.grid?.range}\n\n🏢 Office, shop, hospital ke liye standard\n✅ Easy AC/electrical access${sizeCalc("grid", "Grid Ceiling")}`
  }
  if (t.includes("acoustic") || t.includes("soundproof")) {
    ctx.lastTopic = "acoustic"
    return `**Acoustic Panels** — ${PRICE_MAP.acoustic?.range}\n\n🎧 Echo kam, sound quality improve\n🏆 Home theatre, studio ke liye best\n\nArea ka size?`
  }
  if (t.includes("flooring") || t.includes("laminate")) {
    ctx.lastTopic = "flooring"
    return `**Laminate Flooring** — ${PRICE_MAP.flooring?.range}\n\n🪵 Real wood look, scratch resistant, easy clean\n\nRoom ka size?`
  }
  if (t.includes("wallpaper")) {
    ctx.lastTopic = "wallpaper"
    return `**Wallpaper** — ${PRICE_MAP.wallpaper?.range}\n\n🎨 Premium textures, 3D designs, easy to apply\n\nWall ka area?`
  }
  if (/\bcomplete\s*interior\b|\bfull\s*interior\b|\bpoora\s*ghar\b|\bpura\s*ghar\b/.test(t))
    return `**Complete Interior Package** 🏡\n\nCeiling + Wall Panels + TV Unit — ek team, ek timeline!\n\n✅ Combo discount available\n✅ 1 saal ki warranty\n✅ 500+ full home projects\n\nFree consultation: **${WA}**`
  if (/\bled\b|\bcove\s*light\b|\bstrip\s*light\b/.test(t)) {
    // LED with room size if available
    if (ctx.roomSize) {
      const parts = ctx.roomSize.split("x").map(Number)
      if (parts.length === 2 && parts[0] && parts[1]) {
        const perim = 2 * (parts[0] + parts[1])
        const lo = Math.round(perim * 40 / 100) * 100
        const hi = Math.round(perim * 80 / 100) * 100
        return `**LED Cove Lighting** — ₹40–80/running ft\n\n${ctx.roomSize} room mein roughly ₹${lo.toLocaleString("en-IN")}–₹${hi.toLocaleString("en-IN")} extra.\n\nGhar cinema jaisa! 😍`
      }
    }
    return `**LED Cove Lighting** — ₹40–80/running ft\n\nGypsum ceiling ke saath LED = ghar cinema jaisa! 😍\n\nRoom size batao — LED ka estimate bhi nikalti hoon!`
  }
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
  if (t.length > 120) return null

  const prevTopic  = (ctx.lastTopic || "").toLowerCase()
  const prevIntent = ctx.lastIntent

  // "LED bhi?" / "cove lighting bhi?" — add-on to gypsum discussion
  if (/\b(led|cove|strip\s*light|backlight)\b/.test(t)) {
    if (prevTopic.includes("gypsum") || ctx.service?.toLowerCase().includes("gypsum")) {
      if (ctx.roomSize) {
        const parts = ctx.roomSize.split("x").map(Number)
        if (parts.length === 2 && parts[0] && parts[1]) {
          const perim = 2 * (parts[0] + parts[1])
          const lo = Math.round(perim * 40 / 100) * 100
          const hi = Math.round(perim * 80 / 100) * 100
          return `Gypsum + LED cove:\n\n✨ ₹40–80/running ft\n${ctx.roomSize} room mein roughly **₹${lo.toLocaleString("en-IN")}–₹${hi.toLocaleString("en-IN")}** extra.\n\nGhar cinema jaisa! 😍`
        }
      }
      return `Gypsum + LED cove:\n\n✨ ₹40–80/running ft\nRoom size batao — total estimate ke saath LED bhi nikalti hoon! 📐`
    }
  }

  // "Bathroom ke liye?" / "kitchen ke liye?" — room pivot
  const roomPivot = detectRoomType(t)
  if (roomPivot && /\bke\s*liye\b|\bwala\b|\bmein\b/.test(t) && t.length < 50) {
    ctx.roomType = roomPivot.label
    const rec = recommendMaterial(roomPivot.label, roomPivot.isWet, ctx.budget ?? null)
    const sizeAsk = ctx.roomSize ? `\n\n${roomPivot.label} ka size ${ctx.roomSize} — estimate nikaaluun?` : `\n\nRoom ka size? (jaise 8×10)`
    return `${roomPivot.label} ke liye **${rec.primary}** best hai — ${rec.reason}.${rec.alternative ? `\n\nAlternative: **${rec.alternative}** — ${rec.altReason}` : ""}${sizeAsk}`
  }

  // "Gypsum wala kitna?" after PVC discussion
  if (/gypsum/.test(t) && prevTopic.includes("pvc") && (prevIntent === "pricing" || prevIntent === "room-estimate")) {
    ctx.lastTopic = "gypsum"
    if (ctx.roomSize) {
      const parts = ctx.roomSize.split("x").map(Number)
      if (parts.length === 2 && parts[0] && parts[1])
        return formatPriceEstimate(parts[0], parts[1], "gypsum", "Gypsum Ceiling") + `\n\n📞 Free site visit: **${WA}**`
    }
    return `Gypsum ceiling — ${PRICE_MAP.gypsum.range} (PVC se thoda premium, cove lighting possible).\n\nRoom size batao!`
  }

  // "PVC wala?" after gypsum discussion
  if (/pvc/.test(t) && prevTopic.includes("gypsum") && (prevIntent === "pricing" || prevIntent === "room-estimate")) {
    ctx.lastTopic = "pvc"
    if (ctx.roomSize) {
      const parts = ctx.roomSize.split("x").map(Number)
      if (parts.length === 2 && parts[0] && parts[1])
        return formatPriceEstimate(parts[0], parts[1], "pvc", "PVC Ceiling") + `\n\n📞 Free site visit: **${WA}**`
    }
    return `PVC ceiling — ${PRICE_MAP.pvc.range} (gypsum se sasta + 100% waterproof).\n\nRoom size?`
  }

  // User gives ONLY dimensions — use lastTopic immediately
  const dimOnly = DIM_REGEX.exec(t)
  if (dimOnly && !/(pvc|gypsum|wpc|uv|marble|grid|fluted|acoustic|flooring|wallpaper)/.test(t)) {
    const l = parseInt(dimOnly[1]), w = parseInt(dimOnly[2])
    ctx.roomSize = `${l}x${w}`
    const key = prevTopic || resolveServiceKey("", ctx)
    const name = SERVICE_NAME[key] || "Ceiling"
    ctx.lastTopic = key
    return formatPriceEstimate(l, w, key, name) + `\n\n📞 Exact quote: **${WA}**`
  }

  // "Bina LED ke?" / "without lighting?"
  if (/\b(without|bina|sirf\s*ceiling|nahi\s*chahiye)\b/.test(t) && ctx.lastTopic) {
    const key = ctx.lastTopic
    return `Bina LED ke **${SERVICE_NAME[key] || key}** — ${PRICE_MAP[key]?.range || "custom quote"}\n\n${ctx.roomSize ? "Room size pehle se pata hai — exact estimate ke liye free site visit!" : "Room size batao!"}`
  }

  // "Cheap option?" / "sasta kya hai?" follow-up
  if (/cheap|sasta|affordable|kam\s*price|saste\s*mein/.test(t) && prevTopic) {
    return `${prevTopic === "wpc" ? "WPC se sasta" : "Most affordable"} option:\n\n🏠 **PVC Ceiling** — ${PRICE_MAP.pvc.range}\n\n100% waterproof, zero maintenance. Kafi popular choice hai! Room ka size?`
  }

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// NEW RESPONDERS — vastu, competitor, urgent
// ─────────────────────────────────────────────────────────────────────────────

function r_vastu(ctx: ConversationContext): string {
  const n = nm(ctx)
  return `Vastu ke hisaab se kuch tips${n}:

🧭 **Ceiling design** — koi bhi material vastu-neutral hota hai
✨ **Gypsum** — hall mein north/east direction pe cove lighting best hai
🏠 **PVC** — bathroom/kitchen ke liye (water zones) — vastu bhi yahi kehta hai
💎 **UV marble** — south wall pe marble effect — prosperity ke liye maana jaata hai

Hum design mein vastu ka dhyan rakhte hain! Free site visit mein discuss karein.

📞 **${WA}**`
}

function r_competitor(ctx: ConversationContext): string {
  const n = nm(ctx)
  return `${ctx.name ? ctx.name + " ji, " : ""}hamare baare mein honestly bolunga:

✅ **ISI-certified materials** — local market se alag
✅ **1 saal written warranty** — market mein rare hai
✅ **500+ projects, 8+ saal** — proven track record
✅ **No hidden charges** — jo quote, wohi final
✅ **Labour + material** — ek hi team

Rate compare karna ho toh — free site visit mein exact quote lo, phir decide karo. Koi pressure nahi! 🙏

📞 **${WA}**`
}

function r_urgent(ctx: ConversationContext): string {
  const n = nm(ctx)
  const oh = isOffHours()
  if (oh) {
    return `Urgent kaam ke liye${n} — abhi WhatsApp karein:

📱 **${WA}**

Team kal 9 AM pe contact karegi. Urgent message likh dein — priority mein lenge! ⚡`
  }
  return `Urgent kaam ke liye${n} — abhi seedha contact karein:

📞 **Call/WhatsApp: ${WA}**

Team available hai — aaj ya kal ka slot milega! ⚡

Room ka size aur kaam bata dijiye — estimate bhi abhi nikalti hoon!`
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. SMART LOCAL FALLBACK — when intent is "general" and no match found
// ─────────────────────────────────────────────────────────────────────────────

function smartLocalFallback(ctx: ConversationContext, t: string): string | null {
  const n = nm(ctx)

  // Has city + wants work but no service/size
  if (ctx.city && !ctx.service && !ctx.roomType) {
    return `${ctx.city} mein karte hain! 💪\n\nKaunsa kaam karwana hai${n}? Ceiling, wall paneling, TV unit?`
  }

  // Has service + room type but no size (ask once)
  if (ctx.service && ctx.roomType && !ctx.roomSize && !ctx.askedSize) {
    ctx.askedSize = true
    return `${ctx.service} — ${ctx.roomType} ke liye accha choice hai! 👍\n\nRoom ka size bataiye (jaise 10×12) — exact estimate abhi nikaaluun!`
  }

  // Has room type only — recommend + ask size
  if (ctx.roomType && !ctx.roomSize) {
    const rec = recommendMaterial(ctx.roomType, false, ctx.budget ?? null)
    return `${ctx.roomType} ke liye **${rec.primary}** best hai — ${rec.reason}${rec.alternative ? `\nAlternative: **${rec.alternative}**` : ""}\n\nSize batao (jaise 12×14) — estimate!`
  }

  // Has service only — ask room type
  const svcObj = detectService(t)
  if (svcObj && !ctx.roomType && !ctx.askedRoomType) {
    ctx.askedRoomType = true
    return `**${svcObj.name}** — accha choice! 👍\n\nKaunsi room ke liye? Hall, bedroom, kitchen ya koi aur?`
  }

  // Multi-room query WITHOUT sizes — "2 bedroom aur 1 hall ka total"
  const multiRoomPattern = /\b(\d+)\s*(bedroom|bed\s*room|kamra|hall|drawing|living|kitchen|bathroom|room)\b.*\b(aur|and|\+|or)\b.*\b(\d+)\s*(bedroom|bed\s*room|kamra|hall|drawing|living|kitchen|bathroom|room)\b/i
  if (multiRoomPattern.test(t) && !DIM_REGEX.test(t)) {
    return `Multiple rooms ka estimate chahiye! 📐\n\nSabse accha hoga agar har room ka size batao:\n\nJaise: "2 bedroom 12×14, hall 16×18"\n\nYa seedha free site visit mein sab measure karke exact quote denge!\n\n📞 **${WA}**`
  }

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. MAIN ENGINE
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

  // Update context with new signals (never overwrite existing good data)
  if (city   && !ctx.city)     ctx.city     = city
  if (budget)                  ctx.budget   = budget
  if (room)                    ctx.roomType = room.label
  if (svcObj && !ctx.service)  ctx.service  = svcObj.name
  ctx.lastIntent = intent
  ctx.messagesExchanged = (ctx.messagesExchanged || 0) + 1

  // Update lastTopic — only when text has explicit service mention
  if (svcObj) {
    ctx.lastTopic = svcObj.key
  } else {
    const explicitKey = resolveServiceKey(t, { ...ctx, lastTopic: undefined, service: undefined })
    const hasExplicit = /(pvc|gypsum|wpc|uv|marble|grid|fluted|acoustic|flooring|grass|wallpaper|led|tvunit|tv\s*(unit|panel|wall))/.test(t)
    if (hasExplicit) ctx.lastTopic = explicitKey
  }

  const hasDim = DIM_REGEX.test(t)

  // ── Complex/detailed questions → let Groq handle (length > 80 chars with specific words)
  // These indicate nuanced situations the rule engine can't answer properly
  const COMPLEX_SIGNALS = /uneven|column|pillar|purana|old\s*wall|damage|crack|seepage.*wall|wall.*seepage|corner|curved|irregular|sloped|ceiling.*low|low.*ceiling|renovation|pehle\s*se|already|existing|already\s*laga|pehle\s*laga/i
  if (t.length > 70 && COMPLEX_SIGNALS.test(t)) return null

  // ── 1. Context-aware follow-up FIRST (highest priority)
  const followUp = resolveContextualFollowUp(input, ctx)
  if (followUp) return followUp

  // ── 2. Multi-room estimate
  const multiRooms = !hasDim ? parseMultiRoomQuery(t) : null
  if (multiRooms) {
    const est = generateMultiRoomEstimate(multiRooms)
    ctx.estimateGiven = est.slice(0, 80)
    const cta = ctx.city
      ? `\n\n📞 ${ctx.city} mein free site visit — **${WA}**`
      : `\n\nFree site visit ke liye WhatsApp: **${WA}**`
    return est + cta
  }

  // ── 3. Intent routing
  switch (intent) {
    case "greeting":        return r_greeting(ctx)
    case "thanks":          return r_thanks(ctx)
    case "complaint":       return r_complaint()
    case "booking":         return r_booking(ctx)
    case "call-request":    return r_call()
    case "comparison":      return r_comparison(t)
    case "room-estimate":   return r_estimate(t, ctx)
    case "pricing":         return r_pricing(t, ctx)
    case "waterproof":      return r_waterproof(t, room, ctx)
    case "design":          return r_design(t, ctx)
    case "installation":    return r_installation(t, ctx)
    case "budget":          return r_budget(room, ctx)
    case "negotiation":     return r_negotiation(t)
    case "confused":        return r_confused(ctx, room)
    case "image-reference": {
      const photoMsg = /photo\s*(dekh|dekha|dekho|bhejo|bhej|send)|image\s*(dekh|send)|pic\s*(dekh|send)/.test(t)
        ? `Photo dekh ke bilkul bata sakti hoon! 📸\n\nWhatsApp pe photo bhejein — exact same design ka estimate aur feasibility bataungi:\n\n📱 **${WA}**\n\nYa free site visit mein directly dikhaiye!`
        : `Design reference ke hisaab se bilkul bana sakte hain! 🎨\n\nFree site visit mein photo dikhaiye — exact style mein estimate.\n\nWhatsApp pe photo bhejein: **${WA}**`
      return photoMsg
    }
    case "quality":         return r_quality(ctx)
    case "area":            return r_area(t, ctx.city, ctx)
    case "service-info":    return r_serviceInfo()
    case "vastu":           return r_vastu(ctx)
    case "competitor":      return r_competitor(ctx)
    case "urgent":          return r_urgent(ctx)
  }

  // ── 4. City mention alone (short message)
  if (city && t.length < 50 && !svcObj) {
    return `**${city}** mein hum kaam karte hain! 💪\n\nKaunsa kaam karwana hai? Room size bataiye — estimate abhi!`
  }

  // ── 5. Deep material info — only for short/direct material questions
  if (t.length < 80) {
    const matDetail = r_materialDetail(t, ctx)
    if (matDetail) return matDetail
  }

  // ── 6. FAQ matching
  for (const faq of FAQ) {
    if (faq.q.some((kw: string) => t.includes(kw))) return faq.a
  }

  // ── 7. Smart local fallback (context-driven)
  const localFallback = smartLocalFallback(ctx, t)
  if (localFallback) return localFallback

  // ── 8. Return null → Groq handles it
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. QUICK REPLIES — context-aware chips
// ─────────────────────────────────────────────────────────────────────────────

export function getSmartQuickReplies(ctx: ConversationContext): string[] {
  const i = ctx.lastIntent
  const hasTopic = !!ctx.lastTopic

  if (i === "pricing" || i === "room-estimate") {
    return hasTopic
      ? ["Book Site Visit", "Compare Materials", "LED bhi chahiye?", "Other Services"]
      : ["PVC Ceiling", "Gypsum Ceiling", "Compare Both", "Book Site Visit"]
  }
  if (i === "comparison")   return ["Get Estimate", "Book Site Visit", "Budget Options", "Premium Options"]
  if (i === "design")       return ["Get Estimate", "Book Site Visit", "Material Options", "LED Lighting"]
  if (i === "booking")      return ["WhatsApp Now", "Call Now", "Other Services"]
  if (i === "waterproof")   return ["PVC Rate", "UV Marble Rate", "Get Estimate", "Book Site Visit"]
  if (i === "budget")       return ["PVC Ceiling", "UV Marble", "Get Estimate", "Book Site Visit"]
  if (i === "quality")      return ["Book Site Visit", "PVC Ceiling", "Gypsum Ceiling"]
  if (i === "area")         return ["Get Estimate", "Book Site Visit", "Our Services"]
  if (i === "installation") return ["Book Site Visit", "Get Estimate", "Call Now"]
  if (i === "confused")     return ["Hall/Living Room", "Bedroom", "Kitchen/Bathroom", "Full Home"]
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

export { ALL_AREAS, CITY_MAP }

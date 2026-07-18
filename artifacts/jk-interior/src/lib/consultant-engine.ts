/**
 * JK Interior — Consultant Engine v7.0
 * ─────────────────────────────────────
 * Improvements over v6.0:
 *  [I1] Stronger Hindi/Hinglish normalizer — more patterns, devanagari support
 *  [I2] Intent detection — fixed false positives, better ordering, "nahi" guard
 *  [I3] WhatsApp number shared ONLY for booking/quotation/site-visit intents
 *  [I4] Deduplication guard — last bot reply stored in ctx, prevents repeat
 *  [I5] Topic-switch detection — user mid-convo changes material/room type
 *  [I6] Context-answer-first rule — every responder answers the Q before upselling
 *  [I7] r_general — genuine fallback that doesn't ask WhatsApp randomly
 *  [I8] detectIntent — new "off-topic" intent redirects politely
 *  [I9] Hinglish variants expanded throughout responders
 *  [I10] New intents: 'view_catalog' and 'book_visit' with Hinglish keyword support
 *  [I11] MULTI_ROOM_DETECTED guard — multi-room detection never breaks normal intent flow
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
  | "quality" | "area" | "service-info" | "vastu" | "competitor" | "urgent"
  | "off-topic" | "general"
  // [I10] New intents — catalog viewer & visit booking
  | "view_catalog" | "book_visit"

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
  lastQuestionAsked?: 'room_size' | 'room_type' | 'city' | 'budget' | 'material' | 'phone' | 'name' | null
  lastEstimateFlow?: {
    active: boolean
    material?: string
    roomSize?: string
    step: 'asking_material' | 'asking_size' | 'showing_estimate' | 'asking_booking'
  }
  conversationStage?: 'greeting' | 'discovery' | 'consultation' | 'estimation' | 'booking'
  // [I4] last reply fingerprint to prevent exact repeats
  _lastReplyHash?: string
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

// ── Dimension regex
const DIM_REGEX = /(\d{1,3})\s*(?:[x×X]|\bby\b)\s*(\d{1,3})/i

// ── Derive PRICE_MAP from SERVICE_CATALOG
const PRICE_MAP: Record<string, { range: string; premium?: string }> = Object.fromEntries(
  SERVICE_CATALOG.map(s => [s.key, { range: s.priceRange }])
)
PRICE_MAP.gypsum           = { range: "₹80–140/sq.ft",   premium: "₹120–200/sq.ft (with LED cove)" }
PRICE_MAP.pvc              = { range: "₹80–140/sq.ft",   premium: "₹90–150/sq.ft (designer textures)" }
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

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function nm(ctx: ConversationContext): string {
  return ctx.name ? ` ${ctx.name} ji` : ""
}

// [I4] Simple hash to detect repeated replies
function simpleHash(s: string): string {
  return s.slice(0, 60).replace(/\s+/g, "")
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. NORMALIZER — [I1] Enhanced Hindi/Hinglish normalization
// ─────────────────────────────────────────────────────────────────────────────

export function normalizeTypos(text: string): string {
  return text
    // ── Price signals — Hinglish (expanded) ──
    .replace(/\bkitna\s+lagega\b/gi,    "price kitna lagega")
    .replace(/\bkitna\s+padega\b/gi,    "price kitna padega")
    .replace(/\bkitne\s+mein\b/gi,      "price kitne mein")
    .replace(/\bkitna\s+hai\b/gi,       "price kitna hai")
    .replace(/\bkitna\s+hoga\b/gi,      "price kitna hoga")
    .replace(/\bkitna\s+kharch\b/gi,    "price kitna kharch")
    .replace(/\bkharcha\s+kitna\b/gi,   "price kharcha kitna")
    .replace(/\bkya\s+rate\b/gi,        "price rate")
    .replace(/\brate\s+kya\b/gi,        "price rate")
    .replace(/\bkitna\s+paisa\b/gi,     "price kitna paisa")
    .replace(/\bkitne\s+rupaye\b/gi,    "price kitne rupaye")
    .replace(/\bpri[sz]e[sd]?\b/gi,     "price")
    .replace(/\bprizz\b/gi,             "price")
    .replace(/\bkharcha\b/gi,           "price kharcha")
    .replace(/\bkharche\b/gi,           "price kharche")
    .replace(/\bkitne\s+ka\b/gi,        "price kitne ka")
    .replace(/\bkitni\s+lagegi\b/gi,    "price kitni lagegi")
    .replace(/\bkitna\s+lega\b/gi,      "price kitna lega")
    // ── Gypsum typos ──
    .replace(/\bgyps[ua]n\b/gi, "gypsum")
    .replace(/\bgyps[ma]\b/gi,  "gypsum")
    .replace(/\bgysum\b/gi,     "gypsum")
    .replace(/\bgypzum\b/gi,    "gypsum")
    .replace(/\bjipsum\b/gi,    "gypsum")
    .replace(/\bjisum\b/gi,     "gypsum")
    .replace(/\bgypsam\b/gi,    "gypsum")
    .replace(/\bgipsum\b/gi,    "gypsum")
    // ── PVC typos ──
    .replace(/\bpv[si]\b/gi, "pvc")
    .replace(/\bpwc\b/gi,    "pvc")
    // ── WPC typos ──
    .replace(/\bw[cp][cp]\b/gi, "wpc")
    // ── Ceiling typos ──
    .replace(/\bceil+ing\b/gi, "ceiling")
    .replace(/\bce[il]+ng\b/gi, "ceiling")
    .replace(/\bsieling\b/gi,   "ceiling")
    .replace(/\bchath\b/gi,     "ceiling")
    .replace(/\bchhath\b/gi,    "ceiling")
    .replace(/\bchhat\b/gi,     "ceiling")
    .replace(/\bchhata\b/gi,    "ceiling")
    // ── Room typos ──
    .replace(/\bbathro[mu]m\b/gi, "bathroom")
    .replace(/\bkitchi[nm]\b/gi,  "kitchen")
    .replace(/\bkichhen\b/gi,     "kitchen")
    .replace(/\bbedrom\b/gi,      "bedroom")
    // ── Modular typos ──
    .replace(/\bmod[ue]l[ae]r\b/gi, "modular")
    // ── Greeting normalization ──
    .replace(/\bkya\s+hal\b/gi,    "kya haal")
    .replace(/\bkaise\s+hain\b/gi, "kaise ho")
    .replace(/\bkya\s+haal\s+hai\b/gi, "kaise ho")
    // ── Common Hinglish filler words (strip for intent detection) ──
    .replace(/\b(bhai|yaar|yar|bro|dost|yrr|yr|sir|madam|sahab)\b/gi, "")
    // ── Devanagari → Roman transliteration helpers ──
    .replace(/छत/g, "ceiling")
    .replace(/दीवार/g, "wall")
    .replace(/कमरा/g, "room")
    .replace(/रेट|रेट/g, "rate")
    .replace(/कितना/g, "kitna")
    .replace(/बताओ/g, "batao")
    .replace(/चाहिए/g, "chahiye")
    .replace(/\s{2,}/g, " ")
    .trim()
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SERVICE KEY RESOLVER
// ─────────────────────────────────────────────────────────────────────────────

export function resolveServiceKey(t: string, ctx: ConversationContext): string {
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
  if (ctx.lastTopic) return ctx.lastTopic
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
  if (ctx.roomType) {
    const r = ctx.roomType.toLowerCase()
    if (r.includes("kitchen") || r.includes("bathroom") || r.includes("balcony")) return "pvc"
    if (r.includes("office") || r.includes("shop")) return "grid"
  }
  return "gypsum"
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

// ── Intent keyword groups (expanded Hinglish)
const KW: Record<string, string[]> = {
  greeting:    ["hi", "hello", "hey", "namaste", "namaskar", "helo", "good morning", "good evening", "good afternoon", "hy", "hii", "salam", "kaise ho", "kya haal", "how are you", "hlo", "assalamualaikum", "jai hind", "pranam", "adaab"],
  thanks:      ["thank", "shukriya", "dhanyawad", "thanks", "thx", "bahut accha", "great", "perfect", "superb", "awesome", "shabash", "badiya", "wah", "bdhiya", "bilkul sahi", "ekdum sahi", "achha laga", "acha laga", "accha laga", "baat karke", "helpful", "bahut helpful", "helpful rahi", "helpful tha", "maza aaya", "maja aaya", "khushi hui", "helpful hai", "bohot accha", "bahut badhiya", "zabardast", "mast hai", "ekdum mast"],
  complaint:   ["problem", "issue", "complaint", "shikayat", "girna", "toota", "peeling", "leaking", "broken", "repair", "thik karo", "kharab", "nahi chal raha", "toot gaya", "gir gaya", "damage"],
  booking:     ["site visit", "measurement", "bulao", "survey", "appointment", "schedule", "bula lo", "free visit", "aana hai", "book karo", "shuru karein", "kab aao", "aap aa sakte", "visit karo", "aao ghar", "ghar aao", "kab aa sakte", "visit chahiye", "aaiye", "aao na", "milna hai", "mil sakte"],
  waterproof:  ["waterproof", "water proof", "paani", "seepage", "moisture", "humidity", "geela", "nami", "barish", "water resistant", "leak", "bheega", "namkin", "selan", "pani"],
  design:      ["design", "modern", "luxury", "latest", "trending", "beautiful", "sundar", "stylish", "cove", "pop design", "3d", "texture", "kaisa dikhega", "kaisa dikhta", "dikhaiye", "design chahiye", "design dikhao", "kaunsa accha lagega", "kaisa lagega ghar", "idea do", "suggest karo design", "trend"],
  install:     ["kitne din", "kitna time", "kab tak", "time lagega", "installation", "install", "fitting", "din lagega", "urgent", "kitna samay", "kab start", "kab hoga", "kitne dino mein"],
  budget:      ["sasta", "cheap", "affordable", "low budget", "budget tight", "sasta option", "minimum", "basic", "simple wala", "kam mein", "sabse sasta", "saste mein", "budget mein", "thoda sasta", "budget kam hai", "paisa kam hai"],
  negotiation: ["final rate", "discount", "offer", "chhut", "kam karo", "negotiate", "last price", "best price", "sample", "thoda kam", "aur kam", "rate kuch kam", "discount milega", "offer hai"],
  confused:    ["samajh nahi", "nahi aa raha", "kya sahi", "aap batao", "confused", "pata nahi", "decide nahi", "doubt", "madad", "guide", "suggest karo", "kya lagaun", "kya better", "konsa loon", "kaunsa loon", "kya karun", "kya karuun"],
  image:       ["photo", "image", "picture", "pic", "aisa design", "reference", "sample dikha", "pinterest", "instagram", "design dikhaiye", "dikhao", "photo bhejo", "image bhejo"],
  call:        ["call karo", "phone karo", "number do", "call back", "contact karo", "call karein", "phone number", "call chahiye", "baat karni hai"],
  area:        ["area", "location", "kahan", "serve", "district", "aata hai", "available", "cover", "jila", "service area", "kis city", "aate ho", "kahan tak", "kahan kaam", "aap kahan"],
  quality:     ["guarantee", "warranty", "quality", "bharosa", "trust", "kitne saal", "durable", "isi", "certified", "strong", "life", "chalega", "original", "branded", "tikau", "tekaoo", "pakka"],
  pricing:     ["price", "cost", "rate", "kimat", "daam", "kitna", "kharcha", "lagat", "paisa", "quote", "how much", "kitna lagega", "kaisa lagega", "charge", "per sqft", "mahnga", "estimate", "quotation", "labour", "fitting charge", "rupaye", "rs ", "kitne rupaye", "kharch", "kitni lagegi", "total", "kharche"],
  service:     ["service", "kya karte", "kya milta", "bataiye", "samjhao", "kya kaam", "kya options", "kya kya hai", "kya kya karte ho", "list"],
  vastu:       ["vastu", "vaastu", "vastu shastra", "vastu ke hisaab", "direction", "north facing", "south facing", "east facing", "west facing", "disha"],
  competitor:  ["competitor", "dusri company", "doosri company", "kisi aur se", "kisi doosre se", "market mein", "se sasta", "se accha", "se better", "se kam", "bahar se", "kisi aur company", "doosra"],
  urgent:      ["kal tak", "aaj chahiye", "abhi chahiye", "jaldi chahiye", "urgent hai", "asap", "kal karwana", "aaj hi", "turant", "jaldi se", "bahut jaldi", "emergency", "kal se shuru"],
  // [I8] off-topic signals — before "general" catch-all
  offtopic:    ["cricket", "ipl", "movie", "film", "gaana", "song", "news", "mausam", "weather", "politics", "election", "recipe", "khana", "joke", "funny", "haha", "lol", "game", "khelo"],
  // [I10] Catalog / PDF / photo gallery intent
  catalog:     ["catalog", "katalog", "pdf", "photo", "design dikhao", "designs", "images", "photo bhejo", "photo bhej", "image send", "design photo", "design image", "photo send karo", "pdf bhejo", "catalogue", "brochure", "sample photo", "photo dikha", "dikhaiye photo"],
  // [I10] Book a site visit / measurement appointment
  book_visit:  ["visit", "site visit", "naapne kab aaoge", "measurement", "appointment", "free visit", "visit book", "visit chahiye", "visit karo", "visit karein", "visit schedule", "site pe aao", "ghar aao measure", "measurement kab", "naapne aao", "free measurement"],
}

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

// [I2] Improved intent detection — better ordering, nahi-guard, off-topic
// [I10] Added view_catalog and book_visit intents
// [I11] MULTI_ROOM_DETECTED is a *signal* used by consultantReply; detectIntent
//        itself never returns it so normal intent parsing is never broken.
export function detectIntent(text: string): Intent {
  const norm = normalizeTypos(text)
  const t = norm.toLowerCase().trim()

  // Dimension in text → estimate is ALWAYS top priority
  if (DIM_REGEX.test(t)) return "room-estimate"

  // [I8] Off-topic check — early exit before material keywords
  if (has(t, KW.offtopic) && !has(t, KW.pricing) && !has(t, ["ceiling", "gypsum", "pvc", "wpc", "uv", "design", "room"])) {
    return "off-topic"
  }

  // Greeting — STRICT standalone only
  const isStandaloneGreeting = /^(hi|hello|hey|namaste|namaskar|helo|hlo|hii+|salam|assalamualaikum|jai\s*hind|pranam|adaab|good\s*(morning|evening|afternoon))[\s!.]*$/i.test(t)
  if (isStandaloneGreeting) return "greeting"

  // Thanks — closing/appreciative messages
  if (/\b(baat\s*karke|helpful\s*(rahi|tha|hai)|achha\s*laga|acha\s*laga|accha\s*laga|maza\s*aaya|maja\s*aaya|zabardast|ekdum\s*mast)\b/.test(t)) return "thanks"
  if (has(t, KW.thanks) && t.length < 80) return "thanks"
  if (has(t, KW.complaint)) return "complaint"

  // [I10] view_catalog — check BEFORE booking so "photo bhejo" doesn't become booking
  if (has(t, KW.catalog)) return "view_catalog"

  // [I10] book_visit — richer keyword set covering Hinglish variants
  // [I11] Keep this BEFORE the old "booking" block; old block retained as fallback
  if (has(t, KW.book_visit)) return "book_visit"

  // Booking — explicit signals only (legacy fallback, kept for backward compat)
  const bookingStrong = ["site visit", "free visit", "aana hai", "book karo", "shuru karein", "kab aao", "aap aa sakte", "ghar aao", "visit karo", "visit chahiye", "measurement chahiye", "aaiye", "bulao"]
  if (bookingStrong.some(k => t.includes(k))) return "booking"

  if (has(t, KW.call)) return "call-request"

  // Comparison — strict
  const isCompare = COMPARE_EXPLICIT.some(kw => (` ${t} `).includes(kw)) ||
                    COMPARE_MATERIAL.some(pat => pat.test(t))
  if (isCompare) return "comparison"

  if (has(t, KW.waterproof)) return "waterproof"
  if (has(t, KW.install))    return "installation"
  if (has(t, KW.quality))    return "quality"
  if (has(t, KW.area))       return "area"
  if (has(t, KW.image))      return "image-reference"
  if (has(t, KW.negotiation)) return "negotiation"
  if (has(t, KW.confused))   return "confused"

  // Pricing BEFORE design
  if (has(t, KW.pricing)) return "pricing"
  if (has(t, KW.budget))  return "budget"
  if (has(t, KW.design))  return "design"
  if (has(t, KW.service)) return "service-info"

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
// 6. RESPONDERS
// [I6] Every responder ANSWERS FIRST, then asks/upsells
// [I3] WhatsApp number ONLY in booking/call/urgent contexts
// ─────────────────────────────────────────────────────────────────────────────

function r_greeting(ctx: ConversationContext): string {
  const n = nm(ctx)
  const opts = [
    `Namaste${n}! 😊 Main JK Interior AI Assistant hoon.\n\nCeiling, wall panels, TV unit ya pricing — kuch bhi poochhein!`,
    `Hello${n}! 🏠 JK Interior mein aapka swagat hai.\n\nPVC, gypsum, WPC ya room estimate — sab pooch sakte hain!`,
    `Namaste${n}! 👋 Main JK Interior AI Assistant hoon.\n\nKaunsa kaam karwana hai — ceiling, wall paneling ya kuch aur?`,
  ]
  return pick(opts)
}

function r_thanks(ctx: ConversationContext): string {
  const n = nm(ctx)
  const opts = [
    `Shukriya${n}! 🙏 Koi sawaal ho toh poochhte rehna.`,
    `Bahut shukriya${n}! 😊 Aur koi sawaal?`,
    `Khushi hui${n} ki baat helpful lagi! 😊\n\nJab bhi room ka kaam karwana ho — main hoon.`,
    `Shukriya${n}! 🙏 Aap ke ghar ki design sundar hogi. Kuch aur poochna ho toh batayein!`,
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
  return `Free site visit bilkul free hai! 😊\n\nAapka naam aur number bata dijiye — team appoint karti hoon.\n\n📞 **${WA}**`
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

function r_pricing(t: string, ctx: ConversationContext): string {
  const dimMatch = DIM_REGEX.exec(t)
  if (dimMatch) return r_estimate(t, ctx)

  const key = resolveServiceKey(t, ctx)
  const p = PRICE_MAP[key]
  const name = SERVICE_NAME[key] || key
  ctx.lastTopic = key

  // [I6] Answer first — give rate, THEN ask room size if not known
  if (ctx.roomSize) {
    const parts = ctx.roomSize.split("x").map(Number)
    if (parts.length === 2 && parts[0] && parts[1]) {
      const [l, w] = parts
      return formatPriceEstimate(l, w, key, name) + `\n\n📞 Exact quote ke liye: **${WA}**`
    }
  }

  const lines: string[] = [`**${name}** — ${p?.range || "custom quote"}`]
  if (p?.premium) lines.push(`Premium: ${p.premium}`)

  if (!ctx.askedSize) {
    ctx.askedSize = true
    ctx.lastQuestionAsked = "room_size"
    lines.push(`\nRoom ka size bataiye (jaise 12×14) — exact estimate abhi nikaaluun! 📐`)
  } else {
    // [I3] Only show WhatsApp after already asked for size
    lines.push(`\n📞 Exact quote: free site visit — **${WA}**`)
  }

  return lines.join("\n")
}

function r_estimate(t: string, ctx: ConversationContext): string {
  const dimMatch = DIM_REGEX.exec(t)
  if (!dimMatch) return r_pricing(t, ctx)

  const l = parseInt(dimMatch[1]), w = parseInt(dimMatch[2])
  const key = resolveServiceKey(t, ctx)
  const name = SERVICE_NAME[key] || "Ceiling"

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
  if (/kal\s*tak|aaj\s*(hi|chahiye)|abhi\s*chahiye|urgent|asap|turant/.test(t)) {
    const oh = isOffHours()
    return oh
      ? `Urgent request samajh aa gayi! ⚡\n\nAbhi WhatsApp karein — kal ke liye slot confirm karte hain:\n📱 **${WA}**`
      : `Kal tak possible hai! ⚡\n\n🏠 PVC — sirf 1 din\n✨ Gypsum — 2-3 din (kal tak 1 room ho sakta)\n\nAbhi WhatsApp karein — slot book karte hain:\n📱 **${WA}**`
  }
  if (key === "pvc" || t.includes("pvc"))
    return `PVC ceiling — **1 room mein sirf 1 din!** Poore ghar mein 3-4 din. ⚡`
  if (key === "gypsum" || t.includes("gypsum"))
    return `Gypsum ceiling — **2-3 din/room**, poore ghar mein 5-7 din. ⏱`
  if (key === "wpc" || t.includes("wpc"))
    return `WPC paneling — **1-2 din/wall**. Minimum dust, minimum disturbance! 🪵`
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
      return `${cityLine}\n\n${readable} ke liye — ${sizePrompt}`
    }
    return `${cityLine}\n\nKaunsa kaam karwana hai? Room size bataiye — estimate abhi! 📐`
  }
  return `📍 Main service area: **Forbesganj & Araria**\n\nNearby cities:\nJogbani • Raniganj • Narpatganj • Kursakanta\nTribeniganj • Chhatapur • Supaul • Purnia\n\nAap kis city mein hain?`
}

function r_serviceInfo(): string {
  return `JK Interior ki services:\n\n✨ Gypsum Ceiling — ${PRICE_MAP.gypsum.range}\n🏠 PVC Ceiling — ${PRICE_MAP.pvc.range}\n🪵 WPC Wall Panels — ${PRICE_MAP.wpc.range}\n💎 UV Marble Sheets — ${PRICE_MAP.uv?.range}\n📺 Modular TV Unit — ${PRICE_MAP.tvunit?.range}\n🏛️ Fluted Panels — ${PRICE_MAP.fluted?.range}\n🏢 Grid Ceiling — ${PRICE_MAP.grid?.range}\n🌿 Artificial Grass — ${PRICE_MAP["artificial-grass"]?.range}\n\nKis service ke baare mein jaanna hai?`
}

function r_vastu(ctx: ConversationContext): string {
  const n = nm(ctx)
  return `Vastu ke hisaab se kuch tips${n}:\n\n🧭 **Ceiling design** — koi bhi material vastu-neutral hota hai\n✨ **Gypsum** — hall mein north/east direction pe cove lighting best hai\n🏠 **PVC** — bathroom/kitchen ke liye (water zones) — vastu bhi yahi kehta hai\n💎 **UV marble** — south wall pe marble effect — prosperity ke liye maana jaata hai\n\nHum design mein vastu ka dhyan rakhte hain! Free site visit mein discuss karein.\n\n📞 **${WA}**`
}

function r_competitor(ctx: ConversationContext): string {
  return `${ctx.name ? ctx.name + " ji, " : ""}hamare baare mein honestly bolunga:\n\n✅ **ISI-certified materials** — local market se alag\n✅ **1 saal written warranty** — market mein rare hai\n✅ **500+ projects, 8+ saal** — proven track record\n✅ **No hidden charges** — jo quote, wohi final\n✅ **Labour + material** — ek hi team\n\nRate compare karna ho toh — free site visit mein exact quote lo, phir decide karo. Koi pressure nahi! 🙏\n\n📞 **${WA}**`
}

function r_urgent(ctx: ConversationContext): string {
  const n = nm(ctx)
  const oh = isOffHours()
  if (oh) {
    return `Urgent kaam ke liye${n} — abhi WhatsApp karein:\n\n📱 **${WA}**\n\nTeam kal 9 AM pe contact karegi. Urgent message likh dein — priority mein lenge! ⚡`
  }
  return `Urgent kaam ke liye${n} — abhi seedha contact karein:\n\n📞 **Call/WhatsApp: ${WA}**\n\nTeam available hai — aaj ya kal ka slot milega! ⚡\n\nRoom ka size aur kaam bata dijiye — estimate bhi abhi nikalti hoon!`
}

// [I10] Catalog / design photo responder
function r_view_catalog(ctx: ConversationContext): string {
  const n = nm(ctx)
  const opts = [
    `Bilkul${n}! 😊 Hamare latest designs aur catalog WhatsApp pe bhej sakte hain:\n\n📱 **${WA}**\n\n"Catalog chahiye" likh ke message karein — PDF + photos seedha aapke phone pe!`,
    `Haan${n}! Design photos aur full catalog ke liye WhatsApp karein:\n\n📱 **${WA}**\n\nPVC, Gypsum, WPC, UV Marble — sabke design samples aur price list bhejte hain! 🏠`,
    `Catalog aur design photos ready hain${n}! 📸\n\nWhatsApp pe message karein — full PDF + room-wise design ideas bhej deta hoon:\n\n📱 **${WA}**`,
  ]
  return pick(opts)
}

// [I10] Book a site visit / measurement appointment responder
function r_book_visit(ctx: ConversationContext): string {
  const n = nm(ctx)
  if (ctx.phone) {
    return `Bilkul${n}! 😊 Aapka number hai hamare paas — team jald free site visit ke liye contact karegi.\n\nYa seedha WhatsApp karein: **${WA}**`
  }
  if (ctx.name) {
    return `${ctx.name} ji, free site visit book karne ke liye apna WhatsApp number share karein! 📱\n\nHum aayenge, measure karenge, aur exact quote denge — bilkul free!`
  }
  return `Free site visit bilkul free hai${n}! 🏠\n\n✅ Hum ghar aayenge\n✅ Sab rooms measure karenge\n✅ On-the-spot estimate denge\n✅ Koi charge nahi\n\nApna naam aur number bata dijiye — visit schedule karte hain!\n\n📞 **${WA}**`
}

// [I8] Off-topic redirect
function r_offtopic(): string {
  const opts = [
    `Main sirf JK Interior ke baare mein help kar sakti hoon. 😊\n\nKaunsa room ka kaam karwana hai — ceiling ya wall paneling?`,
    `Yeh topic meri expertise mein nahi aata! 😄\n\nMujhse interior design ke baare mein poochhein — ceiling, panels, pricing, ya room estimate!`,
    `Iske baare mein main kuch nahi jaanti! 😅 Lekin ghar ke interior design mein expert hoon.\n\nKya koi room banana hai — ceiling, TV wall, ya kuch aur?`,
  ]
  return pick(opts)
}

// [I7] Smart general fallback — contextual, no random WhatsApp
function r_general(ctx: ConversationContext, t: string): string | null {
  // Has specific service context — answer around it
  if (ctx.lastTopic) {
    const name = SERVICE_NAME[ctx.lastTopic] || ctx.lastTopic
    if (ctx.roomSize) {
      const parts = ctx.roomSize.split("x").map(Number)
      if (parts.length === 2 && parts[0] && parts[1]) {
        return formatPriceEstimate(parts[0], parts[1], ctx.lastTopic, name) + `\n\n📞 Free site visit: **${WA}**`
      }
    }
    return `**${name}** ke baare mein kya jaanna chahte hain?\n\n💰 Rate chahiye? Ya room ka size batao — estimate abhi nikalti hoon! 📐`
  }

  // Has room type
  if (ctx.roomType) {
    const rec = recommendMaterial(ctx.roomType, /kitchen|bathroom|balcony/i.test(ctx.roomType), ctx.budget ?? null)
    if (!ctx.roomSize) {
      return `${ctx.roomType} ke liye **${rec.primary}** recommend karungi.\n\nRoom ka size batao (jaise 12×14) — exact estimate nikaaluun! 📐`
    }
  }

  // Completely fresh — guide them
  if (!ctx.lastTopic && !ctx.roomType && ctx.messagesExchanged <= 2) {
    return `Kaunsa kaam karwana hai?\n\n🏠 Ceiling (PVC/Gypsum)\n🪵 Wall Panels (WPC/Fluted)\n📺 TV Unit\n💎 UV Marble\n\nYa room ka size batao — main estimate de dungi! 📐`
  }

  // Pass to Groq
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. MATERIAL DETAIL + CONTEXT FOLLOW-UP
// ─────────────────────────────────────────────────────────────────────────────

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
    if (ctx.roomSize) {
      const parts = ctx.roomSize.split("x").map(Number)
      if (parts.length === 2 && parts[0] && parts[1]) {
        const perim = 2 * (parts[0] + parts[1])
        const lo = Math.round(perim * 40 / 100) * 100
        const hi = Math.round(perim * 80 / 100) * 100
        return `**LED Cove Lighting** — ₹40–80/running ft\n\n${ctx.roomSize} room mein roughly ₹${lo.toLocaleString("en-IN")}–₹${hi.toLocaleString("en-IN")} extra.\n\nGhar cinema jaisa! 😍`
      }
    }
    return `**LED Cove Lighting** — ₹40–80/running ft\n\nRoom size batao — LED + ceiling ka total estimate saath mein nikaalta hoon! 📐`
  }
  return null
}

function resolveContextualFollowUp(input: string, ctx: ConversationContext): string | null {
  const t = input.toLowerCase().trim()
  const prevTopic = ctx.lastTopic || ""
  const prevIntent = ctx.lastIntent

  // LED add-on after ceiling estimate
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

  // Room type pivot
  const roomPivot = detectRoomType(t)
  if (roomPivot && /\bke\s*liye\b|\bwala\b|\bmein\b/.test(t) && t.length < 50) {
    ctx.roomType = roomPivot.label
    const rec = recommendMaterial(roomPivot.label, roomPivot.isWet, ctx.budget ?? null)
    const sizeAsk = ctx.roomSize ? `\n\n${roomPivot.label} ka size ${ctx.roomSize} — estimate nikaaluun?` : `\n\nRoom ka size? (jaise 8×10)`
    return `${roomPivot.label} ke liye **${rec.primary}** best hai — ${rec.reason}.${rec.alternative ? `\n\nAlternative: **${rec.alternative}** — ${rec.altReason}` : ""}${sizeAsk}`
  }

  // [I5] Topic switch: "Gypsum wala kitna?" after PVC
  if (/gypsum/.test(t) && prevTopic.includes("pvc") && (prevIntent === "pricing" || prevIntent === "room-estimate")) {
    ctx.lastTopic = "gypsum"
    if (ctx.roomSize) {
      const parts = ctx.roomSize.split("x").map(Number)
      if (parts.length === 2 && parts[0] && parts[1])
        return formatPriceEstimate(parts[0], parts[1], "gypsum", "Gypsum Ceiling") + `\n\n📞 Free site visit: **${WA}**`
    }
    return `Gypsum ceiling — ${PRICE_MAP.gypsum.range} (PVC se thoda premium, cove lighting possible).\n\nRoom size batao!`
  }

  // [I5] Topic switch: "PVC wala?" after gypsum
  if (/pvc/.test(t) && prevTopic.includes("gypsum") && (prevIntent === "pricing" || prevIntent === "room-estimate")) {
    ctx.lastTopic = "pvc"
    if (ctx.roomSize) {
      const parts = ctx.roomSize.split("x").map(Number)
      if (parts.length === 2 && parts[0] && parts[1])
        return formatPriceEstimate(parts[0], parts[1], "pvc", "PVC Ceiling") + `\n\n📞 Free site visit: **${WA}**`
    }
    return `PVC ceiling — ${PRICE_MAP.pvc.range} (gypsum se sasta + 100% waterproof).\n\nRoom size?`
  }

  // Dimensions only — use lastTopic immediately
  const dimOnly = DIM_REGEX.exec(t)
  if (dimOnly && !/(pvc|gypsum|wpc|uv|marble|grid|fluted|acoustic|flooring|wallpaper)/.test(t)) {
    const l = parseInt(dimOnly[1]), w = parseInt(dimOnly[2])
    ctx.roomSize = `${l}x${w}`
    const key = prevTopic || resolveServiceKey("", ctx)
    const name = SERVICE_NAME[key] || "Ceiling"
    ctx.lastTopic = key
    return formatPriceEstimate(l, w, key, name) + `\n\n📞 Exact quote: **${WA}**`
  }

  // Without LED
  if (/\b(without|bina|sirf\s*ceiling|nahi\s*chahiye)\b/.test(t) && ctx.lastTopic) {
    const key = ctx.lastTopic
    return `Bina LED ke **${SERVICE_NAME[key] || key}** — ${PRICE_MAP[key]?.range || "custom quote"}\n\n${ctx.roomSize ? "Room size pehle se pata hai — exact estimate ke liye free site visit!" : "Room size batao!"}`
  }

  // Cheaper option follow-up
  if (/cheap|sasta|affordable|kam\s*price|saste\s*mein/.test(t) && prevTopic) {
    return `${prevTopic === "wpc" ? "WPC se sasta" : "Most affordable"} option:\n\n🏠 **PVC Ceiling** — ${PRICE_MAP.pvc.range}\n\n100% waterproof, zero maintenance. Kafi popular choice hai! Room ka size?`
  }

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. SMART LOCAL FALLBACK
// ─────────────────────────────────────────────────────────────────────────────

function smartLocalFallback(ctx: ConversationContext, t: string): string | null {
  const n = nm(ctx)

  if (ctx.city && !ctx.service && !ctx.roomType) {
    if (ctx.lastTopic) {
      const topicName = SERVICE_NAME[ctx.lastTopic] || ctx.lastTopic
      const sizePrompt = ctx.roomSize
        ? `Room size ${ctx.roomSize} already noted!`
        : `Room ka size batao (jaise 12×14) — exact estimate abhi! 📐`
      return `✅ **${ctx.city}** mein **${topicName}** ka kaam hota hai! 💪\n\n${sizePrompt}`
    }
    return `${ctx.city} mein karte hain! 💪\n\nKaunsa kaam karwana hai${n}? Ceiling, wall paneling, TV unit?`
  }

  if (ctx.service && ctx.roomType && !ctx.roomSize && !ctx.askedSize) {
    ctx.askedSize = true
    ctx.lastQuestionAsked = "room_size"
    return `${ctx.service} — ${ctx.roomType} ke liye accha choice hai! 👍\n\nRoom ka size bataiye (jaise 10×12) — exact estimate abhi nikaaluun!`
  }

  if (ctx.roomType && !ctx.roomSize) {
    const rec = recommendMaterial(ctx.roomType, false, ctx.budget ?? null)
    return `${ctx.roomType} ke liye **${rec.primary}** best hai — ${rec.reason}${rec.alternative ? `\nAlternative: **${rec.alternative}**` : ""}\n\nSize batao (jaise 12×14) — estimate!`
  }

  const svcObj = detectService(t)
  if (svcObj && !ctx.roomType && !ctx.askedRoomType) {
    ctx.askedRoomType = true
    ctx.lastQuestionAsked = "room_type"
    return `**${svcObj.name}** — accha choice! 👍\n\nKaunsi room ke liye? Hall, bedroom, kitchen ya koi aur?`
  }

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

  const intent = detectIntent(normalized)
  const city   = detectCity(t)
  const svcObj = detectService(t)
  const room   = detectRoomType(t)
  const budget = detectBudgetLevel(t)

  // Update context
  if (city   && !ctx.city)     ctx.city     = city
  if (budget)                  ctx.budget   = budget
  if (room)                    ctx.roomType = room.label
  if (svcObj && !ctx.service)  ctx.service  = svcObj.name
  ctx.lastIntent = intent
  ctx.messagesExchanged = (ctx.messagesExchanged || 0) + 1

  if (svcObj) {
    ctx.lastTopic = svcObj.key
  } else {
    const hasExplicit = /(pvc|gypsum|wpc|uv|marble|grid|fluted|acoustic|flooring|grass|wallpaper|led|tvunit|tv\s*(unit|panel|wall))/.test(t)
    if (hasExplicit) {
      const explicitKey = resolveServiceKey(t, { ...ctx, lastTopic: undefined, service: undefined })
      ctx.lastTopic = explicitKey
    }
  }

  const hasDim = DIM_REGEX.test(t)

  // Complex/detailed → Groq
  const COMPLEX_SIGNALS = /uneven|column|pillar|purana|old\s*wall|damage|crack|seepage.*wall|wall.*seepage|corner|curved|irregular|sloped|ceiling.*low|low.*ceiling|renovation|pehle\s*se|already|already\s*laga|pehle\s*laga/i
  if (t.length > 70 && COMPLEX_SIGNALS.test(t)) return null

  // ── 1. SHORT MESSAGE FOLLOW-UP
  if (t.length < 40 && ctx.messagesExchanged && ctx.messagesExchanged > 0) {
    const dimOnly = DIM_REGEX.exec(t)
    if (dimOnly && !/(pvc|gypsum|wpc|uv|marble|grid|fluted|acoustic|flooring|wallpaper)/.test(t)) {
      const l = parseInt(dimOnly[1]), w = parseInt(dimOnly[2])
      ctx.roomSize = `${l}x${w}`
      const key = ctx.lastTopic || resolveServiceKey("", ctx)
      const name = SERVICE_NAME[key] || "Ceiling"
      ctx.lastTopic = key
      return formatPriceEstimate(l, w, key, name) + `\n\n📞 Exact quote ke liye free site visit — **${WA}**`
    }

    const cityOnlyPattern = /^(\w+)\s*(me|mein|main|में|mai)[\s]*$/i
    const cityMatch = cityOnlyPattern.exec(t)
    if (cityMatch) {
      const cityKey = cityMatch[1].toLowerCase()
      const resolvedCity = CITY_MAP[cityKey]
      if (resolvedCity) {
        ctx.city = resolvedCity
        if (ctx.lastTopic) {
          const topicName = SERVICE_NAME[ctx.lastTopic] || ctx.lastTopic
          const sizePrompt = ctx.roomSize
            ? `Room size ${ctx.roomSize} already noted — estimate nikaalte hain!`
            : `Room ka size batao (jaise 12×14) — exact estimate abhi! 📐`
          return `✅ **${resolvedCity}** mein ${topicName} available hai! 💪\n\n${sizePrompt}`
        }
        return `✅ **${resolvedCity}** mein hum kaam karte hain! 💪\n\nKaunsa kaam karwana hai? Room size bataiye — estimate abhi!`
      }
    }

    const materialOnlyPatterns: [RegExp, string, string][] = [
      [/^pvc$/i, "PVC Ceiling", "pvc"],
      [/^gypsum$/i, "Gypsum Ceiling", "gypsum"],
      [/^pop$/i, "Gypsum Ceiling", "gypsum"],
      [/^wpc$/i, "WPC Wall Panels", "wpc"],
      [/^uv$/i, "UV Marble Sheets", "uv"],
      [/^marble$/i, "UV Marble Sheets", "uv"],
      [/^grid$/i, "Grid Ceiling", "grid"],
      [/^fluted$/i, "Fluted Panels", "fluted"],
      [/^louver$/i, "Louver Panels", "wpc"],
    ]

    for (const [pattern, name, key] of materialOnlyPatterns) {
      if (pattern.test(t.trim())) {
        ctx.lastTopic = key
        if (ctx.roomSize) {
          const parts = ctx.roomSize.split("x").map(Number)
          if (parts.length === 2 && parts[0] && parts[1]) {
            return formatPriceEstimate(parts[0], parts[1], key, name) + `\n\n📞 Free site visit: **${WA}**`
          }
        }
        return `**${name}** — ${PRICE_MAP[key]?.range || "custom quote"}\n\nRoom ka size batao (jaise 12×14) — exact estimate nikaaluun! 📐`
      }
    }

    if (/^(haan|yes|ok|ha|ji|hnji|accha|thik)$/i.test(t) && ctx.lastTopic) {
      if (!ctx.roomSize) {
        return `Bilkul! 😊 ${SERVICE_NAME[ctx.lastTopic] || ctx.lastTopic} ke liye room ka size bataiye (jaise 12×14)`
      }
      return `${SERVICE_NAME[ctx.lastTopic] || ctx.lastTopic} ke liye ready hain! 👍\n\nFree site visit book karein?\n\n📞 **${WA}**`
    }

    if (/^(sasta|cheap|budget|kam|basic)$/i.test(t)) {
      ctx.budget = "low"
      const rec = recommendMaterial(ctx.roomType || null, false, "low")
      return `Budget-friendly option: **${rec.primary}** — ${rec.reason}\n\nRoom ka size? 📐`
    }

    if (/^(premium|luxury|best|accha|mahnga)$/i.test(t)) {
      ctx.budget = "high"
      const rec = recommendMaterial(ctx.roomType || null, false, "high")
      return `Premium option: **${rec.primary}** — ${rec.reason}\n\nRoom ka size? 📐`
    }

    if (/^(waterproof|water\s*proof)$/i.test(t)) {
      return `Waterproof ke liye best options:\n\n🏠 **PVC Ceiling** — ${PRICE_MAP.pvc.range}\n💎 **UV Marble** — ${PRICE_MAP.uv?.range}\n\nDono 100% waterproof! Room ka size? 📐`
    }

    if (/^kitna\s*(lag|hoga|padega|cost|rs|rupay)/i.test(t)) {
      if (ctx.lastTopic) {
        if (ctx.roomSize) {
          const parts = ctx.roomSize.split("x").map(Number)
          if (parts.length === 2 && parts[0] && parts[1]) {
            return formatPriceEstimate(parts[0], parts[1], ctx.lastTopic, SERVICE_NAME[ctx.lastTopic] || ctx.lastTopic) + `\n\n📞 **${WA}**`
          }
        }
        return `${SERVICE_NAME[ctx.lastTopic] || ctx.lastTopic} — ${PRICE_MAP[ctx.lastTopic]?.range || "custom quote"}\n\nRoom ka size batao — exact estimate! 📐`
      }
      return `Kaunse kaam ka rate chahiye?\n\n🏠 PVC Ceiling — ${PRICE_MAP.pvc.range}\n✨ Gypsum — ${PRICE_MAP.gypsum.range}\n🪵 WPC Panels — ${PRICE_MAP.wpc.range}`
    }
  }

  // ── 2. Context-aware follow-up
  const followUp = resolveContextualFollowUp(input, ctx)
  if (followUp) return followUp

  // ── 3. Multi-room estimate
  // [I11] MULTI_ROOM_DETECTED guard: parseMultiRoomQuery runs only when no explicit
  //       dimension was found. If it returns results we handle them and return early —
  //       so the intent switch below always runs in the normal single-intent path and
  //       is never reached in a broken/partial state.
  const multiRooms = !hasDim ? parseMultiRoomQuery(t) : null
  if (multiRooms) {
    const est = generateMultiRoomEstimate(multiRooms)
    ctx.estimateGiven = est.slice(0, 80)
    const cta = ctx.city
      ? `\n\n📞 ${ctx.city} mein free site visit — **${WA}**`
      : `\n\nFree site visit ke liye WhatsApp: **${WA}**`
    return est + cta
  }

  // ── 4. Intent routing
  // [I4] Build reply candidate; check dedup
  let candidate: string | null = null

  switch (intent) {
    case "greeting": {
      const isExplicitGreeting = /^(hi|hello|hey|namaste|namaskar|helo|hlo|hii|hiii|salam|assalamualaikum|jai\s*hind|pranam|adaab|good\s*(morning|evening|afternoon))[\s!.]*$/i.test(t)
      if (ctx.messagesExchanged && ctx.messagesExchanged > 1) {
        if (!isExplicitGreeting) {
          if (ctx.lastTopic || ctx.service) return r_pricing(t, ctx)
          return `Haan! Kaunsa kaam karwana hai? Ceiling ya wall paneling?`
        }
        return `Haan ji! 😊 Batao - ${ctx.lastTopic ? `${SERVICE_NAME[ctx.lastTopic] || ctx.lastTopic} ke baare mein aur jaanna hai?` : 'kaunsa kaam?'}`
      }
      candidate = r_greeting(ctx); break
    }
    case "thanks":          candidate = r_thanks(ctx); break
    case "complaint":       candidate = r_complaint(); break
    case "booking":         candidate = r_booking(ctx); break
    case "call-request":    candidate = r_call(); break
    // [I10] New intents
    case "view_catalog":    candidate = r_view_catalog(ctx); break
    case "book_visit":      candidate = r_book_visit(ctx); break
    case "comparison":      candidate = r_comparison(t); break
    case "room-estimate":   candidate = r_estimate(t, ctx); break
    case "pricing":         candidate = r_pricing(t, ctx); break
    case "waterproof":      candidate = r_waterproof(t, room, ctx); break
    case "design":          candidate = r_design(t, ctx); break
    case "installation":    candidate = r_installation(t, ctx); break
    case "budget":          candidate = r_budget(room, ctx); break
    case "negotiation":     candidate = r_negotiation(t); break
    case "confused":        candidate = r_confused(ctx, room); break
    case "image-reference": {
      const photoMsg = /photo\s*(dekh|dekha|dekho|bhejo|bhej|send)|image\s*(dekh|send)|pic\s*(dekh|send)/.test(t)
        ? `Photo dekh ke bilkul bata sakti hoon! 📸\n\nWhatsApp pe photo bhejein — exact same design ka estimate aur feasibility bataungi:\n\n📱 **${WA}**\n\nYa free site visit mein directly dikhaiye!`
        : `Design reference ke hisaab se bilkul bana sakte hain! 🎨\n\nFree site visit mein photo dikhaiye — exact style mein estimate.\n\nWhatsApp pe photo bhejein: **${WA}**`
      candidate = photoMsg; break
    }
    case "quality":         candidate = r_quality(ctx); break
    case "area":            candidate = r_area(t, ctx.city, ctx); break
    case "service-info":    candidate = r_serviceInfo(); break
    case "vastu":           candidate = r_vastu(ctx); break
    case "competitor":      candidate = r_competitor(ctx); break
    case "urgent":          candidate = r_urgent(ctx); break
    // [I8] New off-topic handler
    case "off-topic":       candidate = r_offtopic(); break
  }

  if (candidate) {
    // [I4] Dedup check — if same reply as last, add variety
    const hash = simpleHash(candidate)
    if (hash === ctx._lastReplyHash) {
      // Try to vary the response slightly
      if (ctx.lastTopic) {
        candidate = `Aur kuch jaanna chahte hain **${SERVICE_NAME[ctx.lastTopic] || ctx.lastTopic}** ke baare mein?\n\nRoom ka size bataiye — exact estimate nikaaluun! 📐`
      }
    }
    ctx._lastReplyHash = simpleHash(candidate)
    return candidate
  }

  // ── 5. City mention alone
  if (city && t.length < 50 && !svcObj) {
    return `**${city}** mein hum kaam karte hain! 💪\n\nKaunsa kaam karwana hai? Room size bataiye — estimate abhi!`
  }

  // ── 6. Material detail (short messages)
  if (t.length < 80) {
    const matDetail = r_materialDetail(t, ctx)
    if (matDetail) return matDetail
  }

  // ── 7. FAQ matching
  for (const faq of FAQ) {
    if (faq.q.some((kw: string) => t.includes(kw))) return faq.a
  }

  // ── 8. Smart local fallback
  const localFallback = smartLocalFallback(ctx, t)
  if (localFallback) return localFallback

  // ── 9. [I7] General fallback (contextual, no random WhatsApp)
  const generalReply = r_general(ctx, t)
  if (generalReply) return generalReply

  // ── 10. Null → Groq handles it
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. QUICK REPLIES
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
  if (i === "book_visit")   return ["WhatsApp Now", "Call Now", "Get Estimate", "Other Services"]
  if (i === "view_catalog") return ["Book Site Visit", "Get Estimate", "PVC Ceiling", "Gypsum Ceiling"]
  if (i === "waterproof")   return ["PVC Rate", "UV Marble Rate", "Get Estimate", "Book Site Visit"]
  if (i === "budget")       return ["PVC Ceiling", "UV Marble", "Get Estimate", "Book Site Visit"]
  if (i === "quality")      return ["Book Site Visit", "PVC Ceiling", "Gypsum Ceiling"]
  if (i === "area")         return ["Get Estimate", "Book Site Visit", "Our Services"]
  if (i === "installation") return ["Book Site Visit", "Get Estimate", "Call Now"]
  if (i === "confused")     return ["Hall/Living Room", "Bedroom", "Kitchen/Bathroom", "Full Home"]
  if (i === "off-topic")    return ["PVC Ceiling", "Gypsum Ceiling", "Price List", "Free Site Visit"]
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

// ─────────────────────────────────────────────────────────────────────────────
// NEW FUNCTION: MULTI-ROOM SIZE DETECTOR (फाइल के सबसे नीचे जोड़ें)
// ─────────────────────────────────────────────────────────────────────────────

export interface DetectedRoom {
  roomName: string;
  length: number;
  width: number;
  area: number;
}

export function detectMultiRoomSizes(text: string): DetectedRoom[] {
  const cleanText = normalizeTypos(text);
  
  // बेहतर और सटीक Regex ताकि कमरों के नाम आपस में मिक्स न हों
  const multiRoomRegex = /(?:([a-zA-Zअ-ह\s]+?)\s+)?(\d+)\s*[xX**]\s*(\d+)/g;
  const detectedRooms: DetectedRoom[] = [];
  let match;

  while ((match = multiRoomRegex.exec(cleanText)) !== null) {
    let rawName = match[1]?.trim() || "";
    const length = parseInt(match[2], 10);
    const width = parseInt(match[3], 10);
    const area = length * width;

    // नाम को और साफ करना (लास्ट वर्ड निकालना अगर पीछे का कुछ कचरा आ गया हो)
    if (rawName) {
      const words = rawName.split(/\s+/);
      rawName = words[words.length - 1]; // सिर्फ आखिरी शब्द लें जैसे 'bedroom' या 'kitchen'
    }

    let finalRoomName = rawName;
    if (!rawName || /\b(size|pvc|gypsum|price|rate|kharch|ceiling|wall|me|ka|kitna|hoga)\b/i.test(rawName)) {
      finalRoomName = `Room ${detectedRooms.length + 1}`;
    }

    // रूम का पहला अक्षर Capital कर दें (जैसे: bedroom -> Bedroom)
    finalRoomName = finalRoomName.charAt(0).toUpperCase() + finalRoomName.slice(1);

    detectedRooms.push({
      roomName: finalRoomName,
      length,
      width,
      area
    });
  }

  return detectedRooms;
}

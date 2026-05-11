/**
 * JK Interior Consultant Engine
 *
 * A comprehensive AI-powered consultant system that handles real-world
 * customer conversations like an experienced interior consultant.
 *
 * Handles: pricing, comparisons, design advice, room estimation,
 * waterproof/durability, installation timing, quality/warranty,
 * location, booking, budget concerns, negotiation, confused users,
 * Hinglish/English/Hindi, spelling mistakes, and more.
 *
 * IMPROVED VERSION:
 * - Better intent detection with extensive Hindi/Hinglish patterns
 * - Pricing queries always return pricing responses
 * - Comparison only for explicit vs/compare/difference
 * - Smarter conversation memory & context
 * - Human-like, non-repetitive responses
 */

import {
  MATERIAL_KNOWLEDGE,
  COMPARISONS,
  FAQ,
  formatPriceEstimate,
  parseMultiRoomQuery,
  generateMultiRoomEstimate,
  calculatePriceEstimate,
  SERVICE_CATALOG,
} from "./business-data"

// ─── Types ────────────────────────────────────────────────────────────────────

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
  askedMaterial?: boolean
  askedCity?: boolean
  askedBudget?: boolean
  comparisonShown?: string
  designDiscussed?: string
  lastResponse?: string // Store last bot response for context
  pendingSizeForService?: string // Which service we asked size for
  pendingRoomType?: string // Which room type we asked size for
}

export type Intent =
  | "pricing"
  | "comparison"
  | "booking"
  | "quality"
  | "service-info"
  | "complaint"
  | "area"
  | "greeting"
  | "thanks"
  | "room-estimate"
  | "design"
  | "installation"
  | "waterproof"
  | "budget"
  | "negotiation"
  | "confused"
  | "image-reference"
  | "call-request"
  | "general"

export interface LeadCard {
  name: string
  phone: string
  city?: string
  service?: string
  estimate?: string
  preferredTime?: string
  timestamp: string
}

// ─── City Detection ──────────────────────────────────────────────────────────

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

const ALL_AREAS = [
  "Forbesganj", "Araria", "Jogbani", "Raniganj", "Narpatganj",
  "Kursakanta", "Tribeniganj", "Chhatapur", "Supaul", "Purnia",
]

// ─── Service Detection ────────────────────────────────────────────────────────

const SERVICE_PATTERNS: Array<[RegExp, string]> = [
  [/\bpvc\b/, "PVC Ceiling"],
  [/\bgypsum\b|\bjipsum\b|\bpop\b|\bplaster\b/, "Gypsum Ceiling"],
  [/\bwpc\b|\bwood\s*panel\b|\blouver\b/, "WPC Wall Panels"],
  [/\buv\b|\bmarble\s*sheet\b|\bu\.?v\.?\s*marble\b/, "UV Marble Sheets"],
  [/\btv\s*unit\b|\btv\s*panel\b|\btv\s*wall\b|\btv\s*cabinet\b|\btelevision\b/, "Modular TV Unit"],
  [/\bfluted\b|\bribbed\b|\b3d\s*panel\b/, "Fluted Panels"],
  [/\bgrid\b|\boffice\s*ceiling\b|\bmineral\s*fiber\b/, "Grid Ceiling"],
  [/\bfalse\s*ceiling\b|\bceiling\b|\bchhat\b|\bchhat\b/, "False Ceiling"],
  [/\bwall\s*panel\b|\bdeewar\b|\baccent\s*wall\b/, "Wall Panels"],
  [/\bcomplete\s*interior\b|\bfull\s*interior\b|\bpoora\s*ghar\b|\bpura\s*ghar\b|\bfull\s*home\b/, "Complete Interior"],
  [/\bartificial\s*grass\b|\bgrass\b|\bturf\b/, "Artificial Grass"],
  [/\bkitchen\b|\bradhoi\b|\brasoi\b/, "Kitchen Interior"],
  [/\bbedroom\b|\bkamra\b/, "Bedroom Interior"],
  [/\boffice\b/, "Office Interior"],
]

// ─── Intent Detection (Expanded for Hinglish + Typos) ────────────────────────

// Helper to add common typos to patterns
function expandPatterns(words: string[]): string[] {
  const expansions: string[] = [...words]
  // Add common typos
  for (const w of words) {
    if (w === "price") expansions.push("prce", "pric", "prize")
    if (w === "rate") expansions.push("rait", "rete")
    if (w === "cost") expansions.push("kost", "cosst")
    if (w === "kitna") expansions.push("kitne", "kitni")
    if (w === "paisa") expansions.push("paise", "pese")
    if (w === "gypsum") expansions.push("jipsum", "gipsum")
    if (w === "pvc") expansions.push("pivisi")
    if (w === "wpc") expansions.push("wepisi")
  }
  return expansions
}

const INTENT_PATTERNS: Record<Intent, string[]> = {
  pricing: expandPatterns([
    "price","cost","rate","kimat","daam","kitna","kharcha","budget","lagat",
    "paisa","rs ","quote","how much","lagega","charge","per sqft","per sq",
    "mahnga","sasta","kitne mein","kitna rupya","kitna padega","kitna hoga",
    "rate kya","price kya","cost kya","kitna ayega","kitna aayega",
    "estimate","quotation","koteshan","kitne ka","kitne lagega",
    "labour","labor","material alag","fitting charge","install charge",
    "hidden light ka","led ka extra","cove light kitna","kya daam hai",
    "kya rate hai","kya price hai","kitne rupaye","kitne paise","lagaan",
    "hisaab","total kitna","kya kharcha hoga","kya lagta hai",
  ]),
  comparison: expandPatterns([
    "vs","versus","difference","better","ya","konsa","kaunsa","compare",
    "acha","accha","best","recommend","suggest","sahi","suitable","kaunsa",
    "choice","option","kya better","kya sahi","konsa accha","konsa sasta",
    "pvc ya gypsum","gypsum ya pvc","wpc ya uv","uv ya wpc","kaunsa better",
    "difference kya hai","antar kya hai","mein kya antar hai",
  ]),
  booking: expandPatterns([
    "visit","book","site visit","measurement","quotation","bulao","aao",
    "milna","survey","appointment","schedule","bula lo","free visit",
    "aana hai","visit chahiye","milna chahta","book karo","confirm karo",
    "kaam karwana","karwana hai","shuru karein","start karein",
    "kab aaoge","kab aayenge","aa sakte ho","visit kab","bulana","aao zara",
    "aap aao","aap bulao","booking karani hai","visit karana hai",
  ]),
  quality: expandPatterns([
    "guarantee","warranty","waterproof","quality","bharosa","trust",
    "kitne saal","durable","material","isi","certified","strong",
    "tuta","girta","peeling","life","chalega","tik","tikau",
    "original","asli","nakli","duplicate","branded","reliable",
    "kharab","kharab hoga","safe hai","risk","safety","guarantee hai",
  ]),
  "service-info": expandPatterns([
    "service","kaam","work","kya karte","kya milta","details",
    "inform","jaankari","bataiye","samjhao","explain","list of services",
    "aap kya karte ho","tum kya karte ho","services in hindi",
  ]),
  complaint: expandPatterns([
    "problem","issue","complaint","shikayat","kharab","khali","chutta",
    "girna","toota","peeling","water drop","leaking","broken","repair",
    "fix","theek","thik karo","repair karo","complaint hai","shikayat hai",
    "problem hai","issue hai","kaam kharab hai","material kharab",
  ]),
  area: expandPatterns([
    "area","location","where","kahan","serve","district","kaun sa",
    "aata hai","available","cover","city","jila","kahan aate",
    "service area","kahan kaam","kahan milta","coverage","kahan serve",
    "kya aap aate ho","kya aap jaate ho","kahan karte ho kaam",
  ]),
  greeting: expandPatterns([
    "hi","hello","hey","namaste","namaskar","helo","good morning",
    "good evening","good afternoon","hy","hii","salam","kaise ho",
    "kya haal","how are you","sup","whats up","kya chal raha hai",
    "kaisa hai","kaisi ho","namaskar","pranam","ram ram",
  ]),
  thanks: expandPatterns([
    "thank","shukriya","dhanyawad","thanks","thx","bahut accha",
    "great","perfect","nice","superb","awesome","shabash","badiya",
    "wah","theek hai","ok","okay","achha","accha hai","thik hai",
    "very good","excellent","wonderful","fantastic",
  ]),
  "room-estimate": expandPatterns([
    "x ","× ","12x","10x","14x","15x","sqft","sq ft","room size",
    "room ka size","kitna bada","dimension","length","width",
    "foot","feet","by ","room mein","kamre ka","hall ka size",
    "measurement","kitne feet","kitna lamba","kitna chauda",
  ]),
  design: expandPatterns([
    "design","designer","modern","simple","luxury","premium",
    "latest","trending","new design","beautiful","sundar",
    "stylish","contemporary","classic","traditional","minimal",
    "hidden light","cove","pop design","led design","backlight",
    "showroom","hotel jaisa","pinterest","instagram","fashion",
    "trendy","vintage","elegant","royal","simple design",
  ]),
  installation: expandPatterns([
    "kitne din","kitna time","kab tak","jaldi","time lagega",
    "installation","install","fitting","lagane mein","din lagega",
    "start kab","complete kab","finish kab","delivery",
    "kitne din mein","jaldi ho","urgent","kitna samay lagega",
    "kitna time chahiye","kab hoga","kab complete hoga",
  ]),
  waterproof: expandPatterns([
    "waterproof","water proof","paani","seepage","moisture","humidity",
    "bathroom","kitchen","geela","nami","barish","monsoon","rain",
    "water resistant","water damage","leak","leakage","damp",
    "paani se bachana","paani nahi jaana","seepage problem",
  ]),
  budget: expandPatterns([
    "kam budget","budget kam","sasta","cheap","affordable","low budget",
    "budget tight","budget nahi","mahnga","costly","jyada",
    "kam mein","sasta option","affordable option","low cost",
    "minimum","starting","basic","simple wala","thoda kam paisa",
    "budget friendly","gareeb","limited budget","kifayati",
  ]),
  negotiation: expandPatterns([
    "final rate","discount","offer","chhut","kam karo","negotiate",
    "last price","best price","minimum price","rate kam",
    "koi offer","koi discount","aur kam","thoda kam",
    "asli material","bharosa","pehle kaam","dikhao","sample",
    "guarantee kaise","trust kaise","cheapest","sabse sasta",
    "aur sasta","discount chahiye","offer hai kya",
  ]),
  confused: expandPatterns([
    "samajh nahi","nahi aa raha","kya sahi","konsa sahi",
    "aap batao","recommend","suggest","confused","pata nahi",
    "decide nahi","soch mein","doubt","sawal","query",
    "help","madad","guide","suggest karo","kya karu",
    "samajh mein nahi aa raha","confused hoon","guide karo",
  ]),
  "image-reference": expandPatterns([
    "photo","image","picture","pic","aisa design","jaisa",
    "reference","sample","dekh ke","photo dikha","design dikha",
    "pinterest","instagram","youtube","google","gallery",
    "images dikhao","picture dikhao","dekhna hai",
  ]),
  "call-request": expandPatterns([
    "call","phone","contact","baat","number","reach","talk",
    "call karo","phone karo","baat karni","number do",
    "contact karo","call back","phone number chahiye",
    "aapka number do","tumhara number do","baat karna hai",
  ]),
  general: [],
}

// ─── Room Type Detection ─────────────────────────────────────────────────────

const ROOM_PATTERNS: Array<[RegExp, string, boolean]> = [
  [/\bhall\b|\bdrawing\s*room\b|\bliving\s*room\b|\bbaithak\b|\bdarbar\b|\blounge\b/, "Hall", false],
  [/\bbedroom\b|\bbed\s*room\b|\bkamra\b|\bbed\b/, "Bedroom", false],
  [/\bkitchen\b|\brasoi\b|\brasoi\s*ghar\b/, "Kitchen", true],
  [/\bbathroom\b|\btoilet\b|\bwashroom\b|\blatrine\b/, "Bathroom", true],
  [/\boffice\b|\bcabin\b/, "Office", false],
  [/\breception\b/, "Reception", false],
  [/\bbalcony\b|\bbalkani\b/, "Balcony", true],
  [/\bpooja\b|\bmandir\b|\bpuja\b/, "Pooja Room", false],
  [/\bdining\b/, "Dining Room", false],
  [/\bshop\b|\bshowroom\b|\bdukaan\b/, "Shop/Showroom", false],
]

// ─── Helper: Extract Room Dimensions ─────────────────────────────────────────

function extractRoomDimensions(text: string): { length: number; width: number } | null {
  const t = text.toLowerCase()
  // Pattern 1: 12x14, 12×14, 12*14, 12 by 14
  let match = t.match(/(\d+(?:\.\d+)?)\s*[x×*by]\s*(\d+(?:\.\d+)?)/)
  if (match) {
    return { length: parseInt(match[1]), width: parseInt(match[2]) }
  }
  // Pattern 2: 12 feet by 14 feet, 12 ft * 14 ft
  match = t.match(/(\d+(?:\.\d+)?)\s*(?:ft|feet|foot)?\s*(?:by|x|×|\*)\s*(\d+(?:\.\d+)?)\s*(?:ft|feet|foot)?/)
  if (match) {
    return { length: parseInt(match[1]), width: parseInt(match[2]) }
  }
  // Pattern 3: length 12 width 14
  match = t.match(/(?:length|lenght|long|lam)\s*(\d+)\s*(?:ft|feet|foot)?\s*(?:width|wid|chauda|chaudai)\s*(\d+)/)
  if (match) {
    return { length: parseInt(match[1]), width: parseInt(match[2]) }
  }
  return null
}

// ─── Core Detection Functions (Improved) ─────────────────────────────────────

export function detectCity(text: string): string | null {
  const t = text.toLowerCase().replace(/[^a-z\s]/g, "")
  for (const [key, val] of Object.entries(CITY_MAP)) {
    if (t.includes(key)) return val
  }
  return null
}

export function detectService(text: string): string | null {
  const t = text.toLowerCase()
  for (const [pat, name] of SERVICE_PATTERNS) {
    if (pat.test(t)) return name
  }
  return null
}

export function detectIntent(text: string): Intent {
  const t = text.toLowerCase().trim()

  // Short greetings first
  if (INTENT_PATTERNS.greeting.some(k => t.includes(k)) && t.length < 40) return "greeting"

  // Thanks (short messages)
  if (INTENT_PATTERNS.thanks.some(k => t.includes(k)) && t.length < 50) return "thanks"

  // Complaint (high priority)
  if (INTENT_PATTERNS.complaint.some(k => t.includes(k))) return "complaint"

  // Booking intent
  if (INTENT_PATTERNS.booking.some(k => t.includes(k))) return "booking"

  // Room dimensions
  if (INTENT_PATTERNS["room-estimate"].some(k => t.includes(k)) || /\d+\s*[x×by*]\s*\d+/.test(t)) return "room-estimate"

  // Call request
  if (INTENT_PATTERNS["call-request"].some(k => t.includes(k))) return "call-request"

  // Waterproof/durability
  if (INTENT_PATTERNS.waterproof.some(k => t.includes(k))) return "waterproof"

  // Design intent
  if (INTENT_PATTERNS.design.some(k => t.includes(k))) return "design"

  // Installation timing
  if (INTENT_PATTERNS.installation.some(k => t.includes(k))) return "installation"

  // Budget concern
  if (INTENT_PATTERNS.budget.some(k => t.includes(k))) return "budget"

  // Negotiation/trust
  if (INTENT_PATTERNS.negotiation.some(k => t.includes(k))) return "negotiation"

  // Confused user
  if (INTENT_PATTERNS.confused.some(k => t.includes(k))) return "confused"

  // Image reference
  if (INTENT_PATTERNS["image-reference"].some(k => t.includes(k))) return "image-reference"

  // Area/location
  if (INTENT_PATTERNS.area.some(k => t.includes(k))) return "area"

  // Quality/warranty
  if (INTENT_PATTERNS.quality.some(k => t.includes(k))) return "quality"

  // COMPARISON: Only if explicit vs/compare/difference words AND material names
  const hasComparisonWord = INTENT_PATTERNS.comparison.some(k => t.includes(k))
  const hasMaterials = /pvc|gypsum|wpc|uv|marble|wood|pop|grid|fluted/.test(t)
  if (hasComparisonWord && hasMaterials) return "comparison"

  // Pricing (check after budget & comparison to avoid misclassification)
  if (INTENT_PATTERNS.pricing.some(k => t.includes(k))) return "pricing"

  // Service info
  if (INTENT_PATTERNS["service-info"].some(k => t.includes(k))) return "service-info"

  return "general"
}

export function detectRoomType(text: string): { label: string; isWet: boolean } | null {
  const t = text.toLowerCase()
  for (const [pat, label, isWet] of ROOM_PATTERNS) {
    if (pat.test(t)) return { label, isWet }
  }
  return null
}

export function detectBudgetLevel(text: string): "low" | "mid" | "high" | null {
  const t = text.toLowerCase()
  if (/\bkam\b|\bsasta\b|\bcheap\b|\baffordable\b|\blow\s*budget\b|\bbudget\s*kam\b|\bbudget\s*tight\b|\bminimum\b|\bbasic\b|\bkifayati\b/.test(t)) return "low"
  if (/\bpremium\b|\bluxury\b|\bbest\b|\bhigh[\s-]*end\b|\bexpensive\b|\bdesigner\b|\bbest\s*material\b/.test(t)) return "high"
  if (/\bstandard\b|\bmid\b|\bmedium\b|\bnormal\b|\baverage\b/.test(t)) return "mid"
  return null
}

export function tryExtractPhone(raw: string): string | null {
  const m = raw.replace(/\D/g, "").match(/(?:0|91)?([6-9]\d{9})/)
  return m ? m[1] : null
}

export function tryExtractName(raw: string): string {
  const phone = tryExtractPhone(raw)
  let s = phone ? raw.replace(phone, "").replace(/\b91\b/g, "") : raw
  const stops = /\b(my|name|is|i|am|this|phone|number|mobile|contact|mera|naam|hai|hoon|ka|ki|ke|mujhe|main|me|aur|or|sir|madam|ji|bhai|sahab|mere)\b/gi
  s = s.replace(stops, " ").replace(/[^a-zA-Z\u0900-\u097F\s]/g, " ").replace(/\s+/g, " ").trim()
  const parts = s.split(/\s+/).filter(p => p.length > 1)
  return parts.slice(0, 2).join(" ")
}

function isOffHours(): boolean {
  const istH = new Date(Date.now() + 5.5 * 3600000).getUTCHours()
  return istH >= 21 || istH < 9
}

// ─── Material Recommendation Engine ──────────────────────────────────────────

export function recommendMaterial(
  roomType: string | null,
  isWet: boolean,
  budget: "low" | "mid" | "high" | null
): { primary: string; reason: string; alternative?: string; altReason?: string } {
  if (isWet) {
    return {
      primary: "PVC Ceiling",
      reason: "100% waterproof, zero maintenance, 20+ saal ki life",
      alternative: "UV Marble Sheets",
      altReason: "agar wall cladding bhi chahiye toh — bhi 100% waterproof",
    }
  }

  if (roomType === "Hall" || roomType === "Drawing Room") {
    if (budget === "low") {
      return {
        primary: "PVC Ceiling",
        reason: "budget-friendly, zero maintenance, decent designs available",
        alternative: "Gypsum Ceiling",
        altReason: "thoda extra mein premium cove lighting possible",
      }
    }
    return {
      primary: "Gypsum Ceiling",
      reason: "premium cove lighting, POP designs, luxury finish — hall ke liye best",
      alternative: "PVC Ceiling",
      altReason: "agar budget kam karna ho toh — waterproof bhi hai",
    }
  }

  if (roomType === "Bedroom") {
    if (budget === "low") {
      return {
        primary: "PVC Ceiling",
        reason: "affordable, zero maintenance, wood/marble textures available",
      }
    }
    return {
      primary: "Gypsum Ceiling",
      reason: "smooth finish, LED cove lighting, bedroom ke liye elegant look",
      alternative: "PVC Ceiling",
      altReason: "budget option — bhi kaafi accha lagta hai",
    }
  }

  if (roomType === "Office" || roomType === "Shop/Showroom") {
    return {
      primary: "Grid Ceiling",
      reason: "commercial standard, easy maintenance, AC access convenient",
      alternative: "Gypsum Ceiling",
      altReason: "premium office look ke liye",
    }
  }

  // Default
  if (budget === "low") {
    return {
      primary: "PVC Ceiling",
      reason: "most affordable, waterproof, zero maintenance",
    }
  }
  return {
    primary: "Gypsum Ceiling",
    reason: "premium look, cove lighting, smooth finish",
    alternative: "PVC Ceiling",
    altReason: "budget-friendly waterproof option",
  }
}

// ─── Consultant Reply with Improved Logic & Memory ──────────────────────────

export function consultantReply(
  input: string,
  ctx: ConversationContext
): string | null {
  const t = input.toLowerCase().trim()
  const intent = detectIntent(input)
  const city = detectCity(t)
  const svc = detectService(t)
  const room = detectRoomType(t)
  const budget = detectBudgetLevel(t)
  const dimensions = extractRoomDimensions(t)

  // Update context with new info
  if (city && !ctx.city) ctx.city = city
  if (svc && !ctx.service) ctx.service = svc
  if (budget) ctx.budget = budget
  if (room) ctx.roomType = room.label
  ctx.lastIntent = intent
  ctx.messagesExchanged++

  const knownCity = ctx.city
  const knownSvc = ctx.service
  const knownRoom = ctx.roomType
  const knownBudget = ctx.budget
  const hasDimension = dimensions !== null

  // Check if user is replying to a size question we asked earlier
  if (!hasDimension && ctx.pendingSizeForService && t.match(/\d+\s*(?:sq|sqft|feets?|ft|feet)/)) {
    // User gave size in sqft without dimensions, try to parse
    const sqftMatch = t.match(/(\d+)\s*(?:sq|sqft|feets?|ft|feet)/)
    if (sqftMatch) {
      const sqft = parseInt(sqftMatch[1])
      // Approximate: assume square root for dimensions? Better to ask for dimensions.
      return `Aapne ${sqft} sq.ft bataya. Exact length aur width batao (jaise 12×14) — tab main accurate estimate nikaalta hoon.`
    }
  }

  // If we were waiting for size and user gave dimensions, respond with estimate
  if (hasDimension && ctx.pendingSizeForService) {
    const serviceKey = ctx.pendingSizeForService
    const svcName = SERVICE_CATALOG.find(s => s.key === serviceKey)?.name || serviceKey
    const est = formatPriceEstimate(dimensions.length, dimensions.width, serviceKey, svcName)
    ctx.estimateGiven = est.slice(0, 80)
    ctx.roomSize = `${dimensions.length}x${dimensions.width}`
    ctx.pendingSizeForService = undefined
    return est + `\n\nExact quote ke liye free site visit — call/WhatsApp: **+91 8651070831**`
  }

  // ─── Multi-room estimate (highest priority for room combos)
  const multiRooms = parseMultiRoomQuery(t)
  if (multiRooms) {
    const est = generateMultiRoomEstimate(multiRooms)
    ctx.estimateGiven = est.slice(0, 80)
    const cta = knownCity
      ? `\n\n📞 ${knownCity} mein free site visit — WhatsApp: **+91 8651070831** — same day possible!`
      : `\n\nAap kis city mein hain? City batao toh free site visit arrange ho sakti hai!`
    return est + cta
  }

  // ─── Room dimension estimate (e.g. "12x14 pvc")
  if (hasDimension) {
    let serviceKey = "gypsum"
    let svcName = "Gypsum Ceiling"
    if (t.includes("pvc")) { serviceKey = "pvc"; svcName = "PVC Ceiling" }
    else if (t.includes("wpc")) { serviceKey = "wpc"; svcName = "WPC Wall Panel" }
    else if (t.includes("uv") || t.includes("marble")) { serviceKey = "uv"; svcName = "UV Marble Sheet" }
    else if (t.includes("gypsum")) { serviceKey = "gypsum"; svcName = "Gypsum Ceiling" }
    else if (t.includes("grid")) { serviceKey = "grid"; svcName = "Grid Ceiling" }
    else if (t.includes("fluted")) { serviceKey = "fluted"; svcName = "Fluted Panels" }
    // If user mentioned a specific service in context
    else if (knownSvc) {
      const found = SERVICE_CATALOG.find(s => s.name.toLowerCase() === knownSvc.toLowerCase())
      if (found) { serviceKey = found.key; svcName = found.name }
    }
    const est = formatPriceEstimate(dimensions.length, dimensions.width, serviceKey, svcName)
    ctx.estimateGiven = est.slice(0, 80)
    ctx.roomSize = `${dimensions.length}x${dimensions.width}`
    return est + `\n\nExact quote ke liye free site visit — call/WhatsApp: **+91 8651070831**`
  }

  // ─── COMPLAINT — empathize first, then offer help
  if (intent === "complaint") {
    return `Mujhe bahut dukh hua sunke. 😔 JK Interior mein har customer ka kaam hamari zimmedari hai.\n\nAapka issue detail mein batayein — kya hua, kab hua? Main turant team ko inform karti hoon.\n\n📞 Direct baat karein: **+91 8651070831** — hum resolve karenge!`
  }

  // ─── BOOKING — start lead collection naturally
  if (intent === "booking" && !ctx.phone) {
    if (ctx.name) {
      return `${ctx.name} ji! Free site visit ke liye aapka WhatsApp number share karein 📱 — main JK Interior ki team ko abhi inform karti hoon!`
    }
    return `Free site visit book karne ke liye pehle aapka naam bata dijiye! 😊`
  }

  // ─── CALL REQUEST
  if (intent === "call-request") {
    const oh = isOffHours()
    return oh
      ? `📞 **+91 8651070831**\n\nAbhi raat ka time hai — team kal subah 9 baje call karegi. Ya WhatsApp pe message karein — hum available hain!`
      : `📞 **Call karein:** +91 8651070831\n\nYa neeche WhatsApp button tap karein — seedha baat karein hamare expert se!`
  }

  // ─── WATERPROOF — recommend based on room
  if (intent === "waterproof") {
    if (room?.isWet || t.includes("bathroom") || t.includes("kitchen")) {
      return `Bathroom/Kitchen ke liye **PVC Ceiling** (₹60–120/sq.ft) perfect hai — 100% waterproof, termite-proof, 20+ saal ki life. 💧\n\nWall cladding bhi chahiye toh **UV Marble Sheets** (₹50–95/sq.ft) — bhi 100% waterproof!\n\nRoom ka size kya hai? Estimate abhi nikaaluun!`
    }
    return `Waterproof ke liye 2 best options hain:\n\n🏠 **PVC Ceiling** — ₹60–120/sq.ft (ceiling ke liye)\n💎 **UV Marble Sheets** — ₹50–95/sq.ft (walls ke liye)\n\nDono 100% waterproof hain! Kaunsi room ke liye chahiye? Size batao toh estimate de deti hoon!`
  }

  // ─── DESIGN — recommend based on room type
  if (intent === "design") {
    if (knownRoom === "Hall" || t.includes("hall")) {
      return `Hall ke liye best modern designs:\n\n✨ **Gypsum cove ceiling** — LED strip lighting ke saath cinema jaisa effect\n🪵 **WPC fluted panels** — TV wall pe 3D textured look\n💎 **UV marble accent wall** — premium marble finish\n\nHall ka size kitna hai? Design ke hisaab se estimate bata deti hoon!`
    }
    if (knownRoom === "Bedroom" || t.includes("bedroom")) {
      return `Bedroom ke liye trending designs:\n\n✨ **Gypsum ceiling** — soft cove lighting, warm glow\n🪵 **WPC headboard wall** — luxury wood-look panel\n🏠 **PVC ceiling** — budget-friendly, wood textures available\n\nBedroom ka size batao — estimate with design options!`
    }
    if (t.includes("tv") || t.includes("television")) {
      return `TV wall ke liye best options:\n\n🪵 **WPC fluted panels** — #1 trending, 3D textured look\n📺 **Modular TV unit** — custom storage + LED backlight\n💎 **UV marble backdrop** — marble finish at fraction of cost\n\nTV wall ka width kitna hai? Design aur budget ke hisaab se recommend karungi!`
    }
    if (t.includes("office") || t.includes("shop") || t.includes("showroom")) {
      return `Office/Shop ke liye:\n\n🏢 **Grid ceiling** — commercial standard, easy maintenance\n✨ **Gypsum ceiling** — premium reception look\n🪵 **WPC panels** — reception wall pe professional feel\n\nSpace ka size aur type batao — commercial estimate bana deti hoon!`
    }
    return `Modern interior ke liye best options:\n\n✨ Gypsum cove ceiling — hall/bedroom ke liye\n🪵 WPC fluted panels — TV wall/accent wall\n💎 UV marble sheets — bathroom/kitchen walls\n🏠 PVC ceiling — budget-friendly, har room ke liye\n\nKis room ke liye design chahiye? Size batao toh estimate bhi de deti hoon!`
  }

  // ─── INSTALLATION TIMING
  if (intent === "installation") {
    if (t.includes("pvc")) return `PVC ceiling bahut fast lagta hai — **1 room mein 1 din**! Poore ghar mein 3-4 din. 💨\n\nJaldi start karna hai? Free site visit book karein — +91 8651070831`
    if (t.includes("gypsum")) return `Gypsum ceiling **2-3 din** mein ek room mein ready hoti hai. Poore ghar mein 5-7 din. Cove lighting extra 1 din. ⏱\n\nTimeline pehle fix hoti hai — koi delay nahi! Site visit ke liye call karein.`
    if (t.includes("wpc")) return `WPC wall paneling **1-2 din** mein ek wall pe complete ho jaati hai. Full room mein 2-3 din. 🪵\n\nQuick installation — minimum disturbance! Book karein: +91 8651070831`
    return `Installation time:\n\n🏠 PVC ceiling — 1 din/room\n✨ Gypsum ceiling — 2-3 din/room\n🪵 WPC panels — 1-2 din/wall\n💎 UV marble — 1-2 din/room\n\nKaunsa kaam karwana hai? Room size batao toh timeline bhi bata deti hoon!`
  }

  // ─── BUDGET — suggest economical options
  if (intent === "budget") {
    if (room?.isWet) {
      return `Budget mein **PVC Ceiling** best hai — ₹60–120/sq.ft, 100% waterproof, zero maintenance. Kitchen/bathroom ke liye perfect! 💧\n\nRoom ka size batao — estimate nikaaluun!`
    }
    return `Budget-friendly options:\n\n🏠 **PVC Ceiling** — ₹60–120/sq.ft (sabse affordable, waterproof)\n💎 **UV Marble Sheets** — ₹50–95/sq.ft (walls ke liye sasta marble look)\n\nBudget mein poora ghar bhi ho sakta hai! Room size batao toh estimate bana deti hoon!`
  }

  // ─── NEGOTIATION / TRUST
  if (intent === "negotiation") {
    if (t.includes("discount") || t.includes("offer") || t.includes("kam karo") || t.includes("chhut")) {
      return `JK Interior mein already competitive pricing hai — koi hidden charges nahi! Site visit mein exact quotation milega with transparent breakdown. 💰\n\nMultiple rooms ka kaam ek saath karwane pe **combo discount** bhi available hai! Free site visit book karein — +91 8651070831`
    }
    if (t.includes("asli") || t.includes("original") || t.includes("bharosa") || t.includes("trust")) {
      return `Bharosa bilkul karein! 🙏\n\n✅ **1 saal ki written warranty** — koi issue aaye, free repair\n✅ **ISI-certified branded materials** — koi duplicate nahi\n✅ **500+ completed projects** — 8+ saal ka experience\n✅ **Free site visit** — dekh ke decide karein\n\nKaam shuru hone se pehle material sample bhi dikhaya jaata hai!`
    }
    if (t.includes("pehle") || t.includes("dikhao") || t.includes("sample") || t.includes("dekh")) {
      return `Bilkul! Free site visit mein hamare expert:\n\n📐 Exact measurements lenge\n🎨 Design options dikhayenge\n📋 Material samples bhi available hain\n💰 Transparent quotation denge\n\nKoi obligation nahi — dekh ke decide karein! Call: **+91 8651070831**`
    }
    return `JK Interior mein transparency sabse important hai:\n\n✅ Written warranty — 1 saal\n✅ Branded materials — ISI certified\n✅ No hidden charges — upfront pricing\n✅ Free site visit — no obligation\n\nKoi bhi sawaal ho toh poochhein! 😊`
  }

  // ─── CONFUSED USER — act like real consultant
  if (intent === "confused") {
    if (knownRoom) {
      const rec = recommendMaterial(knownRoom, room?.isWet ?? false, knownBudget ?? null)
      return `Samajh gaya! Main help karta hoon. 😊\n\n${knownRoom} ke liye meri recommendation: **${rec.primary}** — ${rec.reason}\n${rec.alternative ? `\nAlternative: **${rec.alternative}** — ${rec.altReason}` : ""}\n\nRoom ka approximate size batao (jaise 12×14) — main estimate bana ke decide karne mein help karunga!`
    }
    return `Koi baat nahi! Main aapko guide karta hoon. 😊\n\nPehle ek simple sawaal:\n\n1. Kaunsi room ke liye chahiye? (Hall, Bedroom, Kitchen, Bathroom)\n2. Budget approximately kitna hai?\n\nYeh batayein toh main best option recommend karunga!`
  }

  // ─── IMAGE REFERENCE
  if (intent === "image-reference") {
    return `Design reference dekh kar bilkul bana sakte hain! 🎨\n\nFree site visit mein aap design photo dikhayein — hamare expert usi tarah ka estimate denge.\n\nYa gallery dekhein hamari: **jkinterior.online/gallery**\n\nPhoto WhatsApp pe bhej sakte hain: **+91 8651070831** — design match karke quote denge!`
  }

  // ─── COMPARISON — detailed comparison only for explicit comparison queries
  if (intent === "comparison") {
    if ((t.includes("pvc") && t.includes("gypsum")) || (t.includes("ceiling") && (t.includes("konsa") || t.includes("better") || t.includes("difference")))) {
      return COMPARISONS["pvc-vs-gypsum"]
    }
    if ((t.includes("wpc") && (t.includes("uv") || t.includes("marble"))) || (t.includes("wall") && (t.includes("konsa") || t.includes("better")))) {
      return COMPARISONS["wpc-vs-uv"]
    }
    if (t.includes("pvc") && t.includes("wpc")) {
      return COMPARISONS["pvc-vs-wpc"]
    }
    // Generic comparison request
    return `Kya compare karna hai? Common comparisons:\n\n🏠 **PVC vs Gypsum** — ceiling ke liye\n🪵 **WPC vs UV Marble** — wall ke liye\n\nBataiye toh detailed comparison de deta hoon!`
  }

  // ─── AREA / LOCATION
  if (intent === "area") {
    const detectedCity = city || knownCity
    if (detectedCity) {
      return `**${detectedCity}** — haan, hum wahan kaam karte hain! 👍\n\nHum cover karte hain:\n${ALL_AREAS.join(" - ")}\n\nFree site visit book karein! 🙌`
    }
    return `Hum in sabhi areas mein kaam karte hain:\n\n${ALL_AREAS.join(" - ")}\n\nApna city batayein — main confirm kar deti hoon!`
  }

  // City mention alone
  if (city && t.length < 50 && !svc) {
    return `**${city}** mein hum regularly kaam karte hain! 💪\n\nCeiling ya wall paneling kisliye chahiye? Room size batao toh estimate bhi de deti hoon!`
  }

  // ─── QUALITY / WARRANTY
  if (intent === "quality") {
    return `JK Interior Quality Guarantee:\n\n✅ **1 saal ki written warranty** — koi bhi issue, free repair\n✅ **ISI-certified branded materials** — koi duplicate nahi\n✅ **100% waterproof options** — bathroom/kitchen safe\n✅ **8+ saal experience, 500+ projects** — proven track record\n\nMaterial sample bhi dikhaya jaata hai kaam shuru hone se pehle! 🙏`
  }

  // ─── SERVICE INFO
  if (intent === "service-info") {
    return `JK Interior ki services:\n\n✨ Gypsum Ceiling — ₹80–140/sq.ft\n🏠 PVC Ceiling — ₹60–120/sq.ft\n🪵 WPC Wall Panels — ₹180–450/sq.ft\n💎 UV Marble Sheets — ₹50–95/sq.ft\n📺 Modular TV Unit — ₹15,000+\n🏛 Fluted Panels — ₹200–500/sq.ft\n🏢 Grid Ceiling — ₹45–90/sq.ft\n🌿 Artificial Grass — ₹40–120/sq.ft\n\nKis service ke baare mein detail chahiye? Room size batao toh estimate bhi de deti hoon!`
  }

  // ─── PRICING (IMPROVED) — always give pricing response
  if (intent === "pricing") {
    // If we know service & room type but no size, ask for size
    if (knownSvc && knownRoom && !hasDimension) {
      ctx.pendingSizeForService = SERVICE_CATALOG.find(s => s.name === knownSvc)?.key || "gypsum"
      return `${knownRoom} ke liye **${knownSvc}** — accha choice hai! 👍\n\n${knownRoom} ka size batao (jaise 12×14) — exact estimate abhi nikaalta hoon!`
    }
    // If we know service but no room, ask room type first
    if (knownSvc && !knownRoom) {
      return `${knownSvc} ke liye kaunsi room chahiye? (hall, bedroom, kitchen, bathroom)\nRoom type aur size batao toh estimate de sakti hoon!`
    }
    // If we know room type but no service, recommend material and ask size
    if (knownRoom && !hasDimension) {
      const rec = recommendMaterial(knownRoom, room?.isWet ?? false, knownBudget ?? null)
      ctx.pendingSizeForService = rec.primary === "PVC Ceiling" ? "pvc" : (rec.primary === "Gypsum Ceiling" ? "gypsum" : "wpc")
      return `${knownRoom} ke liye **${rec.primary}** — ${rec.reason}\n\n${knownRoom} ka size batao (jaise 12×14) — exact estimate abhi nikaalta hoon!`
    }
    // Generic pricing list if nothing specific
    return `JK Interior — Price List:\n\n✨ Gypsum Ceiling — ₹80–140/sq.ft\n🏠 PVC Ceiling — ₹60–120/sq.ft\n🪵 WPC Wall Panels — ₹180–450/sq.ft\n💎 UV Marble Sheets — ₹50–95/sq.ft\n📺 Modular TV Unit — ₹15,000+\n🏛 Fluted Panels — ₹200–500/sq.ft\n🏢 Grid Ceiling — ₹45–90/sq.ft\n\nRoom ka size batayein — main estimate nikaal deti hoon!`
  }

  // ─── Context-rich: City + room + work intent
  if (knownCity && (knownRoom || t.includes("room")) && (t.includes("karwana") || t.includes("lagwana") || t.includes("chahiye")) && !hasDimension) {
    const rec = recommendMaterial(knownRoom, room?.isWet ?? false, knownBudget ?? null)
    return `${knownCity} mein karte hain! 👍\n\n${knownRoom || "Room"} ke liye **${rec.primary}** best hai — ${rec.reason}\n\nRoom ka size batao (jaise 12×14) — estimate abhi nikaalta hoon!`
  }

  // ─── Room type mentioned without size
  if (room && !hasDimension && !knownSvc) {
    const rec = recommendMaterial(room.label, room.isWet, knownBudget ?? null)
    ctx.pendingSizeForService = rec.primary === "PVC Ceiling" ? "pvc" : (rec.primary === "Gypsum Ceiling" ? "gypsum" : "wpc")
    return `${room.label} ke liye **${rec.primary}** best hai — ${rec.reason}\n${rec.alternative ? `Alternative: **${rec.alternative}** — ${rec.altReason}\n` : ""}\n${room.label} ka size kya hai (jaise 12×14)? Estimate abhi nikaaluun!`
  }

  // ─── Room type + service mentioned, need size
  if (room && knownSvc && !hasDimension) {
    ctx.pendingSizeForService = SERVICE_CATALOG.find(s => s.name === knownSvc)?.key || "gypsum"
    return `${knownSvc} ${room.label} ke liye bahut accha choice hai! 👍\n\n${room.label} ka size batao (jaise 10×12 ya 12×14) — estimate abhi calculate kar deta hoon!`
  }

  // ─── Service mentioned alone, need room + size
  if (svc && !room && !hasDimension) {
    return `${svc} — accha choice! Kaunsi room ke liye chahiye (hall, bedroom, kitchen)?\n\nRoom type aur size batao toh estimate bhi de sakti hoon!`
  }

  // ─── PVC specific questions
  if (/pvc sahi|pvc theek|pvc accha|pvc lena|pvc lagwana|pvc kaisa/.test(t)) {
    return `Haan, PVC excellent choice hai! 100% waterproof, 20+ saal ki life, kabhi repaint nahi. 🏠\n\nKaunsi room ke liye — bedroom, kitchen, ya hall? Size batao toh estimate bhi bata sakti hoon.`
  }

  // ─── GREETING (vary responses)
  if (intent === "greeting") {
    const greetings = [
      `Namaste${ctx.name ? " " + ctx.name : ""}! Main Riya hoon, JK Interior ki AI consultant. 😊\n\nCeiling, wall paneling, pricing, room estimate — kuch bhi poochhein! Room ka size batayein toh estimate abhi nikaalta hoon!`,
      `Hello${ctx.name ? " " + ctx.name : ""}! 🏠 JK Interior mein swagat hai. PVC ceiling, gypsum, WPC panels, pricing — sab kuch pooch sakte hain!`,
      `Namaskar${ctx.name ? " " + ctx.name : ""}! 🙏 Main Riya, JK Interior se. Kya aap ceiling ya wall paneling ke baare mein jaankari lena chahte hain?`,
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // ─── THANKS (vary responses)
  if (intent === "thanks") {
    const thanks = [
      `Bahut shukriya${ctx.name ? " " + ctx.name : ""}! 🙏 Koi bhi sawaal ho toh main yahaan hoon. JK Interior mein aapki seva hamara farz hai!`,
      `Aapka dhanyawad! 😊 Kisi aur cheez mein madad chahiye ho toh batao.`,
      `Shukriya${ctx.name ? " " + ctx.name : ""}! 🏠 Aapka ghar beautiful banane mein hum madad kar sakte hain — kabhi bhi poochhein!`,
    ]
    return thanks[Math.floor(Math.random() * thanks.length)]
  }

  // ─── Deep material info
  if (t.includes("gypsum") || (t.includes("pop ") && !t.includes("popular"))) {
    const m = MATERIAL_KNOWLEDGE.gypsum
    const isWaterQ = /\bpaani\b|\bwater\b|\bbathroom\b|\bnami\b|\bmoisture\b|\bgeela\b/.test(t)
    if (isWaterQ) return `Gypsum ceiling waterproof nahi hoti — bathroom ya kitchen ke liye **PVC ceiling** best hai (₹60-120/sq.ft, 100% waterproof).\n\nHall aur bedroom ke liye gypsum perfect hai! Room ka size batao toh estimate de deti hoon!`
    return `**Gypsum False Ceiling** — ${m.price}\n\n${m.description}\n\nBest for: ${m.bestFor}\nAvoid: ${m.avoidIn}\nInstall: ${m.installTime}\nWarranty: ${m.warranty}\n\nRoom ka size batao — estimate nikaalta hoon!`
  }

  if (t.includes("pvc")) {
    const m = MATERIAL_KNOWLEDGE.pvc
    return `**PVC False Ceiling** — ${m.price}\n\n${m.description}\n\nBest for: ${m.bestFor}\nInstall: ${m.installTime}\nWarranty: ${m.warranty}\n\nHar room ke liye perfect! Room size batao toh estimate de deti hoon!`
  }

  if (t.includes("wpc") || t.includes("wood panel") || t.includes("louver")) {
    const m = MATERIAL_KNOWLEDGE.wpc
    return `**WPC Wall Panels** — ${m.price}\n\n${m.description}\n\nBest for: ${m.bestFor}\nInstall: ${m.installTime}\nWarranty: ${m.warranty}\n\nTV wall ke liye #1 choice! Wall size batao toh estimate de deti hoon!`
  }

  if (/\buv\b|\buv-?\b|\bmarble\s*sheet\b/.test(t)) {
    const m = MATERIAL_KNOWLEDGE.uv
    return `**UV Marble Sheets** — ${m.price}\n\n${m.description}\n\nBest for: ${m.bestFor}\nAvoid: ${m.avoidIn}\nInstall: ${m.installTime}\nWarranty: ${m.warranty}`
  }

  if (t.includes("tv unit") || t.includes("tv panel") || t.includes("tv cabinet") || t.includes("tv wall")) {
    const m = MATERIAL_KNOWLEDGE.tvunit
    return `**Modular TV Unit** — ${m.price}\n\nCustom designed for your exact room!\n\nSize and price:\n- 6-8 ft: ${m.sizes.small}\n- 8-10 ft: ${m.sizes.medium}\n- 10-14 ft: ${m.sizes.large}\n\nLED lighting bhi add ho sakti hai. TV wall ka width batao!`
  }

  if (t.includes("fluted") || t.includes("ribbed") || t.includes("3d panel")) {
    return `**Fluted / Louver Panels** (₹200-500/sq.ft)\n\nModern 3D textured look — abhi ka sabse trending wall design! Feature walls, reception, office lobby ke liye perfect.\n\nWall size batao toh estimate de deti hoon!`
  }

  if (t.includes("grid") || t.includes("office ceiling") || t.includes("mineral")) {
    return `**Grid Ceiling** (₹45-90/sq.ft)\n\nCommercial offices, shops, hospitals ke liye standard. Easy maintenance — AC aur electrical ke liye convenient access.\n\nOffice size batao toh estimate de deti hoon!`
  }

  if (t.includes("complete interior") || t.includes("full interior") || t.includes("poora ghar") || t.includes("pura ghar") || t.includes("full home")) {
    return `**Complete Interior Package**\n\nFull home: Ceiling + Wall Panels + TV Unit + Kitchen — ek team, ek timeline!\n\n- One point of contact\n- Combo discount available\n- 1-year warranty on everything\n- 500+ full home projects done\n\nRoom by room estimate ke liye free consultation book karein!`
  }

  if (t.includes("artificial grass") || (t.includes("grass") && !t.includes("ceiling"))) {
    return `**Artificial Grass** (₹40-120/sq.ft)\n\nBalcony, terrace, wall decor ke liye perfect! Zero maintenance, UV resistant, weatherproof.\n\nArea size batao toh estimate de deti hoon!`
  }

  // ─── LED / Lighting
  if (t.includes("led") || t.includes("cove light") || t.includes("strip light") || t.includes("backlight")) {
    return `**LED Cove Lighting** gypsum ceiling ke saath:\n- Running cost: ₹40-80/running ft\n- WPC TV wall LED backlight: ₹2,000-5,000\n\nBahut premium look aata hai! Night mein ghar cinema jaisa lagta hai.\n\nFree site visit mein design discuss karein!`
  }

  // ─── FAQ matching
  for (const faq of FAQ) {
    if (faq.q.some(kw => t.includes(kw))) return faq.a
  }

  // ─── Default — smart follow-up based on context and memory
  if (knownRoom && !ctx.askedSize) {
    ctx.askedSize = true
    return `${knownRoom} ka size batao (jaise 12×14) — main estimate abhi nikaalta hoon!`
  }
  if (knownSvc && !knownRoom) {
    return `${knownSvc} ke liye kaunsi room hai — hall, bedroom, kitchen? Room type batao toh best option recommend karunga!`
  }

  const fallbacks = [
    `Room ka size batao (jaise 10×12 ya 12×14) aur kaunsa kaam chahiye — ceiling ya wall paneling? Estimate abhi nikaaluun!`,
    `Thoda aur batao — kaunsi room ke liye hai aur approximately size kya hoga? Size milte hi estimate bata deti hoon!`,
    `Kya ceiling karwana hai ya wall paneling? Room ka size batao toh estimate de deti hoon!`,
  ]
  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

// ─── Quick Reply Generator ───────────────────────────────────────────────────

export function getSmartQuickReplies(ctx: ConversationContext): string[] {
  const intent = ctx.lastIntent

  if (intent === "pricing" || intent === "room-estimate") {
    return ["Book Site Visit", "Compare Materials", "Other Services", "Quality & Warranty"]
  }
  if (intent === "comparison") {
    return ["Get Estimate", "Book Site Visit", "Budget Options", "Premium Options"]
  }
  if (intent === "design") {
    return ["Get Estimate", "Book Site Visit", "See Gallery", "Material Options"]
  }
  if (intent === "booking") {
    return ["WhatsApp Us", "Call Now", "Other Services"]
  }
  if (intent === "waterproof") {
    return ["PVC Ceiling Rate", "UV Marble Rate", "Book Site Visit", "Kitchen Options"]
  }
  if (intent === "budget") {
    return ["PVC Ceiling", "UV Marble", "Get Estimate", "Book Site Visit"]
  }
  if (intent === "quality") {
    return ["Book Site Visit", "PVC Ceiling", "Gypsum Ceiling", "WPC Panels"]
  }
  if (intent === "installation") {
    return ["Book Site Visit", "Get Estimate", "Urgent Work"]
  }
  if (intent === "negotiation") {
    return ["Book Site Visit", "See Gallery", "Call Now"]
  }
  if (intent === "area") {
    return ["Get Estimate", "Book Site Visit", "Our Services"]
  }
  if (ctx.phone) {
    return ["Book Site Visit", "Get Estimate", "Other Services"]
  }
  return ["PVC Ceiling", "Gypsum Ceiling", "Price List", "Free Site Visit", "Our Areas"]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export { isOffHours, ALL_AREAS, CITY_MAP }

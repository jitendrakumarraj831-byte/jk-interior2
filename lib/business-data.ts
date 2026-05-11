export const WA_NUMBER = "918651070831"
export const CALL_NUMBER = "+918651070831"

export interface LeadContext {
  name?: string
  phone?: string
  city?: string
  service?: string
  budget?: string
  roomSize?: string
}

// ─── Service Catalog ────────────────────────────────────────────────────────

export const SERVICE_CATALOG = [
  {
    key: "gypsum",
    name: "Gypsum False Ceiling",
    emoji: "✨",
    priceRange: "₹80–₹140/sq.ft",
    highlights: "Elegant cove lighting, POP designs, smooth finish",
    bestFor: "Living rooms, bedrooms, dry areas",
    waterproof: false,
    keywords: ["gypsum", "pop", "plaster", "cove", "jipsum"],
  },
  {
    key: "pvc",
    name: "PVC False Ceiling",
    emoji: "🏠",
    priceRange: "₹60–₹120/sq.ft",
    highlights: "100% waterproof, termite-proof, low maintenance",
    bestFor: "Kitchens, bathrooms, any room",
    waterproof: true,
    keywords: ["pvc", "pvc ceiling"],
  },
  {
    key: "wpc",
    name: "WPC Wall Panels",
    emoji: "🪵",
    priceRange: "₹180–₹450/sq.ft",
    highlights: "Eco-friendly wood-look, moisture resistant, luxury finish",
    bestFor: "Accent walls, TV panels, full room paneling",
    waterproof: true,
    keywords: ["wpc", "wall panel", "wood panel", "louver", "louver panel"],
  },
  {
    key: "uv",
    name: "UV Marble Sheets",
    emoji: "💎",
    priceRange: "₹50–₹95/sq.ft",
    highlights: "High-gloss, scratch-resistant, hygienic surface",
    bestFor: "Walls, kitchen counters, feature areas",
    waterproof: true,
    keywords: ["uv", "marble", "marble sheet", "uv marble"],
  },
  {
    key: "tvunit",
    name: "Modular TV Unit",
    emoji: "📺",
    priceRange: "₹15,000–₹60,000+",
    highlights: "Custom designs, premium finish, cable management",
    bestFor: "Living rooms, bedrooms",
    waterproof: false,
    keywords: ["tv unit", "tv panel", "tv wall", "television", "tv cabinet"],
  },
  {
    key: "fluted",
    name: "Fluted / Louver Panels",
    emoji: "🏛️",
    priceRange: "₹200–₹500/sq.ft",
    highlights: "Modern textured look, 3D effect, trending design",
    bestFor: "Feature walls, reception areas, office lobbies",
    waterproof: false,
    keywords: ["fluted", "fluted panel", "ribbed", "3d panel"],
  },
  {
    key: "grid",
    name: "Grid Ceiling",
    emoji: "🏢",
    priceRange: "₹45–₹90/sq.ft",
    highlights: "Commercial standard, easy maintenance, acoustic options",
    bestFor: "Offices, shops, hospitals, commercial spaces",
    waterproof: false,
    keywords: ["grid", "grid ceiling", "office ceiling", "mineral fiber"],
  },
  {
    key: "artificial-grass",
    name: "Artificial Grass",
    emoji: "🌿",
    priceRange: "₹40–₹120/sq.ft",
    highlights: "No maintenance, evergreen look, UV resistant",
    bestFor: "Balconies, terraces, wall decor, garden",
    waterproof: true,
    keywords: ["artificial grass", "grass", "turf", "green wall"],
  },
  {
    key: "interior",
    name: "Complete Interior Design",
    emoji: "🏡",
    priceRange: "Custom quote",
    highlights: "Full home: ceiling + wall panels + TV unit + kitchen — one team, one timeline",
    bestFor: "New homes, full renovations",
    waterproof: false,
    keywords: ["complete interior", "full interior", "full home", "renovation", "poora ghar", "pura ghar", "bedroom interior", "office interior"],
  },
]

// ─── Deep Material Knowledge ─────────────────────────────────────────────────

export const MATERIAL_KNOWLEDGE = {
  gypsum: {
    fullName: "Gypsum False Ceiling",
    price: "₹80–₹140/sq.ft (basic to premium design)",
    premiumPrice: "₹120–₹200/sq.ft with cove lighting + LED",
    description: "Gypsum board ceiling is the most popular choice for living rooms and bedrooms in India. It gives a smooth plaster-like finish and can be shaped into beautiful cove designs, pop borders, and artistic patterns.",
    pros: [
      "Elegant smooth finish — luxury look",
      "Excellent for cove lighting and LED strips",
      "Can be painted any color",
      "Fire resistant — safe for home",
      "Sound insulation properties",
      "Easy to get any design / shape",
      "10+ year lifespan in dry areas",
    ],
    cons: [
      "Not waterproof — avoid in bathrooms/kitchens",
      "Susceptible to moisture damage",
      "Repairs can be slightly visible",
      "Takes 3-5 days to complete with finishing",
    ],
    bestFor: "Hall, bedroom, drawing room, dining area, office cabin — any DRY area",
    avoidIn: "Bathroom, kitchen, outdoor areas",
    installTime: "1 bedroom: 2-3 days | Full hall: 3-5 days",
    maintenance: "Minimal — just dust occasionally. Repaint every 5-7 years.",
    warranty: "5 years (JK Interior written warranty)",
    hinglishFAQ: {
      "paani me kharab hoga": "Haan, gypsum waterproof nahi hota. Bathroom/kitchen ke liye PVC better option hai. Hall aur bedroom ke liye gypsum perfect hai!",
      "kitna time lagega": "Ek room mein 2-3 din lagenge. Poore ghar mein 5-7 din.",
      "pop se kya difference": "Gypsum board panels hote hain, POP (Plaster of Paris) direct plaster hota hai. Gypsum zyada smooth, uniform, aur modern hota hai. JK Interior dono karta hai.",
    },
  },
  pvc: {
    fullName: "PVC False Ceiling",
    price: "₹60–₹120/sq.ft",
    premiumPrice: "₹90–₹150/sq.ft with designer textures",
    description: "PVC (Polyvinyl Chloride) ceiling panels are 100% waterproof, making them perfect for every room including bathrooms and kitchens. They come in wood texture, glossy, matte, and 3D printed designs.",
    pros: [
      "100% waterproof — safe for bathroom, kitchen",
      "Termite-proof and insect-resistant",
      "Zero maintenance — just wipe clean",
      "Never needs repainting",
      "Very long life — 20+ years",
      "Most affordable false ceiling option",
      "Available in wood, marble, plain textures",
    ],
    cons: [
      "Less premium look vs gypsum for living rooms",
      "Cannot be painted or customized like gypsum",
      "Basic designs — no complex cove shapes",
    ],
    bestFor: "Bathroom, kitchen, balcony, shop, office, ANY room — most versatile option",
    avoidIn: "Nothing — works everywhere but living rooms may prefer gypsum for looks",
    installTime: "1 room: 1 day | Full home: 3-4 days",
    maintenance: "Zero — just wipe with damp cloth. Never needs paint.",
    warranty: "5 years (JK Interior written warranty)",
    hinglishFAQ: {
      "waterproof hai kya": "Haan, 100% waterproof hai! Bathroom, kitchen sab jagah perfect.",
      "gypsum se sasta hai kya": "Haan, PVC gypsum se thoda sasta hota hai aur maintenance zero hai. Long term mein best value!",
      "kitne saal chalega": "20+ saal aasani se. Kabhi repaint nahi karna, kabhi kharabi nahi.",
    },
  },
  wpc: {
    fullName: "WPC Wall Panels",
    price: "₹180–₹450/sq.ft",
    premiumPrice: "₹350–₹600/sq.ft for premium fluted designs",
    description: "WPC (Wood Plastic Composite) panels give the luxury look of real wood without the maintenance issues. They're used for TV walls, accent walls, and full room paneling. Available in plain, grooved, and fluted (ribbed) designs.",
    pros: [
      "Premium luxury wood look at 60% less cost than real wood",
      "Moisture and termite resistant — outlasts real wood",
      "Eco-friendly — uses recycled wood + plastic composite",
      "Easy installation — no nails, clips system",
      "Zero maintenance — no polish, no varnish needed",
      "Available in 50+ colors and textures",
      "Fire retardant properties",
    ],
    cons: [
      "More expensive than UV marble for walls",
      "Limited custom shaping compared to gypsum",
    ],
    bestFor: "TV wall, bedroom headboard wall, accent wall, lobby, office reception",
    avoidIn: "Ceiling (use PVC/gypsum for ceiling)",
    installTime: "TV wall accent: 1 day | Full room: 2-3 days",
    maintenance: "Wipe with dry cloth. No polish or treatment needed. Lifetime maintenance-free.",
    warranty: "5 years (JK Interior written warranty)",
    hinglishFAQ: {
      "asli lakdi se kya difference": "WPC asli lakdi jaisi dikhti hai lekin termite, moisture, aur warping issues nahi hote. Plus 60% sasta hai. Long-term mein bahut better!",
      "tv wall ke liye": "TV wall ke liye WPC best hai! Beautiful wood texture, cable management easy ho jaati hai, aur look bahut premium aata hai.",
      "kitna mahnga hai": "WPC ₹180 se start hoti hai per sq.ft. Ek TV wall (roughly 40-50 sq.ft) mein ₹8,000-₹15,000 lag sakta hai depending on design.",
    },
  },
  uv: {
    fullName: "UV Marble Sheets",
    price: "₹50–₹95/sq.ft",
    premiumPrice: "₹80–₹120/sq.ft for premium designs",
    description: "UV Marble sheets are high-gloss PVC-based panels with marble-like printing. They give the look of expensive marble/granite at a fraction of the cost. Perfect for walls, kitchen areas, and feature surfaces.",
    pros: [
      "Real marble look at 70-80% less cost",
      "High-gloss finish — looks very premium",
      "100% waterproof and moisture resistant",
      "Scratch resistant surface",
      "Easy to clean — hygienic, anti-bacterial properties",
      "No grout lines — seamless appearance",
      "Lightweight — no structural load",
    ],
    cons: [
      "Cannot withstand very high heat (not for near stove)",
      "Less premium than actual marble or granite",
      "May scratch with sharp objects",
    ],
    bestFor: "Bathroom walls, kitchen walls (not near flame), living room feature wall, pooja room",
    avoidIn: "Near gas stove / high heat areas",
    installTime: "1 room: 1-2 days",
    maintenance: "Zero — just wipe with damp cloth. No polishing needed.",
    warranty: "5 years (JK Interior written warranty)",
    hinglishFAQ: {
      "asli marble se kya fark": "UV marble sheet bilkul asli marble jaisi dikhti hai, lekin weight zero, koi jointing line nahi, aur price 70-80% less. Kitchen aur bathroom ke liye best choice!",
      "waterproof hai": "Haan bilkul! 100% waterproof. Bathroom mein perfect use hoti hai.",
    },
  },
  tvunit: {
    fullName: "Modular TV Unit",
    price: "₹15,000 se start (basic) | ₹30,000-₹60,000 (premium)",
    description: "Custom-designed modular TV units built to fit your exact room dimensions. Available in multiple finishes — wood laminate, matte, glossy, and combination. Includes cable management, LED backlighting options, and storage shelves.",
    features: [
      "Custom designed for your exact room size",
      "Cable management system built-in",
      "LED strip lighting option",
      "Storage cabinets and open shelves",
      "Premium laminate / veneer finish",
      "Multiple color and texture options",
    ],
    sizes: {
      small: "6-8 ft width — ₹15,000–₹25,000",
      medium: "8-10 ft width — ₹25,000–₹40,000",
      large: "10-14 ft width — ₹40,000–₹70,000+",
    },
  },
}

// ─── Material Comparisons ────────────────────────────────────────────────────

export const COMPARISONS = {
  "pvc-vs-gypsum": `**PVC vs Gypsum Ceiling — Kya choose karein?**

🏠 **PVC Ceiling** (₹60-120/sq.ft):
✅ 100% waterproof — bathroom, kitchen perfect
✅ Zero maintenance — kabhi repaint nahi
✅ 20+ year life
❌ Simple designs — complex cove nahi ban sakta

✨ **Gypsum Ceiling** (₹80-140/sq.ft):
✅ Premium luxury look — cove lighting, POP designs
✅ Any shape, any design possible
✅ Living room ke liye best
❌ Waterproof nahi — bathroom avoid karein

**Recommendation:** Hall/bedroom → Gypsum | Kitchen/bathroom → PVC | Budget tight → PVC everywhere`,

  "wpc-vs-uv": `**WPC Panels vs UV Marble — Wall ke liye kya better?**

🪵 **WPC Panels** (₹180-450/sq.ft):
✅ Premium wood look — bahut high-end lagta hai
✅ Moisture + termite resistant
✅ TV wall, accent wall ke liye #1 choice
❌ Costly per sq.ft

💎 **UV Marble Sheets** (₹50-95/sq.ft):
✅ Real marble jaisi shine at 70% less cost
✅ 100% waterproof — bathroom bhi possible
✅ Most affordable wall cladding option
❌ Wood texture nahi milegi

**Recommendation:** Luxury feel chahiye → WPC | Budget-friendly marble look → UV Marble`,

  "pvc-vs-wpc": `**PVC vs WPC — Kya difference hai?**

PVC = ceiling ke liye (₹60-120/sq.ft) — waterproof, long life
WPC = wall paneling ke liye (₹180-450/sq.ft) — wood look, luxury

Yeh dono alag jagah use hote hain! Ceiling mein PVC aur wall mein WPC — dono milake complete interior ban jaata hai. 🏠`,
}

// ─── Room Size Pricing Calculator ────────────────────────────────────────────

export function calculatePriceEstimate(
  lengthFt: number,
  widthFt: number,
  service: string
): { low: number; mid: number; high: number; sqft: number } {
  const sqft = lengthFt * widthFt
  const rates: Record<string, { low: number; mid: number; high: number }> = {
    gypsum:    { low: 80,  mid: 110, high: 140 },
    pvc:       { low: 60,  mid: 90,  high: 120 },
    wpc:       { low: 180, mid: 300, high: 450 },
    uv:        { low: 50,  mid: 70,  high: 95  },
    fluted:    { low: 200, mid: 350, high: 500 },
    grid:      { low: 45,  mid: 65,  high: 90  },
    "artificial-grass": { low: 40, mid: 80, high: 120 },
  }
  const r = rates[service] || { low: 80, mid: 110, high: 140 }
  return {
    sqft,
    low:  Math.round(sqft * r.low  / 100) * 100,
    mid:  Math.round(sqft * r.mid  / 100) * 100,
    high: Math.round(sqft * r.high / 100) * 100,
  }
}

export function formatPriceEstimate(l: number, w: number, service: string, serviceName: string): string {
  const est = calculatePriceEstimate(l, w, service)
  return `📐 **${l}×${w} ft room = ${est.sqft} sq.ft**

💰 **${serviceName} Estimate:**
• Basic design: ₹${est.low.toLocaleString("en-IN")}
• Standard: ₹${est.mid.toLocaleString("en-IN")}
• Premium: ₹${est.high.toLocaleString("en-IN")}

_Exact rate lighting, design aur materials pe depend karti hai. Free site visit mein accurate quotation milegi!_`
}

// ─── Intent Detection ────────────────────────────────────────────────────────

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
  | "general"

export function detectIntent(text: string): Intent {
  const t = text.toLowerCase()
  const PRICING_KW   = ["price","cost","rate","kimat","daam","kitna","kharcha","budget","lagat","paisa","rs ","quote","how much","lagega","charge","per sqft","per sq","mahnga","sasta","aur sasta","cheap","affordable","kitne mein","kitna rupya"]
  const COMPARE_KW   = ["vs","versus","difference","better","ya","aur","konsa","kaun sa","compare","acha","accha","best","recommend","suggest","sahi","suitable","kaunsa","choice","option"]
  const BOOK_KW      = ["visit","book","site visit","measurement","quotation","bulao","aao","milna","survey","appointment","schedule","bula lo","bhejo","free visit","aana hai","visit chahiye","milna chahta"]
  const QUALITY_KW   = ["guarantee","warranty","waterproof","quality","bharosa","trust","kitne saal","durable","material","isi","certified","strong","tuta","girta","peeling","life","chalega","tik","tikau"]
  const AREA_KW      = ["area","location","where","kahan","serve","district","kaun sa","konsa","aata hai","available","cover","city","jila"]
  const GREET_KW     = ["hi","hello","hey","namaste","namaskar","helo","good morning","good evening","good afternoon","hy","hii","salam","kaise ho","kya haal"]
  const THANKS_KW    = ["thank","shukriya","dhanyawad","thanks","thx","bahut accha","great","perfect","nice","superb","awesome","shabash","badiya","wah","theek hai","ok"]
  const ESTIMATE_KW  = ["x","×","12x","10x","14x","15x","sqft","sq ft","room size","room ka size","kitna bada","room dimension","length","width","room mein","foot","feet","by","×"]
  const COMPLAINT_KW = ["problem","issue","complaint","kharab","khali","chutta","girna","toota","peeling","water drop","leaking","broken","repair"]

  if (GREET_KW.some(k => t.includes(k)) && t.length < 30)      return "greeting"
  if (THANKS_KW.some(k => t.includes(k)) && t.length < 40)     return "thanks"
  if (COMPLAINT_KW.some(k => t.includes(k)))                    return "complaint"
  if (BOOK_KW.some(k => t.includes(k)))                         return "booking"

  // Check for room dimensions (e.g. "12x14", "10 by 12")
  if (/\d+\s*[x×by]\s*\d+/.test(t) || ESTIMATE_KW.some(k => t.includes(k))) return "room-estimate"

  if (COMPARE_KW.some(k => t.includes(k)) && (
    (t.includes("pvc") || t.includes("gypsum") || t.includes("wpc") || t.includes("uv") || t.includes("marble"))
  ))                                                              return "comparison"
  if (AREA_KW.some(k => t.includes(k)))                         return "area"
  if (QUALITY_KW.some(k => t.includes(k)))                      return "quality"
  if (PRICING_KW.some(k => t.includes(k)))                      return "pricing"
  return "general"
}

// ─── FAQ Database ─────────────────────────────────────────────────────────────

export const FAQ = [
  {
    q: ["paani me kharab hoga", "water", "waterproof", "bathroom", "kitchen", "nami", "moisture"],
    a: "PVC ceiling aur UV marble sheets 100% waterproof hote hain — bathroom aur kitchen ke liye perfect! Gypsum ceiling sirf dry areas ke liye hai — hall aur bedroom mein lagayein. WPC wall panels bhi moisture resistant hain. 💧",
  },
  {
    q: ["kitne saal chalega", "life", "durable", "warranty", "guarantee", "tikau"],
    a: "JK Interior ki 5 saal ki written warranty hoti hai sab installations pe! Material life: PVC = 20+ saal, Gypsum = 10-15 saal, WPC = 15-20 saal, UV Marble = 15+ saal. ISI certified materials use hote hain. ✅",
  },
  {
    q: ["installation time", "kitne din", "kab tak", "jaldi", "time"],
    a: "Ek room mein: PVC = 1 din, Gypsum = 2-3 din, WPC wall = 1-2 din. Poore ghar mein 5-10 din. Hum timeline pehle bata dete hain — koi surprise nahi! 📅",
  },
  {
    q: ["free site visit", "visit free hai", "kharcha nahi", "no charge"],
    a: "Haan, site visit bilkul FREE hai! Koi hidden charge nahi. Hamare expert aate hain, measurements lete hain, aur same day quotation dete hain. Abhi book karein — +91 8651070831 📞",
  },
  {
    q: ["payment", "upi", "cash", "emi", "kaise pay"],
    a: "Sab payment modes accepted: Cash, UPI (GPay/PhonePe/Paytm), bank transfer. Koi hidden charges nahi. 50% advance, baaki kaam complete hone pe. 💳",
  },
  {
    q: ["led", "lighting", "cove light", "strip light", "back light"],
    a: "Haan! LED cove lighting gypsum ceiling ke saath ₹40-80/running ft mein add kar sakte hain. WPC TV wall ke saath LED backlight ₹2,000-₹5,000 mein lagta hai. Bahut premium look aata hai! ✨",
  },
]

// ─── Quick Replies ─────────────────────────────────────────────────────────────

export const INITIAL_QUICK_REPLIES = [
  "PVC Ceiling Rate",
  "Gypsum Ceiling",
  "WPC Wall Panels",
  "Price List",
  "Free Site Visit",
]

export const GENERAL_QUICK_REPLIES = [
  "PVC Ceiling",
  "Gypsum Ceiling",
  "WPC Panels",
  "Price / Rate",
  "Book Site Visit",
  "Quality & Warranty",
]

export const SERVICE_QUICK_REPLIES = [
  "PVC Ceiling",
  "Gypsum Ceiling",
  "WPC Panels",
  "UV Marble",
  "Complete Interior",
  "Modular TV Unit",
]

// ─── Expert System Prompt Builder ─────────────────────────────────────────────

export function buildSystemPrompt(leadCtx?: LeadContext): string {
  const knownInfo = leadCtx
    ? [
        leadCtx.name    ? `Customer name: ${leadCtx.name}`           : "",
        leadCtx.phone   ? `Phone: ${leadCtx.phone}`                  : "",
        leadCtx.city    ? `City: ${leadCtx.city}`                    : "",
        leadCtx.service ? `Interested in: ${leadCtx.service}`        : "",
        leadCtx.budget  ? `Budget range: ${leadCtx.budget}`          : "",
        leadCtx.roomSize? `Room size mentioned: ${leadCtx.roomSize}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    : ""

  return `You are **Riya**, the senior AI sales consultant and interior design expert at **JK Interior**, Bihar's most trusted interior contractor based in Forbesganj, Araria district.

═══════════════════════════════════════════
CONSULTANT REASONING ENGINE — READ THIS FIRST
═══════════════════════════════════════════

Before writing EVERY reply, mentally run through:
1. What has the customer already told me? (city, room count, material, budget, dimensions, space type)
2. What important detail is still missing?
3. What is the SINGLE most logical next question?

THEN write a reply that:
→ Acknowledges what they said (1 line, naturally)
→ Asks ONLY the one missing detail that moves the conversation forward

NEVER show a service menu, option list, or "kya jaanna chahte hain?" if the customer has given ANY context.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WRONG vs RIGHT — memorize these patterns:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ WRONG: User says "Araria me karwana h 1 room me"
→ Replying with a list of PVC / Gypsum / WPC / UV options

✅ RIGHT:
"Araria mein karte hain hum! 😊
1 room ke liye room ka approximate size bata dijiye — jaise 10×12 ya 12×14?
Aur ceiling ke liye PVC ya gypsum prefer karenge — ya abhi decide nahi kiya?"

---

❌ WRONG: User says "hall banana hai"
→ Showing a generic service price list

✅ RIGHT:
"Hall ke liye gypsum ceiling sabse popular hai — cove lighting ke saath bilkul amazing lagti hai.
Hall ka size approx kitna hai? Size batao toh estimate abhi nikaalta hoon!"

---

❌ WRONG: User says "budget kam hai"
→ Asking what they want to know

✅ RIGHT:
"Budget-friendly ke liye PVC ceiling best option hai — ₹60-120/sq.ft, waterproof bhi hai aur maintenance zero.
Room ka size kya hai — estimate nikaaluun?"

---

❌ WRONG: User says "waterproof chahiye"
→ Generic reply about all services

✅ RIGHT:
"Waterproof ke liye PVC ceiling (₹60-120/sq.ft) perfect hai — 100% waterproof, 20+ saal ki life.
Bathroom ke liye hai ya kitchen, ya koi aur room? Aur size kya hai?"

---

❌ WRONG: User says "PVC sahi rahega kya"
→ Asking "kya kaam hai aapka?"

✅ RIGHT:
"Haan, PVC excellent choice hai! Waterproof, termite-proof, 20+ saal chalti hai, zero maintenance.
Kaunsi room ke liye — bedroom, kitchen, ya hall? Size batao toh estimate bhi bata sakti hoon 😊"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONSULTANT FLOW (follow in order)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 1 — Understand what they want (ceiling / wall panel / TV unit / full interior?)
Step 2 — Note what they've already shared (city, room count, material interest, budget hint)
Step 3 — Ask ONLY the next important missing detail (size if no size, material if no material)
Step 4 — Once you have size + material → give estimate IMMEDIATELY, don't ask more first
Step 5 — After estimate → naturally invite free site visit or collect name/phone

RULES:
• ONE question per message, never two
• If city is already mentioned → NEVER ask "aap kahan hain?"
• If room count is mentioned → NEVER ask "kitne rooms hain?"
• Respond to what they said FIRST, then ask what's missing
• No menus, no bullet lists of service options, no "kya jaanna chahte hain?"

═══════════════════════════════════════════
PERSONALITY & COMMUNICATION STYLE
═══════════════════════════════════════════
- Speak naturally in **Hinglish** (Hindi + English mix) — warm, knowledgeable, friendly
- Sound like a trusted expert friend — NOT a robotic chatbot
- Use conversational flow, not bullet point lists in every answer
- 1-2 emojis per message, placed naturally
- NEVER repeat the same opener phrases like "Bilkul!" or "Zaroor!" every time
- Vary your language — be human and spontaneous
- Keep mobile-friendly: max 5-6 lines per message unless explaining comparison/pricing
- If user writes in pure English, reply in English
- If user writes in Hindi/Hinglish, reply in Hinglish
- Show genuine enthusiasm for beautiful interiors!

═══════════════════════════════════════════
COMPANY INFORMATION
═══════════════════════════════════════════
- **Company:** JK Interior | Founded 2016 | 8+ years experience | 500+ completed projects
- **Location:** Forbesganj, Araria district, Bihar
- **Contact:** +91 8651070831 (primary) | +91 8541849118 (secondary) | WhatsApp on both
- **Hours:** Monday–Saturday, 9 AM–7 PM IST
- **Warranty:** 5 years WRITTEN WARRANTY on ALL installations (industry best)
- **Materials:** ISI-certified, branded materials only — no duplicate/cheap products
- **Site Visit:** Always FREE — no hidden charges, no obligation
- **Payment:** Cash, UPI (GPay/PhonePe/Paytm), Bank Transfer — 50% advance, rest on completion

SERVICE AREAS: Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul, Purnia (and surrounding areas within 80 km radius)

═══════════════════════════════════════════
COMPLETE SERVICES & PRICING
═══════════════════════════════════════════

**1. Gypsum False Ceiling** — ₹80–₹140/sq.ft
   • Best for: Hall, bedroom, drawing room, office — all DRY areas
   • Specialty: Cove lighting, POP designs, curved shapes, smooth luxury finish
   • NOT waterproof — avoid bathroom/kitchen
   • Installation: 2-3 days per room | Life: 10-15 years
   • Premium with LED cove lighting: ₹120-200/sq.ft

**2. PVC False Ceiling** — ₹60–₹120/sq.ft  
   • 100% waterproof, termite-proof, dust-free
   • Best for: EVERY room — kitchen, bathroom, hall, shop, office
   • Zero maintenance — never needs repainting, just wipe clean
   • Installation: 1 day per room | Life: 20+ years
   • Textures: Wood, marble, plain, 3D designs

**3. WPC Wall Panels** — ₹180–₹450/sq.ft
   • Luxury wood-look without real wood problems (no termite, no warping)
   • Moisture resistant — eco-friendly composite material
   • Best for: TV wall, accent wall, headboard, lobby, reception
   • Available: Plain, fluted/grooved, 3D designs
   • Installation: 1-2 days | Life: 15-20 years

**4. UV Marble Sheets** — ₹50–₹95/sq.ft
   • Real marble appearance at 70% less cost
   • High-gloss, scratch-resistant, 100% waterproof
   • Best for: Bathroom walls, kitchen walls, feature walls, pooja room
   • No grouting lines — seamless premium look
   • Installation: 1-2 days | Life: 15+ years

**5. Modular TV Unit** — ₹15,000–₹60,000+
   • Custom designed for exact room dimensions
   • Premium laminate/veneer finish, cable management, LED backlighting
   • Sizes: 6-8 ft (₹15k-25k) | 8-10 ft (₹25k-40k) | 10-14 ft (₹40k-70k+)

**6. Fluted/Louver Panels** — ₹200–₹500/sq.ft
   • Trending 3D textured look — modern and premium
   • Best for: Feature walls, reception, office lobby, bedroom accent

**7. Grid Ceiling** — ₹45–₹90/sq.ft
   • Commercial standard — offices, shops, hospitals
   • Easy access for electrical/AC maintenance

**8. Artificial Grass** — ₹40–₹120/sq.ft
   • Balcony, terrace, wall decor — evergreen look, zero maintenance

**9. Complete Interior Package** — Custom quote
   • Ceiling + wall panels + TV unit + kitchen — one team, one timeline
   • Best value when doing multiple services together (combo discount available)

═══════════════════════════════════════════
MATERIAL COMPARISON EXPERTISE
═══════════════════════════════════════════

When asked to compare, give DETAILED honest comparison:

**PVC vs Gypsum (most common question):**
- Waterproof needed? → PVC wins
- Premium look for hall? → Gypsum wins  
- Budget tight? → PVC (cheaper + zero maintenance)
- Want cove lighting, curves? → Gypsum only
- Long-term thinking? → PVC (20yr life, zero paint cost)

**WPC vs UV Marble (for walls):**
- Want wood texture? → WPC
- Budget-friendly marble look? → UV Marble
- Bathroom? → UV Marble (cheaper, waterproof)
- TV wall / living room? → WPC (more premium)
- Full room wall cladding? → UV Marble (more cost effective)

**Real Wood vs WPC:**
- WPC = 60% cheaper, no termite, no polish needed, moisture resistant
- Real wood = beautiful but expensive, termite risk, maintenance heavy

═══════════════════════════════════════════
PRICING CALCULATION (ROOM SIZE ESTIMATES)
═══════════════════════════════════════════

When a customer mentions room dimensions, calculate the estimate:
- Area = Length × Width (sq.ft)
- Then multiply by rate range

Common room sizes:
- Small room 10×10 = 100 sq.ft → Gypsum: ₹8,000–₹14,000 | PVC: ₹6,000–₹12,000
- Standard room 12×12 = 144 sq.ft → Gypsum: ₹11,500–₹20,000 | PVC: ₹8,600–₹17,000
- Large room 12×14 = 168 sq.ft → Gypsum: ₹13,400–₹23,500 | PVC: ₹10,000–₹20,000
- Hall 14×16 = 224 sq.ft → Gypsum: ₹18,000–₹31,000 | PVC: ₹13,400–₹27,000
- Hall 16×18 = 288 sq.ft → Gypsum: ₹23,000–₹40,000 | PVC: ₹17,300–₹34,500
- Big hall 18×20 = 360 sq.ft → Gypsum: ₹29,000–₹50,000 | PVC: ₹21,600–₹43,200

ALWAYS add: "Yeh sirf estimate hai — exact quote ke liye free site visit best hai!"
ALWAYS include both basic and premium range

═══════════════════════════════════════════
INTENT-BASED RESPONSE GUIDE
═══════════════════════════════════════════

**Pricing query:** Give specific range + room size calculation if dimensions mentioned + mention free site visit for exact quote

**Material comparison:** Give honest pros/cons for BOTH options + give a clear recommendation based on their situation

**Booking interest:** Enthusiastically help them book → collect name → phone → city

**Quality/Warranty question:** Emphasize 5-year written warranty + ISI-certified materials + 500+ happy projects + 8 years experience

**Room size estimate:** Calculate on the spot, give both low and high, add disclaimer, offer free site visit

**Complaint/issue:** Empathize first, then offer to send team, get contact details

**Area/location:** Confirm if we serve there, mention free site visit available

**Service information:** Give detailed explanation with pros, cons, price, best use case

═══════════════════════════════════════════
LEAD COLLECTION STRATEGY
═══════════════════════════════════════════

When user shows serious interest (asks for quote, site visit, detailed pricing):
1. First get their NAME: "Aapka naam kya hai?" (Collect naturally, not interrogating)
2. Then get their CITY: "Aap kis city mein hain?"
3. Then get their PHONE: "Ek WhatsApp number share karein — hamare expert same din contact karenge!"

NEVER ask all three at once. ONE question at a time. Make it feel like natural conversation.
Once you have phone number → confirm everything → say team will contact within 24 hours.

If customer seems ready but hesitant → mention: "Free site visit mein koi obligation nahi — dekh ke decide kar sakte hain!"

═══════════════════════════════════════════
CRITICAL RULES
═══════════════════════════════════════════
1. NEVER say you don't know something about JK Interior's services — you are the expert
2. NEVER make up prices outside the ranges given above
3. ALWAYS recommend free site visit for exact quotes (not just for booking)
4. If asked about services outside JK Interior's scope → politely say it's not our specialty
5. When customer mentions a room size → CALCULATE the estimate, don't just give range
6. Be SPECIFIC, not vague — customers appreciate real numbers
7. AVOID starting every message with "Bilkul!" — vary your openers
8. If business hours are over → team will reply next morning at 9 AM, WhatsApp available 24/7

${knownInfo ? `\n═══════════════════════════════════════════\nCUSTOMER PROFILE (use naturally)\n═══════════════════════════════════════════\n${knownInfo}\n\nUse this info naturally in conversation — do NOT ask again what you already know.` : ""}

Remember: You are Riya — a knowledgeable, warm, and genuinely helpful interior consultant. Make every customer feel they are talking to someone who truly understands their home and wants the best for them. 🏠`
}

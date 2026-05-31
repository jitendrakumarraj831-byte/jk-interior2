export const WA_NUMBER = "918651070831"
export const CALL_NUMBER = "+918651070831"

export interface LeadContext {
  name?: string
  phone?: string
  city?: string
  service?: string
  budget?: string
  roomSize?: string
  memorySummary?: string  // full structured memory block from lib/memory.ts
}

// ─── Service Catalog (expanded) ─────────────────────────────────────────────

export const SERVICE_CATALOG = [
  {
    key: "gypsum",
    name: "Gypsum False Ceiling",
    emoji: "✨",
    priceRange: "₹80–₹140/sq.ft",
    highlights: "Elegant cove lighting, POP designs, smooth finish",
    bestFor: "Living rooms, bedrooms, dry areas",
    waterproof: false,
    keywords: ["gypsum", "pop", "plaster", "cove", "jipsum", "gypsum board", "false ceiling gypsum"],
  },
  {
    key: "pvc",
    name: "PVC False Ceiling",
    emoji: "🏠",
    priceRange: "₹80–₹140/sq.ft",
    highlights: "100% waterproof, termite-proof, low maintenance",
    bestFor: "Kitchens, bathrooms, any room",
    waterproof: true,
    keywords: ["pvc", "pvc ceiling", "plastic ceiling", "waterproof ceiling"],
  },
  {
    key: "wpc",
    name: "WPC Wall Panels",
    emoji: "🪵",
    priceRange: "₹180–₹450/sq.ft",
    highlights: "Eco-friendly wood-look, moisture resistant, luxury finish",
    bestFor: "Accent walls, TV panels, full room paneling",
    waterproof: true,
    keywords: ["wpc", "wall panel", "wood panel", "louver", "louver panel", "wood plastic composite"],
  },
  {
    key: "uv",
    name: "UV Marble Sheets",
    emoji: "💎",
    priceRange: "₹50–₹95/sq.ft",
    highlights: "High-gloss, scratch-resistant, hygienic surface",
    bestFor: "Walls, kitchen counters, feature areas",
    waterproof: true,
    keywords: ["uv", "marble", "marble sheet", "uv marble", "uv board", "glossy marble"],
  },
  {
    key: "tvunit",
    name: "Modular TV Unit",
    emoji: "📺",
    priceRange: "₹15,000–₹60,000+",
    highlights: "Custom designs, premium finish, cable management",
    bestFor: "Living rooms, bedrooms",
    waterproof: false,
    keywords: ["tv unit", "tv panel", "tv wall", "television", "tv cabinet", "entertainment unit"],
  },
  {
    key: "fluted",
    name: "Fluted / Louver Panels",
    emoji: "🏛️",
    priceRange: "₹200–₹500/sq.ft",
    highlights: "Modern textured look, 3D effect, trending design",
    bestFor: "Feature walls, reception areas, office lobbies",
    waterproof: false,
    keywords: ["fluted", "fluted panel", "ribbed", "3d panel", "grooved panel"],
  },
  {
    key: "grid",
    name: "Grid Ceiling",
    emoji: "🏢",
    priceRange: "₹45–₹90/sq.ft",
    highlights: "Commercial standard, easy maintenance, acoustic options",
    bestFor: "Offices, shops, hospitals, commercial spaces",
    waterproof: false,
    keywords: ["grid", "grid ceiling", "office ceiling", "mineral fiber", "t-grid", "false ceiling office"],
  },
  {
    key: "artificial-grass",
    name: "Artificial Grass",
    emoji: "🌿",
    priceRange: "₹40–₹120/sq.ft",
    highlights: "No maintenance, evergreen look, UV resistant",
    bestFor: "Balconies, terraces, wall decor, garden",
    waterproof: true,
    keywords: ["artificial grass", "grass", "turf", "green wall", "synthetic grass", "lawn"],
  },
  {
    key: "interior",
    name: "Complete Interior Design",
    emoji: "🏡",
    priceRange: "Custom quote",
    highlights: "Full home: ceiling + wall panels + TV unit + kitchen — one team, one timeline",
    bestFor: "New homes, full renovations",
    waterproof: false,
    keywords: ["complete interior", "full interior", "full home", "renovation", "poora ghar", "pura ghar", "bedroom interior", "office interior", "turnkey interior"],
  },
  // ─── New Service: Acoustic Panels ────────────────────────────────────────
  {
    key: "acoustic",
    name: "Acoustic Panels (Soundproof)",
    emoji: "🎧",
    priceRange: "₹150–₹400/sq.ft",
    highlights: "Reduces echo, improves sound quality, modern fabric finish",
    bestFor: "Home theatres, studios, conference rooms",
    waterproof: false,
    keywords: ["acoustic", "soundproof", "echo", "studio panel", "acoustic foam", "sound deadening"],
  },
  // ─── New Service: Wooden Laminate Flooring ───────────────────────────────
  {
    key: "flooring",
    name: "Wooden Laminate Flooring",
    emoji: "🪵",
    priceRange: "₹80–₹200/sq.ft",
    highlights: "Scratch resistant, easy to clean, real wood look",
    bestFor: "Bedrooms, living rooms, offices",
    waterproof: false,
    keywords: ["flooring", "laminate flooring", "wooden floor", "vinyl flooring", "floor", "flooring price"],
  },
]

// ─── Expanded Material Knowledge ───────────────────────────────────────────

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
    warranty: "1 year (JK Interior written warranty)",
    hinglishFAQ: {
      "paani me kharab hoga": "Haan, gypsum waterproof nahi hota. Bathroom/kitchen ke liye PVC better option hai. Hall aur bedroom ke liye gypsum perfect hai!",
      "kitna time lagega": "Ek room mein 2-3 din lagenge. Poore ghar mein 5-7 din.",
      "pop se kya difference": "Gypsum board panels hote hain, POP (Plaster of Paris) direct plaster hota hai. Gypsum zyada smooth, uniform, aur modern hota hai. JK Interior dono karta hai.",
    },
  },
  pvc: {
    fullName: "PVC False Ceiling",
    price: "₹80–₹140/sq.ft",
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
    warranty: "1 year (JK Interior written warranty)",
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
    warranty: "1 year (JK Interior written warranty)",
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
    warranty: "1 year (JK Interior written warranty)",
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
  // ─── Acoustic Panels Knowledge ───────────────────────────────────────────
  acoustic: {
    fullName: "Acoustic Panels",
    price: "₹150–₹400/sq.ft",
    description: "Special fabric-wrapped panels that absorb sound and reduce echo. Ideal for home theatres, recording studios, and noisy offices. Improves speech clarity and music quality.",
    pros: [
      "Reduces echo and background noise",
      "Improves sound quality for music and movies",
      "Modern fabric finishes",
      "Easy to install on walls or ceiling",
      "Fire-rated materials available",
    ],
    cons: ["Premium pricing", "Not waterproof"],
    bestFor: "Home theatre, studio, conference room, restaurant, office cabin",
    avoidIn: "Bathroom, kitchen, outdoor areas",
    installTime: "1-2 days per room",
    maintenance: "Vacuum or dry cloth wipe",
    warranty: "1 year",
  },
  // ─── Flooring Knowledge ──────────────────────────────────────────────────
  flooring: {
    fullName: "Wooden Laminate Flooring",
    price: "₹80–₹200/sq.ft",
    description: "High-density fibreboard with real wood texture lamination. Scratch resistant, easy to install, and gives a warm wooden feel at fraction of real wood cost.",
    pros: [
      "Looks like real wood",
      "Scratch and stain resistant",
      "Easy to clean",
      "Floating installation — no glue needed",
      "Wide variety of textures",
    ],
    cons: ["Not waterproof (spills should be wiped quickly)", "Can get noisy without underlayment"],
    bestFor: "Bedrooms, living rooms, offices, commercial spaces",
    avoidIn: "Bathrooms, kitchen (splash zones)",
    installTime: "1 room: 1 day | Full home: 3-5 days",
    maintenance: "Dry mop or vacuum, occasional damp cloth",
    warranty: "5-10 years depending on brand",
  },
}

// ─── Expanded Material Comparisons ─────────────────────────────────────────

export const COMPARISONS = {
  "pvc-vs-gypsum": `**PVC vs Gypsum Ceiling — Kya choose karein?**

🏠 **PVC Ceiling** (₹80-140/sq.ft):
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

PVC = ceiling ke liye (₹80-140/sq.ft) — waterproof, long life
WPC = wall paneling ke liye (₹180-450/sq.ft) — wood look, luxury

Yeh dono alag jagah use hote hain! Ceiling mein PVC aur wall mein WPC — dono milake complete interior ban jaata hai. 🏠`,

  // New comparisons
  "gypsum-vs-pvc-detailed": `**Gypsum ya PVC — Long term mein kaunsa better?**

✅ **Gypsum** — premium look, cove lighting, resale value badhata hai. Par 7-8 saal baad repaint chahiye aur bathroom mein nahi laga sakte.

✅ **PVC** — sasta, zero maintenance, 20+ saal chalega, har jagah lagao. Par utna premium nahi lagta.

💡 **Hamari advice:** Hall+bedroom = Gypsum, baaki jagah PVC. Best of both worlds!`,

  "wpc-vs-realwood": `**WPC vs Real Wood — Paisa vasool kaunsa?**

🌳 **Real Wood** — bahut sundar but ₹600-1500/sq.ft, termite risk, har 2 saal mein polish chahiye.

🪵 **WPC** — 60% sasta, zero maintenance, termite-proof, moisture resistant. Dekhne mein 90% real jaisa.

💡 **Hamari advice:** Real wood sirf luxury budget ho tab. WPC best value for money hai.`,

  "acoustic-regular-panels": `**Acoustic Panels vs Regular Wall Panels — Kya fark?**

🎧 **Acoustic Panels** — sound absorb karte hain, echo kam karte hain. Theatre/studio ke liye best.

🪵 **Regular Panels (WPC/UV)** — sirf dekhne mein achhe, sound nahi rok sakte.

💡 **Recommendation:** Home theatre ya office conference room → Acoustic. Baaki sab jagah regular panels theek hain.`,
}

// ─── Waterproof Solutions Data (new export) ────────────────────────────────

export const WATERPROOF_SOLUTIONS = {
  pvcCeiling: {
    name: "PVC False Ceiling",
    price: "₹80-140/sq.ft",
    waterproofLevel: "100%",
    bestRooms: ["Kitchen", "Bathroom", "Balcony", "Shop", "Restroom"],
    features: ["Termite-proof", "Zero maintenance", "No repaint needed", "20+ year life"],
  },
  uvMarble: {
    name: "UV Marble Sheets",
    price: "₹50-95/sq.ft",
    waterproofLevel: "100%",
    bestRooms: ["Bathroom walls", "Kitchen walls", "Pooja room", "Feature wall"],
    features: ["High-gloss", "Scratch resistant", "Seamless look", "Easy to clean"],
  },
  wpcPanels: {
    name: "WPC Wall Panels",
    price: "₹180-450/sq.ft",
    waterproofLevel: "Moisture resistant (not fully submersible)",
    bestRooms: ["Living room", "Bedroom", "Office", "Reception"],
    features: ["Wood look", "Termite-proof", "No polish needed", "Eco-friendly"],
  },
  artificialGrass: {
    name: "Artificial Grass",
    price: "₹40-120/sq.ft",
    waterproofLevel: "100% (drains through)",
    bestRooms: ["Balcony", "Terrace", "Garden", "Wall decor"],
    features: ["UV resistant", "No watering", "Evergreen", "Pet-friendly"],
  },
}

// ─── Room-Specific Suggestions (new export) ────────────────────────────────

export const ROOM_SUGGESTIONS: Record<string, { ceiling: string; walls: string; flooring?: string; tvUnit?: string; notes: string }> = {
  bedroom: {
    ceiling: "Gypsum with cove lighting (₹80-140/sq.ft) — gives cozy, premium feel",
    walls: "WPC panels on headboard wall (₹180-450/sq.ft) for luxury accent",
    tvUnit: "Custom modular TV unit (₹15k-40k) if TV present",
    notes: "Avoid PVC in main bedroom if budget allows — gypsum looks much better.",
  },
  hall: {
    ceiling: "Gypsum with POP design & LED strip (₹120-200/sq.ft) — showpiece of your home",
    walls: "WPC fluted panels on TV wall (₹200-500/sq.ft)",
    tvUnit: "Premium TV unit with lighting (₹25k-60k)",
    notes: "Hall is the first impression — invest in good design and lighting.",
  },
  kitchen: {
    ceiling: "PVC false ceiling (₹80-140/sq.ft) — 100% waterproof, easy to clean",
    walls: "UV marble sheets near cooking area (₹50-95/sq.ft)",
    notes: "Avoid gypsum in kitchen — steam will damage it.",
  },
  bathroom: {
    ceiling: "PVC false ceiling (₹80-140/sq.ft) — must be waterproof",
    walls: "UV marble sheets on all walls (₹50-95/sq.ft) — no grout, no mould",
    notes: "Full PVC ceiling + UV marble walls = completely waterproof bathroom.",
  },
  balcony: {
    ceiling: "PVC ceiling (₹80-140/sq.ft) or leave open",
    walls: "Artificial grass on one wall (₹40-120/sq.ft) for green look",
    notes: "PVC ceiling protects from rain. Artificial grass gives garden feel.",
  },
  office: {
    ceiling: "Grid ceiling (₹45-90/sq.ft) for easy AC/electrical access, or gypsum for premium",
    walls: "WPC or UV marble — depends on budget",
    notes: "Grid ceiling is practical for offices. Gypsum looks more premium but harder to service.",
  },
  pooja: {
    ceiling: "PVC or gypsum? PVC is waterproof and cheaper, gypsum looks more traditional",
    walls: "UV marble sheets with marble print — looks like real stone",
    notes: "Add LED strip behind idol for divine look ✨",
  },
}

// ─── Smart Recommendation Engine (new export) ───────────────────────────────

export interface SmartRecommendationParams {
  roomType?: string
  budget?: "low" | "medium" | "high"
  waterproofRequired?: boolean
  hasTV?: boolean
  roomSizeSqft?: number
}

export function getSmartRecommendation(params: SmartRecommendationParams): string {
  const { roomType, budget = "medium", waterproofRequired = false, hasTV = false, roomSizeSqft } = params

  if (roomType) {
    const suggestion = ROOM_SUGGESTIONS[roomType.toLowerCase()]
    if (suggestion) {
      let rec = `🎯 **Best for ${roomType}:**\n\n`
      rec += `🔹 Ceiling: ${suggestion.ceiling}\n`
      rec += `🔹 Walls: ${suggestion.walls}\n`
      if (suggestion.tvUnit && hasTV) rec += `🔹 TV Unit: ${suggestion.tvUnit}\n`
      rec += `\n📝 ${suggestion.notes}`
      if (roomSizeSqft) {
        const est = roomSizeSqft * 80 // rough for gypsum
        rec += `\n\n💰 Rough estimate for ${roomSizeSqft} sq.ft: ₹${(est / 1000).toFixed(0)}k – ₹${(est * 1.5 / 1000).toFixed(0)}k`
      }
      return rec
    }
  }

  if (waterproofRequired) {
    return "💧 **Waterproof solution needed?**\n\n✅ PVC ceiling (₹80-140/sq.ft) — 100% waterproof, zero maintenance\n✅ UV Marble sheets on walls (₹50-95/sq.ft) — glossy & waterproof\n✅ Artificial grass for balcony (₹40-120/sq.ft)\n\nPerfect for bathrooms, kitchens, and balconies!"
  }

  if (budget === "low") {
    return "💰 **Budget-friendly interior options:**\n\n• PVC ceiling everywhere: ₹80-140/sq.ft\n• UV marble sheets on walls: ₹50-95/sq.ft\n• No TV unit — use existing furniture\n\nApprox 2BHK full home: ₹40k-80k only! (estimate)"
  } else if (budget === "high") {
    return "✨ **Premium interior recommendations:**\n\n• Gypsum ceiling with cove lighting in hall & bedrooms\n• WPC fluted panels on accent walls\n• Custom modular TV unit with backlight\n• Wooden laminate flooring\n\nExpect 2BHK full premium interior: ₹2.5L – ₹4L. Worth every rupee! 🏠"
  }

  return "Need help deciding? Tell me your room type (bedroom, hall, kitchen), budget (low/medium/high), and if you need waterproofing. I'll suggest the best options! 😊"
}

// ─── Expand Price Calculator with More Services ───────────────────────────

export function calculatePriceEstimate(
  lengthFt: number,
  widthFt: number,
  service: string
): { low: number; mid: number; high: number; sqft: number } {
  const sqft = lengthFt * widthFt
  const rates: Record<string, { low: number; mid: number; high: number }> = {
    gypsum:    { low: 80,  mid: 110, high: 140 },
    pvc:       { low: 80,  mid: 110, high: 140 },
    wpc:       { low: 180, mid: 300, high: 450 },
    uv:        { low: 50,  mid: 70,  high: 95  },
    fluted:    { low: 200, mid: 350, high: 500 },
    grid:      { low: 45,  mid: 65,  high: 90  },
    "artificial-grass": { low: 40, mid: 80, high: 120 },
    acoustic:  { low: 150, mid: 250, high: 400 },
    flooring:  { low: 80,  mid: 130, high: 200 },
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

// ─── Multi-Room Parser & Estimator (unchanged functions, but improved keyword coverage) ─────────

export interface RoomDef {
  label: string
  sqft: number
  material: "gypsum" | "pvc" | "grid"
  isWet: boolean
}

const ROOM_DEFAULTS: Record<string, RoomDef> = {
  bedroom:   { label: "Bedroom",    sqft: 120, material: "gypsum", isWet: false },
  hall:      { label: "Hall",       sqft: 180, material: "gypsum", isWet: false },
  kitchen:   { label: "Kitchen",    sqft: 80,  material: "pvc",    isWet: true  },
  bathroom:  { label: "Bathroom",   sqft: 50,  material: "pvc",    isWet: true  },
  office:    { label: "Office",     sqft: 150, material: "grid",   isWet: false },
  reception: { label: "Reception",  sqft: 200, material: "gypsum", isWet: false },
  balcony:   { label: "Balcony",    sqft: 60,  material: "pvc",    isWet: true  },
  lobby:     { label: "Lobby",      sqft: 120, material: "gypsum", isWet: false },
  dining:    { label: "Dining",     sqft: 100, material: "gypsum", isWet: false },
  pooja:     { label: "Pooja Room", sqft: 40,  material: "pvc",    isWet: false },
  storeroom: { label: "Store Room", sqft: 50,  material: "pvc",    isWet: false },
  // added missing types from ROOM_SUGGESTIONS
  "pooja-room": { label: "Pooja Room", sqft: 40, material: "pvc", isWet: false },
  "tv-wall":   { label: "TV Wall", sqft: 40, material: "pvc", isWet: false },
}

const PRESET_HOMES: Record<string, Record<string, number>> = {
  "1bhk":     { bedroom: 1, hall: 1, kitchen: 1, bathroom: 1 },
  "2bhk":     { bedroom: 2, hall: 1, kitchen: 1, bathroom: 2 },
  "3bhk":     { bedroom: 3, hall: 1, kitchen: 1, bathroom: 3 },
  "flat":     { bedroom: 2, hall: 1, kitchen: 1, bathroom: 1 },
  "duplex":   { bedroom: 3, hall: 2, kitchen: 1, bathroom: 3 },
  "bungalow": { bedroom: 4, hall: 2, kitchen: 1, bathroom: 4 },
  "pooraghar":{ bedroom: 2, hall: 1, kitchen: 1, bathroom: 2 },
  "shop":     { reception: 1, office: 1 },
  "office2":  { office: 2, reception: 1 },
}

function hindiToNum(s: string): number {
  const MAP: Record<string, number> = {
    ek: 1, "1": 1, do: 2, "2": 2, teen: 3, tin: 3, "3": 3,
    char: 4, chaar: 4, "4": 4, paanch: 5, panch: 5, "5": 5,
    chhah: 6, "6": 6, saat: 7, "7": 7, aath: 8, "8": 8,
  }
  return MAP[s.trim()] ?? parseInt(s.trim()) ?? 1
}

export function parseMultiRoomQuery(text: string): Record<string, number> | null {
  const t = text.toLowerCase()
    .replace(/[+,&]/g, " aur ")
    .replace(/\band\b/g, " aur ")
    .replace(/\bwith\b/g, " aur ")

  // ── Preset home types (expanded)
  if (/\bpoora\s*ghar\b|\bpura\s*ghar\b|\bfull\s*home\b|\bpure\s*ghar\b|\bpura\s*makan\b/.test(t)) return PRESET_HOMES["pooraghar"]
  if (/\bduplex\b/.test(t)) return PRESET_HOMES["duplex"]
  if (/\b3\s*bhk\b|\bteen\s*bhk\b/.test(t)) return PRESET_HOMES["3bhk"]
  if (/\b2\s*bhk\b|\bdo\s*bhk\b/.test(t)) return PRESET_HOMES["2bhk"]
  if (/\b1\s*bhk\b|\bek\s*bhk\b/.test(t)) return PRESET_HOMES["1bhk"]
  if (/\bflat\s*interior\b|\bapartment\b|\bflat\b(?!\s*panel)/.test(t)) return PRESET_HOMES["flat"]
  if (/\bbungalow\b|\bkothi\b/.test(t)) return PRESET_HOMES["bungalow"]
  if (/\boffice\s*(?:interior|reception)\b/.test(t)) return PRESET_HOMES["office2"]
  if (/\bshop\s*interior\b/.test(t)) return PRESET_HOMES["shop"]

  // ── Pattern-based room parsing (unchanged but with more Hinglish)
  const rooms: Record<string, number> = {}
  const add = (type: string, n: number) => { rooms[type] = (rooms[type] || 0) + n }

  const NUM = "(?:ek|do|teen|tin|char|chaar|paanch|panch|\\d+)"

  const PATTERNS: Array<[RegExp, string]> = [
    [new RegExp(`(${NUM})\\s*(?:bed\\s*room|bedroom|bed|kamra|room(?!\\s*size|\\s*mein|\\s*me\\b))`, "gi"), "bedroom"],
    [new RegExp(`(${NUM})\\s*(?:hall|drawing\\s*room|living\\s*room|baithak|darbar|lounge|drawing room)`, "gi"), "hall"],
    [new RegExp(`(${NUM})\\s*(?:kitchen|rasoi|rasoighar)`, "gi"), "kitchen"],
    [new RegExp(`(${NUM})\\s*(?:bathroom|toilet|washroom|latrine|snan)`, "gi"), "bathroom"],
    [new RegExp(`(${NUM})\\s*(?:office|cabin)`, "gi"), "office"],
    [new RegExp(`(${NUM})\\s*(?:reception)`, "gi"), "reception"],
    [new RegExp(`(${NUM})\\s*(?:balcony|balkoni)`, "gi"), "balcony"],
    [new RegExp(`(${NUM})\\s*(?:pooja\\s*room|mandir|puja|pooja|mandir room)`, "gi"), "pooja"],
    [new RegExp(`(${NUM})\\s*(?:dining|khane\\s*ka\\s*kamra|dining room)`, "gi"), "dining"],
    [new RegExp(`(${NUM})\\s*(?:store\\s*room|store|godown)`, "gi"), "storeroom"],
    [new RegExp(`(${NUM})\\s*(?:lobby|lobby area|entrance)`, "gi"), "lobby"],
  ]

  for (const [pat, type] of PATTERNS) {
    pat.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = pat.exec(t)) !== null) add(type, hindiToNum(m[1]))
  }

  // ── Bare mentions (no number → assume 1)
  const BARE: Array<[RegExp, string]> = [
    [/\bhall\b|\bdrawing\s*room\b|\bliving\s*room\b|\bbaithak\b/g, "hall"],
    [/\bkitchen\b|\brasoi\b/g, "kitchen"],
    [/\bbathroom\b|\btoilet\b|\bwashroom\b/g, "bathroom"],
    [/\bbedroom\b|\bbed\s*room\b|\bsone ka kamra\b/g, "bedroom"],
    [/\bbalcony\b/g, "balcony"],
    [/\breception\b/g, "reception"],
    [/\bpooja\s*room\b|\bmandir\b|\bpuja\b/g, "pooja"],
    [/\bdining\b/g, "dining"],
    [/\boffice\b/g, "office"],
    [/\blobby\b/g, "lobby"],
  ]
  for (const [pat, type] of BARE) {
    pat.lastIndex = 0
    if (pat.test(t) && !rooms[type]) add(type, 1)
  }

  if (Object.keys(rooms).length === 0) return null

  const total = Object.values(rooms).reduce((a, b) => a + b, 0)
  if (total < 2) return null

  return rooms
}

export function generateMultiRoomEstimate(rooms: Record<string, number>): string {
  const RATES = {
    gypsum:  { low: 80,  high: 140, premLow: 120, premHigh: 200 },
    pvc:     { low: 80,  high: 140, premLow: 80,  premHigh: 140 },
    grid:    { low: 45,  high: 90,  premLow: 65,  premHigh: 90  },
  }

  const fmtN = (n: number) => "₹" + (Math.round(n / 500) * 500).toLocaleString("en-IN")

  let totalSqft = 0
  let budgetLow = 0, budgetHigh = 0
  let stdLow = 0,    stdHigh = 0
  let premLow = 0,   premHigh = 0
  const dryRooms: string[] = []
  const wetRooms: string[] = []
  const lines: string[] = []

  for (const [type, count] of Object.entries(rooms)) {
    const def = ROOM_DEFAULTS[type] ?? { label: type, sqft: 100, material: "gypsum" as const, isWet: false }
    const sqft = def.sqft * count
    totalSqft += sqft
    const label = count > 1 ? `${count} ${def.label}` : def.label
    lines.push(`• ${label} — ${sqft} sq.ft`)

    budgetLow  += sqft * RATES.pvc.low
    budgetHigh += sqft * RATES.pvc.high

    const mat = def.isWet ? "pvc" : (def.material === "grid" ? "grid" : "gypsum")
    stdLow  += sqft * RATES[mat].low
    stdHigh += sqft * RATES[mat].high
    premLow  += sqft * RATES[mat].premLow
    premHigh += sqft * RATES[mat].premHigh

    if (def.isWet) wetRooms.push(def.label)
    else dryRooms.push(def.label)
  }

  let recLine = ""
  if (dryRooms.length > 0 && wetRooms.length > 0) {
    recLine = `• ${dryRooms.join(" + ")} → Gypsum ceiling ✨\n• ${wetRooms.join(" + ")} → PVC waterproof ceiling 💧`
  } else if (dryRooms.length > 0) {
    recLine = `Gypsum ceiling — cove lighting ke saath stunning lagega! ✨`
  } else {
    recLine = `PVC ceiling — 100% waterproof, zero maintenance! 💧`
  }

  const hasOffice = !!rooms["office"] || !!rooms["reception"]

  return `📐 **Approximate estimate — ${totalSqft} sq.ft total**

**Room breakdown** (standard sizes):
${lines.join("\n")}

🎯 **Recommended plan:**
${recLine}

💰 **3 options:**
• Budget (PVC everywhere): ${fmtN(budgetLow)} – ${fmtN(budgetHigh)}
• Standard (Gypsum+PVC mix): ${fmtN(stdLow)} – ${fmtN(stdHigh)}
• Premium (+ LED cove light): ${fmtN(premLow)} – ${fmtN(premHigh)}
${hasOffice ? "\n🏢 Office ke liye Grid ceiling (₹45–90/sq.ft) bhi available hai!" : "\n✨ TV wall ke liye WPC panel add karein — ₹8,000–₹15,000 extra!"}

_Yeh standard size pe base estimate hai — exact quote ke liye free site visit best hai!_`
}

// ─── Intent Detection (improved with more Hinglish keywords) ────────────────

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
  const PRICING_KW   = ["price","cost","rate","kimat","daam","kitna","kharcha","budget","lagat","paisa","rs ","quote","how much","lagega","charge","per sqft","per sq","mahnga","sasta","aur sasta","cheap","affordable","kitne mein","kitna rupya","rate kya hai","kya rate hai"]
  const COMPARE_KW   = ["vs","versus","difference","better","ya","aur","konsa","kaun sa","compare","acha","accha","best","recommend","suggest","sahi","suitable","kaunsa","choice","option","mein kya better hai"]
  const BOOK_KW      = ["visit","book","site visit","measurement","quotation","bulao","aao","milna","survey","appointment","schedule","bula lo","bhejo","free visit","aana hai","visit chahiye","milna chahta","site pe aao","measurement lene aao"]
  const QUALITY_KW   = ["guarantee","warranty","waterproof","quality","bharosa","trust","kitne saal","durable","material","isi","certified","strong","tuta","girta","peeling","life","chalega","tik","tikau","acchi quality","kaisa material"]
  const AREA_KW      = ["area","location","where","kahan","serve","district","kaun sa","konsa","aata hai","available","cover","city","jila","service area","kis city mein"]
  const GREET_KW     = ["hi","hello","hey","namaste","namaskar","helo","good morning","good evening","good afternoon","hy","hii","salam","kaise ho","kya haal","kya chal raha hai"]
  const THANKS_KW    = ["thank","shukriya","dhanyawad","thanks","thx","bahut accha","great","perfect","nice","superb","awesome","shabash","badiya","wah","theek hai","ok","okay"]
  const ESTIMATE_KW  = ["x","×","12x","10x","14x","15x","sqft","sq ft","room size","room ka size","kitna bada","room dimension","length","width","room mein","foot","feet","by","×","ka size","measurement","dimensions"]
  const COMPLAINT_KW = ["problem","issue","complaint","kharab","khali","chutta","girna","toota","peeling","water drop","leaking","broken","repair","shikayat","galat","sahi nahi"]

  if (GREET_KW.some(k => t.includes(k)) && t.length < 35)      return "greeting"
  if (THANKS_KW.some(k => t.includes(k)) && t.length < 45)     return "thanks"
  if (COMPLAINT_KW.some(k => t.includes(k)))                    return "complaint"
  if (BOOK_KW.some(k => t.includes(k)))                         return "booking"
  if (/\d+\s*[x×by]\s*\d+/.test(t) || ESTIMATE_KW.some(k => t.includes(k))) return "room-estimate"
  if (COMPARE_KW.some(k => t.includes(k)) && (
    (t.includes("pvc") || t.includes("gypsum") || t.includes("wpc") || t.includes("uv") || t.includes("marble") || t.includes("acoustic") || t.includes("flooring"))
  )) return "comparison"
  if (AREA_KW.some(k => t.includes(k)))                         return "area"
  if (QUALITY_KW.some(k => t.includes(k)))                      return "quality"
  if (PRICING_KW.some(k => t.includes(k)))                      return "pricing"
  return "general"
}

// ─── Expanded FAQ Database ─────────────────────────────────────────────────

export const FAQ = [
  {
    q: ["paani me kharab hoga", "water", "waterproof", "bathroom", "kitchen", "nami", "moisture", "barish", "damp"],
    a: "PVC ceiling aur UV marble sheets 100% waterproof hote hain — bathroom aur kitchen ke liye perfect! Gypsum ceiling sirf dry areas ke liye hai — hall aur bedroom mein lagayein. WPC wall panels bhi moisture resistant hain. 💧",
  },
  {
    q: ["kitne saal chalega", "life", "durable", "warranty", "guarantee", "tikau", "long lasting"],
    a: "JK Interior ki 1 saal ki written warranty hoti hai sab installations pe! Material life: PVC = 20+ saal, Gypsum = 10-15 saal, WPC = 15-20 saal, UV Marble = 15+ saal, Laminate flooring = 5-10 saal. ISI certified materials use hote hain. ✅",
  },
  {
    q: ["installation time", "kitne din", "kab tak", "jaldi", "time", "kitna samay"],
    a: "Ek room mein: PVC = 1 din, Gypsum = 2-3 din, WPC wall = 1-2 din, Flooring = 1 din, Acoustic panels = 1-2 din. Poore ghar mein 5-10 din. Hum timeline pehle bata dete hain — koi surprise nahi! 📅",
  },
  {
    q: ["free site visit", "visit free hai", "kharcha nahi", "no charge", "free aana"],
    a: "Haan, site visit bilkul FREE hai! Koi hidden charge nahi. Hamare expert aate hain, measurements lete hain, aur same day quotation dete hain. Abhi book karein — +91 8651070831 📞",
  },
  {
    q: ["payment", "upi", "cash", "emi", "kaise pay", "payment options"],
    a: "Sab payment modes accepted: Cash, UPI (GPay/PhonePe/Paytm), bank transfer. Koi hidden charges nahi. 50% advance, baaki kaam complete hone pe. EMI bhi available hai (T&C apply). 💳",
  },
  {
    q: ["led", "lighting", "cove light", "strip light", "back light", "led strip"],
    a: "Haan! LED cove lighting gypsum ceiling ke saath ₹40-80/running ft mein add kar sakte hain. WPC TV wall ke saath LED backlight ₹2,000-₹5,000 mein lagta hai. Bahut premium look aata hai! ✨",
  },
  {
    q: ["design", "custom design", "apna design", "unique", "special shape"],
    a: "Bilkul! Hum custom designs banate hain. Chahe gypsum mein koi bhi shape, ya WPC mein particular texture — aapki marzi. Free site visit par design options dikha denge. 🎨",
  },
  {
    q: ["flooring", "floor", "laminate", "wooden floor", "floor ka rate"],
    a: "Wooden laminate flooring ₹80-200/sq.ft mein milta hai. Bedroom aur living room ke liye bahut achha option hai. Real wood jaisa look, scratch resistant, easy to clean. Free site visit mein sample dikha sakte hain! 🪵",
  },
  {
    q: ["soundproof", "acoustic", "echo", "noise", "sound", "theatre"],
    a: "Acoustic panels ₹150-400/sq.ft — home theatre, studio, ya conference room ke liye best. Echo kam karte hain, sound quality improve hoti hai. Free consultation ke liye contact karein! 🎧",
  },
  {
    q: ["color options", "colour", "shade", "texture", "finish"],
    a: "Har service mein multiple options: Gypsum — any paint color; PVC — wood, marble, plain, 3D; WPC — 50+ wood textures and solid colors; UV Marble — marble, granite, stone prints. Sample book hai — aap dekh ke choose kar sakte hain! 🎨",
  },
  {
    q: ["service area", "aap kahan karte ho", "kis city mein", "forbesganj", "araria", "purnia", "supaul"],
    a: "Hum Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul, Purnia aur aas-paas 80 km radius mein service dete hain. Aapki city? 😊",
  },
  {
    q: ["discount", "offer", "sasta", "combo", "package", "deals"],
    a: "Haan! Complete interior package (ceiling + walls + TV unit + flooring) par combo discount milta hai. Free site visit mein detailed quote with discount dedenge. Offer limited time — jaldi contact karein! 🎉",
  },
]

// ─── Smarter Quick Replies ─────────────────────────────────────────────────

export const INITIAL_QUICK_REPLIES = [
  "PVC Ceiling Rate",
  "Gypsum Ceiling",
  "WPC Wall Panels",
  "Price List",
  "Free Site Visit",
  "Waterproof Solutions",
  "Complete Interior",
]

export const GENERAL_QUICK_REPLIES = [
  "PVC Ceiling",
  "Gypsum Ceiling",
  "WPC Panels",
  "Price / Rate",
  "Book Site Visit",
  "Quality & Warranty",
  "Waterproof Solutions",
  "Compare PVC vs Gypsum",
]

export const SERVICE_QUICK_REPLIES = [
  "PVC Ceiling",
  "Gypsum Ceiling",
  "WPC Panels",
  "UV Marble",
  "Complete Interior",
  "Modular TV Unit",
  "Acoustic Panels",
  "Laminate Flooring",
]

// ─── Optimized System Prompt Builder (for Gemini AI) ───────────────────────

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

--- CONSULTANT REASONING ENGINE ---
Before every reply, check: what has the customer already shared? What single detail is still missing?
Reply: acknowledge (1 line) → ask ONLY that one missing detail.
NEVER show a service menu or "kya jaanna chahte hain?" if the customer has given ANY context.

--- WRONG vs RIGHT ---
❌ User: "hall banana hai" → listing generic prices
✅ RIGHT: "Hall ke liye gypsum ceiling best hai — cove lighting ke saath amazing lagti hai. Size bataiye, estimate nikaalta hoon!"

❌ User: "budget kam hai" → asking what they want
✅ RIGHT: "Budget-friendly ke liye PVC ceiling best — ₹80-140/sqft, waterproof, zero maintenance. Room ka size?"

❌ User: "PVC sahi rahega kya" → "kya kaam hai aapka?"
✅ RIGHT: "Haan! Waterproof, termite-proof, 20+ saal ki life. Kaunsi room — bedroom, kitchen, ya hall? Size batao toh estimate bhi!"

--- CONSULTANT FLOW ---
1. Understand need (ceiling/wall/TV unit/flooring/acoustic)
2. Note what's already shared (city, rooms, material, budget)
3. Ask ONLY the next missing detail
4. Got size + material → give estimate IMMEDIATELY
5. After estimate → invite free site visit or collect name/phone
RULES: ONE question per message. Never re-ask city/room count already mentioned.

--- PERSONALITY ---
Speak naturally in Hinglish (Hindi + English mix). Warm, knowledgeable, trusted expert friend tone.
1-2 emojis per message. Vary openers — never start with "Bilkul!" or "Zaroor!" every time.
Max 5-6 lines per message (mobile-friendly). Match user's language (Hindi/English/Hinglish).

--- COMPANY INFORMATION ---
- **Company:** JK Interior | Founded 2016 | 8+ years experience | 500+ completed projects
- **Location:** Forbesganj, Araria district, Bihar
- **Contact:** +91 8651070831 (primary) | +91 8541849118 (secondary) | WhatsApp on both
- **Hours:** Monday–Saturday, 9 AM–7 PM IST
- **Warranty:** 1 year WRITTEN WARRANTY on ALL installations
- **Materials:** ISI-certified, branded materials only — no duplicate/cheap products
- **Site Visit:** Always FREE — no hidden charges, no obligation
- **Payment:** Cash, UPI (GPay/PhonePe/Paytm), Bank Transfer, EMI available — 50% advance, rest on completion

SERVICE AREAS: Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul, Purnia (and surrounding areas within 80 km radius)

--- SERVICES & PRICING ---

**1. Gypsum False Ceiling** — ₹80–₹140/sq.ft
   • Best for: Hall, bedroom, drawing room, office — all DRY areas
   • Premium with LED cove lighting: ₹120-200/sq.ft

**2. PVC False Ceiling** — ₹80–₹140/sq.ft  
   • 100% waterproof, termite-proof — kitchen, bathroom, balcony

**3. WPC Wall Panels** — ₹180–₹450/sq.ft
   • Luxury wood look — TV wall, accent wall

**4. UV Marble Sheets** — ₹50–₹95/sq.ft
   • Real marble look at 70% less cost — bathroom walls, kitchen walls

**5. Modular TV Unit** — ₹15,000–₹60,000+
   • Custom designed, cable management, LED backlight option

**6. Fluted/Louver Panels** — ₹200–₹500/sq.ft
   • Modern 3D textured look

**7. Grid Ceiling** — ₹45–₹90/sq.ft
   • Commercial spaces, offices, shops

**8. Artificial Grass** — ₹40–₹120/sq.ft
   • Balcony, terrace, wall decor

**9. Acoustic Panels** — ₹150–₹400/sq.ft (NEW)
   • Soundproofing, echo reduction — home theatre, studio

**10. Wooden Laminate Flooring** — ₹80–₹200/sq.ft (NEW)
    • Scratch resistant, easy to clean — bedrooms, living rooms

**11. Complete Interior Package** — Custom quote
    • Ceiling + walls + TV unit + flooring — combo discount

--- PRICING CALCULATION (calculate immediately when room size given) ---

When a customer mentions room dimensions, calculate immediately:
Area = Length × Width (sq.ft) → multiply by rate

Common sizes:
- 10×10 (100 sqft): Gypsum ₹8k-14k | PVC ₹6k-12k | Flooring ₹8k-20k
- 12×12 (144 sqft): Gypsum ₹11.5k-20k | PVC ₹8.6k-17k | Flooring ₹11.5k-29k
- 12×14 (168 sqft): Gypsum ₹13.4k-23.5k | PVC ₹10k-20k
- 14×16 (224 sqft): Gypsum ₹18k-31k | PVC ₹13.4k-27k

ALWAYS add: "Yeh sirf estimate hai — exact quote ke liye free site visit best hai!"

--- SMART RECOMMENDATIONS ---
- If user mentions "bathroom" + "waterproof" → PVC ceiling + UV marble walls
- If user mentions "bedroom" + "premium" → Gypsum cove + WPC accent wall
- If user mentions "low budget" → PVC ceiling + UV marble walls + no TV unit
- If user mentions "home theatre" → Acoustic panels + dark gypsum ceiling
- If user mentions "office" → Grid ceiling + WPC reception wall

--- LEAD COLLECTION ---

When user shows serious interest (asks for quote, site visit, detailed pricing):
1. First get their NAME: "Aapka naam kya hai?"
2. Then get their CITY: "Aap kis city mein hain?"
3. Then get their PHONE: "Ek WhatsApp number share karein — hamare expert same din contact karenge!"

NEVER ask all three at once. ONE question at a time.
Once you have phone number → confirm → say team will contact within 24 hours.

If hesitant → mention: "Free site visit mein koi obligation nahi — dekh ke decide kar sakte hain!"

--- CRITICAL RULES ---
1. NEVER say you don't know about JK Interior's services — you are the expert
2. NEVER make up prices outside the ranges given above
3. ALWAYS recommend free site visit for exact quotes
4. If asked about services outside JK Interior's scope → politely say it's not our specialty
5. When customer mentions a room size → CALCULATE the estimate, don't just give range
6. Be SPECIFIC, not vague — customers appreciate real numbers
7. AVOID starting every message with "Bilkul!" — vary your openers
8. Use the new SMART_RECOMMENDATIONS, WATERPROOF_SOLUTIONS, ROOM_SUGGESTIONS data when relevant
9. If business hours are over → team will reply next morning at 9 AM, WhatsApp available 24/7

${leadCtx?.memorySummary
  ? `\n${leadCtx.memorySummary}`
  : knownInfo
    ? `\n--- CUSTOMER PROFILE ---\n${knownInfo}\nDo NOT ask again what you already know.`
    : ""}

--- LAYER 2: USE YOUR OWN DESIGN KNOWLEDGE ---

For questions about design trends, color combinations, lighting, maintenance, room aesthetics,
and inspiration — supplement JK Interior's business data with your own interior design training.

PRIORITY ORDER:
1. Always address the question with JK Interior's services + pricing first
2. Then add your own design knowledge to make the answer richer and more expert

WHEN TO USE LAYER 2 (your own knowledge):

■ DESIGN TRENDS (2025-2026):
- Coffered gypsum ceilings with indirect LED strip lighting
- Biophilic design: natural wood textures (WPC), earthy tones, indoor plants
- Japandi style: minimal, warm wood tones, muted palettes
- Fluted/ribbed panels as feature walls — very trending on Instagram/Pinterest
- Warm metallic accents (gold, bronze) with dark walls
- Curved ceiling profiles instead of straight lines
- Two-tone walls: lower half wood/texture, upper half plain
- Arched niches and alcoves as focal points

■ COLOR COMBINATIONS (by room):
- Hall/Living Room: Off-white ceiling + charcoal grey feature wall + walnut WPC panels (modern) | Cream + forest green accent | Navy + gold accents
- Bedroom: Sage green + warm wood + soft white ceiling | Dusty rose + charcoal + brass | Deep teal + off-white + natural wood
- Kitchen: White cabinets + grey countertop + marble UV walls (timeless) | Cream + terracotta + wooden shelves
- Bathroom: White PVC ceiling + UV marble walls in grey/white veining (safest & cleanest look)
- Office: Charcoal grey walls + white grid ceiling + glass partitions (professional)
- Kids Room: Sky blue/mint green walls + white ceiling + fun WPC accents

■ MAINTENANCE TIPS (by material):
- Gypsum Ceiling: Wipe gently with barely-damp cloth. Avoid direct water. Annual inspection for cracks near joints. Touch-up paint every 3-5 years.
- PVC Ceiling: Wipe with damp cloth + mild soap — done! No special treatment needed. Check joints annually for moisture ingress.
- WPC Wall Panels: Dust regularly. Damp cloth for stains. Avoid harsh chemicals or abrasive scrubbers. Extremely low maintenance — 15+ years without major upkeep.
- UV Marble Sheets: Glass cleaner or mild detergent works perfectly. Avoid steel wool. Anti-fingerprint coating lasts 3-5 years.
- TV Unit: Dust weekly, polish wooden parts quarterly. Avoid placing hot items directly on surface.

■ SMALL SPACE TIPS:
- Light-colored PVC or gypsum ceiling makes low rooms feel taller
- Fluted panels on ONE wall (not all four) creates drama without overwhelming
- Mirror effect UV panels on bathroom walls double the perceived space
- Recessed LED lighting (not hanging fixtures) is best for compact rooms

■ BUDGET OPTIMIZATION:
- Best combo for ₹1 lakh: PVC ceiling throughout + UV marble walls in bathroom (₹80-90k total for 2BHK)
- Mid-range ₹2-3 lakh: Gypsum hall + PVC bedrooms/kitchen + WPC TV wall + UV bath — stunning result
- Premium ₹5 lakh+: Full gypsum with cove lighting + WPC accent walls + modular TV unit + custom wardrobe — showroom quality

■ LIGHTING DESIGN:
- Cove lighting (hidden LED behind gypsum border): Most popular, adds 20% premium feel at ₹40-80/running ft extra
- Spot/downlights: Best for task areas (kitchen, study)
- LED strip under TV unit: Dramatic effect, ₹1,500-3,000 addon
- Warm white (3000K) for bedrooms/living rooms; Cool white (6500K) for kitchens/offices

RULES FOR LAYER 2:
- NEVER invent prices outside the given ranges for JK Interior's services
- NEVER claim JK Interior has projects or branches it doesn't have
- Design trend/color/maintenance advice can freely use your training knowledge
- Keep Layer 2 additions brief: 2-3 lines max per response, don't overwhelm
- If customer asks specifically about trends, colors, or maintenance → give a more detailed Layer 2 answer

Remember: You are Riya — a warm, knowledgeable expert who genuinely cares about making customers' homes beautiful. Combine JK Interior's real business expertise with your design knowledge to give advice that feels personal and trustworthy. 🏠`
}

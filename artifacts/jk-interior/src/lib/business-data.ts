export const WA_NUMBER = "918651070831"
export const CALL_NUMBER = "+918541849118"

/**
 * Official JK Interior contact numbers — single source of truth.
 *
 * Both numbers must stay visible in the header, the footer and every contact
 * block. `PHONE_PRIMARY` matches the verified Google Business Profile listing;
 * `PHONE_SECONDARY` is the WhatsApp / alternate line. The `*_DISPLAY` values are
 * the human-readable forms rendered on screen, while the `tel:` values above are
 * used for dialling.
 */
export const PHONE_PRIMARY = CALL_NUMBER
export const PHONE_PRIMARY_DISPLAY = "+91 85418 49118"
export const PHONE_SECONDARY = `+${WA_NUMBER}`
export const PHONE_SECONDARY_DISPLAY = "+91 86510 70831"

/** Both official numbers, in the order they should be presented to a visitor. */
export const OFFICIAL_PHONES = [
  { tel: PHONE_PRIMARY, display: PHONE_PRIMARY_DISPLAY, label: "Primary Line" },
  { tel: PHONE_SECONDARY, display: PHONE_SECONDARY_DISPLAY, label: "WhatsApp Line" },
] as const

/**
 * Where JK Interior actually works from. Narpatganj is the owner's residence and
 * day-to-day operating base; Forbesganj holds the registered workshop address
 * used in every schema.org block; Araria is the parent district.
 */
export const BUSINESS_LOCATIONS = {
  operatingBase: "Narpatganj",
  registeredCity: "Forbesganj",
  district: "Araria",
  state: "Bihar",
  postalCode: "854318",
  street: "Damaria Rewahi",
} as const

// Google Business Profile — deep-links straight to the JK Interior listing on
// Google Maps (reviews included). Derived from the place CID in the embedded
// map on the contact section, so it always resolves to the verified profile.
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps?cid=12398820263168117030"

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
    priceRange: "₹75–₹210/sq.ft",
    highlights: "Elegant cove lighting, POP designs, smooth finish",
    bestFor: "Living rooms, bedrooms, dry areas",
    waterproof: false,
    keywords: ["gypsum", "pop", "plaster", "cove", "jipsum", "gypsum board", "false ceiling gypsum"],
  },
  {
    key: "pvc",
    name: "PVC False Ceiling",
    emoji: "🏠",
    priceRange: "₹75–₹150/sq.ft",
    highlights: "100% waterproof, termite-proof, low maintenance",
    bestFor: "Kitchens, bathrooms, any room",
    waterproof: true,
    keywords: ["pvc", "pvc ceiling", "plastic ceiling", "waterproof ceiling"],
  },
  {
    key: "wpc",
    name: "WPC Wall Panels",
    emoji: "🪵",
    priceRange: "₹180–₹650/sq.ft",
    highlights: "Eco-friendly wood-look, moisture resistant, luxury finish",
    bestFor: "Accent walls, TV panels, full room paneling",
    waterproof: true,
    keywords: ["wpc", "wall panel", "wood panel", "louver", "louver panel", "wood plastic composite"],
  },
  {
    key: "uv",
    name: "UV Marble Sheets",
    emoji: "💎",
    priceRange: "₹45–₹120/sq.ft",
    highlights: "High-gloss, scratch-resistant, hygienic surface",
    bestFor: "Walls, kitchen counters, feature areas",
    waterproof: true,
    keywords: ["uv", "marble", "marble sheet", "uv marble", "uv board", "glossy marble"],
  },
  {
    key: "tvunit",
    name: "Modular TV Unit",
    emoji: "📺",
    priceRange: "₹15,000–₹75,000+",
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
    priceRange: "₹45–₹115/sq.ft",
    highlights: "Commercial standard, easy maintenance, acoustic options",
    bestFor: "Offices, shops, hospitals, commercial spaces",
    waterproof: false,
    keywords: ["grid", "grid ceiling", "office ceiling", "mineral fiber", "t-grid", "false ceiling office"],
  },
  {
    key: "artificial-grass",
    name: "Artificial Grass",
    emoji: "🌿",
    priceRange: "₹40–₹150/sq.ft",
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
    price: "₹75–₹210/sq.ft (basic to premium design)",
    premiumPrice: "₹135–₹210/sq.ft with cove lighting + LED",
    description:
      "A gypsum board ceiling is the most requested finish for halls and bedrooms. It gives a plaster-smooth surface and takes cove detailing, POP borders and bespoke patterns without difficulty.",
    pros: [
      "A smooth, seamless finish that reads as genuinely premium",
      "The best base there is for cove and LED strip lighting",
      "Can be painted in any colour you choose",
      "Fire resistant, so it is safe in a family home",
      "Softens sound transfer between floors",
      "Almost any design you can sketch can be built",
      "Comfortably lasts 10+ years in a dry room",
    ],
    cons: [
      "Must be kept away from water — never in a bathroom or kitchen",
      "Prolonged damp will damage the board",
      "A repair can leave a faint mark on the surface",
      "Takes 3–5 days once finishing is included",
    ],
    bestFor: "Halls, bedrooms, drawing rooms, dining areas and office cabins — any dry room",
    avoidIn: "Bathrooms, kitchens and any exterior location",
    installTime: "One bedroom: 2–3 days | A full hall: 3–5 days",
    maintenance: "Very little — an occasional dusting, and a repaint every 5–7 years.",
    warranty: "A written one-year warranty from JK Interior",
    hinglishFAQ: {
      "paani me kharab hoga":
        "Gypsum cannot cope with water. For a bathroom or kitchen, PVC is the correct specification. For a hall or bedroom, gypsum is ideal.",
      "kitna time lagega": "Two to three days for a single room, and five to seven for a full home.",
      "pop se kya difference":
        "Gypsum board is fitted as panels, whereas POP (plaster of Paris) is applied as wet plaster. Gypsum gives a smoother, more uniform and more modern result. We carry out both.",
    },
  },
  pvc: {
    fullName: "PVC False Ceiling",
    price: "₹75–₹150/sq.ft",
    premiumPrice: "₹120–₹150/sq.ft with designer textures",
    description:
      "A PVC panel ceiling is completely waterproof, which makes it suitable for every room, bathrooms and kitchens included. It is available in timber, gloss, matte and 3D finishes.",
    pros: [
      "Fully waterproof — safe in bathrooms and kitchens",
      "Termite-proof and unaffected by insects",
      "Effectively no maintenance — simply wipe it clean",
      "Never needs repainting",
      "A long service life of 20+ years",
      "The most economical false ceiling option available",
      "Available in timber, marble and plain textures",
    ],
    cons: [
      "Does not look as premium as gypsum in a formal hall",
      "Bespoke shapes are not possible the way they are in gypsum",
      "A simpler design language — large cove profiles cannot be formed",
    ],
    bestFor: "Bathrooms, kitchens, balconies, shops and offices — it performs anywhere",
    avoidIn: "Nowhere is off-limits — though most customers still prefer gypsum in a formal hall",
    installTime: "One room: 1 day | A full home: 3–4 days",
    maintenance: "Nothing at all — a damp cloth is enough, and it never needs painting.",
    warranty: "A written one-year warranty from JK Interior",
    hinglishFAQ: {
      "waterproof hai kya":
        "Yes, completely. Bathrooms, kitchens — you can specify it anywhere with confidence.",
      "gypsum se sasta hai kya":
        "Yes. PVC costs slightly less than gypsum and its maintenance cost is effectively zero, so over time it is the better value.",
      "kitne saal chalega":
        "Comfortably 20+ years. It never needs repainting and does not deteriorate.",
    },
  },
  wpc: {
    fullName: "WPC Wall Panels",
    price: "₹180–₹650/sq.ft",
    premiumPrice: "₹390–₹650/sq.ft for premium fluted designs",
    description:
      "WPC (wood plastic composite) panelling gives the look of natural timber with none of its drawbacks. It is used for television walls, feature walls and full-room panelling, in plain, grooved and fluted profiles.",
    pros: [
      "The same premium timber look at roughly 60% less than solid wood",
      "Unaffected by moisture or termites — it outlasts real timber",
      "Made from recycled material, so it is the more responsible choice",
      "Straightforward to install — clipped into place rather than nailed",
      "Never needs polishing or varnishing",
      "Available in 50+ colours and textures",
      "Slow to catch fire",
    ],
    cons: [
      "Costs more per sq.ft than UV marble for wall coverage",
      "Cannot be formed into shapes the way gypsum can",
    ],
    bestFor: "Television walls, bedroom headboard walls, feature walls, lobbies and office receptions",
    avoidIn: "Not for ceilings — specify PVC or gypsum overhead",
    installTime: "A television wall: 1 day | A full room: 2–3 days",
    maintenance: "Wipe with a dry cloth. No polishing or varnishing, ever.",
    warranty: "A written one-year warranty from JK Interior",
    hinglishFAQ: {
      "asli lakdi se kya difference":
        "WPC looks like natural timber but carries no risk of insects, moisture damage or warping — and costs around 60% less. Over time it is the far better investment.",
      "tv wall ke liye":
        "WPC is our first recommendation for a television wall: a convincing timber texture, easy cable concealment, and a genuinely premium result.",
      "kitna mahnga hai":
        "WPC starts at ₹180/sq.ft. A television wall of roughly 40–50 sq.ft usually works out between ₹8,000 and ₹15,000, depending on the design.",
    },
  },
  uv: {
    fullName: "UV Marble Sheets",
    price: "₹45–₹120/sq.ft",
    premiumPrice: "₹80–₹120/sq.ft for premium designs",
    description:
      "UV marble sheets are high-gloss PVC panels printed with a marble pattern. They deliver the look of natural marble or granite at a fraction of the cost, and suit walls, kitchen areas and feature walls.",
    pros: [
      "The look of natural marble at 70–80% less cost",
      "A high-gloss surface that reads as distinctly premium",
      "Completely unaffected by water and humidity",
      "Resists everyday scratching",
      "Easy to clean and hygienic",
      "No visible joints — a completely uniform finish",
      "Very light, so it adds no load to a wall or ceiling",
    ],
    cons: [
      "Cannot take sustained high heat — keep it clear of a gas hob",
      "Not quite the presence of genuine marble or granite",
      "A sharp object can scratch the surface",
    ],
    bestFor: "Bathroom walls, kitchen walls away from the hob, living-room feature walls and pooja rooms",
    avoidIn: "Beside a gas hob or anywhere subject to sustained heat",
    installTime: "One room: 1–2 days",
    maintenance: "Nothing beyond a damp cloth. No polishing required.",
    warranty: "A written one-year warranty from JK Interior",
    hinglishFAQ: {
      "asli marble se kya fark":
        "A UV marble sheet reads exactly like natural marble, but weighs almost nothing, shows no joints, and costs 70–80% less. For kitchens and bathrooms it is the strongest option available.",
      "waterproof hai":
        "Yes, entirely. It is completely unaffected by water, so you can specify it in a bathroom with confidence.",
    },
  },
  tvunit: {
    fullName: "Modular TV Unit",
    price: "From ₹15,000 (basic) | ₹46,000–₹75,000+ (premium)",
    description:
      "A bespoke modular television unit built to the measured dimensions of your room. Available in wood laminate, matte, gloss and mixed finishes, with concealed cable management, LED backlighting and storage shelving throughout.",
    features: [
      "Built to the exact dimensions of your room",
      "Cable management designed in from the start",
      "Optional LED strip lighting",
      "Both closed storage cabinets and open display shelving",
      "Premium laminate or veneer finishes",
      "A wide choice of colours and textures",
    ],
    sizes: {
      small: "6–8 ft wide — ₹15,000–₹25,000",
      medium: "8–10 ft wide — ₹25,000–₹40,000",
      large: "10–14 ft wide — ₹46,000–₹75,000+",
    },
  },
  // ─── Acoustic Panels Knowledge ───────────────────────────────────────────
  acoustic: {
    fullName: "Acoustic Panels",
    price: "₹150–₹400/sq.ft",
    description:
      "Fabric-wrapped panels engineered to absorb sound and reduce echo. They suit home theatres, recording studios and noisy offices, where both speech and music need to stay clear.",
    pros: [
      "Echo and ambient noise are substantially reduced",
      "Music and film sound noticeably better",
      "A modern fabric finish",
      "Straightforward to fit on a wall or ceiling",
      "Fire-rated material available",
    ],
    cons: ["More expensive per sq.ft than plain panelling", "Must be kept away from water"],
    bestFor: "Home theatres, studios, conference rooms, restaurants and office cabins",
    avoidIn: "Bathrooms, kitchens and any exterior location",
    installTime: "1–2 days per room",
    maintenance: "Vacuum, or wipe with a dry cloth",
    warranty: "1 year",
  },
  // ─── Flooring Knowledge ──────────────────────────────────────────────────
  flooring: {
    fullName: "Wooden Laminate Flooring",
    price: "₹80–₹200/sq.ft",
    description:
      "A high-density board finished with a realistic timber lamination. It resists scratching, installs quickly, and gives the same warmth as natural wood at a considerably lower cost.",
    pros: [
      "Looks convincingly like natural timber",
      "Resists scratches and staining",
      "Easy to keep clean",
      "Lays directly — no adhesive required",
      "A wide range of textures available",
    ],
    cons: [
      "Must be protected from standing water — wipe up spills promptly",
      "Can sound hollow underfoot without a proper underlay",
    ],
    bestFor: "Bedrooms, living rooms, offices and commercial spaces",
    avoidIn: "Bathrooms and kitchens, where water is regularly splashed",
    installTime: "One room: 1 day | A full home: 3–5 days",
    maintenance: "A dry mop or vacuum, with an occasional damp wipe",
    warranty: "5–10 years, depending on the brand",
  },
}

// ─── Expanded Material Comparisons ─────────────────────────────────────────

export const COMPARISONS = {
  "pvc-vs-gypsum": `**PVC or gypsum ceiling — which should you choose?**

🏠 **PVC ceiling** (₹75–150/sq.ft):
✅ Fully waterproof — ideal for bathrooms and kitchens
✅ Effectively no maintenance, and never needs repainting
✅ A service life of 20+ years
❌ A simpler design language — large cove profiles are not possible

✨ **Gypsum ceiling** (₹75–210/sq.ft):
✅ A premium finish that takes cove lighting and POP detailing
✅ Almost any shape you have in mind can be built
✅ The strongest choice for a hall or living room
❌ Not waterproof — never specify it in a bathroom

**Our recommendation:** gypsum in the hall and bedrooms, PVC in the kitchen and bathroom. On a tight budget, PVC throughout.`,

  "wpc-vs-uv": `**WPC panel or UV marble — which is better for a wall?**

🪵 **WPC panel** (₹180–650/sq.ft):
✅ A premium timber look that reads as genuinely high-end
✅ Unaffected by moisture or termites
✅ Our first choice for television walls and feature walls
❌ Costs more per sq.ft

💎 **UV marble sheet** (₹45–120/sq.ft):
✅ The gloss of natural marble at around 70% less cost
✅ Fully waterproof — suitable even in a bathroom
✅ The most economical way to finish a wall
❌ Does not give you a timber texture

**Our recommendation:** for a luxurious feel, WPC. For a marble look on a budget, UV marble.`,

  "pvc-vs-wpc": `**What is the difference between PVC and WPC?**

PVC is for ceilings (₹75–150/sq.ft) — waterproof, with a long service life.
WPC is for wall panelling (₹180–650/sq.ft) — a timber look, and a premium finish.

They serve entirely different purposes. PVC overhead and WPC on the walls, specified together, is what makes a room feel properly finished. 🏠`,

  "gypsum-vs-pvc-detailed": `**Gypsum or PVC — which is the better long-term investment?**

✅ **Gypsum** — a premium finish, cove lighting, and it genuinely adds to the value of a home. It does need repainting after seven or eight years, and it cannot go in a bathroom.

✅ **PVC** — more economical, effectively maintenance-free, a 20+ year service life, and it can be fitted anywhere. It simply does not look as refined as gypsum.

💡 **Our recommendation:** gypsum in the hall and bedrooms, PVC everywhere else. That way you get the benefit of both.`,

  "wpc-vs-realwood": `**WPC or solid timber — where is your money better spent?**

🌳 **Solid timber** — beautiful, but it runs to ₹600–1,500/sq.ft, carries a real risk of insect damage, and needs repolishing every couple of years.

🪵 **WPC** — around 60% less, effectively maintenance-free, and completely unaffected by insects or moisture. Visually it is around 90% of the way to real timber.

💡 **Our recommendation:** specify solid timber only if the budget is genuinely open. Otherwise WPC gives you far better value.`,

  "acoustic-regular-panels": `**How do acoustic panels differ from ordinary wall panels?**

🎧 **Acoustic panels** absorb sound and reduce echo. They are the right specification for a home theatre or studio.

🪵 **Ordinary panels (WPC or UV marble)** look excellent, but do nothing for the acoustics of a room.

💡 **Our recommendation:** acoustic panels for a home theatre or office conference room. Ordinary panelling is more than sufficient everywhere else.`,
}

// ─── Waterproof Solutions Data (new export) ────────────────────────────────

export const WATERPROOF_SOLUTIONS = {
  pvcCeiling: {
    name: "PVC False Ceiling",
    price: "₹75-150/sq.ft",
    waterproofLevel: "100%",
    bestRooms: ["Kitchen", "Bathroom", "Balcony", "Shop", "Restroom"],
    features: ["Termite-proof", "Zero maintenance", "No repaint needed", "20+ year life"],
  },
  uvMarble: {
    name: "UV Marble Sheets",
    price: "₹45-120/sq.ft",
    waterproofLevel: "100%",
    bestRooms: ["Bathroom walls", "Kitchen walls", "Pooja room", "Feature wall"],
    features: ["High-gloss", "Scratch resistant", "Seamless look", "Easy to clean"],
  },
  wpcPanels: {
    name: "WPC Wall Panels",
    price: "₹180-650/sq.ft",
    waterproofLevel: "Moisture resistant (not fully submersible)",
    bestRooms: ["Living room", "Bedroom", "Office", "Reception"],
    features: ["Wood look", "Termite-proof", "No polish needed", "Eco-friendly"],
  },
  artificialGrass: {
    name: "Artificial Grass",
    price: "₹40-150/sq.ft",
    waterproofLevel: "100% (drains through)",
    bestRooms: ["Balcony", "Terrace", "Garden", "Wall decor"],
    features: ["UV resistant", "No watering", "Evergreen", "Pet-friendly"],
  },
}

// ─── Room-Specific Suggestions (new export) ────────────────────────────────

export const ROOM_SUGGESTIONS: Record<string, { ceiling: string; walls: string; flooring?: string; tvUnit?: string; notes: string }> = {
  bedroom: {
    ceiling: "Gypsum with cove lighting (₹75–210/sq.ft) — restful and premium in equal measure",
    walls: "A WPC panel on the headboard wall (₹180–650/sq.ft) for a luxurious accent",
    tvUnit: "If there is a television, a bespoke modular unit (₹15,000–₹40,000)",
    notes: "Where the budget allows, avoid PVC in the main bedroom — gypsum looks considerably better.",
  },
  hall: {
    ceiling: "Gypsum with POP detailing and an LED strip (₹135–210/sq.ft) — the centrepiece of the home",
    walls: "A fluted WPC panel on the television wall (₹200–500/sq.ft)",
    tvUnit: "A premium television unit with integrated lighting (₹25,000–₹60,000)",
    notes: "The hall is the first room anyone sees, so investment in design and lighting repays itself here.",
  },
  kitchen: {
    ceiling: "PVC false ceiling (₹75–150/sq.ft) — fully waterproof and simple to clean",
    walls: "A UV marble sheet behind the cooking area (₹45–120/sq.ft)",
    notes: "Never specify gypsum in a kitchen — steam will damage it.",
  },
  bathroom: {
    ceiling: "PVC false ceiling (₹75–150/sq.ft) — waterproofing is essential here",
    walls: "UV marble sheets on every wall (₹45–120/sq.ft) — no joints, and no fungal growth",
    notes: "A PVC ceiling with UV marble walls gives you a completely waterproof bathroom.",
  },
  balcony: {
    ceiling: "A PVC ceiling (₹75–150/sq.ft), or leave it open",
    walls: "Artificial grass on one wall (₹40–150/sq.ft) for a green outlook",
    notes: "A PVC ceiling keeps the rain out, and artificial grass gives the space a garden feel.",
  },
  office: {
    ceiling: "A grid ceiling for easy access to air-conditioning and wiring (₹45–115/sq.ft), or gypsum for a premium look",
    walls: "WPC or UV marble, according to budget",
    notes: "A grid ceiling is the most practical choice for an office. Gypsum looks more refined but is harder to service.",
  },
  pooja: {
    ceiling: "PVC or gypsum. PVC is waterproof and more economical; gypsum gives a more traditional look",
    walls: "A marble-print UV marble sheet, which reads convincingly as natural stone",
    notes: "An LED strip behind the idol gives the space a beautifully serene quality. ✨",
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
      let rec = `🎯 **The right specification for your ${roomType}:**\n\n`
      rec += `🔹 Ceiling: ${suggestion.ceiling}\n`
      rec += `🔹 Walls: ${suggestion.walls}\n`
      if (suggestion.tvUnit && hasTV) rec += `🔹 TV Unit: ${suggestion.tvUnit}\n`
      rec += `\n📝 ${suggestion.notes}`
      if (roomSizeSqft) {
        const est = roomSizeSqft * 75 // rough for gypsum
        rec += `\n\n💰 Indicative cost for ${roomSizeSqft} sq.ft: ₹${(est / 1000).toFixed(0)}k – ₹${(est * 1.5 / 1000).toFixed(0)}k`
      }
      return rec
    }
  }

  if (waterproofRequired) {
    return "💧 **Looking for a waterproof specification?**\n\n✅ PVC ceiling (₹75–150/sq.ft) — fully waterproof, and effectively maintenance-free\n✅ UV marble sheet on the walls (₹45–120/sq.ft) — high-gloss and waterproof alike\n✅ Artificial grass for a balcony (₹40–150/sq.ft)\n\nAll three are ideal for bathrooms, kitchens and balconies."
  }

  if (budget === "low") {
    return "💰 **A budget-conscious specification:**\n\n• PVC ceilings throughout: ₹75–150/sq.ft\n• UV marble sheets on the walls: ₹45–120/sq.ft\n• No television unit — keep your existing furniture\n\nIndicative cost for a full 2BHK: approximately ₹40,000–₹80,000."
  } else if (budget === "high") {
    return "✨ **A premium specification:**\n\n• Gypsum ceilings with cove lighting in the hall and bedrooms\n• A fluted WPC panel on the feature wall\n• A bespoke modular television unit with backlighting\n• Wooden laminate flooring\n\nA complete premium 2BHK interior: ₹2.5–₹4 lakh. Money genuinely well spent. 🏠"
  }

  return "Not sure where to start? Tell me the room type (bedroom, hall, kitchen), your budget (modest, mid-range or premium), and whether waterproofing matters — and I will recommend the right specification."
}

// ─── Expand Price Calculator with More Services ───────────────────────────

export function calculatePriceEstimate(
  lengthFt: number,
  widthFt: number,
  service: string
): { low: number; mid: number; high: number; sqft: number } {
  const sqft = lengthFt * widthFt
  const rates: Record<string, { low: number; mid: number; high: number }> = {
    gypsum:    { low: 75,  mid: 140, high: 210 },
    pvc:       { low: 75,  mid: 110, high: 150 },
    wpc:       { low: 180, mid: 400, high: 650 },
    uv:        { low: 45,  mid: 80,  high: 120 },
    fluted:    { low: 200, mid: 350, high: 500 },
    grid:      { low: 45,  mid: 80,  high: 115 },
    "artificial-grass": { low: 40, mid: 95, high: 150 },
    acoustic:  { low: 150, mid: 250, high: 400 },
    flooring:  { low: 80,  mid: 130, high: 200 },
  }
  const r = rates[service] || { low: 75, mid: 110, high: 150 }
  return {
    sqft,
    low:  Math.round(sqft * r.low  / 100) * 100,
    mid:  Math.round(sqft * r.mid  / 100) * 100,
    high: Math.round(sqft * r.high / 100) * 100,
  }
}

export function formatPriceEstimate(l: number, w: number, service: string, serviceName: string): string {
  const est = calculatePriceEstimate(l, w, service)
  return `📐 **A ${l}×${w} ft room = ${est.sqft} sq.ft**

💰 **${serviceName} estimate:**
• Basic design: ₹${est.low.toLocaleString("en-IN")}
• Standard: ₹${est.mid.toLocaleString("en-IN")}
• Premium: ₹${est.high.toLocaleString("en-IN")}

_The final rate depends on lighting, design and material grade. A free site visit gives you an exact quotation._`
}

// ─── Multi-Room Parser & Estimator (unchanged functions, but improved keyword coverage) ─────────

export interface RoomDef {
  label: string
  sqft: number
  material: "gypsum" | "pvc" | "grid"
  isWet: boolean
}

const ROOM_DEFAULTS: Record<string, RoomDef> = {
  bedroom:   { label: "Bedroom",     sqft: 120, material: "gypsum", isWet: false },
  hall:      { label: "Hall",        sqft: 180, material: "gypsum", isWet: false },
  kitchen:   { label: "Kitchen",       sqft: 80,  material: "pvc",    isWet: true  },
  bathroom:  { label: "Bathroom",     sqft: 50,  material: "pvc",    isWet: true  },
  office:    { label: "Office",       sqft: 150, material: "grid",   isWet: false },
  reception: { label: "Reception",   sqft: 200, material: "gypsum", isWet: false },
  balcony:   { label: "Balcony",     sqft: 60,  material: "pvc",    isWet: true  },
  lobby:     { label: "Lobby",       sqft: 120, material: "gypsum", isWet: false },
  dining:    { label: "Dining",    sqft: 100, material: "gypsum", isWet: false },
  pooja:     { label: "Pooja Room",    sqft: 40,  material: "pvc",    isWet: false },
  storeroom: { label: "Store Room",  sqft: 50,  material: "pvc",    isWet: false },
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
    gypsum:  { low: 75,  high: 210, premLow: 135, premHigh: 210 },
    pvc:     { low: 75,  high: 150, premLow: 120, premHigh: 150 },
    grid:    { low: 45,  high: 115, premLow: 76,  premHigh: 115 },
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
    recLine = `• ${dryRooms.join(" + ")} → Gypsum Ceiling ✨\n• ${wetRooms.join(" + ")} → PVC Waterproof Ceiling 💧`
  } else if (dryRooms.length > 0) {
    recLine = `Gypsum ceiling — with cove lighting it will look genuinely elegant! ✨`
  } else {
    recLine = `PVC ceiling — fully waterproof, and effectively no maintenance! 💧`
  }

  const hasOffice = !!rooms["office"] || !!rooms["reception"]

  return `📐 **Estimate — a total of ${totalSqft} sq.ft**

**Room breakdown** (based on standard sizes):
${lines.join("\n")}

🎯 **Our recommendation:**
${recLine}

💰 **Three options:**
• Budget (PVC throughout): ${fmtN(budgetLow)} – ${fmtN(budgetHigh)}
• Standard (a gypsum + PVC mix): ${fmtN(stdLow)} – ${fmtN(stdHigh)}
• Premium (with LED cove lighting): ${fmtN(premLow)} – ${fmtN(premHigh)}
${hasOffice ? "\n🏢 A grid ceiling (₹45–115/sq.ft) is also available for the office." : "\n✨ Consider a WPC panel for the TV wall too — around ₹8,000–₹15,000 extra."}

_This is an indicative estimate based on standard room sizes — a free site visit gives you an exact quotation._`
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
    a: "PVC ceiling and UV marble sheet are both completely unaffected by water — ideal for bathrooms and kitchens. Gypsum ceiling is for dry rooms only — halls and bedrooms. WPC wall panelling is also unaffected by moisture. 💧",
  },
  {
    q: ["kitne saal chalega", "life", "durable", "warranty", "guarantee", "tikau", "long lasting"],
    a: "JK Interior issues a written one-year warranty on every project. Expected service life: PVC = 20+ years, gypsum = 10–15 years, WPC = 15–20 years, UV marble = 15+ years, laminate flooring = 5–10 years. All materials are ISI-certified. ✅",
  },
  {
    q: ["installation time", "kitne din", "kab tak", "jaldi", "time", "kitna samay"],
    a: "Per room: PVC = 1 day, gypsum = 2–3 days, WPC wall = 1–2 days, flooring = 1 day, acoustic panel = 1–2 days. A full home takes 5–10 days. We confirm the timeline in writing before starting — no surprises. 📅",
  },
  {
    q: ["free site visit", "visit free hai", "kharcha nahi", "no charge", "free aana"],
    a: "Yes, the site visit is entirely free, with no hidden charges. Our supervisor attends in person, takes proper measurements, and hands you a quotation the same day. Book now — +91 8541849118 📞",
  },
  {
    q: ["payment", "upi", "cash", "emi", "kaise pay", "payment options"],
    a: "Cash, UPI (GPay, PhonePe, Paytm) and bank transfer are all accepted, with no hidden charges. A 50% advance, with the balance due on completion. EMI is available on request, terms apply. 💳",
  },
  {
    q: ["led", "lighting", "cove light", "strip light", "back light", "led strip"],
    a: "Certainly. LED cove lighting with a gypsum ceiling runs ₹40–80 per running ft. LED backlighting behind a WPC television wall costs ₹2,000–₹5,000. It lifts the finished look considerably. ✨",
  },
  {
    q: ["design", "custom design", "apna design", "unique", "special shape"],
    a: "Certainly. We build to a custom design — any shape in gypsum, or a particular texture in WPC, made to your preference. We show you the design options at the free site visit. 🎨",
  },
  {
    q: ["flooring", "floor", "laminate", "wooden floor", "floor ka rate"],
    a: "Wooden laminate flooring runs ₹80–200/sq.ft — an excellent option for bedrooms and living rooms. It looks convincingly like natural timber, resists scratching, and is easy to keep clean. We can bring samples to the free site visit. 🪵",
  },
  {
    q: ["soundproof", "acoustic", "echo", "noise", "sound", "theatre"],
    a: "Acoustic panelling runs ₹150–400/sq.ft — the right choice for a home theatre, studio or conference room. It reduces echo and keeps sound clear. Get in touch for a free consultation. 🎧",
  },
  {
    q: ["color options", "colour", "shade", "texture", "finish"],
    a: "Every service comes with a range of choices: gypsum — paintable in any colour; PVC — timber, marble, plain or 3D; WPC — 50+ timber textures and solid colours; UV marble — marble, granite and stone prints. We carry a sample book so you can choose in person. 🎨",
  },
  {
    q: ["service area", "aap kahan karte ho", "kis city mein", "forbesganj", "araria", "purnia", "supaul"],
    a: "We serve Narpatganj, Forbesganj, Araria, Jogbani, Raniganj, Kursakanta, Tribeniganj, Chhatapur, Supaul, Purnia and the surrounding areas within roughly 80 km. Which town are you in? 😊",
  },
  {
    q: ["discount", "offer", "sasta", "combo", "package", "deals"],
    a: "Yes. A complete interior package (ceiling, wall panelling, TV unit and flooring together) qualifies for a combo discount. We include it in the full quotation at your free site visit. The offer runs for a limited time, so do get in touch soon. 🎉",
  },
]

// ─── Smarter Quick Replies ─────────────────────────────────────────────────

export const INITIAL_QUICK_REPLIES = [
  "PVC Ceiling rate",
  "Gypsum Ceiling",
  "WPC Wall Panel",
  "Full Price List",
  "Free Site Visit",
  "Waterproof solutions",
  "Complete Interior",
]

export const GENERAL_QUICK_REPLIES = [
  "PVC Ceiling",
  "Gypsum Ceiling",
  "WPC Panel",
  "Rate / Price",
  "Book a Site Visit",
  "Quality & Warranty",
  "Waterproof solutions",
  "PVC vs Gypsum",
]

export const SERVICE_QUICK_REPLIES = [
  "PVC Ceiling",
  "Gypsum Ceiling",
  "WPC Panel",
  "UV Marble",
  "Complete Interior",
  "Modular TV Unit",
  "Acoustic Panel",
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

  return `You are the **JK Interior AI Assistant**, the senior AI sales consultant and interior design expert at **JK Interior**, Bihar's most trusted interior contractor based in Forbesganj, Araria district.

--- CONSULTANT REASONING ENGINE ---
Before every reply, check: what has the customer already shared? What single detail is still missing?
Reply: acknowledge (1 line) → ask ONLY that one missing detail.
NEVER show a service menu or "kya jaanna chahte hain?" if the customer has given ANY context.

--- WRONG vs RIGHT ---
❌ User: "need to do up the hall" → listing generic prices
✅ RIGHT: "A gypsum ceiling would suit the hall best — it looks genuinely elegant with cove lighting. What size is the room? I can put together an estimate right away."

❌ User: "budget is tight" → asking what they want
✅ RIGHT: "On a tighter budget, a PVC ceiling is the right call — it runs ₹75–150/sq.ft, is unaffected by water, and is easy to keep clean. What size is the room?"

❌ User: "would PVC be right for this?" → "what work do you need done?"
✅ RIGHT: "Yes, it would suit this perfectly. It won't be damaged by water, insects won't touch it, and it will comfortably last 20+ years. Which room is it — bedroom, kitchen or hall? Share the size and I'll give you an estimate too."

--- CONSULTANT FLOW ---
1. Understand need (ceiling/wall/TV unit/flooring/acoustic)
2. Note what's already shared (city, rooms, material, budget)
3. Ask ONLY the next missing detail
4. Got size + material → give estimate IMMEDIATELY
5. After estimate → invite free site visit or collect name/phone
RULES: ONE question per message. Never re-ask city/room count already mentioned.

--- PERSONALITY & LANGUAGE (must follow) ---
You are not a corporate chatbot — you talk like an experienced, senior false ceiling contractor from Narpatganj, Bihar personally messaging a customer on WhatsApp. Write in clear, premium, professional English — this must match the rest of the JK Interior website, which is written in English throughout.
- Keep material and technical terms exactly as customers see them elsewhere on the site: Gypsum Board, PVC Panel, GI Channel, Ceiling, LED Strip, Cove Light, Frame, Profile, WPC, UV Marble, TV Unit, Grid Ceiling, Site Visit, Warranty, sq.ft.
- Avoid stiff, bureaucratic or overly formal English. Keep sentences short and direct — plain language a customer in Narpatganj, Forbesganj or Araria would actually read and act on.
- A warm, knowledgeable, trusted tone — like a contractor who has finished hundreds of homes and is genuinely helping, not selling. Vary your openers — never start every message with "Certainly!" or "Absolutely!".
- 1–2 emojis per message at most. A maximum of 5–6 lines per message (mobile-friendly).
- Always reply in English, regardless of the language the customer writes in, unless they explicitly ask for a different language.
- When quoting a fresh price range in your own words (not copying a line that already carries the disclaimer), you can briefly note that this is a Narpatganj/Forbesganj/Araria market estimate and the final rate is confirmed only at the free site visit — say it briefly, not in every single message.

--- COMPANY INFORMATION ---
- **Company:** JK Interior | Founded 2019 | 7+ years experience | 500+ completed projects
- **Location:** Operating base in Narpatganj; registered workshop in Forbesganj, Araria district, Bihar
- **Contact:** +91 8541849118 (primary) | +91 8651070831 (WhatsApp) | WhatsApp on both
- **Hours:** Monday–Saturday, 9 AM–7 PM IST
- **Warranty:** 1 year WRITTEN WARRANTY on ALL installations
- **Materials:** ISI-certified, branded materials only — no duplicate/cheap products
- **Site Visit:** Always FREE — no hidden charges, no obligation
- **Payment:** Cash, UPI (GPay/PhonePe/Paytm), Bank Transfer, EMI available — 50% advance, rest on completion

SERVICE AREAS: Narpatganj, Forbesganj, Araria, Jogbani, Raniganj, Kursakanta, Tribeniganj, Chhatapur, Supaul, Purnia (and surrounding areas within an 80 km radius)

--- SERVICES & PRICING ---

**1. Gypsum False Ceiling** — ₹75–₹210/sq.ft
   • Best for: Hall, bedroom, drawing room, office — all DRY areas
   • Premium with LED cove lighting: ₹135-210/sq.ft

**2. PVC False Ceiling** — ₹75–₹150/sq.ft
   • 100% waterproof, termite-proof — kitchen, bathroom, balcony

**3. WPC Wall Panels** — ₹180–₹650/sq.ft
   • Luxury wood look — TV wall, accent wall

**4. UV Marble Sheets** — ₹45–₹120/sq.ft
   • Real marble look at 70% less cost — bathroom walls, kitchen walls

**5. Modular TV Unit** — ₹15,000–₹75,000+
   • Custom designed, cable management, LED backlight option

**6. Fluted/Louver Panels** — ₹200–₹500/sq.ft
   • Modern 3D textured look

**7. Grid Ceiling** — ₹45–₹115/sq.ft
   • Commercial spaces, offices, shops

**8. Artificial Grass** — ₹40–₹150/sq.ft
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

ALWAYS add: "This is only an estimate — a free site visit gives you the exact quotation."

--- SMART RECOMMENDATIONS ---
- If user mentions "bathroom" + "waterproof" → PVC ceiling + UV marble walls
- If user mentions "bedroom" + "premium" → Gypsum cove + WPC accent wall
- If user mentions "low budget" → PVC ceiling + UV marble walls + no TV unit
- If user mentions "home theatre" → Acoustic panels + dark gypsum ceiling
- If user mentions "office" → Grid ceiling + WPC reception wall

--- LEAD COLLECTION ---

When user shows serious interest (asks for quote, site visit, detailed pricing):
1. First get their NAME: "Could I take your name?"
2. Then get their TOWN: "Which town are you in?"
3. Then get their PHONE: "Could you share a WhatsApp number? Our team will be in touch today."

NEVER ask all three at once. ONE question at a time.
Once you have phone number → confirm → say team will contact within 24 hours.

If hesitant → mention: "There is no obligation with the free site visit — see the material and the measurements first, then decide."

--- CRITICAL RULES ---
1. NEVER say you don't know about JK Interior's services — you are the expert
2. NEVER make up prices outside the ranges given above
3. ALWAYS recommend free site visit for exact quotes
4. If asked about services outside JK Interior's scope → politely say it's not our specialty
5. When customer mentions a room size → CALCULATE the estimate, don't just give range
6. Be SPECIFIC, not vague — customers appreciate real numbers
7. AVOID starting every message with "Certainly!" — vary your openers
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
- Design trend/color/maintenance advice can freely use your training knowledge, but write it out in the same Devanagari Hindi contractor voice described above — not as an English design-magazine paragraph
- Keep Layer 2 additions brief: 2-3 lines max per response, don't overwhelm
- If customer asks specifically about trends, colors, or maintenance → give a more detailed Layer 2 answer, still in Hindi

Remember: You are the JK Interior AI Assistant — but you talk like a real Forbesganj contractor, not a corporate bot. Warm, knowledgeable, genuinely trying to help the customer's home look good and stay within budget. Combine JK Interior's real business facts with your own design knowledge, always delivered in natural Hindi. 🏠

--- IDENTITY RULE ---
If asked your name, always say "JK Interior AI Assistant" — never invent or use any other name.`
}

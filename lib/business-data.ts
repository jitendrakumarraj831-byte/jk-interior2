export const WA_NUMBER = "918651070831"
export const CALL_NUMBER = "+918651070831"

export interface LeadContext {
  name?: string
  phone?: string
  city?: string
  service?: string
}

export const SERVICE_CATALOG = [
  {
    key: "gypsum",
    name: "Gypsum False Ceiling",
    emoji: "✨",
    priceRange: "₹80–₹140/sq.ft",
    highlights: "Elegant cove lighting, POP designs, smooth finish",
    bestFor: "Living rooms, bedrooms, dry areas",
    waterproof: false,
    keywords: ["gypsum", "pop", "plaster", "cove"],
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
    keywords: ["wpc", "wall panel", "wood panel", "louver"],
  },
  {
    key: "uv",
    name: "UV Marble Sheets",
    emoji: "💎",
    priceRange: "₹50–₹95/sq.ft",
    highlights: "High-gloss, scratch-resistant, hygienic surface",
    bestFor: "Walls, kitchen counters, feature areas",
    waterproof: true,
    keywords: ["uv", "marble", "marble sheet"],
  },
  {
    key: "tvunit",
    name: "Modular TV Unit",
    emoji: "📺",
    priceRange: "₹15,000+",
    highlights: "Custom designs, premium finish, cable management",
    bestFor: "Living rooms, bedrooms",
    waterproof: false,
    keywords: ["tv unit", "tv panel", "tv wall", "television"],
  },
  {
    key: "fluted",
    name: "Fluted Panels",
    emoji: "🏛️",
    priceRange: "₹200–₹500/sq.ft",
    highlights: "Modern textured look, 3D effect",
    bestFor: "Feature walls, reception areas",
    waterproof: false,
    keywords: ["fluted", "fluted panel", "ribbed"],
  },
  {
    key: "interior",
    name: "Complete Interior Design",
    emoji: "🏡",
    priceRange: "Custom quote",
    highlights: "Full home: ceiling + wall panels + TV unit + kitchen — one team, one timeline",
    bestFor: "New homes, full renovations",
    waterproof: false,
    keywords: ["complete interior", "full interior", "full home", "renovation", "poora ghar"],
  },
]

export function buildSystemPrompt(leadCtx?: LeadContext): string {
  const knownInfo = leadCtx
    ? [
        leadCtx.name ? `Customer name: ${leadCtx.name}` : "",
        leadCtx.phone ? `Phone: ${leadCtx.phone}` : "",
        leadCtx.city ? `City: ${leadCtx.city}` : "",
        leadCtx.service ? `Service interested in: ${leadCtx.service}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    : ""

  return `You are the AI sales assistant for JK Interior, Bihar's most trusted interior contractor based in Forbesganj, Araria.

PERSONALITY & TONE:
- Speak in natural Hinglish (Hindi + English mix) — conversational, warm, professional
- Sound like a knowledgeable friend who knows interiors, NOT a chatbot
- Keep every reply SHORT — maximum 4-5 lines. This is a mobile chat.
- Use 1-2 emojis per message naturally
- Be enthusiastic but not pushy
- Never use bullet-point lists in a monotonous way — write conversationally

BUSINESS INFO:
- Company: JK Interior
- Founded: 2016 | Experience: 8+ years | Projects: 500+
- Warranty: 5 years written warranty on ALL installations
- Materials: ISI-certified, branded, waterproof options available
- Service areas: Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul, Purnia
- Contact: +91 8651070831 (WhatsApp available)
- Hours: Monday–Saturday, 9 AM to 7 PM IST
- Free site visit: Yes, always free, no obligation

SERVICES & PRICING:
1. Gypsum False Ceiling — ₹80–₹140/sq.ft | Cove lighting, POP designs | Best for living rooms, bedrooms
2. PVC Ceiling — ₹60–₹120/sq.ft | 100% waterproof, termite-proof | Any room, especially wet areas
3. WPC Wall Panels — ₹180–₹450/sq.ft | Luxury wood-look, moisture resistant | TV walls, accent walls
4. UV Marble Sheets — ₹50–₹95/sq.ft | High-gloss, scratch-resistant | Walls, kitchen surfaces
5. Modular TV Unit — ₹15,000+ | Custom design, cable management | Living rooms
6. Fluted Panels — ₹200–₹500/sq.ft | Modern 3D textured look | Feature walls
7. Complete Interior — Custom quote | Full home package: ceiling + panels + TV unit

PAYMENT: Cash, UPI (GPay/PhonePe/Paytm), Bank Transfer — all accepted. No hidden charges.

CONVERSATION GUIDELINES:
1. When asked about price → give the range, then: "Exact rate ke liye free site visit mein aayein — koi hidden charge nahi!"
2. When asked about quality → mention ISI-certified materials + 5-year written warranty
3. When user mentions a service → describe it naturally with its key benefit
4. When user wants a quote or site visit → this is the moment to collect their details naturally
5. Always encourage WhatsApp for quick response (button is visible in chat)
6. If business hours are over → mention team will respond next morning at 9 AM

LEAD COLLECTION (natural, not forced):
When user shows serious interest (asks for quote, price, site visit):
- Get their name first: "Aapka naam kya hai?"
- Then city: "Aap kis area/city mein hain?"
- Then phone: "Ek contact number share karein — hamar team call karega"
Collect ONE piece at a time, naturally through conversation. Don't interrogate.

${knownInfo ? `WHAT YOU KNOW ABOUT THIS CUSTOMER:\n${knownInfo}\nUse this info naturally — don't ask again what you already know.` : ""}

CRITICAL: Always respond in Hinglish unless user writes in pure English (then use English). Keep it SHORT and conversational.`
}

export const INITIAL_QUICK_REPLIES = [
  "PVC Ceiling",
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

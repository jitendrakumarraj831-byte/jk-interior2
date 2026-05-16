/**
 * Intent Detection Engine
 * Detects user intent from input (Hindi/Hinglish)
 * Supports: pricing, booking, service inquiry, budget, material, etc.
 */

export type Intent =
  | "greeting"
  | "pricing"
  | "booking"
  | "material_inquiry"
  | "room_size"
  | "budget"
  | "complaint"
  | "follow_up"
  | "unknown"

export interface DetectedIntent {
  type: Intent
  confidence: number
  keywords: string[]
  context?: {
    material?: string
    service?: string
    budget?: number
  }
}

const INTENT_KEYWORDS: Record<Intent, string[]> = {
  greeting: [
    "hi",
    "hello",
    "hey",
    "namaste",
    "namaskar",
    "helo",
    "good morning",
    "good afternoon",
    "good evening",
    "hii",
    "salam",
    "kaise ho",
  ],
  pricing: [
    "price",
    "cost",
    "rate",
    "kimat",
    "daam",
    "kitna",
    "kharcha",
    "budget",
    "quote",
    "lagega",
    "estimate",
  ],
  booking: [
    "visit",
    "book",
    "site visit",
    "measurement",
    "quotation",
    "bulao",
    "aao",
    "free visit",
    "appointment",
    "booking",
    "confirm",
  ],
  material_inquiry: [
    "pvc",
    "gypsum",
    "pop",
    "wpc",
    "marble",
    "uv",
    "panel",
    "ceiling",
    "chhat",
  ],
  room_size: [
    "room",
    "dimensions",
    "size",
    "12x14",
    "feet",
    "ft",
    "x",
    "×",
    "by",
    "length",
    "width",
  ],
  budget: ["lakh", "lac", "hazar", "thousand", "k", "rupees"],
  complaint: ["issue", "problem", "broken", "not working", "quality"],
  follow_up: ["also", "aur", "plus", "more", "aur kya"],
  unknown: [],
}

/**
 * Detect intent from user message
 */
export function detectIntent(message: string): DetectedIntent {
  const text = message.toLowerCase().trim()
  const matched: Map<Intent, number> = new Map()

  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    let score = 0
    for (const kw of keywords) {
      if (text.includes(kw)) {
        score++
      }
    }
    if (score > 0) {
      matched.set(intent as Intent, score)
    }
  }

  if (matched.size === 0) {
    return {
      type: "unknown",
      confidence: 0,
      keywords: [],
    }
  }

  const sorted = Array.from(matched.entries()).sort(
    (a, b) => b[1] - a[1]
  )
  const topIntent = sorted[0]

  return {
    type: topIntent[0],
    confidence: Math.min(topIntent[1] / 5, 1),
    keywords: INTENT_KEYWORDS[topIntent[0]],
  }
}

/**
 * Check if message contains specific intent
 */
export function hasIntent(
  message: string,
  intent: Intent
): boolean {
  const text = message.toLowerCase()
  return INTENT_KEYWORDS[intent].some((kw) => text.includes(kw))
}

/**
 * Extract keywords from message for context
 */
export function extractKeywords(message: string): string[] {
  const text = message.toLowerCase()
  const keywordSet = new Set<string>()

  for (const intents of Object.values(INTENT_KEYWORDS)) {
    for (const kw of intents) {
      if (text.includes(kw)) {
        keywordSet.add(kw)
      }
    }
  }

  return Array.from(keywordSet)
}

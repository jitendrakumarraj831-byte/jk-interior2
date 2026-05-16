/**
 * Fallback Response Generator
 * Natural, helpful responses when intent is unclear or AI fails
 */

import { getMaterialByKeyword, formatMaterialInfo } from "./knowledge"

export interface FallbackContext {
  userName?: string
  isOffHours: boolean
  messageLength: number
  hasContext: boolean
}

/**
 * Generate natural fallback response
 */
export function generateFallback(
  input: string,
  context: FallbackContext
): string {
  const text = input.toLowerCase().trim()
  const { userName, isOffHours, hasContext } = context

  const greeting = userName ? `${userName} ji, ` : ""

  // Check for material keyword
  const material = getMaterialByKeyword(text)
  if (material) {
    return formatMaterialInfo(material)
  }

  // Check for pricing question but unclear material
  if (/price|cost|rate|kimat|daam|kitna/i.test(text)) {
    return `
💰 **JK Interior – Quick Price Guide**

✨ Gypsum Ceiling — ₹80–140/sq.ft
🏠 PVC Ceiling — ₹60–120/sq.ft
🪵 WPC Wall Panels — ₹180–450/sq.ft
💎 UV Marble Sheets — ₹50–95/sq.ft
📺 Modular TV Unit — ₹15,000+

**Which one interests you?** Or tell me your room size (e.g., 12×14) for an exact estimate!
`.trim()
  }

  // Check for booking intent
  if (
    /visit|book|appointment|bulao|aao/i.test(text)
  ) {
    return isOffHours
      ? `${greeting}Office is currently closed 🌙\n\nOur team will contact you tomorrow at 9 AM.\n\nUrgent? WhatsApp: +91 8651070831`
      : `${greeting}Ready to schedule a free site visit!\n\n📅 **Free Measurement & Quote**\n📞 Call/WhatsApp: +91 8651070831\n💬 Or tell me your preferred date & time!`
  }

  // Check for dimensions
  if (/\d+\s*[x×]\s*\d+|feet|ft|length/i.test(text)) {
    return `📐 Got your room size! Let me know:\n\n• What type of work? (ceiling, walls, TV unit, etc.)\n• Which material interests you? (PVC, Gypsum, WPC, etc.)\n\nI'll calculate the exact cost instantly!`
  }

  // Default helpful response
  return hasContext
    ? `${greeting}I'm here to help! You can ask me about:\n\n✨ Materials (PVC, Gypsum, WPC, UV Marble)\n💰 Pricing & estimates\n📏 Room design ideas\n📞 Booking a site visit\n\nWhat would you like to know?`
    : `👋 **Hi${userName ? ", " + userName : ""}! I'm Riya, your AI interior consultant.**\n\nI can help with:\n• Material recommendations\n• Price estimates\n• Room designs\n• Booking a free site visit\n\n**Start by telling me your room size** (e.g., "12 by 14 feet") or ask about any material!`
}

/**
 * Generate off-hours message
 */
export function getOffHoursMessage(userName?: string): string {
  const greeting = userName ? `${userName} ji, ` : ""
  return `${greeting}Our office is currently closed 🌙\n\nWe'll contact you tomorrow at 9 AM.\n\n**Urgent?** WhatsApp/Call: +91 8651070831`
}

/**
 * Generate contextual tip based on previous conversation
 */
export function getContextualTip(
  lastBotMessage: string,
  messageCount: number
): string {
  if (messageCount < 3) {
    return "💡 **Tip:** Share your room dimensions for an exact quote!"
  }

  if (/price|rate|cost/i.test(lastBotMessage)) {
    return "💡 **Next step:** Book a free site visit for an expert consultation!"
  }

  if (/material|service/i.test(lastBotMessage)) {
    return "💡 **Helpful tip:** Different materials work best for different rooms. What space are we designing?"
  }

  return ""
}

/**
 * Fallback Response Generator v2.0
 * Context-aware, natural Hindi-English responses when intent is unclear or AI fails
 * 
 * Key improvements:
 * - Maintains conversation context
 * - Natural Hindi tone (not robotic)
 * - Doesn't reset greeting mid-conversation
 * - Asks relevant follow-up questions
 */

import { getMaterialByKeyword, formatMaterialInfo } from "./knowledge"

export interface FallbackContext {
  userName?: string
  isOffHours: boolean
  messageLength: number
  hasContext: boolean
  // NEW: Enhanced context fields
  lastTopic?: string
  lastIntent?: string
  lastMaterial?: string
  city?: string
  roomType?: string
  roomSize?: string
  messagesExchanged?: number
  conversationStage?: string
}

const WA = "+91 8651070831"

/**
 * Generate natural fallback response
 * Stays contextual and doesn't break conversation flow
 */
export function generateFallback(
  input: string,
  context: FallbackContext
): string {
  const text = input.toLowerCase().trim()
  const { userName, isOffHours, hasContext, messagesExchanged = 0 } = context

  const nm = userName ? `${userName} ji` : ""
  const greeting = userName ? `${userName} ji, ` : ""

  // Check for material keyword - give info immediately
  const material = getMaterialByKeyword(text)
  if (material) {
    return formatMaterialInfo(material)
  }

  // ─── CONTEXT-AWARE RESPONSES ───
  // If we have active topic, stay on topic instead of generic fallback
  
  if (context.lastTopic) {
    const topicNames: Record<string, string> = {
      pvc: "PVC Ceiling",
      gypsum: "Gypsum Ceiling",
      wpc: "WPC Wall Panels",
      uv: "UV Marble Sheets",
      tvunit: "Modular TV Unit",
      grid: "Grid Ceiling",
      fluted: "Fluted Panels",
    }
    const topicName = topicNames[context.lastTopic] || context.lastTopic

    // If we have room size, prompt for booking
    if (context.roomSize) {
      return `${topicName} ke liye ${context.roomSize} room — estimate ready hai! 👍\n\nFree site visit book karein?\n\n📞 WhatsApp: **${WA}**`
    }

    // Ask for room size if missing
    return `${topicName} ke baare mein aur jaanna hai?\n\nRoom ka size bata dijiye (jaise 12×14) — exact estimate nikaaluun! 📐`
  }

  // If we have city but no topic
  if (context.city && !context.lastTopic) {
    return `**${context.city}** mein karte hain! 💪\n\nKaunsa kaam karwana chahte hain${nm ? ` ${nm}` : ""}?\n\n• Ceiling (PVC/Gypsum)\n• Wall Panels (WPC/UV)\n• TV Unit`
  }

  // If we have room type but no material
  if (context.roomType && !context.lastTopic) {
    return `${context.roomType} ke liye best options:\n\n✨ **Gypsum Ceiling** — premium cove lighting\n🏠 **PVC Ceiling** — waterproof, budget-friendly\n\nKaunsa try karna chahenge? Room size bhi batao! 📐`
  }

  // ─── INTENT-BASED RESPONSES ───

  // Check for pricing question but unclear material
  if (/price|cost|rate|kimat|daam|kitna/i.test(text)) {
    return `
💰 **Price Guide**

✨ Gypsum — ₹80–140/sq.ft
🏠 PVC — ₹60–120/sq.ft
🪵 WPC Panels — ₹180–450/sq.ft
💎 UV Marble — ₹50–95/sq.ft
📺 TV Unit — ₹15,000+

Kaunse kaam ka rate chahiye? Ya room size batao (jaise 12×14)! 📐
`.trim()
  }

  // Check for booking intent
  if (/visit|book|appointment|bulao|aao|meeting|milna/i.test(text)) {
    return isOffHours
      ? `${greeting}Abhi office band hai 🌙\n\nTeam kal 9 AM pe contact karegi.\n\nUrgent? WhatsApp: **${WA}**`
      : `${greeting}Free site visit bilkul free hai! 👍\n\n📞 Call/WhatsApp: **${WA}**\n\nYa preferred time batao — team set karte hain!`
  }

  // Check for dimensions in message
  if (/\d+\s*[x×]\s*\d+|feet|ft|length/i.test(text)) {
    return `Room size mila! 📐\n\nKaunsa kaam karwana hai?\n\n• Ceiling (PVC/Gypsum)\n• Wall Panels (WPC/UV)\n• TV Unit\n\nBatao — estimate abhi nikaaluun!`
  }

  // ─── CONVERSATION STAGE AWARE ───
  
  // Don't send full intro if we're past greeting stage
  if (messagesExchanged > 2 && hasContext) {
    return `${nm ? `${nm}, ` : ""}Aur kya jaanna chahte ho?\n\n• Material options\n• Price estimate\n• Room design ideas\n• Free site visit\n\nBatao! 😊`
  }

  // Default helpful response for established conversations
  if (hasContext) {
    return `${greeting}Main help karti hoon! Aap poochh sakte hain:\n\n✨ Materials ke baare mein\n💰 Price estimate\n📏 Design ideas\n📞 Site visit booking\n\nKya jaanna hai?`
  }
  
  // First-time/new conversation intro
  return `👋 **Namaste${userName ? ` ${userName}` : ""}! Main Riya hoon — JK Interior se.**\n\nMain help kar sakti hoon:\n\n• Material recommendations\n• Price estimates (room size se)\n• Design suggestions\n• Free site visit booking\n\nRoom ka size batao (jaise 12×14) ya koi sawaal poochho! 😊`
}

/**
 * Generate off-hours message with context
 */
export function getOffHoursMessage(userName?: string, lastTopic?: string): string {
  const nm = userName ? `${userName} ji, ` : ""
  const topicNote = lastTopic ? `\n\n${lastTopic} ke baare mein kal baat karte hain!` : ""
  
  return `${nm}Abhi office band hai 🌙${topicNote}\n\nTeam kal 9 AM pe contact karegi.\n\n**Urgent?** WhatsApp: **${WA}**`
}

/**
 * Generate contextual tip based on conversation state
 */
export function getContextualTip(context: FallbackContext): string {
  const { lastTopic, roomSize, messagesExchanged = 0 } = context

  // Early conversation - prompt for room size
  if (messagesExchanged < 3 && !roomSize) {
    return "💡 Room ka size batao (jaise 12×14) — exact estimate nikaalte hain!"
  }

  // Have topic and size - prompt for booking
  if (lastTopic && roomSize) {
    return "💡 Free site visit book karein — exact quote milega!"
  }

  // Have topic but no size
  if (lastTopic && !roomSize) {
    return "💡 Room ka size batao — instant estimate!"
  }

  // Mid conversation
  if (messagesExchanged >= 3) {
    return "💡 WhatsApp pe baat karna ho — +91 8651070831"
  }

  return ""
}

/**
 * Generate smart continuation message based on what user might need next
 */
export function getSmartContinuation(context: FallbackContext): string {
  const { lastTopic, lastIntent, roomSize, city } = context

  // After estimate, suggest booking
  if (lastIntent === "room-estimate" || lastIntent === "pricing") {
    if (roomSize) {
      return "Free site visit book karein? Exact measurement pe final quote milega! 📞"
    }
    return "Room ka size batao (jaise 12×14) — abhi estimate nikaaluun!"
  }

  // After material discussion, ask for size
  if (lastTopic && !roomSize) {
    return "Is room ka size batao — instant estimate!"
  }

  // After city confirmation, ask about work
  if (city && !lastTopic) {
    return "Kaunsa kaam karwana hai? Ceiling, wall panels ya TV unit?"
  }

  return ""
}

import { type ConversationContext } from './consultant-engine'

/**
 * Enhanced context engine for handling follow-up messages and conversation continuity.
 * Resolves short replies like "Araria me", "PVC", "kitna lagega" in the context of previous messages.
 */

export interface FollowUpContext {
  lastIntent?: string
  lastMaterial?: string
  lastCity?: string
  lastRoomType?: string
  lastBudget?: string
  lastTopic?: string
  messagesSinceGreeting?: number
  isInActivePricing?: boolean
  isInActiveLead?: boolean
}

/**
 * Resolve follow-up intent based on previous context.
 * Handles short replies that should be understood in context of previous message.
 *
 * Examples:
 * - User: "Gypsum false ceiling price kya hai" → lastMaterial = "gypsum"
 * - User: "Araria me" → lastCity = "araria" (continues pricing)
 * - User: "1 room" → lastRoomType = "bedroom" (continues pricing)
 * - User: "haan" → confirms booking if in lead flow
 */
export function resolveFollowUpIntent(
  message: string,
  context: FollowUpContext
): { intent: string; confidence: number; reason: string } {
  const text = message.toLowerCase().trim()

  // Empty message - likely error
  if (!text) {
    return { intent: 'unknown', confidence: 0, reason: 'Empty message' }
  }

  // Short city references (follow-up from pricing context)
  if (context.isInActivePricing && context.lastMaterial) {
    const cityMatch = detectCityFromShortReply(text)
    if (cityMatch) {
      return {
        intent: 'pricing_continuation',
        confidence: 0.85,
        reason: `City "${cityMatch}" detected in pricing context (last material: ${context.lastMaterial})`,
      }
    }
  }

  // Short room type references
  if (context.isInActivePricing && /^(1|2|3|4|5)\s*(room|bhk|bedroom|kamra)/.test(text)) {
    return {
      intent: 'pricing_continuation',
      confidence: 0.85,
      reason: 'Room count/type detected in pricing context',
    }
  }

  // Material name only (already in context)
  if (context.isInActivePricing && isMaterialName(text)) {
    return {
      intent: 'material_change',
      confidence: 0.8,
      reason: `Material name "${text}" detected, switching material`,
    }
  }

  // Affirmation/negation in lead context
  if (context.isInActiveLead && /^(haan|yes|ok|bilkul|sahi|theek|nahi|no|nahi\s*chahiye)$/.test(text)) {
    return {
      intent: 'lead_confirmation',
      confidence: 0.75,
      reason: `Affirmation/negation "${text}" in lead context`,
    }
  }

  // "Kitna lagega" (how much will it cost) - continue pricing
  if (context.isInActivePricing && /kitna\s*(lag|hoga|le|cost)/.test(text)) {
    return {
      intent: 'pricing_continuation',
      confidence: 0.75,
      reason: 'Cost inquiry in pricing context',
    }
  }

  // "Premium", "basic", "economical" in pricing context
  if (context.isInActivePricing && /^(premium|basic|economical|luxury|budget|mid-range)$/i.test(text)) {
    return {
      intent: 'pricing_continuation',
      confidence: 0.75,
      reason: `Pricing tier "${text}" specified in context`,
    }
  }

  // Default: unknown follow-up
  return {
    intent: 'unknown',
    confidence: 0,
    reason: 'No context match for follow-up message',
  }
}

/**
 * Detect city from short replies like "Araria me", "Patna mein", "Bihar"
 */
function detectCityFromShortReply(text: string): string | null {
  // Common city names
  const cities: { [key: string]: string } = {
    araria: 'araria',
    patna: 'patna',
    forbesganj: 'forbesganj',
    bihar: 'bihar',
    delhi: 'delhi',
    mumbai: 'mumbai',
    bangalore: 'bangalore',
    hyderabad: 'hyderabad',
    pune: 'pune',
    kolkata: 'kolkata',
    ahmedabad: 'ahmedabad',
    chennai: 'chennai',
    jaipur: 'jaipur',
    lucknow: 'lucknow',
    kanpur: 'kanpur',
  }

  // Match pattern like "Araria me", "Patna mein", "Delhi me"
  const match = text.match(/^(\w+)\s+(me|mein|main|में)/)
  if (match) {
    const city = match[1].toLowerCase()
    return cities[city] || city
  }

  // Direct city name
  for (const [key, value] of Object.entries(cities)) {
    if (text === key) return value
  }

  return null
}

/**
 * Check if text is a material name
 */
function isMaterialName(text: string): boolean {
  const materials = [
    'gypsum',
    'pvc',
    'wpc',
    'uv',
    'tvunit',
    'tv',
    'unit',
    'fluted',
    'grid',
    'acoustic',
    'flooring',
    'wallpaper',
    'false',
    'ceiling',
    'wall',
    'panel',
    'door',
    'frame',
  ]
  return materials.some((m) => text.includes(m))
}

/**
 * Update conversation context with detected information.
 * Safe helper that only updates fields that are explicitly provided.
 */
export function updateConversationContext(
  context: FollowUpContext,
  updates: Partial<FollowUpContext>
): FollowUpContext {
  return {
    ...context,
    ...updates,
    messagesSinceGreeting: (context.messagesSinceGreeting || 0) + 1,
  }
}

/**
 * Check if greeting should be shown.
 * Greeting shown only for first message or explicit hello/hi.
 * Prevents greeting resets mid-conversation.
 */
export function shouldShowGreeting(
  message: string,
  messagesSinceGreeting: number = 0,
  isNewConversation: boolean = false
): boolean {
  const text = message.toLowerCase().trim()

  // Always show for first message
  if (messagesSinceGreeting === 0 || isNewConversation) {
    return true
  }

  // Show for explicit greetings only if already in conversation
  const greetingPatterns = /^(hi|hello|hey|namaste|namaskar|hii|hiii|assalamualaikum)[\s!]*$/
  if (greetingPatterns.test(text)) {
    return true
  }

  // Don't show mid-conversation
  return false
}

/**
 * Get the active topic based on conversation context.
 * Returns the most relevant context field.
 */
export function getActiveTopic(context: FollowUpContext): string | null {
  if (context.isInActivePricing && context.lastMaterial) {
    return context.lastMaterial
  }
  if (context.lastCity) {
    return context.lastCity
  }
  if (context.lastRoomType) {
    return context.lastRoomType
  }
  if (context.lastTopic) {
    return context.lastTopic
  }
  return null
}

/**
 * Reset context for new conversation.
 * Called when user explicitly starts fresh or after greeting reset.
 */
export function resetFollowUpContext(): FollowUpContext {
  return {
    lastIntent: undefined,
    lastMaterial: undefined,
    lastCity: undefined,
    lastRoomType: undefined,
    lastBudget: undefined,
    lastTopic: undefined,
    messagesSinceGreeting: 0,
    isInActivePricing: false,
    isInActiveLead: false,
  }
}

/**
 * Merge follow-up context with standard ConversationContext.
 * Allows using enhanced context features with existing memory system.
 */
export function mergeContexts(
  standardContext: ConversationContext,
  followUpContext: FollowUpContext
): ConversationContext {
  return {
    ...standardContext,
    lastTopic: followUpContext.lastTopic || standardContext.lastTopic,
  }
}

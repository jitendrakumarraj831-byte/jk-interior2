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
  // NEW: Critical fields for smart conversation flow
  lastQuestionAsked?: 'room_size' | 'room_type' | 'city' | 'budget' | 'material' | 'phone' | 'name' | null
  lastEstimateFlow?: {
    active: boolean
    material?: string
    roomSize?: string
    step: 'asking_material' | 'asking_size' | 'showing_estimate' | 'asking_booking'
  }
  conversationStage?: 'greeting' | 'discovery' | 'consultation' | 'estimation' | 'booking'
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
 * - User: "12x14" → dimensions for estimate
 * - User: "PVC" → material selection
 * - User: "sasta" → budget preference
 */
export function resolveFollowUpIntent(
  message: string,
  context: FollowUpContext
): { intent: string; confidence: number; reason: string; extractedData?: Record<string, string> } {
  const text = message.toLowerCase().trim()

  // Empty message - likely error
  if (!text) {
    return { intent: 'unknown', confidence: 0, reason: 'Empty message' }
  }

  // NEW: Handle dimension-only replies (highest priority for estimate flow)
  const dimMatch = text.match(/^(\d{1,3})\s*(?:[x×X]|\bby\b)\s*(\d{1,3})$/)
  if (dimMatch) {
    return {
      intent: 'dimension_reply',
      confidence: 0.95,
      reason: `Dimensions "${dimMatch[1]}x${dimMatch[2]}" provided - likely answering size question`,
      extractedData: { roomSize: `${dimMatch[1]}x${dimMatch[2]}` }
    }
  }

  // NEW: Handle short dimension replies with "feet/ft" suffix
  const dimWithUnit = text.match(/^(\d{1,3})\s*(?:[x×X]|\bby\b)\s*(\d{1,3})\s*(feet|ft|foot)?$/)
  if (dimWithUnit) {
    return {
      intent: 'dimension_reply',
      confidence: 0.95,
      reason: `Dimensions with unit detected`,
      extractedData: { roomSize: `${dimWithUnit[1]}x${dimWithUnit[2]}` }
    }
  }

  // NEW: Handle short affirmations/negations universally (not just in lead context)
  if (/^(haan|yes|ok|bilkul|sahi|theek|ha|ji|hnji|hn|hmm|accha|acha|thik|theek\s*hai)$/i.test(text)) {
    // Check what was the last question asked
    if (context.lastQuestionAsked === 'room_size') {
      return {
        intent: 'affirmation_needs_size',
        confidence: 0.7,
        reason: 'User said yes but we asked for room size - re-ask gently'
      }
    }
    if (context.lastEstimateFlow?.active) {
      return {
        intent: 'estimate_continuation',
        confidence: 0.8,
        reason: 'User confirmed in estimate flow'
      }
    }
    if (context.isInActiveLead) {
      return {
        intent: 'lead_confirmation',
        confidence: 0.85,
        reason: 'Affirmation in lead context'
      }
    }
    return {
      intent: 'general_affirmation',
      confidence: 0.6,
      reason: 'User said yes - continue last topic'
    }
  }

  // NEW: Handle negations
  if (/^(nahi|no|nope|na|nhi|mat|cancel|rehne\s*do|chord|chhod)$/i.test(text)) {
    return {
      intent: 'negation',
      confidence: 0.8,
      reason: 'User declined - may want to change topic or end flow'
    }
  }

  // Short city references (follow-up from ANY context with lastTopic)
  const cityMatch = detectCityFromShortReply(text)
  if (cityMatch) {
    // If we have an active topic, continue with city
    if (context.lastTopic || context.lastMaterial || context.isInActivePricing) {
      return {
        intent: 'city_with_topic_continuation',
        confidence: 0.9,
        reason: `City "${cityMatch}" detected - continuing with topic "${context.lastTopic || context.lastMaterial}"`,
        extractedData: { city: cityMatch }
      }
    }
    return {
      intent: 'city_inquiry',
      confidence: 0.75,
      reason: `City "${cityMatch}" detected - checking service availability`,
      extractedData: { city: cityMatch }
    }
  }

  // Short room type references
  if (/^(1|2|3|4|5)\s*(room|bhk|bedroom|kamra|kamre)s?$/i.test(text)) {
    return {
      intent: 'room_count_reply',
      confidence: 0.85,
      reason: 'Room count detected - user specifying number of rooms'
    }
  }

  // NEW: Handle short room type names
  if (/^(hall|bedroom|kitchen|bathroom|balcony|office|drawing\s*room|living\s*room|pooja|mandir)$/i.test(text)) {
    return {
      intent: 'room_type_reply',
      confidence: 0.85,
      reason: `Room type "${text}" detected`,
      extractedData: { roomType: text }
    }
  }

  // Material name only - check if it's a material change or continuation
  if (isMaterialName(text)) {
    return {
      intent: 'material_selection',
      confidence: 0.85,
      reason: `Material "${text}" selected`,
      extractedData: { material: text }
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
  if (/kitna\s*(lag|hoga|le|cost|paisa|rupay|rs|padega)/i.test(text)) {
    return {
      intent: 'price_inquiry_continuation',
      confidence: 0.85,
      reason: 'Cost inquiry - continue with last topic or ask for details'
    }
  }

  // NEW: Handle budget preference replies
  if (/^(sasta|cheap|budget|kam|minimum|basic|economical)$/i.test(text)) {
    return {
      intent: 'budget_preference',
      confidence: 0.85,
      reason: 'User prefers budget/economical option',
      extractedData: { budget: 'low' }
    }
  }

  if (/^(premium|luxury|best|accha|acha|high\s*end|mahnga|expensive)$/i.test(text)) {
    return {
      intent: 'budget_preference',
      confidence: 0.85,
      reason: 'User prefers premium option',
      extractedData: { budget: 'high' }
    }
  }

  // NEW: Handle waterproof preference
  if (/^(waterproof|water\s*proof|paani\s*wala|moisture|humidity)$/i.test(text)) {
    return {
      intent: 'waterproof_preference',
      confidence: 0.85,
      reason: 'User needs waterproof option'
    }
  }

  // "Premium", "basic", "economical" in pricing context
  if (context.isInActivePricing && /^(premium|basic|economical|luxury|budget|mid-range)$/i.test(text)) {
    return {
      intent: 'pricing_tier_selection',
      confidence: 0.75,
      reason: `Pricing tier "${text}" specified in context`,
    }
  }

  // NEW: Handle "ke liye" pattern - "bedroom ke liye", "kitchen ke liye"
  const keLiyeMatch = text.match(/^(\w+)\s*(ke\s*liye|k\s*liye|keliye)$/i)
  if (keLiyeMatch) {
    const roomOrMaterial = keLiyeMatch[1].toLowerCase()
    if (/^(hall|bedroom|kitchen|bathroom|balcony|office|drawing|living|pooja|mandir)$/i.test(roomOrMaterial)) {
      return {
        intent: 'room_specific_inquiry',
        confidence: 0.85,
        reason: `"${roomOrMaterial} ke liye" - room-specific inquiry`,
        extractedData: { roomType: roomOrMaterial }
      }
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
 * Extended to handle more patterns and Hindi variations
 */
function detectCityFromShortReply(text: string): string | null {
  // Common city names - extended list
  const cities: { [key: string]: string } = {
    araria: 'Araria',
    arariya: 'Araria',
    patna: 'Patna',
    forbesganj: 'Forbesganj',
    farbisganj: 'Forbesganj',
    forbesgunj: 'Forbesganj',
    bihar: 'Bihar',
    delhi: 'Delhi',
    mumbai: 'Mumbai',
    bangalore: 'Bangalore',
    hyderabad: 'Hyderabad',
    pune: 'Pune',
    kolkata: 'Kolkata',
    ahmedabad: 'Ahmedabad',
    chennai: 'Chennai',
    jaipur: 'Jaipur',
    lucknow: 'Lucknow',
    kanpur: 'Kanpur',
    purnia: 'Purnia',
    purnea: 'Purnia',
    kishanganj: 'Kishanganj',
    katihar: 'Katihar',
    narpatganj: 'Narpatganj',
    raniganj: 'Raniganj',
    jogbani: 'Jogbani',
    supaul: 'Supaul',
    chhatapur: 'Chhatapur',
    tribeniganj: 'Tribeniganj',
    bhargama: 'Bhargama',
    palasi: 'Palasi',
    kursakanta: 'Kursakanta',
    muzaffarpur: 'Muzaffarpur',
    bhagalpur: 'Bhagalpur',
    darbhanga: 'Darbhanga',
    gaya: 'Gaya',
  }

  // Match pattern like "Araria me", "Patna mein", "Delhi me", "Araria mein karwana hai"
  const patterns = [
    /^(\w+)\s+(me|mein|main|में|mai)(\s|$)/i,
    /^(\w+)\s+(se|में\s*se)(\s|$)/i,
    /^(\w+)\s+mein\s+(kar|karwa|chahiye|kara)/i,
  ]
  
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      const city = match[1].toLowerCase()
      if (cities[city]) return cities[city]
    }
  }

  // Direct city name match (just the city name)
  const words = text.split(/\s+/)
  for (const word of words) {
    const normalized = word.toLowerCase().replace(/[^a-z]/g, '')
    if (cities[normalized]) return cities[normalized]
  }

  return null
}

/**
 * Check if text is a material name
 * Extended to handle more material variations
 */
function isMaterialName(text: string): boolean {
  const materialPatterns = [
    /^pvc$/i,
    /^gypsum$/i,
    /^pop$/i,
    /^wpc$/i,
    /^uv$/i,
    /^marble$/i,
    /^uv\s*marble$/i,
    /^tvunit$/i,
    /^tv\s*unit$/i,
    /^fluted$/i,
    /^grid$/i,
    /^acoustic$/i,
    /^flooring$/i,
    /^wallpaper$/i,
    /^false\s*ceiling$/i,
    /^ceiling$/i,
    /^wall\s*panel$/i,
    /^panel$/i,
    /^louver$/i,
    /^laminate$/i,
    /^led$/i,
    /^artificial\s*grass$/i,
  ]
  return materialPatterns.some(p => p.test(text.trim()))
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
 * 
 * IMPORTANT: This is the primary guard against greeting reset problem.
 * Only return true when user EXPLICITLY wants a greeting interaction.
 */
export function shouldShowGreeting(
  message: string,
  messagesSinceGreeting: number = 0,
  isNewConversation: boolean = false,
  lastIntent?: string
): boolean {
  const text = message.toLowerCase().trim()

  // Always show for truly first message
  if (messagesSinceGreeting === 0 && isNewConversation) {
    return true
  }

  // ONLY show greeting for EXPLICIT standalone greetings
  // These patterns must be the ENTIRE message, not part of a longer sentence
  const explicitGreetingOnly = /^(hi|hello|hey|namaste|namaskar|hii|hiii|salam|assalamualaikum|jai\s*hind|pranam)[\s!.]*$/i
  
  if (explicitGreetingOnly.test(text)) {
    return true
  }

  // DO NOT show greeting if:
  // 1. Message contains other context (city, room, material, size, etc.)
  // 2. User is continuing a conversation (messagesSinceGreeting > 0)
  // 3. Last intent was anything meaningful (pricing, booking, etc.)
  
  // Check if message has other meaningful content
  const hasOtherContent = 
    /\d/.test(text) || // has numbers (room count, size, etc.)
    /(price|rate|kitna|lagega|room|bedroom|hall|kitchen|ceiling|pvc|gypsum|wpc|estimate)/i.test(text) ||
    detectCityFromShortReply(text) !== null ||
    isMaterialName(text.split(/\s+/)[0] || '')

  if (hasOtherContent) {
    return false
  }

  // If we're past the initial greeting phase, don't reset
  if (messagesSinceGreeting > 2) {
    return false
  }

  // If last intent was meaningful, don't interrupt with greeting
  const meaningfulIntents = ['pricing', 'room-estimate', 'booking', 'waterproof', 'design', 'installation', 'area']
  if (lastIntent && meaningfulIntents.includes(lastIntent)) {
    return false
  }

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
    lastQuestionAsked: null,
    lastEstimateFlow: undefined,
    conversationStage: 'greeting',
  }
}

/**
 * Check if a message is an explicit greeting (to be shown greeting response)
 * vs a greeting that's part of a larger message (should continue conversation)
 */
export function isExplicitGreetingOnly(message: string): boolean {
  const text = message.toLowerCase().trim()
  // Must be ONLY a greeting word/phrase, nothing else
  return /^(hi|hello|hey|namaste|namaskar|hii|hiii|salam|assalamualaikum|jai\s*hind|pranam|hlo|helo|good\s*(morning|evening|afternoon))[\s!.]*$/i.test(text)
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

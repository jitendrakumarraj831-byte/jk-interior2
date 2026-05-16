/**
 * Conversation Context Manager
 * Tracks user preferences, room details, and conversation state
 */

export interface UserContext {
  name?: string
  phone?: string
  city?: string
  service?: string
  budget?: "low" | "mid" | "high"
  roomType?: string
  roomSize?: string
  estimateShown?: boolean
  visitBooked?: boolean
}

export interface ConversationState {
  messageCount: number
  hasExchangedGreetings: boolean
  lastIntentType?: string
  lastMaterial?: string
  lastTopic?: string
  userAskedForPrice: boolean
  userAskedForEstimate: boolean
  messagesWithoutContext: number
}

/**
 * Initialize fresh context
 */
export function createUserContext(): UserContext {
  return {}
}

/**
 * Initialize fresh conversation state
 */
export function createConversationState(): ConversationState {
  return {
    messageCount: 0,
    hasExchangedGreetings: false,
    userAskedForPrice: false,
    userAskedForEstimate: false,
    messagesWithoutContext: 0,
  }
}

/**
 * Update context based on new message
 */
export function updateUserContext(
  context: UserContext,
  message: string,
  detectedData?: {
    name?: string
    city?: string
    service?: string
    roomSize?: string
  }
): UserContext {
  const updated = { ...context }

  if (detectedData?.name && !updated.name) {
    updated.name = detectedData.name
  }

  if (detectedData?.city && !updated.city) {
    updated.city = detectedData.city
  }

  if (detectedData?.service && !updated.service) {
    updated.service = detectedData.service
  }

  if (detectedData?.roomSize && !updated.roomSize) {
    updated.roomSize = detectedData.roomSize
  }

  // Detect budget level from message
  if (/budget|affordable|cheap|expensive|premium/i.test(message)) {
    if (/cheap|budget|affordable|sasta/i.test(message)) {
      updated.budget = "low"
    } else if (/premium|luxury|expensive|mehnga/i.test(message)) {
      updated.budget = "high"
    }
  }

  return updated
}

/**
 * Update conversation state
 */
export function updateConversationState(
  state: ConversationState,
  message: string,
  intentType?: string
): ConversationState {
  const updated = { ...state }

  updated.messageCount++

  if (
    /hi|hello|hey|namaste|good morning/i.test(message)
  ) {
    updated.hasExchangedGreetings = true
  }

  if (intentType) {
    updated.lastIntentType = intentType
  }

  if (/price|cost|rate|estimate/i.test(message)) {
    updated.userAskedForPrice = true
  }

  if (/dimension|size|feet|ft|x|×/i.test(message)) {
    updated.userAskedForEstimate = true
  }

  if (message.length < 20) {
    updated.messagesWithoutContext++
  } else {
    updated.messagesWithoutContext = 0
  }

  return updated
}

/**
 * Check if we should ask for missing info
 */
export function shouldAskForInfo(
  context: UserContext,
  state: ConversationState
): string | null {
  if (
    !context.name &&
    state.messageCount > 2 &&
    state.hasExchangedGreetings
  ) {
    return "name"
  }

  if (
    !context.roomSize &&
    state.userAskedForEstimate &&
    state.messageCount > 3
  ) {
    return "roomSize"
  }

  if (
    !context.phone &&
    state.userAskedForPrice &&
    state.messageCount > 4
  ) {
    return "phone"
  }

  return null
}

/**
 * Format context summary for AI system prompt
 */
export function formatContextForAI(
  context: UserContext,
  state: ConversationState
): string {
  const parts: string[] = []

  if (context.name) {
    parts.push(`User: ${context.name}`)
  }

  if (context.city) {
    parts.push(`Location: ${context.city}`)
  }

  if (context.roomSize) {
    parts.push(`Room Size: ${context.roomSize}`)
  }

  if (context.service) {
    parts.push(`Service Interest: ${context.service}`)
  }

  if (context.budget) {
    const budgetLabel = {
      low: "Budget-friendly",
      mid: "Mid-range",
      high: "Premium/Luxury",
    }
    parts.push(`Budget: ${budgetLabel[context.budget]}`)
  }

  if (state.userAskedForPrice) {
    parts.push("User is interested in pricing")
  }

  if (state.userAskedForEstimate) {
    parts.push("User has requested an estimate")
  }

  return parts.length > 0
    ? parts.join(" • ")
    : "No specific context yet"
}

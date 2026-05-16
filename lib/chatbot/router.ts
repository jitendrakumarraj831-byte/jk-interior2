/**
 * Chat Router
 * Routes messages to appropriate handlers based on intent
 */

import type { Intent, DetectedIntent } from "./intent"

export interface RouteContext {
  intent: Intent
  confidence: number
  shouldUseAI: boolean
  shouldUseFallback: boolean
  handler: string
}

/**
 * Determine if message should be handled by AI or local rules
 */
export function routeMessage(
  detectedIntent: DetectedIntent,
  messageLength: number
): RouteContext {
  const { type: intent, confidence } = detectedIntent

  // Simple intents can be handled locally
  const localHandlingIntents: Intent[] = [
    "greeting",
    "pricing",
    "material_inquiry",
  ]

  const shouldUseLocal = localHandlingIntents.includes(
    intent
  )
  const shouldUseAI =
    !shouldUseLocal || confidence < 0.5 || messageLength > 100

  return {
    intent,
    confidence,
    shouldUseAI,
    shouldUseFallback: confidence < 0.3,
    handler: shouldUseAI ? "groq" : "local",
  }
}

/**
 * Determine if follow-up questions need context from previous messages
 */
export function needsConversationContext(
  intent: Intent,
  messageLength: number
): boolean {
  const contextIntents: Intent[] = [
    "follow_up",
    "complaint",
    "booking",
  ]

  return contextIntents.includes(intent) || messageLength > 150
}

/**
 * Get handler name for logging/debugging
 */
export function getHandlerName(intent: Intent): string {
  const handlerMap: Record<Intent, string> = {
    greeting: "greeting_handler",
    pricing: "pricing_handler",
    booking: "booking_handler",
    material_inquiry: "material_handler",
    room_size: "dimension_handler",
    budget: "budget_handler",
    complaint: "complaint_handler",
    follow_up: "context_handler",
    unknown: "fallback_handler",
  }

  return handlerMap[intent]
}

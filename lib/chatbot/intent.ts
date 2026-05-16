import { ConversationState } from "./context";
import { ConversationGoal } from "@/lib/types";

// A simple regex-based intent detection.
// In a real-world scenario, this would be a more sophisticated NLU model.
const intentMatchers = [
    { intent: 'greeting', regex: /\b(hello|hi|hey|namaste|salaam)\b/i },
    { intent: 'get_estimate', regex: /\b(estimate|price|cost|kharcha|bhav|rate|budget)\b/i },
    { intent: 'material_info', regex: /\b(material|types|options|pvc|gypsum|veneer|wpc|fabric|glass|metal)\b/i },
    { intent: 'design_advice', regex: /\b(design|idea|suggestion|recommend|kaise banaye|kaisa lagega)\b/i },
    { intent: 'complaint', regex: /\b(complaint|issue|problem|not working|theek nahi hai)\b/i },
    { intent: 'follow_up', regex: /\b(aur|more|next|continue|agey|aur batao)\b/i },
    { intent: 'confirm', regex: /\b(yes|haan|theek hai|ok|confirm|done|final)\b/i },
    { intent: 'deny', regex: /\b(no|na|nahi|cancel|stop|rehne do)\b/i },
];

/**
 * Determines the user's intent based on their query and the conversation context.
 * This is a crucial step to decide what the chatbot should do next.
 */
export function detectIntent(state: ConversationState, userQuery: string): ConversationGoal {
    // 1. Check for explicit intent in the user's query
    for (const matcher of intentMatchers) {
        if (matcher.regex.test(userQuery)) {
            // If the intent is a follow-up, it needs special handling
            if (matcher.intent === 'follow_up') {
                // If there was an active goal, the follow-up relates to that goal.
                return state.activeGoal || 'general_query';
            }
            return matcher.intent as ConversationGoal;
        }
    }

    // 2. If no explicit intent, infer from context
    // If the last topic was pricing, and the user gives numbers, they are likely providing dimensions for an estimate.
    if (state.lastTopic === 'pricing' && /\d/.test(userQuery)) {
        return 'get_estimate';
    }

    // If a material was just mentioned, and the user asks for a price, it's a material_info turning into a get_estimate
    if (state.lastMaterialMentioned && /\b(price|cost|kharcha)\b/i.test(userQuery)){
        return 'get_estimate';
    }

    // 3. If still no intent, mark as unknown.
    return 'unknown';
}

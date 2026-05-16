import { ConversationState } from "./context";
import { ConversationGoal, ConversationTopic } from "@/lib/types";

interface FallbackResponse {
    clarifyingQuestion: string;
    updatedState: Partial<ConversationState>;
}

/**
 * This function is the safety net. It's called when the main intent detection fails.
 * It analyzes the last known state of the conversation and the user's confusing query
 * to ask a targeted, helpful clarifying question.
 */
export function getFallbackResponse(state: ConversationState, userQuery: string): FallbackResponse {

    // If we have absolutely no context, ask a very open-ended question.
    if (!state.lastTopic && !state.activeGoal) {
        return {
            clarifyingQuestion: "Sorry, main aako theek se samajh nahi paayi. Kya aap apne ghar ke liye kuch plan kar rahe hain?",
            updatedState: { lastIntent: 'unknown' }
        };
    }

    // Fallback based on the last known topic
    switch (state.lastTopic) {
        case 'pricing':
            return {
                clarifyingQuestion: `Prices ke baare mein kuch aur janna चाहेंगे? Ya hum design pe waapas chalein?`,
                updatedState: { activeGoal: 'get_estimate' } // Suggesting a goal
            };
        case 'materials':
            return {
                clarifyingQuestion: `Aapko ${state.lastMaterialMentioned || 'materials'} ke baare mein kuch aur specific information chahiye?`,
                updatedState: { activeGoal: 'material_info' }
            };
        case 'ceiling':
        case 'wall_panels':
        case 'tv_unit':
            return {
                clarifyingQuestion: `Hum abhi ${state.lastTopic} ki baat kar rahe the. Usi par continue karein?`,
                updatedState: {}
            };
        default:
            // If the last topic is not helpful, fallback based on active goal
            switch (state.activeGoal) {
                case 'get_estimate':
                    return {
                        clarifyingQuestion: "Estimate ke liye, mujhe room ki dimensions (length aur width) chahiye. Vo bata sakte hain?",
                        updatedState: {}
                    };
                case 'design_advice':
                    return {
                        clarifyingQuestion: "Design advice ke liye, aap mujhe room ka type (e.g., bedroom, living room) bata sakte hain?",
                        updatedState: {}
                    };
                default:
                    return {
                        clarifyingQuestion: "Mmm, main thoda confuse ho gayi. Aap simple shabdon mein bata sakte hain aap kya chahte hain?",
                        updatedState: { lastIntent: 'unknown' }
                    };
            }
    }
}

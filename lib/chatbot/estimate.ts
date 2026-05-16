import { ConversationState } from "./context";
import { extractDimensions, calculateEstimate, getBudgetRecommendation, extractBudgetAmount } from "./pricing";

export function getEstimateResponse(state: ConversationState, userInput: string) {
    let updatedState = { ...state };
    let answer: string | null = null;

    const dimensions = extractDimensions(userInput);
    const budget = extractBudgetAmount(userInput);

    if (dimensions) {
        if (state.lastMaterialMentioned) {
            const estimate = calculateEstimate(dimensions, state.lastMaterialMentioned);
            if (estimate) {
                answer = estimate.message;
            } else {
                answer = "I can't seem to find pricing for that material. We specialize in PVC, Gypsum, and WPC panels. Which one are you interested in?";
            }
        } else {
            answer = "I can give you an estimate. What material are you interested in? We offer PVC, Gypsum, and WPC panels.";
        }
        updatedState.roomDimensions = dimensions;
    } else if (budget) {
        answer = getBudgetRecommendation(budget);
        updatedState.isPriceSensitive = true;
    } else {
        answer = "I can help with that. To give you an estimate, I need to know the room dimensions (e.g., 'a 10x12 feet room') and the material you're interested in (PVC, Gypsum, or WPC).";
    }

    return { answer, updatedState };
}
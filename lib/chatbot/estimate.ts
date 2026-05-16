import { ConversationState } from "./context";
import { getMaterialPrice } from "./pricing"; // Assuming this function exists

interface EstimateResponse {
    answer: string;
    updatedState: Partial<ConversationState>;
}

/**
 * Generates a cost estimate based on the current conversation state.
 * It will ask for missing information if necessary.
 */
export function getEstimateResponse(state: ConversationState, userQuery: string): EstimateResponse {
    const { roomDimensions, lastMaterialMentioned } = state;

    // 1. Check if we have enough information to generate an estimate.
    if (!roomDimensions || !roomDimensions.area) {
        // If we just got dimensions, calculate area and then proceed.
        if (roomDimensions && roomDimensions.length && roomDimensions.width) {
            const area = roomDimensions.length * roomDimensions.width;
            const newState: Partial<ConversationState> = {
                roomDimensions: { ...roomDimensions, area, unit: "sqft" }
            };
            // Re-call the function with the updated state to get the price.
            return getEstimateResponse({ ...state, ...newState }, userQuery);
        }
        // If not, ask for the dimensions.
        return {
            answer: "Estimate ke liye, mujhe room ka size (length aur width) chahiye. Vo bata sakte hain?",
            updatedState: { activeGoal: 'get_estimate' },
        };
    }

    if (!lastMaterialMentioned) {
        // If we don't have a material, ask for it.
        return {
            answer: "Theek hai, size note kar liya. Aap kis material mein interested hain? For example, PVC, Gypsum, etc.",
            updatedState: { activeGoal: 'get_estimate' },
        };
    }

    // 2. If we have all info, calculate the price.
    try {
        const priceInfo = getMaterialPrice(lastMaterialMentioned);
        const totalCost = priceInfo.pricePerSqFt * roomDimensions.area;

        const answer = `Okay! For a ${roomDimensions.area} sq. ft. area using ${lastMaterialMentioned}, aapka total kharcha lagbhag ₹${totalCost.toLocaleString('en-IN')} aayega. Ismein labour aur material dono included hai.`;

        return {
            answer,
            updatedState: {
                activeGoal: 'general_query', // Reset goal after giving the estimate
                isPriceSensitive: true, // Mark user as price sensitive
            },
        };
    } catch (error: any) {
        // This will happen if getMaterialPrice throws an error (e.g., material not found)
        return {
            answer: error.message,
            updatedState: { activeGoal: 'material_info' }, // Steer conversation back to materials
        };
    }
}

import { Message, ConversationGoal, ConversationTopic } from "@/lib/types";

// The core state of the conversation, to be passed and updated on each turn.
export interface ConversationState {
    // User profile
    userName?: string
    city?: string

    // Project details
    service?: "Ceiling" | "Wall Panels" | "TV Unit"
    budget?: "low" | "mid" | "high"
    roomType?: string // e.g., "Living Room", "Bedroom"
    roomDimensions?: {
        length?: number
        width?: number
        area?: number
        unit?: "ft" | "m"
    }

    // Conversation flow management
    activeGoal?: ConversationGoal // What the user is trying to achieve right now
    lastIntent?: ConversationGoal // The intent of the *last* user message
    lastTopic?: ConversationTopic // The topic of the *last* turn

    // Memory
    lastMaterialMentioned?: string // e.g., "PVC", "Gypsum"
    fullHistory: Message[] // The complete chat log for the LLM
    turnHistory: {
        userQuery: string
        botResponse: string
        intent: ConversationGoal
        topic: ConversationTopic
    }[]

    // Safety & Determinism
    isPriceSensitive: boolean // True if user has mentioned budget/price recently
    isAwaitingConfirmation?: {
        for: string // e.g., "city_confirmation"
        on: string // The original piece of data, e.g. "Bhopal"
    }
}

// Creates the initial state for a new conversation.
export function createInitialState(
    initialHistory: Message[] = []
): ConversationState {
    return {
        fullHistory: initialHistory,
        turnHistory: [],
        isPriceSensitive: false,
    }
}

// A function to update the state.
export function updateConversationState(
    currentState: ConversationState,
    updates: Partial<ConversationState>
): ConversationState {
    const newState = { ...currentState, ...updates };
    // Ensure history is always appended, not overwritten, if provided in updates.
    if (updates.fullHistory) {
        newState.fullHistory = currentState.fullHistory.concat(
            updates.fullHistory
        );
    }
    return newState;
}

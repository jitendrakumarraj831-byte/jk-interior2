import { ConversationState } from "./context";

// In a real app, this data would likely come from a database or a more robust configuration system.
const knownCities = ["araria", "forbesganj", "patna", "purnia", "kishanganj"];
const knownMaterials = ["pvc", "gypsum", "wpc", "veneer", "charcoal", "louvers"];

interface ExtractedEntities {
    city?: string;
    material?: string;
    dimensions?: { length: number; width: number; unit: string };
    priceRequested?: boolean;
}

/**
 * Extracts known entities from a user's query.
 * This helps the chatbot understand context even from short phrases.
 */
export function extractEntities(query: string): ExtractedEntities {
    const lowerQuery = query.toLowerCase();
    const entities: ExtractedEntities = {};

    // Look for cities
    const cityMatch = knownCities.find(city => lowerQuery.includes(city));
    if (cityMatch) {
        entities.city = cityMatch.charAt(0).toUpperCase() + cityMatch.slice(1);
    }

    // Look for materials
    const materialMatch = knownMaterials.find(material => lowerQuery.includes(material));
    if (materialMatch) {
        entities.material = materialMatch;
    }

    // A simple regex to look for dimensions like "10x12", "10 x 12", "10 by 12"
    const dimMatch = lowerQuery.match(/(\d+)\s*(x|by)\s*(\d+)/);
    if (dimMatch) {
        entities.dimensions = {
            length: parseInt(dimMatch[1], 10),
            width: parseInt(dimMatch[3], 10),
            unit: "ft", // Assuming feet for now
        };
    }

    if (lowerQuery.includes("kitna") && lowerQuery.includes("lagega")){
      entities.priceRequested = true;
    }

    return entities;
}

/**
 * This is a placeholder for a function that would provide a response from a knowledge base.
 * For now, it just returns a simple answer.
 */
export function getKnowledgeResponse(state: ConversationState, query: string): { answer: string; updatedState: Partial<ConversationState> } {
    const entities = extractEntities(query);
    let answer = "I see.";
    const updatedState: Partial<ConversationState> = {};

    if (entities.material) {
        answer = `Ah, ${entities.material}. It is a great choice.`;
        updatedState.lastMaterialMentioned = entities.material;
        updatedState.lastTopic = 'materials';
    }

    return { answer, updatedState };
}

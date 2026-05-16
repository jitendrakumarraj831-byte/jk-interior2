import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- 1. Define the structured output we want from the AI ---
interface TriageResult {
    intent: string; 
    entities: {
        material?: string;
        city?: string;
        roomType?: string;
    };
    userPriorities: string[]; // e.g., ["budget-conscious", "wants premium look", "worried about maintenance"]
    questionType: "simple" | "comparison" | "complex";
}

// --- 2. The prompt for our specialized Triage AI ---

const triageSystemPrompt = `
    You are a Triage AI. Your single job is to analyze a user's message in a conversation about interior design and classify it into a structured JSON object. Do not answer the user. Do not be conversational.

    **INTENTS:**
    - material_info: User is asking for information about a specific material (e.g., "pvc kya hai?").
    - get_estimate: User is asking for a price or cost (e.g., "kitna lagega?", "what is the price?").
    - design_advice: User is asking for a recommendation or comparison (e.g., "konsa aacha hai?", "which is better for moisture?").
    - confirm: User agrees or says yes (e.g., "haan", "yes theek hai").
    - unknown: None of the above.

    **ENTITIES:**
    - material: e.g., PVC, Gypsum, WPC, Charcoal, Fabric, Louvers
    - city: Any Indian city.
    - roomType: e.g., bedroom, living room, kitchen, bathroom

    **USER PRIORITIES:**
    - budget_conscious: User mentions "sasta", "kam budget", "low price", "cheap".
    - wants_premium_look: User mentions "premium", "modern", "luxury", "rich look".
    - concerned_about_maintenance: User mentions "maintenance", "saaf-safai", "easy to clean".
    - concerned_about_moisture: User mentions "nami", "seelan", "waterproof", "bathroom".
    - concerned_about_durability: User mentions "durable", "long lasting", "strong".
    - concerned_about_safety: User mentions "kids", "bachchon", "safe".

    **OUTPUT FORMAT:**
    Respond with ONLY a valid JSON object in the following format. Do not add any other text.
    {
      "intent": "...",
      "entities": { "material": "...", "city": "...", "roomType": "..." },
      "userPriorities": ["..."],
      "questionType": "..." // simple, comparison, or complex
    }
`;

/**
 * Uses a specialized AI call to classify the user's query.
 */
export async function getTriageResult(userQuery: string): Promise<TriageResult> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Use a faster model for this classification task
            messages: [
                { role: "system", content: triageSystemPrompt },
                { role: "user", content: userQuery }
            ],
            temperature: 0,
        });

        const resultText = response.choices[0].message.content;
        const resultJson = JSON.parse(resultText!); 

        // Basic validation
        if (resultJson && resultJson.intent) {
            return resultJson as TriageResult;
        }

        throw new Error("Invalid JSON response from Triage AI");

    } catch (error) {
        console.error("Error in Triage AI:", error);
        // Fallback to a safe default
        return {
            intent: 'unknown',
            entities: {},
            userPriorities: [],
            questionType: 'simple',
        };
    }
}

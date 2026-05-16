import { ConversationState } from "./context";
import { buildSystemPrompt } from "./ai";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface AIResponse {
    content: string;
}

/**
 * This function encapsulates the logic for calling the primary AI model.
 * It now accepts optional special instructions to guide the AI's response.
 */
export async function callPrimaryAI(
    state: ConversationState,
    specialInstructions?: string // New parameter for special instructions
): Promise<AIResponse> {
    let systemPrompt = buildSystemPrompt(state);

    // NEW: If there are special instructions, add them to the system prompt.
    if (specialInstructions) {
        systemPrompt += `\n\n**Important Instructions for This Turn:**\n${specialInstructions}\n`;
    }

    const messages = [
        { role: "system", content: systemPrompt },
        ...state.fullHistory,
    ];

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: messages as any, //TODO: Fix type
            temperature: 0.7,
            max_tokens: 500,
        });

        const content = response.choices[0]?.message?.content;

        if (!content) {
            return { content: "Sorry, I'm having a little trouble thinking right now. Please try again in a moment." };
        }

        return { content };

    } catch (error) {
        console.error("Error calling OpenAI:", error);
        return { content: "Sorry, I can't connect to my brain right now. Please check the server connection." };
    }
}

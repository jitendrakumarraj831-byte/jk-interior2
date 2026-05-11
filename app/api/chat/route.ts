// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import KNOWLEDGE_BASE from "@/lib/knowledge-base";
import { consultantReply, ConversationContext } from "@/lib/consultant-engine";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// In-memory conversation store (for demo; use database in production)
const sessionStore = new Map<string, ConversationContext>();

// ------------------------------------------------------------------
// Build dynamic system prompt using knowledge base
// ------------------------------------------------------------------

function buildSystemPrompt(context?: ConversationContext): string {
  const { company, services, locations, bookingInfo, waterproofSolutions, materials, roomSuggestions } = KNOWLEDGE_BASE;

  // Format services and pricing for prompt
  const servicesList = services.map(s => 
    `• ${s.emoji} **${s.name}** — ₹${s.priceMin}–${s.priceMax}/${s.unit} — ${s.description}`
  ).join("\n");

  // Format FAQs (top 10)
  const faqsList = KNOWLEDGE_BASE.faqs.slice(0, 10).map(f => 
    `Q: ${f.question}\nA: ${f.answer}`
  ).join("\n\n");

  // Format locations
  const locationsList = locations.cities.join(", ");

  // Waterproof solutions
  const waterproofText = `
CEILING WATERPROOF: ${waterproofSolutions.ceiling.best} — ${waterproofSolutions.ceiling.price}
WALL WATERPROOF: ${waterproofSolutions.walls.best} — ${waterproofSolutions.walls.price}
KITCHEN: ${waterproofSolutions.kitchens.recommendation}
BATHROOM: ${waterproofSolutions.bathrooms.recommendation}
`;

  // Material recommendations summary
  const materialSummary = materials.map(m => 
    `• ${m.name} — Suitable: ${m.suitableFor.join(", ")} | Durability: ${m.durability}`
  ).join("\n");

  // Room suggestions short
  const roomSuggestionsShort = roomSuggestions.map(r => 
    `• ${r.roomType} → Best ceiling: ${r.bestCeiling} | Budget: ${r.budgetOption}`
  ).join("\n");

  // Context-aware info if available
  const contextInfo = context ? `
Known customer info:
- Name: ${context.name || "not given"}
- City: ${context.city || "not given"}
- Service interest: ${context.service || "not given"}
- Budget: ${context.budget || "not given"}
- Room type: ${context.roomType || "not given"}
- Last intent: ${context.lastIntent || "none"}
` : "";

  return `You are **Riya**, the senior AI sales consultant and interior design expert at **${company.name}** (${company.tagline}).

═══════════════════════════════════════════
COMPANY INFORMATION
═══════════════════════════════════════════
- Name: ${company.name}
- Founded: ${company.founded} | Experience: ${company.experienceYears} years
- Projects completed: ${company.projectsCompleted}+
- Contact: ${company.contact.primary} (Call/WhatsApp), ${company.contact.secondary}
- Hours: ${company.workingHours}
- Warranty: ${company.warranty.standard} on all installations
- Payment: ${company.payment.methods.join(", ")} — ${company.payment.advance}
- USPs: ${company.usps.join(", ")}
- Service area radius: ${company.locations.serviceAreaRadius}
- Headquarters: ${company.locations.headquarters}

═══════════════════════════════════════════
SERVICES & PRICING (ALWAYS USE THESE RATES)
═══════════════════════════════════════════
${servicesList}

═══════════════════════════════════════════
WATERPROOF SOLUTIONS (IMPORTANT)
═══════════════════════════════════════════
${waterproofText}

═══════════════════════════════════════════
MATERIALS QUICK REFERENCE
═══════════════════════════════════════════
${materialSummary}

═══════════════════════════════════════════
ROOM-SPECIFIC RECOMMENDATIONS
═══════════════════════════════════════════
${roomSuggestionsShort}

═══════════════════════════════════════════
FREQUENTLY ASKED QUESTIONS
═══════════════════════════════════════════
${faqsList}

═══════════════════════════════════════════
SERVICE AREAS
═══════════════════════════════════════════
We serve: ${locationsList} and all areas within ${locations.radiusKm} km of ${locations.headquarters}.
Always confirm if the customer's city is in this list. If not, politely inform them.

═══════════════════════════════════════════
BOOKING & SITE VISIT
═══════════════════════════════════════════
- Site visit is FREE (${bookingInfo.isFree ? "yes" : "no"})
- Process: ${bookingInfo.process.join(" → ")}
- No obligation: ${bookingInfo.noObligation ? "Yes, you can cancel anytime" : "No"}
- What to expect on visit: ${bookingInfo.whatToExpect.join(", ")}
- Contact methods: Call ${bookingInfo.contactMethods[0].number} (${bookingInfo.contactMethods[0].timing}) or WhatsApp ${bookingInfo.contactMethods[1].number} (${bookingInfo.contactMethods[1].timing})

═══════════════════════════════════════════
CONVERSATION RULES (CRITICAL)
═══════════════════════════════════════════
1. **Speak naturally in Hinglish** (Hindi + English mix) — be warm, friendly, and professional.
2. **One question per message** — do not overwhelm the customer.
3. **If room size is not given** — ask for it politely.
4. **If city is not given** — ask for it before booking.
5. **Pricing questions must return pricing** — never reply with unrelated information.
6. **Comparison questions** — use the COMPARISONS from knowledge base or give honest pros/cons.
7. **Maintain context** — remember what the customer told you earlier (see context below).
8. **Use the exact prices from the services list** — do not invent rates.
9. **Do not fabricate services** — if asked for something not in the list, say it's not our specialty and offer alternatives.
10. **Be concise** — keep responses under 6 lines for mobile friendliness.
11. **Use 1-2 emojis per message naturally** — don't overdo.
12. **If customer seems confused** — guide them with simple questions.
13. **For booking requests** — collect name → city → phone in sequence, one per message.

${contextInfo ? `═══════════════════════════════════════════
CURRENT CONVERSATION CONTEXT
═══════════════════════════════════════════
${contextInfo}
Use this information naturally. Do NOT ask for things the customer already told you.
` : ""}

Remember: You are Riya — knowledgeable, warm, and genuinely helpful. Your goal is to guide the customer to the right interior solution, provide accurate estimates, and build trust. Never answer anything outside JK Interior's scope. If unsure, suggest a free site visit.`;
}

// ------------------------------------------------------------------
// POST handler
// ------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, context: clientContext } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Retrieve or create session context
    let ctx = sessionStore.get(sessionId || "default");
    if (!ctx) {
      ctx = {
        messagesExchanged: 0,
      };
      sessionStore.set(sessionId || "default", ctx);
    }

    // Merge any client-provided context (from frontend)
    if (clientContext) {
      Object.assign(ctx, clientContext);
    }

    // First, try the deterministic consultant engine (fast, rule-based)
    const ruleBasedReply = consultantReply(message, ctx);
    
    // If deterministic engine gave a reply, return it (it's already human-like and fast)
    if (ruleBasedReply) {
      ctx.messagesExchanged++;
      sessionStore.set(sessionId || "default", ctx);
      return NextResponse.json({ 
        reply: ruleBasedReply,
        context: ctx,
        source: "rule-based"
      });
    }

    // Otherwise, use Gemini AI with knowledge base
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not set");
      return NextResponse.json({ 
        reply: "I'm having trouble connecting. Please call +91 8651070831 for assistance.",
        context: ctx 
      }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: buildSystemPrompt(ctx),
    });

    // Build conversation history (simplified: last 5 messages in context)
    // For production, you'd store full history per sessionId
    const chat = model.startChat({
      history: [], // We'll rely on system prompt + context, but can add past exchanges if needed
    });

    // Send user message
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    // Update context (increment message count, store last intent, etc.)
    ctx.messagesExchanged++;
    // Simple heuristic to update context from response (can be enhanced)
    if (message.toLowerCase().includes("gypsum") || message.toLowerCase().includes("pvc") || message.toLowerCase().includes("wpc")) {
      ctx.service = ctx.service || "Interior work";
    }
    sessionStore.set(sessionId || "default", ctx);

    return NextResponse.json({ 
      reply: response,
      context: ctx,
      source: "ai"
    });

  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({ 
      error: "Failed to process request",
      reply: "Sorry, I'm facing a technical issue. Please try again or call +91 8651070831 directly."
    }, { status: 500 });
  }
}
// consultant-engine.ts
import KNOWLEDGE_BASE from "./knowledge-base";

// ============================================
// Types & Interfaces
// ============================================

export interface SessionContext {
  sessionId: string;
  city?: string;
  serviceId?: string;
  roomSizeSqft?: number;
  lastTopic?: "greeting" | "pricing" | "room_inquiry" | "booking" | "estimate" | "comparison" | "followup";
  lastQuestion?: string;
  knownInfo: {
    cityKnown: boolean;
    serviceKnown: boolean;
    sizeKnown: boolean;
  };
  conversationHistory: { role: "user" | "bot"; content: string; timestamp: number }[];
}

export interface BotResponse {
  text: string;
  shouldEndConversation?: boolean;
  suggestedReplies?: string[];
  contextUpdate?: Partial<SessionContext>;
}

// ============================================
// Intent Detection (Hinglish + English)
// ============================================

type Intent =
  | "greeting"
  | "pricing_ceiling"
  | "pricing_wall"
  | "pricing_complete"
  | "room_inquiry"
  | "estimate_request"
  | "booking_site_visit"
  | "comparison"
  | "waterproof_question"
  | "thankyou"
  | "fallback";

interface IntentMatch {
  intent: Intent;
  entities?: {
    city?: string;
    roomType?: string;
    serviceType?: string;
    budget?: "low" | "mid" | "high";
    waterproof?: boolean;
  };
}

function detectIntent(message: string): IntentMatch {
  const lowerMsg = message.toLowerCase();

  // Greetings
  if (/(namaste|hello|hi|hey|hola|good morning|good evening|kaise ho)/i.test(lowerMsg)) {
    return { intent: "greeting" };
  }

  // Thank you
  if (/(thank|thanks|dhanyavad|shukriya)/i.test(lowerMsg)) {
    return { intent: "thankyou" };
  }

  // Booking / Site visit
  if (/(book|site visit|free visit|visit|appointment|schedule|aana|bulana|site pe aao|measurement lena)/i.test(lowerMsg)) {
    return { intent: "booking_site_visit" };
  }

  // Waterproof
  if (/(waterproof|paani rok|geela|bathroom|kitchen|balcony)/i.test(lowerMsg)) {
    return { intent: "waterproof_question", entities: { waterproof: true } };
  }

  // Comparison between two products
  if (/(vs|comparison|difference|better than|best for|compare)/i.test(lowerMsg)) {
    return { intent: "comparison" };
  }

  // Pricing queries (ceiling, wall, complete)
  if (/(price|rate|cost|kitna|kitne ka|laga|estimate|lakh|rupees|₹)/i.test(lowerMsg)) {
    if (/(ceiling|chhat|gypsum|pvc|pop|false ceiling)/i.test(lowerMsg)) {
      return { intent: "pricing_ceiling" };
    }
    if (/(wall|panel|wpc|marble|uv|accent wall)/i.test(lowerMsg)) {
      return { intent: "pricing_wall" };
    }
    if (/(complete home|full interior|poora ghar|pura ghar|1bhk|2bhk|3bhk)/i.test(lowerMsg)) {
      return { intent: "pricing_complete" };
    }
    // generic pricing
    return { intent: "fallback" };
  }

  // Estimate request (specific room size or "estimate for my room")
  if (/(estimate|calculate|how much for|room ka|kamre ka|sqft|square feet|area|10x12|12x12)/i.test(lowerMsg)) {
    return { intent: "estimate_request", entities: extractRoomEntities(lowerMsg) };
  }

  // Room inquiry (just saying "1 room h" or "bedroom chahiye")
  if (/(room|bedroom|hall|kitchen|bathroom|kamra|drawing|dining)/i.test(lowerMsg)) {
    return { intent: "room_inquiry", entities: extractRoomEntities(lowerMsg) };
  }

  return { intent: "fallback" };
}

function extractRoomEntities(message: string): { roomType?: string; sizeSqft?: number } {
  const lower = message.toLowerCase();
  let roomType: string | undefined;
  if (/(bedroom|sone ka kamra|master bedroom)/i.test(lower)) roomType = "bedroom";
  else if (/(hall|living room|drawing|baithak)/i.test(lower)) roomType = "hall";
  else if (/(kitchen|rasoi)/i.test(lower)) roomType = "kitchen";
  else if (/(bathroom|toilet|washroom)/i.test(lower)) roomType = "bathroom";

  // Extract dimensions like 10x12, 12*12, 12 by 12
  const dimMatch = lower.match(/(\d+)\s*[x*]\s*(\d+)/);
  if (dimMatch) {
    const length = parseInt(dimMatch[1], 10);
    const width = parseInt(dimMatch[2], 10);
    return { roomType, sizeSqft: length * width };
  }

  // Or direct sqft like "120 sqft"
  const sqftMatch = lower.match(/(\d+)\s*(sq\.?\s*ft|square feet)/i);
  if (sqftMatch) {
    return { roomType, sizeSqft: parseInt(sqftMatch[1], 10) };
  }

  return { roomType };
}

// ============================================
// Response Generation (Natural Hinglish)
// ============================================

function generateGreeting(city?: string): string {
  if (city) {
    return `Namaste! 😊 ${city} ke liye aapka swagat hai JK Interior mein. Aapko kis type ka interior chahiye? (Ceiling, Wall panels, ya full home?)`;
  }
  return `Namaste! 🙏 Main JK Interior ka AI consultant hoon. Aapki city kya hai? (Jaise Araria, Forbesganj, Purnia)`;
}

function generatePriceResponse(intent: Intent, session: SessionContext): string {
  if (intent === "pricing_ceiling") {
    return `✨ Ceiling ke rates (per sq.ft):\n• Gypsum: ₹80–140\n• PVC (waterproof): ₹60–120\n• Grid ceiling (office): ₹45–90\n\nKis type ki ceiling chahiye? Main aur detail bata sakta hoon.`;
  } else if (intent === "pricing_wall") {
    return `🪵 Wall panels (per sq.ft):\n• WPC panels: ₹180–450\n• UV marble sheets: ₹50–95\n• Wallpaper: ₹30–150\n\nKya aapko kisi specific room ke liye wall design chahiye?`;
  } else if (intent === "pricing_complete") {
    return `🏠 Complete home interior (per sq.ft): ₹120–200\n\nExample estimates:\n• 1 BHK: ₹35k–55k\n• 2 BHK: ₹65k–1L\n• 3 BHK: ₹1L–1.6L\n\nYeh sabhi mein ceiling, TV unit, modular kitchen (optional) aur wardrobes include hain.`;
  }
  return `Aap kisi specific service ka price pooch rahe ho? Ceiling, Wall panels, ya full home interior?`;
}

function generateEstimateResponse(session: SessionContext, requestedSize?: number): string {
  let size = session.roomSizeSqft || requestedSize;
  if (!size && session.knownInfo.sizeKnown === false) {
    return `Estimate dene ke liye room ka size chahiye. Jaise “10x12 feet” ya “120 sq.ft” batao.`;
  }
  if (!size) {
    // Use standard room size as fallback
    size = STANDARD_ROOM_SIZES.mediumBedroom.sqft;
  }
  const service = KNOWLEDGE_BASE.services.find(s => s.id === session.serviceId);
  let rateLow = 80, rateHigh = 140;
  if (service) {
    rateLow = service.priceMin;
    rateHigh = service.priceMax;
  } else if (session.knownInfo.serviceKnown === false) {
    return `Pehle batao kaunsi service chahiye? (Ceiling ya wall panels?)`;
  }

  const totalLow = Math.round(rateLow * size);
  const totalHigh = Math.round(rateHigh * size);
  return `📐 Aapke room size ~${size} sq.ft ke hisaab se estimate:
₹${totalLow} – ₹${totalHigh}
(₹${rateLow}–${rateHigh} per sq.ft)
Yeh labour + material dono include hai. Free site visit ke baad exact quotation milega.`;
}

function generateWaterproofResponse(): string {
  return `💧 100% waterproof solutions ke liye:
• Ceiling: PVC ceiling (₹60–120/sq.ft)
• Walls: UV marble sheets (₹50–95/sq.ft)
• Bathroom/Kitchen mein gypsum bilkul nahi lagana chahiye.
Kya aapko bathroom ya kitchen ke liye chahiye?`;
}

function generateComparisonResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("pvc") && lower.includes("gypsum")) {
    return `🔄 PVC vs Gypsum:
🔹 PVC: 100% waterproof, zero maintenance, 20+ year life, ₹60–120/sq.ft – best for bathroom/kitchen.
🔹 Gypsum: Premium look with cove lighting, not waterproof, ₹80–140/sq.ft – best for hall/bedroom.
Aapka room kya hai? Main best suggest kar dunga.`;
  }
  if (lower.includes("wpc") && lower.includes("uv")) {
    return `🔄 WPC vs UV Marble:
🔹 WPC: Wood-texture, durable, ₹180–450/sq.ft – premium accent walls.
🔹 UV Marble: High-gloss marble look, ₹50–95/sq.ft – waterproof, best for bathroom kitchen walls.
Dono maintenance-free hain. Budget batao toh help karun.`;
  }
  return `Main aapko PVC vs Gypsum, ya WPC vs UV Marble compare kar sakta hoon. Aap kiska comparison chahte ho?`;
}

function generateBookingResponse(session: SessionContext): string {
  const city = session.city || "aapki city";
  return `✅ Free site visit book karne ke liye:
📞 Call / WhatsApp: ${COMPANY.contact.primary}
Ya yahan batao – aapka naam, ${city}, aur preferred date.
Humara expert aapke ghar aake measurement lega, design dikhayega, aur written quotation dega. Bilkul free, no obligation. 😊
Kya aap abhi book karwana chahenge?`;
}

function generateFallbackResponse(session: SessionContext): string {
  // If we already know city and service, prompt for next step
  if (session.city && session.knownInfo.serviceKnown === false) {
    return `Aap ${session.city} mein rehte ho. Batao kis type ka kaam karwana hai? (Ceiling / Wall panels / Complete home interior)`;
  }
  if (session.city && session.serviceId) {
    return `Aapko ${session.serviceId} chahiye ${session.city} mein. Kya aapko room size bata ke estimate lena hai? Ya seedha site visit book karna hai?`;
  }
  if (!session.city) {
    return `Apni city batao – Forbesganj, Araria, Purnia, ya 80 km radius mein koi bhi area.`;
  }
  return `Kya aap ceiling, wall panels, ya complete home interior ke baare mein janna chahte ho? Main har cheez ka rate, estimate, aur booking karwa sakta hoon.`;
}

function generateThankyouResponse(): string {
  return `Dhanyavaad! 😊 Agar aur koi sawaal ho toh pooch lijiye. Free site visit ke liye call karein ${COMPANY.contact.primary}. Shubh din!`;
}

// ============================================
// Main Conversation Engine
// ============================================

export class ConsultantEngine {
  private sessions: Map<string, SessionContext> = new Map();

  private getOrCreateSession(sessionId: string): SessionContext {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        knownInfo: { cityKnown: false, serviceKnown: false, sizeKnown: false },
        conversationHistory: [],
      };
      this.sessions.set(sessionId, session);
    }
    return session;
  }

  private updateSession(session: SessionContext, update: Partial<SessionContext>) {
    Object.assign(session, update);
    // Sync knownInfo flags
    if (update.city !== undefined) session.knownInfo.cityKnown = !!update.city;
    if (update.serviceId !== undefined) session.knownInfo.serviceKnown = !!update.serviceId;
    if (update.roomSizeSqft !== undefined) session.knownInfo.sizeKnown = !!update.roomSizeSqft;
    this.sessions.set(session.sessionId, session);
  }

  private addToHistory(session: SessionContext, role: "user" | "bot", content: string) {
    session.conversationHistory.push({ role, content, timestamp: Date.now() });
    // Keep only last 20 messages for context
    if (session.conversationHistory.length > 20) session.conversationHistory.shift();
  }

  private extractCityFromMessage(message: string): string | null {
    const cities = KNOWLEDGE_BASE.locations.cities.map(c => c.toLowerCase());
    const words = message.toLowerCase().split(/\s+/);
    for (const word of words) {
      if (cities.includes(word)) {
        // Return original case from locations list
        return KNOWLEDGE_BASE.locations.cities.find(c => c.toLowerCase() === word) || word;
      }
    }
    return null;
  }

  private extractServiceIdFromMessage(message: string): string | null {
    const lower = message.toLowerCase();
    for (const service of KNOWLEDGE_BASE.services) {
      if (service.keywords.some(kw => lower.includes(kw))) {
        return service.id;
      }
    }
    return null;
  }

  public async processMessage(
    userMessage: string,
    sessionId: string = "default"
  ): Promise<BotResponse> {
    let session = this.getOrCreateSession(sessionId);
    this.addToHistory(session, "user", userMessage);

    // 1. Extract entities from current message
    const detectedCity = this.extractCityFromMessage(userMessage);
    const detectedService = this.extractServiceIdFromMessage(userMessage);
    const { sizeSqft, roomType } = extractRoomEntities(userMessage);

    let updated = false;
    if (detectedCity && !session.city) {
      this.updateSession(session, { city: detectedCity });
      updated = true;
    }
    if (detectedService && !session.serviceId) {
      this.updateSession(session, { serviceId: detectedService });
      updated = true;
    }
    if (sizeSqft && !session.roomSizeSqft) {
      this.updateSession(session, { roomSizeSqft: sizeSqft });
      updated = true;
    }

    // If we just updated from this message, re-fetch session
    if (updated) session = this.getOrCreateSession(sessionId);

    // 2. Detect intent
    const { intent, entities } = detectIntent(userMessage);

    // 3. Generate response based on intent + context
    let responseText = "";
    let suggestedReplies: string[] = [];
    let shouldEnd = false;

    switch (intent) {
      case "greeting":
        responseText = generateGreeting(session.city);
        suggestedReplies = ["Gypsum price", "PVC rate", "Book free visit", "WPC panel cost"];
        break;

      case "pricing_ceiling":
      case "pricing_wall":
      case "pricing_complete":
        responseText = generatePriceResponse(intent, session);
        break;

      case "estimate_request":
        responseText = generateEstimateResponse(session, entities?.sizeSqft || sizeSqft);
        break;

      case "room_inquiry":
        if (!session.city) {
          responseText = `Pehle city batao? (Jaise Araria, Forbesganj)`;
        } else if (!session.serviceId) {
          responseText = `Bilkul 😊 ${session.city} mein aapke room ke liye kaunsi ceiling ya wall work karwana hai? Gypsum, PVC, ya WPC? Agar room size bata doon toh estimate bhi bata doon.`;
        } else {
          responseText = `Aapne ${session.serviceId} ke baare mein poochha. Kya aapko room size bata ke estimate chahiye?`;
        }
        suggestedReplies = ["10x12 feet", "Estimate chahiye", "Site visit book karein"];
        break;

      case "booking_site_visit":
        responseText = generateBookingResponse(session);
        suggestedReplies = ["Haan book karein", "Baad mein karoonga", "Estimate pehle chahiye"];
        break;

      case "comparison":
        responseText = generateComparisonResponse(userMessage);
        break;

      case "waterproof_question":
        responseText = generateWaterproofResponse();
        break;

      case "thankyou":
        responseText = generateThankyouResponse();
        shouldEnd = false; // Don't end, user can ask more
        break;

      default:
        responseText = generateFallbackResponse(session);
        suggestedReplies = ["Ceiling price", "PVC vs Gypsum", "Book site visit", "Estimate"];
        break;
    }

    // Avoid repetition: if last bot message is same as current, add a slight variation
    const lastBotMsg = session.conversationHistory.filter(h => h.role === "bot").pop()?.content;
    if (lastBotMsg && lastBotMsg === responseText) {
      responseText += " Kya aap kuch aur poochna chahte ho?";
    }

    this.addToHistory(session, "bot", responseText);
    this.updateSession(session, { lastTopic: intent as any });

    return {
      text: responseText,
      suggestedReplies,
      shouldEndConversation: shouldEnd,
      contextUpdate: {
        city: session.city,
        serviceId: session.serviceId,
        roomSizeSqft: session.roomSizeSqft,
        knownInfo: session.knownInfo,
      },
    };
  }

  // Optional: reset session
  public resetSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }
}

// ============================================
// Export a singleton instance for easy use
// ============================================
export const consultantEngine = new ConsultantEngine();

export const consultantReply =
  consultantEngine.generateReply.bind(consultantEngine);

export type { ConversationContext };

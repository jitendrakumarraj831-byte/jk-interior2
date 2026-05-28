import { Router } from "express";
import { z } from "zod";
import {
  buildSystemPrompt,
} from "../lib/business-data.js";
import {
  consultantReply,
  detectService,
  detectRoomType,
  detectBudgetLevel,
  normalizeTypos,
  isOffHours,
  detectMultiRoomSizes,
  type ConversationContext,
} from "../lib/consultant-engine.js";
import {
  resolveFollowUpIntent,
} from "../lib/context-engine.js";

const router = Router();

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(3000),
});

const ChatSchema = z.object({
  message: z.string().min(1).max(1500),
  history: z.array(MessageSchema).max(24).optional().default([]),
  leadContext: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
      city: z.string().optional(),
      service: z.string().optional(),
      budget: z.enum(["low", "mid", "high"]).optional(),
      roomSize: z.string().optional(),
      roomType: z.string().optional(),
      lastTopic: z.string().optional(),
      lastIntent: z.string().optional(),
      lastQuestionAsked: z
        .enum(["room_size", "room_type", "city", "budget", "material", "phone", "name"])
        .nullable()
        .optional(),
      conversationStage: z
        .enum(["greeting", "discovery", "consultation", "estimation", "booking"])
        .optional(),
      messagesExchanged: z.number().optional(),
    })
    .optional(),
});

type ChatRequest = z.infer<typeof ChatSchema>;

// Rate limiter
const rateMap = new Map<string, { count: number; resetAt: number }>();
function checkRate(ip: string, limit = 30, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

type Intent =
  | "greeting" | "pricing" | "booking" | "material_info" | "comparison"
  | "faq" | "off_topic" | "affirmation" | "negation" | "view_catalog"
  | "book_visit" | "unknown";

function detectIntent(text: string, ctx: ConversationContext): Intent {
  const t = text.toLowerCase();
  if (/^(hi|hello|hey|namaste|namaskar|hii|helo|hy|hye|good\s*(morning|evening|afternoon)|salam)\b/.test(t)) return "greeting";
  if (/^(ha(n|a)?n?|haan|yes|okay|ok|bilkul|zaroor|sure|theek|thik|sahi|right|correct|perfect|done|proceed)\b/.test(t)) return "affirmation";
  if (/^(nahi|no|nope|mat|band karo|ruk|stop|cancel|baad mein|later)\b/.test(t)) return "negation";
  if (/\b(book|booking|appointment|visit|site visit|ghar aao|aa jao|bulao|milna|demo|consultation|schedule|free visit|quotation bhejo|quote bhejo|estimate bhejo)\b/.test(t)) return "booking";
  if (/\b(price|pricing|rate|cost|kitna|lagega|lagta|budget|estimate|paisa|rupee|rs\b|₹|cheap|costly|expensive|affordable|how much|kitne mein|kitne ka|total|charge|fee|sqft|per foot|per sq)\b/.test(t)) return "pricing";
  if (/\b(better|best|vs|versus|compare|differ|difference|konsa|kaun sa|which one|zyada|kam|acha|bekar|suggest|recommend)\b/.test(t)) return "comparison";
  if (/\b(gypsum|pvc|wpc|uv|marble|panel|ceiling|wall|floor|modular|tv unit|wardrobe|kitchen|false ceiling|design|texture|color|rang|finish|look|style|material|quality|thickness|durability|waterproof|fire)\b/.test(t)) return "material_info";
  if (/\b(guarantee|warranty|how long|kitne din|kitne time|process|install|labor|worker|team|experience|kab se|kitne saal|review|feedback|trust|legit|real|fake|scam|safe)\b/.test(t)) return "faq";
  if (/\b(catalog|catalogue|design\s*(?:dekho|dikhao|bhejo|send|share)|brochure|pdf|designs?\s*(?:list|collection|photos?)|kaunse\s*design|design\s*kaunse|latest\s*design|new\s*design)\b/.test(t)) return "view_catalog";
  if (/\b(site\s*visit|ghar\s*(?:pe|par|aa|aao|bulao)|free\s*(?:visit|measurement|maap)|measurement|naaap|naap\s*lena|visit\s*book|book\s*(?:a\s*)?visit|aao\s*ghar)\b/.test(t)) return "book_visit";
  if (/\b(cricket|ipl|football|movie|film|news|politics|election|weather|joke|meme|recipe|khana|game|song|music|gf|girlfriend|bf|love|date|shaadi|marriage|job|naukri|stock|share market|crypto|bitcoin)\b/.test(t)) return "off_topic";
  return "unknown";
}

function extractRoomDimensions(text: string): string | null {
  const t = text.toLowerCase();
  const SKIP = [/\d+\s*(?:baje?|am\b|pm\b)/, /\d+\s*(?:din|day|week|month|saal)/, /[6-9]\d{9}/, /\d{10,}/];
  for (const s of SKIP) { if (s.test(t)) return null; }
  const multiCheck = /(\d{1,3})\s*[x×*]\s*(\d{1,3})/gi;
  let mc = 0;
  while (multiCheck.exec(text) !== null) { mc++; if (mc > 1) return "MULTI_ROOM_DETECTED"; }
  const m1 = text.match(/(\d{1,3})\s*[x×*]\s*(\d{1,3})/i);
  if (m1) {
    const l = parseInt(m1[1]), w = parseInt(m1[2]);
    if (l >= 5 && w >= 5 && l <= 80 && w <= 80) return `${Math.max(l, w)}x${Math.min(l, w)}`;
  }
  return null;
}

function enhancedNormalize(text: string): string {
  return normalizeTypos(text);
}

function tryExtractPhone(text: string): string | null {
  const m = text.match(/(?:^|\s|:)([6-9]\d{9})(?:\s|$)/);
  return m ? m[1] : null;
}

function buildEngineContext(lead: ChatRequest["leadContext"], history: Array<{ role: "user" | "assistant"; content: string }>): ConversationContext {
  const ctx: ConversationContext = {
    name: lead?.name,
    phone: lead?.phone,
    city: lead?.city,
    service: lead?.service,
    roomSize: lead?.roomSize,
    roomType: lead?.roomType,
    lastTopic: lead?.lastTopic,
    lastIntent: lead?.lastIntent as ConversationContext["lastIntent"],
    budget: (lead?.budget as "low" | "mid" | "high" | undefined) ?? null,
    messagesExchanged: lead?.messagesExchanged ?? history.length,
    lastQuestionAsked: lead?.lastQuestionAsked ?? null,
    conversationStage: lead?.conversationStage ?? "discovery",
  };
  for (const msg of history.slice(-6)) {
    if (msg.role !== "user") continue;
    const norm = enhancedNormalize(msg.content.toLowerCase());
    if (!ctx.service) { const s = detectService(norm); if (s) ctx.service = s.name; }
    if (!ctx.roomType) { const r = detectRoomType(norm); if (r) ctx.roomType = r.label; }
    if (!ctx.budget) { const b = detectBudgetLevel(norm); if (b) ctx.budget = b; }
  }
  return ctx;
}

function advanceStage(currentStage: ConversationContext["conversationStage"], intent: Intent, ctx: ConversationContext): ConversationContext["conversationStage"] {
  if (!currentStage || currentStage === "greeting") { if (intent !== "greeting" && intent !== "off_topic") return "discovery"; }
  if (currentStage === "discovery") { if (ctx.service || ctx.roomType) return "consultation"; }
  if (currentStage === "consultation") { if (ctx.roomSize || intent === "pricing") return "estimation"; }
  if (currentStage === "estimation") { if (intent === "booking" || intent === "affirmation") return "booking"; }
  return currentStage ?? "discovery";
}

function smartFallback(lead: ChatRequest["leadContext"], message: string, intent: Intent, ctx: ConversationContext): string {
  const nm = lead?.name ? `${lead.name} ji, ` : "";
  const oh = isOffHours();
  if (intent === "off_topic") return `${nm}Main JK Interior ki Riya hoon — interior design aur renovation mein help karti hoon. Kaunsa room design karna hai? 😊`;
  if (intent === "booking") {
    if (ctx.phone) return oh ? `${nm}Booking note kar li hai! 🙌 Team kal 9 AM pe call karegi. Urgent ho toh WhatsApp: +91 8651070831` : `${nm}Booking note kar li! 🙌 Hum 2-3 ghante mein call karenge. WhatsApp: +91 8651070831`;
    return `${nm}Bilkul! Free site visit arrange kar dete hain. 📞 Apna WhatsApp number share karein — team call karegi.`;
  }
  if (intent === "pricing") {
    if (!ctx.service) return `💰 JK Interior Rates:\n• Gypsum Ceiling — ₹80–140/sq.ft\n• PVC Ceiling — ₹80–140/sq.ft\n• WPC Panels — ₹180–450/sq.ft\n• UV Marble Sheets — ₹50–95/sq.ft\n• Modular TV Unit — ₹15,000 se shuru\n\nKaunse kaam ka estimate chahiye?`;
    if (ctx.service && !ctx.roomSize) return `${nm}${ctx.service} ke liye room ka size batao (jaise 12×14 ft) — exact estimate nikaalta hoon! 📐`;
  }
  if (!ctx.service && !ctx.roomType) return `${nm}Kaunsa kaam karwana hai — ceiling design, wall panels, modular furniture, ya kuch aur? Batao! 🏠`;
  if (ctx.service && !ctx.roomSize) return `${nm}${ctx.service} ke liye room ka size batao (jaise 12×14 ft) 📐`;
  return `${nm}Kya jaanna chahte hain — pricing, design ideas, ya site visit? Batao! 😊`;
}

function buildGroqSystemPrompt(basePrompt: string, leadContext: ChatRequest["leadContext"], ctx: ConversationContext, intent: Intent): string {
  const contextBlock = `

=== CURRENT CUSTOMER STATE ===
Name: ${ctx.name || "unknown"}
City: ${ctx.city || "not mentioned"}
Service Interest: ${ctx.service || "not specified"}
Room Size: ${ctx.roomSize ? ctx.roomSize + " ft" : "not given"}
Room Type: ${ctx.roomType || "not specified"}
Last Topic: ${ctx.lastTopic || "none"}
Conversation Stage: ${ctx.conversationStage}
Detected Intent: ${intent}
Phone Collected: ${ctx.phone ? "YES — do NOT ask again" : "no"}
================================

=== STRICT RULES ===
1. ANSWER THE USER'S EXACT QUESTION FIRST.
2. Never repeat information already given.
3. Do NOT ask for room size if already known.
4. Do NOT ask for WhatsApp/phone unless customer explicitly asks to book.
5. Off-topic: reply ONLY "Main sirf JK Interior ke services ke baare mein help kar sakti hoon."
6. Language: reply in the SAME language the customer used.
7. Length: max 5–6 lines. Bullet points only for pricing/features.
8. Never hallucinate prices. Use only: Gypsum ₹80–140/sqft, PVC ₹80–140/sqft, WPC ₹180–450/sqft, UV Marble ₹50–95/sqft, TV Unit ₹15k+.
======================================`;
  return basePrompt + contextBlock;
}

async function callGroq(systemPrompt: string, history: Array<{ role: "user" | "assistant"; content: string }>, message: string, apiKey: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          ...history.slice(-12),
          { role: "user", content: message },
        ],
        max_tokens: 400,
        temperature: 0.65,
        stream: false,
      }),
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`Groq ${res.status}`);
    const data = await res.json() as any;
    return data.choices?.[0]?.message?.content?.trim() || "";
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

function isRepetitive(newReply: string, history: Array<{ role: "user" | "assistant"; content: string }>): boolean {
  const last3 = history.filter(m => m.role === "assistant").slice(-3).map(m => m.content.trim().toLowerCase());
  const norm = newReply.trim().toLowerCase();
  for (const prev of last3) {
    const prevWords = new Set(prev.split(/\s+/).filter(w => w.length > 3));
    const newWords = norm.split(/\s+/).filter(w => w.length > 3);
    if (newWords.length === 0) continue;
    const overlap = newWords.filter(w => prevWords.has(w)).length;
    if (overlap / newWords.length > 0.7) return true;
  }
  return false;
}

router.post("/chat", async (req, res) => {
  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").split(",")[0].trim();
  if (!checkRate(ip)) {
    res.status(429).json({ ok: false, error: "Too many requests" });
    return;
  }

  const parsed = ChatSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ ok: false, error: "Invalid request" }); return; }

  const { message, history, leadContext } = parsed.data;
  const normMessage = enhancedNormalize(message?.trim() || "");
  const extractedRoomSize = extractRoomDimensions(normMessage) ?? leadContext?.roomSize ?? undefined;

  if (extractedRoomSize === "MULTI_ROOM_DETECTED") {
    const multiRooms = detectMultiRoomSizes(normMessage);
    if (multiRooms.length > 1) {
      // Pick price range based on known service; default to gypsum/pvc range
      const svcKey = (leadContext?.service || "").toLowerCase();
      const priceLow  = svcKey.includes("wpc") ? 180 : svcKey.includes("uv") || svcKey.includes("marble") ? 50 : 80;
      const priceHigh = svcKey.includes("wpc") ? 450 : svcKey.includes("uv") || svcKey.includes("marble") ? 95 : 140;
      const svcLabel  = svcKey.includes("wpc") ? "WPC Wall Panels" : svcKey.includes("uv") || svcKey.includes("marble") ? "UV Marble Sheets" : svcKey.includes("pvc") ? "PVC Ceiling" : "Gypsum Ceiling";
      const topicSlug = svcKey.includes("wpc") ? "wpc" : svcKey.includes("uv") || svcKey.includes("marble") ? "uv" : svcKey.includes("pvc") ? "pvc" : "gypsum";

      let totalArea = 0;
      let breakdownText = "";
      multiRooms.forEach((room: any, i: number) => {
        totalArea += room.area;
        breakdownText += `${i + 1}. **${room.roomName}** (${room.length}×${room.width} = ${room.area} sq.ft): ₹${(room.area * priceLow).toLocaleString('en-IN')} – ₹${(room.area * priceHigh).toLocaleString('en-IN')}\n`;
      });
      const reply = `Aapke ${multiRooms.length} rooms ka ${svcLabel} estimate:\n\n${breakdownText}\n💰 **Grand Total:** ₹${(totalArea * priceLow).toLocaleString('en-IN')} – ₹${(totalArea * priceHigh).toLocaleString('en-IN')}\n\nFree site visit book karein? 😊`;
      res.json({ ok: true, reply, source: "local", updatedContext: { roomSize: `${totalArea} sqft`, lastTopic: topicSlug, lastIntent: "pricing" } });
      return;
    }
  }

  const ctx = buildEngineContext(leadContext, history);
  if (!ctx.city && leadContext?.city) ctx.city = leadContext.city;
  if (!ctx.service && leadContext?.service) ctx.service = leadContext.service;
  if (!ctx.roomType && leadContext?.roomType) ctx.roomType = leadContext.roomType;
  if (!ctx.budget && leadContext?.budget) ctx.budget = leadContext.budget;
  if (!ctx.roomSize && extractedRoomSize) ctx.roomSize = extractedRoomSize;
  if (!ctx.phone && leadContext?.phone) ctx.phone = leadContext.phone;

  const intent = detectIntent(normMessage, ctx);
  ctx.conversationStage = advanceStage(ctx.conversationStage, intent, ctx);

  const extractedPhone = tryExtractPhone(normMessage) ?? ctx.phone ?? leadContext?.phone;
  if (extractedPhone && !ctx.phone) ctx.phone = extractedPhone;

  const buildUpdatedContext = () => ({
    roomSize: ctx.roomSize || extractedRoomSize,
    lastTopic: ctx.lastTopic,
    lastIntent: intent,
    lastQuestionAsked: ctx.lastQuestionAsked,
    city: ctx.city || leadContext?.city,
    service: ctx.service || leadContext?.service,
    roomType: ctx.roomType || leadContext?.roomType,
    budget: ctx.budget || leadContext?.budget,
    conversationStage: ctx.conversationStage,
  });

  if (intent === "off_topic") {
    res.json({ ok: true, reply: "Main sirf JK Interior ke services ke baare mein help kar sakti hoon. Kaunsa room design karna hai? 😊", source: "local", updatedContext: buildUpdatedContext() });
    return;
  }

  if (intent === "view_catalog") {
    res.json({ ok: true, reply: "Bilkul! Hamara Design Catalog dekhne ke liye WhatsApp karein: +91 8651070831 — hum PDF bhej denge! Koi specific design pasand hai?", source: "local", updatedContext: buildUpdatedContext() });
    return;
  }

  if (intent === "book_visit") {
    res.json({ ok: true, reply: "Zaroor! Hamari team bilkul free mein site visit karegi. Apna **naam, shehar aur WhatsApp number** yahan type karein. 😊", source: "local", updatedContext: { ...buildUpdatedContext(), conversationStage: "booking" } });
    return;
  }

  if (normMessage.length < 30 && (leadContext?.lastTopic || leadContext?.lastIntent)) {
    const followUpResolution = resolveFollowUpIntent(normMessage, {
      lastIntent: leadContext?.lastIntent,
      lastMaterial: leadContext?.lastTopic,
      lastCity: leadContext?.city,
      lastRoomType: leadContext?.roomType,
      lastBudget: leadContext?.budget,
      lastTopic: leadContext?.lastTopic,
      messagesSinceGreeting: ctx.messagesExchanged || 0,
      isInActivePricing: ctx.lastTopic ? true : false,
    });
    if (followUpResolution.confidence > 0.5) {
      if (followUpResolution.intent === "pricing_continuation") ctx.lastIntent = "pricing";
      else if (followUpResolution.intent === "lead_confirmation") ctx.lastIntent = "booking";
    }
  }

  const engineReply = consultantReply(normMessage, ctx);
  if (engineReply && !isRepetitive(engineReply, history)) {
    res.json({ ok: true, reply: engineReply, source: "local", updatedContext: buildUpdatedContext() });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY ?? "";
  if (!apiKey) {
    res.json({ ok: true, reply: smartFallback(leadContext, message, intent, ctx), source: "local", updatedContext: buildUpdatedContext() });
    return;
  }

  try {
    const systemPrompt = buildGroqSystemPrompt(buildSystemPrompt(leadContext), leadContext, ctx, intent);
    const reply = await callGroq(systemPrompt, history, message, apiKey);
    if (isRepetitive(reply, history)) {
      res.json({ ok: true, reply: smartFallback(leadContext, message, intent, ctx), source: "local", updatedContext: buildUpdatedContext() });
      return;
    }
    res.json({ ok: true, reply, source: "groq", updatedContext: buildUpdatedContext() });
  } catch {
    res.json({ ok: true, reply: smartFallback(leadContext, message, intent, ctx), source: "local", updatedContext: buildUpdatedContext() });
  }
});

export default router;

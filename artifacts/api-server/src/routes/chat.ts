import { Router } from "express";
import { z } from "zod";
import { buildSystemPrompt } from "../lib/business-data.js";
import {
  consultantReply,
  detectService,
  detectRoomType,
  detectBudgetLevel,
  normalizeTypos,
  isOffHours,
  detectMultiRoomSizes,
  detectCity,
  type ConversationContext,
} from "../lib/consultant-engine.js";
import { resolveFollowUpIntent } from "../lib/context-engine.js";
import {
  detectIntent,
  isRepetitiveReply,
  normalizeHinglish,
  type Intent,
} from "../lib/chat-nlp.js";

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

// ─── In-memory rate limiter ──────────────────────────────────────────────────
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

// ─── Analytics tracking ──────────────────────────────────────────────────────
const unansweredIntentStats = new Map<string, number>();
function trackUnanswered(reason: string): void {
  unansweredIntentStats.set(reason, (unansweredIntentStats.get(reason) ?? 0) + 1);
}

router.get("/chat/analytics", (_req, res) => {
  const intents = Array.from(unansweredIntentStats.entries())
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
  res.json({ ok: true, unanswered: intents });
});

// ─── Room dimension extractor ────────────────────────────────────────────────
function extractRoomDimensions(text: string): string | null {
  const t = text.toLowerCase();
  // Skip phone numbers, times, dates
  const SKIP = [
    /\d+\s*(?:baje?|am\b|pm\b)/,
    /\d+\s*(?:din|day|week|month|saal)/,
    /[6-9]\d{9}/,
    /\d{10,}/,
  ];
  for (const s of SKIP) { if (s.test(t)) return null; }

  // Check for multi-room (handle separately)
  const multiCheck = /(\d{1,3})\s*[x×*]\s*(\d{1,3})/gi;
  let mc = 0;
  while (multiCheck.exec(text) !== null) { mc++; if (mc > 1) return "MULTI_ROOM_DETECTED"; }

  const m = text.match(/(\d{1,3})\s*[x×*]\s*(\d{1,3})/i);
  if (m) {
    const l = parseInt(m[1]), w = parseInt(m[2]);
    if (l >= 5 && w >= 5 && l <= 80 && w <= 80) return `${Math.max(l, w)}x${Math.min(l, w)}`;
  }
  return null;
}

// ─── Phone extractor ─────────────────────────────────────────────────────────
function tryExtractPhone(text: string): string | null {
  const m = text.match(/(?:^|\s|:)([6-9]\d{9})(?:\s|$)/);
  return m ? m[1] : null;
}

// ─── Build engine context from lead context + history ────────────────────────
function buildEngineContext(
  lead: ChatRequest["leadContext"],
  history: Array<{ role: "user" | "assistant"; content: string }>
): ConversationContext {
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

  // Infer lastTopic from recent assistant messages if not set
  const recentAssistant = history.slice().reverse().find((m) => m.role === "assistant");
  if (recentAssistant && !ctx.lastTopic) {
    const a = recentAssistant.content.toLowerCase();
    if (a.includes("pvc")) ctx.lastTopic = "pvc";
    else if (a.includes("gypsum")) ctx.lastTopic = "gypsum";
    else if (a.includes("wpc")) ctx.lastTopic = "wpc";
    else if (a.includes("uv marble") || a.includes("uv sheet")) ctx.lastTopic = "uv";
    else if (a.includes("fluted") || a.includes("ribbed")) ctx.lastTopic = "fluted";
    else if (a.includes("grid ceiling")) ctx.lastTopic = "grid";
    else if (a.includes("tv unit") || a.includes("modular")) ctx.lastTopic = "tvunit";
    else if (a.includes("acoustic")) ctx.lastTopic = "acoustic";
    else if (a.includes("flooring") || a.includes("laminate")) ctx.lastTopic = "flooring";
  }

  // Scan recent user messages to fill missing context fields
  for (const msg of history.slice(-8)) {
    if (msg.role !== "user") continue;
    const norm = normalizeHinglish(normalizeTypos(msg.content.toLowerCase()));
    if (!ctx.service) { const s = detectService(norm); if (s) ctx.service = s.name; }
    if (!ctx.roomType) { const r = detectRoomType(norm); if (r) ctx.roomType = r.label; }
    if (!ctx.budget) { const b = detectBudgetLevel(norm); if (b) ctx.budget = b; }
    if (!ctx.city) { const c = detectCity(norm); if (c) ctx.city = c; }
    if (!ctx.roomSize) {
      const d = extractRoomDimensions(norm);
      if (d && d !== "MULTI_ROOM_DETECTED") ctx.roomSize = d;
    }
  }
  return ctx;
}

// ─── Stage advancement ────────────────────────────────────────────────────────
function advanceStage(
  currentStage: ConversationContext["conversationStage"],
  intent: Intent,
  ctx: ConversationContext
): ConversationContext["conversationStage"] {
  if (!currentStage || currentStage === "greeting") {
    if (intent !== "greeting" && intent !== "off_topic") return "discovery";
  }
  if (currentStage === "discovery") {
    if (ctx.service || ctx.roomType) return "consultation";
  }
  if (currentStage === "consultation") {
    if (ctx.roomSize || intent === "pricing") return "estimation";
  }
  if (currentStage === "estimation") {
    if (intent === "booking" || intent === "affirmation") return "booking";
  }
  return currentStage ?? "discovery";
}

// ─── Intent confidence scorer ─────────────────────────────────────────────────
// Generous scoring: valid messages should almost never hit the clarify path
function scoreIntentConfidence(message: string, intent: Intent, ctx: ConversationContext): number {
  const t = message.toLowerCase();
  let score = 0.4;

  // Explicit intent detected = highly confident
  if (intent !== "unknown") score += 0.35;

  // Contains question mark
  if (/[?]/.test(message)) score += 0.05;

  // Contains domain keywords
  if (/\b(price|rate|booking|visit|gypsum|pvc|wpc|uv|ceiling|interior|room|city|patna|araria|forbesganj|wall|panel|design|floor|marble|acoustic|estimate|kitna|lagega|kharcha|mahnga|sasta|waterproof|install|warranty|guarantee|tv\s*unit)\b/i.test(t)) {
    score += 0.2;
  }

  // Message has decent length
  if (message.trim().split(/\s+/).length >= 3) score += 0.06;

  // Has dimension (always confident)
  if (/\d{1,3}\s*[x×]\s*\d{1,3}/i.test(t)) score += 0.3;

  // Follow-up context: short replies that reference prior topic
  if (ctx.lastTopic && /(kitna|price|uska|same|wohi|aur|phir|haan|nahi|isme|bhi|acha|ok|theek)\b/i.test(t)) {
    score += 0.15;
  }

  // Affirmation/negation in any context = valid
  if (intent === "affirmation" || intent === "negation") score += 0.2;

  // Pure greeting = always valid
  if (intent === "greeting") score += 0.25;

  // Has phone number
  if (/[6-9]\d{9}/.test(t)) score += 0.2;

  // Hindi-only messages (Devanagari) = likely valid, don't penalize
  if (/[\u0900-\u097F]/.test(message)) score += 0.15;

  return Math.max(0, Math.min(1, score));
}

// ─── Clarifying question builder ──────────────────────────────────────────────
function buildClarifyingQuestion(message: string, ctx: ConversationContext): string {
  const nm = ctx.name ? `${ctx.name} ji, ` : "";

  if (!ctx.service && /(price|rate|kitna|cost|estimate|kharcha)/i.test(message)) {
    return `${nm}Kaunse kaam ka estimate chahiye? (PVC, Gypsum, WPC, UV Marble, ya TV Unit) — seedha bata dijiye! 😊`;
  }
  if (ctx.service && !ctx.roomSize && /(price|estimate|kitna|lagega)/i.test(message)) {
    return `${nm}${ctx.service} ke liye room ka size bata dijiye (jaise 12×14 ft) — exact estimate abhi nikaalta hoon! 📐`;
  }
  if (!ctx.city && /(available|service|aoge|visit|book|kaam|karein)/i.test(message)) {
    return `${nm}Aap kis city/town mein hain? Batayein — service availability aur next step confirm kar deta hoon. 😊`;
  }
  return `${nm}Kya jaanna chahte hain — pricing, design ideas, ya free site visit? Batao! 😊`;
}

// ─── Smart fallback (when no Groq) ───────────────────────────────────────────
function smartFallback(
  lead: ChatRequest["leadContext"],
  message: string,
  intent: Intent,
  ctx: ConversationContext
): string {
  const nm = lead?.name ? `${lead.name} ji, ` : "";
  const oh = isOffHours();

  if (intent === "off_topic") {
    return `${nm}Main sirf JK Interior services mein help karti hoon — false ceiling, wall panels, aur interior estimate. Kaunsa room ka kaam karwana hai? 😊`;
  }

  if (intent === "booking" || intent === "book_visit") {
    if (ctx.phone) {
      return oh
        ? `${nm}Booking note kar li! 🙌 Team kal 9 AM pe call karegi. Urgent ho toh WhatsApp: +91 8651070831`
        : `${nm}Booking note kar li! 🙌 Hum 2-3 ghante mein call karenge. WhatsApp: +91 8651070831`;
    }
    return `${nm}Bilkul! Free site visit arrange kar dete hain — koi charge nahi. 📞 Apna WhatsApp number share karein, team call karegi!`;
  }

  if (intent === "view_catalog") {
    return `${nm}Hamare latest designs aur price list WhatsApp pe available hain! 📱 Message karein: +91 8651070831 — PDF + photos turant bhej denge!`;
  }

  if (intent === "pricing") {
    if (!ctx.service) {
      return `💰 JK Interior Rates:\n• Gypsum Ceiling — ₹80–140/sq.ft\n• PVC Ceiling — ₹80–140/sq.ft\n• WPC Wall Panels — ₹180–450/sq.ft\n• UV Marble Sheets — ₹50–95/sq.ft\n• Modular TV Unit — ₹15,000 se shuru\n\nKaunse kaam ka estimate chahiye?`;
    }
    if (ctx.service && !ctx.roomSize) {
      return `${nm}${ctx.service} ke liye room ka size batao (jaise 12×14 ft) — exact estimate nikaalta hoon! 📐`;
    }
  }

  if (intent === "faq") {
    return `${nm}JK Interior mein:\n✅ 1 saal written warranty on all work\n✅ ISI-certified materials\n✅ Free site visit — zero obligation\n✅ 8+ saal, 500+ completed projects\n\nKoi specific sawaal? Batao! 😊`;
  }

  if (intent === "material_info") {
    if (ctx.service) {
      return `${nm}${ctx.service} ke baare mein aur kya jaanna chahte hain? Rate, installation time, ya design options? 😊`;
    }
  }

  if (!ctx.service && !ctx.roomType) {
    return `${nm}Kaunsa kaam karwana hai — ceiling design, wall panels, TV unit, ya flooring? Batao! 🏠`;
  }
  if (ctx.service && !ctx.roomSize) {
    return `${nm}${ctx.service} ke liye room ka size batao (jaise 12×14 ft) 📐`;
  }
  return `${nm}Kya jaanna chahte hain — pricing, design ideas, ya free site visit? Batao! 😊`;
}

// ─── Groq system prompt builder ───────────────────────────────────────────────
function buildGroqSystemPrompt(
  basePrompt: string,
  leadContext: ChatRequest["leadContext"],
  ctx: ConversationContext,
  intent: Intent,
  history: Array<{ role: "user" | "assistant"; content: string }>
): string {
  // Summarize what has already been discussed to prevent repeating
  const discussedTopics: string[] = [];
  if (ctx.service) discussedTopics.push(`service: ${ctx.service}`);
  if (ctx.roomType) discussedTopics.push(`room: ${ctx.roomType}`);
  if (ctx.roomSize) discussedTopics.push(`size: ${ctx.roomSize} ft`);
  if (ctx.city) discussedTopics.push(`city: ${ctx.city}`);
  if (ctx.budget) discussedTopics.push(`budget preference: ${ctx.budget}`);

  // What questions have already been asked (from last 3 assistant turns)
  const recentReplies = history.slice(-6).filter(m => m.role === "assistant").map(m => m.content.slice(0, 120));

  const contextBlock = `

=== CUSTOMER CONTEXT (already known — do NOT re-ask these) ===
Name: ${ctx.name || "not shared"}
Phone: ${ctx.phone ? "YES — do NOT ask again" : "not shared"}
City: ${ctx.city || "not mentioned"}
Service interest: ${ctx.service || "not specified"}
Room size: ${ctx.roomSize ? ctx.roomSize + " ft" : "not given"}
Room type: ${ctx.roomType || "not specified"}
Budget level: ${ctx.budget || "not specified"}
Last topic discussed: ${ctx.lastTopic || "none"}
Conversation stage: ${ctx.conversationStage}
Detected intent: ${intent}
Already discussed: ${discussedTopics.length ? discussedTopics.join(", ") : "nothing specific yet"}
=========================================================

=== LAST 3 ASSISTANT REPLIES (do NOT repeat these) ===
${recentReplies.length ? recentReplies.map((r, i) => `[${i + 1}] ${r}`).join("\n") : "None yet"}
=====================================================

=== ABSOLUTE RULES — FOLLOW STRICTLY ===
1. ANSWER the user's exact question FIRST before asking anything.
2. NEVER invent prices outside these ranges:
   - Gypsum: ₹80–140/sq.ft (premium with LED: ₹120–200/sq.ft)
   - PVC: ₹80–140/sq.ft
   - WPC: ₹180–450/sq.ft
   - UV Marble: ₹50–95/sq.ft
   - TV Unit: ₹15,000–₹60,000+
   - Fluted: ₹200–500/sq.ft
   - Grid: ₹45–90/sq.ft
   - Acoustic: ₹150–400/sq.ft
   - Flooring: ₹80–200/sq.ft
3. NEVER invent services JK Interior doesn't offer.
4. NEVER invent cities outside: Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul, Purnia (80 km radius).
5. If unsure about any information, say "site visit mein exact details milenge" — never guess.
6. Reply in SAME LANGUAGE as customer (Hindi, English, or Hinglish mix).
7. Max 5-6 lines. Bullets only for lists/pricing.
8. Do NOT start with "Bilkul!" or "Zaroor!" — vary openers.
9. Do NOT repeat information already in the "Already discussed" list above.
10. Do NOT ask for info already marked as known in Customer Context.
11. If customer gives dimensions (e.g. 12×14), CALCULATE estimate immediately.
12. Off-topic questions: reply ONLY "Main sirf JK Interior ke interior services ke baare mein help kar sakti hoon."
=========================================`;

  return basePrompt + contextBlock;
}

// ─── Groq API caller ──────────────────────────────────────────────────────────
async function callGroq(
  systemPrompt: string,
  history: Array<{ role: "user" | "assistant"; content: string }>,
  message: string,
  apiKey: string
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          ...history.slice(-16),   // increased from 12 → 16 for better memory
          { role: "user", content: message },
        ],
        max_tokens: 380,
        temperature: 0.3,          // lowered from 0.65 → 0.3 to reduce hallucinations
        top_p: 0.85,
        stream: false,
      }),
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
    const data = await res.json() as any;
    return data.choices?.[0]?.message?.content?.trim() || "";
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

// ─── Main chat handler ────────────────────────────────────────────────────────
router.post("/chat", async (req, res) => {
  const ip = String(
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown"
  ).split(",")[0].trim();

  if (!checkRate(ip)) {
    res.status(429).json({ ok: false, error: "Too many requests" });
    return;
  }

  const parsed = ChatSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "invalid_request", issues: parsed.error.flatten() });
    return;
  }

  const startedAt = Date.now();
  const { message, history, leadContext } = parsed.data;

  // Normalize the message (Devanagari → Roman, typos, Hinglish)
  const normMessage = normalizeHinglish(normalizeTypos(message?.trim() || ""));
  const assistantHistory = history.filter((m) => m.role === "assistant").map((m) => m.content);

  // ─── Detect intent ONCE ───────────────────────────────────────────────────
  const intent = detectIntent(normMessage);

  // ─── Extract room dimensions ──────────────────────────────────────────────
  const extractedRoomSize = extractRoomDimensions(normMessage) ?? leadContext?.roomSize ?? undefined;

  // ─── Handle multi-room estimation ─────────────────────────────────────────
  if (extractedRoomSize === "MULTI_ROOM_DETECTED") {
    const multiRooms = detectMultiRoomSizes(normMessage);
    if (multiRooms.length > 1) {
      const svcKey = (leadContext?.service || "").toLowerCase();
      const priceLow  = svcKey.includes("wpc") ? 180 : svcKey.includes("uv") || svcKey.includes("marble") ? 50 : 80;
      const priceHigh = svcKey.includes("wpc") ? 450 : svcKey.includes("uv") || svcKey.includes("marble") ? 95 : 140;
      const svcLabel  = svcKey.includes("wpc") ? "WPC Wall Panels"
        : svcKey.includes("uv") || svcKey.includes("marble") ? "UV Marble Sheets"
        : svcKey.includes("pvc") ? "PVC Ceiling" : "Gypsum Ceiling";
      const topicSlug = svcKey.includes("wpc") ? "wpc"
        : svcKey.includes("uv") || svcKey.includes("marble") ? "uv"
        : svcKey.includes("pvc") ? "pvc" : "gypsum";

      let totalArea = 0;
      let breakdownText = "";
      multiRooms.forEach((room: any, i: number) => {
        totalArea += room.area;
        breakdownText += `${i + 1}. **${room.roomName}** (${room.length}×${room.width} = ${room.area} sq.ft): ₹${(room.area * priceLow).toLocaleString("en-IN")} – ₹${(room.area * priceHigh).toLocaleString("en-IN")}\n`;
      });

      const reply = `Aapke ${multiRooms.length} rooms ka ${svcLabel} estimate:\n\n${breakdownText}\n💰 **Grand Total:** ₹${(totalArea * priceLow).toLocaleString("en-IN")} – ₹${(totalArea * priceHigh).toLocaleString("en-IN")}\n\nFree site visit book karein? 😊`;
      res.json({
        ok: true, reply, source: "local",
        updatedContext: { roomSize: `${totalArea} sqft`, lastTopic: topicSlug, lastIntent: "pricing" },
      });
      return;
    }
  }

  // ─── Build context ────────────────────────────────────────────────────────
  const ctx = buildEngineContext(leadContext, history);

  // ─── Merge explicit lead context fields (highest priority) ────────────────
  if (!ctx.city && leadContext?.city) ctx.city = leadContext.city;
  if (!ctx.service && leadContext?.service) ctx.service = leadContext.service;
  if (!ctx.roomType && leadContext?.roomType) ctx.roomType = leadContext.roomType;
  if (!ctx.budget && leadContext?.budget) ctx.budget = leadContext.budget;
  if (!ctx.roomSize && extractedRoomSize) ctx.roomSize = extractedRoomSize;
  if (!ctx.phone && leadContext?.phone) ctx.phone = leadContext.phone;

  // ─── Extract phone from current message ──────────────────────────────────
  const extractedPhone = tryExtractPhone(normMessage) ?? ctx.phone;
  if (extractedPhone && !ctx.phone) ctx.phone = extractedPhone;

  // ─── Advance conversation stage ───────────────────────────────────────────
  ctx.conversationStage = advanceStage(ctx.conversationStage, intent, ctx);

  // ─── Check confidence — if too low, ask clarifying question ──────────────
  const intentConfidence = scoreIntentConfidence(normMessage, intent, ctx);
  if (intentConfidence < 0.45) {
    const reply = buildClarifyingQuestion(normMessage, ctx);
    res.json({
      ok: true, reply, source: "clarify", confidence: intentConfidence,
      updatedContext: { ...ctx, lastIntent: "unknown" },
    });
    return;
  }

  // ─── Build updatedContext closure ─────────────────────────────────────────
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
    phone: ctx.phone || leadContext?.phone,
    name: ctx.name || leadContext?.name,
  });

  // ─── Handle off-topic immediately ─────────────────────────────────────────
  if (intent === "off_topic") {
    res.json({
      ok: true,
      reply: "Main sirf JK Interior ke services ke baare mein help kar sakti hoon. 😊 Kaunsa room design karna hai?",
      source: "local",
      updatedContext: buildUpdatedContext(),
    });
    return;
  }

  // ─── Handle catalog request ───────────────────────────────────────────────
  if (intent === "view_catalog") {
    res.json({
      ok: true,
      reply: "Hamare latest designs aur catalog WhatsApp pe bhej denge! 📱 Message karein: +91 8651070831 — PVC, Gypsum, WPC sabke photos aur price list turant milegi!",
      source: "local",
      updatedContext: buildUpdatedContext(),
    });
    return;
  }

  // ─── Handle site visit request ────────────────────────────────────────────
  if (intent === "book_visit") {
    res.json({
      ok: true,
      reply: "Free site visit bilkul free hai! 🏠 Hamare expert aayenge, measure karenge, aur exact quote denge — koi obligation nahi.\n\nApna naam aur WhatsApp number share karein — visit schedule karte hain! 😊",
      source: "local",
      updatedContext: { ...buildUpdatedContext(), conversationStage: "booking" },
    });
    return;
  }

  // ─── Resolve follow-up intent for short messages ──────────────────────────
  if (normMessage.length < 40 && (leadContext?.lastTopic || leadContext?.lastIntent || ctx.lastTopic)) {
    const followUp = resolveFollowUpIntent(normMessage, {
      lastIntent: leadContext?.lastIntent,
      lastMaterial: leadContext?.lastTopic || ctx.lastTopic,
      lastCity: leadContext?.city || ctx.city,
      lastRoomType: leadContext?.roomType || ctx.roomType,
      lastBudget: leadContext?.budget || ctx.budget || undefined,
      lastTopic: leadContext?.lastTopic || ctx.lastTopic,
      messagesSinceGreeting: ctx.messagesExchanged || 0,
      isInActivePricing: !!(ctx.lastTopic || ctx.service),
      lastQuestionAsked: leadContext?.lastQuestionAsked,
    });

    // Apply extracted data from follow-up resolution
    if (followUp.confidence > 0.6 && followUp.extractedData) {
      const ed = followUp.extractedData;
      if (ed.city && !ctx.city) ctx.city = ed.city;
      if (ed.roomType && !ctx.roomType) ctx.roomType = ed.roomType;
      if (ed.roomSize && !ctx.roomSize) ctx.roomSize = ed.roomSize;
      if (ed.material && !ctx.lastTopic) ctx.lastTopic = ed.material;
      if (ed.budget && !ctx.budget) {
        ctx.budget = ed.budget as "low" | "mid" | "high";
      }
    }

    // Promote intent for follow-up
    if (followUp.confidence > 0.5) {
      if (followUp.intent === "pricing_continuation" || followUp.intent === "price_inquiry_continuation") {
        ctx.lastIntent = "pricing" as any;
      } else if (followUp.intent === "lead_confirmation") {
        ctx.lastIntent = "booking" as any;
      }
    }
  }

  // ─── Try local consultant engine first ───────────────────────────────────
  const engineReply = consultantReply(normMessage, ctx);
  if (engineReply && !isRepetitiveReply(engineReply, assistantHistory)) {
    res.json({
      ok: true, reply: engineReply, source: "local",
      latencyMs: Date.now() - startedAt,
      updatedContext: buildUpdatedContext(),
    });
    return;
  }

  // ─── Fall back to Groq if available ─────────────────────────────────────
  const apiKey = process.env.GROQ_API_KEY ?? "";
  if (!apiKey) {
    trackUnanswered(`no_groq:${intent}`);
    res.json({
      ok: true,
      reply: smartFallback(leadContext, message, intent, ctx),
      source: "local",
      latencyMs: Date.now() - startedAt,
      updatedContext: buildUpdatedContext(),
    });
    return;
  }

  try {
    const systemPrompt = buildGroqSystemPrompt(
      buildSystemPrompt(leadContext),
      leadContext,
      ctx,
      intent,
      history
    );
    const reply = await callGroq(systemPrompt, history, message, apiKey);

    if (!reply || isRepetitiveReply(reply, assistantHistory)) {
      trackUnanswered(`repetitive:${intent}`);
      res.json({
        ok: true,
        reply: smartFallback(leadContext, message, intent, ctx),
        source: "local",
        latencyMs: Date.now() - startedAt,
        updatedContext: buildUpdatedContext(),
      });
      return;
    }

    res.json({
      ok: true, reply, source: "groq",
      latencyMs: Date.now() - startedAt,
      updatedContext: buildUpdatedContext(),
    });
  } catch (error) {
    req.log?.error(
      { err: error, route: "chat", source: "groq", message: message.slice(0, 120) },
      "Groq call failed; using local fallback"
    );
    trackUnanswered(`groq_error:${intent}`);
    res.json({
      ok: true,
      reply: smartFallback(leadContext, message, intent, ctx),
      source: "local",
      latencyMs: Date.now() - startedAt,
      updatedContext: buildUpdatedContext(),
    });
  }
});

export default router;

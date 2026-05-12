import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"
import { consultantReply, ConversationContext } from "@/lib/consultant-engine"
import { buildSystemPrompt } from "@/lib/business-data"
import {
  ConversationMemory,
  extractFromText,
  mergeMemory,
  updateStage,
  summarizeForPrompt,
} from "@/lib/memory"

import { KNOWLEDGE_BASE } from "@/lib/knowledge-base"
import { galleryImages } from "@/lib/gallery-data"

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY || "",
})
// In-memory server-side session context (resets on cold start — acceptable for chat)
const sessionStore = new Map<string, ConversationContext>()

export async function POST(req: NextRequest) {
  const shouldStream = req.nextUrl.searchParams.get("stream") === "1"

  try {
    const body = await req.json()
    const { message, history = [], sessionId, leadContext, memory: incomingMemory } = body

    if (!message?.trim()) {
      return NextResponse.json({ ok: false, error: "Message is required" }, { status: 400 })
    }

    const sid = (sessionId as string) || "default"
    const ctx: ConversationContext = sessionStore.get(sid) ?? { messagesExchanged: 0 }

    // ── Merge incoming rich memory into session context ───────────────────────
    let sessionMemory: ConversationMemory | undefined = ctx.memory

    if (incomingMemory && typeof incomingMemory === "object") {
      const mem = incomingMemory as ConversationMemory

      // Extract new info from the current user message into memory
      const textUpdates = extractFromText(message, mem, "user")
      const mergedMem = mergeMemory(mem, textUpdates, false)
      mergedMem.stage = updateStage(mergedMem)

      sessionMemory = mergedMem
      ctx.memory = mergedMem

      // Back-fill the flat ctx fields from memory for rule engine
      if (mergedMem.name    && !ctx.name)    ctx.name    = mergedMem.name
      if (mergedMem.phone   && !ctx.phone)   ctx.phone   = mergedMem.phone
      if (mergedMem.city    && !ctx.city)    ctx.city    = mergedMem.city
      if (mergedMem.currentRoom && !ctx.roomType) ctx.roomType = mergedMem.currentRoom
    }

    // Legacy leadContext back-fill (kept for compatibility)
    if (leadContext) {
      if (leadContext.name    && !ctx.name)    ctx.name    = leadContext.name
      if (leadContext.phone   && !ctx.phone)   ctx.phone   = leadContext.phone
      if (leadContext.city    && !ctx.city)    ctx.city    = leadContext.city
      if (leadContext.service && !ctx.service) ctx.service = leadContext.service
    }

    // ── Step 1: Fast rule-based consultant engine ────────────────────────────

const ruleReply = consultantReply(message, ctx)

const lowerMsg = message.toLowerCase()

// Questions that should go to Gemini AI
const aiQuestions =
  lowerMsg.includes("best") ||
  lowerMsg.includes("better") ||
  lowerMsg.includes("compare") ||
  lowerMsg.includes("suggest") ||
  lowerMsg.includes("idea") ||
  lowerMsg.includes("design") ||
  lowerMsg.includes("modern") ||
  lowerMsg.includes("premium") ||
  lowerMsg.includes("office") ||
  lowerMsg.includes("bedroom") ||
  lowerMsg.includes("bathroom") ||
  lowerMsg.includes("hall") ||
  lowerMsg.includes("kaunsa") ||
  lowerMsg.includes("kon sa") ||
  lowerMsg.includes("kaun sa") ||
  lowerMsg.includes("gypsum") ||
  lowerMsg.includes("pvc") ||
  lowerMsg.includes("price") ||
  lowerMsg.includes("rate") ||
  lowerMsg.includes("prize") ||
  lowerMsg.includes("cost") ||
  lowerMsg.includes("kharcha") ||
  lowerMsg.includes("estimate") ||
  lowerMsg.includes("ceiling") ||
  lowerMsg.includes("wpc") ||
  lowerMsg.includes("charcoal")
    
// Use rules only for greetings + quick estimate replies
const shouldUseRule =
  ruleReply &&
  !aiQuestions &&
  (
    lowerMsg === "hi" ||
    lowerMsg === "hello" ||
    lowerMsg === "hii" ||
    lowerMsg === "hey" ||
    lowerMsg.includes("12x") ||
    lowerMsg.includes("10x") ||
    lowerMsg.includes("estimate") ||
    lowerMsg.includes("sqft") ||
    lowerMsg.includes("price list")
  )

if (shouldUseRule) {
  ctx.messagesExchanged++
  sessionStore.set(sid, ctx)

  return NextResponse.json({
    ok: true,
    reply: ruleReply,
    source: "rule",
  })
}
    // ── Step 2: Gemini AI ────────────────────────────────────────────────────
    const hasKey = !!process.env.AI_INTEGRATIONS_GEMINI_API_KEY
    if (!hasKey) {
      return NextResponse.json({
        ok: true,
        reply: "Main abhi busy hoon — please call/WhatsApp karein: +91 8651070831 😊",
        source: "fallback",
      })
    }

    // Build rich memory summary for Gemini system prompt
    const memorySummary = sessionMemory ? summarizeForPrompt(sessionMemory) : undefined

    const basePrompt = buildSystemPrompt({
  name: ctx.name,
  phone: ctx.phone,
  city: ctx.city,
  service: ctx.service,
  budget: ctx.budget as string | undefined,
  roomSize: ctx.roomSize,
  memorySummary,
})

// Website knowledge injection
const websiteKnowledge = `
FAQ DATA:
${JSON.stringify(KNOWLEDGE_BASE).slice(0, 4000)}

DESIGN GALLERY:
Gallery images are already available in the website UI.

Never write image file names like:
gypsum.jpg, pvc1.jpg, image1.png

Instead say naturally:
"Main aapko kuch popular designs dikha raha hoon."
`

const systemPrompt = `
${basePrompt}

You are JK Interior's premium AI consultant from Bihar.

Use the website knowledge below to answer accurately.

Current Conversation Context:
- Last topic: ${ctx.lastTopic || "unknown"}
- Current service: ${ctx.service || "unknown"}
- Room type: ${ctx.roomType || "unknown"}
- Budget level: ${ctx.budget || "unknown"}
- Customer city: ${ctx.city || "unknown"}

Rules:
- Talk like a real human interior consultant, not a robot
- Keep answers conversational, warm, and practical
- Use simple Hindi + natural English mix
- Avoid overly formal or repetitive replies
- Avoid too many bullet points unless needed
- First understand the user's need, room type, budget, and purpose
- Give practical recommendations like an experienced contractor
- Mention durability, maintenance, waterproofing, lighting, budget, and appearance naturally
- Use website data and gallery examples in answers
- Never say "I am busy"
- Do not repeat greetings in every reply
- Do not force users to call or WhatsApp immediately
- Suggest site visit or WhatsApp only when helpful
- Keep replies short to medium length
- Sound confident, friendly, and local
- Remember previous conversation naturally
- Continue follow-up questions intelligently
- Do not suddenly change topics
- If user asks "best", compare options practically
- If user gives room size, recommend suitable material first, then estimate

Tone Examples:

User: Office ke liye kaunsa ceiling best rahega?
Assistant:
Agar office ko modern aur premium look dena hai toh gypsum false ceiling best rahega. Hidden LED lighting bhi easily ho jata hai aur overall finishing classy lagti hai. Agar low-maintenance aur budget-friendly option chahiye toh grid ceiling bhi kaafi practical rehta hai.

User: PVC ya gypsum?
Assistant:
Agar moisture ya pani ka issue ho toh PVC better rahega kyunki waterproof hota hai. Lekin premium finishing aur elegant office look ke liye gypsum zyada stylish lagta hai.

${websiteKnowledge}
`

const historyMsgs: any[] = (history as { role: string; content: string }[])
  .filter(h => h?.content?.trim())
  .slice(-14)
  .map(h => ({
    role: h.role === "assistant" ? "model" : "user",
    parts: [{ text: h.content }],
  }))

const contextMemory = `
Customer Info:
- Name: ${ctx.name || "Unknown"}
- City: ${ctx.city || "Unknown"}
- Service Interest: ${ctx.service || "Unknown"}
- Room Type: ${ctx.roomType || "Unknown"}
- Budget: ${ctx.budget || "Unknown"}
- Previous Topic: ${ctx.lastTopic || "Unknown"}
`

const contents: any[] = [
  {
    role: "model",
    parts: [{ text: contextMemory }],
  },

  ...historyMsgs,

  {
    role: "user",
    parts: [{ text: message }],
  },
]

ctx.messagesExchanged++
sessionStore.set(sid, ctx)

// ── Streaming response (for chat UI) ─────────────────────────────────────
if (shouldStream) {

  console.log("Sending STREAM request to Gemini:", {
    message,
    hasKey,
    historyLength: history.length,
  })

  const result = await ai.models.generateContentStream({
  model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction: systemPrompt,
      maxOutputTokens: 500,
      temperature: 0.8,
    },
  })

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result) {
          const text = chunk.text ?? ""

          if (text) {
            controller.enqueue(encoder.encode(text))
          }
        }
      } catch (error) {
        console.error("Streaming error:", error)
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Source": "gemini",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache",
    },
  })
}

// ── Non-streaming fallback ────────────────────────────────────────────────

console.log("Sending NORMAL request to Gemini:", {
  message,
  hasKey,
  historyLength: history.length,
})

const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents,
  config: {
    systemInstruction: systemPrompt,
    maxOutputTokens: 500,
    temperature: 0.8,
  },
})

const reply = result.text ?? ""

return NextResponse.json({
  ok: true,
  reply,
  source: "gemini",
})

} catch (err: unknown) {

  console.error("FULL GEMINI ERROR:", err)

  const msg = err instanceof Error ? err.message : String(err)

  console.error("Chat API error:", msg)

  return NextResponse.json({
    ok: true,
    reply:
      "Thoda network issue aa gaya 😅 Aap dobara message bhejiye ya WhatsApp kar sakte hain: +91 8651070831",
    source: "fallback",
  })
}
}

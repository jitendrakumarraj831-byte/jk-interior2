// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"
import { consultantReply, ConversationContext } from "@/lib/consultant-engine"
import { buildSystemPrompt } from "@/lib/business-data"

// ── Gemini init — Replit AI Integration pattern (required) ───────────────────
const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY || "",
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "",
  },
})

// ── In-memory server-side session context ────────────────────────────────────
const sessionStore = new Map<string, ConversationContext>()

// ── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, history = [], sessionId, leadContext } = body

    if (!message?.trim()) {
      return NextResponse.json({ ok: false, error: "Message is required" }, { status: 400 })
    }

    // Retrieve or create server-side context
    const sid = (sessionId as string) || "default"
    const ctx: ConversationContext = sessionStore.get(sid) ?? { messagesExchanged: 0 }

    // Merge client lead context (never overwrite existing data)
    if (leadContext) {
      if (leadContext.name    && !ctx.name)    ctx.name    = leadContext.name
      if (leadContext.phone   && !ctx.phone)   ctx.phone   = leadContext.phone
      if (leadContext.city    && !ctx.city)    ctx.city    = leadContext.city
      if (leadContext.service && !ctx.service) ctx.service = leadContext.service
    }

    // ── Step 1: Fast rule-based consultant engine ─────────────────────────────
    const ruleReply = consultantReply(message, ctx)
    if (ruleReply) {
      ctx.messagesExchanged++
      sessionStore.set(sid, ctx)
      return NextResponse.json({ ok: true, reply: ruleReply, source: "rule" })
    }

    // ── Step 2: Gemini AI with conversation history ───────────────────────────
    const hasKey = !!process.env.AI_INTEGRATIONS_GEMINI_API_KEY
    if (!hasKey) {
      return NextResponse.json({
        ok: true,
        reply: "Main abhi busy hoon — please call/WhatsApp karein: +91 8651070831 😊",
        source: "fallback",
      })
    }

    const systemPrompt = buildSystemPrompt({
      name:     ctx.name,
      phone:    ctx.phone,
      city:     ctx.city,
      service:  ctx.service,
      budget:   ctx.budget as string | undefined,
      roomSize: ctx.roomSize,
    })

    // Build message history for Gemini (last 14 exchanges + current message)
    const historyMsgs = (history as { role: string; content: string }[])
      .slice(-14)
      .map(h => ({
        role:  h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }],
      }))

    const contents = [
      ...historyMsgs,
      { role: "user", parts: [{ text: message }] },
    ]

    const result = await ai.models.generateContent({
      model:    "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens:   2048,
      },
    })

    const reply = result.text ?? ""

    ctx.messagesExchanged++
    sessionStore.set(sid, ctx)

    return NextResponse.json({ ok: true, reply, source: "gemini" })

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("Chat API error:", msg)
    return NextResponse.json({
      ok: true,
      reply: "Ek second rukein — dobara try karein ya WhatsApp karein: +91 8651070831 📱",
      source: "fallback",
    })
  }
}

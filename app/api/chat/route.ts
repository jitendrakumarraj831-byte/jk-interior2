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

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY || "",
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "",
  },
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
      const textUpdates = extractFromText(message, mem, "user")
      const mergedMem = mergeMemory(mem, textUpdates, false)
      mergedMem.stage = updateStage(mergedMem)
      sessionMemory = mergedMem
      ctx.memory = mergedMem
      if (mergedMem.name        && !ctx.name)     ctx.name     = mergedMem.name
      if (mergedMem.phone       && !ctx.phone)    ctx.phone    = mergedMem.phone
      if (mergedMem.city        && !ctx.city)     ctx.city     = mergedMem.city
      if (mergedMem.currentRoom && !ctx.roomType) ctx.roomType = mergedMem.currentRoom
    }

    // Legacy leadContext back-fill (kept for compatibility)
    if (leadContext) {
      if (leadContext.name    && !ctx.name)    ctx.name    = leadContext.name
      if (leadContext.phone   && !ctx.phone)   ctx.phone   = leadContext.phone
      if (leadContext.city    && !ctx.city)    ctx.city    = leadContext.city
      if (leadContext.service && !ctx.service) ctx.service = leadContext.service
    }

    // ── Step 1: Fast rule-based consultant engine ─────────────────────────────
    // If the rule engine has a confident answer, return it immediately — no Gemini call needed.
    const ruleReply = consultantReply(message, ctx)
    if (ruleReply) {
      ctx.messagesExchanged++
      sessionStore.set(sid, ctx)
      return NextResponse.json({ ok: true, reply: ruleReply, source: "rule" })
    }

    // ── Step 2: Gemini AI ─────────────────────────────────────────────────────
    if (!process.env.AI_INTEGRATIONS_GEMINI_API_KEY) {
      return NextResponse.json({
        ok: true,
        reply: "Main abhi busy hoon — please call/WhatsApp karein: +91 8651070831 😊",
        source: "fallback",
      })
    }

    // Build system prompt with memory summary (only when memory has real data)
    const memorySummary = sessionMemory ? summarizeForPrompt(sessionMemory) : undefined
    const systemPrompt = buildSystemPrompt({
      name:     ctx.name,
      phone:    ctx.phone,
      city:     ctx.city,
      service:  ctx.service,
      budget:   ctx.budget as string | undefined,
      roomSize: ctx.roomSize,
      memorySummary,
    })

    // Trim history to last 6 messages (3 exchanges) — keeps token count low
    const historyMsgs = (history as { role: string; content: string }[])
      .filter(h => h?.content?.trim())
      .slice(-6)
      .map(h => ({
        role:  h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }],
      }))

    const contents: { role: string; parts: { text: string }[] }[] = [
      ...historyMsgs,
      { role: "user", parts: [{ text: message }] },
    ]

    ctx.messagesExchanged++
    sessionStore.set(sid, ctx)

    // ── Streaming response ─────────────────────────────────────────────────────
    if (shouldStream) {
      const result = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction: systemPrompt,
          maxOutputTokens: 600,
          temperature: 0.8,
        },
      })

      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result) {
              const text = chunk.text ?? ""
              if (text) controller.enqueue(encoder.encode(text))
            }
          } catch (err) {
            console.error("Streaming error:", err)
          } finally {
            controller.close()
          }
        },
      })

      return new Response(stream, {
        headers: {
          "Content-Type":           "text/plain; charset=utf-8",
          "X-Source":               "gemini",
          "X-Content-Type-Options": "nosniff",
          "Cache-Control":          "no-cache",
        },
      })
    }

    // ── Non-streaming fallback ─────────────────────────────────────────────────
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 600,
        temperature: 0.8,
      },
    })

    return NextResponse.json({ ok: true, reply: result.text ?? "", source: "gemini" })

  } catch (err: unknown) {
    console.error("Chat API error:", err instanceof Error ? err.message : String(err))
    return NextResponse.json({
      ok: true,
      reply: "Ek second 😅 Reply generate karne me thodi problem hui. Dobara bhejiye.",
      source: "fallback",
    })
  }
}

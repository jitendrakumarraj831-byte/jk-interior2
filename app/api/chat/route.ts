import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai" // Corrected Import
import { consultantReply, ConversationContext } from "@/lib/consultant-engine"
import { buildSystemPrompt } from "@/lib/business-data"
import {
  ConversationMemory,
  extractFromText,
  mergeMemory,
  updateStage,
  summarizeForPrompt,
} from "@/lib/memory"

// 1. Correct SDK Initialization
const genAI = new GoogleGenerativeAI(process.env.AI_INTEGRATIONS_GEMINI_API_KEY || "");

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

    // --- Memory Logic ---
    let sessionMemory: ConversationMemory | undefined = ctx.memory
    if (incomingMemory && typeof incomingMemory === "object") {
      const mem = incomingMemory as ConversationMemory
      const textUpdates = extractFromText(message, mem, "user")
      const mergedMem = mergeMemory(mem, textUpdates, false)
      mergedMem.stage = updateStage(mergedMem)
      sessionMemory = mergedMem
      ctx.memory = mergedMem
      if (mergedMem.name) ctx.name = mergedMem.name
      if (mergedMem.phone) ctx.phone = mergedMem.phone
      if (mergedMem.city) ctx.city = mergedMem.city
      if (mergedMem.currentRoom) ctx.roomType = mergedMem.currentRoom
    }

    // --- Step 1: Rule Engine (Reduced Priority for Pricing) ---
    // Rule engine ko tabhi return karne dein jab wo sirf 'Greeting' ho. 
    // Pricing ke liye Gemini ko aane dein.
    const ruleReply = consultantReply(message, ctx)
    const isPriceQuery = message.toLowerCase().includes("price") || message.toLowerCase().includes("rate")
    
    if (ruleReply && !isPriceQuery) {
      ctx.messagesExchanged++
      sessionStore.set(sid, ctx)
      return NextResponse.json({ ok: true, reply: ruleReply, source: "rule" })
    }

    // --- Step 2: Gemini AI Setup ---
    if (!process.env.AI_INTEGRATIONS_GEMINI_API_KEY) {
      return NextResponse.json({
        ok: true,
        reply: "Main abhi busy hoon — please call/WhatsApp: +91 8651070831 😊",
        source: "fallback",
      })
    }

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

    // 2. Correct Model Name: gemini-1.5-flash
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt 
    });

    const historyMsgs = (history as { role: string; content: string }[])
      .filter(h => h?.content?.trim())
      .slice(-6)
      .map(h => ({
        role:  h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }],
      }))

    const contents = [
      ...historyMsgs,
      { role: "user", parts: [{ text: message }] },
    ]

    ctx.messagesExchanged++
    sessionStore.set(sid, ctx)

    // --- Streaming ---
    if (shouldStream) {
      const result = await model.generateContentStream({ contents })
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text()
              if (text) controller.enqueue(encoder.encode(text))
            }
          } catch (err) {
            console.error("Stream Error:", err)
          } finally {
            controller.close()
          }
        },
      })

      return new Response(stream, {
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Source": "gemini" },
      })
    }

    // --- Non-streaming ---
    const result = await model.generateContent({ contents })
    const response = await result.response
    return NextResponse.json({ ok: true, reply: response.text(), source: "gemini" })

  } catch (err: any) {
    console.error("API Error:", err)
    return NextResponse.json({
      ok: true,
      reply: "Maaf kijiye, thodi technical dikkat hai. Dobara koshish karein.",
      source: "error",
    })
  }
      }
  

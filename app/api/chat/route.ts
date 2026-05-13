import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { consultantReply, ConversationContext } from "@/lib/consultant-engine"
import { buildSystemPrompt } from "@/lib/business-data"
import {
  ConversationMemory,
  extractFromText,
  mergeMemory,
  updateStage,
  summarizeForPrompt,
} from "@/lib/memory"

// Isse naya SDK version use hoga
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

    // --- 1. Memory Management ---
    let sessionMemory: ConversationMemory | undefined = ctx.memory
    if (incomingMemory && typeof incomingMemory === "object") {
      const mem = incomingMemory as ConversationMemory
      const textUpdates = extractFromText(message, mem, "user")
      const mergedMem = mergeMemory(mem, textUpdates, false)
      mergedMem.stage = updateStage(mergedMem)
      sessionMemory = mergedMem
      ctx.memory = mergedMem
      // Context data update
      if (mergedMem.name) ctx.name = mergedMem.name
      if (mergedMem.phone) ctx.phone = mergedMem.phone
      if (mergedMem.city) ctx.city = mergedMem.city
      if (mergedMem.currentRoom) ctx.roomType = mergedMem.currentRoom
    }

    // --- 2. Smart Rule Engine Bypass ---
    // Hum sirf tabhi Rule Engine use karenge jab message bahut chota aur simple greeting ho.
    // Taki user jab kaam ki baat kare (Price/Design), toh Gemini hi jawab de.
    const ruleReply = consultantReply(message, ctx)
    const isSimpleGreeting = /^(hi|hello|hey|namaste|hlo|hii)$/i.test(message.trim().toLowerCase())
    
    // Agar rule engine ke paas jawab hai AUR message sirf greeting hai, tabhi return karo
    if (ruleReply && isSimpleGreeting) {
      ctx.messagesExchanged++
      sessionStore.set(sid, ctx)
      return NextResponse.json({ ok: true, reply: ruleReply, source: "rule" })
    }

    // --- 3. Gemini AI Configuration ---
    if (!process.env.AI_INTEGRATIONS_GEMINI_API_KEY) {
      return NextResponse.json({
        ok: true,
        reply: "Main abhi thoda busy hoon. Please call ya WhatsApp karein: +91 8651070831",
        source: "fallback",
      })
    }

    // Knowledge Base taiyar karna
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

    // Ise GitHub par edit karke 'gemini-1.5-flash-latest' likh dein
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash-latest", 
  systemInstruction: systemPrompt 
});
    
    // History trimming to save tokens and keep context
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

    // --- 4. Execution (Streaming or Static) ---
    if (shouldStream) {
      const result = await model.generateContentStream({ 
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 800 } 
      })
      
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text()
              if (text) controller.enqueue(encoder.encode(text));
            }
          } catch (err) {
            console.error("Stream Error:", err);
          } finally {
            controller.close();
          }
        },
      })

      return new Response(stream, {
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Source": "gemini" },
      })
    }

    const result = await model.generateContent({ 
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
    })
    const response = await result.response
    return NextResponse.json({ ok: true, reply: response.text(), source: "gemini" })

  } catch (err: any) {
    console.error("Chat API Error:", err)
    return NextResponse.json({
      ok: true,
      reply: "Maaf kijiye, kuch technical error hai. Aap mujhe WhatsApp kar sakte hain.",
      source: "error",
    })
  }
      }
        

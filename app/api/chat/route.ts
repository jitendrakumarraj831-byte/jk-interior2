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

// ─────────────────────────────────────────────────────────────
// Gemini Init
// ─────────────────────────────────────────────────────────────

const genAI = new GoogleGenerativeAI(
  process.env.AI_INTEGRATIONS_GEMINI_API_KEY || ""
)

// ─────────────────────────────────────────────────────────────
// Session + Cache
// ─────────────────────────────────────────────────────────────

const sessionStore = new Map<string, ConversationContext>()
const responseCache = new Map<string, string>()

// ─────────────────────────────────────────────────────────────
// Intent Detection
// ─────────────────────────────────────────────────────────────

function detectIntent(msg: string) {
  const text = msg.toLowerCase()

  if (/price|cost|budget|rate|quotation|quote/.test(text)) {
    return "pricing"
  }

  if (/design|idea|modern|luxury|minimal/.test(text)) {
    return "design"
  }

  if (/kitchen|bedroom|hall|living|ceiling|wardrobe/.test(text)) {
    return "room"
  }

  if (/call|contact|whatsapp|phone/.test(text)) {
    return "contact"
  }

  return "general"
}

// ─────────────────────────────────────────────────────────────
// Humanizer
// ─────────────────────────────────────────────────────────────

function humanizeReply(text: string) {
  return text
    .replace(/\bI can help you\b/gi, "Main help kar sakta hoon")
    .replace(/\bPlease share\b/gi, "Bas share kariye")
    .replace(/\bCould you share\b/gi, "Bas bata dijiye")
    .replace(/\bLet me know\b/gi, "Bata dijiye")
}

// ─────────────────────────────────────────────────────────────
// Cleanup
// ─────────────────────────────────────────────────────────────

function cleanReply(text: string) {
  return text
    .replace(
      /(Aap WhatsApp kar sakte hain\.?)+/gi,
      "Aap WhatsApp par details bhej sakte hain 🙂"
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

// ─────────────────────────────────────────────────────────────
// Safe Generate Retry
// ─────────────────────────────────────────────────────────────

async function safeGenerate(
  model: any,
  payload: any,
  retries = 2
): Promise<any> {
  try {
    return await model.generateContent(payload)
  } catch (err) {
    if (retries > 0) {
      return safeGenerate(model, payload, retries - 1)
    }
    throw err
  }
}

// ─────────────────────────────────────────────────────────────
// API Route
// ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const shouldStream = req.nextUrl.searchParams.get("stream") === "1"

  try {
    const body = await req.json()

    const {
      message,
      history = [],
      sessionId,
      leadContext,
      memory: incomingMemory,
    } = body

    // ─────────────────────────────────────────────────────────
    // Validation
    // ─────────────────────────────────────────────────────────

    if (!message?.trim()) {
      return NextResponse.json(
        {
          ok: false,
          error: "Message is required",
        },
        { status: 400 }
      )
    }

    if (message.length > 4000) {
      return NextResponse.json(
        {
          ok: false,
          error: "Message too long",
        },
        { status: 400 }
      )
    }

    // ─────────────────────────────────────────────────────────
    // Session
    // ─────────────────────────────────────────────────────────

    const sid = (sessionId as string) || "default"

    const ctx: ConversationContext =
      sessionStore.get(sid) ?? {
        messagesExchanged: 0,
      }

    // ─────────────────────────────────────────────────────────
    // Intent
    // ─────────────────────────────────────────────────────────

    const intent = detectIntent(message)
    ;(ctx as any).intent = intent

    // ─────────────────────────────────────────────────────────
    // Memory
    // ─────────────────────────────────────────────────────────

    let sessionMemory: ConversationMemory | undefined = ctx.memory

    if (incomingMemory && typeof incomingMemory === "object") {
      const mem = incomingMemory as ConversationMemory

      const textUpdates = extractFromText(message, mem, "user")

      const mergedMem = mergeMemory(mem, textUpdates, false)

      mergedMem.stage = updateStage(mergedMem)

      // Extra smart extraction

      const lowerText = message.toLowerCase()

      if (/kitchen/.test(lowerText)) {
        mergedMem.currentRoom = "Kitchen"
      }

      if (/bedroom/.test(lowerText)) {
        mergedMem.currentRoom = "Bedroom"
      }

      if (/hall|living/.test(lowerText)) {
        mergedMem.currentRoom = "Living Room"
      }

      if (/ceiling/.test(lowerText)) {
        mergedMem.currentRoom = "Ceiling"
      }

      const budgetMatch = message.match(
        /(\d+\s?(k|lakh|lac)?)/i
      )

      if (budgetMatch) {
        mergedMem.budget = budgetMatch[0]
      }

      sessionMemory = mergedMem

      ctx.memory = mergedMem

      // Context sync

      if (mergedMem.name) ctx.name = mergedMem.name
      if (mergedMem.phone) ctx.phone = mergedMem.phone
      if (mergedMem.city) ctx.city = mergedMem.city

      if (mergedMem.currentRoom) {
        ctx.roomType = mergedMem.currentRoom
      }
    }

    // ─────────────────────────────────────────────────────────
    // Rule Engine
    // ─────────────────────────────────────────────────────────

    const ruleReply = consultantReply(message, ctx)

    const isSimpleGreeting =
      /^(hi|hello|hey|namaste|hlo|hii)$/i.test(
        message.trim().toLowerCase()
      )

    if (ruleReply && isSimpleGreeting) {
      ctx.messagesExchanged++

      sessionStore.set(sid, ctx)

      return NextResponse.json({
        ok: true,
        reply: ruleReply,
        source: "rule",
      })
    }

    // ─────────────────────────────────────────────────────────
    // API Key Check
    // ─────────────────────────────────────────────────────────

    if (!process.env.AI_INTEGRATIONS_GEMINI_API_KEY) {
      return NextResponse.json({
        ok: true,
        reply:
          "Maaf kijiye 🙏\n\nAbhi server busy hai.\n\nAap WhatsApp par apna room photo aur requirement bhej sakte hain:\n📲 +91 8651070831",
        source: "fallback",
      })
    }

    // ─────────────────────────────────────────────────────────
    // Cache
    // ─────────────────────────────────────────────────────────

    const cacheKey = message.toLowerCase().trim()

    if (responseCache.has(cacheKey)) {
      return NextResponse.json({
        ok: true,
        reply: responseCache.get(cacheKey),
        source: "cache",
      })
    }

    // ─────────────────────────────────────────────────────────
    // System Prompt
    // ─────────────────────────────────────────────────────────

    const memorySummary = sessionMemory
      ? summarizeForPrompt(sessionMemory)
      : undefined

    const systemPrompt = `
${buildSystemPrompt({
  name: ctx.name,
  phone: ctx.phone,
  city: ctx.city,
  service: ctx.service,
  budget: ctx.budget as string | undefined,
  roomSize: ctx.roomSize,
  memorySummary,
})}

IMPORTANT RULES:
- Sirf hamare business aur interior services ke related jawab do.
- Agar exact information available nahi ho toh clearly bolo.
- Fake pricing mat do.
- Short practical aur human tone me jawab do.
- Hindi + simple English mix use karo.
- Har reply natural hona chahiye robotic nahi.
- Customer ko helpful guidance do.
- Jab relevant ho tab WhatsApp suggest karo.
- Ekdum short answer mat do.
- Same lines repeat mat karo.
`

    // ─────────────────────────────────────────────────────────
    // Gemini Model
    // ─────────────────────────────────────────────────────────

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemPrompt,
    })

    // ─────────────────────────────────────────────────────────
    // History
    // ─────────────────────────────────────────────────────────

    const historyMsgs = (
      history as {
        role: string
        content: string
      }[]
    )
      .filter((h) => h?.content?.trim())
      .slice(-10)
      .map((h) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [
          {
            text: h.content.slice(0, 1000),
          },
        ],
      }))

    const contents = [
      ...historyMsgs,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ]

    ctx.messagesExchanged++

    sessionStore.set(sid, ctx)

    // ─────────────────────────────────────────────────────────
    // STREAM MODE
    // ─────────────────────────────────────────────────────────

    if (shouldStream) {
      const result = await model.generateContentStream({
        contents,
        generationConfig: {
          temperature: 0.6,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 1000,
        },
      })

      const encoder = new TextEncoder()

      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text()

              if (text) {
                controller.enqueue(
                  encoder.encode(text)
                )
              }
            }
          } catch (err) {
            console.error("Stream Error:", err)
          } finally {
            controller.close()
          }
        },
      })

      return new Response(stream, {
        headers: {
          "Content-Type":
            "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          "X-Source": "gemini",
        },
      })
    }

    // ─────────────────────────────────────────────────────────
    // NORMAL RESPONSE
    // ─────────────────────────────────────────────────────────

    const result = await safeGenerate(model, {
      contents,
      generationConfig: {
        temperature: 0.6,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 1000,
      },
    })

    const response = await result.response

    let finalReply = response.text()

    // Cleanup

    finalReply = cleanReply(finalReply)

    // Humanize

    finalReply = humanizeReply(finalReply)

    // Smart follow-up

    if (!ctx.roomType) {
      finalReply +=
        "\n\nKaunsa room design karwana hai?"
    }

    // Empty response protection

    if (finalReply.length < 5) {
      finalReply =
        "Thoda detail me batayiye 🙂 Main better help kar paunga."
    }

    // Cache save

    responseCache.set(cacheKey, finalReply)

    return NextResponse.json({
      ok: true,
      reply: finalReply,
      source: "gemini",
    })
  } catch (err: any) {
    console.error("Chat API Error:", err)

    return NextResponse.json({
      ok: true,
      reply:
        "Maaf kijiye 🙏\n\nKuch technical issue aa gaya hai.\n\nAap WhatsApp par apni requirement bhej sakte hain:\n📲 +91 8651070831",
      source: "error",
    })
  }
}

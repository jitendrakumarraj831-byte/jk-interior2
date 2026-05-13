import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

import {
  consultantReply,
  ConversationContext,
} from "@/lib/consultant-engine"

import { buildSystemPrompt } from "@/lib/business-data"

import {
  ConversationMemory,
  extractFromText,
  mergeMemory,
  updateStage,
  summarizeForPrompt,
} from "@/lib/memory"

import { galleryImages } from "@/lib/gallery-data"

// Gemini
const genAI = new GoogleGenerativeAI(
  process.env.AI_INTEGRATIONS_GEMINI_API_KEY || ""
)

// Session memory
const sessionStore = new Map<string, ConversationContext>()

export async function POST(req: NextRequest) {
  const shouldStream =
    req.nextUrl.searchParams.get("stream") === "1"

  try {
    const body = await req.json()

    const {
      message,
      history = [],
      sessionId,
      leadContext,
      memory: incomingMemory,
    } = body

    if (!message?.trim()) {
      return NextResponse.json(
        {
          ok: false,
          error: "Message is required",
        },
        { status: 400 }
      )
    }

    const sid = (sessionId as string) || "default"

    const ctx: ConversationContext =
      sessionStore.get(sid) ?? {
        messagesExchanged: 0,
      }

    // ─────────────────────────────────────────────
    // Memory Management
    // ─────────────────────────────────────────────

    let sessionMemory: ConversationMemory | undefined =
      ctx.memory

    if (
      incomingMemory &&
      typeof incomingMemory === "object"
    ) {
      const mem = incomingMemory as ConversationMemory

      const textUpdates = extractFromText(
        message,
        mem,
        "user"
      )

      const mergedMem = mergeMemory(
        mem,
        textUpdates,
        false
      )

      mergedMem.stage = updateStage(mergedMem)

      sessionMemory = mergedMem
      ctx.memory = mergedMem

      if (mergedMem.name) ctx.name = mergedMem.name
      if (mergedMem.phone) ctx.phone = mergedMem.phone
      if (mergedMem.city) ctx.city = mergedMem.city
      if (mergedMem.currentRoom)
        ctx.roomType = mergedMem.currentRoom
    }

    // Legacy leadContext support
    if (leadContext) {
      if (leadContext.name) ctx.name = leadContext.name
      if (leadContext.phone) ctx.phone = leadContext.phone
      if (leadContext.city) ctx.city = leadContext.city
      if (leadContext.service)
        ctx.service = leadContext.service
    }

    // ─────────────────────────────────────────────
    // Rule Engine
    // ─────────────────────────────────────────────

    const lowerMsg = message.toLowerCase()

    const localQuestions =
      lowerMsg === "hi" ||
      lowerMsg === "hello" ||
      lowerMsg === "hii" ||
      lowerMsg === "hey" ||
      lowerMsg === "namaste" ||

      lowerMsg.includes("price") ||
      lowerMsg.includes("rate") ||
      lowerMsg.includes("cost") ||
      lowerMsg.includes("estimate") ||
      lowerMsg.includes("budget") ||
      lowerMsg.includes("sqft") ||

      lowerMsg.includes("gypsum") ||
      lowerMsg.includes("pvc") ||
      lowerMsg.includes("wpc") ||
      lowerMsg.includes("charcoal") ||
      lowerMsg.includes("grid ceiling") ||
      lowerMsg.includes("tv unit") ||

      lowerMsg.includes("12x") ||
      lowerMsg.includes("10x") ||
      lowerMsg.includes("15x") ||

      lowerMsg.includes("false ceiling") ||
      lowerMsg.includes("wall panel") ||

      lowerMsg.includes("forbesganj") ||
      lowerMsg.includes("araria") ||

      lowerMsg.includes("site visit") ||
      lowerMsg.includes("call") ||
      lowerMsg.includes("whatsapp")

    if (localQuestions) {
   const lowerMsg = message.trim().toLowerCase()

const shouldUseRuleEngine =
  message.trim().length < 80 ||
  /\b(price|rate|cost|estimate|gypsum|pvc|wpc|grid|tv unit|kitchen|wardrobe|hi|hello|design|budget)\b/i.test(message)
      const ruleReply = consultantReply(message, ctx)

      if (ruleReply && shouldUseRuleEngine) {
        ctx.messagesExchanged++
        sessionStore.set(sid, ctx)

        let galleryType: string | undefined

        if (lowerMsg.includes("gypsum")) {
          galleryType = "Gypsum False Ceiling"
        } else if (lowerMsg.includes("pvc")) {
          galleryType = "PVC Ceiling"
        } else if (
          lowerMsg.includes("wpc") ||
          lowerMsg.includes("wall panel")
        ) {
          galleryType = "WPC fluted panels & uv marble Sheet"
        } else if (lowerMsg.includes("grid")) {
          galleryType = "Grid Ceiling"
        } else if (lowerMsg.includes("tv")) {
          galleryType = "TV Unit Design"
        }

        const gallery =
          galleryType
            ? galleryImages
                .filter(
                  (img) =>
                    img.category === galleryType
                )
                .slice(0, 6)
            : []

        return NextResponse.json({
          ok: true,
          reply: ruleReply,
          source: "rule",
          galleryType,
          gallery,
        })
      }
    }

    // ─────────────────────────────────────────────
    // Gemini Check
    // ─────────────────────────────────────────────

    if (
      !process.env.AI_INTEGRATIONS_GEMINI_API_KEY
    ) {
      return NextResponse.json({
        ok: true,
        reply:
          "Main abhi available nahi hoon 😅 Please WhatsApp karein: +91 8651070831",
        source: "fallback",
      })
    }

    // ─────────────────────────────────────────────
    // Prompt
    // ─────────────────────────────────────────────

    const memorySummary = sessionMemory
      ? summarizeForPrompt(sessionMemory)
      : undefined

    const basePrompt = buildSystemPrompt({
      name: ctx.name,
      phone: ctx.phone,
      city: ctx.city,
      service: ctx.service,
      budget: ctx.budget as string | undefined,
      roomSize: ctx.roomSize,
      memorySummary,
    })

    const systemPrompt = `
${basePrompt}

You are JK Interior's premium AI consultant from Bihar.

Rules:
- Talk naturally like human
- Hindi + English mix
- Keep answers short-medium
- Give pricing guidance
- Suggest materials practically
- Avoid robotic replies
- Avoid repeating greetings
- Keep conversation smooth
- Use premium tone
- Continue previous context naturally
`

    // ─────────────────────────────────────────────
    // Gemini Model
    // ─────────────────────────────────────────────

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    })

    // ─────────────────────────────────────────────
    // History Optimization
    // ─────────────────────────────────────────────

    const historyMsgs = (
      history as {
        role: string
        content: string
      }[]
    )
      .filter((h) => h?.content?.trim())
      .slice(-6)
      .map((h) => ({
        role:
          h.role === "assistant"
            ? "model"
            : "user",
        parts: [{ text: h.content }],
      }))

    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      ...historyMsgs,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ]

    ctx.messagesExchanged++
    sessionStore.set(sid, ctx)

    // ─────────────────────────────────────────────
    // STREAM MODE
    // ─────────────────────────────────────────────

    if (shouldStream) {
      const result =
        await model.generateContentStream({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
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
            console.error(
              "Streaming Error:",
              err
            )
          } finally {
            controller.close()
          }
        },
      })

      return new Response(stream, {
        headers: {
          "Content-Type":
            "text/plain; charset=utf-8",
          "X-Source": "gemini",
        },
      })
    }

    // ─────────────────────────────────────────────
    // NORMAL MODE
    // ─────────────────────────────────────────────

    const result =
      await model.generateContent({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      })

    const response = await result.response

    let galleryType: string | undefined

    if (lowerMsg.includes("gypsum")) {
      galleryType = "Gypsum False Ceiling"
    } else if (lowerMsg.includes("pvc")) {
      galleryType = "PVC Ceiling"
    } else if (
      lowerMsg.includes("wpc") ||
      lowerMsg.includes("wall panel")
    ) {
      galleryType =
        "WPC fluted panels & uv marble Sheet"
    } else if (lowerMsg.includes("grid")) {
      galleryType = "Grid Ceiling"
    } else if (lowerMsg.includes("tv")) {
      galleryType = "TV Unit Design"
    }

    const gallery =
      galleryType
        ? galleryImages
            .filter(
              (img) =>
                img.category === galleryType
            )
            .slice(0, 6)
        : []

    return NextResponse.json({
      ok: true,
      reply: response.text(),
      source: "gemini",
      galleryType,
      gallery,
    })
  } catch (err: any) {
    console.error("Chat API Error:", err)

    return NextResponse.json({
      ok: true,
      reply:
        "Maaf kijiye 😅 Abhi thoda technical issue hai. Please dobara try karein.",
      source: "fallback",
    })
  }
      }

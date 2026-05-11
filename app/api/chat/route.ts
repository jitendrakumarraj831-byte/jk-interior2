// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import {
  consultantReply,
  ConversationContext,
  detectIntent,
  getSmartQuickReplies,
} from '@/lib/consultant-engine'
import { buildSystemPrompt, WA_NUMBER, CALL_NUMBER } from '@/lib/business-data'

// ============================================
// Configuration
// ============================================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_MODEL = 'gemini-2.0-flash-exp' // Updated to latest stable
const REQUEST_TIMEOUT_MS = 10000 // 10 seconds
const MAX_CONTEXT_MESSAGES = 8 // Keep last 8 messages for context
const SESSION_TTL_MS = 30 * 60 * 1000 // 30 minutes

// Simple in-memory session store (for demo; use Redis in production)
interface SessionData {
  context: ConversationContext
  history: Array<{ role: 'user' | 'assistant'; content: string }>
  lastAccessed: number
}
const sessions = new Map<string, SessionData>()

// Cleanup expired sessions every hour
setInterval(() => {
  const now = Date.now()
  for (const [sid, data] of sessions.entries()) {
    if (now - data.lastAccessed > SESSION_TTL_MS) {
      sessions.delete(sid)
    }
  }
}, 60 * 60 * 1000)

// ============================================
// Helper: Get or create session
// ============================================
function getSession(sessionId: string): SessionData {
  let session = sessions.get(sessionId)
  if (!session) {
    session = {
      context: {
        messagesExchanged: 0,
      },
      history: [],
      lastAccessed: Date.now(),
    }
    sessions.set(sessionId, session)
  } else {
    session.lastAccessed = Date.now()
  }
  return session
}

// ============================================
// Helper: Call Gemini AI with timeout & fallback
// ============================================
async function callGeminiWithFallback(
  prompt: string,
  systemPrompt: string,
  timeoutMs: number
): Promise<string | null> {
  if (!GEMINI_API_KEY) {
    console.warn('Gemini API key missing, using fallback only')
    return null
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUser query: ${prompt}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 0.9,
          },
        }),
        signal: controller.signal,
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error(`Gemini API error: ${response.status}`)
      return null
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text || text.trim().length === 0) {
      return null
    }

    // Clean up common markdown artifacts
    let cleaned = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold but keep content
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep label
      .replace(/\n{3,}/g, '\n\n') // Max 2 newlines
      .trim()

    return cleaned
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.warn('Gemini API timeout')
    } else {
      console.error('Gemini API error:', error)
    }
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}

// ============================================
// Helper: Build context-aware prompt
// ============================================
function buildContextPrompt(
  userMessage: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>,
  context: ConversationContext
): string {
  const recent = history.slice(-MAX_CONTEXT_MESSAGES)
  const conversationText = recent
    .map(
      (msg) => `${msg.role === 'user' ? 'Customer' : 'Riya (JK Interior)'}: ${msg.content}`
    )
    .join('\n')

  let contextInfo = ''
  if (context.city) contextInfo += `\n- Customer's city: ${context.city}`
  if (context.service) contextInfo += `\n- Interested service: ${context.service}`
  if (context.roomType) contextInfo += `\n- Room type discussed: ${context.roomType}`
  if (context.budget) contextInfo += `\n- Budget range: ${context.budget}`
  if (context.estimateGiven) contextInfo += `\n- Last estimate given: ${context.estimateGiven}`

  return `Previous conversation:
${conversationText || '(No previous conversation)'}

Known information:${contextInfo || ' None yet'}

Current user message: "${userMessage}"

Instructions for Riya (JK Interior consultant):
- Respond naturally in Hinglish (mix Hindi & English) as a friendly, knowledgeable interior expert.
- If the user asks for a price, give the pricing range FIRST (e.g., Gypsum: ₹80-140/sqft, PVC: ₹60-120/sqft), THEN ask for room size for exact estimate.
- If the user asks for a comparison (e.g., "PVC vs Gypsum"), provide detailed pros/cons.
- If the user asks for booking, collect name, city, phone one at a time.
- Keep responses short (3-5 lines max) unless detailed comparison is needed.
- Use 1-2 emojis naturally.
- Never repeat the exact same sentence from previous bot replies.
- If the user asks about something unclear, gently ask for clarification (room type, size, budget).
- Always sound helpful and professional.`
}

// ============================================
// Helper: Detect if Gemini response is valid and relevant
// ============================================
function isRelevantResponse(response: string, userMessage: string): boolean {
  if (!response || response.length < 5) return false

  const lowerResp = response.toLowerCase()
  const lowerUser = userMessage.toLowerCase()

  // Check for obviously off-topic or generic placeholder answers
  const genericPatterns = [
    /i am an ai/i,
    /as a language model/i,
    /i don't have enough information/i,
    /i cannot answer that/i,
    /i'm not sure/i,
    /sorry, i can't/i,
  ]
  if (genericPatterns.some((p) => p.test(lowerResp))) return false

  // If user asks about price, response must contain a number or range with ₹/Rs
  if (/(price|cost|rate|kitna|daam|lagat|paisa|sqft)/i.test(lowerUser)) {
    if (!/(\d+|₹|rs\.?|per sq|sq\.?ft)/i.test(lowerResp)) return false
  }

  return true
}

// ============================================
// Helper: Prevent duplicate responses
// ============================================
function isDuplicateResponse(newResponse: string, history: SessionData['history']): boolean {
  const lastBotResponse = [...history].reverse().find((m) => m.role === 'assistant')?.content
  if (!lastBotResponse) return false

  // Simple similarity: if last response is basically the same sentence
  const newTrim = newResponse.trim().slice(0, 100)
  const lastTrim = lastBotResponse.trim().slice(0, 100)
  return newTrim === lastTrim
}

// ============================================
// Helper: Clean final response (spacing, formatting)
// ============================================
function cleanResponse(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
    .replace(/\n{3,}/g, '\n\n')      // Max two newlines
    .replace(/[ \t]+$/gm, '')        // Trim trailing spaces
    .trim()
}

// ============================================
// Main POST handler
// ============================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, sessionId: clientSessionId } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Generate or reuse session ID
    const sessionId =
      clientSessionId ||
      `session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
    const session = getSession(sessionId)

    // Update conversation history
    session.history.push({ role: 'user', content: message })
    if (session.history.length > MAX_CONTEXT_MESSAGES * 2) {
      session.history = session.history.slice(-MAX_CONTEXT_MESSAGES * 2)
    }

    // First, try consultant engine (rule-based) – fast and reliable
    let engineReply = consultantReply(message, session.context)
    if (engineReply) {
      engineReply = cleanResponse(engineReply)
    }

    // Build Gemini prompt with context
    const systemPrompt = buildSystemPrompt({
      name: session.context.name,
      phone: session.context.phone,
      city: session.context.city,
      service: session.context.service,
      budget:
        session.context.budget === 'low'
          ? 'low'
          : session.context.budget === 'mid'
          ? 'mid'
          : session.context.budget === 'high'
          ? 'high'
          : undefined,
      roomSize: session.context.roomSize,
    })
    const geminiPrompt = buildContextPrompt(message, session.history, session.context)

    let finalReply: string | null = null

    // Try Gemini AI, with fallback to engine reply
    const geminiReply = await callGeminiWithFallback(geminiPrompt, systemPrompt, REQUEST_TIMEOUT_MS)

    if (geminiReply && isRelevantResponse(geminiReply, message)) {
      // Check for duplication
      if (!isDuplicateResponse(geminiReply, session.history)) {
        finalReply = cleanResponse(geminiReply)
      } else if (engineReply) {
        finalReply = engineReply
      } else {
        // If duplicate and no engine reply, slightly modify
        finalReply = geminiReply + ' 😊'
      }
    } else if (engineReply) {
      finalReply = engineReply
    } else {
      // Ultimate fallback – human-friendly default
      finalReply =
        "Namaste! Main Riya, JK Interior ki consultant. 😊\n\nAap ceiling, wall paneling, ya poora interior ke baare mein pooch sakte hain. Room ka size aur type batao toh main estimate de sakti hoon. Free site visit ke liye WhatsApp karein: **+91 8651070831**"
    }

    // Ensure final reply is not empty
    if (!finalReply || finalReply.trim().length === 0) {
      finalReply =
        "Kya aap ceiling ya wall paneling ke baare mein jaankari lena chahte hain? Room ka size batao toh estimate bata sakta hoon. Call/WhatsApp: +91 8651070831"
    }

    // Update session with bot response
    session.history.push({ role: 'assistant', content: finalReply })
    session.context.messagesExchanged = session.history.filter((m) => m.role === 'assistant').length

    // Generate quick replies based on current intent (using user's message or latest intent)
    const lastIntent = detectIntent(message)
    session.context.lastIntent = lastIntent
    const quickReplies = getSmartQuickReplies(session.context)

    return NextResponse.json({
      reply: finalReply,
      quickReplies,
      sessionId,
      context: {
        city: session.context.city,
        service: session.context.service,
        roomType: session.context.roomType,
        budget: session.context.budget,
      },
    })
  } catch (error: any) {
    console.error('Chat API error:', error)
    // Graceful error response
    return NextResponse.json(
      {
        reply:
          'Kuch technical issue ho gaya. 😔 Kripya thodi der baad try karein. Aap directly WhatsApp bhi kar sakte hain: +91 8651070831',
        quickReplies: ['Try Again', 'WhatsApp Us', 'Call Now'],
      },
      { status: 200 } // Return 200 to avoid UI breaking, but indicate issue.
    )
  }
}
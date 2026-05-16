/**
 * AI Response Handler
 * Manages Groq API calls and streaming responses
 */

export interface AIRequestConfig {
  systemPrompt: string
  userMessage: string
  conversationHistory: Array<{
    role: "user" | "assistant"
    content: string
  }>
  maxTokens?: number
  temperature?: number
  timeoutMs?: number
}

export interface AIResponse {
  content: string
  source: "groq" | "fallback"
  tokensUsed?: number
  error?: string
}

/**
 * Default system prompt for Riya consultant
 */
export function buildSystemPrompt(context?: {
  userName?: string
  city?: string
  service?: string
  budget?: "low" | "mid" | "high"
}): string {
  const parts: string[] = [
    "You are Riya, JK Interior's premium AI consultant.",
    "You help customers with:",
    "- Material recommendations (PVC, Gypsum, WPC, UV Marble)",
    "- Price estimates based on room dimensions",
    "- Design advice and suggestions",
    "- Booking free site visits",
    "",
    "RESPONSE GUIDELINES:",
    "1. Be warm, helpful, and professional",
    "2. Always include relevant pricing when discussing materials",
    "3. If user shares room dimensions, calculate estimates",
    "4. Understand Hindi/Hinglish input naturally",
    "5. Encourage site visits for exact quotes",
    "6. Keep responses concise (under 500 chars)",
    "7. End with clear next steps or CTA",
    "8. Mention contact: +91 8651070831",
    "",
  ]

  if (context?.userName) {
    parts.push(`User's name: ${context.userName}`)
  }

  if (context?.city) {
    parts.push(`Location: ${context.city}`)
  }

  if (context?.service) {
    parts.push(`Interested in: ${context.service}`)
  }

  if (context?.budget) {
    const budgetText = {
      low: "Budget-conscious (affordable solutions)",
      mid: "Mid-range (quality & value)",
      high: "Premium (luxury options)",
    }
    parts.push(`Budget level: ${budgetText[context.budget]}`)
  }

  return parts.join("\n")
}

/**
 * Call Groq API for chat response
 */
export async function callGroqAPI(
  config: AIRequestConfig
): Promise<AIResponse> {
  const {
    systemPrompt,
    userMessage,
    conversationHistory,
    maxTokens = 500,
    temperature = 0.65,
    timeoutMs = 15000,
  } = config

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            ...conversationHistory.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: "user",
              content: userMessage,
            },
          ],
          temperature,
          max_tokens: maxTokens,
        }),
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      const error = await response.text()
      throw new Error(
        `Groq API error ${response.status}: ${error}`
      )
    }

    const data = await response.json()

    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error("Empty response from Groq")
    }

    return {
      content: data.choices[0].message.content.trim(),
      source: "groq",
      tokensUsed: data.usage?.total_tokens,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    console.error("[v0] Groq API failed:", message)

    return {
      content: "",
      source: "fallback",
      error: message,
    }
  }
}

/**
 * Stream response from Groq (for real-time updates)
 */
export async function streamGroqResponse(
  config: AIRequestConfig,
  onChunk: (chunk: string, isComplete: boolean) => void
): Promise<AIResponse> {
  const {
    systemPrompt,
    userMessage,
    conversationHistory,
    maxTokens = 500,
    temperature = 0.65,
    timeoutMs = 20000,
  } = config

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            ...conversationHistory,
            {
              role: "user",
              content: userMessage,
            },
          ],
          temperature,
          max_tokens: maxTokens,
          stream: true,
        }),
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(
        `Groq stream error: ${response.statusText}`
      )
    }

    if (!response.body) {
      throw new Error("No response body")
    }

    let fullContent = ""
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split("\n")

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue

        const json = line.slice(6)
        if (json === "[DONE]") continue

        try {
          const parsed = JSON.parse(json)
          const content =
            parsed.choices?.[0]?.delta?.content || ""

          if (content) {
            fullContent += content
            onChunk(fullContent, false)
          }
        } catch {}
      }
    }

    onChunk(fullContent, true)

    return {
      content: fullContent,
      source: "groq",
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    console.error("[v0] Stream error:", message)

    return {
      content: "",
      source: "fallback",
      error: message,
    }
  }
}

/**
 * Check if API key is configured
 */
export function isGroqConfigured(): boolean {
  return Boolean(process.env.GROQ_API_KEY)
}

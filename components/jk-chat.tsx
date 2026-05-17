'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { FiMessageCircle, FiPhoneCall, FiSend, FiUser, FiX } from 'react-icons/fi'

interface Message {
  text: string
  isUser: boolean
}

interface ApiMessage {
  role: 'user' | 'assistant'
  content: string
}

interface LeadContext {
  name?: string
  phone?: string
  city?: string
  service?: string
  budget?: 'low' | 'mid' | 'high'
  roomSize?: string
  roomType?: string
  lastTopic?: string
  lastIntent?: string
  lastQuestionAsked?: 'room_size' | 'room_type' | 'city' | 'budget' | 'material' | 'phone' | 'name' | null
  conversationStage?: 'greeting' | 'discovery' | 'consultation' | 'estimation' | 'booking'
  messagesExchanged?: number
  leadSaved?: boolean
}

interface ChatApiResponse {
  ok: boolean
  reply?: string
  error?: string
  updatedContext?: Partial<LeadContext>
  metadata?: {
    quickReplies?: string[]
    leadReady?: boolean
    suggestedActions?: string[]
  }
}

const STORAGE_KEY = 'jk-chat-state-v2'
const OPEN_KEY = 'chatbot-open'
const JK_PHONE_DISPLAY = '+91 8651070831'
const JK_PHONE_TEL = '+918651070831'
const JK_WHATSAPP = '918651070831'

const WELCOME_TEXT =
  'Namaste! 👋 Main JK Interior Assistant hoon. PVC ceiling, gypsum, WPC panels, TV unit ya complete interior ka estimate chahiye? Room size bataiye, jaise 12x14.'

const welcomeMessage: Message = {
  isUser: false,
  text: WELCOME_TEXT,
}

const initialQuickReplies = [
  'PVC Ceiling Rate',
  'Gypsum vs PVC',
  'Wall Panel Design',
  'Free Site Visit',
]

function toApiHistory(messages: Message[]): ApiMessage[] {
  return messages
    .filter((message) => message.text.trim().length > 0 && message.text !== WELCOME_TEXT)
    .slice(-16)
    .map((message) => ({
      role: message.isUser ? 'user' : 'assistant',
      content: message.text,
    }))
}

function countCustomerTurns(messages: Message[]): number {
  return messages.filter((message) => message.isUser).length
}

function getWhatsAppUrl(text = 'Hello JK Interior! Mujhe interior/ceiling work ke liye help chahiye.') {
  return `https://wa.me/${JK_WHATSAPP}?text=${encodeURIComponent(text)}`
}

function ChatLogo({ size = 34 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-emerald-100 bg-white shadow-sm"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image src="/logo.png" alt="" fill className="object-contain p-1" sizes={`${size}px`} />
    </span>
  )
}

function MessageText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, lineIndex) => (
        <span key={`${line}-${lineIndex}`} className="block min-h-[0.35rem]">
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
            }
            return <span key={`${part}-${index}`}>{part}</span>
          })}
        </span>
      ))}
    </>
  )
}

function loadSavedState(): { messages: Message[]; leadContext: LeadContext; quickReplies: string[] } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed.messages)) return null
    return {
      messages: parsed.messages,
      leadContext: parsed.leadContext ?? { conversationStage: 'greeting', messagesExchanged: 0 },
      quickReplies: Array.isArray(parsed.quickReplies) ? parsed.quickReplies : initialQuickReplies,
    }
  } catch {
    return null
  }
}

const JkChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([welcomeMessage])
  const [leadContext, setLeadContext] = useState<LeadContext>({
    conversationStage: 'greeting',
    messagesExchanged: 0,
  })
  const [quickReplies, setQuickReplies] = useState<string[]>(initialQuickReplies)
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)


  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const savedState = loadSavedState()
    if (savedState) {
      setMessages(savedState.messages.length ? savedState.messages : [welcomeMessage])
      setLeadContext(savedState.leadContext)
      setQuickReplies(savedState.quickReplies)
    }

    const savedIsOpen = localStorage.getItem(OPEN_KEY)
    setIsHydrated(true)

    if (savedIsOpen) {
      setIsOpen(JSON.parse(savedIsOpen))
      return
    }

    const timer = setTimeout(() => {
      setIsOpen(true)
      localStorage.setItem(OPEN_KEY, 'true')
    }, 2200)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, leadContext, quickReplies }))
  }, [isHydrated, messages, leadContext, quickReplies])

  useEffect(() => {
    localStorage.setItem(OPEN_KEY, JSON.stringify(isOpen))
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  const toggleChatbot = () => {
    setIsOpen((open) => !open)
  }

  const sendMessage = async (messageText?: string) => {
    const trimmedInput = (messageText ?? input).trim()
    if (!trimmedInput || isLoading) return

    const userMessage: Message = { text: trimmedInput, isUser: true }
    const previousMessages = messages
    const nextMessages = [...previousMessages, userMessage]

    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedInput,
          history: toApiHistory(previousMessages),
          leadContext: {
            ...leadContext,
            messagesExchanged: countCustomerTurns(previousMessages),
          },
        }),
      })

      const data = (await response.json().catch(() => null)) as ChatApiResponse | null

      if (!response.ok || !data?.ok || !data.reply?.trim()) {
        throw new Error(data?.error || 'Chat response unavailable')
      }

      setLeadContext((current) => ({
        ...current,
        ...data.updatedContext,
        messagesExchanged: countCustomerTurns(nextMessages),
      }))

      if (data.metadata?.quickReplies?.length) {
        setQuickReplies(data.metadata.quickReplies.slice(0, 7))
      }

      setMessages((prev) => [...prev, { text: data.reply!, isUser: false }])
    } catch (error) {
      console.error('Chatbot error:', error)
      setMessages((prev) => [
        ...prev,
        {
          text: `Chat abhi connect nahi ho pa raha. Aap direct call ya WhatsApp kar sakte hain: ${JK_PHONE_DISPLAY}`,
          isUser: false,
        },
      ])
      setQuickReplies(['Call Now', 'WhatsApp Now', 'Try Again'])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendMessage()
  }

  const handleQuickReply = (reply: string) => {
    const normalized = reply.toLowerCase()

    if (normalized.includes('call now')) {
      window.location.href = `tel:${JK_PHONE_TEL}`
      return
    }

    if (normalized.includes('whatsapp')) {
      window.open(getWhatsAppUrl('Hello JK Interior! Chatbot se baat hui, mujhe quote/site visit chahiye.'), '_blank', 'noopener,noreferrer')
      return
    }

    const mappedReply = normalized.includes('site visit')
      ? 'Free site visit book karna hai'
      : normalized.includes('try again')
        ? 'Please help me again'
        : reply

    void sendMessage(mappedReply)
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={toggleChatbot}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-[0_14px_35px_rgba(5,150,105,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(5,150,105,0.45)] focus:outline-none focus:ring-4 focus:ring-emerald-200"
          aria-label={isOpen ? 'Close JK Interior Assistant' : 'Open JK Interior Assistant'}
        >
          {isOpen ? <FiX size={26} /> : <ChatLogo size={44} />}
          {!isOpen && (
            <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-[10px] font-black text-emerald-950">
              AI
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-3 z-50 flex h-[min(34rem,calc(100dvh-7rem))] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] sm:right-5 sm:w-96">
          <header className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-600 to-emerald-800 p-4 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_35%)]" aria-hidden="true" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <ChatLogo size={42} />
                <div className="min-w-0">
                  <h3 className="truncate text-base font-black leading-tight">JK Interior Assistant</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-emerald-50/90">
                    <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_10px_rgba(190,242,100,0.9)]" aria-hidden="true" />
                    Smart estimate and design help
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChatbot}
                className="rounded-full p-2 transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close chat"
              >
                <FiX size={21} />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-emerald-50/70 to-white p-4">
            <div className="flex flex-col gap-3">
              {messages.map((msg, index) => (
                <div key={`${msg.isUser ? 'user' : 'bot'}-${index}`} className={`flex items-end gap-2.5 ${msg.isUser ? 'justify-end' : ''}`}>
                  {!msg.isUser && <ChatLogo size={32} />}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      msg.isUser
                        ? 'rounded-br-md bg-emerald-600 text-white'
                        : 'rounded-bl-md border border-emerald-100 bg-white text-gray-800'
                    }`}
                  >
                    <MessageText text={msg.text} />
                  </div>
                  {msg.isUser && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                      <FiUser size={17} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end gap-2.5">
                  <ChatLogo size={32} />
                  <div className="rounded-2xl rounded-bl-md border border-emerald-100 bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1.5" aria-label="Assistant is typing">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.2s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.1s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-emerald-100 bg-white p-3">
            <div className="mb-2 flex gap-2 overflow-x-auto pb-1 text-xs font-bold">
              {quickReplies.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleQuickReply(suggestion)}
                  disabled={isLoading}
                  className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-60"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Hindi, English ya Hinglish mein poochhiye..."
                  className="min-w-0 flex-1 rounded-full border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  aria-label="Type your message"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-emerald-300"
                  aria-label="Send message"
                >
                  <FiSend size={18} />
                </button>
              </div>
            </form>
            <div className="mt-2 flex items-center justify-between gap-2 text-[11px] font-semibold text-gray-500">
              <a href={`tel:${JK_PHONE_TEL}`} className="inline-flex items-center gap-1 hover:text-emerald-700">
                <FiPhoneCall /> Call
              </a>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-emerald-700">
                <FiMessageCircle /> WhatsApp: {JK_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default JkChat


'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import { FiBox, FiX, FiSend, FiUser } from 'react-icons/fi'

interface Message {
  text: string
  isUser: boolean
}

const JkChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const savedIsOpen = localStorage.getItem('chatbot-open')
    if (savedIsOpen) {
      setIsOpen(JSON.parse(savedIsOpen))
    } else {
      // Automatically open on first visit
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('chatbot-open', 'true')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chatbot-open', JSON.stringify(isOpen))
  }, [isOpen])

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { text: input, isUser: true }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from server')
      }

      const data = await response.json()
      const botMessage: Message = { text: data.reply, isUser: false }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Chatbot error:', error)
      const errorMessage: Message = {
        text: 'Sorry, something went wrong. Please try again.',
        isUser: false,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={toggleChatbot}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
        >
          {isOpen ? <FiX size={24} /> : <FiBox size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-[28rem] bg-white rounded-lg shadow-xl flex flex-col z-50 animate-fade-in-up">
          <header className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">JK Interior Assistant</h3>
            <button onClick={toggleChatbot} className="-mr-2 p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white">
              <FiX size={20} />
            </button>
          </header>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="flex flex-col gap-3">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2.5 ${msg.isUser ? 'justify-end' : ''}`}>
                  {!msg.isUser && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                      <FiBox size={18} />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg max-w-xs ${msg.isUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  {msg.isUser && (
                     <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
                      <FiUser size={18} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                   <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                    <FiBox size={18} />
                  </div>
                  <div className="p-3 rounded-lg bg-gray-200">
                    <div className="typing-indicator">
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-2 border-t bg-white rounded-b-lg">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" disabled={isLoading} className="ml-2 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <FiSend size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default JkChat

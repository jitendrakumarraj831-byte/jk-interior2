"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface SpeechRecognitionEvent {
  resultIndex: number
  results: SpeechRecognitionResultList
}

export function useVoiceRecognition(setInput: (val: string) => void) {
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      setVoiceSupported(true)
      const recognition = new SpeechRecognition()
      recognition.lang = "hi-IN"
      recognition.interimResults = true
      recognition.continuous = false
      recognition.maxAlternatives = 1

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        setInput(transcript)
      }
      recognition.onend = () => { setIsListening(false) }
      recognition.onerror = () => { setIsListening(false) }
      recognitionRef.current = recognition
    }
  }, [setInput])

  const toggleVoice = useCallback(() => {
    if (!recognitionRef.current) return
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setInput("")
      recognitionRef.current.start()
      setIsListening(true)
    }
  }, [isListening, setInput])

  const stopListening = useCallback(() => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [isListening])

  return { isListening, voiceSupported, toggleVoice, stopListening }
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Phone, ArrowUp } from "lucide-react"

export default function FloatingActions() {
  const [showBackTop, setShowBackTop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setShowBackTop(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/918651070831?text=Hello%20JK%20Interior%2C%20I%20need%20interior%20design%20help."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp JK Interior"
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-900/40 transition-all hover:scale-110 hover:shadow-green-500/40 active:scale-95 md:bottom-6 md:right-6"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping-slow opacity-50" />
        <MessageCircle className="relative h-6 w-6" />
      </a>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-36 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full glass-card border border-blue-500/30 text-blue-400 shadow-lg hover:border-blue-400/60 hover:text-blue-300 transition-all hover:scale-110 active:scale-95 md:bottom-24 md:right-6"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Bottom CTA Bar */}
      <div className="mobile-cta-bar flex gap-2 md:hidden">
        <a
          href="tel:+918651070831"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/40 active:scale-95"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
        <a
          href="https://wa.me/918651070831?text=Hello%20JK%20Interior%2C%20I%20need%20a%20free%20quote."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white shadow-lg shadow-green-900/40 active:scale-95"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </>
  )
}

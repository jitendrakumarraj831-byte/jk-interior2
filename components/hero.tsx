"use client"

import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, Sparkles, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const easeLux = [0.22, 1, 0.36, 1] as const

const stats = [
  { value: "100+", label: "Projects Done" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
]

const highlights = [
  { icon: Layers, text: "PVC & Gypsum False Ceiling" },
  { icon: PanelTop, text: "WPC Louvers & Wall Paneling" },
  { icon: Tv, text: "Modern TV Unit Design" },
  { icon: Sparkles, text: "Complete Interior Solutions" },
]

// Text Slider के लिए टैगलाइन्स
const slidingTexts = [
  "डिज़ाइन जो दिल जीत ले",
  "फिनिशिंग जो सालों चले",
  "क्वालिटी जो भरोसा दिलाये",
  "लुक जो सबको दीवाना बना दे"
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slidingTexts.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section 
      id="home" 
      className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50/30"
    >
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full bg-amber-200/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-blue-100/30 blur-[100px]" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.1]"
        style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-start justify-center px-4 pt-24 pb-12 sm:pt-28 lg:px-8">
        
        {/* Top trust bar */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeLux }}
          className="mb-6 flex flex-wrap items-center gap-2"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 backdrop-blur-sm shadow-sm">
            <MapPin className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">
              Forbesganj • Araria • Bihar
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50/80 px-3 py-1.5 backdrop-blur-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-800">5★ Rated</span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Trusted Brand</span>
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: easeLux }}
          className="relative"
        >
          <div
            role="heading"
            aria-level={2}
            className="font-black leading-[0.9] tracking-tighter text-blue-950"
            style={{ fontSize: "clamp(3.5rem,12vw,7rem)" }}
          >
            JK
            <span className="ml-3 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent"
              style={{ fontSize: "clamp(1.8rem,6vw,3.5rem)", letterSpacing: "0.12em" }}
            >
              INTERIOR
            </span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.7, ease: easeLux }}
            className="mt-2 h-1.5 w-32 origin-left rounded-full bg-gradient-to-r from-blue-600 to-amber-400"
          />
        </motion.div>

        {/* Text Slider Section */}
        <div className="mt-8 h-12 sm:h-16 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: easeLux }}
              className="text-2xl font-black tracking-tight text-blue-950 md:text-4xl"
            >
              <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                {slidingTexts[index]}
              </span>
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Taglines & Description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55, ease: easeLux }}
          className="mt-4 max-w-2xl space-y-4"
        >
          <p className="text-lg font-medium italic text-gray-700 md:text-xl">
            &quot;छत आपकी,{" "}
            <span className="text-blue-600 underline decoration-amber-400 decoration-2 underline-offset-4">
              पहचान हमारी
            </span>
            &quot;
          </p>
          <p className="border-l-4 border-blue-600 pl-4 text-sm leading-relaxed text-gray-600 md:text-base">
            घर, दुकान, ऑफिस और शोरूम के लिए प्रीमियम{" "}
            <span className="font-bold text-blue-900">
              PVC, जिप्सम, WPC पैनल, UV मार्बल शीट
            </span>{" "}
            और ग्रिड सीलिंग।
            <span className="mt-1 block font-bold text-blue-950">
              "फारबिसगंज का सबसे भरोसेमंद इंटीरियर पार्टनर"
            </span>
          </p>
        </motion.div>

        {/* Service Highlights */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55, ease: easeLux }}
          className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {highlights.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="group flex items-center gap-3 rounded-xl border border-white bg-white/40 px-4 py-3 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-amber-200 hover:bg-white hover:shadow-lg"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md group-hover:rotate-6 transition-transform">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-blue-950">{text}</span>
            </li>
          ))}
        </motion.ul>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5, ease: easeLux }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button
            asChild
            size="lg"
            className="h-14 relative overflow-hidden rounded-full bg-blue-600 px-8 text-white shadow-xl shadow-blue-200 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
          >
            <a href="tel:+918651070831" className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              फ्री कोटेशन लें
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 rounded-full border-2 border-blue-200 px-8 hover:bg-blue-50 hover:border-blue-400 transition-all"
          >
            <Link href="#services" className="flex items-center gap-2 font-bold text-blue-700">
              सेवाएँ देखें <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: easeLux }}
          className="mt-10 flex w-full max-w-2xl flex-wrap items-center gap-8 border-t border-blue-100 pt-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="group">
              <div className="bg-gradient-to-r from-blue-700 to-amber-600 bg-clip-text text-2xl font-black text-transparent md:text-3xl group-hover:scale-110 transition-transform origin-left">
                {s.value}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

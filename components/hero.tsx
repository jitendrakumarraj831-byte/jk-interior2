"use client"

import { useEffect, useState } from "react"
import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, Sparkles, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const easeLux = [0.22, 1, 0.36, 1] as const

// 🔥 Sliding Text Data
const slides = [
  {
    text: "डिज़ाइन जो दिल जीत ले",
    highlight: "दिल जीत ले",
    color: "from-blue-600 to-blue-400",
  },
  {
    text: "फिनिशिंग जो सालों चले",
    highlight: "सालों चले",
    color: "from-amber-600 to-amber-400",
  },
  {
    text: "आपके घर को दें प्रीमियम लुक",
    highlight: "प्रीमियम लुक",
    color: "from-indigo-600 to-purple-500",
  },
]

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

export default function Hero() {
  const [index, setIndex] = useState(0)

  // 🔁 Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // 👉 Swipe Support
  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -50) {
      setIndex((prev) => (prev + 1) % slides.length)
    } else if (info.offset.x > 50) {
      setIndex((prev) => (prev - 1 + slides.length) % slides.length)
    }
  }

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      
      {/* Glow */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col justify-center px-4 pt-24 pb-12">

        {/* TOP BAR */}
        <div className="mb-6 flex flex-wrap gap-2">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1 shadow">
            <MapPin className="h-3 w-3 text-blue-600" />
            <span className="text-[10px] font-bold">Forbesganj • Araria • Bihar</span>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
            ))}
            <span className="text-[10px] font-bold">5★ Rated</span>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1">
            <ShieldCheck className="h-3 w-3 text-green-600" />
            <span className="text-[10px] font-bold">Trusted</span>
          </div>
        </div>

        {/* BRAND */}
        <h1 className="text-5xl font-black tracking-tight">
          JK <span className="text-blue-600">INTERIOR</span>
        </h1>

        {/* 🔥 SLIDER */}
        <div className="mt-6 relative h-[70px] overflow-hidden">

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              drag="x"
              onDragEnd={handleDragEnd}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: easeLux }}
              className="absolute w-full text-2xl md:text-4xl font-black text-slate-900"
            >
              {slides[index].text.split(slides[index].highlight)[0]}
              <span className={`bg-gradient-to-r ${slides[index].color} bg-clip-text text-transparent`}>
                {slides[index].highlight}
              </span>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* 🔘 DOTS */}
        <div className="mt-4 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full cursor-pointer transition-all ${
                i === index ? "bg-blue-600 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* SUBTEXT */}
        <p className="mt-4 text-lg italic">
          "छत आपकी, <span className="text-blue-600 font-bold">पहचान हमारी</span>"
        </p>

        {/* SERVICES */}
        <div className="mt-8 grid gap-3">
          {highlights.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow">
              <Icon className="text-blue-600" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex gap-4 flex-wrap">
          <Button asChild className="rounded-full px-6">
            <a href="tel:+918651070831">
              <Phone className="mr-2" /> फ्री कोटेशन लें
            </a>
          </Button>

          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="#services">
              हमारी सेवाएँ <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>

        {/* STATS */}
        <div className="mt-10 flex gap-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-blue-600">{s.value}</div>
              <div className="text-xs">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

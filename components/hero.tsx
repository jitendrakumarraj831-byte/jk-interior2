"use client"

import { useEffect, useState } from "react"
import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, Sparkles, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

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

// ✅ SLIDER TEXT
const taglines = [
  "डिज़ाइन जो दिल जीत ले",
  "फिनिशिंग जो सालों चले",
  "हर कोना बोले क्लास",
  "घर बने लक्ज़री स्पेस"
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden 
      bg-gradient-to-br from-slate-50 via-white to-amber-50/30"
    >
      {/* ✅ NEW GLOW */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl" />

      {/* ✅ ORIGINAL GRID BACKGROUND (RESTORED) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      {/* ✅ RADIAL GRADIENT BACK */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(at 0% 0%,rgba(37,99,235,0.10) 0px,transparent 55%), radial-gradient(at 100% 100%,rgba(29,78,216,0.08) 0px,transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-start justify-center px-4 pt-24 pb-12 sm:pt-28 lg:px-8">

        {/* TOP BAR */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeLux }}
          className="mb-5 flex flex-wrap items-center gap-2"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
              Forbesganj • Araria • Bihar
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50/80 px-3 py-1.5 backdrop-blur-sm">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            ))}
            <span className="text-[10px] font-bold text-yellow-800">5★ Rated</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-[10px] font-bold text-emerald-800">Trusted Brand</span>
          </div>
        </motion.div>

        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: easeLux }}
          className="relative"
        >
          <div className="font-black leading-[0.9] tracking-tighter text-blue-950 text-[clamp(3.2rem,10vw,6.5rem)]">
            JK
            <span className="ml-3 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent text-[clamp(1.6rem,5vw,3rem)] tracking-[0.12em]">
              INTERIOR
            </span>
          </div>

          {/* ✅ UNDERLINE ANIMATION RESTORED */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.7, ease: easeLux }}
            className="mt-1 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-blue-600 to-blue-300"
          />
        </motion.div>

        {/* ✅ TEXT SLIDER */}
        <div className="mt-6 h-14 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-3xl font-black text-blue-950"
            >
              {taglines[index]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* ORIGINAL TEXT */}
        <div className="mt-3 max-w-2xl space-y-3">
          <p className="text-base italic text-gray-700">
            "छत आपकी, <span className="text-blue-600 underline">पहचान हमारी</span>"
          </p>

          <p className="border-l-4 border-blue-500 pl-4 text-sm text-gray-600">
            घर, दुकान, ऑफिस और शोरूम के लिए प्रीमियम PVC, जिप्सम, WPC पैनल, UV मार्बल शीट और ग्रिड सीलिंग।
          </p>
        </div>

        {/* SERVICES */}
        <motion.ul className="mt-7 grid w-full max-w-2xl grid-cols-1 sm:grid-cols-2 gap-2.5">
          {highlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 rounded-xl border bg-white/70 px-3 py-2 shadow-sm backdrop-blur-sm">
              <Icon className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold">{text}</span>
            </li>
          ))}
        </motion.ul>

        {/* BUTTONS */}
        <div className="mt-8 flex gap-3 flex-wrap">
          <Button asChild className="rounded-full bg-blue-600 px-6 text-white">
            <a href="tel:+918651070831">
              <Phone className="h-4 w-4 mr-2" />
              प्रीमियम कोटेशन
            </a>
          </Button>

          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="#services">
              सेवाएँ <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* STATS */}
        <div className="mt-8 flex gap-6 border-t pt-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-xl font-bold text-blue-600">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
        }

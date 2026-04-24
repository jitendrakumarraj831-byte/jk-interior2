"use client"

import { useState, useEffect } from "react"
import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, Sparkles, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

// Premium Luxury Easing
const easeLux = [0.22, 1, 0.36, 1] as const

const words = [
  "PVC False Ceiling", 
  "WPC Wall Paneling", 
  "UV Marble Sheet", 
  "Modular TV Unit", 
  "Gypsum Ceiling"
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeLux },
  },
}

const stats = [
  { value: "100+", label: "Projects Done" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
]

const highlights = [
  { icon: Layers, title: "Designer False Ceiling", desc: "PVC & जिप्सम फिनिशिंग" },
  { icon: PanelTop, title: "High-End Wall Panels", desc: "WPC & UV मार्बल टच" },
  { icon: Tv, title: "Bespoke TV Units", desc: "कस्टमाइज्ड मॉडर्न डिज़ाइन" },
  { icon: ShieldCheck, title: "Quality Assurance", desc: "पक्का भरोसा, बेहतरीन काम" }
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#fafafa] selection:bg-blue-100"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-100/40 blur-[100px]" />
        <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-amber-100/30 blur-[100px]" />
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: `radial-gradient(#2563eb 0.5px, transparent 0.5px)`, 
            backgroundSize: '24px 24px' 
          }} 
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-6 pt-24 pb-12 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* 1. Trust Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-white/60 px-4 py-1.5 backdrop-blur-md shadow-sm">
              <MapPin className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Forbesganj • Araria • Bihar</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/60 px-3 py-1.5 backdrop-blur-md">
              <div className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-[10px] font-bold text-amber-800">Top Rated</span>
            </div>
          </motion.div>

          {/* 2. Hero Headline */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-baseline gap-4">
              <h1 className="text-7xl font-black tracking-tighter text-slate-900 sm:text-8xl lg:text-9xl">
                JK
              </h1>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-black tracking-[0.2em] text-transparent sm:text-4xl lg:text-5xl uppercase">
                Interior
              </span>
            </div>
            
            <div className="h-2 w-24 rounded-full bg-gradient-to-r from-blue-600 to-amber-400" />

            <div className="mt-8">
              <h2 className="text-3xl font-bold leading-tight text-slate-800 sm:text-5xl lg:text-6xl">
                Expert in{" "}
                <span className="relative inline-block min-w-[280px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5, ease: easeLux }}
                      className="absolute left-0 text-blue-600"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>
            </div>
          </motion.div>

          {/* 3. Description & Secondary Heading */}
          <motion.div variants={itemVariants} className="max-w-2xl space-y-6">
            <h3 className="text-3xl font-black leading-tight text-slate-900 md:text-5xl">
              साधारण दीवारों को दें <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">एक शाही पहचान</span>
            </h3>
            <p className="text-lg font-medium leading-relaxed text-slate-600">
              हम लेकर आए हैं फारबिसगंज में इंटीरियर का <span className="font-bold text-slate-900">Next-Level Experience</span>। 
              डिज़ाइन जो आपकी लाइफस्टाइल को दर्शाए।
            </p>
          </motion.div>

          {/* 4. Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="group relative h-14 overflow-hidden rounded-full bg-blue-600 px-10 shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl active:scale-95"
            >
              <a href="tel:+918651070831" className="flex items-center gap-2 text-base font-bold text-white">
                <Phone className="h-5 w-5" />
                फ्री कोटेशन लें
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%', skewX: -45 }}
                  animate={{ x: '200%' }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
                />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 rounded-full border-slate-200 bg-white/50 px-10 backdrop-blur-sm transition-all hover:border-blue-400 hover:bg-white"
            >
              <Link href="#services" className="flex items-center gap-2 text-base font-bold text-slate-800">
                हमारी सेवाएँ <ArrowRight className="h-5 w-5 text-blue-600 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* 5. Features Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-4xl"
          >
            {highlights.map((item, i) => (
              <div 
                key={i}
                className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white/50 p-4 transition-all hover:border-blue-100 hover:bg-white hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white transition-colors group-hover:bg-blue-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs font-medium text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* 6. Simple Footer Stats */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-10 border-t border-slate-200 pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black text-slate-900">{s.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{s.label}</div>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

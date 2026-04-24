"use client"

import { useState, useEffect } from "react"
import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, Sparkles, ShieldCheck, Gem, MousePointer2 } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const words = ["PVC False Ceiling", "WPC Wall Paneling", "UV Marble Sheet", "Modular TV Unit", "Luxury Interior"]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#f8f9fb]">
      
      {/* --- ARCHITECTURAL BLUEPRINT BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* Soft Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />

        {/* The "Blueprint/Lines" Pattern - Exact as your screenshot */}
        <div 
          className="absolute inset-0 opacity-[0.07]" 
          style={{ 
            backgroundImage: `radial-gradient(#1e293b 0.5px, transparent 0.5px), 
                              linear-gradient(to right, #1e293b 0.5px, transparent 0.5px), 
                              linear-gradient(to bottom, #1e293b 0.5px, transparent 0.5px)`,
            backgroundSize: '80px 80px, 40px 40px, 40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)'
          }} 
        />

        {/* Large Decorative SVG Line (Architectural Drawing Feel) */}
        <svg className="absolute top-0 right-0 h-full w-full opacity-[0.03] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 20 L20 0 M80 100 L100 80 M0 80 L80 0" stroke="currentColor" strokeWidth="0.1" fill="none" />
        </svg>

        {/* Soft Glow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-200/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-amber-100/30 blur-[100px]" />
      </div>

      {/* --- HERO CONTENT --- */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col items-center justify-center px-6 pt-24 pb-12 text-center">
        
        {/* 1. Badge Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 backdrop-blur-md shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600">Our Expertise / हमारी विशेषज्ञता</span>
          </div>
        </motion.div>

        {/* 2. Main Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl lg:text-8xl">
            Premium <span className="text-blue-600">Interior</span> Services
          </h1>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-slate-500 sm:text-lg">
            JK Interior Forbesganj आपके सपनों के घर के लिए सबसे बेहतरीन और मज़बूत सॉल्यूशन्स प्रदान करता है।
          </p>
        </motion.div>

        {/* 3. Sliding Services */}
        <div className="mt-8 h-12 overflow-hidden sm:h-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={words[index]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-2xl font-black text-slate-800 sm:text-4xl"
            >
              {words[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. Action Cards (As per screenshot style) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            { title: "Free Consultation", desc: "फ्री सलाह & डिज़ाइन प्लान", icon: MousePointer2, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
            { title: "Free Site Visit", desc: "घर पर आकर मुफ़्त माप-जोख", icon: MapPin, color: "bg-blue-50 text-blue-600 border-blue-100" },
            { title: "1 Year Warranty", desc: "पूरे काम पर 1 साल की वारंटी", icon: ShieldCheck, color: "bg-amber-50 text-amber-600 border-amber-100" }
          ].map((card, i) => (
            <div key={i} className={`flex items-center gap-4 rounded-2xl border p-5 transition-all hover:shadow-lg bg-white/90 backdrop-blur-sm ${card.color}`}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <card.icon className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900">{card.title}</h4>
                <p className="text-xs font-semibold opacity-80">{card.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* 5. CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" className="h-14 rounded-full bg-blue-600 px-8 font-bold hover:bg-blue-700 shadow-xl shadow-blue-200">
            <a href="tel:+918651070831" className="flex items-center gap-2">
              <Phone className="h-5 w-5" /> अभी कॉल करें
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 rounded-full border-slate-200 bg-white px-8 font-bold hover:border-blue-400">
            <Link href="#gallery" className="flex items-center gap-2">
              प्रोजेक्ट देखें <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  )
             }
          

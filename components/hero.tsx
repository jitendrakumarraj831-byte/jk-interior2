"use client"

import { useState, useEffect } from "react"
import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, Sparkles, ShieldCheck, Gem } from "lucide-react"
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
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050505]">
      
      {/* --- PREMIUM DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* Animated Mesh Gradients */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-gradient-to-br from-blue-600/30 via-indigo-600/10 to-transparent blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -120, 0],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] h-[700px] w-[700px] rounded-full bg-gradient-to-tl from-amber-500/20 via-orange-500/5 to-transparent blur-[100px]" 
        />

        {/* Subtle Grid Pattern (Architectural Feel) */}
        <div className="absolute inset-0 opacity-[0.08]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
        
        {/* Noise Overlay for Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-center justify-center px-6 pt-20 text-center">
        
        {/* 1. Location & Trust Ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
            <MapPin className="h-4 w-4 text-amber-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90">Forbesganj • Araria • Bihar</span>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 backdrop-blur-xl sm:flex">
            <ShieldCheck className="h-4 w-4 text-blue-400" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">JK Interior Official</span>
          </div>
        </motion.div>

        {/* 2. Main Brand Identity */}
        <div className="relative mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-8xl font-[1000] leading-[0.8] tracking-tighter text-white sm:text-[10rem] lg:text-[13rem]">
              JK
            </h1>
            <span className="mt-4 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-3xl font-black tracking-[0.4em] text-transparent sm:text-5xl lg:text-6xl uppercase">
              Interior
            </span>
          </motion.div>
          
          {/* Glowing underline */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            className="mx-auto mt-8 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-blue-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
          />
        </div>

        {/* 3. Text Slider Section */}
        <div className="mt-8 min-h-[80px]">
          <h2 className="text-2xl font-bold text-white/70 sm:text-4xl lg:text-5xl">
            The King of {" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                className="inline-block text-white underline decoration-amber-500/50 decoration-4 underline-offset-8"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </h2>
        </div>

        {/* 4. Impact Statement */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-2xl text-base font-medium leading-relaxed text-white/60 sm:text-xl"
        >
          साधारण दीवारों को दें <span className="text-white font-black italic">एक शाही पहचान</span>। 
          हम लेकर आए हैं बिहार में <span className="text-amber-500">Luxury Interior</span> का नया दौर।
        </motion.p>

        {/* 5. Magnetic CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          <Button 
            asChild
            className="group relative h-16 overflow-hidden rounded-full bg-white px-12 text-lg font-black text-black transition-all hover:scale-105 hover:bg-amber-400"
          >
            <a href="tel:+918651070831" className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              फ्री कोटेशन लें
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </a>
          </Button>

          <Button 
            asChild
            variant="outline"
            className="h-16 rounded-full border-white/20 bg-white/5 px-12 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white"
          >
            <Link href="#services" className="flex items-center gap-2">
               प्रोजेक्ट्स देखें <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        {/* 6. High-End Experience Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-20 grid w-full max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {[
            { icon: Gem, label: "Premium Materials", color: "text-amber-400" },
            { icon: Sparkles, label: "Modern Design", color: "text-blue-400" },
            { icon: Tv, label: "Custom Units", color: "text-emerald-400" },
            { icon: Star, label: "Top Rated", color: "text-orange-400" }
          ].map((item, i) => (
            <div key={i} className="group flex flex-col items-center rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
              <item.icon className={`h-8 w-8 mb-3 ${item.color} transition-transform group-hover:scale-125`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{item.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
          }
          

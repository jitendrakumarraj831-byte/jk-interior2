"use client"

import { useState, useEffect } from "react"
import { Phone, ArrowRight, MapPin, Star, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const words = ["PVC False Ceiling", "WPC Wall Paneling", "UV Marble Sheet", "Modular TV Unit", "Gypsum Ceiling"]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white selection:bg-blue-100">
      
      {/* Background Decor - Minimal & Sharp */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[10%] top-[15%] h-64 w-64 rounded-full bg-blue-50/50 blur-[100px]" />
        <div className="absolute right-[10%] bottom-[15%] h-80 w-80 rounded-full bg-amber-50/50 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-8">
        
        <div className="flex flex-col items-center text-center">
          
          {/* 1. Subtle Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50/50 px-4 py-1.5 backdrop-blur-md"
          >
            <MapPin className="h-3 w-3 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Forbesganj • Araria • Bihar
            </span>
          </motion.div>

          {/* 2. Massive Minimal Brand Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex flex-col items-center"
          >
            <h1 className="text-7xl font-black tracking-tighter text-slate-900 sm:text-8xl lg:text-[10rem]">
              JK<span className="text-blue-600">.</span>
            </h1>
            <span className="mt-[-10px] text-sm font-bold uppercase tracking-[0.5em] text-slate-400 sm:text-xl">
              Interior & Design
            </span>
          </motion.div>

          {/* 3. The Sliding Headline - Clean Typography */}
          <div className="mb-10 h-12 sm:h-20">
            <AnimatePresence mode="wait">
              <motion.h2
                key={words[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-light text-slate-600 sm:text-5xl lg:text-6xl"
              >
                Specialists in <span className="font-bold text-slate-900">{words[index]}</span>
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* 4. Hindi Impact Text - Minimalist Style */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="mb-12 max-w-2xl"
          >
            <p className="text-xl font-medium leading-relaxed text-slate-500 sm:text-2xl">
              साधारण दीवारों को दें <span className="text-slate-900 underline decoration-blue-500 decoration-4 underline-offset-8">एक शाही पहचान</span>। <br className="hidden sm:block" />
              लग्जरी डिज़ाइन जो आपकी लाइफस्टाइल को बदल दे।
            </p>
          </motion.div>

          {/* 5. Clean Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center gap-6 sm:flex-row"
          >
            <Button
              asChild
              className="h-16 rounded-full bg-slate-900 px-10 text-lg font-bold text-white transition-all hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200"
            >
              <a href="tel:+918651070831" className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                फ्री कोटेशन लें
              </a>
            </Button>

            <Button
              asChild
              variant="link"
              className="group text-lg font-bold text-slate-900 decoration-blue-500 hover:text-blue-600"
            >
              <a href="#services" className="flex items-center gap-2">
                हमारी सेवाएँ <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>

          {/* 6. Trust Indicators - Minimalist Row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 flex flex-wrap justify-center gap-8 border-t border-slate-100 pt-10"
          >
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">5+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Trusted in Forbesganj</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">100+ Projects Done</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative Side Text */}
      <div className="pointer-events-none absolute bottom-10 left-10 hidden rotate-90 origin-left text-[10px] font-black uppercase tracking-[1em] text-slate-200 lg:block">
        Luxury Interiors 2026
      </div>
    </section>
  )
}

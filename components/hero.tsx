"use client"

import { useState, useEffect, useRef } from "react"
import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, Sparkles, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

const words = ["PVC False Ceiling", "WPC Wall Paneling", "UV Marble Sheet", "Modular TV Unit", "Gypsum Ceiling"]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
  
  // Parallax effect for background elements
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[110dvh] w-full overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* --- ADVANCED BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic Spotlights */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-[20%] -right-[5%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" 
        />
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(#ffffff 0.5px, transparent 0.5px), linear-gradient(90deg, #ffffff 0.5px, transparent 0.5px)`,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
          }} 
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-20 text-center">
        
        {/* 1. Floating Trust Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex h-2 w-2 animate-ping rounded-full bg-blue-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Premium Interior Hub • Forbesganj</span>
        </motion.div>

        {/* 2. Main Massive Heading */}
        <div className="relative mb-6">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl font-[900] leading-[0.85] tracking-tighter sm:text-8xl lg:text-[10rem]"
          >
            JK <span className="text-blue-600">INTERIOR</span>
          </motion.h1>
          
          {/* Animated Accent Line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -bottom-2 left-0 h-[4px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </div>

        {/* 3. Dynamic Service Scroller */}
        <div className="h-16 mb-8 flex items-center justify-center overflow-hidden sm:h-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={words[index]}
              initial={{ opacity: 0, rotateX: -90, y: 50 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: 90, y: -50 }}
              transition={{ duration: 0.6, ease: "anticipate" }}
              className="text-3xl font-black italic text-slate-400 sm:text-5xl lg:text-6xl"
            >
              {words[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. The "Hindi Impact" Text with Glass Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <h3 className="mb-4 text-2xl font-extrabold sm:text-4xl">
            साधारण दीवारों को दें <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">एक शाही पहचान</span>
          </h3>
          <p className="text-lg font-medium text-slate-400">
            हम लेकर आए हैं बिहार में इंटीरियर का <span className="text-white">Next-Generation Standard</span>। 
            PVC से लेकर UV मार्बल तक, सब कुछ जो आपके घर को लग्जरी बनाए।
          </p>
        </motion.div>

        {/* 5. Explosive Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <Button 
            asChild
            className="group relative h-16 overflow-hidden rounded-2xl bg-blue-600 px-12 text-lg font-black transition-all hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
          >
            <a href="tel:+918651070831" className="flex items-center gap-3">
              <Phone className="h-6 w-6 animate-bounce" />
              फ्री कोटेशन लें
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-10 bg-white/30" />
              </div>
            </a>
          </Button>

          <Button 
            asChild
            variant="outline"
            className="h-16 rounded-2xl border-white/20 bg-white/5 px-12 text-lg font-bold backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10"
          >
            <Link href="#services" className="flex items-center gap-2 text-white">
               प्रोजेक्ट्स देखें <ArrowRight className="h-6 w-6 group-hover:translate-x-2" />
            </Link>
          </Button>
        </motion.div>

        {/* 6. Feature Cards (Horizontal Scroll on Mobile) */}
        <div className="mt-20 grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { icon: Zap, label: "Fastest Delivery", color: "text-yellow-400" },
            { icon: ShieldCheck, label: "Durability", color: "text-emerald-400" },
            { icon: Star, label: "Modern Finish", color: "text-purple-400" },
            { icon: Sparkles, label: "Best Pricing", color: "text-blue-400" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm"
            >
              <item.icon className={`h-8 w-8 mb-3 ${item.color}`} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">{item.label}</span>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Background Decorative Circles */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  )
        }

"use client"

import { useState, useEffect } from "react"
import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, Sparkles, ShieldCheck, TreePine } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const easeLux = [0.22, 1, 0.36, 1] as const

// --- आपके स्क्रीनशॉट के हिसाब से अपडेटेड सर्विसेज ---
const words = [
  "Gypsum False Ceiling",
  "PVC Ceiling Design",
  "Grid Office Ceiling",
  "WPC Wall Paneling",
  "UV Marble Sheets",
  "Modern TV Units",
  "Artificial Grass"
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeLux } },
}

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-start justify-center px-4 pt-24 pb-12 sm:pt-28 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
          
          {/* 1. Top trust bar */}
          <motion.div variants={itemVariants} className="mb-6 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-1.5 backdrop-blur-sm shadow-sm">
              <MapPin className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">Forbesganj • Bihar</span>
            </div>
          </motion.div>

          {/* 2. Brand name */}
          <motion.div variants={itemVariants} className="relative mb-8">
            <div className="font-black leading-[0.9] tracking-tighter text-slate-900" style={{ fontSize: "clamp(3.2rem, 10vw, 6.5rem)" }}>
              JK<span className="ml-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)", letterSpacing: "0.12em" }}>INTERIOR</span>
            </div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 1, ease: easeLux }} className="mt-2 h-1.5 w-24 origin-left rounded-full bg-gradient-to-r from-blue-600 to-amber-400" />
          </motion.div>

          {/* 3. Sliding Headline Area */}
          <motion.div variants={itemVariants} className="min-h-[100px] sm:min-h-[130px]">
            <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
              Specialist in <br />
              <div className="relative inline-block overflow-hidden pb-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h2>
          </motion.div>

          {/* 4. Stylish Transparent Glass Section (यहां से बदलाव हुआ है) */}
          <motion.div 
            variants={itemVariants} 
            className="mt-6 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/40 bg-white/30 p-6 backdrop-blur-xl shadow-2xl shadow-blue-900/5 sm:p-8"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-amber-700">
               <Sparkles className="h-4 w-4 animate-pulse" />
               <span className="text-[11px] font-black uppercase tracking-widest">Premium Aesthetics</span>
            </div>
            
            <h3 className="mb-4 text-2xl font-black leading-tight text-slate-900 md:text-4xl">
              साधारण दीवारों को दें <br />
              <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                एक शाही पहचान
              </span>
            </h3>

            <p className="text-sm font-medium leading-relaxed text-slate-600 md:text-base">
              हम लेकर आए हैं फारबिसगंज में इंटीरियर का <span className="font-bold text-slate-900">Next-Level Experience</span>। 
              डिज़ाइन ऐसा कि लोग देखते रह जाएँ, और मजबूती ऐसी कि सालों साल साथ निभाए।
            </p>

            {/* Icons Inside Glass Card */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
              {[
                { icon: Layers, label: "Ceiling Expert" },
                { icon: PanelTop, label: "Wall Luxury" },
                { icon: Tv, label: "Smart Units" },
                { icon: TreePine, label: "Soft Turf" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 group cursor-default">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 6. CTA Buttons */}  
          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">  
            <Button
  asChild
  size="lg"
  className="h-14 relative overflow-hidden rounded-full bg-blue-600 px-10 text-white shadow-xl shadow-blue-100 transition-all hover:bg-blue-700 active:scale-95"
>
  <a href="tel:+918651070831" className="relative flex items-center gap-2 text-base font-bold">
    
    {/* ✨ शाइन इफेक्ट यहाँ शुरू होता है */}
    <motion.span 
      initial={{ left: "-100%" }}
      animate={{ left: "100%" }}
      transition={{ 
        repeat: Infinity, 
        duration: 1.5, 
        ease: "linear", 
        repeatDelay: 2 
      }}
      style={{
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '50px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        transform: 'skewX(-20deg)',
      }}
    />
    {/* ✨ शाइन इफेक्ट यहाँ खत्म होता है */}

    <Phone className="h-5 w-5" />
    फ्री कोटेशन लें
  </a>
</Button>      
            <Button  
              asChild  
              variant="outline"  
              size="lg"  
              className="h-14 rounded-full border-slate-200 bg-white/50 px-10 backdrop-blur-sm hover:bg-white hover:border-blue-300 transition-all"  
            >  
              <Link href="#services" className="flex items-center gap-2 text-base font-bold text-slate-800">  
                हमारी सेवाएँ <ArrowRight className="h-5 w-5 text-blue-600" />  
              </Link>  
            </Button>  
          </motion.div>  

          {/* 7. Stats Section */}  
          <motion.div  
            variants={itemVariants}  
            className="mt-12 flex w-full max-w-2xl flex-wrap items-center gap-8 border-t border-slate-200 pt-8"  
          >  
            {stats.map((s) => (  
              <div key={s.label} className="group">  
                <div className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-2xl font-black text-transparent md:text-3xl">  
                  {s.value}  
                </div>  
                <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 group-hover:text-blue-600 transition-colors">  
                  {s.label}  
                </div>  
              </div>  
            ))}  
          </motion.div>  
        </motion.div>  
      </div>  
    </section>
  )

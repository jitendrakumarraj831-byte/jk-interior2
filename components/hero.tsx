"use client"

import { useState, useEffect, useRef } from "react"
import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

// Smooth luxury easing
const easeLux = [0.22, 1, 0.36, 1] as const

const words = ["PVC False Ceiling", "WPC Wall Paneling", "UV Marble Sheet", "Modular TV Unit", "Gypsum Ceiling"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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

export default function Hero() {
  const [index, setIndex] = useState(0)
  const containerRef = useRef(null)
  
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section   
      ref={containerRef}
      id="home"   
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#fafafa]"  
    >
      {/* --- Aesthetic Background Elements --- */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: y1 }} className="absolute -top-[10%] -left-[5%] h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute top-[20%] -right-[5%] h-[400px] w-[400px] rounded-full bg-amber-100/40 blur-[100px]" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.15]"  
          style={{  
            backgroundImage: `radial-gradient(#2563eb 0.5px, transparent 0.5px)`,  
            backgroundSize: "30px 30px",  
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",  
          }}  
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-start justify-center px-6 pt-24 pb-12 lg:px-12">  
          
        <motion.div  
          variants={containerVariants}  
          initial="hidden"  
          animate="visible"  
          className="grid w-full grid-cols-1 gap-12 lg:grid-cols-12"
        >  
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7">
            {/* 1. Trust Tags */}  
            <motion.div variants={itemVariants} className="mb-8 flex flex-wrap gap-3">  
              <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-white/60 px-4 py-1.5 backdrop-blur-md shadow-sm">  
                <MapPin className="h-3.5 w-3.5 text-blue-600" />  
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Forbesganj • Araria</span>  
              </div>  
              <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/50 px-4 py-1.5 backdrop-blur-md">  
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />  
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900">Premium Quality</span>  
              </div>  
            </motion.div>  

            {/* 2. Main Title */}  
            <motion.div variants={itemVariants} className="relative mb-6">  
              <h1 className="font-black leading-[0.85] tracking-tighter text-slate-900" style={{ fontSize: "clamp(3.5rem, 12vw, 7rem)" }}>  
                JK <span className="text-blue-600 italic">INTERIOR</span>  
              </h1>
              <motion.div 
                initial={{ width: 0 }} animate={{ width: 120 }} transition={{ delay: 1, duration: 1 }}
                className="mt-4 h-2 rounded-full bg-gradient-to-r from-blue-600 to-amber-400" 
              />
            </motion.div>  

            {/* 3. Sliding Sub-headline */}  
            <motion.div variants={itemVariants} className="mb-8 h-[60px] md:h-[80px]">  
              <h2 className="text-2xl font-bold text-slate-500 md:text-4xl">  
                Specialist in {" "}
                <span className="relative inline-block overflow-hidden align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.6, ease: easeLux }}
                      className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-black text-transparent"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>  
            </motion.div>

            {/* 4. Hindi Marketing Text */}
            <motion.div variants={itemVariants} className="mb-10 max-w-xl">
              <h3 className="mb-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
                साधारण दीवारों को दें <br/>
                <span className="bg-slate-900 px-3 py-1 text-white skew-x-[-4deg] inline-block mt-2">
                   एक शाही पहचान
                </span>
              </h3>
              <p className="text-lg font-medium leading-relaxed text-slate-600">
                हम लेकर आए हैं फारबिसगंज में इंटीरियर का <span className="font-bold text-blue-600 underline decoration-blue-200 underline-offset-4">Next-Level Experience</span>। 
                मजबूती और खूबसूरती का बेजोड़ संगम।
              </p>
            </motion.div>

            {/* 5. CTA Area */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
              <Button asChild size="lg" className="group relative h-16 overflow-hidden rounded-2xl bg-blue-600 px-10 text-lg font-bold transition-all hover:bg-blue-700 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)]">
                <a href="tel:+918651070831" className="flex items-center gap-3">
                   <Phone className="h-5 w-5 animate-pulse" />
                   फ्री कोटेशन लें
                   <motion.div 
                     className="absolute inset-0 bg-white/20"
                     initial={{ x: "-100%" }}
                     animate={{ x: "200%" }}
                     transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
                     style={{ skewX: -20, width: "30%" }}
                   />
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="h-16 rounded-2xl border-2 border-slate-200 bg-white px-8 text-lg font-bold transition-all hover:border-blue-600 hover:text-blue-600">
                <Link href="#services" className="flex items-center gap-2">
                  सेवाएँ देखें <ArrowRight className="h-5 w-5 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* RIGHT CONTENT - Feature Cards */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
              {[
                { icon: Layers, title: "False Ceiling", color: "bg-blue-500", desc: "PVC & Gypsum Experts" },
                { icon: PanelTop, title: "Wall Paneling", color: "bg-amber-500", desc: "WPC & UV Marble" },
                { icon: Tv, title: "Modular Units", color: "bg-indigo-500", desc: "Luxury TV Units" },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  whileHover={{ x: 10, backgroundColor: "#fff" }}
                  className="group flex items-center gap-5 rounded-3xl border border-slate-100 bg-white/50 p-6 backdrop-blur-md transition-shadow hover:shadow-xl hover:shadow-blue-500/5"
                >
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.color} text-white shadow-lg`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                    <p className="font-medium text-slate-500">{item.desc}</p>
                  </div>
                  <CheckCircle2 className="ml-auto h-6 w-6 text-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Summary */}
            <motion.div 
              variants={itemVariants}
              className="mt-10 flex items-center justify-between rounded-3xl bg-slate-900 p-8 text-white shadow-2xl"
            >
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-black text-blue-400 md:text-3xl">{s.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>  
      </div>  

      {/* Bottom Blur Decor */}
      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

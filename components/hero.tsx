"use client"

import { useState, useEffect } from "react"
import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, Sparkles, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

// Smooth luxury easing
const easeLux = [0.22, 1, 0.36, 1] as const

// --- स्लाइड होने वाले मुख्य टेक्स्ट ---
const words = ["PVC False Ceiling", "WPC Wall Paneling", "UV Marble Sheet", "Modular TV Unit", "Gypsum Ceiling"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
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
  { icon: Layers, text: "PVC & Gypsum False Ceiling" },
  { icon: PanelTop, text: "WPC Louvers & Wall Paneling" },
  { icon: Tv, text: "Modern TV Unit Design" },
  { icon: Sparkles, text: "Complete Interior Solutions" },
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  // टेक्स्ट स्लाइडर का टाइमर
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section   
      id="home"   
      className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50/30"  
    >
      {/* Hero style glow background */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />

      {/* Soft Grid Overlay */}  
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]"  
        style={{  
          backgroundImage: "linear-gradient(rgba(37,99,235,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.1) 1px, transparent 1px)",  
          backgroundSize: "44px 44px",  
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",  
        }}  
      />  

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-start justify-center px-4 pt-24 pb-12 sm:pt-28 lg:px-8">  
          
        <motion.div  
          variants={containerVariants}  
          initial="hidden"  
          animate="visible"  
          className="w-full"  
        >  
          {/* 1. Top trust bar */}  
          <motion.div variants={itemVariants} className="mb-6 flex flex-wrap items-center gap-2">  
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-1.5 backdrop-blur-sm shadow-sm">  
              <MapPin className="h-3.5 w-3.5 text-blue-600" />  
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">  
                Forbesganj • Araria • Bihar  
              </span>  
            </div>  
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-3 py-1.5 backdrop-blur-sm">  
              <div className="flex">  
                {[...Array(5)].map((_, i) => (  
                  <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />  
                ))}  
              </div>  
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">5★ Rated</span>  
            </div>  
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 backdrop-blur-sm">  
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />  
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Trusted Brand</span>  
            </div>  
          </motion.div>  

          {/* 2. Brand name */}  
          <motion.div variants={itemVariants} className="relative">  
            <div  
              role="heading"  
              aria-level={1}  
              className="font-black leading-[0.9] tracking-tighter text-slate-900"  
              style={{ fontSize: "clamp(3.2rem, 10vw, 6.5rem)" }}  
            >  
              JK  
              <span className="ml-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"  
                style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)", letterSpacing: "0.12em" }}  
              >  
                INTERIOR  
              </span>  
            </div>  
            <motion.div  
              initial={{ scaleX: 0 }}  
              animate={{ scaleX: 1 }}  
              transition={{ delay: 0.8, duration: 1, ease: easeLux }}  
              className="mt-2 h-1.5 w-24 origin-left rounded-full bg-gradient-to-r from-blue-600 to-amber-400"  
            />  
          </motion.div>  

          {/* 3. Sliding Headline Section (यहां बदलाव हुआ है - स्लाइडिंग इफेक्ट के लिए) */}  
          <motion.div variants={itemVariants} className="mt-8 min-h-[100px] sm:min-h-[130px]">  
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
                    className="block bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h2>  
          </motion.div>

                       {/* 4. Stylish & Interactive Description */}
          <motion.div variants={itemVariants} className="mt-8 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-amber-700">
               <Sparkles className="h-4 w-4" />
               <span className="text-[11px] font-black uppercase tracking-widest">Premium Aesthetics</span>
            </div>
            
            <h3 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-5xl">
              साधारण दीवारों को दें <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  एक शाही पहचान
                </span>
                <svg className="absolute -bottom-2 left-0 z-0 h-3 w-full fill-blue-100/60" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 q25 -5 50 0 t50 0" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
              </span>
            </h3>

            <p className="max-w-lg text-base font-medium leading-relaxed text-slate-600 md:text-lg">
              हम लेकर आए हैं फारबिसगंज में इंटीरियर का <span className="text-slate-900 font-bold">Next-Level Experience</span>। 
              डिज़ाइन ऐसा कि लोग देखते रह जाएँ, और मजबूती ऐसी कि सालों साल साथ निभाए।
            </p>
          </motion.div>

          {/* 5. Service Highlights (Updated with Stylish Interaction) */}  
          <motion.ul variants={itemVariants} className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">  
            {[
              { icon: Layers, title: "Designer False Ceiling", desc: "PVC और जिप्सम की बेहतरीन फिनिशिंग" },
              { icon: PanelTop, title: "High-End Wall Panels", desc: "WPC और UV मार्बल का लग्जरी टच" },
              { icon: Tv, title: "Bespoke TV Units", desc: "आपके हॉल के लिए कस्टमाइज्ड डिज़ाइन" },
              { icon: ShieldCheck, title: "Quality Assurance", desc: "बेहतरीन मटेरियल और पक्का भरोसा" }
            ].map((item) => (  
              <li  
                key={item.title}  
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-5 transition-all hover:border-blue-500 hover:bg-white hover:shadow-2xl hover:shadow-blue-100/50"  
              >
                {/* Hover Background Accent */}
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-blue-50 transition-transform group-hover:scale-[3]" />
                
                <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white transition-colors group-hover:bg-blue-600 shadow-lg">  
                  <item.icon className="h-7 w-7" />  
                </div>  
                
                <div className="relative z-10">
                  <h4 className="font-black text-slate-900 text-sm md:text-base">{item.title}</h4>
                  <p className="mt-0.5 text-xs font-semibold text-slate-500">{item.desc}</p>
                </div>
              </li>  
            ))}  
          </motion.ul>
          
          
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
}

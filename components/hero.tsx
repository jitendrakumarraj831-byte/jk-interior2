"use client"

import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, Sparkles, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// Smooth luxury easing
const easeLux = [0.22, 1, 0.36, 1] as const

// Animation Variants for Text Slider Effect
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
  return (
    <section 
      id="home" 
      className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50/30"
    >
      {/* ✅ Hero style glow background */}
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

          {/* 2. Brand name with Slider Animation */}
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

          {/* 3. Main Headline */}
          <motion.div variants={itemVariants} className="mt-6 max-w-2xl space-y-4">
            <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl">
              डिज़ाइन जो{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">दिल जीत ले</span>,{" "}
              <br className="hidden sm:block" />
              फिनिशिंग जो{" "}
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">सालों चले</span>।
            </h2>
            <p className="text-lg font-medium italic text-slate-700 md:text-xl">
              &quot;छत आपकी,{" "}
              <span className="text-blue-600 underline decoration-amber-300 decoration-2 underline-offset-4">
                पहचान हमारी
              </span>
              &quot;
            </p>
            <p className="border-l-4 border-blue-500 pl-4 text-sm leading-relaxed text-slate-600 md:text-base">
              घर, दुकान, ऑफिस और शोरूम के लिए प्रीमियम{" "}
              <span className="font-bold text-slate-900">
                PVC, जिप्सम, WPC पैनल, UV मार्बल शीट
              </span>{" "}
              और ग्रिड सीलिंग।
              <span className="mt-1 block font-bold text-blue-900 uppercase tracking-wide">
                "फारबिसगंज का भरोसेमंद पार्टनर"
              </span>
            </p>
          </motion.div>

          {/* 4. Service Highlights Icons */}
          <motion.ul variants={itemVariants} className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-md"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-100 group-hover:scale-110 transition-transform">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-sm font-bold text-slate-800">{text}</span>
              </li>
            ))}
          </motion.ul>

          {/* 5. CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="h-14 relative overflow-hidden rounded-full bg-blue-600 px-10 text-white shadow-xl shadow-blue-100 transition-all hover:bg-blue-700 hover:shadow-blue-200 active:scale-95"
            >
              <a href="tel:+918651070831" className="flex items-center gap-2 text-base font-bold">
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

          {/* 6. Stats Section */}
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

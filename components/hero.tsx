"use client"

import { useState, useEffect } from "react"
import { Phone, ArrowRight, MapPin, Star, Layers, PanelTop, Tv, ShieldCheck, Droplets, Sparkles, Clock, MessageCircle, Zap, CheckCircle2, Award, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

const easeLux = [0.22, 1, 0.36, 1] as const

const words = [
  "PVC False Ceiling",
  "WPC Wall Paneling",
  "UV Marble Sheet",
  "Modular TV Unit",
  "Gypsum Ceiling",
]

const stats = [
  { value: "5000+", label: "Sqft Installed", icon: TrendingUp },
  { value: "100+", label: "Happy Clients", icon: Users },
  { value: "5+", label: "Years Exp.", icon: Award },
  { value: "100%", label: "Satisfaction", icon: Star },
]

const trustBadges = [
  { icon: Star, label: "5-Star Rated", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  { icon: ShieldCheck, label: "ISI Certified", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  { icon: Droplets, label: "Waterproof", color: "text-cyan-700", bg: "bg-cyan-50 border-cyan-200" },
  { icon: Sparkles, label: "Dust-Free", color: "text-violet-700", bg: "bg-violet-50 border-violet-200" },
]

const serviceCards = [
  { icon: Layers, title: "False Ceiling", desc: "PVC & Gypsum Experts", color: "from-emerald-500 to-emerald-700" },
  { icon: PanelTop, title: "Wall Paneling", desc: "WPC & UV Marble", color: "from-amber-500 to-amber-700" },
  { icon: Tv, title: "Modular Units", desc: "Luxury TV Units", color: "from-violet-500 to-violet-700" },
]

const areaChips = ["Forbesganj", "Araria", "Purnia", "Supaul", "Jogbani", "Narpatganj"]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  const anim = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ease: easeLux, delay },
        }

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden"
      aria-label="JK Interior - Best Interior Designer in Forbesganj Araria Bihar"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] via-[#f8fffe] to-[#f0fdf4]" />
        {!shouldReduce && (
          <>
            <motion.div
              className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-400/12 blur-[100px]"
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-emerald-300/15 blur-[80px]"
              animate={{ opacity: [0.3, 0.55, 0.3], y: [0, -30, 0] }}
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </>
        )}
        <div className="absolute inset-0 grid-texture opacity-30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-5 pt-24 pb-32 sm:px-6 lg:px-12 lg:pt-28 lg:pb-16 md:pb-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-7">

            {/* Trust Badges */}
            <motion.div {...anim(0.1)} className="mb-6 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 ${badge.bg}`}
                >
                  <badge.icon className={`h-3 w-3 ${badge.color}`} aria-hidden="true" />
                  <span className={`text-[9px] font-bold uppercase tracking-widest sm:text-[10px] ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Brand Wordmark */}
            <motion.div {...anim(0.15)} className="mb-5">
              <div role="heading" aria-level={2} className="font-black leading-none tracking-tighter text-gray-900">
                <span
                  className="block"
                  style={{ fontSize: "clamp(3rem, 10vw, 6.5rem)" }}
                >
                  JK
                </span>
                <span
                  className="hero-gradient-text block"
                  style={{
                    fontSize: "clamp(1.5rem, 5vw, 3rem)",
                    letterSpacing: "0.16em",
                  }}
                >
                  INTERIOR
                </span>
              </div>
              <motion.div
                initial={shouldReduce ? {} : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 1, ease: easeLux }}
                className="mt-3 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600"
              />
            </motion.div>

            {/* Animated Subheadline */}
            <motion.div {...anim(0.25)} className="mb-5 h-10 sm:h-12">
              <div className="text-lg font-bold text-gray-500 sm:text-xl md:text-2xl flex items-center gap-2 flex-wrap">
                <span>Specialist in</span>
                <span className="relative inline-block overflow-hidden align-bottom min-w-[200px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={shouldReduce ? {} : { y: 28, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={shouldReduce ? {} : { y: -28, opacity: 0 }}
                      transition={{ duration: 0.45, ease: easeLux }}
                      className="block hero-gradient-text font-black"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </motion.div>

            {/* Hindi Tagline */}
            <motion.div {...anim(0.3)} className="mb-7 max-w-xl">
              <p className="mb-3 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
                साधारण दीवारों को दें
                <br />
                <span className="hero-gradient-text">एक शाही पहचान</span>
              </p>
              <p className="text-sm font-medium leading-relaxed text-gray-600 sm:text-base">
                फारबिसगंज में इंटीरियर का{" "}
                <span className="font-bold text-emerald-700 underline decoration-emerald-300 underline-offset-4">
                  Next-Level Experience
                </span>
                । मजबूती और खूबसूरती का बेजोड़ संगम।
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div {...anim(0.4)} className="mb-6 flex flex-wrap gap-3">
              <a
                href="tel:+918651070831"
                aria-label="Call JK Interior for free quotation"
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-emerald-600 px-7 py-4 text-sm font-black text-white shadow-[0_4px_24px_rgba(5,150,105,0.4)] transition-all hover:bg-emerald-500 hover:shadow-[0_4px_32px_rgba(5,150,105,0.6)] active:scale-95 sm:px-8 sm:py-4 sm:text-base luxury-animated-shine"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                फ्री कोटेशन लें
              </a>
              <a
                href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20a%20free%20quotation%20for%20interior%20work."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp JK Interior now"
                className="group flex items-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 text-sm font-black text-white shadow-[0_4px_24px_rgba(37,211,102,0.35)] transition-all hover:bg-[#20c05c] hover:shadow-[0_4px_32px_rgba(37,211,102,0.5)] active:scale-95 sm:px-8 sm:py-4 sm:text-base"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                WhatsApp Now
              </a>
              <Link
                href="/gallery"
                aria-label="View our work gallery"
                className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/8 px-6 py-4 text-sm font-bold text-emerald-700 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/15 active:scale-95 sm:px-7 sm:py-4 sm:text-base"
              >
                देखें काम
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Extra Trust */}
            <motion.div {...anim(0.5)} className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                Free Site Visit Available
              </span>
              <span className="text-gray-300" aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                5 Year Written Warranty
              </span>
              <span className="text-gray-300" aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                Forbesganj &amp; Araria
              </span>
            </motion.div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Service Feature Cards */}
            <motion.div {...anim(0.3)} className="flex flex-col gap-3">
              {serviceCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  {...(shouldReduce ? {} : {
                    initial: { opacity: 0, x: 30 },
                    animate: { opacity: 1, x: 0 },
                    transition: { duration: 0.6, ease: easeLux, delay: 0.35 + i * 0.08 },
                  })}
                  className="group flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-white/90 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-white hover:shadow-[0_4px_24px_rgba(5,150,105,0.12)] sm:gap-5 sm:p-5"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl`}>
                    <item.icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900 sm:text-lg">{item.title}</p>
                    <p className="text-xs font-medium text-gray-500 sm:text-sm">{item.desc}</p>
                  </div>
                  <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                </motion.div>
              ))}
            </motion.div>

            {/* Area Chips */}
            <motion.div {...anim(0.55)} className="flex flex-wrap gap-2" aria-label="Service areas">
              {areaChips.map((area) => (
                <span
                  key={area}
                  className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-600 shadow-sm"
                >
                  <MapPin className="h-2.5 w-2.5 text-emerald-600" aria-hidden="true" />
                  {area}
                </span>
              ))}
            </motion.div>

            {/* Stats Card */}
            <motion.div
              {...anim(0.6)}
              className="grid grid-cols-4 gap-0 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-50 to-white shadow-sm"
              aria-label="JK Interior achievements"
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center py-5 text-center ${i < stats.length - 1 ? "border-r border-emerald-500/15" : ""}`}
                >
                  <s.icon className="mb-1.5 h-4 w-4 text-emerald-500/60" aria-hidden="true" />
                  <div className="text-lg font-black text-emerald-700 sm:text-xl lg:text-2xl">{s.value}</div>
                  <div className="mt-0.5 px-1 text-[8px] font-bold uppercase tracking-widest text-gray-500 sm:text-[9px]">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

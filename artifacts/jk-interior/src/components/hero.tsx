import { useState, useEffect } from "react"
import { ArrowRight, MapPin, Star, ShieldCheck, Droplets, Sparkles, Zap, Award, Users, TrendingUp, PhoneCall } from "lucide-react"
import { Link } from "wouter"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"

const easeLux = [0.16, 1, 0.3, 1] as const

const words = [
  "Gypsum Ceiling Specialist",
  "PVC Wall Paneling & Louvers",
  "UV Marble & Charcoal Panel",
  "Luxury Modular TV Unit",
  "WPC Exterior & Interior",
]

const stats = [
  { value: "500+", label: "Projects Done", icon: TrendingUp },
  { value: "100%", label: "Termite & Waterproof", icon: Droplets },
  { value: "1 Year", label: "Written Warranty", icon: Award },
  { value: "0%", label: "Hidden Costs", icon: ShieldCheck },
]

const trustBadges = [
  { icon: Star, label: "4.9/5 Rated (100+ Reviews)", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  { icon: ShieldCheck, label: "1 Year Written Warranty", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
  { icon: Droplets, label: "100% Waterproof & Durable", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
  { icon: Sparkles, label: "Dust-Free Installation", color: "text-violet-400 border-violet-500/30 bg-violet-500/10" },
]

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
          transition: { duration: 0.8, ease: easeLux, delay },
        }

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-zinc-950"
      aria-label="JK Interior - Best Interior & False Ceiling Designer in Forbesganj Araria Bihar"
    >
      {/* Background Image with Cinematic Overlays */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <motion.img
          src="/images/hero-interior.webp"
          alt="Luxury Gypsum False Ceiling and PVC Wall Design in Forbesganj Bihar by JK Interior"
          className="absolute inset-0 h-full w-full object-cover object-center"
          // @ts-ignore
          fetchPriority="high"
          initial={shouldReduce ? {} : { scale: 1.08 }}
          animate={shouldReduce ? {} : { scale: 1 }}
          transition={{ duration: 14, ease: "easeOut" }}
        />
        {/* Dark Vignette Gradients for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/40 to-transparent" />
        
        {/* Ambient Glow */}
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-between px-4 pt-24 pb-6 sm:px-6 lg:px-12 lg:pt-28">

        {/* Top Trust Badges */}
        <motion.div {...anim(0.1)} className="flex flex-wrap gap-2">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs backdrop-blur-md transition-all ${badge.color}`}
            >
              <badge.icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-wider sm:text-[11px]">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Middle / Bottom Content */}
        <div className="mt-auto pt-6">
          <div className="max-w-3xl pb-6 sm:pb-8">
            
            {/* Dynamic Rotating Specialty - Perfectly Aligned for Mobile & Desktop */}
<motion.div {...anim(0.2)} className="mb-3">
  <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-zinc-300 sm:text-base md:text-lg">
    <span className="shrink-0 text-amber-400">Specialist in:</span>
    <span className="relative inline-flex h-7 items-center overflow-hidden sm:h-8">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={shouldReduce ? {} : { y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={shouldReduce ? {} : { y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: easeLux }}
          className="hero-gradient-text block font-black leading-none"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  </div>
</motion.div>
            

            
<motion.div {...anim(0.3)} className="mb-5">
  <h1 className="mb-3 font-serif text-3xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
    फारबिसगंज और अररिया का
    <br />
    <span className="hero-gradient-text">#1 False Ceiling Expert</span>
  </h1>
  <p className="max-w-xl text-sm font-normal leading-relaxed text-zinc-200 sm:text-base md:text-lg">
    प्रीमियम Gypsum False Ceiling, PVC Panel और UV Sheet वर्क।{" "}
    <span className="inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-300 backdrop-blur-xs">
      1 साल की लिखित वारंटी
    </span>{" "}
    और फ्री साइट विजिट के साथ।
  </p>
</motion.div>



            {/* Action Buttons (CTAs) */}
            <motion.div {...anim(0.4)} className="mb-6 flex flex-wrap items-center gap-3">
              <CallLink size="lg" shine ariaLabel="Call JK Interior for free rate list and site visit">
                <PhoneCall className="mr-2 h-4 w-4" />
                फ्री रेट लिस्ट व साइट विजिट लें
              </CallLink>

              <WhatsAppLink
                size="lg"
                ariaLabel="WhatsApp JK Interior for photos and quotes"
                message="Hi JK Interior, I need a free quotation and photos for interior work."
              >
                फोटो व रेट WhatsApp पर पाएं
              </WhatsAppLink>

              <Link
                href="/gallery"
                aria-label="काम देखें – View our work gallery"
                className="group flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20 active:scale-95 sm:px-6 sm:py-4 sm:text-base"
              >
                काम देखें
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Quick Micro-Trust Badges */}
            <motion.div {...anim(0.5)} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                Free Site Visit
              </span>
              <span className="text-zinc-600" aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                1 Year Written Warranty
              </span>
              <span className="text-zinc-600" aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                Forbesganj &amp; Araria
              </span>
            </motion.div>
          </div>

          {/* Bottom Frosted Stat Bar */}
          <motion.div
            {...anim(0.6)}
            className="grid grid-cols-2 divide-x divide-white/10 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl sm:grid-cols-4"
            aria-label="JK Interior achievements"
          >
            {stats.map((s) => (
              <div key={s.label} className="group flex flex-col items-center gap-1 p-3.5 text-center transition-colors hover:bg-white/5 sm:p-4">
                <s.icon className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-amber-400" aria-hidden="true" />
                <div className="text-lg font-black tracking-tight text-white sm:text-2xl">{s.value}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 sm:text-[10px]">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}


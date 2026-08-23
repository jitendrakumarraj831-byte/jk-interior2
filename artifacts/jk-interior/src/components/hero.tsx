import { useState, useEffect } from "react"
import { ArrowRight, MapPin, Star, ShieldCheck, Droplets, Sparkles, Zap, TrendingUp, PhoneCall, CheckCircle2, Phone, Clock } from "lucide-react"
import { Link } from "wouter"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { CALL_NUMBER } from "@/lib/business-data"

// "+918541849118" → "+91 85418 49118" for a human-readable, tappable display.
const CALL_DISPLAY = CALL_NUMBER.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2 $3")

const easeLux = [0.16, 1, 0.3, 1] as const

const words = [
  "Gypsum False Ceiling Work",
  "PVC Wall Paneling & Louvers",
  "UV Marble & Charcoal Panels",
  "Modern TV Unit & Partitions",
]

const stats = [
  { value: "500+", label: "Projects Completed", icon: TrendingUp },
  { value: "ISI", label: "Branded Material", icon: ShieldCheck },
  { value: "0%", label: "Hidden Costs", icon: Droplets },
  { value: "Free", label: "Site Visit & Quote", icon: Zap },
]

const trustBadges = [
  { icon: Star, label: "4.9/5 Google Rating", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  { icon: Droplets, label: "Waterproof PVC & UV Marble", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
  { icon: Sparkles, label: "Dust-Free Clean Work", color: "text-violet-400 border-violet-500/30 bg-violet-500/10" },
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
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: easeLux, delay },
        }

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-[100dvh] w-full overflow-hidden bg-zinc-950 flex flex-col justify-center"
      aria-label="JK Interior - False Ceiling & Interior Contractor in Forbesganj Araria Bihar"
    >
      {/* Background Image with Cinematic Overlays */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <motion.picture>
          <source srcSet="/images/hero-interior.avif" type="image/avif" />
          <source srcSet="/images/hero-interior.webp" type="image/webp" />
          <motion.img
            src="/images/hero-interior.webp"
            alt="False Ceiling Contractor and Interior Designer in Forbesganj Araria Bihar by JK Interior"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-70 lg:opacity-100"
            // @ts-ignore
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            initial={shouldReduce ? {} : { scale: 1.05 }}
            animate={shouldReduce ? {} : { scale: 1 }}
            transition={{ duration: 12, ease: "easeOut" }}
          />
        </motion.picture>
        
        {/* Dark Vignette Gradients for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/60 lg:bg-gradient-to-t lg:from-zinc-950 lg:via-zinc-950/65 lg:to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/60 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 pt-28 pb-8 sm:px-6 lg:px-12 lg:pt-32 lg:pb-12">

        {/* Top Trust Badges */}
        <motion.div {...anim(0.1)} className="flex flex-wrap gap-2 mb-4">
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

        {/* Center Text & CTA Section */}
        <div className="max-w-3xl my-auto py-2">

          {/* Urgency / Offer Strip */}
          <motion.div {...anim(0.15)} className="mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md sm:text-[11px]">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              आज ही फ्री साइट विजिट बुक करें
            </span>
          </motion.div>

          {/* Dynamic Rotating Specialty */}
          <motion.div {...anim(0.2)} className="mb-2">
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

          {/* Main Heading & Subtitle */}
          <motion.div {...anim(0.3)} className="mb-5">
            <h1 className="mb-3 font-serif text-3xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
              फारबिसगंज और अररिया का
              <br />
              <span className="hero-gradient-text">#1 False Ceiling & Interior Contractor</span>
            </h1>
            <p className="max-w-xl text-sm font-normal leading-relaxed text-zinc-200 sm:text-base md:text-lg">
              घर, ऑफिस या दुकान को दें एक मॉडर्न और साफ-सुथरा लुक। भरोसेमंद कारीगरी, ब्रांडेड टिकाऊ मटेरियल और{" "}
              <span className="inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-300 backdrop-blur-xs">
                फ्री साइट विजिट
              </span>{" "}
              के साथ।
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
              ariaLabel="WhatsApp JK Interior for design photos and rates"
              message="Hi JK Interior, I want to check design photos and rates for interior work."
            >
              WhatsApp पर डिज़ाइन और रेट पाएं
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

          {/* Visible, tappable phone number */}
          <motion.div {...anim(0.45)} className="mb-4">
            <a
              href={`tel:${CALL_NUMBER}`}
              aria-label={`Call JK Interior at ${CALL_DISPLAY}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-200 transition-colors hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30 transition-colors group-hover:bg-emerald-500/25">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">Call करें</span>
                <span className="block text-base font-black tracking-tight text-white sm:text-lg">{CALL_DISPLAY}</span>
              </span>
            </a>
          </motion.div>

          {/* Quick Micro-Features */}
          <motion.div {...anim(0.5)} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              2 घंटे में जवाब
            </span>
            <span className="text-zinc-600" aria-hidden="true">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              Direct Contractor Rates
            </span>
            <span className="text-zinc-600" aria-hidden="true">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              Expert Workmanship
            </span>
            <span className="text-zinc-600" aria-hidden="true">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
              Forbesganj, Araria, Jogbani &amp; आस-पास
            </span>
          </motion.div>
        </div>

        {/* Bottom Frosted Stat Bar */}
        <motion.div
          {...anim(0.6)}
          className="mt-6 grid grid-cols-2 divide-x divide-white/10 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl sm:grid-cols-4"
          aria-label="JK Interior achievements"
        >
          {stats.map((s) => (
            <div key={s.label} className="group flex flex-col items-center gap-1 p-3 text-center transition-colors hover:bg-white/5 sm:p-4">
              <s.icon className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-amber-400" aria-hidden="true" />
              <div className="text-lg font-black tracking-tight text-white sm:text-2xl">{s.value}</div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 sm:text-[10px]">{s.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}


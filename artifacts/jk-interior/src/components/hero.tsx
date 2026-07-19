
import { useState, useEffect } from "react"
import { ArrowRight, MapPin, Star, ShieldCheck, Droplets, Sparkles, Zap, Award, Users, TrendingUp } from "lucide-react"
import { Link } from "wouter"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"

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
  { value: "8+", label: "Years Exp.", icon: Award },
  { value: "100%", label: "Satisfaction", icon: Star },
]

const trustBadges = [
  { icon: Star, label: "5-Star Rated", color: "text-amber-300" },
  { icon: ShieldCheck, label: "ISI Certified", color: "text-emerald-300" },
  { icon: Droplets, label: "Waterproof", color: "text-cyan-300" },
  { icon: Sparkles, label: "Dust-Free", color: "text-violet-300" },
]

/**
 * The hero is the site's one full-bleed photographic "magazine cover" moment —
 * every section after this is paper, plaster, or a dark stage, but never a
 * dominant photograph. That contrast is deliberate: this is the cover, the
 * rest of the homepage is the feature spread inside.
 */
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
      {/* Full-bleed cover photo */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.img
          src="/images/hero-interior.webp"
          alt="Luxury false ceiling bedroom interior design by JK Interior in Forbesganj Bihar"
          className="absolute inset-0 h-full w-full object-cover"
          initial={shouldReduce ? {} : { scale: 1.08 }}
          animate={shouldReduce ? {} : { scale: 1 }}
          transition={{ duration: 16, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-between px-5 pt-24 pb-0 sm:px-6 lg:px-12 lg:pt-28">

        {/* Top row — trust badges, translucent on photo */}
        <motion.div {...anim(0.1)} className="flex flex-wrap gap-2">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm"
            >
              <badge.icon className={`h-3 w-3 ${badge.color}`} aria-hidden="true" />
              <span className={`text-[9px] font-bold uppercase tracking-widest sm:text-[10px] ${badge.color}`}>
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Bottom — cover line, CTAs, and stat strip */}
        <div>
          <div className="max-w-3xl pb-10 sm:pb-12">
            {/* Rotating specialist line */}
            <motion.div {...anim(0.2)} className="mb-4 h-9 sm:h-11">
              <div className="flex flex-wrap items-center gap-2 text-lg font-bold text-white/70 sm:text-xl md:text-2xl">
                <span>Specialist in</span>
                <span className="relative inline-block min-w-[200px] overflow-hidden align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={shouldReduce ? {} : { y: 28, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={shouldReduce ? {} : { y: -28, opacity: 0 }}
                      transition={{ duration: 0.45, ease: easeLux }}
                      className="hero-gradient-text block font-black"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </motion.div>

            {/* Hindi cover line */}
            <motion.div {...anim(0.3)} className="mb-6">
              <p className="mb-4 font-serif text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                साधारण दीवारों को दें
                <br />
                <span className="hero-gradient-text">एक लग्जरी पहचान</span>
              </p>
              <p className="max-w-xl text-sm font-medium leading-relaxed text-white/75 sm:text-base">
                फारबिसगंज और अररिया में प्रीमियम इंटीरियर का{" "}
                <span className="inline-block rounded-md border border-white/20 bg-white/10 px-1.5 py-0.5 font-extrabold text-emerald-300">
                  Next-Level Experience
                </span>
                , जहाँ मिले मजबूती और खूबसूरती का बेजोड़ संगम।
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div {...anim(0.4)} className="mb-6 flex flex-wrap gap-3">
              <CallLink size="lg" shine ariaLabel="Call JK Interior for free quotation">
                फ्री कोटेशन लें
              </CallLink>
              <WhatsAppLink
                size="lg"
                ariaLabel="WhatsApp JK Interior now"
                message="Hi JK Interior, I need a free quotation for interior work."
              >
                WhatsApp Now
              </WhatsAppLink>
              <Link
                href="/gallery"
                aria-label="देखें काम – View our work gallery"
                className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20 active:scale-95 sm:px-7 sm:py-4 sm:text-base"
              >
                देखें काम
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Extra Trust */}
            <motion.div {...anim(0.5)} className="flex flex-wrap items-center gap-3 text-xs font-semibold text-white/60">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                Free Site Visit Available
              </span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                1 Year Written Warranty
              </span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                Forbesganj &amp; Araria
              </span>
            </motion.div>
          </div>

          {/* Stat strip — a caption band under the cover photo */}
          <motion.div
            {...anim(0.6)}
            className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/15 sm:grid-cols-4"
            aria-label="JK Interior achievements"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 py-4 text-center sm:py-5">
                <s.icon className="h-4 w-4 text-white/40" aria-hidden="true" />
                <div className="text-lg font-black text-white sm:text-xl lg:text-2xl">{s.value}</div>
                <div className="px-1 text-[8px] font-bold uppercase tracking-widest text-white/50 sm:text-[9px]">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { useState, useEffect } from "react"
import { ArrowRight, MapPin, Star, ShieldCheck, Droplets, Sparkles, Zap, TrendingUp, PhoneCall, CheckCircle2, Phone, Clock } from "lucide-react"
import { Link } from "wouter"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import SwipeRail from "@/components/ui/swipe-rail"
import {
  PHONE_PRIMARY,
  PHONE_PRIMARY_DISPLAY,
  PHONE_SECONDARY,
  PHONE_SECONDARY_DISPLAY,
} from "@/lib/business-data"

const easeLux = [0.16, 1, 0.3, 1] as const

const words = [
  "Gypsum False Ceilings",
  "PVC Wall Panelling & Louvres",
  "UV Marble & Charcoal Panels",
  "Modular TV Units & Partitions",
]

const stats = [
  { value: "500+", label: "Projects Completed", icon: TrendingUp },
  { value: "ISI", label: "Certified Materials", icon: ShieldCheck },
  { value: "0%", label: "Hidden Charges", icon: Droplets },
  { value: "Free", label: "Site Visit & Quotation", icon: Zap },
]

const trustBadges = [
  { icon: Star, label: "4.9 / 5 Google Rating", color: "text-amber-700 border-amber-300/60 bg-amber-50" },
  { icon: Droplets, label: "Waterproof PVC & UV Marble", color: "text-gold-700 border-gold-300/60 bg-gold-50" },
  { icon: Sparkles, label: "Low-Dust Panel Installation", color: "text-charcoal-700 border-charcoal-300/60 bg-charcoal-50" },
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
      className="relative min-h-[90vh] lg:min-h-[100dvh] w-full overflow-hidden bg-[#faf7f0] flex flex-col justify-center"
      aria-label="JK Interior – false ceiling and interior contractor in Narpatganj, Forbesganj and Araria district, Bihar"
    >
      {/* Soft luxury backdrop — warm cream with gold glows */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf6] via-[#faf7f0] to-[#f3ecdd]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_85%_15%,rgba(212,160,23,0.14),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_5%_90%,rgba(201, 162, 39,0.10),transparent)]" />
        {/* fine grid texture */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(120,100,60,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,100,60,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 pt-36 pb-8 sm:px-6 lg:px-12 lg:pt-40 lg:pb-12">

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

          {/* LEFT — copy & CTAs */}
          <div className="max-w-2xl">

            {/* Top Trust Badges */}
            <motion.div {...anim(0.1)} className="flex flex-wrap gap-2 mb-5">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs shadow-xs transition-all ${badge.color}`}
                >
                  <badge.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-wider sm:text-[11px]">
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Urgency / Offer Strip */}
            <motion.div {...anim(0.15)} className="mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-600/30 bg-gold-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-800 sm:text-[11px]">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Book your free site visit today
              </span>
            </motion.div>

            {/* Dynamic Rotating Specialty */}
            <motion.div {...anim(0.2)} className="mb-2">
              <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-stone-600 sm:text-base md:text-lg">
                <span className="shrink-0 text-amber-700">Specialists in:</span>
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
              <h1 className="mb-3 font-serif text-3xl font-black leading-[1.12] tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
                Araria District&rsquo;s Trusted
                <br />
                <span className="hero-gradient-text">False Ceiling &amp; Interior Contractor</span>
              </h1>
              <p className="max-w-xl text-sm font-normal leading-relaxed text-stone-600 sm:text-base md:text-lg">
                Ceilings, wall panelling and modular interiors for homes, offices and showrooms
                across Narpatganj, Forbesganj and Araria &mdash; certified materials, a{" "}
                <span className="inline-block rounded-md border border-gold-600/30 bg-gold-50 px-2 py-0.5 font-semibold text-gold-800">
                  free site visit
                </span>{" "}
                first.
              </p>
            </motion.div>

            {/* Action Buttons (CTAs) */}
            <motion.div {...anim(0.4)} className="mb-6 flex flex-wrap items-center gap-3">
              <CallLink size="lg" shine ariaLabel="Call JK Interior for a free rate list and site visit">
                <PhoneCall className="mr-2 h-4 w-4" />
                Request Your Free Quotation
              </CallLink>

              <WhatsAppLink
                size="lg"
                ariaLabel="Message JK Interior on WhatsApp for design photographs and rates"
                message="Hello JK Interior, please share design photographs and current rates for interior work."
              >
                Get Designs &amp; Rates on WhatsApp
              </WhatsAppLink>

              <Link
                href="/gallery"
                aria-label="View the JK Interior project gallery"
                className="group flex items-center gap-2 rounded-xl border border-stone-300 bg-white/80 px-5 py-3.5 text-sm font-bold text-stone-800 shadow-xs backdrop-blur-md transition-all hover:border-amber-400/60 hover:bg-white active:scale-95 sm:px-6 sm:py-4 sm:text-base"
              >
                View Our Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Visible, tappable phone numbers — both official lines */}
            <motion.div {...anim(0.45)} className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              {[
                { tel: PHONE_PRIMARY, display: PHONE_PRIMARY_DISPLAY, caption: "Primary Line" },
                { tel: PHONE_SECONDARY, display: PHONE_SECONDARY_DISPLAY, caption: "WhatsApp Line" },
              ].map(({ tel, display, caption }) => (
                <a
                  key={tel}
                  href={`tel:${tel}`}
                  aria-label={`Call JK Interior at ${display}`}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-100 text-gold-700 ring-1 ring-gold-600/20 transition-colors group-hover:bg-gold-200">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-500">{caption}</span>
                    <span className="block text-base font-black tracking-tight text-stone-900 sm:text-lg">{display}</span>
                  </span>
                </a>
              ))}
            </motion.div>

            {/* Quick Micro-Features */}
            <motion.div {...anim(0.5)} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-stone-600">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                Reply within 2 hours
              </span>
              <span className="text-stone-300" aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                Direct contractor pricing
              </span>
              <span className="text-stone-300" aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                In-house trained fitters
              </span>
              <span className="text-stone-300" aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
                Narpatganj, Forbesganj, Araria &amp; nearby
              </span>
            </motion.div>
          </div>

          {/* RIGHT — framed luxury showcase image */}
          <motion.div
            {...(shouldReduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.96, y: 20 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  transition: { duration: 0.9, ease: easeLux, delay: 0.25 },
                })}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* gold gradient frame */}
            <div className="relative rounded-[1.75rem] bg-gradient-to-br from-amber-200/70 via-white to-gold-100/60 p-2 shadow-[0_30px_70px_-20px_rgba(120,90,20,0.35)] ring-1 ring-amber-300/40">
              <div className="overflow-hidden rounded-[1.4rem]">
                <picture>
                  <source srcSet="/images/hero-interior.avif" type="image/avif" />
                  <source srcSet="/images/hero-interior.webp" type="image/webp" />
                  <motion.img
                    src="/images/hero-interior.webp"
                    alt="False Ceiling Contractor and Interior Designer in Forbesganj Araria Bihar by JK Interior"
                    className="h-64 w-full object-cover object-center sm:h-80 lg:h-[30rem]"
                    // @ts-ignore
                    fetchPriority="high"
                    loading="eager"
                    decoding="sync"
                    initial={shouldReduce ? {} : { scale: 1.08 }}
                    animate={shouldReduce ? {} : { scale: 1 }}
                    transition={{ duration: 12, ease: "easeOut" }}
                  />
                </picture>
              </div>
            </div>

            {/* Floating rating chip */}
            <div className="absolute -left-3 top-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-sm sm:-left-5">
              <div className="flex flex-col">
                <span className="flex items-center gap-1 text-sm font-black text-stone-900">
                  4.9
                  <span className="flex gap-0.5" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-amber-500 fill-amber-500" />
                    ))}
                  </span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500">Google Rating</span>
              </div>
            </div>

            {/* Floating projects chip */}
            <div className="absolute -bottom-3 right-5 flex items-center gap-2 rounded-2xl border border-gold-200 bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-black text-stone-900">500+</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500">Projects</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom stat bar — a swipeable strip on phones, a fixed row on desktop */}
        <motion.div {...anim(0.6)} className="mt-10 lg:mt-14" aria-label="JK Interior track record">
          <div className="sm:hidden">
            <SwipeRail
              ariaLabel="JK Interior track record"
              itemClassName="w-[46%]"
              gapClassName="gap-3"
              edgePaddingClassName="px-0"
              arrows={false}
              dots={false}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex h-full flex-col items-center gap-1 rounded-2xl border border-stone-200 bg-white/85 p-4 text-center shadow-[0_10px_30px_-22px_rgba(120,90,20,0.6)] backdrop-blur-sm"
                >
                  <s.icon className="h-4 w-4 text-amber-600" aria-hidden="true" />
                  <div className="text-lg font-black tracking-tight text-stone-900">{s.value}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-stone-500">{s.label}</div>
                </div>
              ))}
            </SwipeRail>
          </div>

          <div className="hidden overflow-hidden rounded-2xl border border-stone-200 bg-white/80 shadow-[0_16px_40px_-24px_rgba(120,90,20,0.4)] backdrop-blur-sm sm:grid sm:grid-cols-4 sm:divide-x sm:divide-stone-200">
            {stats.map((s) => (
              <div key={s.label} className="group flex flex-col items-center gap-1 p-5 text-center transition-colors hover:bg-amber-50/60">
                <s.icon className="h-4 w-4 text-amber-600 transition-colors group-hover:text-gold-600" aria-hidden="true" />
                <div className="text-2xl font-black tracking-tight text-stone-900">{s.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

"use client"

import { useEffect, useState, useCallback } from "react"
import { Phone, ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const easeLux = [0.22, 1, 0.36, 1] as const

const heroSlides = [
  { src: "/images/hero-interior.jpg", alt: "Modern PVC False Ceiling Design" },
  { src: "/images/gypsum-ceiling.jpg", alt: "Gypsum false ceiling design in Forbesganj Bihar" },
  { src: "/images/pvc-ceiling.jpg", alt: "PVC ceiling panel installation Forbesganj" },
  { src: "/images/wpc-louvers.jpg", alt: "WPC louvers wall panel design Forbesganj" },
  { src: "/images/tv-unit.jpg", alt: "Modern TV unit design Forbesganj" },
]

const letterContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
}

const letterItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeLux },
  },
}

export default function Hero() {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % heroSlides.length)
  }, [])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    const t = setInterval(next, 5200)
    return () => clearInterval(t)
  }, [next])

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden pt-24 sm:pt-28"
    >
      <div className="absolute inset-0 z-0 animate-mesh opacity-40 md:opacity-55" />
      <div className="floating-blob absolute top-[15%] right-[-10%] z-0 hidden h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full bg-gold/10 blur-[72px] md:block md:bg-gold/12 md:blur-[100px]" />

      <div className="relative z-10 grid min-h-[calc(100dvh-5.5rem)] grid-cols-1 lg:grid-cols-2">
        {/* Left: vertical typographic stack + stagger */}
        <div className="flex flex-col justify-center px-6 py-12 lg:pl-12 lg:pr-8 xl:pl-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeLux }}
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-full glass-panel border-gold/25 px-4 py-2"
          >
            <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gold">
              Forbesganj • Araria • Bihar
            </span>
          </motion.div>

          <div className="flex flex-row items-start gap-4 md:gap-8">
            <motion.div
              className="flex flex-col"
              variants={letterContainer}
              initial="hidden"
              animate="visible"
            >
              {["J", "K"].map((ch) => (
                <motion.span
                  key={ch}
                  variants={letterItem}
                  className="font-black leading-[0.85] text-foreground text-[clamp(3.5rem,12vw,7rem)] tracking-tighter"
                >
                  {ch}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.65, ease: easeLux }}
              className="flex min-h-[min(60vh,420px)] items-center"
            >
              <h1
                className="gold-text font-black tracking-[0.2em] text-[clamp(2rem,5vw,3.25rem)] [writing-mode:vertical-rl] rotate-180"
                style={{ textOrientation: "mixed" }}
              >
                INTERIOR
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: easeLux }}
            className="mt-10 max-w-lg space-y-5"
          >
            <p className="text-lg md:text-xl text-foreground font-light tracking-wide italic">
              &quot;छत आपकी, <span className="text-gold font-bold">पहचान हमारी</span>&quot;
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed border-l-2 border-gold/35 pl-5">
              हम सिर्फ छत नहीं,{" "}
              <span className="text-foreground font-medium">प्रीमियम लाइफस्टाइल</span>{" "}
              बनाते हैं। PVC पैनलिंग और Gypsum डिजाइन में बिहार का नंबर 1 भरोसा।
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.55, ease: easeLux }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              asChild
              size="lg"
              className="h-14 px-8 font-black text-base rounded-full border-none luxury-animated-shine"
            >
              <a href="tel:+918651070831" className="flex items-center gap-2">
                <Phone className="h-5 w-5 fill-primary-foreground" />
                प्रीमियम कोटेशन
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 px-8 rounded-full font-bold luxury-animated-shine luxury-animated-shine--subtle"
            >
              <Link href="#services" className="flex items-center gap-2 text-base">
                डिज़ाइन देखें <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Right: interactive slider */}
        <div className="relative flex min-h-[320px] lg:min-h-0 items-stretch p-4 sm:p-6 lg:p-10 lg:pl-4">
          <div className="relative w-full overflow-hidden rounded-[2rem] border border-gold/20 glass-panel shadow-2xl shadow-blue-200/60">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlides[index].src}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: easeLux }}
                className="absolute inset-0"
              >
                <Image
                  src={heroSlides[index].src}
                  alt={heroSlides[index].alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={index === 0 ? 82 : 72}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f0f7ff]/75 via-[#f0f7ff]/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-3 p-5 sm:p-6">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="rounded-full border border-gold/30 bg-white/70 p-2.5 text-gold backdrop-blur-md hover:bg-white/90 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full border border-gold/30 bg-white/70 p-2.5 text-gold backdrop-blur-md hover:bg-white/90 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex gap-1.5">
                {heroSlides.map((_, i) => (
                  <button
                    key={heroSlides[i].src}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-8 bg-gold" : "w-2 bg-white/25 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

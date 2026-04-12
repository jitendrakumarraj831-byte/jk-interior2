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
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const letterItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeLux },
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
      className="relative min-h-[100dvh] w-full overflow-hidden pt-20 sm:pt-28"
    >
      <div className="absolute inset-0 z-0 opacity-30" style={{backgroundImage:'radial-gradient(at 0% 0%,rgba(37,99,235,0.08) 0px,transparent 50%),radial-gradient(at 100% 0%,rgba(29,78,216,0.06) 0px,transparent 50%)'}} />

      <div className="relative z-10 grid min-h-[calc(100dvh-5.5rem)] grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Text and Branding */}
        <div className="flex flex-col justify-center px-6 py-8 lg:py-12 lg:pl-12 lg:pr-8 xl:pl-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeLux }}
            className="mb-6 lg:mb-8 inline-flex w-fit items-center gap-2 rounded-full glass-panel border-gold/25 px-4 py-2"
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
                  className="font-black leading-[0.85] text-foreground text-[clamp(4rem,15vw,7rem)] tracking-tighter"
                >
                  {ch}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: easeLux }}
              className="flex items-center"
            >
              {/* Changed for Mobile: Horizontal on mobile, Vertical on Laptop */}
              <h1
                className="gold-text font-black tracking-[0.1em] lg:tracking-[0.2em] text-[clamp(2.5rem,8vw,3.25rem)] lg:[writing-mode:vertical-rl] lg:rotate-180"
                style={{ textOrientation: "mixed" }}
              >
                INTERIOR
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.35, ease: easeLux }}
            className="mt-8 lg:mt-10 max-w-lg space-y-5"
          >
            <p className="text-lg md:text-xl text-foreground font-light tracking-wide italic">
              "छत आपकी, <span className="text-gold font-bold">पहचान हमारी</span>"
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed border-l-2 border-gold/35 pl-5">
              हम सिर्फ छत नहीं, <span className="text-foreground font-medium">प्रीमियम लाइफस्टाइल</span> बनाते हैं। 
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3, ease: easeLux }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="h-14 px-8 font-black text-base rounded-full border-none luxury-animated-shine">
              <a href="tel:+918651070831" className="flex items-center gap-2">
                <Phone className="h-5 w-5 fill-primary-foreground" /> प्रीमियम कोटेशन
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full font-bold">
              <Link href="#services" className="flex items-center gap-2 text-base">
                डिज़ाइन देखें <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Right Side: Slider Fix */}
        <div className="relative z-20 flex min-h-[420px] lg:min-h-0 items-stretch p-4 sm:p-6 lg:p-10 lg:pl-4">
          <div className="relative w-full overflow-hidden rounded-[2rem] border border-gold/20 glass-panel shadow-2xl">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={heroSlides[index].src}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: easeLux }}
                className="absolute inset-0"
              >
                <Image
                  src={heroSlides[index].src}
                  alt={heroSlides[index].alt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 z-30 flex items-end justify-between p-5 sm:p-6">
              <div className="flex gap-2">
                <button type="button" onClick={prev} className="rounded-full bg-white/80 p-3 text-gold backdrop-blur-md">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={next} className="rounded-full bg-white/80 p-3 text-gold backdrop-blur-md">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex gap-1.5 mb-2">
                {heroSlides.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-2 bg-white/40"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

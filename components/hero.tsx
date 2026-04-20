"use client"

import { useEffect, useState, useCallback } from "react"
import { Phone, ArrowRight, ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const easeLux = [0.22, 1, 0.36, 1] as const

const heroSlides = [
  { src: "/images/hero-interior.jpg", alt: "Modern PVC False Ceiling Design" },
  { src: "/images/gypsum-ceiling.jpg", alt: "Gypsum false ceiling design" },
  { src: "/images/pvc-ceiling.jpg", alt: "PVC ceiling panel installation" },
  { src: "/images/wpc-louvers.jpg", alt: "WPC louvers wall panel" },
  { src: "/images/tv-unit.jpg", alt: "Modern TV unit design" },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
}

const stats = [
  { value: "500+", label: "Projects Done" },
  { value: "8+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
]

export default function Hero() {
  const [[page, direction], setPage] = useState([0, 0])
  const index = Math.abs(page % heroSlides.length)

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }, [page])

  useEffect(() => {
    const t = setInterval(() => paginate(1), 5200)
    return () => clearInterval(t)
  }, [paginate])

  return (
    <section id="home" className="relative min-h-[100dvh] w-full overflow-hidden bg-[#f0f7ff]">
      {/* Subtle background gradients */}
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{ backgroundImage: "radial-gradient(at 0% 0%,rgba(37,99,235,0.08) 0px,transparent 55%),radial-gradient(at 100% 100%,rgba(29,78,216,0.06) 0px,transparent 55%)" }}
      />

      <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-7xl grid-cols-1 items-center gap-0 px-4 pt-20 sm:pt-24 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pt-0">

        {/* ── Left: Content ── */}
        <div className="flex flex-col justify-center py-10 lg:py-20">

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeLux }}
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 backdrop-blur-sm"
          >
            <MapPin className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">
              Forbesganj • Araria • Bihar
            </span>
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: easeLux }}
          >
            <h1 className="font-black leading-[0.9] tracking-tighter text-blue-950"
              style={{ fontSize: "clamp(3.2rem,10vw,6.5rem)" }}
            >
              JK
              <span className="ml-3 text-blue-600"
                style={{ fontSize: "clamp(1.6rem,5vw,3rem)", letterSpacing: "0.12em" }}
              >
                INTERIOR
              </span>
            </h1>
          </motion.div>

          {/* Taglines */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55, ease: easeLux }}
            className="mt-5 max-w-lg space-y-3"
          >
            <h2 className="text-xl font-black leading-snug tracking-tight text-blue-950 md:text-3xl">
              डिज़ाइन जो{" "}
              <span className="text-blue-600">दिल जीत ले</span>,{" "}
              <br className="hidden sm:block" />
              फिनिशिंग जो{" "}
              <span className="text-blue-600">सालों चले</span>।
            </h2>
            <p className="text-base font-medium italic text-gray-700 md:text-lg">
              &quot;छत आपकी,{" "}
              <span className="text-blue-600 underline decoration-blue-200 underline-offset-2">
                पहचान हमारी
              </span>
              &quot;
            </p>
            <p className="border-l-4 border-blue-500 pl-4 text-sm leading-relaxed text-gray-600">
              घर, दुकान, ऑफिस और शोरूम के लिए प्रीमियम{" "}
              <span className="font-bold text-blue-900">
                PVC, जिप्सम, WPC पैनल, UV मार्बल शीट
              </span>{" "}
              और ग्रिड सीलिंग।
              <span className="mt-1 block font-semibold text-blue-950">
                बिहार का No.1 भरोसेमंद इंटीरियर ब्रांड।
              </span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: easeLux }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button
              asChild
              size="lg"
              className="h-13 relative overflow-hidden rounded-full bg-blue-600 px-8 text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95 luxury-animated-shine"
            >
              <a href="tel:+918651070831" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                प्रीमियम कोटेशन
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-13 relative overflow-hidden rounded-full border-blue-200 px-8 hover:bg-blue-50 luxury-animated-shine luxury-animated-shine--subtle"
            >
              <Link href="#services" className="flex items-center gap-2">
                डिज़ाइन देखें <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease: easeLux }}
            className="mt-8 flex gap-6 border-t border-blue-100 pt-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-xl font-black text-blue-700 md:text-2xl">{s.value}</div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                  {s.label}
                </div>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right: Image Slider ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: easeLux }}
          className="relative w-full py-6 lg:py-12"
        >
          {/* Main card */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-blue-100 sm:aspect-[3/4] lg:aspect-[4/5]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 280, damping: 28 },
                  opacity: { duration: 0.25 },
                }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Slide label */}
            <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
              <div className="rounded-xl bg-black/30 px-3 py-2 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                  {heroSlides[index].alt}
                </p>
              </div>
              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => paginate(-1)}
                  className="rounded-full bg-white/90 p-2.5 text-blue-700 shadow-md transition-all hover:bg-white active:scale-90"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="min-w-[3rem] rounded-full bg-black/25 px-3 py-1 text-center text-xs font-bold tracking-widest text-white backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}/05
                </span>
                <button
                  onClick={() => paginate(1)}
                  className="rounded-full bg-white/90 p-2.5 text-blue-700 shadow-md transition-all hover:bg-white active:scale-90"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-4 flex justify-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > index ? 1 : -1])}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-blue-600" : "w-1.5 bg-blue-200"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

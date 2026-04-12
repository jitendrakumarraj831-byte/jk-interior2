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
  { src: "/images/gypsum-ceiling.jpg", alt: "Gypsum false ceiling design" },
  { src: "/images/pvc-ceiling.jpg", alt: "PVC ceiling panel installation" },
  { src: "/images/wpc-louvers.jpg", alt: "WPC louvers wall panel" },
  { src: "/images/tv-unit.jpg", alt: "Modern TV unit design" },
]

// Text Animation Variants
const letterContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const letterItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeLux },
  },
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
}

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
    <section id="home" className="relative min-h-[100dvh] w-full overflow-hidden pt-20 sm:pt-28 bg-[#f8faff]">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 opacity-40" style={{backgroundImage:'radial-gradient(at 0% 0%,rgba(37,99,235,0.1) 0px,transparent 50%),radial-gradient(at 100% 0%,rgba(29,78,216,0.08) 0px,transparent 50%)'}} />

      <div className="relative z-10 grid min-h-[calc(100dvh-5.5rem)] grid-cols-1 lg:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-6 py-8 lg:pl-12 lg:pr-8 xl:pl-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/50 border border-blue-100 px-4 py-2 backdrop-blur-sm"
          >
            <MapPin className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-800">
              Forbesganj • Araria • Bihar
            </span>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-6">
            <motion.div 
              variants={letterContainer} 
              initial="hidden" 
              animate="visible" 
              className="flex"
            >
              {["J", "K"].map((char) => (
                <motion.span key={char} variants={letterItem} className="font-black leading-none text-[clamp(4.5rem,15vw,8rem)] text-blue-950 tracking-tighter">
                  {char}
                </motion.span>
              ))}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-blue-600 font-black tracking-[0.15em] text-[clamp(2rem,8vw,3.5rem)] lg:[writing-mode:vertical-rl] lg:rotate-180 self-center"
            >
              INTERIOR
            </motion.h2>
          </div>

                    <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 space-y-4 max-w-lg"
          >
            {/* मुख्य हेडलाइन */}
            <h3 className="text-2xl md:text-4xl text-blue-950 font-black leading-tight tracking-tight">
              डिज़ाइन जो <span className="text-blue-600">दिल जीत ले</span>, <br /> 
              फिनिशिंग जो <span className="text-blue-600">सालों चले</span>।
            </h3>
            
            <p className="text-xl md:text-2xl text-gray-800 font-medium italic">
              &quot;छत आपकी, <span className="text-blue-600 underline decoration-blue-200">पहचान हमारी</span>&quot;
            </p>

            {/* आपके बताए अनुसार अपडेटेड सर्विस लिस्ट */}
            <p className="text-gray-600 border-l-4 border-blue-500 pl-4 py-1 leading-relaxed">
              हम आपके <span className="text-blue-900 font-bold">घर, दुकान, ऑफिस और शोरूम</span> के लिए प्रीमियम PVC, जिप्सम, WPC पैनल, UV मार्बल शीट, आर्टिफिशियल ग्रास और ग्रिड सीलिंग की बेहतरीन सर्विस देते हैं। 
              <span className="block mt-1 font-semibold text-blue-950">बिहार का No.1 भरोसेमंद इंटीरियर ब्रांड।</span>
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 transition-all active:scale-95 luxury-animated-shine overflow-hidden relative">
              <a href="tel:+918651070831" className="flex items-center gap-2">
                <Phone className="h-5 w-5" /> प्रीमियम कोटेशन
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full border-blue-200 hover:bg-blue-50 luxury-animated-shine luxury-animated-shine--subtle overflow-hidden relative">
              <Link href="#services" className="flex items-center gap-2">
                डिज़ाइन देखें <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Right Slider (Unchanged Layout) */}
        <div className="relative z-20 flex min-h-[450px] lg:min-h-0 p-4 sm:p-8">
          <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-white">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between">
              <div className="flex gap-3">
                <button 
                  onClick={() => paginate(-1)} 
                  className="p-3 rounded-full bg-white/90 text-blue-600 shadow-lg hover:bg-white active:scale-90 transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={() => paginate(1)} 
                  className="p-3 rounded-full bg-white/90 text-blue-600 shadow-lg hover:bg-white active:scale-90 transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              <div className="text-white font-bold tracking-widest bg-black/20 backdrop-blur-md px-4 py-1 rounded-full">
                0{index + 1} / 05
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

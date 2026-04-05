"use client"

import { useEffect, useRef } from "react"
import { Phone, Home, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("translate-y-0", "opacity-100")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[90vh] md:min-h-screen w-full flex items-center overflow-hidden bg-[#050505]"
    >
      {/* Background with Precise Overlay for Contrast */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg" 
          alt="JK Interior Design Forbesganj Bihar"
          fill
          className="object-cover opacity-40 md:opacity-60"
          priority
        />
        {/* विजुअल क्लैरिटी के लिए डबल ग्रेडिएंट */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent md:from-[#050505]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Main Content Container - Fixed Spacing for Mobile */}
      <div className="container relative z-10 mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl space-y-6 md:space-y-10 text-left">
          
          {/* Badge - Professional Look */}
          <div className="reveal translate-y-10 opacity-0 transition-all duration-1000 ease-out delay-100">
            <div className="inline-flex items-center gap-2 border border-amber-600/40 bg-amber-950/20 px-3 py-1.5 rounded-sm backdrop-blur-sm">
              <Home className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-amber-100">
                Forbesganj • Araria • Bihar
              </span>
            </div>
          </div>

          {/* Heading - Responsive Font Sizes */}
          <div className="reveal translate-y-10 opacity-0 transition-all duration-1000 ease-out delay-200">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg">
              Luxury <span className="text-amber-500">Interior</span> & <br className="hidden md:block" />
              False Ceiling Experts
            </h1>
          </div>

          {/* Dual Language Support - Better Line Spacing */}
          <div className="reveal translate-y-10 opacity-0 transition-all duration-1000 ease-out delay-300 space-y-5">
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
              Transforming your dream space into reality with premium PVC, Gypsum, and Modular designs.
            </p>
            <div className="max-w-xl border-l-4 border-amber-600 pl-5 py-1">
              <p className="text-sm md:text-lg text-amber-100/80 font-medium tracking-wide">
                बेहतरीन इंटीरियर और फॉल्स सीलिंग का काम—अब आपके शहर में।
              </p>
            </div>
          </div>

          {/* CTA Buttons - Stacking on small screens, Side-by-side on larger */}
          <div className="reveal translate-y-10 opacity-0 transition-all duration-1000 ease-out delay-500 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-none px-10 py-7 h-auto text-sm md:text-base font-bold uppercase tracking-widest shadow-[0_10px_20px_-10px_rgba(217,119,6,0.5)] transition-all active:scale-95"
            >
              <a href="tel:+918651070831" className="flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 animate-pulse" />
                Call Now / अभी कॉल करें
              </a>
            </Button>

            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white/30 bg-transparent text-white hover:bg-white hover:text-black rounded-none px-10 py-7 h-auto text-sm md:text-base font-bold uppercase tracking-widest transition-all active:scale-95"
            >
              <Link href="#contact" className="flex items-center justify-center">
                Get a Quote / संपर्क करें
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium hidden md:block">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

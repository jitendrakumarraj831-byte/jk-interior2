"use client"

import { useEffect, useRef } from "react"
import { Phone, ArrowRight, Star, MapPin, CheckCircle } from "lucide-react"
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
            entry.target.classList.add("reveal-visible")
          }
        });
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal-effect")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="JK Interior - Best False Ceiling and Interior Designer in Forbesganj, Araria, Bihar"
      className="relative min-h-[95vh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* 1. Background (SEO Optimized & Visual) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg" 
          alt="Modern PVC False Ceiling and Gypsum Design by JK Interior Forbesganj Araria Bihar"
          fill
          className="object-cover opacity-50 scale-105 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-20">
        
        {/* 2. Left Side: SEO Content & Actions */}
        <div className="space-y-8">
          <div className="reveal-effect opacity-0 translate-y-10 transition-all duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
                 Forbesganj • Araria • Jogbani
              </span>
            </div>
          </div>

          {/* Main H1 for SEO (Crucial) */}
          <h1 className="reveal-effect opacity-0 translate-y-10 transition-all duration-700 delay-200 text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1]">
            JK Interior <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
              False Ceiling
            </span> <br />
            <span className="text-3xl md:text-5xl font-light text-gray-300">Expert Solutions</span>
          </h1>

          <div className="reveal-effect opacity-0 translate-y-10 transition-all duration-700 delay-300 space-y-5 max-w-xl">
            <p className="text-lg md:text-xl text-amber-100 font-medium border-l-4 border-amber-500 pl-4">
              PVC, Gypsum, WPC Fluted, Wall Panels & UV Marble Sheets.
            </p>
            
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              अगर आप **Bihar** में सबसे बेहतरीन **Interior contractor** ढूंढ रहे हैं, तो **JK Interior** आपके सपनों के घर को प्रीमियम और मज़बूत डिज़ाइन देता है।
            </p>
          </div>

          {/* Action Buttons with Shine Effect */}
          <div className="reveal-effect opacity-0 translate-y-10 transition-all duration-700 delay-500 flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="h-16 px-10 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg rounded-xl shadow-2xl transition-all hover:scale-105 group relative overflow-hidden">
              <a href="tel:+918651070831" className="flex items-center gap-3">
                <Phone className="h-5 w-5 fill-white" />
                रेट जानें / Get Quote
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="h-16 px-10 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white rounded-xl">
              <Link href="#services" className="flex items-center gap-2 text-lg">
                Services <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

      {/* 3. Right Side: Floating Visual Proof */}
<div className="reveal-effect opacity-0 scale-90 transition-all duration-1000 delay-700 relative">
  <div className="relative z-10 rounded-3xl overflow-hidden border border-border shadow-2xl shadow-black/20">
    <Image
      src="/images/hero-interior.jpg"
      width={600}
      height={750}
      alt="Luxury Gypsum Ceiling Work by JK Interior Bihar"
      className="object-cover w-full h-auto"
      priority
    />
  </div>

  {/* Experience Badge - अब मोबाइल पर भी दिखेगा */}
  <div className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:-left-8 z-20 bg-card/80 backdrop-blur-xl border border-gold/40 p-4 lg:p-6 rounded-2xl shadow-gold/10 flex items-center gap-3 lg:gap-4 animate-soft-glow">
     <div className="bg-gold/20 p-2 lg:p-3 rounded-xl">
        <Star className="text-gold fill-gold w-5 h-5 lg:w-7 lg:h-7" />
     </div>
     <div>
        <p className="text-foreground font-black text-xl lg:text-2xl leading-none">5+ Years</p>
        <p className="text-gold/70 text-[10px] lg:text-xs font-bold uppercase mt-1 tracking-wider">Experience</p>
     </div>
  </div>
</div>

{/* 4. SEO Hidden Keywords */}
<div className="sr-only">
  Best interior designer in Forbesganj, Araria, Bihar. JK Interior provides PVC wall panels,
  Gypsum false ceiling, and home renovation services in Narpatganj and Jogbani.
</div>  

      {/* 5. Custom Styles (Missing Logic Recovered) */}
      <style jsx>{`
        .reveal-visible {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.12); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite ease-in-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </section>
  )
}

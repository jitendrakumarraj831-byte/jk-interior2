"use client"

import { useEffect, useRef } from "react"
import { Phone, ArrowRight, Star, MapPin, CheckCircle2 } from "lucide-react"
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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Background with Slow Zoom Animation */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg" 
          alt="Modern PVC False Ceiling and Gypsum Design by JK Interior Forbesganj Araria Bihar"
          fill
          className="object-cover opacity-30 scale-105 animate-slow-zoom"
          priority
        />
        {/* Premium Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(184,134,11,0.15),transparent_50%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-24">
        
        {/* Left Content Area */}
        <div className="space-y-10">
          <div className="reveal-effect opacity-0 -translate-x-10 transition-all duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 backdrop-blur-xl">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
                 Forbesganj • Araria • Jogbani
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="reveal-effect opacity-0 translate-y-10 transition-all duration-700 delay-200 text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight">
              JK Interior <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold-hover">
                Luxury Spaces
              </span>
            </h1>
            
            <div className="reveal-effect opacity-0 translate-y-10 transition-all duration-700 delay-300 space-y-4 max-w-xl">
              <p className="text-lg md:text-2xl text-amber-100/90 font-medium border-l-4 border-gold pl-5 italic">
                Specialist in PVC, Gypsum, WPC Fluted & UV Marble Sheets.
              </p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                अगर आप बिहार में सबसे बेहतरीन **False Ceiling contractor** ढूंढ रहे हैं, तो **JK Interior** प्रीमियम और मज़बूत काम की गारंटी देता है।
              </p>
            </div>
          </div>

          {/* Feature Tags */}
          <div className="reveal-effect opacity-0 translate-y-5 transition-all duration-700 delay-400 flex flex-wrap gap-x-6 gap-y-3">
             {['Premium Quality', 'Best Rates', 'Fast Delivery'].map((item) => (
               <div key={item} className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                 <CheckCircle2 className="w-4 h-4 text-gold" />
                 {item}
               </div>
             ))}
          </div>

          {/* Interactive Buttons */}
          <div className="reveal-effect opacity-0 translate-y-10 transition-all duration-700 delay-500 flex flex-wrap gap-5 pt-4">
            <Button asChild size="lg" className="h-16 px-10 bg-gold hover:bg-gold-hover text-black font-black text-lg rounded-full shadow-[0_15px_40px_-10px_rgba(184,134,11,0.4)] transition-all hover:-translate-y-1 group relative overflow-hidden">
              <a href="tel:+918651070831" className="flex items-center gap-3">
                <Phone className="h-5 w-5 fill-black" />
                Get Free Quote
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="h-16 px-10 border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white rounded-full group">
              <Link href="#services" className="flex items-center gap-2 text-lg font-semibold">
                View Services <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Content Area (Image Frame) */}
        <div className="reveal-effect opacity-0 scale-95 transition-all duration-1000 delay-700 hidden lg:block relative group">
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 group-hover:rotate-0 rotate-2">
            <Image 
              src="/images/hero-interior.jpg" 
              width={650} 
              height={800} 
              alt="Luxury Gypsum Ceiling Work by JK Interior Bihar"
              className="object-cover aspect-[4/5] scale-110 group-hover:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-10 -left-10 z-20 bg-[#111]/80 backdrop-blur-2xl border border-gold/30 p-7 rounded-3xl shadow-2xl animate-bounce-slow">
             <div className="flex items-center gap-5">
               <div className="bg-gold p-4 rounded-2xl shadow-lg shadow-gold/20">
                  <Star className="text-black fill-black w-7 h-7" />
               </div>
               <div>
                  <p className="text-white font-black text-3xl leading-none">5+ Years</p>
                  <p className="text-gold-light/70 text-[10px] font-bold uppercase tracking-widest mt-2">Expert Craftsmanship</p>
               </div>
             </div>
          </div>
          
          {/* Decorative Glow */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold/10 blur-[100px] rounded-full" />
        </div>
      </div>

      <style jsx>{`
        .reveal-visible {
          opacity: 1 !important;
          transform: translate(0) scale(1) !important;
        }
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 25s infinite ease-in-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </section>
  )
}

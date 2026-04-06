"use client"

import { useEffect, useRef } from "react"
import { Phone, ArrowRight, Star, MapPin } from "lucide-react"
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
      className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background with SEO Optimized Alt Text */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg" 
          alt="Modern PVC False Ceiling and Gypsum Design by JK Interior Forbesganj Araria Bihar"
          fill
          className="object-cover opacity-40 scale-105 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-20">
        
        {/* Left Side: SEO Heavy Content */}
        <div className="space-y-8">
          <div className="reveal-effect opacity-0 translate-y-10 transition-all duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-amber-200">
                 Forbesganj,Dumariya,Araria, Bihar
              </span>
            </div>
          </div>

          {/* Main H1 for SEO Ranking */}
          <h1 className="reveal-effect opacity-0 translate-y-10 transition-all duration-700 delay-200 text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
            JK Interior – <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
              Modern False Ceiling
            </span> <br />
            <span className="text-3xl md:text-5xl font-light text-gray-300">& Interior Solutions</span>
          </h1>

          <div className="reveal-effect opacity-0 translate-y-10 transition-all duration-700 delay-300 space-y-5 max-w-xl">
            <p className="text-lg md:text-xl text-amber-100 font-medium border-l-4 border-amber-500 pl-4">
              Specialist in, PVC, Gypsum ,False Ceiling, WPC, Fluted,Wall Panels, & UV Marble Sheets.
            </p>
            
            {/* Hindi Keywords for Local Search */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              अगर आप **Forbesganj, Araria या Jogbani** में सबसे बेहतरीन **False Ceiling contractor** ढूंढ रहे हैं, तो **JK Interior** आपकी पहली पसंद है। हम देते हैं मज़बूत और प्रीमियम इंटीरियर वर्क।
            </p>
          </div>

          {/* Action Buttons */}
          <div className="reveal-effect opacity-0 translate-y-10 transition-all duration-700 delay-500 flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="h-14 px-8 bg-gradient-to-r from-amber-500 to-amber-700 hover:opacity-90 text-white border-none shadow-xl transition-transform hover:scale-105">
              <a href="tel:+918651070831" className="flex items-center gap-3 text-lg font-bold">
                <Phone className="h-5 w-5" />
                Get Free Quote / रेट जानें
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="h-14 px-8 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white">
              <Link href="#services" className="flex items-center gap-2 text-lg">
                Our Services <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Side: Visual Proof */}
        <div className="reveal-effect opacity-0 scale-90 transition-all duration-1000 delay-700 hidden lg:block relative">
          <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image 
              src="/images/hero-interior.jpg" 
              width={600} 
              height={700} 
              alt="Luxury Gypsum Ceiling Work by JK Interior Bihar"
              className="object-cover"
            />
          </div>
          
          {/* Experience Badge */}
          <div className="absolute -bottom-6 -left-6 z-20 bg-[#1a1a1a] border border-amber-500/50 p-5 rounded-xl shadow-2xl flex items-center gap-4 animate-bounce-slow">
             <div className="bg-amber-500/20 p-2 rounded-full border border-amber-500/50">
                <Star className="text-amber-500 fill-amber-500 w-6 h-6" />
             </div>
             <div>
                <p className="text-white font-bold text-lg leading-none">5+ Years</p>
                <p className="text-amber-200/70 text-xs mt-1">Professional Experience</p>
             </div>
          </div>
        </div>
      </div>

      {/* Hidden SEO Text for Search Engines */}
      <div className="sr-only">
        Best interior designer in Forbesganj, Araria, Bihar. JK Interior provides PVC wall panels, 
        Gypsum false ceiling, grid ceiling, and home renovation services in Narpatganj and Jogbani.
      </div>

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
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </section>
  )
      }
              

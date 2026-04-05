"use client"

import { useEffect, useRef } from "react"
import { Phone, Cpu, Zap, Box, ArrowDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0c] font-sans"
    >
      {/* 1. Animated Grid Background (Jarvis Style) */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>
      
      {/* 2. Cyber-Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full z-0"></div>

      {/* 3. Hero Image with Glass Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="JK Interior Cyberpunk Design"
          fill
          className="object-cover opacity-40 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-transparent to-[#0a0a0c]"></div>
      </div>

      <div className="container relative z-20 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-[0.2em] animate-pulse">
            <Cpu className="h-4 w-4" /> System Online: JK Interior v2.0
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            NEXT-GEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              INTERIORS
            </span>
          </h1>

          <p className="max-w-lg text-gray-400 font-mono text-sm md:text-base leading-relaxed mx-auto lg:mx-0">
            // LOCATION: Forbesganj, Bihar <br />
            // SPECIALIZATION: Gypsum, PVC & WPC Technology <br />
            हम आपके घर को सिर्फ सजाते नहीं, उसे एक मॉडर्न डिजिटल लुक देते हैं। सस्ते दाम में बेहतरीन फिनिशिंग।
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-5">
            {/* Main Cyber Button */}
            <Button asChild size="lg" className="relative h-14 px-8 bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest clip-path-polygon">
              <a href="tel:+918651070831" className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                Initiate Call
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="h-14 px-8 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 font-mono uppercase">
              <Link href="#services">View Database</Link>
            </Button>
          </div>
        </div>

        {/* Right Feature Cards (Floating Jarvis UI) */}
        <div className="hidden lg:grid grid-cols-2 gap-4 relative">
          <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group">
            <Zap className="text-cyan-400 mb-3 group-hover:scale-125 transition-transform" />
            <h3 className="text-white font-bold mb-1">Fast Install</h3>
            <p className="text-gray-500 text-xs">Quick execution by experts.</p>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg mt-8 hover:border-blue-500/50 transition-all group">
            <Box className="text-blue-400 mb-3 group-hover:scale-125 transition-transform" />
            <h3 className="text-white font-bold mb-1">Premium Build</h3>
            <p className="text-gray-500 text-xs">High-grade WPC & PVC.</p>
          </div>
          {/* Glass Card for Trust */}
          <div className="col-span-2 p-4 bg-gradient-to-r from-cyan-500/20 to-transparent border border-cyan-500/30 rounded-lg flex items-center justify-between">
             <div className="font-mono">
                <p className="text-[10px] text-cyan-400 uppercase">Current Experience</p>
                <p className="text-2xl font-bold text-white">05+ YEARS</p>
             </div>
             <div className="h-10 w-10 bg-cyan-500/20 rounded-full flex items-center justify-center animate-ping">
                <div className="h-3 w-3 bg-cyan-500 rounded-full"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Scroll Pointer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-[1px] h-20 bg-gradient-to-b from-cyan-500 to-transparent animate-bounce"></div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { Phone, ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion" // framer-motion install कर लें: npm install framer-motion

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* 1. Cinematic Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="JK Interior Luxury Design"
          fill
          className="object-cover opacity-60 scale-105 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      {/* 2. Decorative Light Streaks */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-amber-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center pt-20">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/90">
              #1 Interior Expert in Bihar
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1]">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
              Lifestyle Space
            </span>
          </h1>

          <div className="space-y-4 max-w-xl">
            <p className="text-xl md:text-2xl text-gray-200 font-light border-l-4 border-primary pl-4">
              Premium PVC, Gypsum Ceiling & Modern Decor.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              हम आपके सपनों के घर को हकीकत में बदलते हैं। Forbesganj और Araria में सबसे भरोसेमंद इंटीरियर डिज़ाइन सेवा।
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="h-14 px-8 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white border-none shadow-[0_10px_20px_-10px_rgba(245,158,11,0.5)] transition-all hover:scale-105">
              <a href="tel:+918651070831" className="flex items-center gap-3 text-lg font-bold">
                <Phone className="h-5 w-5" />
                कॉल करें / Call Now
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="h-14 px-8 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white transition-all">
              <Link href="#contact" className="flex items-center gap-2 text-lg">
                View Gallery <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
            <div>
              <p className="text-2xl font-bold text-white">500+</p>
              <p className="text-sm text-gray-500 uppercase tracking-tighter">Projects Done</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-sm text-gray-500 uppercase tracking-tighter">Quality</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">10+</p>
              <p className="text-sm text-gray-500 uppercase tracking-tighter">Years Exp.</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Visual Showcase (Floating Cards) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <Image 
              src="/images/ceiling-work.jpg" 
              width={600} 
              height={700} 
              alt="JK Interior Project"
              className="object-cover"
            />
          </div>
          {/* Floating badge over image */}
          <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-xl shadow-2xl flex items-center gap-4 animate-bounce-slow">
             <div className="bg-amber-100 p-3 rounded-full">
                <Star className="text-amber-600 fill-amber-600 w-6 h-6" />
             </div>
             <div>
                <p className="text-black font-bold text-lg">Best Quality</p>
                <p className="text-gray-500 text-sm">Guaranteed Work</p>
             </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white">Discover More</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent" />
      </div>

      <style jsx global>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1.05); }
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

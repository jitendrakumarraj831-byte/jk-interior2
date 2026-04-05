"use client"

import { useEffect, useRef } from "react"
import { Phone, ArrowRight, Home, ChevronDown } from "lucide-react"
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
      className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Background Image with Smooth Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="Modern Interior Design Bihar"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* विजुअल क्लैरिटी के लिए ग्रेडिएंट */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-4xl space-y-8">
          
          {/* Tagline / Location Badge */}
          <div className="reveal translate-y-10 opacity-0 transition-all duration-700 ease-out delay-100">
            <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-4 py-2 rounded-sm">
              <Home className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
                Forbesganj • Araria • Bihar
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="reveal translate-y-10 opacity-0 transition-all duration-700 ease-out delay-200">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Luxury <span className="text-amber-500">Interior</span> & <br />
              False Ceiling Experts
            </h1>
          </div>

          {/* Subtext - Mixed English & Hindi */}
          <div className="reveal translate-y-10 opacity-0 transition-all duration-700 ease-out delay-300 space-y-4">
            <p className="max-w-2xl text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
              Transforming your dream space into reality with premium PVC, Gypsum, and Modular designs. 
            </p>
            <p className="max-w-2xl text-base md:text-lg text-amber-100/80 italic border-l-2 border-amber-500 pl-4">
              बेहतरीन इंटीरियर और फॉल्स सीलिंग का काम—अब आपके अपने शहर में।
            </p>
          </div>

          {/* Action Buttons */}
          <div className="reveal translate-y-10 opacity-0 transition-all duration-700 ease-out delay-500 flex flex-wrap gap-4 pt-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-none px-8 py-7 text-md uppercase tracking-wider transition-all"
            >
              <a href="tel:+918651070831" className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                Call Now / कॉल करें
              </a>
            </Button>

            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white/20 bg-transparent text-white hover:bg-white hover:text-black rounded-none px-8 py-7 text-md uppercase tracking-wider transition-all"
            >
              <Link href="#contact">
                Contact Us / संपर्क करें
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Line & Scroll Indicator */}
      <div className="absolute bottom-0 right-0 p-8 hidden lg:block">
        <div className="flex items-center gap-4 rotate-90 origin-right translate-y-[-100px]">
          <span className="text-neutral-500 uppercase tracking-widest text-xs">Scroll to Explore</span>
          <div className="w-20 h-[1px] bg-amber-500" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  )
}

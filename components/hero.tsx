"use client"

import { useEffect, useRef } from "react"
import { Phone, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
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
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="Luxury Interior Design Bihar"
          fill
          className="object-cover scale-105 animate-slow-zoom"
          priority
        />
        {/* Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      {/* Animated Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          
          {/* Badge */}
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-100 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs md:text-sm font-medium tracking-wider uppercase text-primary-foreground/90">
                Premium Interior Solutions in Bihar
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-300">
            <span className="block text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-[1.1]">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-primary bg-300% animate-gradient">Lifestyle</span>
            </span>
            <span className="block mt-2 text-2xl md:text-4xl lg:text-5xl font-light text-gray-300 italic font-serif">
              With JK Interior & False Ceiling
            </span>
          </h1>

          {/* Dual Language Description */}
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-500 mt-8 grid md:grid-cols-2 gap-6 border-l-2 border-primary/50 pl-6">
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              Transforming spaces into masterpieces with bespoke PVC, Gypsum, and modern interior craftmanship.
            </p>
            <p className="text-gray-400 text-base leading-relaxed hindi-font">
              हम आपके घर और ऑफिस को देते हैं एक लग्जरी लुक। बेहतरीन फॉल्स सीलिंग और मॉडर्न डिजाइन अब आपके शहर Forbesganj और Araria में।
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-700 mt-10 flex flex-wrap gap-5">
            <Button 
              asChild 
              size="lg" 
              className="group relative bg-primary hover:bg-primary/90 text-white px-8 h-14 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <a href="tel:+918651070831" className="flex items-center gap-3">
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="font-semibold tracking-wide">Book Consultation</span>
              </a>
            </Button>

            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="group border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white px-8 h-14 rounded-full transition-all duration-300"
            >
              <a href="#contact" className="flex items-center gap-2">
                View Gallery
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Floating Stats or Info */}
      <div className="absolute bottom-10 right-10 hidden lg:block reveal opacity-0 transition-all duration-1000 delay-1000">
        <div className="flex flex-col items-end border-r-4 border-primary pr-4">
          <span className="text-3xl font-bold text-white">100+</span>
          <span className="text-sm text-gray-400 uppercase tracking-[0.2em]">Projects Done</span>
        </div>
      </div>

      {/* Elegant Scroll Down */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { Phone, ArrowRight, ShieldCheck, Star, Users } from "lucide-react"
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
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Background with subtle animation */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="Luxury Interior Design Forbesganj"
          fill
          className="object-cover opacity-60 scale-110 animate-pulse-slow"
          priority
        />
        {/* Cyberpunk Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Floating UI Elements (Jarvis Style) */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
        <div className="absolute top-1/4 right-20 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 animate-bounce-slow">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <ShieldCheck />
              </div>
              <div>
                <p className="text-xs text-gray-400">Quality Assured</p>
                <p className="text-sm font-bold text-white">100% Genuine Material</p>
              </div>
           </div>
        </div>
        
        <div className="absolute bottom-1/3 left-10 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 animate-float-delayed">
           <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="h-8 w-8 rounded-full border-2 border-black bg-gray-600" />)}
              </div>
              <div>
                <p className="text-xs text-gray-400">Trusted by</p>
                <p className="text-sm font-bold text-white">500+ Happy Clients</p>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container relative z-20 mx-auto px-4 pt-20">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          
          {/* Badge */}
          <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary animate-fade-in translate-y-8 opacity-0 transition-all duration-700">
            <Star className="h-3 w-3 fill-primary" /> 
            Bihar's No. 1 Interior & Ceiling Contractor
          </div>

          {/* Main Headline */}
          <h1 className="reveal mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-8xl translate-y-8 opacity-0 transition-all duration-700 delay-200">
            Design Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-blue-500">Dream Space</span>
          </h1>

          {/* Dual Language Description */}
          <div className="reveal mb-10 max-w-2xl space-y-4 translate-y-8 opacity-0 transition-all duration-700 delay-300">
            <p className="text-lg md:text-xl text-gray-300 font-light">
              Expert False Ceiling & Interior solutions in <span className="text-white font-bold">Forbesganj, Araria & Jogbani.</span> 
            </p>
            <p className="text-base md:text-lg text-primary font-hindi italic">
              "किफायती दामों में लग्जरी घर का सपना, अब होगा पूरा।"
            </p>
          </div>

          {/* Dynamic Buttons */}
          <div className="reveal flex flex-wrap justify-center lg:justify-start gap-4 translate-y-8 opacity-0 transition-all duration-700 delay-500">
            <Button asChild size="lg" className="group h-16 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-black rounded-full shadow-[0_0_30px_rgba(var(--primary),0.4)]">
              <a href="tel:+918651070831" className="flex items-center gap-2">
                <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                अभी कॉल करें
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="h-16 px-8 text-lg font-semibold border-white/20 hover:bg-white/5 rounded-full backdrop-blur-sm">
              <Link href="#services" className="flex items-center gap-2">
                Our Work / हमारी सेवाएं <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="reveal mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8 w-full translate-y-8 opacity-0 transition-all duration-700 delay-700">
            {[
              { label: "Experience", val: "5+ Years" },
              { label: "Projects", val: "200+" },
              { label: "Locality", val: "Araria Dist." },
              { label: "Warranty", val: "10 Years" },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1 font-mono">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.val}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-50">
        <div className="h-12 w-6 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="h-2 w-1 bg-primary rounded-full animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}

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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background"
    >
      {/* --- नया डिजाइन एलीमेंट्स --- */}
      
      {/* 1. मेश एनीमेशन लेयर (आपकी CSS से) */}
      <div className="absolute inset-0 z-0 animate-mesh opacity-60" />

      {/* 2. फ्लोटिंग ब्लॉब्स (प्रीमियम लुक के लिए) */}
      <div className="floating-blob absolute top-[10%] left-[-5%] w-72 h-72 bg-gold/10 rounded-full blur-[100px] z-0" />
      <div className="floating-blob absolute bottom-[10%] right-[-5%] w-96 h-96 bg-gold/5 rounded-full blur-[120px] z-0" />

      {/* 3. इमेज बैकग्राउंड को थोड़ा डार्क और ब्लर किया गया है ताकि मेश दिखे */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="Modern PVC False Ceiling Design"
          fill
          className="object-cover opacity-20 scale-105 animate-slow-zoom grayscale-[50%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-24">

        {/* --- लेफ्ट साइड --- */}
        <div className="space-y-10">
          <div className="reveal-effect opacity-0 translate-y-10 transition-all duration-700">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-xl animate-soft-glow">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-gold">
                 Forbesganj • Araria • Bihar
              </span>
            </div>
          </div>

          <h1 className="reveal-effect opacity-0 translate-y-10 transition-all duration-700 delay-200 text-6xl md:text-8xl lg:text-9xl font-black text-foreground leading-[0.9] tracking-tighter">
            JK <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-hover drop-shadow-sm">
              INTERIOR
            </span>
          </h1>

          <div className="reveal-effect opacity-0 translate-y-10 transition-all duration-700 delay-300 space-y-6 max-w-xl">
            <p className="text-xl md:text-2xl text-foreground font-light tracking-wide italic">
              "छत आपकी, <span className="text-gold font-bold">पहचान हमारी</span>"
            </p>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed border-l-2 border-gold/30 pl-6">
               हम सिर्फ छत नहीं, <span className="text-foreground font-medium">प्रीमियम लाइफस्टाइल</span> बनाते हैं। PVC पैनलिंग और Gypsum डिजाइन में बिहार का नंबर 1 भरोसा।
            </p>
          </div>

          {/* एक्शन बटन्स - अब और भी प्रीमियम */}
          <div className="reveal-effect opacity-0 translate-y-10 transition-all duration-700 delay-500 flex flex-wrap gap-5 pt-4">
            <Button asChild size="lg" className="h-16 px-10 bg-gold hover:bg-gold-hover text-background font-black text-lg rounded-2xl shadow-[0_20px_50px_rgba(212,175,55,0.3)] transition-all hover:scale-105 group relative overflow-hidden border-none">
              <a href="tel:+918651070831" className="flex items-center gap-3">
                <Phone className="h-6 w-6 fill-background" />
                प्रीमियम कोटेशन
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="h-16 px-10 border-gold/20 bg-gold/5 backdrop-blur-md hover:bg-gold/10 hover:border-gold/50 text-gold rounded-2xl transition-all">
              <Link href="#services" className="flex items-center gap-2 text-lg font-bold">
                डिज़ाइन देखें <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* --- राइट साइड (विजुअल प्रूफ) --- */}
        <div className="reveal-effect opacity-0 scale-95 transition-all duration-1000 delay-700 relative group">
          {/* ग्लो इफेक्ट पीछे */}
          <div className="absolute -inset-4 bg-gold/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10 rounded-[30px] overflow-hidden border border-gold/20 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
            <Image
              src="/images/hero-interior.jpg"
              width={600}
              height={750}
              alt="Premium Interior Work"
              className="object-cover w-full h-auto"
              priority
            />
            {/* इमेज के ऊपर हल्का डार्क ग्रेडिएंट */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
          </div>

          {/* एक्सपीरियंस बैज - मॉडर्न स्टाइल */}
          <div className="absolute -bottom-6 -left-6 z-20 bg-background/80 backdrop-blur-2xl border border-gold/30 p-5 rounded-[24px] shadow-2xl flex items-center gap-4 animate-soft-glow">
             <div className="bg-gold p-3 rounded-2xl shadow-lg shadow-gold/30">
                <Star className="text-background fill-background w-6 h-6" />
             </div>
             <div>
                <p className="text-foreground font-black text-2xl leading-none">5+ Years</p>
                <p className="text-gold text-[10px] font-bold uppercase mt-1 tracking-[0.2em]">Experience</p>
             </div>
          </div>
        </div>
      </div>

      <style jsx>{`
       .reveal-visible {
          opacity: 1!important;
          transform: translateY(0) scale(1)!important;
        }
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.15); }
        }
       .animate-slow-zoom {
          animation: slow-zoom 20s infinite ease-in-out;
        }
      `}</style>
    </section>
  )
}

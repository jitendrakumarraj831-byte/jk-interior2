"use client"

import { useEffect, useRef } from "react"
import { Phone, ArrowDown } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
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
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="Modern luxury interior design by JK Interior"
          fill
          className="object-cover"
          priority
        />
        {/* ✅ Strong Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-32 text-center">
        
        {/* Tag */}
        <div className="reveal mb-6 opacity-0" style={{ animationDelay: "0.1s" }}>
          <span className="inline-block rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1.5 text-xs uppercase tracking-widest text-yellow-400 font-mono">
            Premium Interior Solutions
          </span>
        </div>

        {/* ✅ H1 (SEO FIX) */}
        <h1 className="reveal mb-6 max-w-4xl text-4xl font-bold leading-tight text-white opacity-0 md:text-6xl lg:text-7xl font-sans" style={{ animationDelay: "0.3s" }}>
          Premium False Ceiling Designer in Forbesganj
        </h1>

        {/* Subheading */}
        <p className="reveal mb-4 max-w-2xl text-base leading-relaxed text-gray-200 opacity-0 md:text-lg font-mono" style={{ animationDelay: "0.5s" }}>
          Modern | LED | PVC | Gypsum Ceiling Work
        </p>

        {/* Trust */}
        <p className="reveal mb-3 text-yellow-400 font-semibold opacity-0" style={{ animationDelay: "0.6s" }}>
          ⭐ 100+ Projects Completed | 5+ Years Experience
        </p>

        {/* Hindi */}
        <p className="reveal mb-8 max-w-2xl text-sm leading-relaxed text-gray-300 opacity-0 md:text-base font-mono">
          हम आधुनिक इंटीरियर डिजाइन और सीलिंग वर्क की सेवाएं प्रदान करते हैं जिससे आपका घर या ऑफिस सुंदर, स्टाइलिश और आकर्षक बनता है।
        </p>

        {/* Buttons */}
        <div className="reveal flex flex-col items-center gap-4 opacity-0 sm:flex-row" style={{ animationDelay: "0.8s" }}>
          
          {/* Call */}
          <a
            href="tel:+918651070831"
            className="bg-yellow-500 text-black flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-semibold shadow-lg hover:scale-105 transition"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>

          {/* WhatsApp 🔥 */}
          <a
            href="https://wa.me/918651070831?text=Hi%20JK%20Interior,%20mujhe%20false%20ceiling%20design%20ke%20liye%20info%20chahiye"
            target="_blank"
            className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-semibold shadow-lg hover:scale-105 transition"
          >
            💬 WhatsApp
          </a>

          {/* Contact */}
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-lg border-2 border-white/40 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Contact Us
          </a>

        </div>

        {/* Scroll indicator */}
        <a href="#services" className="absolute bottom-10 flex flex-col items-center gap-2 text-gray-300 hover:text-white transition">
          <span className="text-xs uppercase tracking-widest font-mono">Explore</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>

      </div>
    </section>
  )
}

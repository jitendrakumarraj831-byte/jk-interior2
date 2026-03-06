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
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-32 text-center">
        <div className="reveal mb-6 opacity-0" style={{ animationDelay: "0.1s" }}>
          <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-mono">
            Premium Interior Solutions
          </span>
        </div>

        <h2 className="reveal mb-6 max-w-4xl text-4xl font-bold leading-tight text-foreground opacity-0 md:text-6xl lg:text-7xl font-sans" style={{ animationDelay: "0.3s" }}>
          {'JK Interior – '}
          <span className="gold-text">{'Modern Interior'}</span>
          {' & Ceiling Work'}
        </h2>

        <p className="reveal mb-4 max-w-2xl text-base leading-relaxed text-foreground/80 opacity-0 md:text-lg font-mono" style={{ animationDelay: "0.5s" }}>
          We provide modern interior design and ceiling solutions that make your
          home and office beautiful, stylish and functional.
        </p>

        <p className="reveal mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground opacity-0 md:text-base font-mono" style={{ animationDelay: "0.6s" }}>
          हम आधुनिक इंटीरियर डिजाइन और सीलिंग वर्क की सेवाएं प्रदान करते हैं
          जिससे आपका घर या ऑफिस सुंदर, स्टाइलिश और आकर्षक बनता है।
        </p>

        <div className="reveal flex flex-col items-center gap-4 opacity-0 sm:flex-row" style={{ animationDelay: "0.8s" }}>
          <a
            href="tel:+918651070831"
            className="gold-gradient flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:opacity-90 font-mono"
          >
            <Phone className="h-4 w-4" />
            Call Now / अभी कॉल करें
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-lg border-2 border-primary/50 bg-card/80 px-8 py-4 text-sm font-semibold text-primary shadow-md transition-all hover:bg-primary/10 font-mono"
          >
            Contact Us / संपर्क करें
          </a>
        </div>

        {/* Scroll indicator */}
        <a href="#services" className="absolute bottom-10 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
          <span className="text-xs uppercase tracking-widest font-mono">Explore</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  )
}

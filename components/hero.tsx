"use client"

import { useEffect, useRef } from "react"
import { Phone, ArrowDown } from "lucide-react"
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
      aria-label="JK Interior Hero Section - Modern Interior & Ceiling Work in Bihar"
      className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="Modern interior design and false ceiling work by JK Interior in Bihar - luxury home and office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
      </div>

      {/* Decorative Elements (from hero.tax design) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-primary/5" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex h-full min-h-[600px] lg:min-h-[700px] items-center px-4 py-32">
        <div className="max-w-3xl space-y-6">
          {/* Tagline */}
          <div
            className="reveal translate-y-8 opacity-0 transition-all duration-700 delay-100"
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary font-mono">
              Interior Work in Forbesganj, Araria & Bihar
            </span>
          </div>

          {/* Main Heading (H1 for SEO) */}
          <h1
            className="reveal font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl translate-y-8 opacity-0 transition-all duration-700 delay-200"
          >
            <span className="text-balance">
              JK Interior – <span className="gold-text">Modern Interior</span> & False Ceiling Work
            </span>
          </h1>

          {/* Subtitle English */}
          <p
            className="reveal font-serif text-xl text-primary md:text-2xl lg:text-3xl translate-y-8 opacity-0 transition-all duration-700 delay-300"
          >
            Premium interior design, PVC ceiling, gypsum ceiling & home makeover solutions.
          </p>

          {/* Description English */}
          <p
            className="reveal max-w-xl text-base text-muted-foreground md:text-lg font-mono translate-y-8 opacity-0 transition-all duration-700 delay-400"
          >
            We provide modern interior design and ceiling solutions that make your
            home and office beautiful, stylish and functional.
          </p>

          {/* Description Hindi (SEO + Local) */}
          <p
            className="reveal max-w-xl text-sm text-muted-foreground md:text-base font-mono translate-y-8 opacity-0 transition-all duration-700 delay-500"
          >
            हम आधुनिक इंटीरियर डिजाइन, फॉल्स सीलिंग (PVC, Gypsum, Grid) और ऑफिस/होम डेकोर की सेवाएं देते हैं — Forbesganj, Araria और पूरे Bihar में।
          </p>

          {/* CTA Buttons */}
          <div
            className="reveal flex flex-wrap items-center gap-4 pt-4 translate-y-8 opacity-0 transition-all duration-700 delay-700"
          >
            <Button asChild size="lg" className="gold-gradient text-primary-foreground hover:opacity-90 shadow-lg">
              <a href="tel:+918651070831" className="flex items-center gap-2 font-mono">
                <Phone className="h-4 w-4" />
                Call Now / अभी कॉल करें
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/50 bg-card/80 text-primary hover:bg-primary/10">
              <Link href="#contact" className="font-mono">
                Contact Us / संपर्क करें
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#services" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
        <span className="text-xs uppercase tracking-widest font-mono">Explore Services</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}

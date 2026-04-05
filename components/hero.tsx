"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Phone } from "lucide-react"
import Head from "next/head"

const slides = [
  {
    title: "False Ceiling Experts in Forbesganj",
    subtitle: "Gypsum Ceiling • PVC Ceiling • Grid Ceiling Work",
    description: "JK Interior Forbesganj me best false ceiling contractor hai. Hum Gypsum false ceiling, PVC ceiling aur Grid ceiling design karte hain ghar, office aur shop ke liye. 5+ saal ka experience aur 100+ projects complete.",
    cta: "Call Now",
  },
  {
    title: "Modern LED Ceiling Design in Araria",
    subtitle: "Cove Lighting • Profile Lights • Designer Ceiling",
    description: "LED false ceiling design se apne interior ko banayein modern aur stylish. Forbesganj aur Araria me LED profile light, cove lighting aur designer ceiling ke specialist.",
    cta: "WhatsApp Now",
  },
  {
    title: "PVC Ceiling Contractor in Forbesganj",
    subtitle: "Waterproof • Durable • Low Maintenance",
    description: "Kitchen, bathroom aur balcony ke liye best PVC false ceiling installation. Water-resistant aur termite-proof PVC ceiling work Forbesganj & Araria me available.",
    cta: "Get Quote",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "JK Interior",
    "image": "https://www.jkinterior.online/og-image.jpg",
    "telephone": "+91-8651070831",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Forbesganj",
      "addressRegion": "Bihar",
      "addressCountry": "IN"
    },
    "areaServed": ["Forbesganj", "Araria", "Purnia"],
    "description": "JK Interior - False Ceiling Experts in Forbesganj & Araria. Gypsum False Ceiling, PVC Ceiling, LED Ceiling, Grid Ceiling installation with 100+ projects.",
    "url": "https://www.jkinterior.online",
    "priceRange": "₹₹",
    "serviceType": ["False Ceiling", "Gypsum Ceiling", "PVC Ceiling", "LED Ceiling", "Interior Design"]
  }

  return (
    <>
      <Head>
        <title>False Ceiling in Forbesganj | Gypsum, PVC, LED Ceiling | JK Interior</title>
        <meta name="description" content="JK Interior - Forbesganj & Araria me best False Ceiling Contractor. Gypsum False Ceiling, PVC Ceiling, LED Ceiling Design, Grid Ceiling installation. 100+ projects, 5+ years experience. Call +91-8651070831" />
        <meta name="keywords" content="False Ceiling Forbesganj, Gypsum Ceiling Forbesganj, PVC Ceiling Forbesganj, LED Ceiling Forbesganj, False Ceiling Araria, Gypsum Ceiling Araria, Interior Designer Forbesganj, Ceiling Contractor Araria" />
        <link rel="canonical" href="https://www.jkinterior.online" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      </Head>

      <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden" aria-label="JK Interior False Ceiling Services Forbesganj Araria">
        {/* Background Image + Light Cream Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-interior.jpg"
            alt="False Ceiling Design Forbesganj - Gypsum PVC LED Ceiling by JK Interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#FDFBF7]/85 backdrop-blur-[1px]" />
        </div>

        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="container relative mx-auto flex h-full min-h-[600px] lg:min-h-[700px] items-center px-4">
              <div className="max-w-3xl space-y-6">
                <div
                  className={`transition-all duration-700 delay-100 ${
                    index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <span className="inline-block rounded-full bg-[#F5EEDD] px-4 py-1.5 text-sm font-medium text-[#B8956A]">
                    Interior Work in Forbesganj & Araria
                  </span>
                </div>
                
                <h1
                  className={`font-serif text-4xl font-bold leading-tight text-[#2C1810] md:text-5xl lg:text-6xl xl:text-7xl transition-all duration-700 delay-200 ${
                    index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <span className="text-balance">{slide.title}</span>
                </h1>
                
                <h2
                  className={`font-serif text-xl text-[#B8956A] md:text-2xl lg:text-3xl transition-all duration-700 delay-300 ${
                    index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  {slide.subtitle}
                </h2>
                
                <p
                  className={`max-w-xl text-base text-[#5C4B3B] md:text-lg transition-all duration-700 delay-400 ${
                    index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  {slide.description}
                </p>

                <p
                  className={`text-sm font-semibold text-[#B8956A] transition-all duration-700 delay-500 ${
                    index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  ⭐ False Ceiling Forbesganj | 100+ Projects | 5+ Years Experience | Araria
                </p>
                
                <div
                  className={`flex flex-wrap items-center gap-4 pt-2 transition-all duration-700 delay-500 ${
                    index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <Button asChild size="lg" className="bg-[#2C1810] text-white hover:bg-[#1F1108]">
                    <a href="tel:+918651070831" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                  <Button asChild size="lg" className="bg-green-500 text-white hover:bg-green-600">
                    <a href="https://wa.me/918651070831?text=Hi%20JK%20Interior,%20mujhe%20false%20ceiling%20design%20Forbesganj%20me%20quote%20chahiye" target="_blank" rel="noopener noreferrer">
                      💬 WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows - Fixed (no overlap) */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#2C1810] shadow-lg transition-all hover:bg-white hover:scale-105 lg:left-8"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#2C1810] shadow-lg transition-all hover:bg-white hover:scale-105 lg:right-8"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-[#2C1810]" : "w-2 bg-[#D4C4A8]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  )
}

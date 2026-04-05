"use client"

import { useEffect, useRef, useState } from "react"
import { Phone, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      tag: "Interior Work in Forbesganj & Araria",
      title: "False Ceiling Experts in Forbesganj",
      subtitle: "Stylish aur Mazboot Ceiling Solutions",
      desc: "Gypsum, PVC, and Grid Ceiling installations with precision. Transform any space with elegant ceiling designs in Forbesganj & Araria.",
      keywords: "False Ceiling Forbesganj, Gypsum Ceiling Araria",
    },
    {
      tag: "Premium Interior Solutions",
      title: "Modern LED Ceiling Design",
      subtitle: "Lighting jo banaye ghar khaas",
      desc: "Custom LED profile lights, cove lighting aur designer panels — Forbesganj me best LED ceiling work.",
      keywords: "LED Ceiling Forbesganj, Modern Ceiling Design",
    },
    {
      tag: "PVC & Waterproof Work",
      title: "PVC Ceiling Contractor Forbesganj",
      subtitle: "Water-Resistant & Durable",
      desc: "Kitchen, bathroom aur balcony ke liye best PVC panels — low maintenance, long life. Service in Araria & Forbesganj.",
      keywords: "PVC Ceiling Forbesganj, Waterproof Ceiling Araria",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-fade-up")
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  // JSON-LD Schema
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "JK Interior",
    "image": "https://jkinterior.com/og-image.jpg",
    "telephone": "+91-8651070831",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Forbesganj",
      "addressRegion": "Bihar",
      "addressCountry": "IN"
    },
    "areaServed": ["Forbesganj", "Araria", "Purnia"],
    "description": "Premium False Ceiling Designer in Forbesganj & Araria. Gypsum, PVC, LED, Grid Ceiling work with 100+ projects.",
    "url": "https://jkinterior.com",
    "priceRange": "₹₹"
  }

  return (
    <>
      <Head>
        <title>False Ceiling in Forbesganj | JK Interior - Gypsum, PVC, LED Ceiling</title>
        <meta name="description" content="JK Interior - Forbesganj & Araria me best False Ceiling, Gypsum, PVC, LED Ceiling work. 100+ projects, 5+ years experience. Call +91-8651070831" />
        <meta name="keywords" content="False Ceiling Forbesganj, Gypsum Ceiling Araria, PVC Ceiling Forbesganj, LED Ceiling Design, Interior Designer Araria" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      </Head>

      <section
        ref={sectionRef}
        id="home"
        aria-label="JK Interior Hero Section - False Ceiling Services"
        className="relative min-h- bg-[#FDFBF7] overflow-hidden"
      >
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            
            {/* Left Content */}
            <header className="reveal opacity-0" style={{ animationDelay: "0.1s" }}>
              {/* Tag */}
              <span className="mb-6 inline-block rounded-full bg-[#F5EEDD] px-4 py-2 text-sm font-medium text-[#B8956A]">
                {slides[currentSlide].tag}
              </span>

              {/* H1 - SEO Main Keyword */}
              <h1 className="mb-4 text-4xl font-bold leading-tight text-[#2C1810] md:text-5xl lg:text-6xl font-serif">
                {slides[currentSlide].title}
              </h1>

              {/* H2 - Secondary Keyword */}
              <h2 className="mb-4 text-xl font-semibold text-[#B8956A]">
                {slides[currentSlide].subtitle}
              </h2>

              {/* Description */}
              <p className="mb-8 max-w-xl text-base leading-relaxed text-[#5C4B3B] md:text-lg">
                {slides[currentSlide].desc}
              </p>

              {/* Trust Badge */}
              <p className="mb-6 text-sm font-semibold text-[#B8956A]">
                ⭐ 100+ Projects Completed | 5+ Years Experience | Forbesganj & Araria
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="#portfolio"
                  aria-label="View False Ceiling Work Portfolio"
                  className="rounded-md bg-[#2C1810] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#1F1108] hover:shadow-lg"
                >
                  View Ceiling Work
                </Link>

                <a
                  href="tel:+918651070831"
                  aria-label="Call JK Interior for False Ceiling in Forbesganj"
                  className="flex items-center gap-2 rounded-md border-2 border-[#D4C4A8] bg-white px-6 py-3 text-sm font-semibold text-[#2C1810] transition hover:border-[#B8956A] hover:text-[#B8956A]"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>

                <a
                  href="https://wa.me/918651070831?text=Hi%20JK%20Interior,%20mujhe%20false%20ceiling%20design%20ke%20liye%20quote%20chahiye"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp JK Interior for Ceiling Quote"
                  className="flex items-center gap-2 rounded-md bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  💬 WhatsApp
                </a>
              </div>
            </header>

            {/* Right side */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Carousel Controls */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <button onClick={prevSlide} aria-label="Previous slide" className="rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition hover:bg-white">
              <ChevronLeft className="h-5 w-5 text-[#2C1810]" />
            </button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button onClick={nextSlide} aria-label="Next slide" className="rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition hover:bg-white">
              <ChevronRight className="h-5 w-5 text-[#2C1810]" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-12 flex justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? "w-8 bg-[#2C1810]" : "w-2 bg-[#D4C4A8]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

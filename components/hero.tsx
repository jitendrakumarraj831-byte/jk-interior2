"use client"

import { useEffect, useRef, useState } from "react"
import { Phone, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Head from "next/head"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      tag: "Interior Work in Forbesganj & Araria",
      title: "False Ceiling Experts in Forbesganj",
      subtitle: "Gypsum Ceiling • PVC Ceiling • Grid Ceiling Work",
      desc: "JK Interior Forbesganj me best false ceiling contractor hai. Hum Gypsum false ceiling, PVC ceiling aur Grid ceiling design karte hain ghar, office aur shop ke liye. 5+ saal ka experience aur 100+ projects complete.",
    },
    {
      tag: "LED Ceiling Design Forbesganj",
      title: "Modern LED Ceiling Design in Araria",
      subtitle: "Cove Lighting • Profile Lights • Designer Ceiling",
      desc: "LED false ceiling design se apne interior ko banayein modern aur stylish. Forbesganj aur Araria me LED profile light, cove lighting aur designer ceiling ke specialist.",
    },
    {
      tag: "PVC Ceiling Work Bihar",
      title: "PVC Ceiling Contractor in Forbesganj",
      subtitle: "Waterproof • Durable • Low Maintenance",
      desc: "Kitchen, bathroom aur balcony ke liye best PVC false ceiling installation. Water-resistant aur termite-proof PVC ceiling work Forbesganj & Araria me available.",
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

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "JK Interior",
    "image": "https://www.jkinterior.online/og-image.jpg",
    "telephone": "+91-8541849118",
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

      <section
        ref={sectionRef}
        id="home"
        aria-label="JK Interior - False Ceiling Services in Forbesganj Araria"
        className="relative min-h-screen overflow-hidden"
      >
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

        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            
            <header className="reveal opacity-0" style={{ animationDelay: "0.1s" }}>
              <span className="mb-6 inline-block rounded-full bg-[#F5EEDD] px-4 py-2 text-sm font-medium text-[#B8956A]">
                {slides[currentSlide].tag}
              </span>

              <h1 className="mb-4 text-4xl font-bold leading-tight text-[#2C1810] md:text-5xl lg:text-6xl font-serif">
                {slides[currentSlide].title}
              </h1>

              <h2 className="mb-4 text-xl font-semibold text-[#B8956A]">
                {slides[currentSlide].subtitle}
              </h2>

              <p className="mb-8 max-w-xl text-base leading-relaxed text-[#5C4B3B] md:text-lg">
                {slides[currentSlide].desc}
              </p>

              <p className="mb-6 text-sm font-semibold text-[#B8956A]">
                ⭐ False Ceiling Forbesganj | 100+ Projects | 5+ Years Experience | Araria
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="tel:+918651070831"
                  aria-label="Call JK Interior False Ceiling Contractor Forbesganj"
                  className="flex items-center gap-2 rounded-md bg-[#2C1810] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#1F1108] hover:shadow-lg"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>

                <a
                  href="https://wa.me/918651070831?text=Hi%20JK%20Interior,%20mujhe%20false%20ceiling%20design%20Forbesganj%20me%20quote%20chahiye"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp JK Interior for False Ceiling Quote Forbesganj"
                  className="flex items-center gap-2 rounded-md bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  💬 WhatsApp
                </a>
              </div>
            </header>

            <div className="hidden lg:block"></div>
          </div>

          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <button onClick={prevSlide} aria-label="Previous slide" className="rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition hover:bg-white">
              <ChevronLeft className="h-5 w-5 text-[#2C1810]" />
            </button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
            <button onClick={nextSlide} aria-label="Next slide" className="rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition hover:bg-white">
              <ChevronRight className="h-5 w-5 text-[#2C1810]" />
            </button>
          </div>

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

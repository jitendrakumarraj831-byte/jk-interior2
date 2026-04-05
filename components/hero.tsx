"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Phone } from "lucide-react"

const slides = [
  {
    title: "JK Interior",
    subtitle: "Aapke ghar ko banaye khubsurat",
    description: "Premium interior solutions for your dream home. Modern designs, quality materials, and expert craftsmanship.",
    cta: "Explore Services",
    bgClass: "bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200",
  },
  {
    title: "False Ceiling Experts",
    subtitle: "Stylish aur Mazboot Ceiling Solutions",
    description: "Gypsum, PVC, and Grid Ceiling installations with precision. Transform any space with elegant ceiling designs.",
    cta: "View Ceiling Work",
    bgClass: "bg-gradient-to-br from-slate-100 via-stone-100 to-zinc-200",
  },
  {
    title: "Modern Wall Decor",
    subtitle: "WPC Louvers & UV Marble Sheets",
    description: "Give your walls a premium makeover. Durable, stylish, and affordable wall solutions for modern homes.",
    cta: "See Wall Designs",
    bgClass: "bg-gradient-to-br from-neutral-100 via-stone-50 to-warm-gray-200",
  },
  {
    title: "Complete Interior Solutions",
    subtitle: "TV Units, Partitions & More",
    description: "From concept to completion - customized interior work tailored to your needs and budget.",
    cta: "Get Free Quote",
    bgClass: "bg-gradient-to-br from-zinc-100 via-neutral-50 to-stone-200",
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

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${slide.bgClass} ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-primary/5" />
          </div>
          
          <div className="container relative mx-auto flex h-full min-h-[600px] lg:min-h-[700px] items-center px-4">
            <div className="max-w-3xl space-y-6">
              <div
                className={`transition-all duration-700 delay-100 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  Interior Work in Forbesganj & Araria
                </span>
              </div>
              
              <h1
                className={`font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl transition-all duration-700 delay-200 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <span className="text-balance">{slide.title}</span>
              </h1>
              
              <p
                className={`font-serif text-xl text-primary md:text-2xl lg:text-3xl transition-all duration-700 delay-300 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {slide.subtitle}
              </p>
              
              <p
                className={`max-w-xl text-base text-muted-foreground md:text-lg transition-all duration-700 delay-400 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {slide.description}
              </p>
              
              <div
                className={`flex flex-wrap items-center gap-4 pt-4 transition-all duration-700 delay-500 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/services">{slide.cta}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-foreground/20">
                  <a href="tel:+918651070831" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-card/80 text-foreground shadow-lg transition-all hover:bg-card hover:scale-105 lg:left-8"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-card/80 text-foreground shadow-lg transition-all hover:bg-card hover:scale-105 lg:right-8"
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
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-foreground/20"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

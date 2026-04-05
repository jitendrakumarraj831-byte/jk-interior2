"use client"

import { useEffect, useRef } from "react"
import { Phone, ArrowDown, MessageCircle } from "lucide-react"
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
      { threshold: 0.15 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[650px] lg:min-h-[750px] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="Luxury modern interior and false ceiling design in Bihar"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 h-72 w-72 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-10 h-96 w-96 bg-accent/10 blur-3xl rounded-full" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex min-h-[650px] lg:min-h-[750px] items-center px-4 py-24">
        <div className="max-w-3xl space-y-6">

          {/* Tag */}
          <div className="reveal translate-y-10 opacity-0 transition-all duration-700">
            <span className="inline-block bg-primary/10 backdrop-blur-md border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              Interior Work in Forbesganj • Araria • Bihar
            </span>
          </div>

          {/* Heading */}
          <h1 className="reveal text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white translate-y-10 opacity-0 transition-all duration-700 delay-100">
            Transform Your Space with{" "}
            <span className="text-yellow-400">Modern Interior</span> &{" "}
            False Ceiling
          </h1>

          {/* Subheading */}
          <p className="reveal text-lg md:text-xl text-gray-300 translate-y-10 opacity-0 transition-all duration-700 delay-200">
            Premium gypsum ceiling, PVC ceiling & complete home interior solutions.
          </p>

          {/* Hindi Line */}
          <p className="reveal text-sm md:text-base text-gray-400 translate-y-10 opacity-0 transition-all duration-700 delay-300">
            हम आपके घर और ऑफिस को मॉडर्न, स्टाइलिश और लग्ज़री लुक देते हैं — Bihar में trusted interior service।
          </p>

          {/* CTA */}
          <div className="reveal flex flex-wrap gap-4 pt-4 translate-y-10 opacity-0 transition-all duration-700 delay-500">

            {/* Call */}
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black shadow-xl">
              <a href="tel:+918651070831" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>

            {/* WhatsApp */}
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <a
                href="https://wa.me/918651070831"
                target="_blank"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>

            {/* Contact */}
            <Button asChild variant="ghost" size="lg" className="text-white hover:text-yellow-400">
              <Link href="#contact">
                Contact Us
              </Link>
            </Button>

          </div>
        </div>
      </div>

      {/* Scroll */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 hover:text-white"
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <ArrowDown className="animate-bounce mt-1" />
      </a>
    </section>
  )
}

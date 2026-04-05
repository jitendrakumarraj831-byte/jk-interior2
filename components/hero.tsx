"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      aria-label="JK Interior - Best Interior Designer, False Ceiling Contractor & Home Decor in Forbesganj Araria Bihar"
      className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-primary/5" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex h-full min-h-[600px] lg:min-h-[700px] items-center px-4">
        <div className="max-w-3xl space-y-6">
          <div className="reveal opacity-0 transition-all duration-700 delay-100">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Best Interior Designer & Ceiling Contractor in Forbesganj, Araria
            </span>
          </div>

          <h1 className="reveal opacity-0 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl transition-all duration-700 delay-200">
            <span className="text-balance">
              JK Interior – <span className="text-primary">False Ceiling & Home Decor</span> Expert in Bihar
            </span>
          </h1>

          <p className="reveal opacity-0 font-serif text-xl text-primary md:text-2xl lg:text-3xl transition-all duration-700 delay-300">
            Gypsum Ceiling, PVC Panel, WPC Louvers & Office Interior Work
          </p>

          <p className="reveal opacity-0 max-w-xl text-base text-muted-foreground md:text-lg transition-all duration-700 delay-400">
            We provide affordable interior work in Forbesganj & Araria – false ceiling (gypsum/grid/PVC), wall paneling, WPC louvers, UV marble sheet, TV units & modular furniture for home & office.
          </p>

          <p className="reveal opacity-0 max-w-xl text-base text-muted-foreground md:text-lg transition-all duration-700 delay-500">
            हम फोर्ब्सगंज, अररिया में फॉल्स सीलिंग, पीवीसी पैनल, जिप्सम, डब्ल्यूपीसी लूवर्स, वॉल पैनलिंग और पूरा इंटीरियर डेकोर करते हैं – घर और ऑफिस दोनों के लिए।
          </p>

          <div className="reveal opacity-0 flex flex-wrap items-center gap-4 pt-4 transition-all duration-700 delay-500">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#contact" aria-label="Contact JK Interior Forbesganj for false ceiling and home interior work">
                Contact Us / संपर्क करें
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-foreground/20">
              <a href="tel:+918651070831" aria-label="Call best interior designer in Araria Bihar" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call Now / अभी कॉल करें
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

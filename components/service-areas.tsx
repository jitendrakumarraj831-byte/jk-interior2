"use client"

import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"

const areas = [
  "Forbesganj",
  "Narpatganj",
  "Jogbani",
  "Raniganj",
  "Kursakanta",
  "Chhatapur",
  "Tribeniganj",
]

export default function ServiceAreas() {
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
    <section ref={sectionRef} id="areas" className="bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="reveal mb-16 text-center opacity-0">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-mono">
            Service Areas / सेवा क्षेत्र
          </span>
          <h3 className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans text-balance">
            Where We <span className="gold-text">Serve</span>
          </h3>
          <p className="mx-auto max-w-xl text-muted-foreground font-mono">
            Providing premium interior services across Bihar / बिहार में प्रीमियम इंटीरियर सेवा
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {areas.map((area, index) => (
            <div
              key={area}
              className="reveal flex items-center gap-2 rounded-full border border-primary/30 bg-card px-6 py-3 opacity-0 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground font-mono">
                {area}
              </span>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center opacity-0" style={{ animationDelay: "0.8s" }}>
          <p className="text-sm text-muted-foreground font-mono">
            {"And surrounding areas in Araria & Purnia district"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            एवं अररिया और पूर्णिया जिले के आसपास के क्षेत्र
          </p>
        </div>
      </div>
    </section>
  )
}

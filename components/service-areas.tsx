"use client"

import { useEffect, useRef } from "react"
import { MapPin, Navigation } from "lucide-react"

// Areas list ko thoda aur expand kiya gaya hai based on Bihar regions
const areas = [
  "Forbesganj",
  "Araria",
  "Jogbani",
  "Narpatganj",
  "Raniganj",
  "Kursakanta",
  "Purnia",
  "Chhatapur",
  "Tribeniganj",
  "Supaul",
]

export default function ServiceAreas() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
            entry.target.classList.remove("opacity-0")
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
      id="areas" 
      className="relative bg-surface-alt py-24 overflow-hidden"
    >
      {/* Background Decor (Optional for Premium Feel) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
      </div>

      {/* SEO Schema: Area Served Optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "JK Interior",
            "areaServed": areas.map(area => ({
              "@type": "City",
              "name": area,
              "addressRegion": "Bihar"
            })),
            "description": "Premium Interior & False Ceiling services in Forbesganj, Araria, and surrounding Bihar regions."
          }),
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="reveal mb-16 text-center opacity-0 transition-all duration-700">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-mono font-bold">
            <Navigation className="h-3 w-3" />
            Service Areas / सेवा क्षेत्र
          </div>
          <h3 className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans text-balance">
            Where We <span className="gold-text">Serve</span>
          </h3>
          <p className="mx-auto max-w-xl text-muted-foreground font-medium">
            Providing premium interior & false ceiling services across Bihar.
            <br />
            <span className="text-primary/80">बिहार में प्रीमियम इंटीरियर और फॉल्स सीलिंग सेवा</span>
          </p>
        </div>

        {/* Areas Badges Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {areas.map((area, index) => (
            <div
              key={area}
              className="reveal flex items-center gap-2 rounded-xl border border-primary/20 bg-card px-5 py-3 opacity-0 shadow-sm transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-sm font-bold text-foreground font-sans tracking-tight">
                {area}
              </span>
            </div>
          ))}
        </div>

        <div className="reveal mt-16 text-center opacity-0 transition-all duration-700 delay-500">
          <div className="inline-block rounded-lg bg-card/50 p-6 border border-border">
            <p className="text-base font-semibold text-foreground">
              {"Serving all surrounding locations in Araria, Supaul & Purnia districts"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              अररिया, सुपौल और पूर्णिया जिले के सभी प्रमुख क्षेत्रों में हमारी सेवाएं उपलब्ध हैं।
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

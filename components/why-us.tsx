"use client"

import { useEffect, useRef } from "react"
import { Sparkles, IndianRupee, Shield, Users, MapPin } from "lucide-react"

const reasons = [
  {
    icon: Sparkles,
    en: "Modern and Attractive Designs",
    hi: "आधुनिक और आकर्षक डिजाइन",
  },
  {
    icon: IndianRupee,
    en: "Budget Friendly Rates",
    hi: "किफायती कीमत",
  },
  {
    icon: Shield,
    en: "Strong and Durable Work",
    hi: "मजबूत और टिकाऊ काम",
  },
  {
    icon: Users,
    en: "Skilled and Experienced Team",
    hi: "अनुभवी कारीगर",
  },
  {
    icon: MapPin,
    en: "Service in Rural and Urban Areas",
    hi: "गांव और शहर दोनों में सेवा",
  },
]

export default function WhyUs() {
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
      id="why-us"
      className="relative overflow-hidden bg-surface-alt py-24"
    >
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-px w-full animate-shimmer opacity-20" />
      <div className="absolute bottom-0 left-0 h-px w-full animate-shimmer opacity-20" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="reveal mb-16 text-center opacity-0">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-mono">
            Why Choose Us / हमें क्यों चुनें
          </span>
          <h3 className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans text-balance">
            Why <span className="gold-text">JK Interior</span>?
          </h3>
          <p className="mx-auto max-w-xl text-muted-foreground font-mono">
            Trusted by hundreds of families and businesses across Bihar
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {reasons.map((reason, index) => (
            <div
              key={reason.en}
              className="reveal group flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center opacity-0 shadow-sm transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <reason.icon className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mb-2 text-sm font-bold text-foreground font-sans">
                {reason.en}
              </h4>
              <p className="text-xs text-muted-foreground font-mono">{reason.hi}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

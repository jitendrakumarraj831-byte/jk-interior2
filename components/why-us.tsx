"use client"

import { useEffect, useRef } from "react"
import { Sparkles, IndianRupee, Shield, Users, MapPin } from "lucide-react"

const reasons = [
  {
    icon: Sparkles,
    en: "Luxury False Ceiling Designs",
    hi: "शानदार फॉल्स सीलिंग डिजाइन",
    desc: "Premium PVC, Gypsum, and POP designs for homes in Forbesganj."
  },
  {
    icon: IndianRupee,
    en: "Affordable Pricing in Bihar",
    hi: "सबसे कम और सही दाम",
    desc: "Quality interior services at budget-friendly rates across Araria."
  },
  {
    icon: Shield,
    en: "Durable Wall Paneling",
    hi: "मजबूत और टिकाऊ काम",
    desc: "Waterproof PVC panels and long-lasting WPC fluted louvers."
  },
  {
    icon: Users,
    en: "Experienced Local Team",
    hi: "अनुभवी स्थानीय कारीगर",
    desc: "5+ years of expertise in interior & modular kitchen projects."
  },
  {
    icon: MapPin,
    en: "Available Across Araria District",
    hi: "पूरे अररिया जिले में उपलब्ध",
    desc: "Fast service in Forbesganj, Jogbani, and Narpatganj."
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
      id="why-choose-us"
      className="relative overflow-hidden bg-surface-alt py-24"
    >
      {/* Schema for SEO - Google isse location aur service turant pehchan lega */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Interior Design and False Ceiling",
            "provider": {
              "@type": "LocalBusiness",
              "name": "JK Interior",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Forbesganj",
                "addressRegion": "Araria, Bihar"
              }
            },
            "areaServed": "Araria District"
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4">
        <div className="reveal mb-16 text-center opacity-0 transition-all duration-700">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-mono font-bold">
            Best Interior & False Ceiling Service in Forbesganj
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans text-balance">
            Why Choose <span className="gold-text">JK Interior</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground font-mono">
             Bihar ke **Forbesganj aur Araria** mein sabse behtareen PVC panels, Gypsum ceiling aur Modular design ke liye hum par bharosa karein.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {reasons.map((reason, index) => (
            <article
              key={reason.en}
              className="reveal group flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center opacity-0 shadow-sm transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <reason.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-sm font-extrabold text-foreground font-sans">
                {reason.en}
              </h3>
              <p className="mb-2 text-xs font-bold text-primary">{reason.hi}</p>
              <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
                {reason.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


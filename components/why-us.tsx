"use client"

import { useEffect, useRef } from "react"
import { Sparkles, IndianRupee, Shield, Users, MapPin } from "lucide-react"

const reasons = [
  {
    icon: Briefcase,
    en: "5+ Years of Experience",
    hi: "5+ वर्षों का अनुभव",
    desc: "इंटीरियर डिजाइनिंग और फॉल्स सीलिंग में हमारी टीम का मजबूत अनुभव और भरोसा।"
  },
  {
    icon: Gem,
    en: "Premium Material",
    hi: "प्रीमियम मटेरियल",
    desc: "हम केवल उच्च गुणवत्ता वाले Gypsum, PVC और WPC मटेरियल का उपयोग करते हैं।"
  },
  {
    icon: ShieldCheck,
    en: "Expert Finishing",
    hi: "बेहतरीन फिनिशिंग",
    desc: "हर काम में बारीकियों पर ध्यान, ताकि मजबूती और खूबसूरती दोनों मिले।"
  },
  {
    icon: Clock,
    en: "On-Time Delivery",
    hi: "समय पर काम",
    desc: "हम तय समय सीमा के अंदर काम पूरा करने के लिए प्रतिबद्ध हैं।"
  },
  {
    icon: Tag,
    en: "Affordable Pricing",
    hi: "किफायती दाम",
    desc: "बेहतर क्वालिटी के साथ उचित और प्रतिस्पर्धी कीमत।"
  },
  {
    icon: PenTool,
    en: "Customized Designs",
    hi: "आपकी पसंद के डिज़ाइन",
    desc: "आपके बजट और स्पेस के अनुसार खास डिज़ाइन तैयार किए जाते हैं।"
  },
  {
    icon: Headset,
    en: "Free Consultation & Site Visit",
    hi: "फ्री कंसल्टेशन और साइट विज़िट",
    desc: "काम शुरू करने से पहले पूरी सलाह और साइट विज़िट बिल्कुल फ्री।"
  },
  {
    icon: BadgeCheck,
    en: "Warranty & After Support",
    hi: "वारंटी और बाद में सपोर्ट",
    desc: "काम के बाद भी 1 साल तक सर्विस और सपोर्ट उपलब्ध।"
  },
];

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


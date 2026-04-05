"use client"

import { useEffect, useRef } from "react"
import { Sparkles, IndianRupee, Shield, Users, MapPin, CheckCircle2 } from "lucide-react"

const reasons = [
  {
    icon: Sparkles,
    en: "Modern Designs",
    hi: "आधुनिक डिजाइन",
    desc: "Latest trends in PVC and Gypsum false ceilings."
  },
  {
    icon: IndianRupee,
    en: "Budget Friendly",
    hi: "किफायती कीमत",
    desc: "Premium quality interior work at local market rates."
  },
  {
    icon: Shield,
    en: "Durable Work",
    hi: "मजबूत और टिकाऊ",
    desc: "100% termite-proof and moisture-resistant materials."
  },
  {
    icon: Users,
    en: "Expert Team",
    hi: "अनुभवी कारीगर",
    desc: "Skilled professionals with 5+ years of experience."
  },
  {
    icon: MapPin,
    en: "Local Service",
    hi: "स्थानीय सेवा",
    desc: "Quick service in Forbesganj, Araria, and Jogbani."
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
      id="why-choose-jk-interior"
      aria-label="Why Choose JK Interior for False Ceiling in Forbesganj"
      className="relative overflow-hidden bg-[#050505] py-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="reveal mb-16 text-center opacity-0">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-[10px] uppercase tracking-widest text-amber-500 font-bold border border-amber-500/20">
            <CheckCircle2 className="w-3 h-3" />
            Reliable Interior Partner / विश्वसनीय पार्टनर
          </div>
          <h3 className="mb-6 text-3xl font-bold text-white md:text-5xl font-sans">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">JK Interior</span>?
          </h3>
          <p className="mx-auto max-w-2xl text-gray-400 font-medium leading-relaxed">
            हम Forbesganj और Araria में पिछले **5 सालों से** बेहतरीन False Ceiling और Interior डिज़ाइन की सेवाएं दे रहे हैं। हमारा लक्ष्य है—मजबूत काम और आपकी पूरी संतुष्टि।
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {reasons.map((reason, index) => (
            <div
              key={reason.en}
              className="reveal group relative flex flex-col items-center rounded-2xl border border-white/5 bg-[#111] p-8 text-center opacity-0 shadow-2xl transition-all duration-500 hover:border-amber-500/40 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 transition-all group-hover:bg-amber-500 group-hover:text-black">
                <reason.icon className="h-8 w-8" />
              </div>
              
              <h4 className="mb-2 text-base font-bold text-white font-sans">
                {reason.en}
              </h4>
              <p className="mb-3 text-[11px] font-bold text-amber-500/80 uppercase tracking-tighter italic">
                {reason.hi}
              </p>
              <p className="text-xs leading-relaxed text-gray-500 font-medium">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Local SEO Footer Line */}
        <div className="reveal mt-16 text-center opacity-0 pt-8 border-t border-white/5">
          <p className="text-gray-500 text-xs italic">
            Serving all major locations: Forbesganj, Araria, Jogbani, Narpatganj, and Raniganj.
          </p>
        </div>
      </div>
    </section>
  )
}

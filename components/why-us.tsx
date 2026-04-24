"use client"

import {
  Briefcase, Gem, ShieldCheck, Clock,
  Tag, PenTool, Headset, BadgeCheck,
} from "lucide-react"
import { motion } from "framer-motion"

const whyUsReasons = [
  {
    icon: Briefcase,
    en: "5+ Years of Experience",
    hi: "5+ वर्षों का अनुभव",
    desc: "इंटीरियर डिजाइनिंग और फॉल्स सीलिंग में हमारी टीम का मजबूत अनुभव और भरोसा।",
    color: "from-blue-500/20 to-blue-600/5",
    iconBg: "bg-blue-500/15 border-blue-400/30",
    iconColor: "text-blue-600",
  },
  {
    icon: Gem,
    en: "Premium Material",
    hi: "प्रीमियम मटेरियल",
    desc: "हम केवल उच्च गुणवत्ता वाले Gypsum, PVC और WPC मटेरियल का उपयोग करते हैं।",
    color: "from-violet-500/20 to-violet-600/5",
    iconBg: "bg-violet-500/15 border-violet-400/30",
    iconColor: "text-violet-600",
  },
  {
    icon: ShieldCheck,
    en: "Expert Finishing",
    hi: "बेहतरीन फिनिशिंग",
    desc: "हर काम में बारीकियों पर ध्यान, ताकि मजबूती और खूबसूरती दोनों मिले।",
    color: "from-emerald-500/20 to-emerald-600/5",
    iconBg: "bg-emerald-500/15 border-emerald-400/30",
    iconColor: "text-emerald-600",
  },
  {
    icon: Clock,
    en: "On-Time Delivery",
    hi: "समय पर काम",
    desc: "हम तय समय सीमा के अंदर काम पूरा करने के लिए प्रतिबद्ध हैं।",
    color: "from-orange-500/20 to-orange-600/5",
    iconBg: "bg-orange-500/15 border-orange-400/30",
    iconColor: "text-orange-600",
  },
  {
    icon: Tag,
    en: "Affordable Pricing",
    hi: "किफायती दाम",
    desc: "बेहतर क्वालिटी के साथ उचित और प्रतिस्पर्धी कीमत।",
    color: "from-rose-500/20 to-rose-600/5",
    iconBg: "bg-rose-500/15 border-rose-400/30",
    iconColor: "text-rose-600",
  },
  {
    icon: PenTool,
    en: "Customized Designs",
    hi: "आपकी पसंद के डिज़ाइन",
    desc: "आपके बजट और स्पेस के अनुसार खास डिज़ाइन तैयार किए जाते हैं।",
    color: "from-cyan-500/20 to-cyan-600/5",
    iconBg: "bg-cyan-500/15 border-cyan-400/30",
    iconColor: "text-cyan-600",
  },
  {
    icon: Headset,
    en: "Free Consultation & Site Visit",
    hi: "फ्री कंसल्टेशन और साइट विज़िट",
    desc: "काम शुरू करने से पहले पूरी सलाह और साइट विज़िट बिल्कुल फ्री।",
    color: "from-amber-500/20 to-amber-600/5",
    iconBg: "bg-amber-500/15 border-amber-400/30",
    iconColor: "text-amber-600",
  },
  {
    icon: BadgeCheck,
    en: "Warranty & After Support",
    hi: "वारंटी और बाद में सपोर्ट",
    desc: "काम के बाद भी 1 साल तक सर्विस और सपोर्ट उपलब्ध।",
    color: "from-teal-500/20 to-teal-600/5",
    iconBg: "bg-teal-500/15 border-teal-400/30",
    iconColor: "text-teal-600",
  },
]

export default function WhyUs() {
  return (
    <section className="relative py-24 md:py-28 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-orange-400/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-400/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">

        {/* 🔥 HERO STYLE HEADING */}
        <div className="text-center mb-16">

          <span className="inline-block px-5 py-2 rounded-full border border-orange-300/40 bg-orange-100/40 text-xs font-semibold tracking-wide text-orange-600 mb-5">
            JK INTERIOR — FORBESGANJ, ARARIA
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Aapka Ghar,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Hamaari Pehchaan
            </span>
          </h2>

          <p className="mt-5 max-w-xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
            Budget aapka, zimmedari humari! Paaye{" "}
            <span className="text-orange-600 font-semibold">Premium Interior</span> aur{" "}
            <span className="text-orange-600 font-semibold">False Ceiling</span>{" "}
            sabse kam samay aur best price mein.
          </p>

          <div className="mt-8 flex justify-center items-center gap-2">
            <div className="w-12 h-[1px] bg-orange-300" />
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <div className="w-12 h-[1px] bg-orange-300" />
          </div>
        </div>

        {/* ✅ CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {whyUsReasons.map((reason, i) => {
            const Icon = reason.icon

            return (
              <div
                key={i}
                className="group relative rounded-2xl bg-white/80 backdrop-blur border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Number bg */}
                <span className="absolute bottom-2 right-3 text-6xl font-black text-gray-100">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-xl border ${reason.iconBg}`}>
                  <Icon className={`w-5 h-5 ${reason.iconColor}`} />
                </div>

                <h3 className="text-sm font-bold text-gray-900">{reason.en}</h3>
                <p className={`text-xs font-semibold mb-2 ${reason.iconColor}`}>
                  {reason.hi}
                </p>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}

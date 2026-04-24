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
    iconColor: "text-orange-600",
    iconBg: "bg-orange-500/10 border-orange-400/30",
  },
  {
    icon: Gem,
    en: "Premium Material",
    hi: "प्रीमियम मटेरियल",
    desc: "हम केवल उच्च गुणवत्ता वाले Gypsum, PVC और WPC मटेरियल का उपयोग करते हैं।",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-500/10 border-orange-400/30",
  },
  {
    icon: ShieldCheck,
    en: "Expert Finishing",
    hi: "बेहतरीन फिनिशिंग",
    desc: "हर काम में बारीकियों पर ध्यान, ताकि मजबूती और खूबसूरती दोनों मिले।",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-500/10 border-orange-400/30",
  },
  {
    icon: Clock,
    en: "On-Time Delivery",
    hi: "समय पर काम",
    desc: "हम तय समय सीमा के अंदर काम पूरा करने के लिए प्रतिबद्ध हैं।",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-500/10 border-orange-400/30",
  },
  {
    icon: Tag,
    en: "Affordable Pricing",
    hi: "किफायती दाम",
    desc: "बेहतर क्वालिटी के साथ उचित और प्रतिस्पर्धी कीमत।",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-500/10 border-orange-400/30",
  },
  {
    icon: PenTool,
    en: "Customized Designs",
    hi: "आपकी पसंद के डिज़ाइन",
    desc: "आपके बजट और स्पेस के अनुसार खास डिज़ाइन तैयार किए जाते हैं।",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-500/10 border-orange-400/30",
  },
  {
    icon: Headset,
    en: "Free Consultation & Site Visit",
    hi: "फ्री कंसल्टेशन और साइट विज़िट",
    desc: "काम शुरू करने से पहले पूरी सलाह और साइट विज़िट बिल्कुल फ्री।",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-500/10 border-orange-400/30",
  },
  {
    icon: BadgeCheck,
    en: "Warranty & After Support",
    hi: "वारंटी और बाद में सपोर्ट",
    desc: "काम के बाद भी 1 साल तक सर्विस और सपोर्ट उपलब्ध।",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-500/10 border-orange-400/30",
  },
]

export const WHY_US_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Interior Design, False Ceiling, PVC Panel, Modular Kitchen",
  provider: {
    "@type": "LocalBusiness",
    name: "JK Interior",
    image: "/logo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Forbesganj",
      addressRegion: "Araria, Bihar",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.3001",
      longitude: "87.2533",
    },
  },
  areaServed: ["Forbesganj", "Araria", "Purnia", "Bihar"],
}

export function WhyUsJsonLdScript() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(WHY_US_JSON_LD) }}
    />
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

type WhyUsProps = {
  layout?: "default" | "experience"
}

export default function WhyUs({ layout = "default" }: WhyUsProps) {
  return (
    <section id="why-us" className="relative py-20 md:py-28 scroll-mt-28 overflow-hidden bg-[#FFFDF9]">
      <WhyUsJsonLdScript />

      {/* Subtle background glow like screenshot */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Center heading - Screenshot style */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headingVariants}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-orange-600 mb-5">
            JK INTERIOR — FORBESGANJ, ARARIA
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
            Aapka Ghar, <span className="text-orange-600">Hamaari Pehchaan</span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-sm md:text-base text-slate-600 leading-relaxed">
            Budget आपका, ज़िम्मेदारी हमारी! पाइए <span className="text-orange-600 font-semibold">Premium Interior</span> और <span className="text-orange-600 font-semibold">False Ceiling</span> का काम सबसे कम समय और 
            सबसे किफायती रेट पर। क्वालिटी में कोई समझौता नहीं, बस बेमिसाल कारीगरी।
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-400/50" />
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-400/50" />
          </div>
        </motion.div>

        {/* Cards Grid - Screenshot style rounded white cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {whyUsReasons.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.article
                key={reason.en}
                variants={cardVariants}
                className="group relative rounded-3xl bg-white border border-orange-100/80 p-6 shadow-sm hover:shadow-xl hover:shadow-orange-100/50 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="absolute -bottom-2 -right-1 text-7xl font-black text-slate-900/[0.03] leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className={`mb-4 h-12 w-12 flex items-center justify-center rounded-2xl border ${reason.iconBg} ${reason.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">{reason.en}</h3>
                <p className={`text-xs font-semibold mb-3 ${reason.iconColor}`}>{reason.hi}</p>
                <p className="text-[13px] leading-relaxed text-slate-600">{reason.desc}</p>

                <div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-orange-400/0 via-orange-400 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.article>
            )
          })}
        </motion.div>

        {/* Bottom text like screenshot */}
        <div className="mt-14 text-center">
          <div className="inline-block border-t border-slate-200 pt-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              TRUSTED BY 100+ FAMILIES ACROSS ARARIA • FORBESGANJ • JOGBANI • PURNEA
            </p>
          </div>
        </div>

      </div>
    </section>
  )
                }

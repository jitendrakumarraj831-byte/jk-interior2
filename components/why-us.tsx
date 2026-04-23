"use client"

import {
  Briefcase, Gem, ShieldCheck, Clock,
  Tag, PenTool, Headset, BadgeCheck,
} from "lucide-react"
import { motion } from "framer-motion"

// ... (whyUsReasons array aur JSON_LD remains the same as your code)
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

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-20 md:py-28 scroll-mt-28 overflow-hidden bg-white">
      <WhyUsJsonLdScript />

      {/* Screenshot Match Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Gold/Yellow Glow from Top Left, just like the image */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,245,210,0.6)_0%,_rgba(255,255,255,0)_50%)]" />
        {/* Soft Bottom Right Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(240,244,255,0.5)_0%,_rgba(255,255,255,0)_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">

        {/* Center heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headingVariants}
          className="text-center mb-14"
        >
          {/* Badge similar to the top element in image */}
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-orange-600 mb-5">
            ✨ हमारी प्रीमियम डिज़ाइन कलेक्शन ✨
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight text-slate-900">
            Why Choose <span className="text-orange-500">JK Interior</span>?
          </h2>

          <p className="mt-5 max-w-xl mx-auto text-sm md:text-base text-slate-600 font-medium leading-relaxed">
            हमारे शानदार डिज़ाइन में झलके बेहतरीन कारीगरी
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-[1px] w-20 bg-orange-200" />
            <div className="h-2 w-2 rounded-full bg-orange-400" />
            <div className="h-[1px] w-20 bg-orange-200" />
          </div>
        </motion.div>

        {/* Cards Grid */}
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
                className="group relative rounded-2xl bg-white/40 border border-slate-100 backdrop-blur-md p-6 overflow-hidden hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300"
              >
                {/* Background Accent for Card */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${reason.color} -z-10`} />

                <span className="absolute -bottom-2 -right-1 text-6xl font-black text-slate-100 leading-none select-none pointer-events-none group-hover:text-white/20 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className={`mb-4 h-12 w-12 flex items-center justify-center rounded-xl border ${reason.iconBg} ${reason.iconColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">{reason.en}</h3>
                <p className={`text-xs font-bold mb-3 ${reason.iconColor}`}>{reason.hi}</p>
                <p className="text-[13px] leading-relaxed text-slate-500 font-medium">{reason.desc}</p>

                {/* Bottom line accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-orange-400 transition-all duration-500" />
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

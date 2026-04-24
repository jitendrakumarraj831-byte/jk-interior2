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
    <section
  id="why-us"
  className="relative py-20 md:py-28 scroll-mt-28 overflow-hidden
  bg-gradient-to-br from-slate-50 via-white to-amber-50/30"
>
  {/* --- Why Choose JK Interior Section --- */}
<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-amber-50/40 border border-amber-100 px-6 py-16 md:px-14 md:py-20 text-center shadow-xl shadow-slate-200/50">
  
  {/* ✅ Hero style glow & Decorative Rings */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-slate-300/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-slate-300/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Center heading with Premium Light styling */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headingVariants}
          className="text-center"
        >
          {/* Upper Badge */}
          <p className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase mb-4">
            JK Interior — Best Interior Service
          </p>

          {/* Main Heading */}
          <h2 className="text-slate-900 text-3xl md:text-5xl font-black mb-6 leading-tight">
            Why Choose <span className="text-amber-600">JK Interior?</span>
          </h2>

          {/* Subtext */}
          <p className="text-slate-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-semibold">
            Bihar ke <span className="text-amber-600">Forbesganj aur Araria</span> mein sabse behtareen PVC panels, Gypsum ceiling aur Modular design ke liye hum par bharosa karein. <br className="hidden md:block" />
            <span className="text-slate-500 font-medium text-sm mt-2 block">Budget aapka, zimmedari humaari!</span>
          </p>

          {/* Decorative Divider */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-amber-400 to-transparent" />
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {WhyUsReasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.article
                key={reason.id || i}
                variants={cardVariants}
                className="group relative rounded-2xl bg-gradient-to-br from-white to-slate-50/50 p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-4 h-11 w-11 flex items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-slate-600 font-medium">
                  {reason.description}
                </p>

                {/* Background Number */}
                <span className="absolute -bottom-2 -right-1 text-5xl font-black text-slate-100/50 group-hover:text-amber-100/40 transition-colors pointer-events-none">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
      }
      

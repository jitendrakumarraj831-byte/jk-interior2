"use client"

import {
  Briefcase, Gem, ShieldCheck, Clock,
  Tag, PenTool, Headset, BadgeCheck,
  PhoneCall, ArrowRight
} from "lucide-react"
import { motion } from "framer-motion"

const whyUsReasons = [
  {
    icon: Briefcase,
    en: "5+ Years of Experience",
    hi: "5+ वर्षों का अनुभव",
    desc: "इंटीरियर डिजाइनिंग और फॉल्स सीलिंग में हमारी टीम का मजबूत अनुभव और भरोसा।",
    iconColor: "text-orange-500",
  },
  {
    icon: Gem,
    en: "Premium Material",
    hi: "प्रीमियम मटेरियल",
    desc: "हम केवल उच्च गुणवत्ता वाले Gypsum, PVC और WPC मटेरियल का उपयोग करते हैं।",
    iconColor: "text-orange-500",
  },
  {
    icon: ShieldCheck,
    en: "Expert Finishing",
    hi: "बेहतरीन फिनिशिंग",
    desc: "हर काम में बारीकियों पर ध्यान, ताकि मजबूती और खूबसूरती दोनों मिले।",
    iconColor: "text-orange-500",
  },
  {
    icon: Clock,
    en: "On-Time Delivery",
    hi: "समय पर काम",
    desc: "हम तय समय सीमा के अंदर काम पूरा करने के लिए प्रतिबद्ध हैं।",
    iconColor: "text-orange-500",
  },
  {
    icon: Tag,
    en: "Affordable Pricing",
    hi: "किफायती दाम",
    desc: "बेहतर क्वालिटी के साथ उचित और प्रतिस्पर्धी कीमत।",
    iconColor: "text-orange-500",
  },
  {
    icon: PenTool,
    en: "Customized Designs",
    hi: "आपकी पसंद के डिज़ाइन",
    desc: "आपके बजट और स्पेस के अनुसार खास डिज़ाइन तैयार किए जाते हैं।",
    iconColor: "text-orange-500",
  },
  {
    icon: Headset,
    en: "Free Consultation & Site Visit",
    hi: "फ्री कंसल्टेशन और साइट विज़िट",
    desc: "काम शुरू करने से पहले पूरी सलाह और साइट विज़िट बिल्कुल फ्री।",
    iconColor: "text-orange-500",
  },
  {
    icon: BadgeCheck,
    en: "Warranty & After Support",
    hi: "वारंटी और बाद में सपोर्ट",
    desc: "काम के बाद भी 1 साल तक सर्विस और सपोर्ट उपलब्ध।",
    iconColor: "text-orange-500",
  },
]

// --- JSON-LD SCHEMA (Dono cheezein preserved) ---
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
  areaServed: ["Forbesganj", "Araria", "Purnia", "Bihar", "Jogbani"],
}

export function WhyUsJsonLdScript() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(WHY_US_JSON_LD) }}
    />
  )
}

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
}

type WhyUsProps = {
  layout?: "default" | "experience"
}

export default function WhyUs({ layout = "default" }: WhyUsProps) {
  return (
    <section id="why-us" className="relative py-20 md:py-28 bg-[#f8faff] overflow-hidden scroll-mt-20">
      <WhyUsJsonLdScript />

      {/* Decorative Rings (Preserved from original) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-orange-200/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-orange-200/10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-400/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Main Card Container like Screenshot */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-white/80 p-8 md:p-14"
        >
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.span 
              variants={cardVariants}
              className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-orange-600 bg-orange-50 px-4 py-2 rounded-full mb-6"
            >
              JK INTERIOR — FORBESGANJ, ARARIA
            </motion.span>
            
            <motion.h2 
              variants={cardVariants}
              className="text-3xl md:text-5xl font-black text-[#1a1a1a] leading-tight"
            >
              Aapka Ghar, <span className="text-orange-500">Hamaari Pehchaan</span>
            </motion.h2>
            
            <motion.p 
              variants={cardVariants}
              className="mt-6 max-w-2xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed"
            >
              Budget aapka, zimmedari hamari! Paaiye <strong className="text-gray-900">Premium Interior</strong> aur <strong className="text-gray-900">False Ceiling</strong> ka kaam sabse kam samay mein.
            </motion.p>
          </div>

          {/* Grid Layout for Reasons */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
          >
            {whyUsReasons.map((reason, i) => (
              <motion.div 
                key={i} 
                variants={cardVariants}
                className="group flex gap-5 p-2 rounded-2xl hover:bg-orange-50/30 transition-colors duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform duration-300">
                    <reason.icon size={24} strokeWidth={2} />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 flex flex-wrap items-center gap-2">
                    {reason.hi}
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{reason.en}</span>
                  </h3>
                  <p className="mt-1.5 text-xs md:text-sm text-gray-500 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Footer like Screenshot */}
          <div className="mt-16 pt-12 border-t border-gray-50 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">
              TRUSTED BY 100+ FAMILIES ACROSS ARARIA • FORBESGANJ • JOGBANI • PURNEA
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:+918651070831" 
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-[0_12px_24px_rgba(249,115,22,0.3)] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <PhoneCall size={20} />
                Abhi Call Karein
              </a>
              <button className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 font-bold py-4 px-10 rounded-full hover:bg-gray-50 transition-all active:scale-95">
                Free Quote Lein
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

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

// Schema Logic (Kept Same)
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
  },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-20 md:py-28 scroll-mt-28 overflow-hidden bg-white">
      {/* 100% Screenshot Matching Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Mesh Gradient - Top Left Yellow/Orange Tint */}
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#FFF9E6] blur-[120px] opacity-70" />
        {/* Blue/White Tint from Screenshot Right Side */}
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[#E6F0FF] blur-[100px] opacity-60" />
        {/* Subtle Dots Pattern Like Screenshot */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge Like Screenshot */}
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-[#FFF9E6] px-5 py-2 text-[12px] font-bold text-[#B37A00] mb-6 shadow-sm">
             ✨ हमारी प्रीमियम डिज़ाइन कलेक्शन ✨
          </span>

          <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] leading-tight tracking-tight">
            Our <br className="md:hidden" /> 
            <span className="text-[#E67E22]">Design Meets Perfection</span>
          </h2>

          <p className="mt-4 text-[#D35400] font-bold text-lg">
             हमारे शानदार डिज़ाइन में झलके बेहतरीन कारीगरी
          </p>
          
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="h-[1px] w-20 bg-orange-200" />
            <div className="h-2 w-2 rounded-full bg-orange-400" />
            <div className="h-[1px] w-20 bg-orange-200" />
          </div>
        </motion.div>

        {/* Cards Grid with White Glassmorphism */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {whyUsReasons.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.article
                key={reason.en}
                variants={cardVariants}
                className="group relative rounded-3xl border border-white bg-white/40 backdrop-blur-md p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:shadow-orange-100 transition-all duration-300"
              >
                {/* Subtle Numbering Background */}
                <span className="absolute top-4 right-6 text-5xl font-black text-black/[0.03] select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className={`mb-5 h-12 w-12 flex items-center justify-center rounded-2xl border ${reason.iconBg} ${reason.iconColor}`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-base font-bold text-[#2D3436] mb-1">{reason.en}</h3>
                <p className={`text-xs font-bold mb-3 ${reason.iconColor}`}>{reason.hi}</p>
                <p className="text-sm leading-relaxed text-gray-500 font-medium">{reason.desc}</p>
              </motion.article>
            )
          })}
        </motion.div>

        {/* Bottom Stat Bar (as seen in screenshot) */}
        <div className="mt-20 grid grid-cols-3 gap-4 border-t border-gray-100 pt-10 text-center">
            <div>
                <h4 className="text-3xl font-black text-[#1A1A1A]">100+</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Projects Done</p>
            </div>
            <div>
                <h4 className="text-3xl font-black text-[#1A1A1A]">5+</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Years Experience</p>
            </div>
            <div>
                <h4 className="text-3xl font-black text-[#1A1A1A]">100%</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Client Satisfied</p>
            </div>
        </div>
      </div>
    </section>
  )
}

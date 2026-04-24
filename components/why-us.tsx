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
    iconColor: "text-[#FF9500]", // Screenshot Orange
    borderStyle: "border-orange-200",
  },
  {
    icon: Gem,
    en: "Premium Material",
    hi: "प्रीमियम मटेरियल",
    desc: "हम केवल उच्च गुणवत्ता वाले Gypsum, PVC और WPC मटेरियल का उपयोग करते हैं।",
    iconColor: "text-[#0056b3]", // Logo Blue
    borderStyle: "border-blue-200",
  },
  {
    icon: ShieldCheck,
    en: "Expert Finishing",
    hi: "बेहतरीन फिनिशिंग",
    desc: "हर काम में बारीकियों पर ध्यान, ताकि मजबूती और खूबसूरती दोनों मिले।",
    iconColor: "text-[#FF9500]",
    borderStyle: "border-orange-200",
  },
  {
    icon: Clock,
    en: "On-Time Delivery",
    hi: "समय पर काम",
    desc: "हम तय समय सीमा के अंदर काम पूरा करने के लिए प्रतिबद्ध हैं।",
    iconColor: "text-[#0056b3]",
    borderStyle: "border-blue-200",
  },
  {
    icon: Tag,
    en: "Affordable Pricing",
    hi: "किफायती दाम",
    desc: "बेहतर क्वालिटी के साथ उचित और प्रतिस्पर्धी कीमत।",
    iconColor: "text-[#FF9500]",
    borderStyle: "border-orange-200",
  },
  {
    icon: PenTool,
    en: "Customized Designs",
    hi: "आपकी पसंद के डिज़ाइन",
    desc: "आपके बजट और स्पेस के अनुसार खास डिज़ाइन तैयार किए जाते हैं।",
    iconColor: "text-[#0056b3]",
    borderStyle: "border-blue-200",
  },
  {
    icon: Headset,
    en: "Free Consultation",
    hi: "फ्री कंसल्टेशन",
    desc: "काम शुरू करने से पहले पूरी सलाह और साइट विज़िट बिल्कुल फ्री।",
    iconColor: "text-[#FF9500]",
    borderStyle: "border-orange-200",
  },
  {
    icon: BadgeCheck,
    en: "Warranty & Support",
    hi: "वारंटी और सपोर्ट",
    desc: "काम के बाद भी 1 साल तक सर्विस और सपोर्ट उपलब्ध।",
    iconColor: "text-[#0056b3]",
    borderStyle: "border-blue-200",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
}

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-20 bg-[#F8FAFC] overflow-hidden">
      {/* Background soft glow - matching screenshot subtle look */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header styling inspired by screenshot */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#FF9500] font-bold tracking-[0.15em] text-[12px] uppercase mb-4 block">
            JK INTERIOR — FORBESGANJ, ARARIA
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] mb-6">
            Humari <span className="text-[#FF9500]">Specialty</span>, Aapka Vishwas
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
            Budget aapka, zimmedari humari! Paaiye <span className="text-[#0056b3] font-bold">Premium Interior</span> aur <span className="text-[#FF9500] font-bold">False Ceiling</span> ka kaam sabse kam samay mein.
          </p>
        </motion.div>

        {/* Updated Grid Style */}
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
                key={i}
                variants={cardVariants}
                className={`relative group p-6 rounded-[24px] bg-white border ${reason.borderStyle} shadow-sm hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300`}
              >
                {/* Icon Container */}
                <div className={`mb-5 h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${reason.iconColor}`} />
                </div>

                <h3 className="text-[15px] font-bold text-[#1a1a1a] mb-1">{reason.en}</h3>
                <p className={`text-[12px] font-bold mb-3 ${reason.iconColor}`}>{reason.hi}</p>
                <p className="text-[13px] text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {reason.desc}
                </p>

                {/* Subtle bottom indicator */}
                <div className="absolute bottom-4 right-6 opacity-10 font-black text-4xl select-none italic">
                  0{i + 1}
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import {
  Briefcase,
  Gem,
  ShieldCheck,
  Clock,
  Tag,
  PenTool,
  Headset,
  BadgeCheck,
} from "lucide-react"
import { motion } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

const whyUsReasons = [
  {
    icon: Briefcase,
    en: "5+ Years of Experience",
    hi: "5+ वर्षों का अनुभव",
    desc: "इंटीरियर डिजाइनिंग और फॉल्स सीलिंग में हमारी टीम का मजबूत अनुभव और भरोसा।",
  },
  {
    icon: Gem,
    en: "Premium Material",
    hi: "प्रीमियम मटेरियल",
    desc: "हम केवल उच्च गुणवत्ता वाले Gypsum, PVC और WPC मटेरियल का उपयोग करते हैं।",
  },
  {
    icon: ShieldCheck,
    en: "Expert Finishing",
    hi: "बेहतरीन फिनिशिंग",
    desc: "हर काम में बारीकियों पर ध्यान, ताकि मजबूती और खूबसूरती दोनों मिले।",
  },
  {
    icon: Clock,
    en: "On-Time Delivery",
    hi: "समय पर काम",
    desc: "हम तय समय सीमा के अंदर काम पूरा करने के लिए प्रतिबद्ध हैं।",
  },
  {
    icon: Tag,
    en: "Affordable Pricing",
    hi: "किफायती दाम",
    desc: "बेहतर क्वालिटी के साथ उचित और प्रतिस्पर्धी कीमत।",
  },
  {
    icon: PenTool,
    en: "Customized Designs",
    hi: "आपकी पसंद के डिज़ाइन",
    desc: "आपके बजट और स्पेस के अनुसार खास डिज़ाइन तैयार किए जाते हैं।",
  },
  {
    icon: Headset,
    en: "Free Consultation & Site Visit",
    hi: "फ्री कंसल्टेशन और साइट विज़िट",
    desc: "काम शुरू करने से पहले पूरी सलाह और साइट विज़िट बिल्कुल फ्री।",
  },
  {
    icon: BadgeCheck,
    en: "Warranty & After Support",
    hi: "वारंटी और बाद में सपोर्ट",
    desc: "काम के बाद भी 1 साल तक सर्विस और सपोर्ट उपलब्ध।",
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
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(WHY_US_JSON_LD),
      }}
    />
  )
}

type WhyUsProps = {
  /** Merged home "portfolio" band: horizontal strip + shared parallax section */
  layout?: "default" | "experience"
}

export default function WhyUs({ layout = "default" }: WhyUsProps) {
  const inner = (
    <>
      <WhyUsJsonLdScript />
      <motion.div
        className="mx-auto max-w-7xl px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <motion.div className="mb-16 text-center" variants={fadeSlideUp}>
          <span className="mb-4 inline-block rounded-full glass-panel border-gold/25 px-4 py-1.5 text-xs uppercase tracking-widest text-gold font-mono font-bold">
            Best Interior & False Ceiling Service in Forbesganj & Araria
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans text-balance">
            Why Choose <span className="gold-text">JK Interior</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground font-medium">
            Bihar ke **Forbesganj aur Araria** mein sabse behtareen PVC panels,
            Gypsum ceiling aur Modular design ke liye hum par bharosa karein. Hum
            dete hain quality aur mazbooti ka wada.
          </p>
        </motion.div>

        {layout === "experience" ? (
          <motion.div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-luxury [-webkit-overflow-scrolling:touch]"
            variants={staggerContainer}
          >
            {whyUsReasons.map((reason) => (
              <motion.article
                key={reason.en}
                variants={fadeSlideUpItem}
                className="group min-w-[260px] sm:min-w-[280px] snap-start flex flex-col glass-card border-gold/20 p-5 text-left shrink-0 hover:border-gold/40 transition-all duration-300"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 group-hover:bg-gold/20 transition-colors">
                  <reason.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-foreground font-sans">
                  {reason.en}
                </h3>
                <p className="mb-2 text-xs font-semibold text-gold">{reason.hi}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {reason.desc}
                </p>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
          >
            {whyUsReasons.map((reason) => (
              <motion.article
                key={reason.en}
                variants={fadeSlideUpItem}
                className="group flex flex-col items-center glass-card border-gold/15 p-6 text-center transition-all duration-500 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/15 hover:-translate-y-1"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition-colors group-hover:bg-gold/20">
                  <reason.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground font-sans">
                  {reason.en}
                </h3>
                <p className="mb-3 text-sm font-semibold text-gold">{reason.hi}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {reason.desc}
                </p>
              </motion.article>
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  )

  if (layout === "experience") {
    return (
      <div
        id="why-us"
        className="relative scroll-mt-28 border-b border-gold/10 pb-12 pt-10"
      >
        {inner}
      </div>
    )
  }

  return (
    <section
      id="why-us"
      className="relative overflow-hidden py-24 border-y border-gold/10 scroll-mt-28"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
      </div>
      {inner}
    </section>
  )
}

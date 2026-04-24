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
<section id="why-us" className="relative py-20 md:py-28 scroll-mt-28 overflow-hidden">
<WhyUsJsonLdScript />

{/* Decorative rings */}  
  <div className="pointer-events-none absolute inset-0">  
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-blue-300/20" />  
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-blue-300/15" />  
    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl" />  
    <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-400/10 blur-3xl" />  
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
      <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold mb-5">  
        <span className="w-1 h-1 rounded-full bg-gold inline-block" />  
        Best Interior Service · Forbesganj · Araria  
        <span className="w-1 h-1 rounded-full bg-gold inline-block" />  
      </span>  

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">  
        Why Choose <span className="gold-text">JK Interior</span>?  
      </h2>  

      <p className="mt-5 max-w-xl mx-auto text-sm md:text-base text-muted-foreground leading-relaxed">  
        Bihar ke <strong className="text-foreground font-semibold">Forbesganj aur Araria</strong> mein  
        sabse behtareen PVC panels, Gypsum ceiling aur Modular design ke liye hum par bharosa karein.  
      </p>  

      <div className="mt-8 flex items-center justify-center gap-3">  
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />  
        <div className="h-1.5 w-1.5 rounded-full bg-gold" />  
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />  
      </div>  
    </motion.div>  

    {/* Cards Grid */}  
    <motion.div  
      initial="hidden"  
      whileInView="visible"  
      viewport={{ once: true, amount: 0.05 }}  
      variants={containerVariants}  
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"  
    >  
      {whyUsReasons.map((reason, i) => {  
        const Icon = reason.icon  
        return (  
          <motion.article  
            key={reason.en}  
            variants={cardVariants}  
            className={`group relative rounded-2xl bg-gradient-to-br ${reason.color} border border-white/60 backdrop-blur-sm p-5 md:p-6 overflow-hidden hover:shadow-lg hover:shadow-blue-200/40 hover:-translate-y-1 transition-all duration-300`}  
          >  
            <div className="absolute inset-0 bg-white/70 rounded-2xl -z-10" />  

            <span className="absolute -bottom-3 -right-1 text-7xl font-black text-foreground/[0.04] leading-none select-none pointer-events-none">  
              {String(i + 1).padStart(2, "0")}  
            </span>  

            <div className={`mb-4 h-11 w-11 flex items-center justify-center rounded-xl border ${reason.iconBg} ${reason.iconColor} transition-transform duration-300 group-hover:scale-110`}>  
              <Icon className="h-5 w-5" />  
            </div>  

            <h3 className="text-sm font-bold text-foreground leading-snug mb-0.5">{reason.en}</h3>  
            <p className={`text-[11px] font-semibold mb-2.5 ${reason.iconColor}`}>{reason.hi}</p>  
            <p className="text-[12px] leading-relaxed text-muted-foreground">{reason.desc}</p>  

            <div className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r ${reason.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />  
          </motion.article>  
        )  
      })}  
    </motion.div>  
  </div>  
</section>

)
}

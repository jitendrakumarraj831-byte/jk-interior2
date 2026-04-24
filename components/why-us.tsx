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

   <div className="relative z-10 max-w-[450px] mx-auto px-4">
  <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm text-center">
    
    {/* Subtitle */}
    <span className="text-[11px] tracking-[0.2em] font-bold text-orange-500 uppercase block mb-4">
      Best Interior Service • Araria
    </span>

    {/* Heading */}
    <h2 className="text-3xl font-black text-slate-900 leading-tight mb-4">
      Why Choose <span className="text-blue-600">JK Interior?</span>
    </h2>

    {/* Content */}
    <p className="text-gray-500 text-sm leading-relaxed mb-8">
      Bihar ke Forbesganj aur Araria mein sabse behtareen PVC panels, Gypsum ceiling aur Modular design ke liye hum par bharosa karein.
    </p>

    {/* Buttons Section */}
    <div className="space-y-3">
      <button className="w-full py-4 bg-orange-500 text-white font-bold rounded-full shadow-lg shadow-orange-100">
        अभी कॉल करें
      </button>
      <button className="w-full py-4 bg-white border border-gray-200 text-slate-800 font-bold rounded-full shadow-sm">
        Free Quote Lein
      </button>
    </div>

    {/* Footer Link */}
    <div className="mt-8 pt-6 border-t border-gray-50">
       <p className="text-[10px] tracking-widest text-gray-400 font-bold uppercase">
         Trusted by 100+ Families
       </p>
    </div>
  </div>
</div>
  
</section>

)
}

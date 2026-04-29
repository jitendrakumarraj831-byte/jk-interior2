            "use client"

import { Check, Info, MapPin, Layers, Box, Layout, Sparkles, Maximize, Leaf, Phone, ArrowUpRight, MessageCircle, Headset, Truck, ShieldCheck, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

const slug = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

const services = [
  { 
    title: "Gypsum False Ceiling", 
    titleHi: "जिप्सम फॉल्स सीलिंग", 
    tag: "Most Popular", 
    hook: "0% Maintenance Cost",
    useCaseEn: "Best for living rooms & bedrooms.", 
    benefitEn: "Heat insulation & luxury look.", 
    image: "/images/gypsum-ceiling.jpg", 
    alt: "Gypsum ceiling", 
    icon: <Layers className="w-5 h-5" />, 
    galleryCategory: "Gypsum False Ceiling" 
  },
  { 
    title: "PVC Ceiling", 
    titleHi: "PVC सीलिंग", 
    tag: "Waterproof", 
    hook: "Termite & Damp Proof",
    useCaseEn: "Ideal for kitchens & bathrooms.", 
    benefitEn: "Low maintenance, no paint.", 
    image: "/images/pvc-ceiling.jpg", 
    alt: "PVC ceiling", 
    icon: <Box className="w-5 h-5" />, 
    galleryCategory: "PVC Ceiling" 
  },
  { 
    title: "WPC Louvers", 
    titleHi: "WPC लूवर्स", 
    tag: "Premium", 
    hook: "Weatherproof Exterior",
    useCaseEn: "For TV units & exterior.", 
    benefitEn: "Premium wooden look.", 
    image: "/images/wpc-louvers.jpg", 
    alt: "WPC louvers", 
    icon: <Layout className="w-5 h-5" />, 
    galleryCategory: "WPC fluted panels & uv marble Sheet" 
  },
  { 
    title: "UV Marble Sheet", 
    titleHi: "UV मार्बल शीट", 
    tag: "Luxury", 
    hook: "Mirror-Like Finish",
    useCaseEn: "Perfect for highlight walls.", 
    benefitEn: "Affordable & durable.", 
    image: "/images/uv-marble.jpg", 
    alt: "UV marble", 
    icon: <Sparkles className="w-5 h-5" />, 
    galleryCategory: "WPC fluted panels & uv marble Sheet" 
  },
  { 
    title: "Fluted Panels", 
    titleHi: "फ्लूटेड पैनल", 
    tag: "3D Texture", 
    hook: "Acoustic Insulation",
    useCaseEn: "Best for bedroom bed-backs.", 
    benefitEn: "Instant luxury look.", 
    image: "/images/fluted-panels.jpg", 
    alt: "Fluted panels", 
    icon: <Maximize className="w-5 h-5" />, 
    galleryCategory: "WPC fluted panels & uv marble Sheet" 
  },
  { 
    title: "TV Unit Design", 
    titleHi: "TV यूनिट डिजाइन", 
    tag: "Custom", 
    hook: "Modular Storage",
    useCaseEn: "Perfect for living rooms.", 
    benefitEn: "Hidden wiring & storage.", 
    image: "/images/tv-unit.jpg", 
    alt: "TV unit", 
    icon: <Layout className="w-5 h-5" />, 
    galleryCategory: "TV Unit Design" 
  },
]

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-4">
        
        {/* ── HEADER ───────────────────────── */}
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-blue-100">
            <Zap className="w-3 h-3 fill-blue-600" /> Professional Solutions
          </span>
          <h2 className="text-slate-900 text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Design Your <span className="text-blue-600">Dream Home</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            <span className="text-slate-900 font-bold">JK Interior Forbesganj</span> - बिहार का सबसे भरोसेमंद इंटीरियर ब्रांड।
          </p>
        </motion.div>

        {/* ── NEW MODERN SLIDER: FLOATING BADGES ───────────────────────── */}
        <div className="relative mb-20">
          <div className="flex flex-wrap justify-center gap-3">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-full shadow-sm hover:border-blue-500 hover:shadow-md transition-all cursor-default group"
              >
                <span className="text-blue-600 group-hover:scale-110 transition-transform">{s.icon}</span>
                <span className="font-bold text-slate-800 text-sm tracking-tight">{s.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
                  

    {/* Magazine-style cards grid */}
    <motion.div
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >      
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={fadeSlideUpItem}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-gold/20 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-gold/50 hover:shadow-2xl hover:shadow-blue-100"
            >
              {/* Image - bigger, full-width hero of card */}
              <div className="relative aspect-[16/11] w-full shrink-0 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  quality={72}
                />
                {/* Bottom gradient for floating icon contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/15" />

                {/* Top-right tag badge */}
                <div className="absolute right-4 top-4 rounded-full border border-white/40 bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 shadow-md backdrop-blur-md">
                  {service.tag}
                </div>
              </div>

              {/* Floating service icon - overlaps image/content boundary */}
              <div className="relative -mt-7 mb-2 ml-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-200 ring-4 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {service.icon}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-1">
                {/* Title */}
                <div>
                  <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-blue-700">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold italic tracking-wide text-blue-500">
                    {service.titleHi}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                    <div>
                      <span className="font-medium text-foreground">{service.useCaseEn}</span>
                      <p className="text-[11px] italic text-muted-foreground">{service.useCase}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                    <div>
                      <span className="font-medium text-foreground">{service.specialtyEn}</span>
                      <p className="text-[11px] italic text-muted-foreground">{service.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                    <div>
                      <span className="font-medium text-foreground">{service.benefitEn}</span>
                      <p className="text-[11px] italic text-muted-foreground">{service.benefit}</p>
                    </div>
                  </div>
                </div>

                {/* Dual CTA: Call + WhatsApp */}
                <div className="mt-2 flex items-center gap-2 border-t border-blue-100 pt-4">
                  <a
                    href="tel:+918651070831"
                    aria-label={`Call now for ${service.title} quote`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-200 active:scale-95"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/918651070831?text=${encodeURIComponent(`Hello! Mujhe ${service.title} (${service.titleHi}) ke baare me jaankari chahiye. Quote bhej dijiye.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp inquiry for ${service.title}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-green-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md hover:shadow-green-200 active:scale-95"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                  <Link
                    href={`/gallery#cat-${slug(service.galleryCategory)}`}
                    aria-label={`View ${service.title} gallery`}
                    className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-blue-200 text-blue-600 transition-all hover:bg-blue-600 hover:text-white hover:rotate-45 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-45"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

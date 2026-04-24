"use client"

import { Check, Info, MapPin, Layers, Box, Layout, Sparkles, Maximize, Leaf, Phone, ArrowUpRight, MessageCircle, Headset, Truck, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

// Slug helper — must match the one used in components/gallery.tsx
const slug = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

const services = [
  {
    title: "Gypsum False Ceiling",
    titleHi: "जिप्सम फॉल्स सीलिंग",
    tag: "Most Popular",
    useCase: "लिविंग रूम, बेडरूम और डाइनिंग हॉल के लिए बेस्ट।",
    useCaseEn: "Best for living rooms, bedrooms, and dining halls.",
    specialty: "स्मूथ फिनिश और क्रिएटिव लाइटिंग डिजाइन।",
    specialtyEn: "Smooth finish and creative lighting designs.",
    benefit: "गर्मी से राहत (Heat Insulation) और लग्जरी लुक।",
    benefitEn: "Heat insulation and a luxury premium look.",
    image: "/images/gypsum-ceiling.jpg",
    alt: "Gypsum false ceiling design in Forbesganj Bihar",
    icon: <Layers className="w-5 h-5" />,
    galleryCategory: "Gypsum False Ceiling",
  },
  {
    title: "PVC Ceiling",
    titleHi: "PVC सीलिंग",
    tag: "Waterproof",
    useCase: "किचन, बाथरूम, बालकनी और नमी वाली जगहों के लिए।",
    useCaseEn: "Ideal for kitchens, bathrooms, balconies, and high-moisture areas.",
    specialty: "100% वाटरप्रूफ और दीमक-रहित (Termite Proof)।",
    specialtyEn: "100% waterproof and termite-proof.",
    benefit: "कम मेंटेनेंस और पेंट करवाने की जरूरत नहीं।",
    benefitEn: "Low maintenance and no painting required.",
    image: "/images/pvc-ceiling.jpg",
    alt: "PVC ceiling panel installation Forbesganj",
    icon: <Box className="w-5 h-5" />,
    galleryCategory: "PVC Ceiling",
  },
  {
    title: "WPC Louvers",
    titleHi: "WPC लूवर्स",
    tag: "Premium",
    useCase: "टीवी यूनिट, मेन गेट वॉल और एक्सटीरियर डिजाइन में।",
    useCaseEn: "Used for TV units, main gate walls, and exterior designs.",
    specialty: "असली लकड़ी जैसा प्रीमियम वुडेन लुक।",
    specialtyEn: "Provides a premium natural wooden look.",
    benefit: "धूप और पानी से खराब नहीं होता, सालों साल नया रहता है।",
    benefitEn: "Weather-resistant, does not fade with sun or water.",
    image: "/images/wpc-louvers.jpg",
    alt: "WPC louvers wall panel design Forbesganj",
    icon: <Layout className="w-5 h-5" />,
    galleryCategory: "WPC fluted panels & uv marble Sheet",
  },
  {
    title: "UV Marble Sheet",
    titleHi: "UV मार्बल शीट",
    tag: "Luxury Look",
    useCase: "बाथरूम, किचन बैक-स्प्लैश और हाईलाइट दीवारों पर।",
    useCaseEn: "Perfect for bathrooms, kitchen backsplashes, and highlight walls.",
    specialty: "असली इटालियन मार्बल जैसी हाई-ग्लॉस फिनिश।",
    specialtyEn: "High-gloss finish like real Italian marble.",
    benefit: "मार्बल से बहुत सस्ता और इंस्टॉलेशन में बहुत आसान।",
    benefitEn: "Much cheaper than real marble and very easy to install.",
    image: "/images/uv-marble.jpg",
    alt: "UV marble sheet wall cladding Bihar",
    icon: <Sparkles className="w-5 h-5" />,
    galleryCategory: "WPC fluted panels & uv marble Sheet",
  },
  {
    title: "Fluted Panels",
    titleHi: "फ्लूटेड पैनल",
    tag: "3D Texture",
    useCase: "बेडरूम बेड-बैक और ड्राइंग रूम की दीवारों के लिए।",
    useCaseEn: "Used for bedroom bed-backs and drawing room walls.",
    specialty: "दीवारों को आधुनिक 3D टेक्सचर और गहराई देता है।",
    specialtyEn: "Adds a modern 3D texture and depth to walls.",
    benefit: "साधारण दीवार को भी तुरंत लग्जरी लुक में बदल देता है।",
    benefitEn: "Instantly transforms a plain wall into a luxury feature.",
    image: "/images/fluted-panels.jpg",
    alt: "Fluted wall panels interior design",
    icon: <Maximize className="w-5 h-5" />,
    galleryCategory: "WPC fluted panels & uv marble Sheet",
  },
  {
    title: "TV Unit Design",
    titleHi: "TV यूनिट डिजाइन",
    tag: "Customized",
    useCase: "लिविंग रूम और मास्टर बेडरूम को सजाने के लिए।",
    useCaseEn: "Perfect for decorating living rooms and master bedrooms.",
    specialty: "कस्टमाइज्ड स्टोरेज और हिडन वायरिंग मैनेजमेंट।",
    specialtyEn: "Customized storage and hidden wiring management.",
    benefit: "आपका टीवी एरिया व्यवस्थित, साफ़ और सुंदर दिखता है।",
    benefitEn: "Keeps your TV area organized, clean, and beautiful.",
    image: "/images/tv-unit.jpg",
    alt: "Modern TV unit design Forbesganj",
    icon: <Layout className="w-5 h-5" />,
    galleryCategory: "TV Unit Design",
  },
  {
    title: "Artificial Grass",
    titleHi: "आर्टिफिशियल घास",
    tag: "Zero Maintenance",
    useCase: "बालकनी, टैरेस, गार्डन और आउटडोर एरिया के लिए।",
    useCaseEn: "Ideal for balconies, terraces, gardens, and outdoor areas.",
    specialty: "नेचुरल घास जैसा लुक, बिना मेंटेनेंस के।",
    specialtyEn: "Natural grass-like look with zero maintenance.",
    benefit: "पानी, कटिंग या कीटनाशक की जरूरत नहीं।",
    benefitEn: "No watering, mowing, or pesticides required.",
    image: "/images/artificial-grass.jpg",
    alt: "Artificial grass installation in Forbesganj Bihar",
    icon: <Leaf className="w-5 h-5" />,
    galleryCategory: "Artificial Grass",
  },
]

export default function Services() {
  return (
   <section
  id="services"
  className="relative overflow-hidden py-24 scroll-mt-28 bg-gradient-to-br from-slate-50 via-white to-amber-50/30"
> 
  {/* ── Services Header + Trust Strip ───────────────────────── */}
<div className="container mx-auto px-4"> {/* यह कंटेनर डालना ज़रूरी है */}
  <motion.div
    variants={fadeSlideUp}
    initial="hidden"        // यह मिसिंग था
    whileInView="visible"   // यह मिसिंग था
    viewport={{ once: true }}
    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-amber-50/40 border border-amber-100 px-6 py-12 md:px-14 md:py-16 text-center shadow-xl shadow-slate-200/50 mb-14"
  >
    {/* Glow effects */}
    <div className="pointer-events-none absolute top-0 left-1/4 w-48 h-48 bg-amber-200/30 blur-3xl rounded-full" />
    <div className="pointer-events-none absolute bottom-0 right-1/4 w-40 h-40 bg-blue-100/20 blur-3xl rounded-full" />

    <div className="relative">
      {/* Badge */}
      <div className="flex justify-center mb-4">
        <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">
          OUR EXPERTISE / हमारी विशेषज्ञता
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-slate-900 text-2xl md:text-4xl font-black mb-6 leading-tight">
        Premium <span className="text-amber-600">Interior</span> Services
      </h2>

      {/* Description */}
      <p className="text-slate-700 max-w-xl mx-auto text-base md:text-lg leading-relaxed font-semibold mb-10">
        JK Interior Forbesganj आपके सपनों के घर के लिए सबसे बेहतरीन और मज़बूत सोल्यूशन्स प्रदान करता है।
      </p>

      {/* Trust Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Item 1 */}
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white">
            <Headset className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-900">Free Consultation</p>
            <p className="text-[11px] text-slate-600">फ्री सलाह & डिज़ाइन प्लान</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white">
            <Truck className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-900">Free Site Visit</p>
            <p className="text-[11px] text-slate-600">घर पर आकर मुफ़्त माप-जोख</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-900">1 Year Warranty</p>
            <p className="text-[11px] text-slate-600">पूरे काम पर 1 साल की वारंटी</p>
          </div>
                  </div> {/* Item 3 Ends */}
        </div> {/* Trust Strip Grid Ends */}
      </div> {/* Relative Container Ends */}
    </motion.div>

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

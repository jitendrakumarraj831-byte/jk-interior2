"use client"

import { Check, Info, Layout, Layers, Box, Maximize, MapPin, Sparkles } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { BentoGrid } from "@/components/Layout/BentoGrid"
import { fadeSlideUp, staggerContainer } from "@/components/motion-reveal"

const services = [
  {
    title: "Gypsum False Ceiling",
    titleHi: "जिप्सम फॉल्स सीलिंग",
    useCase: "लिविंग रूम, बेडरूम और डाइनिंग हॉल के लिए बेस्ट।",
    useCaseEn: "Best for living rooms, bedrooms, and dining halls.",
    specialty: "स्मूथ फिनिश और क्रिएटिव लाइटिंग डिजाइन।",
    specialtyEn: "Smooth finish and creative lighting designs.",
    benefit: "गर्मी से राहत (Heat Insulation) और लग्जरी लुक।",
    benefitEn: "Heat insulation and a luxury premium look.",
    desc: "Gypsum false ceiling gives a modern and elegant look to your home.",
    image: "/images/gypsum-ceiling.jpg",
    alt: "Gypsum false ceiling design in Forbesganj Bihar",
    icon: <Layers className="w-5 h-5" />,
  },
  {
    title: "PVC Ceiling",
    titleHi: "PVC सीलिंग",
    useCase: "किचन, बाथरूम, बालकनी और नमी वाली जगहों के लिए।",
    useCaseEn: "Ideal for kitchens, bathrooms, balconies, and high-moisture areas.",
    specialty: "100% वाटरप्रूफ और दीमक-रहित (Termite Proof)।",
    specialtyEn: "100% waterproof and termite-proof.",
    benefit: "कम मेंटेनेंस और पेंट करवाने की जरूरत नहीं।",
    benefitEn: "Low maintenance and no painting required.",
    desc: "PVC ceiling is waterproof, durable and low maintenance.",
    image: "/images/pvc-ceiling.jpg",
    alt: "PVC ceiling panel installation Forbesganj",
    icon: <Box className="w-5 h-5" />,
  },
  {
    title: "WPC Louvers",
    titleHi: "WPC लूवर्स",
    useCase: "टीवी यूनिट, मेन गेट वॉल और एक्सटीरियर डिजाइन में।",
    useCaseEn: "Used for TV units, main gate walls, and exterior designs.",
    specialty: "असली लकड़ी जैसा प्रीमियम वुडेन लुक।",
    specialtyEn: "Provides a premium natural wooden look.",
    benefit: "धूप और पानी से खराब नहीं होता, सालों साल नया रहता है।",
    benefitEn: "Weather-resistant, does not fade with sun or water.",
    desc: "WPC louvers give a premium wooden finish to walls.",
    image: "/images/wpc-louvers.jpg",
    alt: "WPC louvers wall panel design Forbesganj",
    icon: <Layout className="w-5 h-5" />,
  },
  {
    title: "UV Marble Sheet",
    titleHi: "UV मार्बल शीट",
    useCase: "बाथरूम, किचन बैक-स्प्लैश और हाईलाइट दीवारों पर।",
    useCaseEn: "Perfect for bathrooms, kitchen backsplashes, and highlight walls.",
    specialty: "असली इटालियन मार्बल जैसी हाई-ग्लॉस फिनिश।",
    specialtyEn: "High-gloss finish like real Italian marble.",
    benefit: "मार्बल से बहुत सस्ता और इंस्टॉलेशन में बहुत आसान।",
    benefitEn: "Much cheaper than real marble and very easy to install.",
    desc: "UV marble sheets provide a luxurious marble finish.",
    image: "/images/uv-marble.jpg",
    alt: "UV marble sheet wall cladding Bihar",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    title: "Fluted Panels",
    titleHi: "फ्लूटेड पैनल",
    useCase: "बेडरूम बेड-बैक और ड्राइंग रूम की दीवारों के लिए।",
    useCaseEn: "Used for bedroom bed-backs and drawing room walls.",
    specialty: "दीवारों को आधुनिक 3D टेक्सचर और गहराई देता है।",
    specialtyEn: "Adds a modern 3D texture and depth to walls.",
    benefit: "साधारण दीवार को भी तुरंत लग्जरी लुक में बदल देता है।",
    benefitEn: "Instantly transforms a plain wall into a luxury feature.",
    desc: "Fluted panels are modern decorative wall panels.",
    image: "/images/fluted-panels.jpg",
    alt: "Fluted wall panels interior design",
    icon: <Maximize className="w-5 h-5" />,
  },
  {
    title: "TV Unit Design",
    titleHi: "TV यूनिट डिजाइन",
    useCase: "लिविंग रूम और मास्टर बेडरूम को सजाने के लिए।",
    useCaseEn: "Perfect for decorating living rooms and master bedrooms.",
    specialty: "कस्टमाइज्ड स्टोरेज और हिडन वायरिंग मैनेजमेंट।",
    specialtyEn: "Customized storage and hidden wiring management.",
    benefit: "आपका टीवी एरिया व्यवस्थित, साफ़ और सुंदर दिखता है।",
    benefitEn: "Keeps your TV area organized, clean, and beautiful.",
    desc: "We design and install modern TV units.",
    image: "/images/tv-unit.jpg",
    alt: "Modern TV unit design Forbesganj",
    icon: <Layout className="w-5 h-5" />,
  },
];


const bentoSpans = [
  "md:col-span-8 md:row-span-2 min-h-[280px] md:min-h-[420px]",
  "md:col-span-4 min-h-[200px]",
  "md:col-span-4 min-h-[200px]",
  "md:col-span-4 min-h-[240px]",
  "md:col-span-4 min-h-[240px]",
  "md:col-span-4 min-h-[240px]",
]

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden py-28 scroll-mt-28"
    >
      <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.06 }}
        variants={staggerContainer}
      >
        <motion.header className="mb-16 space-y-4 text-center" variants={fadeSlideUp}>
          <div className="flex justify-center">
            <span className="rounded-full border border-gold/30 glass-panel px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              Our Expertise / हमारी विशेषज्ञता
            </span>
          </div>
          <h2 className="text-4xl font-black text-foreground md:text-6xl">
            Premium <span className="gold-text">Interior</span> Services
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-lg">
            JK Interior Forbesganj आपके सपनों के घर के लिए सबसे बेहतरीन और मज़बूत
            सोल्यूशन्स प्रदान करता है।
          </p>
        </motion.header>

        <BentoGrid
  items={services.map((service, index) => ({
    id: service.title,
    className: bentoSpans[index],
    children: (
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-gold/20 glass-panel shadow-lg transition-all duration-500 hover:border-gold/45 hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.25)]">
        <div
          className={
            index === 0
              ? "relative min-h-[200px] flex-1 md:min-h-0"
              : "relative h-44 shrink-0 md:h-40"
          }
        >
          <Image
            src={service.image}
            alt={service.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
            sizes="(max-width:768px) 100vw, 50vw"
            loading="lazy"
            quality={index === 0 ? 78 : 68}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f0f7ff]/95 via-[#f0f7ff]/45 to-transparent" />
          <div className="absolute left-4 top-4 rounded-xl border border-gold/25 glass-panel p-2.5 text-gold">
            {service.icon}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
          <div>
            <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-gold md:text-xl">
              {service.title}
            </h3>
            <p className="text-xs font-bold uppercase italic tracking-wider text-gold-light/80">
              {service.titleHi}
            </p>
          </div>

          <div className="space-y-3.5 text-sm">
            {/* Use Case Section */}
            <div className="flex gap-2 text-muted-foreground">
              <MapPin className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
              <div className="flex flex-col">
                <span className="text-foreground font-medium leading-tight">
                  {service.useCaseEn}
                </span>
                <span className="text-[11px] italic opacity-70 leading-tight">
                  उपयोग: {service.useCase}
                </span>
              </div>
            </div>

            {/* Specialty Section */}
            <div className="flex gap-2 text-muted-foreground">
              <Info className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
              <div className="flex flex-col">
                <span className="text-foreground font-medium leading-tight">
                  {service.specialtyEn}
                </span>
                <span className="text-[11px] italic opacity-70 leading-tight">
                  खासियत: {service.specialty}
                </span>
              </div>
            </div>

            {/* Benefit Section */}
            <div className="flex gap-2 text-muted-foreground">
              <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
              <div className="flex flex-col">
                <span className="text-foreground font-medium leading-tight">
                  {service.benefitEn}
                </span>
                <span className="text-[11px] italic opacity-70 leading-tight">
                  फायदा: {service.benefit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    ),
  }))}
/>
        

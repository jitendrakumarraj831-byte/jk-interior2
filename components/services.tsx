"use client"

import { Check, Info, MapPin, Layers, Box, Layout, Sparkles, Maximize, Leaf } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

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
    image: "/images/tv-unit.jpg",
    alt: "Modern TV unit design Forbesganj",
    icon: <Layout className="w-5 h-5" />,
  },
  {
    title: "Artificial Grass",
    titleHi: "आर्टिफिशियल घास",
    useCase: "बालकनी, टैरेस, गार्डन और आउटडोर एरिया के लिए।",
    useCaseEn: "Ideal for balconies, terraces, gardens, and outdoor areas.",
    specialty: "नेचुरल घास जैसा लुक, बिना मेंटेनेंस के।",
    specialtyEn: "Natural grass-like look with zero maintenance.",
    benefit: "पानी, कटिंग या कीटनाशक की जरूरत नहीं।",
    benefitEn: "No watering, mowing, or pesticides required.",
    image: "/images/artificial-grass.jpg",
    alt: "Artificial grass installation in Forbesganj Bihar",
    icon: <Leaf className="w-5 h-5" />,
  },
]

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 scroll-mt-28">
      {/* Subtle background glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-blue-500/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-400/8 blur-3xl" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.06 }}
        variants={staggerContainer}
      >
        {/* Section header */}
        <motion.header className="mb-14 space-y-3 text-center" variants={fadeSlideUp}>
          <div className="flex justify-center">
            <span className="rounded-full border border-gold/30 glass-panel px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              Our Expertise / हमारी विशेषज्ञता
            </span>
          </div>
          <h2 className="text-4xl font-black text-foreground md:text-5xl">
            Premium <span className="gold-text">Interior</span> Services
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground md:text-base">
            JK Interior Forbesganj आपके सपनों के घर के लिए सबसे बेहतरीन और मज़बूत सोल्यूशन्स प्रदान करता है।
          </p>
        </motion.header>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={fadeSlideUpItem}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gold/20 glass-panel shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-xl hover:shadow-blue-100"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  quality={72}
                />
                {/* Light gradient at bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Icon badge */}
                <div className="absolute left-4 top-4 rounded-xl border border-white/30 bg-white/20 p-2.5 text-white backdrop-blur-md">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-4 p-5">
                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-gold">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold italic tracking-wide text-blue-500">
                    {service.titleHi}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                    <div>
                      <span className="font-medium text-foreground">{service.useCaseEn}</span>
                      <p className="text-[11px] italic text-muted-foreground">{service.useCase}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                    <div>
                      <span className="font-medium text-foreground">{service.specialtyEn}</span>
                      <p className="text-[11px] italic text-muted-foreground">{service.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                    <div>
                      <span className="font-medium text-foreground">{service.benefitEn}</span>
                      <p className="text-[11px] italic text-muted-foreground">{service.benefit}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

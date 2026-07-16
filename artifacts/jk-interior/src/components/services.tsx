
import { Layers, PanelTop, Tv, Sparkles, Phone, MessageCircle, CircleCheck as CheckCircle2, ShieldCheck, Droplets, Clock, Gem, Zap, ImageIcon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { useLocation } from "wouter"
import { slugify } from "@/lib/utils"

const easeLux = [0.22, 1, 0.36, 1] as const

const services = [
  {
    icon: Layers,
    title: "PVC False Ceiling",
    titleHi: "PVC फॉल्स सीलिंग",
    desc: "Premium PVC false ceiling installation with waterproof panels, modern designs, and long-lasting finish. Perfect for homes and offices in Forbesganj.",
    descHi: "वॉटरप्रूफ पैनल, मॉडर्न डिज़ाइन और लंबे समय तक चलने वाली फिनिश के साथ प्रीमियम PVC फॉल्स सीलिंग।",
    color: "from-emerald-500 to-emerald-700",
    badge: "Most Popular",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-300",
    features: ["Waterproof", "Dust-Free", "Fast Install"],
    image: "/images/pvc.jpg",
    imageAlt: "PVC False Ceiling Installation in Forbesganj Bihar by JK Interior",
    galleryCategory: "PVC Ceiling",
  },
  {
    icon: Layers,
    title: "Gypsum Ceiling",
    titleHi: "जिप्सम सीलिंग",
    desc: "Elegant gypsum ceiling designs with smooth finish and creative lighting integration. Ideal for luxury interiors in Araria and Forbesganj.",
    descHi: "स्मूथ फिनिश और क्रिएटिव लाइटिंग के साथ एलिगेंट जिप्सम सीलिंग डिज़ाइन।",
    color: "from-slate-500 to-slate-700",
    badge: "Premium",
    badgeColor: "bg-gray-100 text-gray-700 border-gray-300",
    features: ["Smooth Finish", "Light Ready", "Durable"],
    image: "/images/gypsum.jpg",
    imageAlt: "Gypsum Ceiling Design in Araria Bihar by JK Interior",
    galleryCategory: "Gypsum False Ceiling",
  },
  {
    icon: PanelTop,
    title: "WPC Wall Paneling",
    titleHi: "WPC वॉल पैनलिंग",
    desc: "High-quality WPC wall panels that are termite-proof, waterproof, and maintenance-free. Best wall paneling solution in Bihar.",
    descHi: "टर्माइट-प्रूफ, वॉटरप्रूफ और मेंटेनेंस-फ्री हाई-क्वालिटी WPC वॉल पैनल।",
    color: "from-amber-500 to-amber-700",
    badge: "Best Seller",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-300",
    features: ["Termite-Proof", "Waterproof", "Zero Maintain"],
    image: "/images/wpc.jpg",
    imageAlt: "WPC Wall Paneling in Bihar by JK Interior Forbesganj",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
  },
  {
    icon: PanelTop,
    title: "UV Marble Sheet",
    titleHi: "UV मार्बल शीट",
    desc: "Luxurious UV marble sheets that give the look of real marble at a fraction of the cost. Premium finish for walls in Forbesganj.",
    descHi: "रियल मार्बल जैसा लुक कम कीमत में - प्रीमियम UV मार्बल शीट।",
    color: "from-teal-500 to-teal-700",
    badge: "New",
    badgeColor: "bg-teal-100 text-teal-700 border-teal-300",
    features: ["Marble Look", "Scratch-Free", "Easy Clean"],
    image: "/images/uv-marble.jpg",
    imageAlt: "UV Marble Sheet Wall Installation in Forbesganj Bihar",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
  },
  {
    icon: Tv,
    title: "Modular TV Unit",
    titleHi: "मॉड्यूलर TV यूनिट",
    desc: "Custom modular TV units with modern storage solutions and premium finishes. Expert TV unit design in Forbesganj.",
    descHi: "मॉडर्न स्टोरेज और प्रीमियम फिनिश के साथ कस्टम मॉड्यूलर TV यूनिट।",
    color: "from-violet-500 to-violet-700",
    badge: "Trending",
    badgeColor: "bg-violet-100 text-violet-700 border-violet-300",
    features: ["Custom Design", "Storage", "Cable Hide"],
    image: "/images/tv-unit.jpg",
    imageAlt: "Modular TV Unit Design in Forbesganj Araria Bihar",
    galleryCategory: "TV Unit Design",
  },
  {
    icon: Sparkles,
    title: "Complete Interior",
    titleHi: "पूर्ण इंटीरियर",
    desc: "End-to-end interior design solutions from ceiling to flooring. The best interior designer in Bihar for your dream home.",
    descHi: "सीलिंग से फ्लोरिंग तक पूर्ण इंटीरियर डिज़ाइन समाधान।",
    color: "from-cyan-500 to-cyan-700",
    badge: "Complete",
    badgeColor: "bg-cyan-100 text-cyan-700 border-cyan-300",
    features: ["Full Design", "Execution", "Warranty"],
    image: "/images/gypsum-ceiling.jpg",
    imageAlt: "Complete Interior Design Services in Bihar by JK Interior",
    galleryCategory: null,
  },
]

const trustItems = [
  { icon: ShieldCheck, label: "Premium Quality", sublabel: "Best Materials", color: "text-emerald-600", border: "border-emerald-200 bg-emerald-50" },
  { icon: Droplets, label: "100% Waterproof", sublabel: "Water Resistant", color: "text-cyan-600", border: "border-cyan-200 bg-cyan-50" },
  { icon: Clock, label: "Fast Installation", sublabel: "On-Time Delivery", color: "text-amber-600", border: "border-amber-200 bg-amber-50" },
  { icon: Zap, label: "Dust-Free Work", sublabel: "Clean Process", color: "text-blue-600", border: "border-blue-200 bg-blue-50" },
  { icon: Gem, label: "1 Year Warranty", sublabel: "Guaranteed", color: "text-violet-600", border: "border-violet-200 bg-violet-50" },
  { icon: CheckCircle2, label: "Free Site Visit", sublabel: "No Cost", color: "text-emerald-600", border: "border-emerald-200 bg-emerald-50" },
]

export default function Services() {
  const shouldReduce = useReducedMotion()
  const [, navigate] = useLocation()

  const goToGallery = (galleryCategory: string | null) => {
    const target = galleryCategory ? `/gallery#gallery-${slugify(galleryCategory)}` : "/gallery"
    navigate(target)
  }

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.7, ease: easeLux },
      }

  const staggerContainer = shouldReduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
        },
      }

  const staggerItem = shouldReduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeLux } },
        },
      }

  return (
    <section
      id="services"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
      aria-labelledby="services-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0fdf4] to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,rgba(5,150,105,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(5,150,105,0.04),transparent)]" />
        <div className="absolute inset-0 grid-texture opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Section Header */}
        <motion.div {...animProps} className="mb-14 text-center sm:mb-16 lg:mb-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 sm:text-xs">
              Premium Services
            </span>
          </div>

          <h2
            id="services-heading"
            className="mb-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Premium Interior{" "}
            <span className="hero-gradient-text">Solutions</span>
          </h2>

          <p className="mx-auto mb-2 max-w-2xl text-base font-medium text-gray-600 sm:text-lg">
            हम लेकर आए हैं फारबिसगंज में इंटीरियर का बेस्ट कलेक्शन
          </p>
          <p className="mx-auto max-w-xl text-sm text-gray-500 sm:text-base">
            From PVC ceilings to modular TV units — every service crafted with precision, waterproof materials, and premium finish.
          </p>

          <motion.div
            initial={shouldReduce ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: easeLux }}
            className="mx-auto mt-6 h-px w-32 origin-center rounded-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
          />
        </motion.div>

        {/* Trust Strip */}
        <motion.div
          {...staggerContainer}
          className="mb-14 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-6 md:gap-3 lg:mb-20"
        >
          {trustItems.map((item) => (
            <motion.div
              key={item.label}
              {...staggerItem}
              className={`group flex flex-col items-center gap-1.5 rounded-xl border ${item.border} p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:gap-2 sm:rounded-2xl sm:p-4`}
            >
              <item.icon className={`h-5 w-5 ${item.color} sm:h-6 sm:w-6`} aria-hidden="true" />
              <span className="text-center text-[10px] font-bold text-gray-800 sm:text-xs">{item.label}</span>
              <span className="text-[9px] text-gray-500 sm:text-[10px]">{item.sublabel}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Cards */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              {...staggerItem}
              role="button"
              tabIndex={0}
              onClick={() => goToGallery(service.galleryCategory)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  goToGallery(service.galleryCategory)
                }
              }}
              aria-label={`View ${service.title} photos in gallery`}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:border-emerald-300 hover:shadow-[0_8px_40px_rgba(5,150,105,0.12)] hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 sm:rounded-3xl"
            >
              {/* Image area */}
              <div className="relative h-44 overflow-hidden sm:h-52">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="object-cover transition-transform duration-700 group-hover:scale-110 w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Badge */}
                <div className={`absolute left-3 top-3 flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[10px] font-bold backdrop-blur-sm sm:rounded-xl sm:px-3 sm:text-xs ${service.badgeColor}`}>
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  {service.badge}
                </div>

                {/* View gallery hint */}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg border border-white/30 bg-black/40 px-2 py-1 text-[9px] font-bold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 sm:rounded-xl sm:px-2.5 sm:text-[10px]">
                  <ImageIcon className="h-3 w-3" aria-hidden="true" />
                  View Gallery
                </div>

                {/* Icon overlay */}
                <div className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} shadow-lg sm:h-12 sm:w-12 sm:rounded-2xl`}>
                  <service.icon className="h-5 w-5 text-white sm:h-6 sm:w-6" aria-hidden="true" />
                </div>

                {/* Title on image */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                  <h3 className="text-lg font-black text-white sm:text-xl">{service.title}</h3>
                  <p className="text-xs font-medium text-white/70 sm:text-sm">{service.titleHi}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 lg:p-6">
                <p className="mb-2 text-sm leading-relaxed text-gray-700 sm:text-base">{service.desc}</p>
                <p className="mb-4 text-xs leading-relaxed text-gray-500 sm:text-sm">{service.descHi}</p>

                {/* Feature tags */}
                <div className="mb-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {service.features.map((feat) => (
                    <span
                      key={feat}
                      className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 sm:rounded-lg sm:px-2.5 sm:text-xs"
                    >
                      <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 sm:h-3 sm:w-3" aria-hidden="true" />
                      {feat}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-2">
                  <a
                    href="tel:+918541849118"
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white transition-all hover:bg-emerald-500 hover:shadow-[0_4px_16px_rgba(5,150,105,0.4)] active:scale-95 sm:text-sm touch-manipulation"
                    aria-label={`Call for ${service.title} quote`}
                  >
                    <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                    Get Quote
                  </a>
                  <a
                    href={`https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}%20service%20in%20Forbesganj.%20Please%20share%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-2.5 text-xs font-bold text-[#128C7E] transition-all hover:bg-[#25D366]/20 hover:border-[#25D366]/60 active:scale-95 sm:text-sm touch-manipulation"
                    aria-label={`WhatsApp for ${service.title}`}
                  >
                    <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div {...animProps} className="mt-16 flex flex-col items-center gap-5 text-center lg:mt-20">
          <p className="text-base font-medium text-gray-600 sm:text-lg">अपने घर को बनाएं एक शाही महल</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918541849118"
              aria-label="Call for free site visit"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-[0_4px_24px_rgba(5,150,105,0.4)] transition-all hover:bg-emerald-500 hover:shadow-[0_4px_32px_rgba(5,150,105,0.55)] active:scale-95 luxury-animated-shine touch-manipulation"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Free Site Visit
            </a>
            <a
              href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20a%20free%20quotation%20for%20interior%20work."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp for free quotation"
              className="flex items-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-[0_4px_24px_rgba(37,211,102,0.35)] transition-all hover:bg-[#20c05c] active:scale-95 touch-manipulation"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Get Free Quotation
            </a>
          </div>
        </motion.div>

        {/* SEO rich text */}
        <div className="sr-only">
          <h2>Best Interior Design Services in Forbesganj, Araria, Bihar</h2>
          <p>JK Interior offers premium PVC False Ceiling in Forbesganj, Gypsum Ceiling in Araria, WPC Wall Paneling in Bihar, UV Marble Sheet installation, Modular TV Unit design in Forbesganj, and complete interior design solutions. All 100% waterproof, dust-free, 1-year warranty. Free site visits and quotations.</p>
        </div>
      </div>
    </section>
  )
}

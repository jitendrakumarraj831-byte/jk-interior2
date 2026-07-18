
import { Layers, PanelTop, Tv, Sparkles, CircleCheck as CheckCircle2, ImageIcon, Ruler, Timer, ShieldCheck } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { useLocation } from "wouter"
import { slugify } from "@/lib/utils"
import SectionHeader from "@/components/ui/section-header"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"

const easeLux = [0.22, 1, 0.36, 1] as const

interface ServiceEntry {
  icon: typeof Layers
  title: string
  titleHi: string
  story: string
  storyHi: string
  color: string
  badge: string
  badgeColor: string
  price: string
  timeline: string
  bestFor: string
  image: string
  imageAlt: string
  galleryCategory: string | null
  span: string
  featured?: boolean
  compact?: boolean
  banner?: boolean
}

const services: ServiceEntry[] = [
  {
    icon: Layers,
    title: "PVC False Ceiling",
    titleHi: "PVC फॉल्स सीलिंग",
    story: "The one we install most — 100% waterproof panels that go into more Forbesganj kitchens and bathrooms than anything else on this list. Wipe clean, termite-proof, and it doesn't need repainting.",
    storyHi: "फारबिसगंज के सबसे ज़्यादा घरों में यही लगता है — 100% वॉटरप्रूफ, टर्माइट-प्रूफ। बस गीले कपड़े से पोंछो, कभी रंग-रोगन की ज़रूरत नहीं।",
    color: "from-emerald-500 to-emerald-700",
    badge: "Most Requested",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-300",
    price: "₹80–140/sq.ft",
    timeline: "1 room in a day",
    bestFor: "Kitchens, bathrooms, any room",
    image: "/images/pvc.jpg",
    imageAlt: "PVC False Ceiling Installation in Forbesganj Bihar by JK Interior",
    galleryCategory: "PVC Ceiling",
    span: "lg:col-span-2",
    featured: true,
  },
  {
    icon: Layers,
    title: "Gypsum Ceiling",
    titleHi: "जिप्सम सीलिंग",
    story: "Cove lighting and POP detailing for the room your guests see first. It isn't waterproof, so we keep it out of kitchens — but for a hall or bedroom, nothing else finishes this clean.",
    storyHi: "स्मूथ फिनिश और कोव लाइटिंग — मगर वॉटरप्रूफ नहीं, इसलिए किचन-बाथरूम में नहीं लगाते।",
    color: "from-slate-500 to-slate-700",
    badge: "Living Rooms",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-300",
    price: "₹80–140/sq.ft",
    timeline: "2–3 days/room",
    bestFor: "Hall, bedroom, dry rooms",
    image: "/images/gypsum.jpg",
    imageAlt: "Gypsum Ceiling Design in Araria Bihar by JK Interior",
    galleryCategory: "Gypsum False Ceiling",
    span: "lg:col-span-2",
  },
  {
    icon: PanelTop,
    title: "WPC Wall Paneling",
    titleHi: "WPC वॉल पैनलिंग",
    story: "Real-wood look for a TV wall at roughly 60% of what timber panelling costs — and it won't warp through a Bihar monsoon the way real wood does.",
    storyHi: "असली लकड़ी जैसा लुक, कीमत लगभग 60% कम। नमी में मुड़ता या फूलता नहीं।",
    color: "from-amber-500 to-amber-700",
    badge: "TV Walls",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-300",
    price: "₹180–450/sq.ft",
    timeline: "1 day for a TV wall",
    bestFor: "Accent walls, headboards",
    image: "/images/wpc.jpg",
    imageAlt: "WPC Wall Paneling in Bihar by JK Interior Forbesganj",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    span: "lg:col-span-1",
    compact: true,
  },
  {
    icon: PanelTop,
    title: "UV Marble Sheet",
    titleHi: "UV मार्बल शीट",
    story: "Marble-effect sheets for walls and pooja rooms at a fraction of stone pricing — no grout lines to blacken, no cold slab to maintain, just a damp cloth.",
    storyHi: "असली मार्बल का लुक, कीमत बहुत कम। कोई ग्राउट लाइन नहीं, बस कपड़े से पोंछो।",
    color: "from-teal-500 to-teal-700",
    badge: "Marble Look",
    badgeColor: "bg-teal-100 text-teal-700 border-teal-300",
    price: "₹50–95/sq.ft",
    timeline: "1–2 days/room",
    bestFor: "Bathroom & pooja walls",
    image: "/images/uv-marble.jpg",
    imageAlt: "UV Marble Sheet Wall Installation in Forbesganj Bihar",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    span: "lg:col-span-1",
    compact: true,
  },
  {
    icon: Tv,
    title: "Modular TV Unit",
    titleHi: "मॉड्यूलर TV यूनिट",
    story: "Built to your wall's exact width, with the cable clutter routed behind the panel — not cut down from a catalogue template.",
    storyHi: "आपकी दीवार की सही नाप पर बना, केबल छुपे रहते हैं — कैटलॉग डिज़ाइन नहीं।",
    color: "from-violet-500 to-violet-700",
    badge: "Custom Sized",
    badgeColor: "bg-violet-100 text-violet-700 border-violet-300",
    price: "₹15,000 onwards",
    timeline: "Cable mgmt built-in",
    bestFor: "Living rooms, bedrooms",
    image: "/images/tv-unit.jpg",
    imageAlt: "Modular TV Unit Design in Forbesganj Araria Bihar",
    galleryCategory: "TV Unit Design",
    span: "lg:col-span-2",
  },
  {
    icon: Sparkles,
    title: "Complete Interior",
    titleHi: "पूर्ण इंटीरियर",
    story: "One team for ceiling, walls, TV unit, and flooring, quoted together — the combo works out cheaper than booking each piece as a separate job.",
    storyHi: "सीलिंग, वॉल, TV यूनिट और फ्लोरिंग — एक ही टीम, एक ही टाइमलाइन, साथ में बुक करने पर सस्ता पड़ता है।",
    color: "from-cyan-500 to-cyan-700",
    badge: "Combo Pricing",
    badgeColor: "bg-cyan-100 text-cyan-700 border-cyan-300",
    price: "Custom quote",
    timeline: "One crew, one timeline",
    bestFor: "New homes, full renovations",
    image: "/images/gypsum-ceiling.jpg",
    imageAlt: "Complete Interior Design Services in Bihar by JK Interior",
    galleryCategory: null,
    span: "lg:col-span-4",
    banner: true,
  },
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
          visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
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
        <SectionHeader
          icon={Ruler}
          badge="What We Install"
          headingId="services-heading"
          title={<>Bare Ceiling to <span className="hero-gradient-text">Finished Room</span></>}
          subtitle="हर सर्विस की अपनी कीमत और पूरा होने का समय — कोई छुपा हुआ चार्ज नहीं"
          subtitleSecondary="Six services, each suited to a different room and budget. Tap one to see the actual photos from that work."
        />

        {/* Bento-style Service Grid */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
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
              className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:border-emerald-300 hover:shadow-[0_8px_40px_rgba(5,150,105,0.12)] hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 sm:rounded-3xl ${service.span}`}
            >
              <div className={service.banner ? "sm:flex sm:items-stretch" : ""}>
                {/* Image area */}
                <div
                  className={`relative overflow-hidden ${
                    service.banner
                      ? "h-48 sm:h-auto sm:w-2/5 sm:shrink-0"
                      : service.featured
                        ? "h-56 sm:h-64 lg:h-72"
                        : "h-40 sm:h-44"
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="object-cover transition-transform duration-700 group-hover:scale-110 w-full h-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                  <div className={`absolute left-3 top-3 flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[10px] font-bold backdrop-blur-sm sm:rounded-xl sm:px-3 sm:text-xs ${service.badgeColor}`}>
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {service.badge}
                  </div>

                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg border border-white/30 bg-black/40 px-2 py-1 text-[9px] font-bold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 sm:rounded-xl sm:px-2.5 sm:text-[10px]">
                    <ImageIcon className="h-3 w-3" aria-hidden="true" />
                    View Photos
                  </div>

                  <div className={`absolute bottom-3 right-3 flex items-center justify-center rounded-xl bg-gradient-to-br ${service.color} shadow-lg sm:rounded-2xl ${service.featured || service.banner ? "h-12 w-12 sm:h-14 sm:w-14" : "h-9 w-9 sm:h-10 sm:w-10"}`}>
                    <service.icon className={service.featured || service.banner ? "h-6 w-6 text-white sm:h-7 sm:w-7" : "h-4 w-4 text-white sm:h-5 sm:w-5"} aria-hidden="true" />
                  </div>

                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <h3 className={`font-black text-white ${service.featured || service.banner ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}>{service.title}</h3>
                    <p className="text-xs font-medium text-white/70">{service.titleHi}</p>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col ${service.featured || service.banner ? "p-5 sm:p-6" : "p-4 sm:p-5"} ${service.banner ? "sm:flex-1 sm:justify-center" : ""}`}>
                  <p className={`text-gray-700 leading-relaxed ${service.featured || service.banner ? "mb-1 text-sm sm:text-base" : "mb-3 text-xs sm:text-sm line-clamp-3"}`}>
                    {service.story}
                  </p>
                  {(service.featured || service.banner) && (
                    <p className="mb-4 text-xs leading-relaxed text-gray-500 sm:text-sm">{service.storyHi}</p>
                  )}

                  {/* Spec strip */}
                  <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-gray-100 pt-3 text-[10px] font-semibold text-gray-600 sm:text-xs ${service.featured || service.banner ? "mb-4" : "mb-3"}`}>
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                      {service.price}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Timer className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                      {service.timeline}
                    </span>
                    {(service.featured || service.banner) && (
                      <span className="inline-flex items-center gap-1 text-gray-500">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                        {service.bestFor}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className={service.compact ? "flex flex-col gap-2" : "flex gap-2"}>
                    <CallLink
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                      ariaLabel={`Call for ${service.title} quote`}
                      className={service.compact ? "w-full px-3 py-2.5 text-xs sm:text-sm" : "flex-1 px-3 py-2.5 text-xs sm:text-sm"}
                    >
                      Get Quote
                    </CallLink>
                    <WhatsAppLink
                      size="sm"
                      variant="outline"
                      message={`Hi JK Interior, I am interested in ${service.title} service in Forbesganj. Please share details.`}
                      onClick={(e) => e.stopPropagation()}
                      ariaLabel={`WhatsApp for ${service.title}`}
                      className={service.compact ? "w-full px-3 py-2.5 text-xs sm:text-sm" : "flex-1 px-3 py-2.5 text-xs sm:text-sm"}
                    >
                      WhatsApp
                    </WhatsAppLink>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div {...animProps} className="mt-16 flex flex-col items-center gap-5 text-center lg:mt-20">
          <p className="text-base font-medium text-gray-600 sm:text-lg">
            Not sure which one your room needs? A free site visit settles it in ten minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CallLink size="lg" shine ariaLabel="Call for free site visit" className="text-base">
              Free Site Visit
            </CallLink>
            <WhatsAppLink
              size="lg"
              ariaLabel="WhatsApp for free quotation"
              message="Hi JK Interior, I need a free quotation for interior work."
              className="text-base"
            >
              Get Free Quotation
            </WhatsAppLink>
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

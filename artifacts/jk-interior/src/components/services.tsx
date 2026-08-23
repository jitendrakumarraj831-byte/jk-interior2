import { useState } from "react"
import { ArrowUpRight, Ruler, ShieldCheck, IndianRupee, MapPin, BadgeCheck, Sparkles, Droplets, Zap, type LucideIcon } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Link } from "wouter"
import SectionHeader from "@/components/ui/section-header"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { SERVICES_SUMMARY, type ServiceHighlight } from "@/lib/services-summary"

const easeLux = [0.22, 1, 0.36, 1] as const

const HIGHLIGHT_STYLES: Record<ServiceHighlight["kind"], { icon: LucideIcon }> = {
  special: { icon: Sparkles },
  pricing: { icon: IndianRupee },
  suited: { icon: MapPin },
}

// 1. Filter categories Definition
const CATEGORIES = [
  { id: "all", label: "All Services (सभी)" },
  { id: "ceiling", label: "False Ceiling (छत)" },
  { id: "wall", label: "Wall Paneling (दीवार)" },
  { id: "decor", label: "Interior & Decor (टीवी यूनिट/अन्य)" },
]

export default function Services() {
  const [activeTab, setActiveTab] = useState("all")
  const shouldReduce = useReducedMotion()

  // 2. Filter logic based on service slug or category
  const filteredServices = SERVICES_SUMMARY.filter((service) => {
    if (activeTab === "all") return true
    if (activeTab === "ceiling") {
      return (
        service.slug.includes("ceiling") ||
        service.slug.includes("gypsum") ||
        service.slug.includes("grid")
      )
    }
    if (activeTab === "wall") {
      return (
        service.slug.includes("panel") ||
        service.slug.includes("uv-sheet") ||
        service.slug.includes("wpc") ||
        service.slug.includes("wall")
      )
    }
    if (activeTab === "decor") {
      return (
        service.slug.includes("tv-unit") ||
        service.slug.includes("grass") ||
        service.slug.includes("decor")
      )
    }
    return true
  })

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7, ease: easeLux },
      }

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#fbfaf5] py-20 sm:py-24 lg:py-28"
      aria-labelledby="services-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(5,150,105,0.06),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
        <SectionHeader
          icon={Ruler}
          badge="Complete Service Catalogue"
          headingId="services-heading"
          title={<>फारबिसगंज और अररिया का <span className="hero-gradient-text">#1 Interior Catalogue</span></>}
          subtitle="हर सर्विस की पूरी जानकारी — सही कीमत, सामग्री, वारंटी और काम की टाइमलाइन"
        />

        {/* Top Badges */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-center gap-2.5 text-center sm:gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800 shadow-xs sm:text-sm">
            <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
            <span>500+ सफलता पूर्वक पूरे किए गए प्रोजेक्ट्स</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800 shadow-xs sm:text-sm">
            <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            <span>100% ISI-सर्टिफाइड मटेरियल</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800 shadow-xs sm:text-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            <span>1 साल की लिखित गारंटी</span>
          </div>
        </div>

        {/* 🌟 3. Filter Category Tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all sm:px-5 sm:py-3 sm:text-sm ${
                activeTab === cat.id
                  ? "bg-emerald-700 text-white shadow-md shadow-emerald-900/20 scale-105"
                  : "bg-white text-gray-700 hover:bg-emerald-50 border border-emerald-900/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Listing with Animation */}
        <div className="divide-y divide-emerald-900/[0.08]">
          <AnimatePresence mode="wait">
            {filteredServices.map((service, i) => {
              const isReversed = i % 2 === 1
              return (
                <motion.article
                  key={service.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 gap-6 py-10 first:pt-0 last:pb-0 sm:gap-8 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-12"
                >
                  {/* Image */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group relative block overflow-hidden rounded-2xl shadow-md transition-shadow hover:shadow-xl"
                    >
                      <img
                        src={service.heroImage}
                        alt={service.heroImageAlt}
                        loading="lazy"
                        className="h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-64 lg:h-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      
                      <span className="absolute right-3.5 top-3.5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-emerald-700 opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                      </span>

                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white backdrop-blur-md">
                          1 Yr Warranty
                        </span>
                        <span className="rounded-md bg-emerald-600/80 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white backdrop-blur-md">
                          ISI Materials
                        </span>
                      </div>
                    </Link>

                    <p className="mt-2.5 pl-1 text-[11px] font-extrabold uppercase tracking-widest text-emerald-800/60">
                      Fig. {String(i + 1).padStart(2, "0")} — {service.category}
                    </p>
                  </div>

                  {/* Copy & Highlights */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <span className="mb-2 block font-serif text-5xl font-black leading-none text-emerald-900/10 sm:text-6xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mb-1 text-2xl font-black text-gray-900 sm:text-3xl">
                      <Link href={`/services/${service.slug}`} className="transition-colors hover:text-emerald-700">
                        {service.name}
                      </Link>
                    </h3>
                    <p className="mb-5 text-sm font-bold text-emerald-700 sm:text-base">{service.nameHi}</p>

                    <ul className="mb-6 space-y-3.5">
                      {service.highlights.map((h) => {
                        const Icon = HIGHLIGHT_STYLES[h.kind].icon
                        return (
                          <li key={h.kind} className="flex gap-3">
                            <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700">
                              <Icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[13px] font-black uppercase tracking-wide text-emerald-900 sm:text-sm">
                                {h.label}
                                <span className="ml-1.5 font-bold normal-case tracking-normal text-emerald-600">/ {h.labelHi}</span>
                              </p>
                              <p className="mt-0.5 text-sm font-semibold leading-snug text-gray-800">{h.en}</p>
                              <p className="mt-0.5 text-[13px] leading-relaxed text-gray-600 sm:text-sm">{h.hi}</p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 font-serif text-sm font-bold text-emerald-800 underline decoration-emerald-400 decoration-2 underline-offset-4 transition-colors hover:text-emerald-600"
                      >
                        पूरी जानकारी पढ़ें
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                      <span className="text-gray-300" aria-hidden="true">|</span>
                      <CallLink size="sm" variant="outline" ariaLabel={`Call for ${service.name} quote`}>
                        फ्री रेट लें
                      </CallLink>
                      <WhatsAppLink
                        size="sm"
                        variant="outline"
                        message={`नमस्ते JK Interior, मुझे ${service.name} के रेट और फोटो चाहिए।`}
                        ariaLabel={`WhatsApp for ${service.name}`}
                      >
                        WhatsApp
                      </WhatsAppLink>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Conversion Box */}
        <motion.div {...animProps} className="mt-16 flex flex-col items-center gap-5 rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-xs lg:mt-20">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <Zap className="h-4 w-4 text-amber-500" aria-hidden="true" />
            <span>नो-हसल सर्विस (No Hidden Costs)</span>
          </div>
          <p className="max-w-2xl text-lg font-bold text-gray-900 sm:text-xl">
            समझ नहीं आ रहा आपके कमरे के लिए क्या बेस्ट रहेगा? 10 मिनट की फ्री साइट विजिट में सब तय हो जाएगा।
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <CallLink size="lg" shine ariaLabel="Call for free site visit" className="text-base">
              📞 फ्री साइट विजिट बुक करें
            </CallLink>
            <Link
              href="/services"
              className="flex items-center gap-2 rounded-xl border border-emerald-600/30 bg-emerald-50/80 px-6 py-4 text-sm font-bold text-emerald-800 transition-all hover:border-emerald-600/50 hover:bg-emerald-100 active:scale-95 sm:px-7 sm:text-base"
            >
              सभी 8 सर्विसेज देखें
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


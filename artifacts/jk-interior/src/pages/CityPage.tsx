import { useParams, Link } from "wouter"
import { motion, useReducedMotion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { CITIES, SERVICES_LIST, getCityBySlug, SITE_URL, buildBusinessIdentity } from "@/lib/seo"
import { SERVICE_CITY_SERVICES } from "@/lib/service-city-data"
import { MapPin, CheckCircle, ArrowRight, Star, Clock, Phone } from "lucide-react"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { PHONE_PRIMARY_DISPLAY, PHONE_SECONDARY_DISPLAY } from "@/lib/business-data"
import NotFound from "@/pages/not-found"

const easeLux = [0.22, 1, 0.36, 1] as const

export default function CityPage() {
  const { city: citySlug } = useParams<{ city: string }>()
  const city = getCityBySlug(citySlug || "")
  const shouldReduce = useReducedMotion()

  const anim = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: easeLux, delay },
        }

  const inViewAnim = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.65, ease: easeLux, delay },
        }

  const staggerContainer = shouldReduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px" },
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
        },
      }

  const staggerItem = shouldReduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeLux } },
        },
      }

  const hoverScale = shouldReduce ? undefined : { scale: 1.02 }

  // An unknown city slug is a 404, not a bare stub: NotFound carries the navbar,
  // the footer and the noindex meta, so the visitor can get somewhere useful and
  // the URL never enters the index.
  if (!city) return <NotFound />

  const otherCities = CITIES.filter((c) => c.slug !== city.slug)

  const cityJsonLd = {
    "@context": "https://schema.org",
    // Same @id as the static block in index.html, so both resolve to the one
    // JK Interior entity instead of asserting a second, separate business.
    ...buildBusinessIdentity(),
    description: city.description,
    url: SITE_URL,
    areaServed: {
      "@type": "City",
      name: city.name,
      addressRegion: "Bihar",
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Cities", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 3, name: `Interior Designer in ${city.name}`, item: `${SITE_URL}/cities/${city.slug}` }
    ]
  }

  const combinedJsonLd = city.faqs.length > 0 ? [
    cityJsonLd,
    breadcrumbJsonLd,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: city.faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    }
  ] : [cityJsonLd, breadcrumbJsonLd]

  return (
    <main>
      <SeoHead
        title={`Interior Designer in ${city.name} – JK Interior ${city.district} Bihar`}
        description={`JK Interior provides expert PVC false ceiling, gypsum ceiling, WPC wall panel and interior design services in ${city.name}, ${city.district} Bihar. Free site visit. Call +91 8541849118.`}
        canonical={`/cities/${city.slug}`}
        jsonLd={combinedJsonLd}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-36 pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-br from-[#faf7f0] via-white to-white" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold-100/40 blur-3xl" />
          <div className="absolute inset-0 grid-texture opacity-20" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <motion.div {...anim(0)} className="mb-4 flex items-center gap-2 text-sm font-semibold text-gold-700">
            <MapPin className="h-4 w-4" />
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <span>Cities</span>
            <span className="text-gray-300">/</span>
            <span>{city.name}</span>
          </motion.div>

          <motion.h1 {...anim(0.1)} className="mb-4 font-serif text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
            Interior Designer in{" "}
            <span className="hero-gradient-text">{city.name}</span>
          </motion.h1>

          <motion.p {...anim(0.2)} className="mb-8 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            JK Interior provides expert PVC false ceiling, gypsum ceiling, WPC wall panel and interior
            design services in {city.name}, {city.district} Bihar. Free site visit. Call +91 8541849118.
          </motion.p>

          <motion.div {...anim(0.3)} className="flex flex-wrap gap-3">
            <CallLink className="shadow-md hover:shadow-md">Call Now</CallLink>
            <WhatsAppLink
              className="shadow-md hover:shadow-md"
              message={`Hi JK Interior, I need interior design work in ${city.name}. Please arrange a free site visit.`}
            >
              WhatsApp
            </WhatsAppLink>
            <WhatsAppLink
              variant="outline"
              icon={false}
              ariaLabel="Free Site Visit – WhatsApp JK Interior"
              message={`Hi JK Interior, I need a free site visit in ${city.name}.`}
              className="border-gold-300 bg-gold-50 text-gold-700 hover:border-gold-300 hover:bg-gold-100"
            >
              <Clock className="h-4 w-4" aria-hidden="true" />
              Free Site Visit
            </WhatsAppLink>
          </motion.div>

          <motion.div {...staggerContainer} className="mt-8 flex flex-wrap gap-4">
            {[
              { icon: "🧾", label: "Free Quotation" },
              { icon: "✅", label: "500+ Projects" },
              { icon: "🛡️", label: "1 Year Warranty" },
              { icon: "📍", label: `Serving ${city.name}` },
            ].map(({ icon, label }) => (
              <motion.div key={label} {...staggerItem} whileHover={hoverScale} className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100 backdrop-blur-md">
                <span>{icon}</span>
                <span>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* City description */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <motion.h2 {...inViewAnim(0)} className="mb-4 text-2xl font-black text-gray-900 sm:text-3xl">
            Interior Design Services in <span className="text-gold-700">{city.name}</span>
          </motion.h2>
          <motion.p {...inViewAnim(0.05)} className="text-base leading-relaxed text-gray-600 max-w-3xl">
            {city.uniqueContent}
          </motion.p>
          <motion.p {...inViewAnim(0.1)} className="mt-4 max-w-3xl rounded-xl border-l-2 border-gold-300 bg-gold-50/50 py-3 pl-4 pr-3 text-[15px] leading-relaxed text-gray-700">
            <span className="font-bold text-gold-800">Planning interior work in {city.name}?</span>{" "}
            JK Interior installs PVC and gypsum false ceilings, WPC wall panelling, UV marble sheets,
            modular television units and complete home or office interiors throughout {city.name} and
            the surrounding area — with a free site visit, ISI-certified branded materials and a
            written one-year warranty. For exact rates and design photographs, call or WhatsApp{" "}
            <span className="font-semibold text-gold-800">{PHONE_PRIMARY_DISPLAY}</span> or{" "}
            <span className="font-semibold text-gold-800">{PHONE_SECONDARY_DISPLAY}</span>.
          </motion.p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <motion.h2 {...inViewAnim(0)} className="mb-3 text-2xl font-black text-gray-900 sm:text-3xl">
            Our Services in {city.name}
          </motion.h2>
          <motion.p {...inViewAnim(0.05)} className="mb-8 text-sm text-gray-500">Everything a finished interior needs, from one accountable team.</motion.p>
          <motion.div {...staggerContainer} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {SERVICES_LIST.map((service) => {
              const linked = SERVICE_CITY_SERVICES.find((s) => s.name === service)
              if (linked) {
                return (
                  <motion.div key={service} {...staggerItem} whileHover={hoverScale}>
                    <Link
                      href={`/services/${linked.slug}/${city.slug}`}
                      className="flex items-center gap-2 rounded-xl border border-gold-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm hover:border-gold-400 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-gold-600" />
                      {service}
                    </Link>
                  </motion.div>
                )
              }
              return (
                <motion.div
                  key={service}
                  {...staggerItem}
                  whileHover={hoverScale}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm"
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-gold-600" />
                  {service}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      {city.faqs.length > 0 && (
        <section className="py-14 sm:py-16 bg-white">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <motion.h2 {...inViewAnim(0)} className="mb-3 text-2xl font-black text-gray-900 sm:text-3xl">
              {city.name} — Frequently Asked Questions
            </motion.h2>
            <motion.p {...inViewAnim(0.05)} className="mb-8 text-sm text-gray-500">Common questions from our {city.name} customers.</motion.p>
            <motion.div {...staggerContainer} className="space-y-4">
              {city.faqs.map(({ q, a }) => (
                <motion.details key={q} {...staggerItem} className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 open:border-gold-300 open:bg-white open:shadow-sm">
                  <summary className="cursor-pointer list-none font-bold text-gray-900 group-open:text-gold-700">
                    <h3 className="mb-3 text-base font-bold text-gray-900 group-open:text-gold-700 inline">{q}</h3>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
                </motion.details>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 sm:py-16 bg-gradient-to-b from-charcoal-800 to-charcoal-950 text-white">
        <motion.div {...inViewAnim(0)} className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-10 sm:px-10 sm:py-12 lg:px-12 text-center backdrop-blur-sm">
          <h2 className="mb-2 text-xl font-black">
            Ready to Transform Your {city.name} Home?
          </h2>
          <p className="mb-1 text-gold-100 text-sm">Free site visit • No obligation • Same-week slots available</p>
          <p className="mb-6 text-sm font-semibold text-white">
            Call or message us on WhatsApp to book a free site visit and receive an accurate
            quotation for your property in {city.name}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallLink
              icon={false}
              ariaLabel="Call +91 8541849118"
              className="bg-white text-gold-700 shadow hover:bg-gold-50 hover:shadow"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call +91 8541849118
            </CallLink>
            <WhatsAppLink
              message={`Hi JK Interior, I need a free site visit in ${city.name}.`}
              className="shadow hover:shadow"
            >
              WhatsApp Us
            </WhatsAppLink>
          </div>
        </motion.div>
      </section>

      {/* Other cities */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-5 text-lg font-black text-gray-900">
            Explore JK Interior
          </h2>
          <motion.div {...staggerContainer} className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <motion.div key={c.slug} {...staggerItem} whileHover={hoverScale}>
                <Link
                  href={`/cities/${c.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                >
                  <MapPin className="h-3 w-3" />
                  {c.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline"
            >
              <ArrowRight className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline"
            >
              <ArrowRight className="h-4 w-4" />
              View All Services
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline"
            >
              <Star className="h-4 w-4" />
              See Our Gallery
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

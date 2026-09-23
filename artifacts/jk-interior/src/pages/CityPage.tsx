import { useParams, Link } from "wouter"
import { motion, useReducedMotion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import {
  ADDRESS_LINE, CITIES, GOOGLE_MAPS_URL, buildBreadcrumbSchema, buildFaqSchema, getCityBySlug,
} from "@/lib/seo"
import { SERVICES_CONTENT } from "@/lib/services-content"
import { galleryImages, seoAlt } from "@/lib/gallery-data"
import { MapPin, CheckCircle, ArrowRight, Phone, Hammer, Ruler, ExternalLink } from "lucide-react"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { PHONE_PRIMARY_DISPLAY, PHONE_SECONDARY_DISPLAY } from "@/lib/business-data"
import NotFound from "@/pages/not-found"

const easeLux = [0.22, 1, 0.36, 1] as const

/** Swaps a "/images/foo.webp" path for one of its generated variants, e.g. "-800w.avif". */
const srcVariant = (webpSrc: string, suffix: string) => webpSrc.replace(/\.webp$/, suffix)
const PHOTO_SIZES = "(min-width: 640px) 320px, calc(100vw - 40px)"

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

  // An unknown city slug is a 404: NotFound carries the noindex meta.
  if (!city) return <NotFound />

  // Real completed projects in this town, as described on the service pages.
  const projects = SERVICES_CONTENT.filter((s) => s.realProject.city === city.slug)
  // Gallery photos whose own description says they were taken in this town.
  const localPhotos = galleryImages.filter((img) => img.alt.includes(city.name))
  const services = city.featuredServices
    .map((slug) => SERVICES_CONTENT.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
  const otherCities = CITIES.filter((c) => c.slug !== city.slug)

  const jsonLd = [
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: `Interior work in ${city.name}`, path: `/cities/${city.slug}` },
    ]),
    buildFaqSchema(city.faqs),
  ]

  return (
    <main>
      <SeoHead title={city.title} description={city.metaDescription} canonical={`/cities/${city.slug}`} jsonLd={jsonLd} />

      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-36 pb-14 sm:pb-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-br from-[#faf7f0] via-white to-white" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold-100/40 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <motion.nav {...anim(0)} aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm font-semibold text-gold-700">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <span>{city.name}</span>
          </motion.nav>

          <motion.h1 {...anim(0.1)} className="mb-2 font-serif text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
            False Ceiling &amp; Interior Work in <span className="hero-gradient-text">{city.name}</span>
          </motion.h1>
          <motion.p {...anim(0.15)} className="mb-6 text-sm font-semibold text-gray-500 sm:text-base">
            {city.role} · {city.district} district, {city.state}
          </motion.p>

          {city.intro.map((para, i) => (
            <motion.p key={i} {...anim(0.2 + i * 0.05)} className="mb-4 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
              {para}
            </motion.p>
          ))}

          <motion.div {...anim(0.3)} className="mt-6 flex flex-wrap gap-3">
            <CallLink className="shadow-md hover:shadow-md">Call Now</CallLink>
            <WhatsAppLink
              className="shadow-md hover:shadow-md"
              message={`Hi JK Interior, I need interior work in ${city.name}. Please arrange a free site visit.`}
            >
              WhatsApp
            </WhatsAppLink>
          </motion.div>
        </div>
      </section>

      {/* Real projects in this town */}
      {projects.length > 0 && (
        <section className="bg-gray-50 py-14 sm:py-16">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <motion.h2 {...inViewAnim(0)} className="mb-6 flex items-center gap-2 text-2xl font-black text-gray-900 sm:text-3xl">
              <Hammer className="h-6 w-6 text-gold-600" aria-hidden="true" />
              Work we have done in {city.name}
            </motion.h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((s) => (
                <motion.article key={s.slug} {...inViewAnim(0.05)} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gold-700">{s.name}</p>
                  <h3 className="mt-1 text-base font-bold text-gray-900">{s.realProject.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.realProject.desc}</p>
                  <Link href={`/services/${s.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-gold-700 hover:underline">
                    {s.name} — materials, price and process
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </motion.article>
              ))}
            </div>

            {localPhotos.length > 0 && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {localPhotos.map((img) => (
                  <figure key={img.src} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <picture>
                      <source srcSet={srcVariant(img.src, "-800w.avif")} sizes={PHOTO_SIZES} type="image/avif" />
                      <source srcSet={srcVariant(img.src, "-800w.webp")} sizes={PHOTO_SIZES} type="image/webp" />
                      <img
                        src={img.src}
                        alt={seoAlt(img)}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] h-auto w-full object-cover"
                      />
                    </picture>
                    <figcaption className="px-4 py-2 text-xs font-semibold text-gray-600">{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Local notes + visit info */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 sm:px-6 md:grid-cols-2 lg:px-12">
          <motion.div {...inViewAnim(0)}>
            <h2 className="mb-4 text-2xl font-black text-gray-900">Planning work in {city.name}</h2>
            <ul className="space-y-3">
              {city.localNotes.map((note) => (
                <li key={note} className="flex gap-2.5 text-sm leading-relaxed text-gray-700">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-none text-gold-600" aria-hidden="true" />
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...inViewAnim(0.05)} className="rounded-2xl border border-gold-200 bg-gold-50/50 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-gray-900">
              <Ruler className="h-5 w-5 text-gold-600" aria-hidden="true" />
              Site visit &amp; measurement
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{city.visitInfo}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-700">
              Call or WhatsApp <span className="font-semibold text-gold-800">{PHONE_PRIMARY_DISPLAY}</span> or call{" "}
              <span className="font-semibold text-gold-800">{PHONE_SECONDARY_DISPLAY}</span>.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-gray-600">
              Workshop: {ADDRESS_LINE}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-1 font-bold text-gold-700 hover:underline"
              >
                View on Google Maps
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services offered here — links to the real service pages */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <motion.h2 {...inViewAnim(0)} className="mb-2 text-2xl font-black text-gray-900 sm:text-3xl">
            Services we offer in {city.name}
          </motion.h2>
          <p className="mb-6 text-sm text-gray-500">Each guide covers materials, sizes, price tiers and how the installation is done.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-xl border border-gold-200 bg-white px-4 py-3.5 shadow-sm transition-colors hover:border-gold-400 hover:bg-gold-50"
              >
                <span className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-gold-700">
                  <s.icon className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                  {s.name}
                </span>
                <span className="mt-1 text-xs text-gray-600">{s.tagline}</span>
              </Link>
            ))}
          </div>
          <Link href="/services" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            All eight services
          </Link>
        </div>
      </section>

      {/* FAQs */}
      {city.faqs.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <motion.h2 {...inViewAnim(0)} className="mb-6 text-2xl font-black text-gray-900 sm:text-3xl">
              {city.name} — common questions
            </motion.h2>
            <div className="space-y-4">
              {city.faqs.map(({ q, a }) => (
                <details key={q} className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 open:border-gold-300 open:bg-white open:shadow-sm">
                  <summary className="cursor-pointer list-none">
                    <h3 className="inline text-base font-bold text-gray-900 group-open:text-gold-700">{q}</h3>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-b from-charcoal-800 to-charcoal-950 py-14 text-white sm:py-16">
        <motion.div {...inViewAnim(0)} className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-10 text-center backdrop-blur-sm sm:px-10 sm:py-12 lg:px-12">
          <h2 className="mb-2 text-xl font-black">Book a free site visit in {city.name}</h2>
          <p className="mb-6 text-sm font-semibold text-white">
            We measure in person and give you a written quotation — no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallLink icon={false} ariaLabel={`Call ${PHONE_PRIMARY_DISPLAY}`} className="bg-white text-gold-700 shadow hover:bg-gold-50 hover:shadow">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {`Call ${PHONE_PRIMARY_DISPLAY}`}
            </CallLink>
            <WhatsAppLink message={`Hi JK Interior, I need a free site visit in ${city.name}.`} className="shadow hover:shadow">
              WhatsApp Us
            </WhatsAppLink>
          </div>
        </motion.div>
      </section>

      {/* Other areas */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-5 text-lg font-black text-gray-900">Other areas we serve</h2>
          <div className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
              >
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

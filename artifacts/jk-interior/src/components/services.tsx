
import { ArrowUpRight, Ruler, ShieldCheck, Timer, MapPin } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Link } from "wouter"
import SectionHeader from "@/components/ui/section-header"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { SERVICES_SUMMARY } from "@/lib/services-summary"

const easeLux = [0.22, 1, 0.36, 1] as const

/**
 * The homepage "catalogue" spread — an editorial, alternating-side layout rather
 * than a grid of bento cards, reading closer to a print catalogue's product index
 * than a template feature grid. Full detail (install steps, FAQs, materials, real
 * projects) lives one click away on /services/:slug — this section is the teaser.
 */
export default function Services() {
  const shouldReduce = useReducedMotion()

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
      {/* Background — warm paper, deliberately not the emerald gradient used elsewhere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(5,150,105,0.05),transparent)]" />
        <div className="hidden lg:block absolute left-[7%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-900/10 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
        <SectionHeader
          icon={Ruler}
          badge="The Full Catalogue"
          headingId="services-heading"
          title={<>Eight Services, <span className="hero-gradient-text">One Standard</span></>}
          subtitle="हर सर्विस की पूरी जानकारी — कीमत, टाइमलाइन, मटेरियल, सब कुछ एक क्लिक में"
          subtitleSecondary="Tap any service below for the complete guide — what it's for, what it isn't, and exactly how we install it."
        />

        <p className="mx-auto mb-10 max-w-2xl text-center text-xs font-semibold text-gray-500 sm:text-sm">
          Rates below are local Forbesganj &amp; Araria district market ranges, in Economy / Standard / Premium tiers — not fixed quotes. Final pricing is confirmed only after a free site visit and measurement.
        </p>

        <div className="divide-y divide-emerald-900/[0.07]">
          {SERVICES_SUMMARY.map((service, i) => {
            const isReversed = i % 2 === 1
            return (
              <motion.article
                key={service.slug}
                {...animProps}
                className="grid grid-cols-1 gap-6 py-10 first:pt-0 last:pb-0 sm:gap-8 sm:py-12 lg:grid-cols-12 lg:items-center lg:gap-10"
              >
                {/* Image */}
                <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative block overflow-hidden rounded-xl"
                    aria-label={`Read the full ${service.name} guide`}
                  >
                    <img
                      src={service.heroImage}
                      alt={service.heroImageAlt}
                      loading="lazy"
                      className="h-52 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-64 lg:h-72"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-emerald-700 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                  <p className="mt-2.5 pl-1 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    Fig. {String(i + 1).padStart(2, "0")} — {service.category}
                  </p>
                </div>

                {/* Copy */}
                <div className={`lg:col-span-7 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                  <span className="mb-3 block font-serif text-5xl font-black leading-none text-emerald-900/10 sm:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mb-1 text-2xl font-black text-gray-900 sm:text-3xl">
                    <Link href={`/services/${service.slug}`} className="hover:text-emerald-700 transition-colors">
                      {service.name}
                    </Link>
                  </h3>
                  <p className="mb-3 text-sm font-bold text-emerald-700">{service.nameHi}</p>

                  <p className="mb-2 text-base font-semibold leading-snug text-gray-800 sm:text-lg">
                    {service.tagline}
                  </p>
                  <p className="mb-5 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
                    {service.taglineHi}
                  </p>

                  {/* Caption-style spec line, not badge pills — reads like a photo credit line */}
                  <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-gray-500 sm:text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                      {service.price.split(" (")[0]}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Timer className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                      {service.installTime}
                    </span>
                    <span className="hidden text-gray-300 sm:inline">·</span>
                    <span className="hidden items-center gap-1.5 sm:inline-flex">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                      {service.whereUsedFirst}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 font-serif text-sm font-bold text-emerald-800 underline decoration-emerald-300 decoration-2 underline-offset-4 transition-colors hover:text-emerald-600"
                    >
                      Read the full guide
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                    <span className="text-gray-300">|</span>
                    <CallLink size="sm" variant="outline" ariaLabel={`Call for ${service.name} quote`}>
                      Get Quote
                    </CallLink>
                    <WhatsAppLink
                      size="sm"
                      variant="outline"
                      message={`Hi JK Interior, I am interested in ${service.name}. Please share details.`}
                      ariaLabel={`WhatsApp for ${service.name}`}
                    >
                      WhatsApp
                    </WhatsAppLink>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div {...animProps} className="mt-16 flex flex-col items-center gap-5 border-t border-emerald-900/[0.07] pt-12 text-center lg:mt-20">
          <p className="text-base font-medium text-gray-600 sm:text-lg">
            Not sure which one your room needs? A free site visit settles it in ten minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CallLink size="lg" shine ariaLabel="Call for free site visit" className="text-base">
              Free Site Visit
            </CallLink>
            <Link
              href="/services"
              className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/8 px-6 py-4 text-sm font-bold text-emerald-700 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/15 active:scale-95 sm:px-7 sm:text-base"
            >
              Browse Every Service
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        {/* SEO rich text */}
        <div className="sr-only">
          <h2>Best Interior Design Services in Forbesganj, Araria, Bihar</h2>
          <p>
            JK Interior offers premium Gypsum False Ceiling, PVC False Ceiling, Grid Ceiling, Partition Walls, WPC
            Wall Panels, UV Marble Sheets, Modular TV Units, and Artificial Grass installation in Forbesganj, Araria,
            Purnia and across Bihar. All ISI-certified materials, free site visits, and 1-year written warranty.
          </p>
        </div>
      </div>
    </section>
  )
}

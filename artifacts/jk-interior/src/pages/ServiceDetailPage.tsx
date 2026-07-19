import { useParams, Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { SITE_URL } from "@/lib/seo"
import { getServiceContentBySlug } from "@/lib/services-content"
import { SERVICES_SUMMARY, type ServiceHighlight } from "@/lib/services-summary"
import { galleryImages } from "@/lib/gallery-data"
import { slugify } from "@/lib/utils"
import {
  Clock, ShieldCheck, Sparkles, ArrowRight, Phone, HelpCircle, ImageIcon,
  IndianRupee, MapPin, BadgeCheck, Users, CheckCircle2,
} from "lucide-react"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import NotFound from "@/pages/not-found"

const byKind = (list: ServiceHighlight[], kind: ServiceHighlight["kind"]) =>
  list.find((h) => h.kind === kind)

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = getServiceContentBySlug(slug || "")

  if (!service) return <NotFound />

  const summary = SERVICES_SUMMARY.find((s) => s.slug === service.slug)
  const highlights = summary?.highlights ?? []
  const special = byKind(highlights, "special")
  const pricing = byKind(highlights, "pricing")
  const warranty = byKind(highlights, "warranty")
  const suited = byKind(highlights, "suited")
  // The pricing copy is "<rate> — <what's included>"; pull the rate out to feature it big.
  const [priceRate, priceNote] = (pricing?.en ?? "").split(" — ")
  const priceNoteHi = (pricing?.hi ?? "").split(" — ")[1] ?? pricing?.hi ?? ""
  // "Best suited for" reads as a comma list — turn it into scannable chips.
  const suitedChips = (suited?.en ?? "")
    .replace(/\.$/, "")
    .split(", ")
    .map((c) => c.replace(/^and /, "").trim())
    .filter(Boolean)
  const photos = galleryImages.filter((img) => img.category === service.galleryCategory).slice(0, 8)
  const related = service.relatedSlugs
    .map((s) => getServiceContentBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  const waText = `Hi JK Interior, I'd like full details and a free quotation for ${service.name}.`

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.whatItIs,
      provider: {
        "@type": "LocalBusiness",
        name: "JK Interior",
        telephone: "+91-8541849118",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Damaria",
          addressLocality: "Rewahi",
          addressRegion: "Bihar",
          postalCode: "854318",
          addressCountry: "IN",
        },
      },
      areaServed: { "@type": "State", name: "Bihar" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: service.name, item: `${SITE_URL}/services/${service.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ]

  return (
    <main>
      <SeoHead
        title={`${service.name} – Price, Warranty & Details | JK Interior`}
        description={`${service.name} (${service.nameHi}) by JK Interior. Price: ${service.price}. ${service.installTime}. Free site visit, ${service.warranty}. Call +91 8541849118.`}
        canonical={`/services/${service.slug}`}
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] via-white to-white" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute inset-0 grid-texture opacity-20" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-emerald-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/services" className="hover:underline">Services</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700">{service.name}</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5">
                <service.icon className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 sm:text-xs">{service.category}</span>
              </div>

              <h1 className="mb-3 text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {service.name}
              </h1>
              <p className="mb-1 text-base font-bold text-emerald-700 sm:text-lg">{service.nameHi}</p>
              <p className="mb-6 max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
                {service.tagline} <span className="block text-gray-500 mt-1">{service.taglineHi}</span>
              </p>

              <div className="mb-8 flex flex-wrap gap-3">
                <CallLink shine ariaLabel={`Call for ${service.name} quote`}>Get Free Quote</CallLink>
                <WhatsAppLink message={waText} ariaLabel={`WhatsApp for ${service.name}`}>WhatsApp Details</WhatsAppLink>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Sparkles, label: service.price },
                  { icon: ShieldCheck, label: service.warranty },
                  { icon: Clock, label: service.installTime },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                    <Icon className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <img
                  src={service.heroImage}
                  alt={service.heroImageAlt}
                  className="h-72 w-full object-cover sm:h-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="border-y border-emerald-900/[0.06] bg-emerald-50/50 py-5">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 text-center text-xs font-bold text-emerald-800 sm:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4 text-emerald-600" aria-hidden="true" /> 500+ Happy Customers
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" /> ISI-Certified Materials
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" /> 1-Year Written Warranty
          </span>
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <MapPin className="h-4 w-4 text-emerald-600" aria-hidden="true" /> Forbesganj &amp; Araria
          </span>
        </div>
      </section>

      {/* ── The four scannable selling points — the whole pitch ── */}
      {highlights.length > 0 && (
        <section className="relative overflow-hidden py-14 sm:py-16">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fbfaf5] to-white" />
            <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <div className="mb-9 text-center">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-widest text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Why Choose Us
              </span>
              <h2 className="text-2xl font-black text-gray-900 sm:text-3xl lg:text-4xl">
                Why JK Interior for <span className="hero-gradient-text">{service.name}</span>?
              </h2>
              <p className="mt-1.5 text-sm font-semibold text-emerald-700">{service.nameHi}</p>
            </div>

            {/* Feature banner — the hook */}
            {special && (
              <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 p-6 text-white shadow-[0_24px_60px_rgba(6,78,59,0.35)] sm:p-9">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" aria-hidden />
                <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-400/20 blur-2xl" aria-hidden />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
                  <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
                    <Sparkles className="h-7 w-7 text-white" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-200">
                      {special.label} <span className="text-emerald-100/80">· {special.labelHi}</span>
                    </p>
                    <p className="mt-2.5 text-base font-bold leading-relaxed sm:text-lg">{special.en}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-emerald-100/90">{special.hi}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing + Warranty */}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {pricing && (
                <div className="relative overflow-hidden rounded-[28px] border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/70 p-6 shadow-sm sm:p-7">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-amber-400 text-amber-950 shadow-sm">
                      <IndianRupee className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-amber-800">{pricing.label}</p>
                      <p className="text-xs font-bold text-amber-700/90">{pricing.labelHi}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-black leading-tight text-gray-900 sm:text-[28px]">{priceRate}</p>
                  {priceNote && <p className="mt-2.5 text-sm font-medium leading-relaxed text-gray-700">{priceNote}</p>}
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{priceNoteHi}</p>
                </div>
              )}

              {warranty && (
                <div className="relative overflow-hidden rounded-[28px] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/60 p-6 shadow-sm sm:p-7">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                      <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-emerald-800">{warranty.label}</p>
                      <p className="text-xs font-bold text-emerald-600">{warranty.labelHi}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-gray-800 sm:text-base">{warranty.en}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{warranty.hi}</p>
                </div>
              )}
            </div>

            {/* Best suited for — chips */}
            {suited && (
              <div className="mt-5 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-emerald-800">{suited.label}</p>
                    <p className="text-xs font-bold text-emerald-600">{suited.labelHi}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suitedChips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 sm:text-sm"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                      {chip}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{suited.hi}</p>
              </div>
            )}

            {/* Inline CTA so the pitch always ends on an action */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <CallLink shine ariaLabel={`Call for ${service.name} quote`}>Get Free Quote</CallLink>
              <WhatsAppLink message={waText} variant="outline" ariaLabel={`WhatsApp for ${service.name}`}>WhatsApp Us</WhatsAppLink>
            </div>
          </div>
        </section>
      )}

      {/* ── Real project example + photos ── */}
      {photos.length > 0 && (
        <section className="py-14 sm:py-16 bg-gray-50">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-2 text-lg font-black text-gray-900">Real Project: {service.realProject.title}</h2>
              <p className="mb-1 text-sm font-semibold text-emerald-700">{service.realProject.titleHi}</p>
              <p className="text-sm leading-relaxed text-gray-600">{service.realProject.desc}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{service.realProject.descHi}</p>
            </div>

            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-base font-bold text-gray-900">{service.name} Photos ({service.realProject.photos}+ completed)</h3>
              <Link
                href={`/gallery#gallery-${slugify(service.galleryCategory)}`}
                className="shrink-0 inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:underline"
              >
                <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {photos.map((img) => (
                <div key={img.src} className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                  <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <div className="mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {service.faqs.map(({ q, qHi, a, aHi }) => (
              <details key={q} className="group rounded-2xl border border-gray-200 bg-white p-5 open:border-emerald-300 open:shadow-sm">
                <summary className="cursor-pointer list-none">
                  <h3 className="text-base font-bold text-gray-900 group-open:text-emerald-700 inline">{q}</h3>
                  <span className="block text-xs font-semibold text-emerald-700 mt-1">{qHi}</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{aHi}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 sm:py-16 bg-gradient-to-b from-emerald-700 to-emerald-900 text-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-12 text-center">
          <h2 className="mb-2 text-xl font-black sm:text-2xl">Ready for {service.name}?</h2>
          <p className="mb-6 text-emerald-100 text-sm">Free site visit • No obligation • {service.warranty}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallLink icon={false} ariaLabel="Call +91 8541849118" className="bg-white text-emerald-700 shadow hover:bg-emerald-50 hover:shadow">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call +91 8541849118
            </CallLink>
            <WhatsAppLink message={waText} className="shadow hover:shadow">WhatsApp Us</WhatsAppLink>
          </div>
        </div>
      </section>

      {/* ── Related services ── */}
      {related.length > 0 && (
        <section className="py-14 bg-white">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <h2 className="mb-5 text-lg font-black text-gray-900">Related Services</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-semibold text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <r.icon className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    {r.name}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                View All Services
              </Link>
              <Link href="/gallery" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                See Our Gallery
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

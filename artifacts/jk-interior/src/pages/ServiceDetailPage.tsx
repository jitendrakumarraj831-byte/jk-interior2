import { useParams, Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { SITE_URL } from "@/lib/seo"
import {
  getServiceContentBySlug,
  PRICE_DISCLAIMER, PRICE_DISCLAIMER_HI,
  SERVICE_AREA_NOTE, SERVICE_AREA_NOTE_HI,
} from "@/lib/services-content"
import { SERVICES_SUMMARY, type ServiceHighlight } from "@/lib/services-summary"
import { galleryImages } from "@/lib/gallery-data"
import { slugify } from "@/lib/utils"
import {
  Clock, ShieldCheck, Sparkles, ArrowRight, Phone, HelpCircle, ImageIcon,
  IndianRupee, MapPin, BadgeCheck, Users, CheckCircle2, Info, ThumbsUp,
  AlertTriangle, XCircle, ListChecks, Package, Hammer, Lightbulb, Wrench,
  Palette, Scale,
} from "lucide-react"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import NotFound from "@/pages/not-found"

const byKind = (list: ServiceHighlight[], kind: ServiceHighlight["kind"]) =>
  list.find((h) => h.kind === kind)

const TIER_ACCENT: Record<string, string> = {
  Economy: "border-gray-200 bg-white",
  Standard: "border-emerald-300 bg-emerald-50/60 ring-1 ring-emerald-200",
  Premium: "border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50/70",
}

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

  // Pair the English + Hindi list items by index so each point shows bilingually.
  const zip = (en: string[], hi: string[]) => en.map((text, i) => ({ en: text, hi: hi[i] ?? "" }))
  const benefits = zip(service.benefits, service.benefitsHi)
  const limitations = zip(service.limitations, service.limitationsHi)
  const whereUsed = zip(service.whereUsed, service.whereUsedHi)
  const whereNotUsed = zip(service.whereNotUsed, service.whereNotUsedHi)
  const included = zip(service.whatsIncluded, service.whatsIncludedHi)
  const notIncluded = zip(service.whatsNotIncluded, service.whatsNotIncludedHi)

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

      {/* ── The four scannable selling points — the hook ── */}
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

      {/* ══════════════ THE FULL GUIDE ══════════════ */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#fbfaf6] to-white" aria-hidden />
        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12 py-4">

          {/* Section intro */}
          <div className="mb-10 mt-4 text-center">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-widest text-emerald-700">
              <Info className="h-3.5 w-3.5" aria-hidden="true" /> The Full Guide
            </span>
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
              Everything about {service.name}
            </h2>
            <p className="mt-1.5 text-sm font-semibold text-emerald-700">
              {service.nameHi} — पूरी जानकारी एक जगह
            </p>
          </div>

          {/* ── What it is ── */}
          <div className="mb-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700">
                <Info className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-black text-gray-900 sm:text-xl">What is {service.name}?</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">{service.whatItIs}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">{service.whatItIsHi}</p>
          </div>

          {/* ── Price tiers ── */}
          <div className="mb-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-amber-400 text-amber-950">
                <IndianRupee className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-black text-gray-900 sm:text-xl">Transparent Price Tiers</h3>
                <p className="text-xs font-bold text-emerald-700">पारदर्शी रेट — Economy / Standard / Premium</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {service.priceTiers.map((t) => (
                <div key={t.tier} className={`relative flex flex-col rounded-2xl border p-5 ${TIER_ACCENT[t.tier] ?? "border-gray-200 bg-white"}`}>
                  {t.tier === "Standard" && (
                    <span className="absolute -top-2.5 left-5 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">Popular</span>
                  )}
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">{t.tier}</p>
                  <p className="text-xs font-bold text-emerald-700">{t.tierHi}</p>
                  <p className="mt-2 text-xl font-black text-gray-900">{t.range}</p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">{t.desc}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{t.descHi}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
              <p className="text-xs leading-relaxed text-amber-900">{PRICE_DISCLAIMER}</p>
              <p className="mt-2 text-xs leading-relaxed text-amber-800/80">{PRICE_DISCLAIMER_HI}</p>
            </div>
          </div>

          {/* ── Design options ── */}
          {service.designOptions.length > 0 && (
            <div className="mb-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700">
                  <Palette className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-black text-gray-900 sm:text-xl">Design Options You Can Choose</h3>
                  <p className="text-xs font-bold text-emerald-700">आप कौन-कौन से डिज़ाइन चुन सकते हैं</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {service.designOptions.map((d) => (
                  <div key={d.name} className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5">
                    <div className="mb-1.5 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
                      <p className="text-sm font-bold text-gray-900">{d.name}</p>
                    </div>
                    <p className="text-xs font-semibold text-emerald-700">{d.nameHi}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{d.desc}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{d.descHi}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Benefits vs Limitations ── */}
          <div className="mb-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-6 shadow-sm sm:p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <ThumbsUp className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-black text-gray-900">Key Benefits <span className="block text-xs font-bold text-emerald-700">फायदे</span></h3>
              </div>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b.en} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold leading-snug text-gray-800">{b.en}</p>
                      {b.hi && <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{b.hi}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-amber-200 bg-gradient-to-br from-amber-50/70 to-orange-50/40 p-6 shadow-sm sm:p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-amber-500 text-white">
                  <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-black text-gray-900">Honest Limitations <span className="block text-xs font-bold text-amber-700">कमियाँ — साफ-साफ</span></h3>
              </div>
              <ul className="space-y-3">
                {limitations.map((l) => (
                  <li key={l.en} className="flex gap-2.5">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-amber-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold leading-snug text-gray-800">{l.en}</p>
                      {l.hi && <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{l.hi}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Where used / not used ── */}
          <div className="mb-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-black text-gray-900">Best Places to Use <span className="block text-xs font-bold text-emerald-700">कहाँ लगवाएं</span></h3>
              </div>
              <ul className="space-y-2.5">
                {whereUsed.map((w) => (
                  <li key={w.en} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium leading-snug text-gray-800">{w.en}</p>
                      {w.hi && <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{w.hi}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-red-500/10 text-red-600">
                  <XCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-black text-gray-900">Where Not to Use <span className="block text-xs font-bold text-red-500">कहाँ न लगवाएं</span></h3>
              </div>
              <ul className="space-y-2.5">
                {whereNotUsed.map((w) => (
                  <li key={w.en} className="flex gap-2.5">
                    <XCircle className="mt-0.5 h-4 w-4 flex-none text-red-500" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium leading-snug text-gray-800">{w.en}</p>
                      {w.hi && <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{w.hi}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── What's included / not included ── */}
          <div className="mb-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-emerald-200 bg-emerald-50/40 p-6 shadow-sm sm:p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <ListChecks className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-black text-gray-900">In Your Quote <span className="block text-xs font-bold text-emerald-700">कीमत में शामिल</span></h3>
              </div>
              <ul className="space-y-2.5">
                {included.map((c) => (
                  <li key={c.en} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium leading-snug text-gray-800">{c.en}</p>
                      {c.hi && <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{c.hi}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gray-200 text-gray-600">
                  <XCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-black text-gray-900">Billed Separately <span className="block text-xs font-bold text-gray-500">कीमत में शामिल नहीं</span></h3>
              </div>
              <ul className="space-y-2.5">
                {notIncluded.map((c) => (
                  <li key={c.en} className="flex gap-2.5">
                    <XCircle className="mt-0.5 h-4 w-4 flex-none text-gray-400" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium leading-snug text-gray-800">{c.en}</p>
                      {c.hi && <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{c.hi}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Materials we use ── */}
          <div className="mb-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700">
                <Package className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-black text-gray-900 sm:text-xl">Materials We Install</h3>
                <p className="text-xs font-bold text-emerald-700">हम जो मटेरियल लगाते हैं</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.materials.map((m) => (
                <div key={m.name} className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4">
                  <p className="text-sm font-bold text-gray-900">{m.name}</p>
                  <p className="text-xs font-semibold text-emerald-700">{m.nameHi}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{m.detail}</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{m.detailHi}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
              <BadgeCheck className="mt-0.5 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
              <div>
                <p className="text-xs leading-relaxed text-gray-700">{service.brandNote}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{service.brandNoteHi}</p>
              </div>
            </div>
          </div>

          {/* ── How we install it ── */}
          <div className="mb-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700">
                <Hammer className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-black text-gray-900 sm:text-xl">How We Install It</h3>
                <p className="text-xs font-bold text-emerald-700">काम कैसे होता है · {service.installTime}</p>
              </div>
            </div>
            <ol className="space-y-4">
              {service.installSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">{i + 1}</span>
                  <div className="pt-0.5">
                    <p className="text-sm font-bold text-gray-900">{step.title} <span className="font-semibold text-emerald-700">· {step.titleHi}</span></p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.desc}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{step.descHi}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Comparison vs the main alternative ── */}
          {service.comparison.length > 0 && (
            <div className="mb-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700">
                  <Scale className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-black text-gray-900 sm:text-xl">
                    {service.name} vs {service.comparisonWith}
                  </h3>
                  <p className="text-xs font-bold text-emerald-700">
                    {service.nameHi} बनाम {service.comparisonWithHi} — सीधी तुलना
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 pr-3 text-[11px] font-black uppercase tracking-widest text-gray-500">Point</th>
                      <th className="py-3 px-3 text-[11px] font-black uppercase tracking-widest text-emerald-700">{service.name}</th>
                      <th className="py-3 pl-3 text-[11px] font-black uppercase tracking-widest text-gray-500">{service.comparisonWith}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.comparison.map((row) => (
                      <tr key={row.point} className="border-b border-gray-100 last:border-0 align-top">
                        <td className="py-3 pr-3">
                          <p className="text-sm font-bold text-gray-900">{row.point}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{row.pointHi}</p>
                        </td>
                        <td className="py-3 px-3">
                          <p className="flex items-start gap-1.5 text-sm font-semibold text-gray-800">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-emerald-600" aria-hidden="true" />
                            <span>{row.self}</span>
                          </p>
                          <p className="mt-0.5 pl-5 text-xs text-gray-500">{row.selfHi}</p>
                        </td>
                        <td className="py-3 pl-3">
                          <p className="text-sm font-medium text-gray-600">{row.other}</p>
                          <p className="mt-0.5 text-xs text-gray-400">{row.otherHi}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-gray-500">
                Not sure which fits your room and budget? Our free site visit gives you a straight answer.
                <span className="block text-gray-400">किसमें आपके कमरे और बजट का फायदा है, फ्री Site Visit पर साफ़ बता देते हैं।</span>
              </p>
            </div>
          )}

          {/* ── Quick facts ── */}
          <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Clock, label: "Install Time", value: service.installTime },
              { icon: ShieldCheck, label: "Warranty", value: service.warranty },
              { icon: Wrench, label: "Maintenance", value: service.maintenance },
              { icon: ListChecks, label: "Sizes", value: service.sizesThickness },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <Icon className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-gray-500">{label}</p>
                <p className="mt-1 text-xs font-medium leading-relaxed text-gray-700">{value}</p>
              </div>
            ))}
          </div>

          {/* ── Expert tip ── */}
          <div className="mb-2 overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 p-6 text-white shadow-[0_20px_50px_rgba(6,78,59,0.30)] sm:p-8">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                <Lightbulb className="h-6 w-6 text-amber-300" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-200">Expert Tip · एक्सपर्ट सलाह</p>
                <p className="mt-2 text-sm font-bold leading-relaxed sm:text-base">{service.expertTip}</p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-100/90">{service.expertTipHi}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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

          {/* Service area note */}
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
            <MapPin className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
            <div>
              <p className="text-sm leading-relaxed text-gray-700">{SERVICE_AREA_NOTE}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{SERVICE_AREA_NOTE_HI}</p>
            </div>
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

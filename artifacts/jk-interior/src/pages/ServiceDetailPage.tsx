import { useParams, Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { SITE_URL } from "@/lib/seo"
import { getServiceContentBySlug } from "@/lib/services-content"
import { galleryImages } from "@/lib/gallery-data"
import { slugify } from "@/lib/utils"
import {
  MapPin, MapPinOff, CheckCircle2, XCircle, Wrench, Clock, ShieldCheck,
  Sparkles, ArrowRight, Phone, HelpCircle, ImageIcon, Layers as LayersIcon,
  IndianRupee, Ruler, HardHat, BadgeCheck, AlertTriangle, Navigation,
  PackageCheck, PackageX, Lightbulb,
} from "lucide-react"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { PRICE_DISCLAIMER, PRICE_DISCLAIMER_HI } from "@/lib/services-content"
import NotFound from "@/pages/not-found"

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = getServiceContentBySlug(slug || "")

  if (!service) return <NotFound />

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
        title={`${service.name} – Full Guide, Price & Installation | JK Interior`}
        description={`${service.whatItIs.slice(0, 140)} Price: ${service.price}. ${service.installTime}. Free site visit, ${service.warranty}. Call +91 8541849118.`}
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

      {/* ── What it is ── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-5 text-2xl font-black text-gray-900 sm:text-3xl">What is {service.name}?</h2>
          <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">{service.whatItIs}</p>
          <p className="text-base leading-relaxed text-gray-500">{service.whatItIsHi}</p>
        </div>
      </section>

      {/* ── Local Market Pricing ── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="mb-6 flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">Local Market Pricing — Forbesganj &amp; Araria District</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {service.priceTiers.map((tier) => (
              <div
                key={tier.tier}
                className={`rounded-2xl border p-5 shadow-sm ${
                  tier.tier === "Premium" ? "border-amber-300 bg-amber-50/60" : "border-gray-200 bg-gray-50"
                }`}
              >
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                  tier.tier === "Premium" ? "bg-amber-200 text-amber-800" : tier.tier === "Standard" ? "bg-emerald-200 text-emerald-800" : "bg-gray-200 text-gray-700"
                }`}>
                  {tier.tier}
                </span>
                <p className="mt-1 text-xs font-semibold text-gray-500">{tier.tierHi}</p>
                <p className="mt-2 text-lg font-black text-gray-900">{tier.range}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{tier.desc}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{tier.descHi}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" aria-hidden="true" />
            <div>
              <p className="text-xs leading-relaxed text-amber-900">{PRICE_DISCLAIMER}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-amber-700">{PRICE_DISCLAIMER_HI}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <HardHat className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Estimated Labour Cost</p>
              <p className="text-xs leading-relaxed text-gray-600">{service.labourCost}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{service.labourCostHi}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's included / not included ── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <PackageCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="text-lg font-black text-gray-900">What's Included</h2>
              </div>
              <ul className="space-y-3">
                {service.whatsIncluded.map((item, i) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" aria-hidden="true" />
                    <span>
                      {item}
                      <span className="block text-xs text-gray-500 mt-0.5">{service.whatsIncludedHi[i]}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <PackageX className="h-5 w-5 text-red-500" aria-hidden="true" />
                <h2 className="text-lg font-black text-gray-900">What's NOT Included</h2>
              </div>
              <ul className="space-y-3">
                {service.whatsNotIncluded.map((item, i) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <XCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" aria-hidden="true" />
                    <span>
                      {item}
                      <span className="block text-xs text-gray-500 mt-0.5">{service.whatsNotIncludedHi[i]}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Where used / not used ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="text-lg font-black text-gray-900">Where It's Used</h2>
              </div>
              <ul className="space-y-3">
                {service.whereUsed.map((item, i) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" aria-hidden="true" />
                    <span>
                      {item}
                      <span className="block text-xs text-gray-500 mt-0.5">{service.whereUsedHi[i]}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <MapPinOff className="h-5 w-5 text-red-500" aria-hidden="true" />
                <h2 className="text-lg font-black text-gray-900">Where It Should NOT Be Used</h2>
              </div>
              <ul className="space-y-3">
                {service.whereNotUsed.map((item, i) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <XCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" aria-hidden="true" />
                    <span>
                      {item}
                      <span className="block text-xs text-gray-500 mt-0.5">{service.whereNotUsedHi[i]}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits / Limitations ── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 text-lg font-black text-gray-900">Benefits</h2>
              <ul className="space-y-3">
                {service.benefits.map((item, i) => (
                  <li key={item} className="rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-sm font-medium text-gray-800">
                    {item}
                    <span className="block text-xs font-normal text-gray-500 mt-1">{service.benefitsHi[i]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-lg font-black text-gray-900">Limitations</h2>
              <ul className="space-y-3">
                {service.limitations.map((item, i) => (
                  <li key={item} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                    {item}
                    <span className="block text-xs font-normal text-gray-500 mt-1">{service.limitationsHi[i]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Expert recommendation ── */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400/90">
              <Lightbulb className="h-5 w-5 text-amber-900" aria-hidden="true" />
            </div>
            <div>
              <h2 className="mb-2 text-base font-black text-gray-900">Our Recommendation</h2>
              <p className="text-sm leading-relaxed text-gray-700">{service.expertTip}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{service.expertTipHi}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Materials ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="mb-6 flex items-center gap-2">
            <LayersIcon className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">Materials Used</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.materials.map((m) => (
              <div key={m.name} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-1 text-sm font-bold text-gray-900">{m.name}</h3>
                <p className="mb-2 text-xs font-semibold text-emerald-700">{m.nameHi}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{m.detail}</p>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">{m.detailHi}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-3 rounded-xl border border-gray-200 bg-white p-5">
            <Ruler className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Available Sizes &amp; Thickness</p>
              <p className="text-sm leading-relaxed text-gray-600">{service.sizesThickness}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{service.sizesThicknessHi}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
            <BadgeCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-1">Brand &amp; Quality Assurance</p>
              <p className="text-sm leading-relaxed text-gray-700">{service.brandNote}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{service.brandNoteHi}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Installation Process ── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <div className="mb-8 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">Installation Process, Step by Step</h2>
          </div>
          <ol className="space-y-5">
            {service.installSteps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-black text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{step.title}</h3>
                  <p className="text-xs font-semibold text-emerald-700 mb-1">{step.titleHi}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{step.descHi}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Time / Maintenance / Warranty / Labour strip ── */}
      <section className="py-12 sm:py-14 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Installation Time", value: service.installTime },
              { label: "Maintenance", value: service.maintenance },
              { label: "Warranty", value: service.warranty },
              { label: "Labour (approx.)", value: service.labourCostShort },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-emerald-200 bg-white px-3 py-4 text-center shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">{item.label}</p>
                <p className="mt-1.5 text-xs font-semibold text-gray-800 leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service area availability ── */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="flex gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <Navigation className="h-5 w-5 shrink-0 mt-0.5 text-emerald-600" aria-hidden="true" />
            <div>
              <h2 className="mb-2 text-base font-black text-gray-900">Availability in Araria District &amp; Nearby</h2>
              <p className="text-sm leading-relaxed text-gray-600">{service.availability}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{service.availabilityHi}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Real project example + photos ── */}
      {photos.length > 0 && (
        <section className="py-14 sm:py-16 bg-white">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
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
      <section className="py-14 sm:py-16 bg-gray-50">
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

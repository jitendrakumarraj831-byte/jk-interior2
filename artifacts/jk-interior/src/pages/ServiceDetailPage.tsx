import { useParams, Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { SITE_URL } from "@/lib/seo"
import {
  getServiceContentBySlug,
  PRICE_DISCLAIMER,
  SERVICE_AREA_NOTE,
  type DesignOption,
  type InstallStep,
  type PriceTier,
} from "@/lib/services-content"
import { galleryImages, seoAlt } from "@/lib/gallery-data"
import { slugify } from "@/lib/utils"
import {
  Clock, ShieldCheck, Phone, HelpCircle, CheckCircle2, ArrowRight, IndianRupee, ImageIcon,
  AlertTriangle, Layers, Lightbulb, Palette,
} from "lucide-react"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import SwipeRail, { SwipeHint } from "@/components/ui/swipe-rail"
import { PHONE_PRIMARY_DISPLAY, PHONE_SECONDARY, PHONE_SECONDARY_DISPLAY } from "@/lib/business-data"
import NotFound from "@/pages/not-found"

/** Swaps a "/images/foo.webp" path for one of its generated variants (see
 *  scripts/optimize-jk-interior-images.ts), e.g. "-800w.avif". */
const srcVariant = (webpSrc: string, suffix: string) => webpSrc.replace(/\.webp$/, suffix)

/** The hero sits in a 2-col grid above 1024px and full-bleed below it. */
const HERO_SIZES = "(min-width: 1024px) 50vw, calc(100vw - 40px)"

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = getServiceContentBySlug(slug || "")

  if (!service) return <NotFound />

  // Keep it short: only the top few benefits and FAQs.
  const benefits = service.benefits.slice(0, 4)
  const faqs = service.faqs.slice(0, 3)

  // Real photos of this service, pulled from the gallery by category.
  const photos = galleryImages.filter((img) => img.category === service.galleryCategory).slice(0, 6)

  const related = service.relatedSlugs
    .map((s) => getServiceContentBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  const waText = `Hello JK Interior, I would like a free quotation for ${service.name}.`

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.whatItIs,
      provider: {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        // Same @id as the static block in index.html, so the provider resolves
        // to the one JK Interior entity rather than a partial duplicate.
        "@id": `${SITE_URL}/#business`,
        name: "JK Interior",
        telephone: ["+91-8541849118", "+91-8651070831"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-8541849118",
            contactType: "customer service",
            areaServed: "IN-BR",
            availableLanguage: ["English", "Hindi"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+91-8651070831",
            contactType: "sales",
            areaServed: "IN-BR",
            availableLanguage: ["English", "Hindi"],
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Damaria Rewahi",
          addressLocality: "Forbesganj",
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
      mainEntity: faqs.map(({ q, a }) => ({
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
        description={`${service.name} by JK Interior. Price: ${service.price}. ${service.installTime}. Free site visit, ${service.warranty}. Call +91 8541849118 or +91 8651070831.`}
        canonical={`/services/${service.slug}`}
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-14 sm:pb-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f0] via-white to-white" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold-100/40 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-gold-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/services" className="hover:underline">Services</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700">{service.name}</span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Text */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50 px-4 py-1.5">
                <service.icon className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 sm:text-xs">{service.category}</span>
              </div>

              <h1 className="mb-2 text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {service.name}
              </h1>
              <p className="mb-3 text-base font-bold text-gold-700 sm:text-lg">{service.category} · {service.price}</p>
              <p className="mb-6 max-w-2xl text-base font-medium leading-relaxed text-gray-600">
                {service.tagline}
              </p>

              <div className="mb-6 flex flex-wrap gap-3">
                <CallLink shine ariaLabel={`Call for a ${service.name} quotation`}>Get a Free Quotation</CallLink>
                <WhatsAppLink message={waText} ariaLabel={`WhatsApp about ${service.name}`}>Message on WhatsApp</WhatsAppLink>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: IndianRupee, label: service.price },
                  { icon: ShieldCheck, label: service.warranty },
                  { icon: Clock, label: service.installTime },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image — the LCP element on this route, so it is served as
                AVIF/WebP with an 800w variant for phones rather than the full
                desktop-resolution file. */}
            <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              <picture>
                <source
                  srcSet={`${srcVariant(service.heroImage, "-800w.avif")} 800w, ${srcVariant(service.heroImage, ".avif")} 1600w`}
                  sizes={HERO_SIZES}
                  type="image/avif"
                />
                <source
                  srcSet={`${srcVariant(service.heroImage, "-800w.webp")} 800w, ${service.heroImage} 1600w`}
                  sizes={HERO_SIZES}
                  type="image/webp"
                />
                <img
                  src={service.heroImage}
                  alt={service.heroImageAlt}
                  className="h-72 w-full object-cover sm:h-96"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview + key benefits ── */}
      <section className="py-4">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Overview */}
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
              <h2 className="mb-3 text-lg font-black text-gray-900 sm:text-xl">
                What is {service.name}?
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">{service.whatItIs}</p>
            </div>

            {/* Key benefits */}
            <div className="rounded-[28px] border border-gold-200 bg-gradient-to-br from-gold-50 to-gold-50/50 p-6 shadow-sm sm:p-7">
              <h2 className="mb-4 text-lg font-black text-gray-900 sm:text-xl">
                Why Choose It
              </h2>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-gold-600" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-snug text-gray-800">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Transparent pricing tiers ── */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="mb-6 flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-gold-600" aria-hidden="true" />
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">What It Costs</h2>
          </div>

          <div className="hidden gap-4 sm:grid sm:grid-cols-3">
            {service.priceTiers.map((tier) => (
              <PriceTierCard key={tier.tier} tier={tier} />
            ))}
          </div>
        </div>

        <div className="sm:hidden">
          <SwipeRail
            ariaLabel={`${service.name} price tiers`}
            itemClassName="w-[78%]"
            edgePaddingClassName="px-5"
            fadeColor="#ffffff"
            arrows={false}
          >
            {service.priceTiers.map((tier) => (
              <PriceTierCard key={tier.tier} tier={tier} />
            ))}
          </SwipeRail>
          <SwipeHint className="mt-3" />
        </div>

        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900 sm:text-sm">
            {PRICE_DISCLAIMER}
          </p>

          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <dt className="text-[10px] font-black uppercase tracking-widest text-gold-700">Labour Component</dt>
              <dd className="mt-1 text-sm font-bold text-gray-900">{service.labourCostShort}</dd>
              <dd className="mt-1 text-xs leading-relaxed text-gray-600">{service.labourCost}</dd>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <dt className="text-[10px] font-black uppercase tracking-widest text-gold-700">Sizes &amp; Thickness</dt>
              <dd className="mt-1 text-xs leading-relaxed text-gray-600">{service.sizesThickness}</dd>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <dt className="text-[10px] font-black uppercase tracking-widest text-gold-700">Materials We Source</dt>
              <dd className="mt-1 text-xs leading-relaxed text-gray-600">{service.brandNote}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── Design options ── */}
      <section className="bg-gray-50 py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="mb-6 flex items-center gap-2">
            <Palette className="h-5 w-5 text-gold-600" aria-hidden="true" />
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">Design Options</h2>
          </div>
          <div className="hidden gap-4 sm:grid sm:grid-cols-2">
            {service.designOptions.map((option) => (
              <DesignOptionCard key={option.name} option={option} />
            ))}
          </div>
        </div>

        <div className="sm:hidden">
          <SwipeRail
            ariaLabel={`${service.name} design options`}
            itemClassName="w-[78%]"
            edgePaddingClassName="px-5"
            fadeColor="#f9fafb"
            arrows={false}
          >
            {service.designOptions.map((option) => (
              <DesignOptionCard key={option.name} option={option} />
            ))}
          </SwipeRail>
          <SwipeHint className="mt-3" />
        </div>
      </section>

      {/* ── Where it belongs, and where it does not ── */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-gold-200 bg-gold-50/40 p-6 shadow-sm sm:p-7">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-gray-900 sm:text-xl">
                <CheckCircle2 className="h-5 w-5 text-gold-600" aria-hidden="true" />
                Where It Belongs
              </h2>
              <ul className="space-y-2.5">
                {service.whereUsed.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-snug text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-amber-200 bg-amber-50/50 p-6 shadow-sm sm:p-7">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-gray-900 sm:text-xl">
                <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />
                Where We Will Not Fit It
              </h2>
              <ul className="space-y-2.5">
                {service.whereNotUsed.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-snug text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-amber-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
              <h2 className="mb-4 text-lg font-black text-gray-900 sm:text-xl">Included In Our Quotation</h2>
              <ul className="space-y-2.5">
                {service.whatsIncluded.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-snug text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-gold-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
              <h2 className="mb-4 text-lg font-black text-gray-900 sm:text-xl">Quoted Separately</h2>
              <ul className="space-y-2.5">
                {service.whatsNotIncluded.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-snug text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gray-300" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Materials & installation sequence ── */}
      <section className="bg-charcoal-900 py-12 text-white sm:py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="mb-6 flex items-center gap-2">
            <Layers className="h-5 w-5 text-gold-400" aria-hidden="true" />
            <h2 className="text-2xl font-black sm:text-3xl">Materials &amp; Method</h2>
          </div>

          <div className="mb-8 grid gap-3 sm:grid-cols-2">
            {service.materials.map((m) => (
              <div key={m.name} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-sm font-bold text-gold-300">{m.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">{m.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-gold-300">
            How the work runs, step by step
          </h3>
        </div>

        <div className="lg:hidden">
          <SwipeRail
            ariaLabel={`${service.name} installation steps`}
            itemClassName="w-[76%] sm:w-[46%]"
            edgePaddingClassName="px-5"
            fadeColor="#141c26"
            dark
            arrows={false}
          >
            {service.installSteps.map((step, i) => (
              <InstallStepCard key={step.title} step={step} index={i} />
            ))}
          </SwipeRail>
          <SwipeHint dark className="mt-3" />
        </div>

        <div className="mx-auto hidden max-w-5xl px-5 sm:px-6 lg:block lg:px-12">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.installSteps.map((step, i) => (
              <li key={step.title}>
                <InstallStepCard step={step} index={i} />
              </li>
            ))}
          </ol>
        </div>

        <div className="mx-auto mt-8 max-w-5xl px-5 sm:px-6 lg:px-12">
          <p className="flex gap-3 rounded-2xl border border-gold-400/25 bg-gold-400/10 p-4 text-sm leading-relaxed text-gold-100">
            <Lightbulb className="mt-0.5 h-5 w-5 flex-none text-gold-300" aria-hidden="true" />
            <span>
              <span className="block text-[10px] font-black uppercase tracking-widest text-gold-300">
                From our site supervisor
              </span>
              {service.expertTip}
            </span>
          </p>
        </div>
      </section>

      {/* ── Head-to-head comparison ── */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-2 text-2xl font-black text-gray-900 sm:text-3xl">
            {service.name} vs {service.comparisonWith}
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            The comparison customers ask us to make most often, answered honestly.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-gold-50">
                  <th scope="col" className="p-3 text-[11px] font-black uppercase tracking-widest text-gold-800">Point</th>
                  <th scope="col" className="p-3 text-[11px] font-black uppercase tracking-widest text-gold-800">{service.name}</th>
                  <th scope="col" className="p-3 text-[11px] font-black uppercase tracking-widest text-gray-500">{service.comparisonWith}</th>
                </tr>
              </thead>
              <tbody>
                {service.comparison.map((row) => (
                  <tr key={row.point} className="border-t border-gray-200 align-top">
                    <th scope="row" className="p-3 text-sm font-bold text-gray-900">{row.point}</th>
                    <td className="p-3 text-sm text-gray-700">{row.self}</td>
                    <td className="p-3 text-sm text-gray-500">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-gold-700">Recent Project</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{service.realProject.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">{service.realProject.desc}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-gold-700">Availability</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">{service.availability}</p>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">{SERVICE_AREA_NOTE}</p>
            </div>
          </div>

          {service.limitations.length > 0 && (
            <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-3 text-sm font-black uppercase tracking-widest text-gray-700">
                Honest limitations
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {service.limitations.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-snug text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gray-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ── Service photos ── */}
      {photos.length > 0 && (
        <section className="bg-gray-50 py-12 sm:py-14">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-gold-600" aria-hidden="true" />
                <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">{service.name} Photos</h2>
              </div>
              <Link
                href={`/gallery#gallery-${slugify(service.galleryCategory)}`}
                className="shrink-0 inline-flex items-center gap-1 text-sm font-bold text-gold-700 hover:underline"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="hidden gap-3 sm:grid sm:grid-cols-3">
              {photos.map((img) => (
                <div key={img.src} className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                  <img src={img.src} alt={seoAlt(img)} title={seoAlt(img)} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

          <div className="sm:hidden">
            <SwipeRail
              ariaLabel={`${service.name} project photographs`}
              itemClassName="w-[70%]"
              gapClassName="gap-3"
              edgePaddingClassName="px-5"
              fadeColor="#f9fafb"
              arrows={false}
            >
              {photos.map((img) => (
                <div key={img.src} className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                  <img src={img.src} alt={seoAlt(img)} title={seoAlt(img)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
              ))}
            </SwipeRail>
            <SwipeHint className="mt-3" />
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-12">
          <div className="mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-gold-600" aria-hidden="true" />
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-gray-200 bg-white p-5 open:border-gold-300 open:shadow-sm">
                <summary className="cursor-pointer list-none">
                  <h3 className="inline text-base font-bold text-gray-900 group-open:text-gold-700">{q}</h3>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-b from-charcoal-800 to-charcoal-950 py-14 text-white sm:py-16">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-12">
          <h2 className="mb-2 text-xl font-black sm:text-2xl">Ready for {service.name}?</h2>
          <p className="mb-1 text-sm text-gold-100">Free site visit • No obligation • {service.warranty}</p>
          <p className="mb-6 text-sm font-semibold text-white">
            Want exact rates and design photographs for {service.name}? Call either line or message us
            on WhatsApp to book a free site visit.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallLink icon={false} ariaLabel={`Call JK Interior on ${PHONE_PRIMARY_DISPLAY}`} className="bg-white text-gold-700 shadow hover:bg-gold-50 hover:shadow">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {`Call ${PHONE_PRIMARY_DISPLAY}`}
            </CallLink>
            <a
              href={`tel:${PHONE_SECONDARY}`}
              aria-label={`Call JK Interior on ${PHONE_SECONDARY_DISPLAY}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/20 active:scale-95"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {`Call ${PHONE_SECONDARY_DISPLAY}`}
            </a>
            <WhatsAppLink message={waText} className="shadow hover:shadow">Message on WhatsApp</WhatsAppLink>
          </div>
        </div>
      </section>

      {/* ── Related services (light internal links) ── */}
      {related.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <h2 className="mb-4 text-base font-black text-gray-900">Related Services</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
                >
                  <span className="flex items-center gap-2">
                    <r.icon className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                    {r.name}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

/* ── Small presentational pieces shared by the grid and the swipe rails ── */

function PriceTierCard({ tier }: { tier: PriceTier }) {
  const isStandard = tier.tier === "Standard"
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-5 ${
        isStandard ? "border-gold-300 bg-gold-50/60 shadow-sm" : "border-gray-200 bg-white"
      }`}
    >
      <p className="text-[10px] font-black uppercase tracking-widest text-gold-700">{tier.tier}</p>
      <p className="mt-1 text-lg font-black text-gray-900">{tier.range}</p>
      <p className="mt-2 text-xs leading-relaxed text-gray-600">{tier.desc}</p>
    </div>
  )
}

function DesignOptionCard({ option }: { option: DesignOption }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-sm font-black text-gray-900">{option.name}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{option.desc}</p>
    </div>
  )
}

function InstallStepCard({ step, index }: { step: InstallStep; index: number }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-4">
      <span className="mb-2 text-[10px] font-black uppercase tracking-widest text-gold-300">
        Step {String(index + 1).padStart(2, "0")}
      </span>
      <p className="text-sm font-bold text-white">{step.title}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-300">{step.desc}</p>
    </div>
  )
}

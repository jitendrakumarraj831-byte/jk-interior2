import { useParams, Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { SITE_URL } from "@/lib/seo"
import { getServiceContentBySlug } from "@/lib/services-content"
import { galleryImages } from "@/lib/gallery-data"
import { slugify } from "@/lib/utils"
import {
  Clock, ShieldCheck, Phone, HelpCircle, CheckCircle2, ArrowRight, IndianRupee, ImageIcon,
} from "lucide-react"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import NotFound from "@/pages/not-found"

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = getServiceContentBySlug(slug || "")

  if (!service) return <NotFound />

  const benefits = service.benefits
  const benefitsHi = service.benefitsHi

  // Trim "Label — extra detail" phrasing down to just the label for the facts list.
  const head = (s: string) => s.split("—")[0].trim()
  const usedFor = service.whereUsed.slice(0, 2).map(head).join(", ")
  const usedForHi = service.whereUsedHi.slice(0, 2).map(head).join(", ")
  const notFor = service.whereNotUsed.length ? head(service.whereNotUsed[0]) : ""
  const notForHi = service.whereNotUsedHi.length ? head(service.whereNotUsedHi[0]) : ""

  // Basic, service-specific facts shown under the overview.
  const facts = [
    { label: "Best used in", labelHi: "कहाँ लगवाएं", value: usedFor, valueHi: usedForHi },
    { label: "Not suitable for", labelHi: "कहाँ न लगवाएं", value: notFor, valueHi: notForHi },
    { label: "Sizes & thickness", labelHi: "साइज़ व मोटाई", value: service.sizesThickness, valueHi: service.sizesThicknessHi },
    { label: "Maintenance", labelHi: "देखभाल", value: service.maintenance, valueHi: "" },
  ].filter((f) => f.value)

  // The 3 written FAQs plus 2 basic, service-filled ones (price + coverage/booking).
  const faqs = [
    ...service.faqs,
    {
      q: `How much does ${service.name} cost?`,
      qHi: `${service.name} की कीमत कितनी है?`,
      a: `${service.name} runs about ${service.price}. Your final price depends on the design, material grade and total area — and the site visit plus quotation are completely free.`,
      aHi: `${service.name} की कीमत करीब ${service.price} होती है। असली कीमत डिज़ाइन, मटेरियल ग्रेड और कुल एरिया पर तय होती है — और Site Visit व Quotation बिल्कुल फ्री है।`,
    },
    {
      q: "Do you cover my area, and how soon can you start?",
      qHi: "क्या आप मेरे इलाके में आते हैं, और कब शुरू कर सकते हैं?",
      a: `We cover Forbesganj, Araria, Jogbani, Purnia and nearby towns (about an 80 km radius). The work itself usually takes ${service.installTime}. Call or WhatsApp +91 8541849118 to confirm your area and book a free site visit.`,
      aHi: `हम फारबिसगंज, अररिया, जोगबनी, पूर्णिया और आसपास के इलाकों (करीब 80 किमी) में आते हैं। काम में आमतौर पर ${service.installTime} लगता है। अपने इलाके की पुष्टि और फ्री Site Visit के लिए +91 8541849118 पर कॉल या WhatsApp करें।`,
    },
  ]

  // Real photos of this service, pulled from the gallery by category.
  const photos = galleryImages.filter((img) => img.category === service.galleryCategory).slice(0, 6)

  const related = service.relatedSlugs
    .map((s) => getServiceContentBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  const waText = `Hi JK Interior, I'd like a free quote for ${service.name}.`

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
        description={`${service.name} (${service.nameHi}) by JK Interior. Price: ${service.price}. ${service.installTime}. Free site visit, ${service.warranty}. Call +91 8541849118.`}
        canonical={`/services/${service.slug}`}
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-14 sm:pb-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] via-white to-white" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-emerald-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/services" className="hover:underline">Services</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700">{service.name}</span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Text */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5">
                <service.icon className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 sm:text-xs">{service.category}</span>
              </div>

              <h1 className="mb-2 text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {service.name}
              </h1>
              <p className="mb-3 text-base font-bold text-emerald-700 sm:text-lg">{service.nameHi}</p>
              <p className="mb-6 max-w-2xl text-base font-medium leading-relaxed text-gray-600">
                {service.tagline}
                <span className="mt-1 block text-gray-500">{service.taglineHi}</span>
              </p>

              <div className="mb-6 flex flex-wrap gap-3">
                <CallLink shine ariaLabel={`Call for ${service.name} quote`}>Get Free Quote</CallLink>
                <WhatsAppLink message={waText} ariaLabel={`WhatsApp for ${service.name}`}>WhatsApp Us</WhatsAppLink>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: IndianRupee, label: service.price },
                  { icon: ShieldCheck, label: service.warranty },
                  { icon: Clock, label: service.installTime },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              <img
                src={service.heroImage}
                alt={service.heroImageAlt}
                className="h-72 w-full object-cover sm:h-96"
                loading="eager"
              />
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
                What is {service.name}? <span className="block text-xs font-bold text-emerald-700">{service.nameHi} — एक झलक</span>
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">{service.whatItIs}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{service.whatItIsHi}</p>

              {facts.length > 0 && (
                <dl className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                  {facts.map((f) => (
                    <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-3">
                      <dt className="text-xs font-bold text-emerald-700">
                        {f.label}
                        <span className="block font-semibold text-emerald-600/80">{f.labelHi}</span>
                      </dt>
                      <dd className="text-sm text-gray-700">
                        {f.value}
                        {f.valueHi && <span className="mt-0.5 block text-xs text-gray-500">{f.valueHi}</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            {/* Key benefits */}
            <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-6 shadow-sm sm:p-7">
              <h2 className="mb-4 text-lg font-black text-gray-900 sm:text-xl">
                Why Choose It <span className="block text-xs font-bold text-emerald-700">खास बातें</span>
              </h2>
              <ul className="space-y-3">
                {benefits.map((b, i) => (
                  <li key={b} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold leading-snug text-gray-800">{b}</p>
                      {benefitsHi[i] && <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{benefitsHi[i]}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service photos ── */}
      {photos.length > 0 && (
        <section className="bg-gray-50 py-12 sm:py-14">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">{service.name} Photos</h2>
              </div>
              <Link
                href={`/gallery#gallery-${slugify(service.galleryCategory)}`}
                className="shrink-0 inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:underline"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.map((img) => (
                <div key={img.src} className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                  <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-12">
          <div className="mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, qHi, a, aHi }) => (
              <details key={q} className="group rounded-2xl border border-gray-200 bg-white p-5 open:border-emerald-300 open:shadow-sm">
                <summary className="cursor-pointer list-none">
                  <h3 className="inline text-base font-bold text-gray-900 group-open:text-emerald-700">{q}</h3>
                  <span className="mt-1 block text-xs font-semibold text-emerald-700">{qHi}</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{aHi}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-b from-emerald-700 to-emerald-900 py-14 text-white sm:py-16">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-12">
          <h2 className="mb-2 text-xl font-black sm:text-2xl">Ready for {service.name}?</h2>
          <p className="mb-6 text-sm text-emerald-100">Free site visit • No obligation • {service.warranty}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallLink icon={false} ariaLabel="Call +91 8541849118" className="bg-white text-emerald-700 shadow hover:bg-emerald-50 hover:shadow">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call +91 8541849118
            </CallLink>
            <WhatsAppLink message={waText} className="shadow hover:shadow">WhatsApp Us</WhatsAppLink>
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
                  className="group flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <span className="flex items-center gap-2">
                    <r.icon className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
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

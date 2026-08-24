import { useParams, Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { CITIES, getCityBySlug, SITE_URL } from "@/lib/seo"
import { SERVICE_CITY_SERVICES, getServiceCityInfoBySlug } from "@/lib/service-city-data"
import { galleryImages } from "@/lib/gallery-data"
import { slugify } from "@/lib/utils"
import { MapPin, CheckCircle, ArrowRight, Clock, ShieldCheck, Sparkles, Phone } from "lucide-react"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { PHONE_PRIMARY_DISPLAY, PHONE_SECONDARY_DISPLAY } from "@/lib/business-data"

export default function ServiceCityPage() {
  const { service: serviceSlug, city: citySlug } = useParams<{ service: string; city: string }>()
  const service = getServiceCityInfoBySlug(serviceSlug || "")
  const city = getCityBySlug(citySlug || "")

  if (!service || !city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
          <Link href="/services" className="text-gold-700 hover:underline mt-4 block">View all services</Link>
        </div>
      </div>
    )
  }

  const photos = galleryImages.filter((img) => img.category === service.galleryCategory).slice(0, 8)
  const otherServices = SERVICE_CITY_SERVICES.filter((s) => s.slug !== service.slug)
  const otherCities = CITIES.filter((c) => c.slug !== city.slug)

  const waText = `Hi JK Interior, I am interested in ${service.name} in ${city.name}. Please share details and a free quotation.`

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${service.name} in ${city.name}`,
      serviceType: service.name,
      description: service.description,
      provider: {
        "@type": "LocalBusiness",
        name: "JK Interior",
        telephone: "+91-8541849118",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Damaria Rewahi",
          addressLocality: "Forbesganj",
          addressRegion: "Bihar",
          postalCode: "854318",
          addressCountry: "IN",
        },
      },
      areaServed: { "@type": "City", name: city.name, addressRegion: "Bihar" },
      offers: { "@type": "Offer", priceCurrency: "INR", price: service.price.replace(/[^0-9–-]/g, "") || undefined },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: service.name, item: `${SITE_URL}/services/${service.slug}/${city.slug}` },
        { "@type": "ListItem", position: 4, name: city.name, item: `${SITE_URL}/services/${service.slug}/${city.slug}` },
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
        title={`${service.name} in ${city.name} – JK Interior ${city.district} Bihar`}
        description={`${service.name} in ${city.name}, ${city.district} Bihar — ${service.price}. ${service.bestFor}. Free site visit, 1 year warranty. Call +91 8541849118 or +91 8651070831.`}
        canonical={`/services/${service.slug}/${city.slug}`}
        jsonLd={jsonLd}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-36 pb-14 sm:pb-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-br from-[#faf7f0] via-white to-white" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold-100/40 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-gold-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/services" className="hover:underline">Services</Link>
            <span className="text-gray-300">/</span>
            <span>{service.name}</span>
            <span className="text-gray-300">/</span>
            <span>{city.name}</span>
          </div>

          <h1 className="mb-2 text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
            {service.name} in <span className="hero-gradient-text">{city.name}</span>
          </h1>
          <p className="mb-6 text-sm font-semibold text-gray-500 sm:text-base">{service.name} · {city.name}, {city.district} district</p>

          <p className="mb-4 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {service.description} JK Interior installs {service.name} across {city.name}, {city.district} district with free site visits and a written 1-year warranty.
          </p>
          <p className="mb-8 max-w-3xl rounded-xl border-l-2 border-gold-300 bg-gold-50/50 py-3 pl-4 pr-3 text-[15px] leading-relaxed text-gray-700">
            JK Interior carries out {service.name} work across {city.name} and the surrounding area,
            in the {service.price} range, with a free site visit, branded materials and a written
            one-year warranty. For an accurate estimate and design photographs, call or WhatsApp{" "}
            <span className="font-semibold text-gold-800">{PHONE_PRIMARY_DISPLAY}</span> or{" "}
            <span className="font-semibold text-gold-800">{PHONE_SECONDARY_DISPLAY}</span>.
          </p>

          <div className="flex flex-wrap gap-3">
            <CallLink className="shadow-md hover:shadow-md">Call Now</CallLink>
            <WhatsAppLink message={waText} className="shadow-md hover:shadow-md">WhatsApp</WhatsAppLink>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { icon: Sparkles, label: service.price },
              { icon: ShieldCheck, label: service.warranty },
              { icon: Clock, label: service.installTime },
              { icon: MapPin, label: `Serving ${city.name}` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                <Icon className="h-3.5 w-3.5 text-gold-600" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this service */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-6 text-2xl font-black text-gray-900 sm:text-3xl">
            Why {service.name} in {city.name}?
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {service.pros.map((pro) => (
              <div key={pro} className="flex items-start gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-800 shadow-sm">
                <CheckCircle className="h-4 w-4 shrink-0 text-gold-600 mt-0.5" />
                {pro}
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Price", value: service.price },
              { label: "Premium", value: service.premiumPrice },
              { label: "Timeline", value: service.installTime },
              { label: "Maintenance", value: service.maintenance },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-gold-200 bg-gold-50 px-3 py-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-700">{item.label}</p>
                <p className="mt-1 text-xs font-semibold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-gray-500">
            Rates shown are local {city.name}/Araria-district market estimates, not a fixed quote — final pricing depends on your free site visit, design, material quality tier, and project size. See the{" "}
            <Link href={`/services/${service.slug}`} className="font-semibold text-gold-700 hover:underline">
              full {service.name} guide
            </Link>{" "}
            for Economy/Standard/Premium pricing and material specifications.
          </p>
        </div>
      </section>

      {/* Gallery */}
      {photos.length > 0 && (
        <section className="py-14 sm:py-16 bg-white">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
                {service.name} Photos
              </h2>
              <Link
                href={`/gallery#gallery-${slugify(service.galleryCategory)}`}
                className="shrink-0 text-sm font-bold text-gold-700 hover:underline"
              >
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

      {/* City context */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-4 text-2xl font-black text-gray-900 sm:text-3xl">
            Serving {city.name}, {city.district}
          </h2>
          <p className="text-base leading-relaxed text-gray-600 max-w-3xl">{city.uniqueContent}</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-6 text-2xl font-black text-gray-900 sm:text-3xl">
            {service.name} in {city.name} — Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 open:border-gold-300 open:bg-white open:shadow-sm">
                <summary className="cursor-pointer list-none font-bold text-gray-900 group-open:text-gold-700">
                  <h3 className="mb-3 text-base font-bold text-gray-900 group-open:text-gold-700 inline">{q}</h3>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-16 bg-gradient-to-b from-charcoal-800 to-charcoal-950 text-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-12 text-center">
          <h2 className="mb-2 text-xl font-black">
            Ready for {service.name} in {city.name}?
          </h2>
          <p className="mb-1 text-gold-100 text-sm">Free site visit • No obligation • {service.warranty}</p>
          <p className="mb-6 text-sm font-semibold text-white">
            Book a free site visit for {service.name} in {city.name} and receive an accurate
            quotation — call either line or message us on WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallLink icon={false} ariaLabel="Call +91 8541849118" className="bg-white text-gold-700 shadow hover:bg-gold-50 hover:shadow">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call +91 8541849118
            </CallLink>
            <WhatsAppLink message={waText} className="shadow hover:shadow">WhatsApp Us</WhatsAppLink>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-4 text-lg font-black text-gray-900">
            Other Services in {city.name}
          </h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/${city.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700 transition-colors"
              >
                <s.icon className="h-3 w-3" />
                {s.name}
              </Link>
            ))}
          </div>

          <h2 className="mb-4 text-lg font-black text-gray-900">
            {service.name} in Other Cities
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/services/${service.slug}/${c.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700 transition-colors"
              >
                <MapPin className="h-3 w-3" />
                {c.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline">
              <ArrowRight className="h-4 w-4" />
              View All Services
            </Link>
            <Link href={`/cities/${city.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline">
              <ArrowRight className="h-4 w-4" />
              {city.name} Overview
            </Link>
            <Link href="/gallery" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline">
              <ArrowRight className="h-4 w-4" />
              See Our Gallery
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

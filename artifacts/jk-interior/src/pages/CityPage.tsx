import { useParams, Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { CITIES, SERVICES_LIST, getCityBySlug, SITE_URL } from "@/lib/seo"
import { SERVICE_CITY_SERVICES } from "@/lib/service-city-data"
import { MapPin, CheckCircle, ArrowRight, Star, Clock, Phone } from "lucide-react"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"

export default function CityPage() {
  const { city: citySlug } = useParams<{ city: string }>()
  const city = getCityBySlug(citySlug || "")

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">City not found</h1>
          <Link href="/" className="text-emerald-700 hover:underline mt-4 block">Go home</Link>
        </div>
      </div>
    )
  }

  const otherCities = CITIES.filter((c) => c.slug !== city.slug)

  const cityJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "JK Interior",
    description: city.description,
    url: `${SITE_URL}/cities/${city.slug}`,
    telephone: ["+91-8541849118", "+91-8651070831"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Damaria Rewahi",
      addressLocality: "Forbesganj",
      addressRegion: "Bihar",
      postalCode: "854318",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      addressRegion: "Bihar",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.3001",
      longitude: "87.2533",
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

      <h1 className="sr-only">
        Interior Designer in {city.name} – JK Interior Bihar
      </h1>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-28 pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] via-white to-white" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute inset-0 grid-texture opacity-20" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <MapPin className="h-4 w-4" />
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <span>Cities</span>
            <span className="text-gray-300">/</span>
            <span>{city.name}</span>
          </div>

          <h2 className="mb-4 text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
            Interior Designer in{" "}
            <span className="hero-gradient-text">{city.name}</span>
          </h2>

          <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            JK Interior provides expert PVC false ceiling, gypsum ceiling, WPC wall panel and interior
            design services in {city.name}, {city.district} Bihar. Free site visit. Call +91 8541849118.
          </p>

          <div className="flex flex-wrap gap-3">
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
              className="border-emerald-300 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100"
            >
              <Clock className="h-4 w-4" aria-hidden="true" />
              Free Site Visit
            </WhatsAppLink>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { icon: "🧾", label: "Free Quotation" },
              { icon: "✅", label: "500+ Projects" },
              { icon: "🛡️", label: "1 Year Warranty" },
              { icon: "📍", label: `Serving ${city.name}` },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City description */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-4 text-2xl font-black text-gray-900 sm:text-3xl">
            Interior Design Services in <span className="text-emerald-700">{city.name}</span>
          </h2>
          <p className="text-base leading-relaxed text-gray-600 max-w-3xl">
            {city.uniqueContent}
          </p>
          <p className="mt-4 rounded-xl border-l-2 border-emerald-300 bg-emerald-50/50 py-3 pl-4 pr-3 text-[15px] leading-relaxed text-gray-700 max-w-3xl">
            <span className="font-bold text-emerald-800">{city.nameHi} में इंटीरियर का काम?</span>{" "}
            JK Interior {city.nameHi} और आसपास के इलाकों में PVC व जिप्सम फॉल्स सीलिंग, WPC वॉल पैनल,
            UV मार्बल शीट, TV यूनिट और पूरा घर/ऑफिस इंटीरियर करती है — फ्री साइट विज़िट, ISI-ब्रांडेड
            मटेरियल और 1 साल की लिखित वारंटी के साथ। सही रेट और डिज़ाइन फोटो के लिए{" "}
            <span className="font-semibold text-emerald-800">+91&nbsp;85418&nbsp;49118</span> पर कॉल या WhatsApp करें।
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-3 text-2xl font-black text-gray-900 sm:text-3xl">
            Our Services in {city.name}
          </h2>
          <p className="mb-8 text-sm text-gray-500">Everything you need for a beautiful interior — in one place.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {SERVICES_LIST.map((service) => {
              const linked = SERVICE_CITY_SERVICES.find((s) => s.name === service)
              if (linked) {
                return (
                  <Link
                    key={service}
                    href={`/services/${linked.slug}/${city.slug}`}
                    className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                    {service}
                  </Link>
                )
              }
              return (
                <div
                  key={service}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm"
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                  {service}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {city.faqs.length > 0 && (
        <section className="py-14 sm:py-16 bg-white">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <h2 className="mb-3 text-2xl font-black text-gray-900 sm:text-3xl">
              {city.name} – अक्सर पूछे जाने वाले सवाल
            </h2>
            <p className="mb-8 text-sm text-gray-500">Common questions from our {city.name} customers.</p>
            <div className="space-y-4">
              {city.faqs.map(({ q, a }) => (
                <details key={q} className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 open:border-emerald-300 open:bg-white open:shadow-sm">
                  <summary className="cursor-pointer list-none font-bold text-gray-900 group-open:text-emerald-700">
                    <h3 className="mb-3 text-base font-bold text-gray-900 group-open:text-emerald-700 inline">{q}</h3>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 sm:py-16 bg-gradient-to-b from-emerald-700 to-emerald-900 text-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-12 text-center">
          <h2 className="mb-2 text-xl font-black">
            Ready to Transform Your {city.name} Home?
          </h2>
          <p className="mb-1 text-emerald-100 text-sm">Free site visit • No obligation • Same-week slots available</p>
          <p className="mb-6 text-sm font-semibold text-white">
            {city.nameHi} में फ्री साइट विज़िट और सही कोटेशन के लिए अभी कॉल या WhatsApp करें।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallLink
              icon={false}
              ariaLabel="Call +91 8541849118"
              className="bg-white text-emerald-700 shadow hover:bg-emerald-50 hover:shadow"
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
        </div>
      </section>

      {/* Other cities */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-5 text-lg font-black text-gray-900">
            Explore JK Interior
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                <MapPin className="h-3 w-3" />
                {c.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline"
            >
              <ArrowRight className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline"
            >
              <ArrowRight className="h-4 w-4" />
              View All Services
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline"
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

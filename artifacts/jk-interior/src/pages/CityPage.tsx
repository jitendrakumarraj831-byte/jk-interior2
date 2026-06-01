import { useParams, Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { CITIES, SERVICES_LIST, getCityBySlug, SITE_URL } from "@/lib/seo"
import { Phone, MessageCircle, MapPin, CheckCircle, ArrowRight, Star, Clock } from "lucide-react"

export default function CityPage() {
  const { city: citySlug } = useParams<{ city: string }>()
  const city = getCityBySlug(citySlug || "")

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">City not found</h1>
          <Link href="/" className="text-blue-600 hover:underline mt-4 block">Go home</Link>
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
    telephone: "+91-8651070831",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Forbesganj Dumariya",
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

  const faqJsonLd = city.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  } : undefined

  return (
    <>
      <SeoHead
        title={`Interior Designer in ${city.name} – JK Interior ${city.district} Bihar`}
        description={`JK Interior provides expert PVC false ceiling, gypsum ceiling, WPC wall panel and interior design services in ${city.name}, ${city.district} Bihar. Free site visit. Call +91 8651070831.`}
        canonical={`/cities/${city.slug}`}
        jsonLd={cityJsonLd}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Navbar />

      <h1 className="sr-only">
        Interior Designer in {city.name} – JK Interior Bihar
      </h1>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-28 pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0f7ff] via-white to-white" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-blue-600">
            <MapPin className="h-4 w-4" />
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-gray-300">/</span>
            <span>Cities</span>
            <span className="text-gray-300">/</span>
            <span>{city.name}</span>
          </div>

          <h2 className="mb-4 text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
            Interior Designer in{" "}
            <span className="gold-text">{city.name}</span>
          </h2>

          <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            JK Interior provides expert PVC false ceiling, gypsum ceiling, WPC wall panel and interior
            design services in {city.name}, {city.district} Bihar. Free site visit. Call +91 8651070831.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+918651070831"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href={`https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20interior%20design%20work%20in%20${encodeURIComponent(city.name)}.%20Please%20arrange%20a%20free%20site%20visit.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#1ebe5d] active:scale-95 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20a%20free%20site%20visit%20in%20${encodeURIComponent(city.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700 hover:bg-emerald-100 active:scale-95 transition-all"
            >
              <Clock className="h-4 w-4" />
              Free Site Visit
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { icon: "⭐", label: "5-Star Rated" },
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
            {SERVICES_LIST.map((service) => (
              <div
                key={service}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm"
              >
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                {service}
              </div>
            ))}
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
          <p className="mb-6 text-emerald-100 text-sm">Free site visit • No obligation • Same-week slots available</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+918651070831"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-700 shadow hover:bg-emerald-50 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call +91 8651070831
            </a>
            <a
              href={`https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20a%20free%20site%20visit%20in%20${encodeURIComponent(city.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow hover:bg-[#1ebe5d] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
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
    </>
  )
}

import { useParams, Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CITIES, SERVICES_LIST, getCityBySlug } from "@/lib/seo"
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

  return (
    <>
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
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-500 active:scale-95"
            >
              <Phone className="h-4 w-4" />
              Call Now: +91 8651070831
            </a>
            <a
              href={`https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20services%20in%20${encodeURIComponent(city.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white transition-all active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 font-semibold text-gray-700">4.9</span>
            </div>
            <span>·</span>
            <span>50+ projects in {city.district}</span>
            <span>·</span>
            <span>Free site visit</span>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="relative overflow-hidden bg-[#f8fbff] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-4 text-2xl font-black text-gray-900 sm:text-3xl">
            JK Interior in {city.name} – {city.nameHi}
          </h2>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-600">
            {city.uniqueContent}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Free site visit & measurement',
              'ISI-certified branded materials',
              '1-year written warranty',
              'On-time project delivery',
              'Transparent pricing — no hidden charges',
              'Experienced installation team',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative overflow-hidden bg-[#f8fbff] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-3 text-2xl font-black text-gray-900 sm:text-3xl">
            Our Services in {city.name}
          </h2>
          <p className="mb-10 text-base text-gray-500">
            All services available for residential &amp; commercial projects in {city.name},{" "}
            {city.district} district.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {SERVICES_LIST.map((service) => (
              <Link
                key={service}
                href="/services"
                className="group flex items-center gap-2 rounded-xl border border-blue-100 bg-white p-4 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-blue-400 transition-transform group-hover:translate-x-0.5" />
                {service}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition-all hover:border-blue-400 hover:bg-blue-100"
            >
              View All Services in Detail
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {city.faqs && city.faqs.length > 0 && (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
            <h2 className="mb-3 text-2xl font-black text-gray-900 sm:text-3xl">
              Frequently Asked Questions – {city.name}
            </h2>
            <p className="mb-10 text-base text-gray-500">
              Common questions about interior design services in {city.name}
            </p>

            <div className="space-y-4">
              {city.faqs.map((faq: { q: string; a: string }, i: number) => (
                <div key={i} className="rounded-2xl border border-gray-200 bg-[#f8fbff] p-6">
                  <h3 className="mb-3 text-base font-bold text-gray-900">{faq.q}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                See all FAQs
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Other Cities */}
      <section className="relative overflow-hidden bg-[#f0f7ff] py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-2 text-xl font-black text-gray-900">
            We Also Serve These Cities
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            JK Interior provides interior design and false ceiling services across{" "}
            {city.district} district and neighbouring areas.
          </p>

          <div className="flex flex-wrap gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition-all hover:border-blue-400 hover:bg-blue-50"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-lg font-black text-gray-900">Explore JK Interior</h2>
              <div className="flex flex-col gap-3">
                {[
                  { href: '/gallery', label: 'View Project Gallery' },
                  { href: '/services', label: 'All Services' },
                  { href: '/about', label: 'About Us' },
                  { href: '/contact', label: 'Contact & Free Quote' },
                  { href: '/faq', label: 'FAQs' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-blue-700"
                  >
                    <ArrowRight className="h-4 w-4 text-blue-400 transition-transform group-hover:translate-x-0.5" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-[#f0f7ff] p-6">
              <h2 className="mb-5 text-lg font-black text-gray-900">
                Contact JK Interior for {city.name}
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
                  Forbesganj Dumariya, Araria, Bihar – 854318
                </div>
                <a
                  href="tel:+918651070831"
                  className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-blue-600" />
                  +91 8651070831
                </a>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-500">
                  <Clock className="h-4 w-4 shrink-0 text-blue-600" />
                  Mon–Sat: 9:00 AM – 7:00 PM
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+918651070831"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-500 active:scale-95"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20services%20in%20${encodeURIComponent(city.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition-all active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

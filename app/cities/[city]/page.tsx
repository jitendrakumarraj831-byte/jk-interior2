import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CITIES, SERVICES_LIST, SITE_URL, getCityBySlug } from '@/lib/seo'
import { Phone, MessageCircle, MapPin, CheckCircle, ArrowRight, Star, Clock } from 'lucide-react'

export async function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)
  if (!city) return {}

  const title = `Interior Designer in ${city.name} | False Ceiling & PVC Ceiling – JK Interior Bihar`
  const description = `JK Interior provides expert PVC false ceiling, gypsum ceiling, WPC wall panel and interior design services in ${city.name}, ${city.district} Bihar. Free site visit. Call +91 8651070831.`

  return {
    title,
    description,
    keywords: city.keywords.join(', '),
    alternates: {
      canonical: `${SITE_URL}/cities/${city.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/cities/${city.slug}`,
      siteName: 'JK Interior',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1376,
          height: 677,
          alt: `JK Interior – Interior Designer in ${city.name}, ${city.district} Bihar`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)
  if (!city) notFound()

  const otherCities = CITIES.filter((c) => c.slug !== city.slug)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${SITE_URL}/cities` },
      {
        '@type': 'ListItem',
        position: 3,
        name: city.name,
        item: `${SITE_URL}/cities/${city.slug}`,
      },
    ],
  }

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'GeneralContractor'],
    '@id': `${SITE_URL}/#business`,
    name: 'JK Interior',
    url: SITE_URL,
    telephone: ['+91-8651070831', '+91-8541849118'],
    email: 'jkinteriorofficial@gmail.com',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Forbesganj Dumariya',
      addressLocality: 'Forbesganj',
      addressRegion: 'Bihar',
      postalCode: '854318',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      addressRegion: city.district,
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Interior Design & False Ceiling Services in ${city.name}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'JK Interior',
      url: SITE_URL,
      telephone: '+91-8651070831',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      addressRegion: city.district,
    },
    description: city.description,
    serviceType: 'Interior Design and False Ceiling',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Interior Services in ${city.name}`,
      itemListElement: SERVICES_LIST.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${s} in ${city.name}`,
          areaServed: city.name,
        },
      })),
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      <h1 className="sr-only">
        Interior Designer &amp; False Ceiling Contractor in {city.name}, {city.district} Bihar – PVC
        Ceiling, Gypsum Ceiling, WPC Wall Panel by JK Interior
      </h1>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#f0f7ff] pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(37,99,235,0.07),transparent)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Service Areas</span>
            <span>/</span>
            <span className="text-blue-700">{city.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-widest text-blue-700">
              <MapPin className="h-3 w-3" />
              {city.district} District · Bihar
            </span>
            {city.distance !== 'Main Office' && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-gray-600">
                <Clock className="h-3 w-3" />
                {city.distance}
              </span>
            )}
          </div>

          <h2 className="mb-5 text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Interior Designer in{' '}
            <span className="text-blue-700">{city.name}</span>
            <br />
            <span className="text-xl font-bold text-gray-500 sm:text-2xl">
              False Ceiling · PVC Panel · Interior Design
            </span>
          </h2>

          <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {city.description} Serving homes, offices, and shops in {city.name} with 1-year
            written warranty and ISI-certified materials.
          </p>

          {/* Stats strip */}
          <div className="mb-8 flex flex-wrap gap-4">
            {[
              { val: '500+', lbl: 'Projects Done' },
              { val: '8+', lbl: 'Years Experience' },
              { val: '1 Yr', lbl: 'Written Warranty' },
              { val: '100%', lbl: 'Satisfaction' },
            ].map((s) => (
              <div
                key={s.lbl}
                className="flex flex-col items-center rounded-2xl border border-blue-100 bg-white px-5 py-3 shadow-sm"
              >
                <span className="text-xl font-black text-blue-700">{s.val}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  {s.lbl}
                </span>
              </div>
            ))}
          </div>

          {/* Star rating */}
          <div className="mb-8 flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm font-semibold text-gray-700">
              4.9/5 · Trusted by 500+ families across Bihar
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+918651070831"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(37,99,235,0.35)] transition-all hover:bg-blue-500 active:scale-95"
            >
              <Phone className="h-4 w-4" />
              Free Site Visit in {city.name}
            </a>
            <a
              href={`https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20need%20interior%20design%20services%20in%20${encodeURIComponent(city.name)}%2C%20${encodeURIComponent(city.district)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,205,102,0.3)] transition-all hover:shadow-[0_4px_24px_rgba(37,205,102,0.45)] active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp करें
            </a>
          </div>
        </div>
      </section>

      {/* ── City-specific content ── */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
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
              '5-year written warranty',
              'On-time project delivery',
              'Transparent pricing — no hidden charges',
              'Experienced installation team',
            ].map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4"
              >
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services in this city ── */}
      <section className="relative overflow-hidden bg-[#f8fbff] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-3 text-2xl font-black text-gray-900 sm:text-3xl">
            Our Services in {city.name}
          </h2>
          <p className="mb-10 text-base text-gray-500">
            All services available for residential &amp; commercial projects in {city.name},{' '}
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

      {/* ── FAQ ── */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-3 text-2xl font-black text-gray-900 sm:text-3xl">
            Frequently Asked Questions – {city.name}
          </h2>
          <p className="mb-10 text-base text-gray-500">
            Common questions about interior design services in {city.name}
          </p>

          <div className="space-y-4">
            {city.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-[#f8fbff] p-6"
              >
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

      {/* ── Internal Links — Other Cities ── */}
      <section className="relative overflow-hidden bg-[#f0f7ff] py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-2 text-xl font-black text-gray-900">
            We Also Serve These Cities
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            JK Interior provides interior design and false ceiling services across{' '}
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

      {/* ── Quick Links & CTA ── */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Quick links */}
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

            {/* Contact info */}
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

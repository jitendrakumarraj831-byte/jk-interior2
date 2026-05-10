import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import FAQSection from '@/components/faq-section'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Phone, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ – JK Interior | False Ceiling & Interior Design Questions Answered',
  description:
    'Frequently asked questions about PVC false ceiling, gypsum ceiling, WPC wall panel, interior design pricing, warranty, and service areas in Forbesganj, Araria, Bihar. Get answers from JK Interior.',
  keywords: [
    'JK Interior FAQ',
    'false ceiling price Bihar',
    'PVC ceiling cost Forbesganj',
    'gypsum ceiling FAQ Araria',
    'interior design questions Bihar',
    'false ceiling warranty',
    'interior design service areas Bihar',
    'WPC wall panel FAQ',
    'interior contractor FAQ Forbesganj',
    'false ceiling near me FAQ',
  ].join(', '),
  alternates: {
    canonical: 'https://www.jkinterior.online/faq',
  },
  openGraph: {
    title: 'FAQ – JK Interior | False Ceiling & Interior Design Questions Answered',
    description:
      'All your questions about PVC false ceiling, gypsum ceiling, WPC wall panel and interior design services in Forbesganj, Araria, Bihar answered by JK Interior.',
    url: 'https://www.jkinterior.online/faq',
    siteName: 'JK Interior',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.jkinterior.online/og-image.png',
        width: 1376,
        height: 677,
        alt: 'JK Interior FAQ – False Ceiling & Interior Design Forbesganj Bihar',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ – JK Interior | False Ceiling & Interior Design Questions',
    description:
      'PVC ceiling, gypsum ceiling and interior design FAQs answered. Serving Forbesganj, Araria, Purnia and all Bihar.',
    images: ['https://www.jkinterior.online/og-image.png'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jkinterior.online' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://www.jkinterior.online/faq' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'JK Interior कौन-कौन सी services provide करती है?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JK Interior provides PVC False Ceiling, Gypsum Ceiling, WPC Wall Paneling, UV Marble Sheet, Modular TV Unit, Charcoal Panel, Louvers Panel, ACP Exterior, Complete Interior Design, Bedroom Interior, Office Interior, and Kitchen Interior services across Forbesganj, Araria, Purnia and surrounding Bihar areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'PVC false ceiling की cost क्या होती है Forbesganj में?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PVC ceiling cost Araria/Forbesganj में typically ₹70-₹120 per sq.ft होती है, जो panel quality, design और lighting के अनुसार vary करती है। Free site visit और detailed quotation के लिए +91 8651070831 पर call करें।',
      },
    },
    {
      '@type': 'Question',
      name: 'क्या आप free site visit provide करते हैं?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'हां, JK Interior free expert site visit और detailed quotation provide करती है — बिना किसी obligation के। हम Forbesganj, Araria और surrounding Bihar areas में free site visit देते हैं।',
      },
    },
    {
      '@type': 'Question',
      name: 'Installation कितने दिनों में complete होती है?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Room size और service के according, एक standard room की installation 1-3 days में complete होती है। हम on-time delivery guarantee करते हैं।',
      },
    },
    {
      '@type': 'Question',
      name: 'क्या materials waterproof हैं?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'हां, हमारे सभी products — PVC panels, WPC boards, और UV marble sheets — 100% waterproof हैं। ये Bihar के monsoon season को आसानी से withstand करते हैं। ISI-certified और branded materials use होते हैं।',
      },
    },
    {
      '@type': 'Question',
      name: 'Warranty कितनी मिलती है?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JK Interior हर project पर 5 साल की written warranty provide करती है। यह warranty materials और workmanship दोनों को cover करती है।',
      },
    },
    {
      '@type': 'Question',
      name: 'आप कौन-कौन से areas में service करते हैं?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'हम Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul और Purnia में service provide करते हैं — Araria, Supaul और Purnia districts को cover करते हैं।',
      },
    },
    {
      '@type': 'Question',
      name: 'Payment के कौन-से options available हैं?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'हम Cash, UPI (GPay, PhonePe, Paytm), और Bank Transfer accept करते हैं। कोई hidden charges नहीं — transparent pricing हमेशा।',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cost of gypsum ceiling in Bihar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gypsum ceiling in Bihar (Araria, Forbesganj) typically costs ₹80–₹150 per sq.ft depending on design complexity, cove lighting, and pop work. Contact JK Interior on +91 8651070831 for a free detailed quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is WPC wall panel and why should I choose it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WPC (Wood Plastic Composite) wall panels are 100% waterproof, termite-proof, and fire-resistant wall cladding panels that give a premium wood-like finish. They are low-maintenance, durable, and perfect for living rooms, bedrooms, and TV walls in Bihar\'s climate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide interior services for offices and shops?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, JK Interior provides complete office interior, shop interior, false ceiling, wall paneling, and ACP exterior cladding for commercial establishments across Forbesganj, Araria, Purnia, and all of Bihar.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact JK Interior for a free quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can call or WhatsApp JK Interior at +91 8651070831 or +91 8541849118. You can also fill the contact form on our website. We offer free site visits and detailed quotations without any obligation.',
      },
    },
  ],
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      <h1 className="sr-only">
        Frequently Asked Questions – JK Interior False Ceiling & Interior Design Services in Forbesganj, Araria Bihar
      </h1>

      <div className="pt-28" />

      <FAQSection />

      {/* Extended English FAQ */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] to-white" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-10 text-2xl font-black text-gray-900 sm:text-3xl">
            More Questions About Our Services
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'What is the cost of gypsum ceiling in Bihar?',
                a: 'Gypsum ceiling in Bihar (Araria, Forbesganj) typically costs ₹80–₹150 per sq.ft depending on design complexity, cove lighting, and pop work. Contact JK Interior on +91 8651070831 for a free detailed quote.',
              },
              {
                q: 'What is WPC wall panel and why should I choose it?',
                a: 'WPC (Wood Plastic Composite) wall panels are 100% waterproof, termite-proof, and fire-resistant wall cladding panels that give a premium wood-like finish. They are low-maintenance, durable, and perfect for living rooms, bedrooms, and TV walls in Bihar\'s climate.',
              },
              {
                q: 'Do you provide interior services for offices and shops?',
                a: 'Yes, JK Interior provides complete office interior, shop interior, false ceiling, wall paneling, and ACP exterior cladding for commercial establishments across Forbesganj, Araria, Purnia, and all of Bihar.',
              },
              {
                q: 'How can I contact JK Interior for a free quote?',
                a: 'You can call or WhatsApp JK Interior at +91 8651070831 or +91 8541849118. You can also fill the contact form on our website. We offer free site visits and detailed quotations without any obligation.',
              },
              {
                q: 'What is the difference between PVC ceiling and gypsum ceiling?',
                a: 'PVC ceiling is 100% waterproof, lightweight, and best for kitchens, bathrooms, and humid areas. Gypsum ceiling allows intricate pop designs, cove lighting, and a smoother finish — ideal for living rooms and bedrooms. JK Interior provides both types across Bihar.',
              },
              {
                q: 'Do you provide UV marble sheet services in Bihar?',
                a: 'Yes, JK Interior provides UV marble sheet installation for wall cladding in Bihar. UV marble sheets give a luxurious marble-like appearance without the cost or weight of real marble. They are waterproof and easy to maintain.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white p-6"
              >
                <h3 className="mb-3 text-base font-bold text-gray-900">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Internal Links */}
          <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-blue-800">
              Explore More
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { href: '/services', label: 'All Services' },
                { href: '/gallery', label: 'Project Gallery' },
                { href: '/about', label: 'About JK Interior' },
                { href: '/contact', label: 'Get Free Quote' },
                { href: '/cities/forbesganj', label: 'Forbesganj' },
                { href: '/cities/araria', label: 'Araria' },
                { href: '/cities/purnia', label: 'Purnia' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:border-blue-400 hover:bg-blue-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="mb-5 text-gray-500 text-sm">Still have questions? Talk to us directly.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="tel:+918651070831"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-500 active:scale-95"
              >
                <Phone className="h-4 w-4" />
                Call: +91 8651070831
              </a>
              <a
                href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,205,102,0.25)] transition-all hover:shadow-[0_4px_24px_rgba(37,205,102,0.4)] active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

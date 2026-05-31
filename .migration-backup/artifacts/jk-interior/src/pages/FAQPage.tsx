import { Link } from "wouter"
import Navbar from "@/components/navbar"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import { Phone, MessageCircle } from "lucide-react"

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <h1 className="sr-only">
        Frequently Asked Questions – JK Interior False Ceiling &amp; Interior Design Services in Forbesganj, Araria Bihar
      </h1>
      <div className="pt-28" />
      <FAQSection />

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
                a: "WPC (Wood Plastic Composite) wall panels are 100% waterproof, termite-proof, and fire-resistant wall cladding panels that give a premium wood-like finish. They are low-maintenance, durable, and perfect for living rooms, bedrooms, and TV walls in Bihar's climate.",
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
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="mb-3 text-base font-bold text-gray-900">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>

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

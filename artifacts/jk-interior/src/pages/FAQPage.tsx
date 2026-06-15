import { Link } from "wouter"
import Navbar from "@/components/navbar"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import { Phone, MessageCircle } from "lucide-react"
import SeoHead from "@/components/seo-head"

export default function FAQPage() {
  return (
    <>
      <SeoHead
        title="FAQs – False Ceiling & Interior Design Services in Forbesganj, Araria Bihar"
        description="Frequently asked questions about PVC false ceiling, gypsum ceiling, WPC wall panel, UV marble sheet and interior design services by JK Interior in Forbesganj, Araria, Bihar. Cost, warranty, installation time and more."
        canonical="/faq"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "PVC false ceiling की cost क्या है?",
              acceptedAnswer: { "@type": "Answer", text: "JK Interior में PVC false ceiling ₹70–₹120 per sq.ft से शुरू होती है। Design और lighting के अनुसार rate vary करता है। Free quotation के लिए call करें: +91 8651070831।" }
            },
            {
              "@type": "Question",
              name: "Gypsum ceiling कितने दिन में ready होती है?",
              acceptedAnswer: { "@type": "Answer", text: "एक standard room की gypsum ceiling 1–3 days में complete होती है। Larger projects के लिए detailed timeline पहले share की जाती है।" }
            },
            {
              "@type": "Question",
              name: "क्या JK Interior free site visit देती है?",
              acceptedAnswer: { "@type": "Answer", text: "हाँ, JK Interior Forbesganj, Araria और surrounding areas में free expert site visit provide करती है। हमारी team आपके घर/दुकान आकर exact measurements और estimate देती है।" }
            },
            {
              "@type": "Question",
              name: "WPC wall panel क्या होता है?",
              acceptedAnswer: { "@type": "Answer", text: "WPC (Wood Plastic Composite) wall panel एक waterproof और durable wall cladding material है। यह termite-proof, moisture-resistant और easy to install होता है। JK Interior ₹80/sq.ft से WPC panels लगाती है।" }
            },
            {
              "@type": "Question",
              name: "क्या JK Interior की कोई warranty है?",
              acceptedAnswer: { "@type": "Answer", text: "हाँ, JK Interior सभी projects पर 1 साल की written warranty देती है। ISI-certified materials use होते हैं।" }
            }
          ]
        }}
      />
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
                q: 'How long does PVC ceiling installation take?',
                a: 'A standard room PVC ceiling installation takes 1–2 days. Larger projects with multiple rooms are scheduled room-by-room to minimize disruption to your daily life.',
              },
              {
                q: 'Do you provide services outside Forbesganj?',
                a: 'Yes! JK Interior serves all of Araria district (Forbesganj, Narpatganj, Raniganj, Kursakanta, Jogbani) and beyond — Purnia, Supaul, Tribeniganj, Chhatapur and more. Call +91 8651070831.',
              },
              {
                q: 'What warranty do you provide on your work?',
                a: 'JK Interior provides a 1-year written warranty on all installations. Any defect or issue is fixed free of cost within the warranty period. We use ISI-certified branded materials for lasting quality.',
              },
              {
                q: 'Can you design a complete bedroom interior?',
                a: 'Absolutely! JK Interior provides complete bedroom interior design including false ceiling, wall paneling, TV unit, wardrobe design guidance, and lighting consultation — all under one roof.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm open:border-emerald-300 open:shadow-emerald-50">
                <summary className="cursor-pointer list-none font-bold text-gray-900 group-open:text-emerald-700">{q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
              </details>
            ))}
          </div>

          <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-blue-800 mt-12">
            Still have questions?
          </h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+918651070831"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call +91 8651070831
            </a>
            <a
              href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20I%20have%20a%20question%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#1ebe5d] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

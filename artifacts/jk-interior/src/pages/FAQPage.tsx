import { Link } from "wouter"
import Navbar from "@/components/navbar"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { FAQS } from "@/lib/faq-data"
import { PHONE_PRIMARY_DISPLAY, PHONE_SECONDARY, PHONE_SECONDARY_DISPLAY } from "@/lib/business-data"

// Extra service-specific FAQs shown below the shared FAQ accordion. Kept in one
// place so the visible <details> list and the FAQPage JSON-LD stay in sync —
// Google requires FAQ rich-result markup to match what the visitor actually reads.
const MORE_FAQS = [
  {
    q: "What does a gypsum ceiling cost in Bihar?",
    a: "Across Araria district and Forbesganj, a gypsum ceiling typically works out between ₹75 and ₹210 per sq.ft. The rate moves with the design, the cove lighting and any POP detailing. Call +91 8541849118 or +91 8651070831 for a free, precise quotation.",
  },
  {
    q: "How long does a PVC ceiling take to install?",
    a: "A standard room is completed in one to two days. On larger multi-room projects we schedule the work room by room, so your daily routine is disturbed as little as possible.",
  },
  {
    q: "Do you work outside Forbesganj?",
    a: "Yes. We cover the whole of Araria district — Narpatganj, Forbesganj, Raniganj, Kursakanta and Jogbani — and travel on to Purnia, Supaul, Tribeniganj and Chhatapur. Call +91 8541849118 to confirm availability for your location.",
  },
  {
    q: "Is the work covered by a warranty?",
    a: "Every installation carries a written one-year warranty. Any defect that arises within that period is rectified at no cost. We fit ISI-certified branded materials specifically so the work lasts well beyond the warranty term.",
  },
  {
    q: "Can you design a complete bedroom interior?",
    a: "Certainly. False ceiling, wall panelling, television unit, wardrobe guidance and lighting — a single team delivers the complete bedroom interior, with one point of accountability throughout.",
  },
]

export default function FAQPage() {
  return (
    <main>
      <SeoHead
        title="FAQs – False Ceiling & Interior Design Services in Forbesganj, Araria Bihar"
        description="Frequently asked questions about PVC false ceiling, gypsum ceiling, WPC wall panel, UV marble sheet and interior design services by JK Interior in Forbesganj, Araria, Bihar. Cost, warranty, installation time and more."
        canonical="/faq"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          // Built from the exact questions rendered on this page (shared FAQ
          // accordion + the service-specific list below), so the structured
          // data always matches the visible content.
          mainEntity: [...FAQS, ...MORE_FAQS].map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />
      <Navbar />
      <h1 className="sr-only">
        Frequently Asked Questions – JK Interior False Ceiling &amp; Interior Design Services in Forbesganj, Araria Bihar
      </h1>
      <div className="pt-36" />
      <FAQSection />

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f0] to-white" />
          <div className="absolute inset-0 grid-texture opacity-10" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-10 text-2xl font-black text-gray-900 sm:text-3xl">
            More questions about our services
          </h2>
          <div className="space-y-6">
            {MORE_FAQS.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm open:border-gold-300 open:shadow-gold-50">
                <summary className="cursor-pointer list-none font-bold text-gray-900 group-open:text-gold-700">{q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
              </details>
            ))}
          </div>

          <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gold-700 mt-12">
            Still have a question?
          </h3>
          <div className="flex flex-wrap gap-3">
            <CallLink className="shadow-sm hover:shadow-sm">{`Call ${PHONE_PRIMARY_DISPLAY}`}</CallLink>
            <a
              href={`tel:${PHONE_SECONDARY}`}
              aria-label={`Call JK Interior on the second line ${PHONE_SECONDARY_DISPLAY}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-gold-500/8 px-6 py-3.5 text-sm font-bold text-gold-700 shadow-sm transition-colors hover:bg-gold-500/15 active:scale-95"
            >
              {`Call ${PHONE_SECONDARY_DISPLAY}`}
            </a>
            <WhatsAppLink
              message="Hello JK Interior, I have a question about your services."
              className="shadow-sm hover:shadow-sm"
            >
              Message on WhatsApp
            </WhatsAppLink>
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
    </main>
  )
}

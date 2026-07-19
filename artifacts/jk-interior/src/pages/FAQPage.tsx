import { Link } from "wouter"
import Navbar from "@/components/navbar"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"

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
          mainEntity: [
            {
              "@type": "Question",
              name: "PVC फॉल्स सीलिंग की कीमत क्या है?",
              acceptedAnswer: { "@type": "Answer", text: "JK Interior में PVC फॉल्स सीलिंग ₹75–₹150 प्रति sq.ft से शुरू होती है। डिज़ाइन और लाइटिंग के अनुसार रेट अलग-अलग होता है। फ्री कोटेशन के लिए कॉल करें: +91 8541849118।" }
            },
            {
              "@type": "Question",
              name: "जिप्सम सीलिंग कितने दिन में तैयार होती है?",
              acceptedAnswer: { "@type": "Answer", text: "एक स्टैंडर्ड कमरे की जिप्सम सीलिंग 1–3 दिन में पूरी होती है। बड़े प्रोजेक्ट के लिए विस्तृत टाइमलाइन पहले साझा की जाती है।" }
            },
            {
              "@type": "Question",
              name: "क्या JK Interior फ्री साइट विज़िट देती है?",
              acceptedAnswer: { "@type": "Answer", text: "हाँ, JK Interior फोर्बेसगंज, अरारिया और आसपास के एरिया में फ्री एक्सपर्ट साइट विज़िट देती है। हमारी टीम आपके घर/दुकान आकर सटीक माप और अनुमान देती है।" }
            },
            {
              "@type": "Question",
              name: "WPC वॉल पैनल क्या होता है?",
              acceptedAnswer: { "@type": "Answer", text: "WPC (वुड प्लास्टिक कम्पोजिट) वॉल पैनल एक वॉटरप्रूफ और टिकाऊ वॉल क्लैडिंग मटेरियल है। यह टर्माइट-प्रूफ, नमी-रोधी और आसानी से इंस्टॉल होता है। JK Interior ₹180/sq.ft से WPC पैनल लगाती है।" }
            },
            {
              "@type": "Question",
              name: "क्या JK Interior की कोई वारंटी है?",
              acceptedAnswer: { "@type": "Answer", text: "हाँ, JK Interior सभी प्रोजेक्ट पर 1 साल की लिखित वारंटी देती है। ISI-प्रमाणित मटेरियल इस्तेमाल होते हैं।" }
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] to-white" />
          <div className="absolute inset-0 grid-texture opacity-10" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-10 text-2xl font-black text-gray-900 sm:text-3xl">
            More Questions About Our Services
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'What is the cost of gypsum ceiling in Bihar?',
                a: 'Gypsum ceiling in Bihar (Araria, Forbesganj) typically costs ₹75–₹210 per sq.ft depending on design complexity, cove lighting, and pop work. Contact JK Interior on +91 8541849118 for a free detailed quote.',
              },
              {
                q: 'How long does PVC ceiling installation take?',
                a: 'A standard room PVC ceiling installation takes 1–2 days. Larger projects with multiple rooms are scheduled room-by-room to minimize disruption to your daily life.',
              },
              {
                q: 'Do you provide services outside Forbesganj?',
                a: 'Yes! JK Interior serves all of Araria district (Forbesganj, Narpatganj, Raniganj, Kursakanta, Jogbani) and beyond — Purnia, Supaul, Tribeniganj, Chhatapur and more. Call +91 8541849118.',
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

          <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-emerald-700 mt-12">
            Still have questions?
          </h3>
          <div className="flex flex-wrap gap-3">
            <CallLink className="shadow-sm hover:shadow-sm">Call +91 8541849118</CallLink>
            <WhatsAppLink message="Hi JK Interior, I have a question about your services." className="shadow-sm hover:shadow-sm">
              WhatsApp Us
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

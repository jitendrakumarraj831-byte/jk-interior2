import { Link } from "wouter"
import Navbar from "@/components/navbar"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { FAQS } from "@/lib/faq-data"

// Extra service-specific FAQs shown below the shared FAQ accordion. Kept in one
// place so the visible <details> list and the FAQPage JSON-LD stay in sync —
// Google requires FAQ rich-result markup to match what the visitor actually reads.
const MORE_FAQS = [
  {
    q: "बिहार में Gypsum Ceiling की कीमत कितनी है?",
    a: "अररिया-फोर्बेसगंज में Gypsum Ceiling आमतौर पर ₹75–₹210 प्रति sq.ft में लग जाती है — डिज़ाइन, Cove Light और POP वर्क के हिसाब से रेट बदलता है। फ्री और सही-सही कोटेशन के लिए +91 8541849118 पर संपर्क करें।",
  },
  {
    q: "PVC Ceiling लगने में कितना समय लगता है?",
    a: "एक स्टैंडर्ड कमरे की PVC Ceiling 1–2 दिन में लग जाती है। कई कमरों वाले बड़े प्रोजेक्ट में हम कमरा-दर-कमरा शेड्यूल बनाते हैं, जिससे आपकी रोज़मर्रा की ज़िंदगी में ज़्यादा दखल न हो।",
  },
  {
    q: "फोर्बेसगंज के बाहर भी काम करते हैं?",
    a: "हां! हम पूरे अररिया ज़िले में (फोर्बेसगंज, नरपतगंज, रानीगंज, कुर्साकाँटा, जोगबनी) और उससे आगे — पूर्णिया, सुपौल, त्रिवेणीगंज, छतापुर तक जाते हैं। कॉल करें: +91 8541849118।",
  },
  {
    q: "काम पर वारंटी मिलती है क्या?",
    a: "हां, हर installation पर 1 साल की लिखित Warranty मिलती है। Warranty के दौरान कोई भी खराबी हो तो बिना पैसे लिए ठीक करते हैं। लंबे समय तक चले, इसलिए ISI-Certified ब्रांडेड मटेरियल ही लगाते हैं।",
  },
  {
    q: "पूरे बेडरूम का इंटीरियर बना सकते हैं?",
    a: "बिल्कुल! False Ceiling, Wall Panel, TV Unit, वॉर्डरोब का सुझाव और लाइटिंग — पूरे बेडरूम का इंटीरियर हम एक ही टीम से करा देते हैं।",
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
      <div className="pt-28" />
      <FAQSection />

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] to-white" />
          <div className="absolute inset-0 grid-texture opacity-10" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-10 text-2xl font-black text-gray-900 sm:text-3xl">
            हमारी सर्विस से जुड़े और सवाल
          </h2>
          <div className="space-y-6">
            {MORE_FAQS.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm open:border-emerald-300 open:shadow-emerald-50">
                <summary className="cursor-pointer list-none font-bold text-gray-900 group-open:text-emerald-700">{q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
              </details>
            ))}
          </div>

          <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-emerald-700 mt-12">
            अभी भी सवाल हैं?
          </h3>
          <div className="flex flex-wrap gap-3">
            <CallLink className="shadow-sm hover:shadow-sm">कॉल करें +91 8541849118</CallLink>
            <WhatsAppLink message="नमस्ते JK Interior, मुझे आपकी सर्विस के बारे में एक सवाल पूछना है।" className="shadow-sm hover:shadow-sm">
              WhatsApp करें
            </WhatsAppLink>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
            >
              मैसेज भेजें
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

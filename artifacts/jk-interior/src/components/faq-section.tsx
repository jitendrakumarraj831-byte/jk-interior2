
import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import SectionHeader from "@/components/ui/section-header"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"

const easeLux = [0.22, 1, 0.36, 1] as const

const faqs = [
  {
    q: "JK Interior कौन-कौन सी सेवाएं देती है?",
    a: "JK Interior provides PVC False Ceiling, Gypsum Ceiling, WPC Wall Paneling, UV Marble Sheet, Modular TV Unit, Charcoal Panel, Louvers Panel, ACP Exterior, Complete Interior Design, Bedroom Interior, Office Interior, and Kitchen Interior services across Forbesganj, Araria, Purnia and surrounding Bihar areas.",
  },
  {
    q: "फोर्बेसगंज में PVC फॉल्स सीलिंग की कीमत क्या होती है?",
    a: "PVC सीलिंग की कीमत अरारिया/फोर्बेसगंज में आमतौर पर ₹75-₹150 प्रति sq.ft होती है, जो पैनल क्वालिटी, डिज़ाइन और लाइटिंग के अनुसार अलग-अलग होती है। फ्री साइट विज़िट और विस्तृत कोटेशन के लिए +91 8541849118 पर कॉल करें।",
  },
  {
    q: "क्या आप फ्री साइट विज़िट देते हैं?",
    a: "हां, JK Interior फ्री एक्सपर्ट साइट विज़िट और विस्तृत कोटेशन देती है — बिना किसी बाध्यता के। हम फोर्बेसगंज, अरारिया और आसपास के बिहार एरिया में फ्री साइट विज़िट देते हैं।",
  },
  {
    q: "इंस्टॉलेशन कितने दिनों में पूरी होती है?",
    a: "कमरा साइज़ और सेवा के अनुसार, एक स्टैंडर्ड कमरे की इंस्टॉलेशन 1-3 दिन में पूरी होती है। हम समय पर डिलीवरी की गारंटी देते हैं और प्रोजेक्ट टाइमलाइन पहले ही साझा करते हैं।",
  },
  {
    q: "क्या मटेरियल वॉटरप्रूफ हैं?",
    a: "हां, हमारे सभी प्रोडक्ट — PVC पैनल, WPC बोर्ड, और UV मार्बल शीट — 100% वॉटरप्रूफ हैं। ये बिहार के मानसून मौसम को आसानी से झेल लेते हैं। ISI-प्रमाणित और ब्रांडेड मटेरियल इस्तेमाल होते हैं।",
  },
  {
    q: "वारंटी कितनी मिलती है?",
    a: "JK Interior हर प्रोजेक्ट पर 1 साल की लिखित वारंटी देती है। यह वारंटी मटेरियल और कारीगरी दोनों को कवर करती है। लिखित दस्तावेज़ दिया जाता है।",
  },
  {
    q: "आप कौन-कौन से एरिया में सेवा करते हैं?",
    a: "हम फोर्बेसगंज, अरारिया, जोगबनी, रानीगंज, नरपतगंज, कुर्साकाँटा, त्रिवेणीगंज, छतापुर, सुपौल और पूर्णिया में सेवा देते हैं — अरारिया, सुपौल और पूर्णिया ज़िले को कवर करते हैं।",
  },
  {
    q: "पेमेंट के कौन-से विकल्प उपलब्ध हैं?",
    a: "हम कैश, UPI (GPay, PhonePe, Paytm), और बैंक ट्रांसफर एक्सेप्ट करते हैं। कोई छुपे हुए शुल्क नहीं — पारदर्शी कीमत हमेशा। पेमेंट शेड्यूल प्रोजेक्ट शुरू से पहले डिस्कस होता है।",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const shouldReduce = useReducedMotion()

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.65, ease: easeLux },
      }

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  const mid = Math.ceil(faqs.length / 2)
  const columns = [faqs.slice(0, mid), faqs.slice(mid)]

  const renderEntry = (faq: (typeof faqs)[number], i: number) => (
    <div key={i} className="border-b border-gray-200 py-5 first:pt-0 last:border-b-0">
      <button
        className="flex w-full items-start gap-3 text-left"
        onClick={() => toggle(i)}
        aria-expanded={openIndex === i}
      >
        <span className={`mt-0.5 shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] font-bold ${
          openIndex === i ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-gray-300 text-gray-400"
        }`}>
          Q{String(i + 1).padStart(2, "0")}
        </span>
        <span className={`flex-1 font-serif text-sm font-bold leading-snug sm:text-base ${openIndex === i ? "text-emerald-800" : "text-gray-800"}`}>
          {faq.q}
        </span>
        <ChevronDown
          className={`mt-0.5 h-4 w-4 shrink-0 transition-transform duration-300 ${
            openIndex === i ? "rotate-180 text-emerald-600" : "text-gray-400"
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {openIndex === i && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeLux }}
            className="overflow-hidden"
          >
            <p className="pl-9 pt-3 text-sm leading-relaxed text-gray-600">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background — plain white "reference page", the one section without any tinted backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(5,150,105,0.04),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <SectionHeader
          icon={HelpCircle}
          badge="Reference Index"
          headingSize="md"
          className="mb-12"
          title={<>Frequently Asked <span className="hero-gradient-text">Questions</span></>}
          subtitle="JK Interior के बारे में सबसे आम सवाल के जवाब — अपनी शंका दूर करें"
        />

        {/* Two-column glossary/index layout */}
        <motion.div {...animProps} className="grid gap-x-12 sm:grid-cols-2">
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className={colIdx === 1 ? "sm:border-l sm:border-gray-200 sm:pl-12" : ""}
            >
              {col.map((faq) => renderEntry(faq, faqs.indexOf(faq)))}
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div {...animProps} className="mt-12 text-center">
          <p className="mb-5 text-gray-500 text-sm">और सवाल हैं? हमसे सीधे बात करें</p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallLink variant="outline">Call: +91 8541849118</CallLink>
            <WhatsAppLink message="Hi JK Interior, I have a question.">WhatsApp Us</WhatsAppLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

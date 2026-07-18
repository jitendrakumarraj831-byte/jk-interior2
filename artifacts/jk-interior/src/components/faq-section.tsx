
import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import SectionHeader from "@/components/ui/section-header"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"

const easeLux = [0.22, 1, 0.36, 1] as const

const faqs = [
  {
    q: "JK Interior कौन-कौन सी services provide करती है?",
    a: "JK Interior provides PVC False Ceiling, Gypsum Ceiling, WPC Wall Paneling, UV Marble Sheet, Modular TV Unit, Charcoal Panel, Louvers Panel, ACP Exterior, Complete Interior Design, Bedroom Interior, Office Interior, and Kitchen Interior services across Forbesganj, Araria, Purnia and surrounding Bihar areas.",
  },
  {
    q: "PVC false ceiling की cost क्या होती है Forbesganj में?",
    a: "PVC ceiling cost Araria/Forbesganj में typically ₹70-₹120 per sq.ft होती है, जो panel quality, design और lighting के अनुसार vary करती है। Free site visit और detailed quotation के लिए +91 8541849118 पर call करें।",
  },
  {
    q: "क्या आप free site visit provide करते हैं?",
    a: "हां, JK Interior free expert site visit और detailed quotation provide करती है — बिना किसी obligation के। हम Forbesganj, Araria और surrounding Bihar areas में free site visit देते हैं।",
  },
  {
    q: "Installation कितने दिनों में complete होती है?",
    a: "Room size और service के according, एक standard room की installation 1-3 days में complete होती है। हम on-time delivery guarantee करते हैं और project timeline पहले ही share करते हैं।",
  },
  {
    q: "क्या materials waterproof हैं?",
    a: "हां, हमारे सभी products — PVC panels, WPC boards, और UV marble sheets — 100% waterproof हैं। ये Bihar के monsoon season को आसानी से withstand करते हैं। ISI-certified और branded materials use होते हैं।",
  },
  {
    q: "Warranty कितनी मिलती है?",
    a: "JK Interior हर project पर 5 साल की written warranty provide करती है। यह warranty materials और workmanship दोनों को cover करती है। Written document दिया जाता है।",
  },
  {
    q: "आप कौन-कौन से areas में service करते हैं?",
    a: "हम Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul और Purnia में service provide करते हैं — Araria, Supaul और Purnia districts को cover करते हैं।",
  },
  {
    q: "Payment के कौन-से options available हैं?",
    a: "हम Cash, UPI (GPay, PhonePe, Paytm), और Bank Transfer accept करते हैं। कोई hidden charges नहीं — transparent pricing हमेशा। Payment schedule project start से पहले discuss होता है।",
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
          subtitle="JK Interior के बारे में सबसे common questions के answers — अपना doubt clear करें"
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
          <p className="mb-5 text-gray-500 text-sm">और questions हैं? हमसे directly बात करें</p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallLink variant="outline">Call: +91 8541849118</CallLink>
            <WhatsAppLink message="Hi JK Interior, I have a question.">WhatsApp Us</WhatsAppLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

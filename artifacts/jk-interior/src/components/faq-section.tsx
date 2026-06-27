
import { useState } from "react"
import { ChevronDown, HelpCircle, Phone, MessageCircle } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

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

  return (
    <section id="faq" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0fdf4] to-white" />
        <div className="absolute inset-0 grid-texture opacity-10" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div {...animProps} className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">FAQ</span>
          </div>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Frequently Asked <span className="hero-gradient-text">Questions</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            JK Interior के बारे में सबसे common questions के answers — अपना doubt clear करें
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div {...animProps} className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                openIndex === i
                  ? "border-emerald-300 bg-emerald-50/60"
                  : "border-gray-200 bg-white hover:border-emerald-200"
              }`}
            >
              <button
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className={`text-sm font-bold leading-snug sm:text-base ${openIndex === i ? "text-emerald-800" : "text-gray-800"}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
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
                    <div className="border-t border-emerald-200 px-6 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div {...animProps} className="mt-12 text-center">
          <p className="mb-5 text-gray-500 text-sm">और questions हैं? हमसे directly बात करें</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+918541849118"
              className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-sm font-bold text-emerald-700 transition-all hover:border-emerald-400 hover:bg-emerald-100 active:scale-95"
            >
              <Phone className="h-4 w-4" />
              Call: +91 8541849118
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
        </motion.div>
      </div>
    </section>
  )
}


import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import SectionHeader from "@/components/ui/section-header"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { FAQS as faqs } from "@/lib/faq-data"
import { PHONE_PRIMARY_DISPLAY, PHONE_SECONDARY, PHONE_SECONDARY_DISPLAY } from "@/lib/business-data"

const easeLux = [0.22, 1, 0.36, 1] as const

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
          openIndex === i ? "border-gold-400 bg-gold-50 text-gold-700" : "border-gray-300 text-gray-400"
        }`}>
          Q{String(i + 1).padStart(2, "0")}
        </span>
        <span className={`flex-1 font-serif text-sm font-bold leading-snug sm:text-base ${openIndex === i ? "text-gold-800" : "text-gray-800"}`}>
          {faq.q}
        </span>
        <ChevronDown
          className={`mt-0.5 h-4 w-4 shrink-0 transition-transform duration-300 ${
            openIndex === i ? "rotate-180 text-gold-600" : "text-gray-400"
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(201, 162, 39,0.04),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <SectionHeader
          icon={HelpCircle}
          badge="Reference Index"
          headingSize="md"
          className="mb-12"
          title={<>Frequently Asked <span className="hero-gradient-text">Questions</span></>}
          subtitle="The questions we hear most, answered plainly."
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
          <p className="mb-5 text-sm text-gray-500">Still have a question? Speak to us directly on either line.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallLink variant="outline">{`Call ${PHONE_PRIMARY_DISPLAY}`}</CallLink>
            <a
              href={`tel:${PHONE_SECONDARY}`}
              aria-label={`Call JK Interior on the second line ${PHONE_SECONDARY_DISPLAY}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-gold-500/8 px-6 py-3.5 text-sm font-bold text-gold-700 transition-all hover:border-gold-500/50 hover:bg-gold-500/15 active:scale-95"
            >
              {`Call ${PHONE_SECONDARY_DISPLAY}`}
            </a>
            <WhatsAppLink message="Hello JK Interior, I have a question about your services.">WhatsApp Us</WhatsAppLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

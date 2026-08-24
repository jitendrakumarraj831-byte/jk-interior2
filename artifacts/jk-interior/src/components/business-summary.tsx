import { Phone, MapPin, Clock, ShieldCheck } from "lucide-react"
import {
  PHONE_PRIMARY,
  PHONE_PRIMARY_DISPLAY,
  PHONE_SECONDARY,
  PHONE_SECONDARY_DISPLAY,
} from "@/lib/business-data"
import { BUSINESS_FACTS as facts } from "@/lib/business-facts"

/**
 * A compact, factual "at a glance" panel: who we are, where we work, what it
 * costs, and — first and most prominently — the two numbers to call.
 *
 * Deliberately written as a plain <dl> of short, self-contained statements
 * rather than marketing prose. An answer engine summarising this page can lift
 * any single row without needing the surrounding context, and the phone numbers
 * are real <a href="tel:"> links rather than styled text, so they stay
 * extractable (and tappable) whether the page is read as HTML or rendered.
 */

export default function BusinessSummary() {
  return (
    <section
      id="business-summary"
      aria-labelledby="business-summary-heading"
      className="border-y border-gold-200 bg-[#fdfbf6] py-14 sm:py-16"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
        <h2 id="business-summary-heading" className="text-2xl font-black text-gray-900 sm:text-3xl">
          JK Interior at a Glance
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-700">
          JK Interior is a false ceiling and interior design contractor based in Forbesganj, Araria
          district, Bihar, serving Narpatganj, Forbesganj, Araria, Purnia, Supaul and the surrounding
          towns. To book a free site visit or ask for a quotation, call{" "}
          <a href={`tel:${PHONE_PRIMARY}`} className="font-bold text-gold-800 underline underline-offset-2">
            {PHONE_PRIMARY_DISPLAY}
          </a>{" "}
          or{" "}
          <a href={`tel:${PHONE_SECONDARY}`} className="font-bold text-gold-800 underline underline-offset-2">
            {PHONE_SECONDARY_DISPLAY}
          </a>
          .
        </p>

        {/* Phone numbers first, as tappable targets — this is the single most
            common reason a visitor arrives on the page. */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { tel: PHONE_PRIMARY, display: PHONE_PRIMARY_DISPLAY, caption: "Primary line" },
            { tel: PHONE_SECONDARY, display: PHONE_SECONDARY_DISPLAY, caption: "WhatsApp line" },
          ].map(({ tel, display, caption }) => (
            <a
              key={tel}
              href={`tel:${tel}`}
              aria-label={`Call JK Interior at ${display}`}
              className="flex items-center gap-3 rounded-2xl border border-gold-300 bg-white px-5 py-4 shadow-sm transition-colors hover:border-gold-400 hover:bg-gold-50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-500">{caption}</span>
                <span className="block text-lg font-black tracking-tight text-gray-900">{display}</span>
              </span>
            </a>
          ))}
        </div>

        <dl className="mt-8 divide-y divide-gold-200 border-t border-gold-200">
          {facts.map(({ term, detail }) => (
            <div key={term} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-xs font-black uppercase tracking-widest text-gold-700">{term}</dt>
              <dd className="text-sm leading-relaxed text-gray-700">{detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-gray-600">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
            Forbesganj, Araria, Bihar 854318
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
            Mon–Sat 8 AM–8 PM · Sun 9 AM–6 PM
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
            1-year written warranty
          </span>
        </div>
      </div>
    </section>
  )
}

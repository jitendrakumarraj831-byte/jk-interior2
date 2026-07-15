import { motion, useReducedMotion } from "framer-motion"
import { Wallet, CheckCircle2, MessageCircle, Phone } from "lucide-react"

const easeLux = [0.22, 1, 0.36, 1] as const

const plans = [
  { amount: 50000, months: 6 },
  { amount: 100000, months: 9 },
  { amount: 200000, months: 12 },
]

const perks = [
  "Zero paperwork hassle — hum guide karte hain",
  "50% advance, baaki completion ke baad ya EMI par",
  "No full payment upfront required",
  "Partner NBFC / card EMI options available",
]

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN")
}

export default function EmiFinance() {
  const shouldReduce = useReducedMotion()
  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.65, ease: easeLux },
      }

  return (
    <section id="emi" className="relative overflow-hidden py-20 sm:py-24 scroll-mt-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0fdf4] to-white" />
        <div className="absolute inset-0 dot-pattern opacity-15" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
        <motion.div {...animProps} className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5">
            <Wallet className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">EMI / Finance</span>
          </div>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            अभी Interior, <span className="hero-gradient-text">बाद में Payment</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-gray-600">
            बजट की चिंता छोड़िए — आसान EMI options के साथ अपना घर आज ही बदलवाएं
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* Sample plans */}
          <motion.div {...animProps} className="glass-card-bright rounded-3xl p-6 sm:p-8">
            <h3 className="mb-5 text-sm font-black uppercase tracking-widest text-emerald-700">
              Indicative EMI Estimate
            </h3>
            <div className="space-y-3">
              {plans.map((p) => {
                const monthly = Math.round((p.amount * 1.08) / p.months / 100) * 100
                return (
                  <div
                    key={p.amount}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3.5"
                  >
                    <div>
                      <p className="text-sm font-bold text-gray-900">{fmt(p.amount)} project</p>
                      <p className="text-[11px] text-gray-400">{p.months} months tenure</p>
                    </div>
                    <p className="text-base font-black text-emerald-700">
                      ~{fmt(monthly)}<span className="text-[10px] font-semibold text-gray-400">/mo</span>
                    </p>
                  </div>
                )
              })}
            </div>
            <p className="mt-4 text-[11px] text-gray-400">
              *Illustrative only (~8% approx. processing/interest built in). Actual EMI depends on the
              lender/card issuer's terms — confirmed by our team during your consultation.
            </p>
          </motion.div>

          {/* Perks */}
          <motion.div
            {...(shouldReduce ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.1 } })}
            className="space-y-6"
          >
            <ul className="space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3.5 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">{perk}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2.5">
              <a
                href="https://wa.me/918651070831?text=Hi%20JK%20Interior%2C%20mujhe%20EMI%2Ffinance%20options%20ke%20baare%20mein%20jaankari%20chahiye."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-black text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all hover:bg-[#20c05c] active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                EMI Details WhatsApp पर पूछें
              </a>
              <a
                href="tel:+918541849118"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 py-3 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-100 active:scale-95"
              >
                <Phone className="h-3.5 w-3.5" />
                Call: +91 8541849118
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

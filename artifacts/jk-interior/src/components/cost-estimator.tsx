import { useMemo, useState } from "react"
import { Calculator, MessageCircle } from "lucide-react"
import SectionHeader from "@/components/ui/section-header"
import { SERVICES_SUMMARY, parsePriceRange } from "@/lib/services-summary"
import { PRICE_DISCLAIMER } from "@/lib/business-facts"
import { WA_NUMBER } from "@/lib/business-data"

/**
 * Reads the same per-sq.ft rates shown on the Services section (see
 * `services-summary.ts`) rather than hardcoding a second copy that could
 * drift out of sync with the published price list.
 */
const ESTIMATOR_SERVICES = [
  { slug: "gypsum-ceiling", label: "Gypsum Ceiling" },
  { slug: "wpc-wall-panel", label: "Wall Paneling (WPC)" },
] as const

type ServiceSlug = (typeof ESTIMATOR_SERVICES)[number]["slug"]

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 })

export default function CostEstimator() {
  const [slug, setSlug] = useState<ServiceSlug>("gypsum-ceiling")
  const [sqft, setSqft] = useState(150)
  const [tier, setTier] = useState<"standard" | "premium">("standard")

  const service = useMemo(() => SERVICES_SUMMARY.find((s) => s.slug === slug), [slug])
  const range = useMemo(() => (service ? parsePriceRange(service.price) : null), [service])

  const rate = range ? (tier === "standard" ? range.min : range.max) : 0
  const estimate = Math.round(sqft * rate)
  const estimateLow = range ? Math.round(sqft * range.min) : 0
  const estimateHigh = range ? Math.round(sqft * range.max) : 0

  const waMessage = `Hello JK Interior, I used the cost estimator on your website:\n\n• Service: ${service?.name ?? ""}\n• Area: ${sqft} sq.ft\n• Finish: ${tier === "standard" ? "Standard" : "Premium"}\n• Estimated cost: ₹${inr.format(estimate)} (range ₹${inr.format(estimateLow)}–₹${inr.format(estimateHigh)})\n\nPlease confirm the exact rate and book a free site visit.`
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`

  return (
    <section id="cost-estimator" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-6 lg:px-12">
        <SectionHeader
          icon={Calculator}
          badge="Instant Estimate"
          title={<>Get Your <span className="hero-gradient-text">Approximate Cost</span> In Seconds</>}
          subtitle="A quick sq.ft calculator for gypsum ceilings and wall paneling — the exact figure is confirmed at your free site visit."
        />

        <div className="glass-card-bright p-6 sm:p-8">
          {/* Service tabs */}
          <div className="mb-6 grid grid-cols-2 gap-2">
            {ESTIMATOR_SERVICES.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setSlug(s.slug)}
                aria-pressed={slug === s.slug}
                className={`rounded-xl px-4 py-3 text-sm font-extrabold transition-all ${
                  slug === s.slug
                    ? "bg-gold-700 text-white shadow-md shadow-gold-900/20"
                    : "border border-gold-900/10 bg-white text-gray-700 hover:bg-gold-50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Sq ft input */}
          <label htmlFor="estimator-sqft" className="mb-2 block text-xs font-black uppercase tracking-widest text-gold-800/70">
            Area (Sq. Ft.)
          </label>
          <div className="mb-1 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSqft((v) => Math.max(10, v - 10))}
              aria-label="Decrease area by 10 square feet"
              className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-gold-900/10 bg-white text-lg font-black text-gold-700 transition-colors hover:bg-gold-50"
            >
              −
            </button>
            <input
              id="estimator-sqft"
              type="number"
              min={10}
              max={5000}
              step={10}
              value={sqft}
              onChange={(e) => setSqft(Math.min(5000, Math.max(10, Number(e.target.value) || 0)))}
              className="glass-input w-full rounded-xl px-4 py-3 text-center text-lg font-black"
            />
            <button
              type="button"
              onClick={() => setSqft((v) => Math.min(5000, v + 10))}
              aria-label="Increase area by 10 square feet"
              className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-gold-900/10 bg-white text-lg font-black text-gold-700 transition-colors hover:bg-gold-50"
            >
              +
            </button>
          </div>
          <input
            type="range"
            min={10}
            max={2000}
            step={10}
            value={Math.min(sqft, 2000)}
            onChange={(e) => setSqft(Number(e.target.value))}
            aria-label="Area slider (square feet)"
            className="mb-6 mt-2 w-full accent-gold-600"
          />

          {/* Finish tier */}
          <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gold-800/70">Finish Level</label>
          <div className="mb-6 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setTier("standard")}
              aria-pressed={tier === "standard"}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                tier === "standard" ? "bg-gold-100 text-gold-900 ring-2 ring-gold-500" : "border border-gold-900/10 bg-white text-gray-600"
              }`}
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => setTier("premium")}
              aria-pressed={tier === "premium"}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                tier === "premium" ? "bg-gold-100 text-gold-900 ring-2 ring-gold-500" : "border border-gold-900/10 bg-white text-gray-600"
              }`}
            >
              Premium
            </button>
          </div>

          {/* Result */}
          <div className="mb-6 rounded-2xl border border-gold-500/25 bg-gold-50/70 p-5 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-gold-800/70">Estimated Cost</p>
            <p className="my-1 text-3xl font-black text-gold-900 sm:text-4xl">₹{inr.format(estimate)}</p>
            <p className="text-xs font-semibold text-gold-700/80">
              Range for {sqft} sq.ft: ₹{inr.format(estimateLow)} – ₹{inr.format(estimateHigh)}
            </p>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send this cost estimate to JK Interior on WhatsApp"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F7A3D] px-5 py-4 text-sm font-black text-white shadow-[0_4px_24px_rgba(15,122,61,0.4)] transition-all hover:bg-[#0c6b35] active:scale-95 sm:text-base"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Send Estimate to WhatsApp
          </a>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-500">{PRICE_DISCLAIMER}</p>
        </div>
      </div>
    </section>
  )
}

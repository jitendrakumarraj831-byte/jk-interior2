import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Calculator, MessageCircle, Phone, Sparkles } from "lucide-react"
import { calculatePriceEstimate } from "@/lib/business-data"

const easeLux = [0.22, 1, 0.36, 1] as const

const MATERIALS = [
  { key: "gypsum", label: "Gypsum Ceiling", labelHi: "जिप्सम सीलिंग" },
  { key: "pvc", label: "PVC Ceiling", labelHi: "PVC सीलिंग" },
  { key: "wpc", label: "WPC Wall Panel", labelHi: "WPC वॉल पैनल" },
  { key: "uv", label: "UV Marble Sheet", labelHi: "UV मार्बल शीट" },
  { key: "fluted", label: "Fluted Panel", labelHi: "फ्लूटेड पैनल" },
  { key: "grid", label: "Grid Ceiling", labelHi: "ग्रिड सीलिंग" },
  { key: "artificial-grass", label: "Artificial Grass", labelHi: "आर्टिफिशियल घास" },
  { key: "flooring", label: "Laminate Flooring", labelHi: "लैमिनेट फ्लोरिंग" },
] as const

const ROOM_PRESETS = [
  { label: "Small Bedroom", l: 10, w: 10 },
  { label: "Hall", l: 14, w: 16 },
  { label: "Kitchen", l: 8, w: 10 },
  { label: "Bathroom", l: 6, w: 8 },
]

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN")
}

export default function PriceCalculator() {
  const shouldReduce = useReducedMotion()
  const [material, setMaterial] = useState<(typeof MATERIALS)[number]["key"]>("gypsum")
  const [length, setLength] = useState(12)
  const [width, setWidth] = useState(12)

  const estimate = useMemo(
    () => calculatePriceEstimate(length, width, material),
    [length, width, material]
  )

  const materialInfo = MATERIALS.find((m) => m.key === material)!

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.65, ease: easeLux },
      }

  const waText = `Hi JK Interior! Mera rough estimate: ${materialInfo.label} — ${length}x${width} ft (${estimate.sqft} sq.ft) = ${fmt(estimate.low)}-${fmt(estimate.high)}. Free site visit ke liye exact quote chahiye.`

  return (
    <section id="calculator" className="relative overflow-hidden py-20 sm:py-24 lg:py-28 scroll-mt-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] via-white to-[#f0fdf4]" />
        <div className="absolute inset-0 grid-texture opacity-15" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
        <motion.div {...animProps} className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5">
            <Calculator className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Instant Estimate</span>
          </div>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Price / Cost <span className="hero-gradient-text">Calculator</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-gray-600">
            अपने रूम का साइज़ डालें और तुरंत budget, standard और premium estimate देखें
          </p>
        </motion.div>

        <motion.div {...animProps} className="glass-card-bright rounded-3xl p-6 sm:p-9">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Inputs */}
            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">
                Material
              </label>
              <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-2">
                {MATERIALS.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setMaterial(m.key)}
                    className={`rounded-xl border px-3 py-2.5 text-left transition-all active:scale-95 ${
                      material === m.key
                        ? "border-emerald-500 bg-emerald-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-emerald-300"
                    }`}
                  >
                    <span className={`block text-xs font-bold ${material === m.key ? "text-emerald-700" : "text-gray-800"}`}>
                      {m.label}
                    </span>
                    <span className="block text-[10px] text-gray-400">{m.labelHi}</span>
                  </button>
                ))}
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="calc-length" className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Length (ft)
                  </label>
                  <input
                    id="calc-length"
                    type="number"
                    min={1}
                    max={100}
                    value={length}
                    onChange={(e) => setLength(Math.max(1, Number(e.target.value) || 0))}
                    className="w-full rounded-xl glass-input px-4 py-3 text-sm outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="calc-width" className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Width (ft)
                  </label>
                  <input
                    id="calc-width"
                    type="number"
                    min={1}
                    max={100}
                    value={width}
                    onChange={(e) => setWidth(Math.max(1, Number(e.target.value) || 0))}
                    className="w-full rounded-xl glass-input px-4 py-3 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {ROOM_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => { setLength(p.l); setWidth(p.w) }}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-600 hover:border-emerald-300 hover:text-emerald-700 transition-all active:scale-95"
                  >
                    {p.label} ({p.l}×{p.w})
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col justify-between rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6">
              <div>
                <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                  {materialInfo.label} — {estimate.sqft} sq.ft
                </p>
                <p className="mb-5 text-xs text-gray-500">
                  {length} × {width} ft room
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 border border-gray-100">
                    <span className="text-xs font-semibold text-gray-500">Basic</span>
                    <span className="text-base font-black text-gray-800">{fmt(estimate.low)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-emerald-600 px-4 py-3 shadow-md">
                    <span className="text-xs font-semibold text-emerald-50">Standard (recommended)</span>
                    <span className="text-lg font-black text-white">{fmt(estimate.mid)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 border border-gray-100">
                    <span className="text-xs font-semibold text-gray-500">Premium</span>
                    <span className="text-base font-black text-gray-800">{fmt(estimate.high)}</span>
                  </div>
                </div>

                <p className="mt-4 flex items-start gap-1.5 text-[11px] text-gray-400">
                  <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                  यह rough estimate है — lighting, design और materials के अनुसार exact rate free site visit में मिलेगी।
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={`https://wa.me/918651070831?text=${encodeURIComponent(waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-black text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all hover:bg-[#20c05c] active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  यह Estimate WhatsApp करें
                </a>
                <a
                  href="tel:+918541849118"
                  className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white py-3 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-50 active:scale-95"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Exact Quote के लिए Call करें
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

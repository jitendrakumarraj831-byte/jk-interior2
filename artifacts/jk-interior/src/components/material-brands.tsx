import { motion, useReducedMotion } from "framer-motion"
import { BadgeCheck } from "lucide-react"

const easeLux = [0.22, 1, 0.36, 1] as const

const brands = [
  { name: "Gyproc", sub: "Saint-Gobain" },
  { name: "USG Boral", sub: "Ceiling Systems" },
  { name: "Armstrong", sub: "World Ceilings" },
  { name: "Everest", sub: "Building Products" },
  { name: "Hunter Douglas", sub: "Metal Ceilings" },
  { name: "Greenply", sub: "Panels & Boards" },
]

export default function MaterialBrands() {
  const shouldReduce = useReducedMotion()
  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.6, ease: easeLux },
      }

  return (
    <section id="brands" className="relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f0fdf4]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
        <motion.div {...animProps} className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Trusted Materials</span>
          </div>
          <h2 className="mb-2 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            हम केवल <span className="hero-gradient-text">Branded Materials</span> इस्तेमाल करते हैं
          </h2>
          <p className="mx-auto max-w-xl text-sm text-gray-500">
            ISI-certified, industry-leading brands — कोई local या duplicate material नहीं
          </p>
        </motion.div>

        <motion.div
          {...(shouldReduce ? {} : {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: "-50px" },
            variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } },
          })}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {brands.map((b) => (
            <motion.div
              key={b.name}
              {...(shouldReduce ? {} : {
                variants: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeLux } } },
              })}
              className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-gray-200 bg-white px-4 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
            >
              <span className="font-serif text-base font-bold text-gray-800 sm:text-lg">{b.name}</span>
              <span className="text-[10px] font-medium text-gray-400">{b.sub}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p {...animProps} className="mt-6 text-center text-[11px] text-gray-400">
          Brand availability depends on design and budget — confirmed with you during the free site visit.
        </motion.p>
      </div>
    </section>
  )
}

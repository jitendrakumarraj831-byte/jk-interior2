
import { MapPin, Navigation, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Link } from "wouter"
import SectionHeader from "@/components/ui/section-header"
import { CallLink } from "@/components/ui/cta-links"

const areas = [
  { name: "Forbesganj", desc: "Main Hub", highlight: true },
  { name: "Araria", desc: "District HQ", highlight: true },
  { name: "Jogbani", desc: "Border Town" },
  { name: "Narpatganj", desc: "Nearby" },
  { name: "Raniganj", desc: "Served Area" },
  { name: "Kursakanta", desc: "Covered" },
  { name: "Purnia", desc: "Major City" },
  { name: "Chhatapur", desc: "Covered" },
  { name: "Tribeniganj", desc: "Covered" },
  { name: "Supaul", desc: "Served Area" },
]

const hubPositions = [
  { top: "8%", left: "50%", rotate: -2 },
  { top: "24%", left: "15%", rotate: 4 },
  { top: "24%", left: "85%", rotate: -3 },
  { top: "44%", left: "30%", rotate: 5 },
  { top: "44%", left: "70%", rotate: -4 },
  { top: "64%", left: "15%", rotate: 3 },
  { top: "64%", left: "85%", rotate: -5 },
  { top: "84%", left: "50%", rotate: 2 },
  { top: "74%", left: "35%", rotate: -3 },
  { top: "74%", left: "65%", rotate: 4 },
]

export default function ServiceAreas() {
  const shouldReduce = useReducedMotion()

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      }

  const staggerContainer = shouldReduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
        },
      }

  const staggerItem = shouldReduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
        },
      }

  return (
    <section id="areas" className="relative overflow-hidden py-20 md:py-28 scroll-mt-28">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0fdf4] to-white" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(5,150,105,0.05),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <SectionHeader
          icon={Navigation}
          badge="Service Areas"
          headingSize="md"
          title={<>हमारी <span className="hero-gradient-text">पहुंच</span></>}
          subtitle="बिहार में प्रीमियम इंटीरियर और फॉल्स सीलिंग सेवा — Araria, Supaul और Purnia जिलों में"
        />

        {/* Desktop Hub Map */}
        <div className="hidden md:block relative mx-auto mb-16 aspect-[16/10] w-full max-w-4xl">
          {!shouldReduce && (
            <>
              <motion.div
                className="absolute inset-12 rounded-full border border-dashed border-emerald-300/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-24 rounded-full border border-dashed border-emerald-400/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              />
            </>
          )}
          <div className="absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/8 blur-3xl" />

          <motion.div {...staggerContainer} className="absolute inset-0">
            {areas.map((area, index) => {
              const pos = hubPositions[index] || { top: "50%", left: "50%" }
              return (
                <motion.div
                  key={area.name}
                  {...staggerItem}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div className={`group flex items-center gap-2 rounded-2xl border px-4 py-2.5 shadow-sm transition-all duration-300 cursor-default backdrop-blur-sm hover:scale-110 hover:z-50 ${
                    area.highlight
                      ? "border-emerald-300 bg-emerald-50 shadow-[0_4px_20px_rgba(5,150,105,0.15)]"
                      : "border-gray-200 bg-white"
                  }`}>
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      area.highlight
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-emerald-600 group-hover:text-white"
                    }`}>
                      <MapPin className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <span className={`block text-sm font-bold ${area.highlight ? "text-emerald-700" : "text-gray-800"}`}>{area.name}</span>
                      <span className="block text-[9px] font-medium text-gray-400">{area.desc}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Mobile Grid */}
        <motion.div {...staggerContainer} className="grid grid-cols-2 gap-3 md:hidden mb-12">
          {areas.map((area) => (
            <motion.div
              key={area.name}
              {...staggerItem}
              className={`flex items-center gap-2 rounded-xl border p-3.5 ${
                area.highlight
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <MapPin className={`h-4 w-4 shrink-0 ${area.highlight ? "text-emerald-600" : "text-gray-400"}`} />
              <div>
                <span className="block text-sm font-bold text-gray-900">{area.name}</span>
                <span className="block text-[9px] text-gray-400">{area.desc}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Card */}
        <motion.div {...animProps} className="text-center">
          <div className="mx-auto inline-block max-w-2xl w-full rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm">
            <p className="mb-2 text-base font-bold text-gray-900 md:text-lg">
              Araria, Supaul और Purnia के सभी प्रमुख क्षेत्रों में उपलब्ध
            </p>
            <p className="mb-6 text-sm text-gray-500">कहीं भी हो आपका घर — हम पहुंचेंगे</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CallLink className="shadow-[0_4px_20px_rgba(5,150,105,0.3)]" ariaLabel="Check service availability">
                Check Availability
              </CallLink>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-sm font-bold text-emerald-700 transition-all hover:border-emerald-400 hover:bg-emerald-100 active:scale-95"
              >
                Get Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

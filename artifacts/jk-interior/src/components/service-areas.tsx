import { MapPin, Navigation, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Link } from "wouter"
import SectionHeader from "@/components/ui/section-header"
import SwipeRail, { SwipeHint } from "@/components/ui/swipe-rail"
import { CallLink } from "@/components/ui/cta-links"

const areas = [
  { name: "Narpatganj", slug: "narpatganj", desc: "Operating Base", highlight: true },
  { name: "Forbesganj", slug: "forbesganj", desc: "Registered Address", highlight: true },
  { name: "Araria", slug: "araria", desc: "District Headquarters", highlight: true },
  { name: "Jogbani", slug: "jogbani", desc: "Border Town" },
  { name: "Raniganj", slug: "raniganj", desc: "Regularly Served" },
  { name: "Kursakanta", slug: "kursakanta", desc: "Covered" },
  { name: "Purnia", slug: "purnia", desc: "Major City" },
  { name: "Chhatapur", slug: "chhatapur", desc: "Covered" },
  { name: "Tribeniganj", slug: "tribeniganj", desc: "Covered" },
  { name: "Supaul", slug: "supaul", desc: "Regularly Served" },
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
    <section id="areas" className="relative overflow-hidden py-20 md:py-28 scroll-mt-36">

      {/* Background — a cool slate "map room" tone, distinct from the warm paper sections around it */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#eef2f6] to-[#f8fafc]" />
        <div className="absolute inset-0 dot-pattern opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(201, 162, 39,0.05),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <SectionHeader
          icon={Navigation}
          badge="Service Areas"
          headingSize="md"
          title={<>Where We <span className="hero-gradient-text">Work</span></>}
          subtitle="Based in Narpatganj, covering Araria, Supaul and Purnia within 80 km — we attend every site in person."
        />

        {/* Desktop hub map */}
        <div className="relative mx-auto mb-16 hidden aspect-[16/10] w-full max-w-4xl md:block">
          {!shouldReduce && (
            <>
              <motion.div
                className="absolute inset-12 rounded-full border border-dashed border-gold-300/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-24 rounded-full border border-dashed border-gold-400/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              />
            </>
          )}
          <div className="absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/8 blur-3xl" />

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
                  <Link
                    href={`/cities/${area.slug}`}
                    aria-label={`Interior design and false ceiling services in ${area.name}`}
                    className={`group flex items-center gap-2 rounded-2xl border px-4 py-2.5 shadow-sm transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-110 hover:z-50 ${
                      area.highlight
                        ? "border-gold-300 bg-gold-50 shadow-[0_4px_20px_rgba(201, 162, 39,0.15)]"
                        : "border-gray-200 bg-white hover:border-gold-300"
                    }`}
                  >
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      area.highlight
                        ? "bg-gold-600 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gold-600 group-hover:text-white"
                    }`}>
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className={`block text-sm font-bold ${area.highlight ? "text-gold-700" : "text-gray-800"}`}>{area.name}</span>
                      <span className="block text-[9px] font-medium text-gray-500">{area.desc}</span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* MOBILE: swipeable area rail */}
      <div className="relative z-10 mb-12 md:hidden">
        <SwipeRail
          ariaLabel="Areas served by JK Interior"
          itemClassName="w-[58%] xs:w-[48%]"
          gapClassName="gap-3"
          fadeColor="#f2f5f8"
          arrows={false}
        >
          {areas.map((area) => (
            <Link
              key={area.name}
              href={`/cities/${area.slug}`}
              aria-label={`Interior design and false ceiling services in ${area.name}`}
              className={`flex h-full flex-col justify-between gap-2 rounded-2xl border p-4 transition-colors active:scale-95 ${
                area.highlight
                  ? "border-gold-300 bg-gold-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${area.highlight ? "bg-gold-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-black text-gray-900">{area.name}</span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-500">{area.desc}</span>
              </span>
            </Link>
          ))}
        </SwipeRail>
        <SwipeHint className="mt-3" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Bottom CTA card */}
        <motion.div {...animProps} className="text-center">
          <div className="mx-auto inline-block w-full max-w-2xl rounded-2xl border border-gold-200 bg-white p-8 shadow-sm">
            <p className="mb-2 text-base font-bold text-gray-900 md:text-lg">
              Available across every major town in Araria, Supaul and Purnia
            </p>
            <p className="mb-6 text-sm text-gray-500">Wherever your property is, our team will reach it.</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <CallLink className="shadow-[0_4px_20px_rgba(201, 162, 39,0.3)]" ariaLabel="Call to check service availability in your area">
                Check Availability
              </CallLink>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-xl border border-gold-300 bg-gold-50 px-6 py-3.5 text-sm font-bold text-gold-700 transition-all hover:border-gold-400 hover:bg-gold-100 active:scale-95"
              >
                Request a Free Quotation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

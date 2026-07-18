
import { Star, Quote, MapPin } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import SectionHeader from "@/components/ui/section-header"
import { WhatsAppLink } from "@/components/ui/cta-links"

const easeLux = [0.22, 1, 0.36, 1] as const

const featured = {
  name: "Deepak Gupta",
  location: "Purnia",
  service: "Complete Interior",
  color: "from-cyan-500 to-cyan-700",
  initials: "DG",
  text: "Complete home interior का काम JK Interior को दिया। Ceiling से lekr TV unit तक सब कुछ perfect। On-time delivery और zero hidden charges। Bihar का best interior designer!",
}

const testimonials = [
  {
    name: "Rahul Kumar",
    location: "Forbesganj",
    rating: 5,
    text: "JK Interior ने हमारे घर का PVC false ceiling बेहद खूबसूरती से लगाया। काम की quality और speed दोनों exceptional थी।",
    service: "PVC False Ceiling",
    initials: "RK",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    name: "Priya Sharma",
    location: "Araria",
    rating: 5,
    text: "Gypsum ceiling के लिए JK Interior को hire किया। Professional team, clean work, और 1 साल की warranty।",
    service: "Gypsum Ceiling",
    initials: "PS",
    color: "from-violet-500 to-violet-700",
  },
  {
    name: "Amit Singh",
    location: "Jogbani",
    rating: 5,
    text: "WPC wall paneling का काम बहुत अच्छा किया। Termite-proof और waterproof panels लगाए। TV unit design भी बहुत stylish आया।",
    service: "WPC Wall Panel",
    initials: "AS",
    color: "from-amber-500 to-amber-700",
  },
  {
    name: "Sunita Devi",
    location: "Narpatganj",
    rating: 5,
    text: "UV marble sheet लगवाई पूरे bedroom में। Marble जैसा ही look आया but cost बहुत कम था।",
    service: "UV Marble Sheet",
    initials: "SD",
    color: "from-teal-500 to-teal-700",
  },
  {
    name: "Meena Yadav",
    location: "Raniganj",
    rating: 5,
    text: "Free site visit के लिए आए, detailed quotation दिया, और काम शुरू किया। हर step professional था।",
    service: "PVC False Ceiling",
    initials: "MY",
    color: "from-blue-500 to-blue-700",
  },
]

export default function Testimonials() {
  const shouldReduce = useReducedMotion()

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.65, ease: easeLux },
      }

  const marqueeItems = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0fdf4] to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(5,150,105,0.05),transparent)]" />
        <div className="absolute inset-0 dot-pattern opacity-15" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <SectionHeader
          icon={Star}
          badge="Client Reviews"
          tone="amber"
          headingSize="md"
          title={<>What Bihar Says <span className="hero-gradient-text">After We Leave</span></>}
          subtitle="साइट विज़िट से लेकर हैंडओवर तक — असली ग्राहकों की असली बातें"
          className="mb-12"
        />

        {/* Featured pull-quote */}
        <motion.div {...animProps} className="relative mx-auto mb-16 max-w-4xl">
          <Quote className="mx-auto mb-4 h-10 w-10 text-amber-300" aria-hidden="true" />
          <blockquote className="mb-6 text-center font-serif text-xl font-bold leading-snug text-gray-900 sm:text-2xl md:text-3xl">
            "{featured.text}"
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${featured.color} text-sm font-black text-white shadow-lg`} aria-hidden="true">
              {featured.initials}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-gray-900">{featured.name}</span>
                <span className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                  ))}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                {featured.location}, Bihar · {featured.service}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scrolling review strip */}
        <motion.div {...animProps} className="relative -mx-5 overflow-hidden sm:-mx-6 lg:-mx-12">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" aria-hidden />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" aria-hidden />

          <div className="flex w-max gap-4 px-5 marquee-track sm:px-6 lg:px-12">
            {marqueeItems.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                aria-hidden={i >= testimonials.length}
                className="flex w-72 shrink-0 flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:w-80"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                    {[...Array(t.rating)].map((_, si) => (
                      <Star key={si} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    {t.service}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">{t.text}</p>
                <div className="mt-auto flex items-center gap-2.5 border-t border-gray-100 pt-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-[10px] font-black text-white`} aria-hidden="true">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">{t.name}</div>
                    <div className="text-[10px] text-gray-500">{t.location}, Bihar</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rating summary + CTA */}
        <motion.div {...animProps} className="mt-14 flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-5 text-sm text-gray-500 sm:gap-6">
            <span className="flex items-center gap-1.5 font-bold text-gray-900">
              5.0 <Star className="h-4 w-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            </span>
            <span className="text-gray-300">|</span>
            <span>100+ reviews across Bihar</span>
          </div>
          <p className="text-base text-gray-600">अपने घर को भी दें premium interior का look</p>
          <WhatsAppLink
            size="lg"
            icon={false}
            ariaLabel="WhatsApp JK Interior for free consultation"
            message="Hi JK Interior, I want to get interior work done. Please share details."
            className="bg-emerald-600 text-base shadow-[0_4px_24px_rgba(5,150,105,0.35)] hover:bg-emerald-500 hover:shadow-[0_4px_32px_rgba(5,150,105,0.5)]"
          >
            Get Free Consultation
          </WhatsAppLink>
        </motion.div>
      </div>
    </section>
  )
}

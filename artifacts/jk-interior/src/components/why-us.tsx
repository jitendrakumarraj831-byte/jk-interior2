
import { ShieldCheck, Droplets, Clock, Sparkles, Award, HeartHandshake, BadgeCheck, Quote } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import SectionHeader from "@/components/ui/section-header"

const easeLux = [0.22, 1, 0.36, 1] as const

const reasons = [
  {
    icon: ShieldCheck,
    title: "ISI-certified materials, no substitutions",
    titleHi: "ISI-प्रमाणित मटेरियल, कोई मिलावट नहीं",
    reasoning: "Every panel and board carries ISI certification. We don't switch to cheaper unbranded stock to protect margin — customers can ask to see the material tag on-site.",
    reasoningHi: "हर पैनल और बोर्ड ISI-सर्टिफाइड होता है। मुनाफ़े के लिए सस्ता, बिना ब्रांड वाला माल हम कभी नहीं लगाते — चाहें तो साइट पर मटेरियल का टैग खुद देख लीजिए।",
  },
  {
    icon: Droplets,
    title: "Built for a four-month monsoon",
    titleHi: "चार महीने की बरसात के लिए बना",
    reasoning: "PVC panels and UV marble sheets are fully waterproof by design, not adapted from a drier-climate product line — this is what Araria's rainfall actually demands.",
    reasoningHi: "PVC पैनल और UV मार्बल शीट डिज़ाइन से ही पूरी तरह वॉटरप्रूफ होते हैं — अररिया की बारिश के लिए यही सही रहता है, कोई जुगाड़ नहीं।",
  },
  {
    icon: Clock,
    title: "A day-by-day schedule, not 'a few days'",
    titleHi: "दिन-वार शेड्यूल, सिर्फ अंदाज़ा नहीं",
    reasoning: "Before we start, you get a written install timeline — which day the ceiling goes up, which day the finishing happens. No open-ended delays.",
    reasoningHi: "काम शुरू करने से पहले लिखित टाइमलाइन देते हैं — किस दिन सीलिंग बनेगी, किस दिन फिनिशिंग होगी। कोई खुली-अधूरी देरी नहीं।",
  },
  {
    icon: Sparkles,
    title: "Panel systems over wet plaster",
    titleHi: "गीले प्लास्टर की जगह पैनल सिस्टम",
    reasoning: "Where the design allows it, we use clip-and-panel installation instead of wet plaster work — meaningfully less dust in a home you're still living in.",
    reasoningHi: "जहाँ डिज़ाइन इजाज़त देता है, गीले प्लास्टर की जगह क्लिप-एंड-पैनल सिस्टम लगाते हैं — यानी रहते हुए घर में काफी कम धूल।",
  },
  {
    icon: Award,
    title: "A signed warranty, not a verbal promise",
    titleHi: "लिखित वारंटी, ज़ुबानी वादा नहीं",
    reasoning: "Every project is handed over with a written 1-year warranty document — materials and workmanship both covered, in your hand at completion.",
    reasoningHi: "हर प्रोजेक्ट के साथ लिखित 1 साल की वारंटी मिलती है — मटेरियल और कारीगरी दोनों कवर, काम पूरा होते ही आपके हाथ में।",
  },
  {
    icon: HeartHandshake,
    title: "The site visit costs nothing either way",
    titleHi: "साइट विज़िट का कोई शुल्क नहीं",
    reasoning: "We measure, quote, and explain the options for free — whether you book us or use the quote to compare elsewhere.",
    reasoningHi: "माप, कोटेशन और सलाह — सब बिल्कुल फ्री। चाहे काम हमें दें या कोटेशन से कहीं और रेट मिलाएँ, कोई शुल्क नहीं।",
  },
]

export default function WhyUs() {
  const shouldReduce = useReducedMotion()

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, x: -24 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7, ease: easeLux },
      }

  const staggerContainer = shouldReduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
        },
      }

  const staggerItem = shouldReduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeLux } },
        },
      }

  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-[#f7f2e6] py-20 sm:py-24 lg:py-32"
      aria-labelledby="why-us-heading"
    >
      {/* Background — a ruled "notebook page" instead of the emerald gradients used elsewhere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 38px, rgba(5,150,105,0.07) 39px)",
          }}
        />
        <div className="hidden lg:block absolute left-[9%] top-0 bottom-0 w-px bg-amber-400/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <SectionHeader
          icon={BadgeCheck}
          badge="How We Work"
          headingId="why-us-heading"
          title={<>Six Decisions Behind <span className="hero-gradient-text">Every Job</span></>}
          subtitle="हर फैसले के पीछे एक वजह है"
          className="mb-12 sm:mb-14 lg:mb-16"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT — brand narrative, sticky on desktop, styled like a pinned note card */}
          <motion.div {...animProps} className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="relative -rotate-1 rounded-sm border border-black/5 bg-white p-7 shadow-[0_14px_36px_rgba(0,0,0,0.1)] sm:p-8">
              <span className="absolute -top-3 left-8 h-6 w-16 -rotate-3 bg-amber-200/70 shadow-sm" aria-hidden="true" />
              <Quote className="mb-4 h-8 w-8 text-emerald-300" aria-hidden="true" />
              <p className="mb-4 font-serif text-lg font-bold leading-snug text-gray-900 sm:text-xl">
                We started JK Interior in Forbesganj in 2019 fitting PVC ceilings for a handful of
                neighbours. Several years and 100+ homes later, the job hasn't changed — we still
                measure the room ourselves before we quote it.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                What's changed is which materials we'll put our name behind. Araria's monsoon
                wrecks anything that isn't genuinely waterproof, so PVC and UV marble stay
                on the truck for wet rooms, and gypsum stays reserved for the dry ones — even
                when a customer asks for the "prettier" option in the wrong place.
              </p>
              <p className="mb-5 rounded-lg border-l-2 border-emerald-300 bg-emerald-50/50 py-2 pl-3 pr-2 text-sm leading-relaxed text-gray-600">
                आसान शब्दों में — 2019 से फोर्बेसगंज में, 100+ घर, और तरीका आज भी वही: कोटेशन से पहले कमरा
                हम खुद नापते हैं। गीली जगह (किचन-बाथरूम) में PVC और UV मार्बल, सूखी जगह (हॉल-बेडरूम) में
                जिप्सम — सही जगह पर सही मटेरियल, यही हमारी पहचान है।
              </p>
              <div className="flex items-center gap-3 border-t border-dashed border-gray-200 pt-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-black text-white">
                  JK
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">JK Interior, since 2019</p>
                  <p className="text-xs text-gray-500">Forbesganj, Araria district, Bihar</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — reasoning list, set as marginalia rather than boxed cards */}
          <motion.div {...staggerContainer} className="lg:col-span-7">
            <div className="divide-y divide-dashed divide-emerald-900/10">
              {reasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  {...staggerItem}
                  className="group flex gap-5 py-5 pl-1 sm:py-6"
                >
                  <span className="w-10 shrink-0 font-serif text-3xl font-black leading-none text-emerald-900/15 sm:w-12 sm:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 border-l-2 border-transparent pl-5 transition-colors duration-300 group-hover:border-emerald-400">
                    <div className="mb-1.5 flex items-center gap-2">
                      <reason.icon className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      <h3 className="text-base font-bold text-gray-900 sm:text-lg">{reason.title}</h3>
                    </div>
                    <p className="mb-2 text-xs font-medium text-emerald-700/80 sm:text-sm">{reason.titleHi}</p>
                    <p className="text-sm leading-relaxed text-gray-600">{reason.reasoning}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500 sm:text-sm">{reason.reasoningHi}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="sr-only" aria-hidden="true">
        <h2>Why Choose JK Interior - Best Interior Designer in Forbesganj, Bihar</h2>
        <p>JK Interior is the most trusted interior design company in Forbesganj and Araria, Bihar. We provide premium quality PVC false ceiling installation, gypsum ceiling design, WPC wall paneling, UV marble sheet, and modular TV unit design with 1-year written warranty and free site visits.</p>
      </div>
    </section>
  )
}

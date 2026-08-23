
import { Star, Quote, MapPin } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import SectionHeader from "@/components/ui/section-header"
import { WhatsAppLink } from "@/components/ui/cta-links"

const easeLux = [0.22, 1, 0.36, 1] as const

const featured = {
  name: "Deepak Gupta",
  location: "Purnia",
  service: "Complete Interior",
  color: "from-cyan-700 to-cyan-900",
  initials: "DG",
  text: "पूर्ण होम इंटीरियर का काम JK Interior को दिया। सीलिंग से लेकर TV यूनिट तक सब कुछ परफेक्ट। समय पर डिलीवरी और ज़ीरो छुपे हुए शुल्क। बिहार का सबसे अच्छा इंटीरियर डिज़ाइनर!",
}

const testimonials = [
  {
    name: "Rahul Kumar",
    location: "Forbesganj",
    rating: 5,
    text: "JK Interior ने हमारे घर की PVC फॉल्स सीलिंग बेहद खूबसूरती से लगाई। काम की क्वालिटी और स्पीड दोनों बेहतरीन थी।",
    service: "PVC False Ceiling",
    initials: "RK",
    color: "from-emerald-700 to-emerald-900",
  },
  {
    name: "Priya Sharma",
    location: "Araria",
    rating: 5,
    text: "जिप्सम सीलिंग के लिए JK Interior को हायर किया। प्रोफेशनल टीम, साफ काम, और 1 साल की वारंटी।",
    service: "Gypsum Ceiling",
    initials: "PS",
    color: "from-violet-700 to-violet-900",
  },
  {
    name: "Amit Singh",
    location: "Jogbani",
    rating: 5,
    text: "WPC वॉल पैनलिंग का काम बहुत अच्छा किया। टर्माइट-प्रूफ और वॉटरप्रूफ पैनल लगाए। TV यूनिट डिज़ाइन भी बहुत स्टाइलिश आया।",
    service: "WPC Wall Panel",
    initials: "AS",
    color: "from-amber-700 to-amber-900",
  },
  {
    name: "Sunita Devi",
    location: "Narpatganj",
    rating: 5,
    text: "UV मार्बल शीट लगवाई पूरे बेडरूम में। मार्बल जैसा ही लुक आया पर कीमत बहुत कम थी।",
    service: "UV Marble Sheet",
    initials: "SD",
    color: "from-teal-700 to-teal-900",
  },
  {
    name: "Meena Yadav",
    location: "Raniganj",
    rating: 5,
    text: "फ्री साइट विज़िट के लिए आए, विस्तृत कोटेशन दिया, और काम शुरू किया। हर स्टेप प्रोफेशनल था।",
    service: "PVC False Ceiling",
    initials: "MY",
    color: "from-blue-700 to-blue-900",
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
      {/* Background — a dark emerald "stage", distinct from the navy of Process and the cream of Why Us */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#052e22] via-[#064e3b] to-[#052e22]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(16,185,129,0.16),transparent)]" />
        <div className="absolute inset-0 dot-pattern opacity-[0.06]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <SectionHeader
          icon={Star}
          badge="Client Reviews"
          tone="amber"
          headingSize="md"
          dark
          title={<>What Bihar Says <span className="hero-gradient-text">After We Leave</span></>}
          subtitle="साइट विज़िट से लेकर हैंडओवर तक — असली ग्राहकों की असली बातें"
          className="mb-12"
        />

        {/* Featured pull-quote, spotlight-style */}
        <motion.div {...animProps} className="relative mx-auto mb-16 max-w-4xl">
          <Quote className="mx-auto mb-4 h-10 w-10 text-amber-300" aria-hidden="true" />
          <blockquote className="mb-6 text-center font-serif text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl">
            "{featured.text}"
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${featured.color} text-sm font-black text-white shadow-lg`} aria-hidden="true">
              {featured.initials}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">{featured.name}</span>
                <span className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                  ))}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-200/70">
                <MapPin className="h-3 w-3 text-emerald-300" aria-hidden="true" />
                {featured.location}, Bihar · {featured.service}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scrolling review strip */}
        <motion.div {...animProps} className="relative -mx-5 overflow-hidden sm:-mx-6 lg:-mx-12">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#052e22] to-transparent sm:w-24" aria-hidden />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#052e22] to-transparent sm:w-24" aria-hidden />

          <div className="flex w-max gap-4 px-5 marquee-track sm:px-6 lg:px-12">
            {marqueeItems.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                aria-hidden={i >= testimonials.length}
                className="flex w-72 shrink-0 flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm sm:w-80"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                    {[...Array(t.rating)].map((_, si) => (
                      <Star key={si} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    {t.service}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-200">{t.text}</p>
                <div className="mt-auto flex items-center gap-2.5 border-t border-white/10 pt-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-[10px] font-black text-white`} aria-hidden="true">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{t.name}</div>
                    <div className="text-[10px] text-slate-400">{t.location}, Bihar</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rating summary + CTA */}
        <motion.div {...animProps} className="mt-14 flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-5 text-sm text-slate-300 sm:gap-6">
            <span className="flex items-center gap-1.5 font-bold text-white">
              4.9 <Star className="h-4 w-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            </span>
            <span className="text-slate-500">|</span>
            <span>100+ reviews across Bihar</span>
          </div>
          <p className="text-base text-slate-300">अपने घर को भी दें प्रीमियम इंटीरियर का लुक</p>
          <WhatsAppLink
            size="lg"
            icon={false}
            ariaLabel="WhatsApp JK Interior for free consultation"
            message="नमस्ते JK Interior, मुझे इंटीरियर का काम करवाना है। कृपया जानकारी भेजें।"
            className="bg-emerald-700 text-base shadow-[0_4px_24px_rgba(5,150,105,0.35)] hover:bg-emerald-600 hover:shadow-[0_4px_32px_rgba(5,150,105,0.5)]"
          >
            Get Free Consultation
          </WhatsAppLink>
        </motion.div>
      </div>
    </section>
  )
}

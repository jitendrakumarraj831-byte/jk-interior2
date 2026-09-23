import { Link } from "wouter"
import { Award, MapPin, Phone, ShieldCheck, Users, Building2, CalendarClock, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import Navbar from "@/components/navbar"
import WhyUs from "@/components/why-us"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { ADDRESS_LINE, SERVICE_AREAS, SERVICE_AREA_NAMES, buildBreadcrumbSchema } from "@/lib/seo"
import SwipeRail, { SwipeHint } from "@/components/ui/swipe-rail"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import {
  GOOGLE_REVIEWS_URL,
  PHONE_PRIMARY,
  PHONE_PRIMARY_DISPLAY,
  PHONE_SECONDARY,
  PHONE_SECONDARY_DISPLAY,
} from "@/lib/business-data"

const milestones = [
  {
    year: "2019",
    title: "The first ceilings",
    desc: "PVC false ceilings for neighbours around Forbesganj — one crew, one rule: measure before you quote.",
  },
  {
    year: "2021",
    title: "Gypsum and cove lighting",
    desc: "Demand grows for designer ceilings, so we add gypsum, cove detailing and concealed LED work.",
  },
  {
    year: "2023",
    title: "Wall panelling and modular units",
    desc: "WPC panelling, UV marble and built-to-measure TV units — one team completes the whole room.",
  },
  {
    year: "Today",
    title: "Three districts",
    desc: "Working from Forbesganj across Araria district, with scheduled visits to Supaul and Purnia.",
  },
]

const credentials = [
  {
    icon: Building2,
    label: "Established",
    value: "2019",
    detail: "Continuous work across Araria district since then.",
  },
  {
    icon: Users,
    label: "Areas Served",
    value: `${SERVICE_AREAS.length} towns`,
    detail: `${SERVICE_AREA_NAMES}.`,
  },
  {
    icon: ShieldCheck,
    label: "Warranty",
    value: "1 Year",
    detail: "Written, covering materials and workmanship alike.",
  },
  {
    icon: Award,
    label: "Google Reviews",
    value: "Read them",
    detail: "On our Google Business Profile — the reviews and rating are Google's, not ours.",
    // No rating number is stated here and there is no aggregateRating in the
    // JSON-LD: Google sources that from the Business Profile, not from us.
    href: GOOGLE_REVIEWS_URL,
  },
  {
    icon: CalendarClock,
    label: "Response Time",
    value: "2 Hours",
    detail: "Typical reply to a call or WhatsApp enquiry.",
  },
  {
    icon: MapPin,
    label: "Workshop",
    value: "Forbesganj",
    detail: `${ADDRESS_LINE}. Every site visit is attended in person.`,
  },
]

const easeLux = [0.22, 1, 0.36, 1] as const

export default function AboutPage() {
  const shouldReduce = useReducedMotion()

  const anim = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: easeLux, delay },
        }

  const inViewAnim = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.65, ease: easeLux, delay },
        }

  const staggerContainer = shouldReduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px" },
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        },
      }

  const staggerItem = shouldReduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeLux } },
        },
      }

  return (
    <main>
      <SeoHead
        title="About JK Interior – False Ceiling Contractor, Forbesganj"
        description="JK Interior has fitted false ceilings, partitions and wall panels around Forbesganj since 2019 — free site visits, written quotes and a 1-year warranty."
        canonical="/about"
        pageType="AboutPage"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-14 sm:pb-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f0] via-[#fdfbf6] to-white" />
          <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-gold-100/50 blur-3xl" />
          <div className="absolute inset-0 grid-texture opacity-[0.05]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <motion.div {...anim(0)} className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50/90 px-4 py-1.5 shadow-xs backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 sm:text-xs">
              Forbesganj · Araria District, Bihar
            </span>
          </motion.div>

          <motion.h1 {...anim(0.1)} className="mb-5 font-serif text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            About <span className="hero-gradient-text">JK Interior</span>
          </motion.h1>

          <motion.p {...anim(0.2)} className="mb-4 max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg">
            An interior and false ceiling contractor working across Araria district, Bihar since 2019.
            The same rule on every job: we measure the room ourselves, quote in writing, and fit only
            materials we'd use at home.
          </motion.p>

          <motion.p {...anim(0.3)} className="mb-8 max-w-3xl text-base leading-relaxed text-gray-600">
            Our registered workshop is at <span className="font-bold text-gray-900">{ADDRESS_LINE}</span> —
            the address on our{" "}
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-gold-700 underline-offset-2 hover:underline">
              Google Business Profile
            </a>
            . From there we cover Araria district and travel to Supaul and Purnia.
          </motion.p>

          <motion.div {...anim(0.4)} className="flex flex-wrap gap-3">
            <CallLink shine ariaLabel={`Call JK Interior on ${PHONE_PRIMARY_DISPLAY}`}>
              {`Call ${PHONE_PRIMARY_DISPLAY}`}
            </CallLink>
            <a
              href={`tel:${PHONE_SECONDARY}`}
              aria-label={`Call JK Interior on the second line ${PHONE_SECONDARY_DISPLAY}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-gold-500/8 px-6 py-3.5 text-sm font-bold text-gold-700 backdrop-blur-md transition-all hover:border-gold-500/50 hover:bg-gold-500/15 active:scale-95"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {`Call ${PHONE_SECONDARY_DISPLAY}`}
            </a>
            <WhatsAppLink message="Hello JK Interior, I would like to know more about your work and rates.">
              Message on WhatsApp
            </WhatsAppLink>
          </motion.div>
        </div>
      </section>

      {/* ── Credentials — swipeable on touch, grid on desktop ── */}
      <section className="relative overflow-hidden bg-[#fbfaf5] py-14 sm:py-16" aria-labelledby="about-credentials">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <motion.h2 {...inViewAnim(0)} id="about-credentials" className="mb-2 text-2xl font-black text-gray-900 sm:text-3xl">
            The Record So Far
          </motion.h2>
          <motion.p {...inViewAnim(0.05)} className="mb-8 text-sm text-gray-500">
            Six figures that describe how we work, and what you can hold us to.
          </motion.p>

          <motion.div {...staggerContainer} className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((item) => (
              <motion.div key={item.label} {...staggerItem} whileHover={shouldReduce ? undefined : { scale: 1.02 }}>
                <CredentialCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="sm:hidden">
          <SwipeRail
            ariaLabel="JK Interior credentials"
            itemClassName="w-[72%]"
            fadeColor="#fbfaf5"
            arrows={false}
          >
            {credentials.map((item) => (
              <CredentialCard key={item.label} item={item} />
            ))}
          </SwipeRail>
          <SwipeHint className="mt-3" />
        </div>
      </section>

      {/* ── Timeline — a swipeable journey on touch, a stepped column on desktop ── */}
      <section className="relative overflow-hidden py-14 sm:py-16" aria-labelledby="about-timeline">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f7f2e6]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
          <motion.h2 {...inViewAnim(0)} id="about-timeline" className="mb-2 text-2xl font-black text-gray-900 sm:text-3xl">
            How We Got Here
          </motion.h2>
          <motion.p {...inViewAnim(0.05)} className="mb-8 text-sm text-gray-500">
            Since 2019, one town at a time.
          </motion.p>

          <motion.ol {...staggerContainer} className="hidden lg:block">
            {milestones.map((m, i) => (
              <motion.li key={m.year} {...staggerItem} className="relative flex gap-6 pb-8 last:pb-0">
                {i < milestones.length - 1 && (
                  <span className="absolute left-[1.4rem] top-12 bottom-0 w-px bg-gold-300/60" aria-hidden="true" />
                )}
                <span className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-300 bg-white text-[11px] font-black text-gold-700 shadow-sm">
                  {m.year}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg font-bold text-gray-900">{m.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-600">{m.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <div className="relative z-10 lg:hidden">
          <SwipeRail
            ariaLabel="The JK Interior story, year by year"
            itemClassName="w-[80%] sm:w-[52%]"
            fadeColor="#fbf9f2"
            arrows={false}
          >
            {milestones.map((m) => (
              <div
                key={m.year}
                className="flex h-full flex-col rounded-2xl border border-gold-900/10 bg-white p-5 shadow-[0_14px_36px_-28px_rgba(76,58,18,0.9)]"
              >
                <span className="mb-3 inline-flex w-fit items-center rounded-full border border-gold-300 bg-gold-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gold-700">
                  {m.year}
                </span>
                <h3 className="mb-2 text-base font-bold text-gray-900">{m.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{m.desc}</p>
              </div>
            ))}
          </SwipeRail>
          <SwipeHint className="mt-3" />
        </div>
      </section>

      <WhyUs />

      {/* ── Closing CTA ── */}
      <section className="bg-gradient-to-b from-charcoal-800 to-charcoal-950 py-14 text-white sm:py-16">
        <motion.div {...inViewAnim(0)} className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-10 text-center backdrop-blur-sm sm:px-10 sm:py-12">
          <h2 className="mb-3 text-2xl font-black sm:text-3xl">Let&rsquo;s Plan Your Space</h2>
          <p className="mb-6 text-sm leading-relaxed text-gold-100">
            Free site visit, proper measurements, a written quotation — no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallLink
              icon={false}
              ariaLabel={`Call JK Interior on ${PHONE_PRIMARY_DISPLAY}`}
              className="bg-white text-gold-700 shadow hover:bg-gold-50 hover:shadow"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {`Call ${PHONE_PRIMARY_DISPLAY}`}
            </CallLink>
            <a
              href={`tel:${PHONE_SECONDARY}`}
              aria-label={`Call JK Interior on the second line ${PHONE_SECONDARY_DISPLAY}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/20 active:scale-95"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {`Call ${PHONE_SECONDARY_DISPLAY}`}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/20 active:scale-95"
            >
              Book a Free Site Visit
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-5 text-xs text-gold-100/70">
            Both numbers reach the same team — {PHONE_PRIMARY_DISPLAY} and {PHONE_SECONDARY_DISPLAY}.
          </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}

function CredentialCard({ item }: { item: (typeof credentials)[number] }) {
  const body = (
    <>
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-700">
        <item.icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="text-[10px] font-black uppercase tracking-widest text-gold-700">{item.label}</p>
      <p className="mt-0.5 text-2xl font-black tracking-tight text-gray-900">{item.value}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{item.detail}</p>
    </>
  )

  const shell = "flex h-full flex-col glass-card p-5 shadow-[0_14px_36px_-30px_rgba(76,58,18,0.9)]"

  // A figure a visitor can go and verify is worth more than one they have to
  // take on trust, so the card links out wherever a public source exists.
  if ("href" in item && item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.label} ${item.value} — open the JK Interior Google Business Profile`}
        className={`${shell} transition-colors hover:border-gold-400/50 hover:bg-gold-50/40`}
      >
        {body}
        <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-gold-700">
          Open on Google
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </span>
      </a>
    )
  }

  return <div className={shell}>{body}</div>
}

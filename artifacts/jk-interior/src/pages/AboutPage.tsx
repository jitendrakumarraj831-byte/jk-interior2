import { Link } from "wouter"
import { Award, MapPin, Phone, ShieldCheck, Users, Building2, CalendarClock, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import WhyUs from "@/components/why-us"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import SwipeRail, { SwipeHint } from "@/components/ui/swipe-rail"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import {
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
    title: "500+ projects, three districts",
    desc: "Based in Narpatganj, serving homes and offices across Araria, Supaul and Purnia.",
  },
]

const credentials = [
  {
    icon: Building2,
    label: "Established",
    value: "2019",
    detail: "Six years of continuous work across Araria district.",
  },
  {
    icon: Users,
    label: "Projects Delivered",
    value: "500+",
    detail: "Homes, offices, shops, clinics and showrooms.",
  },
  {
    icon: ShieldCheck,
    label: "Warranty",
    value: "1 Year",
    detail: "Written, covering materials and workmanship alike.",
  },
  {
    icon: Award,
    label: "Google Rating",
    value: "4.9 / 5",
    detail: "Across 100+ verified customer reviews.",
  },
  {
    icon: CalendarClock,
    label: "Response Time",
    value: "2 Hours",
    detail: "Typical reply to a call or WhatsApp enquiry.",
  },
  {
    icon: MapPin,
    label: "Coverage",
    value: "80 km",
    detail: "Radius from Narpatganj, attended in person.",
  },
]

export default function AboutPage() {
  return (
    <main>
      <SeoHead
        title="About JK Interior – Best False Ceiling Contractor in Forbesganj, Araria Bihar"
        description="Learn about JK Interior – Bihar's most trusted interior contractor since 2019. 500+ projects, ISI-certified materials, 1-year written warranty. Serving Forbesganj, Araria, Purnia, Supaul and all of Bihar."
        canonical="/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://www.jkinterior.online/#organization",
          name: "JK Interior",
          slogan: "Interior & False Ceiling Solutions",
          url: "https://www.jkinterior.online",
          logo: "https://www.jkinterior.online/logo.png",
          foundingDate: "2019",
          description: "Bihar's most trusted interior contractor – PVC false ceiling, gypsum ceiling, WPC wall panel and complete interior design since 2019.",
          telephone: ["+91-8541849118", "+91-8651070831"],
          email: "jkinteriorofficial@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Damaria Rewahi",
            addressLocality: "Forbesganj",
            addressRegion: "Bihar",
            postalCode: "854318",
            addressCountry: "IN"
          },
          areaServed: [
            { "@type": "City", name: "Narpatganj" },
            { "@type": "City", name: "Forbesganj" },
            { "@type": "AdministrativeArea", name: "Araria" }
          ],
          sameAs: [
            "https://www.google.com/maps?cid=12398820263168117030",
            "https://wa.me/918651070831",
            "https://www.facebook.com/share/1GpAKHZZtb/",
            "https://www.instagram.com/jk_interior_ceiling_designer"
          ],
          numberOfEmployees: { "@type": "QuantitativeValue", value: 10 }
        }}
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
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50 px-4 py-1.5">
            <MapPin className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 sm:text-xs">
              Narpatganj · Forbesganj · Araria District, Bihar
            </span>
          </div>

          <h1 className="mb-5 font-serif text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            About <span className="hero-gradient-text">JK Interior</span>
          </h1>

          <p className="mb-4 max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg">
            An interior and false ceiling contractor working across Araria district, Bihar since 2019.
            500+ projects, and the same rule every time: we measure the room ourselves, quote in
            writing, and fit only materials we'd use at home.
          </p>

          <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-600">
            Based in <span className="font-bold text-gray-900">Narpatganj</span>, with our registered
            workshop at <span className="font-bold text-gray-900">Damaria Rewahi, Forbesganj</span>.
            From there we cover roughly 80 km — all of Araria district, and on into Supaul and Purnia.
          </p>

          <div className="flex flex-wrap gap-3">
            <CallLink shine ariaLabel={`Call JK Interior on ${PHONE_PRIMARY_DISPLAY}`}>
              {`Call ${PHONE_PRIMARY_DISPLAY}`}
            </CallLink>
            <a
              href={`tel:${PHONE_SECONDARY}`}
              aria-label={`Call JK Interior on the second line ${PHONE_SECONDARY_DISPLAY}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-gold-500/8 px-6 py-3.5 text-sm font-bold text-gold-700 transition-all hover:border-gold-500/50 hover:bg-gold-500/15 active:scale-95"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {`Call ${PHONE_SECONDARY_DISPLAY}`}
            </a>
            <WhatsAppLink message="Hello JK Interior, I would like to know more about your work and rates.">
              Message on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </section>

      {/* ── Credentials — swipeable on touch, grid on desktop ── */}
      <section className="relative overflow-hidden bg-[#fbfaf5] py-14 sm:py-16" aria-labelledby="about-credentials">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <h2 id="about-credentials" className="mb-2 text-2xl font-black text-gray-900 sm:text-3xl">
            The Record So Far
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            Six figures that describe how we work, and what you can hold us to.
          </p>

          <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((item) => (
              <CredentialCard key={item.label} item={item} />
            ))}
          </div>
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
          <h2 id="about-timeline" className="mb-2 text-2xl font-black text-gray-900 sm:text-3xl">
            How We Got Here
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            Six years, one town at a time.
          </p>

          <ol className="hidden lg:block">
            {milestones.map((m, i) => (
              <li key={m.year} className="relative flex gap-6 pb-8 last:pb-0">
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
              </li>
            ))}
          </ol>
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
      <Testimonials />

      {/* ── Closing CTA ── */}
      <section className="bg-gradient-to-b from-charcoal-800 to-charcoal-950 py-14 text-white sm:py-16">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-12">
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
        </div>
      </section>

      <Footer />
    </main>
  )
}

function CredentialCard({ item }: { item: (typeof credentials)[number] }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-gold-900/10 bg-white p-5 shadow-[0_14px_36px_-30px_rgba(76,58,18,0.9)]">
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-700">
        <item.icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="text-[10px] font-black uppercase tracking-widest text-gold-700">{item.label}</p>
      <p className="mt-0.5 text-2xl font-black tracking-tight text-gray-900">{item.value}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{item.detail}</p>
    </div>
  )
}

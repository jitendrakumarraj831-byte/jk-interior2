import { Link } from "wouter"
import { HelpCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import PageHero from "@/components/ui/page-hero"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { FAQS } from "@/lib/faq-data"
import { CITIES, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo"
import { PHONE_PRIMARY_DISPLAY, PHONE_SECONDARY, PHONE_SECONDARY_DISPLAY } from "@/lib/business-data"

// Extra service-specific FAQs shown below the shared FAQ accordion. Kept in one
// place so the visible <details> list and the FAQPage JSON-LD stay in sync —
// structured data must match what the visitor actually reads.
const MORE_FAQS = [
  {
    q: "What is the difference between a gypsum and a POP ceiling?",
    a: "Gypsum ceilings use factory-made boards on a metal frame, so they go up faster, crack less and create far less dust on site. POP (plaster of Paris) is mixed and applied wet by hand, which allows very free-form shapes but takes longer to set and cure. We fit gypsum as our standard and use POP only for detailing where a design needs it.",
  },
  {
    q: "Which wall panel is best behind a TV?",
    a: "WPC wall panels are our usual recommendation for TV walls: they look like wood, resist termites and moisture, keep cables hidden behind the panels, and the TV can be mounted the same day. Fluted and louvre WPC designs can also carry a hidden LED backlight.",
  },
  {
    q: "Can UV marble sheet be used in a bathroom or pooja room?",
    a: "Yes. UV marble sheet is waterproof and has no grout lines, which makes it well suited to bathroom walls and pooja rooms. We keep it off the strip directly behind a gas stove, where direct heat can affect it.",
  },
  {
    q: "Can you handle a complete room — ceiling, walls and TV unit?",
    a: "Yes. One team can do the false ceiling, wall panelling, TV unit and lighting for a room together, which also brings the per-sq.ft rate down compared with booking each job separately.",
  },
]

export default function FAQPage() {
  return (
    <main>
      <SeoHead
        title="False Ceiling FAQs – Cost, Time & Materials | JK Interior"
        description="Answers on false ceiling cost, gypsum vs PVC, installation time, waterproof materials, warranty and the areas JK Interior serves around Forbesganj, Araria."
        canonical="/faq"
        jsonLd={[
          // Built from the exact questions rendered on this page (shared FAQ
          // accordion + the service-specific list below).
          buildFaqSchema([...FAQS, ...MORE_FAQS]),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
      <Navbar />
      <PageHero
        icon={HelpCircle}
        title={
          <>
            Answers Before You{" "}
            <span className="hero-gradient-text">Even Have to Ask</span>
          </>
        }
        subtitle="Rates, timelines, warranty and coverage for every service we offer — straight talk, no sales pitch."
        whatsappMessage="Hello JK Interior, I have a question that isn't covered in your FAQ."
      />
      <FAQSection />

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f0] to-white" />
          <div className="absolute inset-0 grid-texture opacity-10" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <h2 className="mb-10 text-2xl font-black text-gray-900 sm:text-3xl">
            More questions about our services
          </h2>
          <div className="space-y-6">
            {MORE_FAQS.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm open:border-gold-300 open:shadow-gold-50">
                <summary className="cursor-pointer list-none font-bold text-gray-900 group-open:text-gold-700">{q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
              </details>
            ))}
          </div>

          <h2 className="mb-3 mt-12 text-lg font-black text-gray-900">Areas we serve</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            {CITIES.map((c, i) => (
              <span key={c.slug}>
                <Link href={`/cities/${c.slug}`} className="font-semibold text-gold-700 underline-offset-2 hover:underline">
                  {c.name}
                </Link>
                {i < CITIES.length - 2 ? ", " : i === CITIES.length - 2 ? " and " : "."}
              </span>
            ))}
          </p>

          <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gold-700 mt-12">
            Still have a question?
          </h3>
          <div className="flex flex-wrap gap-3">
            <CallLink className="shadow-sm hover:shadow-sm">{`Call ${PHONE_PRIMARY_DISPLAY}`}</CallLink>
            <a
              href={`tel:${PHONE_SECONDARY}`}
              aria-label={`Call JK Interior on the second line ${PHONE_SECONDARY_DISPLAY}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-gold-500/8 px-6 py-3.5 text-sm font-bold text-gold-700 shadow-sm transition-colors hover:bg-gold-500/15 active:scale-95"
            >
              {`Call ${PHONE_SECONDARY_DISPLAY}`}
            </a>
            <WhatsAppLink
              message="Hello JK Interior, I have a question about your services."
              className="shadow-sm hover:shadow-sm"
            >
              Message on WhatsApp
            </WhatsAppLink>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

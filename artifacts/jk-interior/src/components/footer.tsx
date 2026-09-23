
import { Phone, Mail, MapPin, ArrowRight, Facebook, Instagram } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Link } from "wouter"
import { WhatsAppLink } from "@/components/ui/cta-links"
import { scrollToHash } from "@/lib/hash-scroll"
import {
  PHONE_PRIMARY,
  PHONE_PRIMARY_DISPLAY,
  PHONE_SECONDARY,
  PHONE_SECONDARY_DISPLAY,
} from "@/lib/business-data"
import { ADDRESS_LINE, BUSINESS, CITIES, GOOGLE_MAPS_URL } from "@/lib/seo"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/gallery", label: "Work Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
]

// Each row deep-links to the service's own guide page rather than dumping every
// visitor on /services — the anchor text and the destination then actually
// match, which is what makes a footer link worth anything for a visitor or a
// crawler. All eight services have a page of their own.
const serviceLinks = [
  { label: "PVC False Ceiling", href: "/services/pvc-false-ceiling" },
  { label: "Gypsum Ceiling", href: "/services/gypsum-ceiling" },
  { label: "WPC Wall Paneling", href: "/services/wpc-wall-panel" },
  { label: "UV Marble Sheet", href: "/services/uv-marble-sheet" },
  { label: "Modular TV Unit", href: "/services/modular-tv-unit" },
  { label: "Grid Ceiling", href: "/services/grid-ceiling" },
  { label: "Partition Wall", href: "/services/partition-wall" },
  { label: "Artificial Grass", href: "/services/artificial-grass" },
]

export default function Footer() {
  const shouldReduce = useReducedMotion()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden pt-20 pb-28 md:pb-12">
      {/* Background — matches site light theme */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f0] to-[#f3ecdd]" />
        <div className="absolute inset-0 grid-texture opacity-[0.04]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gold-200/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand */}
          <motion.div
            {...(shouldReduce ? {} : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            })}
            className="lg:col-span-4"
          >
            <picture>
              <source srcSet="/jk-interior-navbar-logo.avif" type="image/avif" />
              <source srcSet="/jk-interior-navbar-logo.webp" type="image/webp" />
              <img
                src="/logo.png"
                alt="JK Interior – False Ceiling Contractor in Forbesganj Bihar"
                width={180}
                height={70}
                className="object-contain h-14 w-auto mb-6"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="space-y-4 mb-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-700">
                Interior & False Ceiling Solutions
              </p>
              <p className="max-w-xs text-sm leading-relaxed text-gray-600">
                False ceilings, wall panelling, partitions and TV units for homes, shops and offices —
                from a single PVC ceiling to a complete room.
              </p>
              <div className="rounded-xl border border-gold-200 bg-white/60 p-4">
                <p className="text-xs leading-relaxed text-gold-700/80">
                  Registered workshop in <span className="font-bold">Forbesganj</span>, serving{" "}
                  <span className="font-bold">Araria district</span> and nearby towns in Bihar.
                </p>
              </div>
            </div>

            {/* Social */}
<div className="flex gap-3">
  <a
    href="https://www.facebook.com/share/1GpAKHZZtb/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="JK Interior on Facebook"
    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-200 bg-white/70 text-gold-600 hover:border-gold-400 hover:bg-gold-50 transition-all"
  >
    <Facebook className="h-4 w-4" aria-hidden="true" />
  </a>

  <a
    href="https://www.instagram.com/jk_interior_ceiling_designer"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="JK Interior on Instagram"
    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-200 bg-white/70 text-gold-600 hover:border-gold-400 hover:bg-gold-50 transition-all"
  >
    <Instagram className="h-4 w-4" aria-hidden="true" />
  </a>
</div>
</motion.div>

          {/* Quick Links */}
          <motion.div
            {...(shouldReduce ? {} : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
            })}
            className="lg:col-span-2"
          >
            <h3 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gold-700">
              <span className="h-0.5 w-5 bg-gold-500 rounded-full" aria-hidden="true" />
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-1.5 text-sm font-semibold text-gray-600 transition-all hover:text-gold-700"
                >
                  <ArrowRight className="h-3 w-3 text-gold-500/0 group-hover:text-gold-500 transition-all -translate-x-1 group-hover:translate-x-0" aria-hidden="true" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Services */}
          <motion.div
            {...(shouldReduce ? {} : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 },
            })}
            className="lg:col-span-3"
          >
            <h3 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gold-700">
              <span className="h-0.5 w-5 bg-gold-500 rounded-full" aria-hidden="true" />
              Our Services
            </h3>
            <div className="flex flex-col gap-3">
              {serviceLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="group flex items-center gap-1.5 text-sm font-semibold text-gray-600 transition-all hover:text-gold-700"
                >
                  <ArrowRight className="h-3 w-3 text-gold-500/0 group-hover:text-gold-500 transition-all -translate-x-1 group-hover:translate-x-0" aria-hidden="true" />
                  {s.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            {...(shouldReduce ? {} : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.16 },
            })}
            className="lg:col-span-3"
          >
            <h3 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gold-700">
              <span className="h-0.5 w-5 bg-gold-500 rounded-full" aria-hidden="true" />
              Get in Touch
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${PHONE_PRIMARY}`}
                aria-label={`Call JK Interior on the primary line ${PHONE_PRIMARY_DISPLAY}`}
                className="group flex items-center gap-3 text-sm font-semibold text-gray-600 transition-colors hover:text-gold-700"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gold-200 bg-white/70 text-gold-600 transition-colors group-hover:bg-gold-50">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-gold-600">Primary Line</span>
                  {PHONE_PRIMARY_DISPLAY}
                </div>
              </a>
              <a
                href={`tel:${PHONE_SECONDARY}`}
                aria-label={`Call JK Interior on the second line ${PHONE_SECONDARY_DISPLAY}`}
                className="group flex items-center gap-3 text-sm font-semibold text-gray-600 transition-colors hover:text-gold-700"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gold-200 bg-white/70 text-gold-600 transition-colors group-hover:bg-gold-50">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-gold-600">Alternate Line</span>
                  {PHONE_SECONDARY_DISPLAY}
                </div>
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="group flex items-center gap-3 text-sm font-semibold text-gray-600 hover:text-gold-700 transition-colors"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gold-200 bg-white/70 text-gold-600 group-hover:bg-gold-50 transition-colors">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="break-all">{BUSINESS.email}</span>
              </a>
              <div className="flex items-start gap-3 text-sm font-semibold text-gray-600">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gold-200 bg-white/70 text-gold-600">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="pt-0.5 leading-snug">
                  {ADDRESS_LINE}
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-xs font-bold text-gold-700 underline-offset-2 hover:underline"
                  >
                    View on Google Maps
                  </a>
                </span>
              </div>

              {/* WhatsApp CTA */}
              <WhatsAppLink
                message="Hello JK Interior, I would like some assistance with an interior project."
                className="mt-1 w-full shadow-[0_4px_16px_rgba(37,211,102,0.25)] hover:shadow-[0_4px_24px_rgba(37,211,102,0.4)]"
              >
                Message on WhatsApp
              </WhatsAppLink>
            </div>
          </motion.div>
        </div>

                {/* Service Areas — Single Link */}
<motion.div
  {...(shouldReduce ? {} : {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2,
    },
  })}
  className="mt-12"
>
  <Link
    href="/#areas"
    // On any other page wouter navigates to "/" and HomePage's own
    // `useHashScroll` takes over. On the home page itself the path doesn't
    // change, so wouter's pushState re-renders nothing and fires no
    // `hashchange` — this link simply did nothing. Scroll explicitly.
    onClick={() => {
      if (window.location.pathname.replace(/\/$/, "") === "") scrollToHash("#areas")
    }}
    className="group flex items-center justify-between rounded-2xl border border-gold-200/80 bg-white/60 px-5 py-4 backdrop-blur-xs transition-all duration-300 hover:border-gold-300 hover:bg-white/80 hover:shadow-md"
    aria-label="View JK Interior service areas"
  >
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z"
          />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gold-900">
          Service Areas
        </h3>
        <p className="mt-0.5 text-xs text-gray-500">
          View every town and city we cover
        </p>
      </div>
    </div>

    <svg
      className="h-5 w-5 text-gold-600 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </Link>
</motion.div>
        

        {/* SEO text */}
        <div className="mt-6 mb-12 rounded-xl border border-gold-200 bg-white/50 p-4">
          <p className="text-xs leading-relaxed text-gray-500">
            JK Interior — false ceiling and interior contractor with its registered workshop in
            Forbesganj, Araria district. Gypsum, PVC and grid false ceilings, partition walls, WPC
            wall panelling, UV marble sheet, modular TV units and artificial grass, installed across{' '}
            {CITIES.map((c, i) => (
              <span key={c.slug}>
                <Link href={`/cities/${c.slug}`} className="underline underline-offset-2 hover:text-gold-700 transition-colors">{c.name}</Link>
                {i < CITIES.length - 2 ? ", " : i === CITIES.length - 2 ? " and " : "."}
              </span>
            ))}
          </p>
        </div>

        {/* Copyright */}
<div className="flex flex-col items-center justify-between gap-5 border-t border-gold-200 pt-8 md:flex-row">
  <div>
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-700" suppressHydrationWarning>
      © {currentYear} JK Interior — Forbesganj, Bihar
    </p>
    <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-semibold text-gray-500">
      <span>Interior &amp; digital experience crafted by Jitendra Kumar</span>
      <svg className="h-3 w-3 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    </p>
  </div>
  <div className="flex items-center gap-4 text-[10px] font-semibold text-gray-500">
    <Link href="/services" className="hover:text-gold-600 transition-colors">All Services</Link>
    <span aria-hidden="true">•</span>
    <Link href="/faq" className="hover:text-gold-600 transition-colors">FAQ</Link>
    <span aria-hidden="true">•</span>
    <span>Serving Forbesganj &amp; Araria District</span>
  </div>
</div>
      </div>
    </footer>
  )
}

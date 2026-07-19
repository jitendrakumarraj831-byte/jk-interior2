
import { Phone, Mail, MapPin, ArrowRight, Facebook, Instagram } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Link } from "wouter"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { CALL_NUMBER, WA_NUMBER } from "@/lib/business-data"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/gallery", label: "Work Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
]

const serviceLinks = [
  { label: "PVC False Ceiling" },
  { label: "Gypsum Ceiling" },
  { label: "WPC Wall Paneling" },
  { label: "UV Marble Sheet" },
  { label: "Modular TV Unit" },
  { label: "Complete Interior" },
]

const cityLinks = [
  { slug: "forbesganj", name: "Forbesganj" },
  { slug: "araria", name: "Araria" },
  { slug: "purnia", name: "Purnia" },
  { slug: "jogbani", name: "Jogbani" },
  { slug: "supaul", name: "Supaul" },
  { slug: "narpatganj", name: "Narpatganj" },
  { slug: "raniganj", name: "Raniganj" },
  { slug: "tribeniganj", name: "Tribeniganj" },
  { slug: "kursakanta", name: "Kursakanta" },
  { slug: "chhatapur", name: "Chhatapur" },
]

export default function Footer() {
  const shouldReduce = useReducedMotion()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden pt-20 pb-28 md:pb-12">
      {/* Background — matches site light theme */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#ecfdf5] to-[#d1fae5]" />
        <div className="absolute inset-0 grid-texture opacity-[0.04]" />
        <div className="absolute top-0 inset-x-0 h-px bg-emerald-200/60" />
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
            <img               src="/logo.png"
              alt="JK Interior – False Ceiling Contractor in Forbesganj Bihar"
              width={180}
              height={70}
              className="object-contain h-14 w-auto mb-6"
              loading="lazy"
            />
            <div className="space-y-4 mb-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                Modern Interior & Ceiling Solutions
              </p>
              <p className="text-sm leading-relaxed text-gray-600 max-w-xs">
                Premium interior design and false ceiling solutions in Bihar. Quality work for every budget — from PVC to complete home interiors.
              </p>
              <div className="rounded-xl border border-emerald-200 bg-white/60 p-4">
                <p className="text-xs leading-relaxed text-emerald-700/70 italic">
                  {"\u201C"}बिहार में प्रीमियम इंटीरियर डिज़ाइन और सीलिंग समाधान। आपके बजट में बेमिसाल कारीगरी।{"\u201D"}
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
    className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-white/70 text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
  >
    <Facebook className="h-4 w-4" />
  </a>

  <a
    href="https://www.instagram.com/jk_interior_ceiling_designer?igsh=endrOTBuY3hpdzJ6"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="JK Interior on Instagram"
    className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-white/70 text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
  >
    <Instagram className="h-4 w-4" />
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
            <h3 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700">
              <span className="h-0.5 w-5 bg-emerald-500 rounded-full" />
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-1.5 text-sm font-semibold text-gray-600 transition-all hover:text-emerald-700"
                >
                  <ArrowRight className="h-3 w-3 text-emerald-500/0 group-hover:text-emerald-500 transition-all -translate-x-1 group-hover:translate-x-0" />
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
            <h3 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700">
              <span className="h-0.5 w-5 bg-emerald-500 rounded-full" />
              Our Services
            </h3>
            <div className="flex flex-col gap-3">
              {serviceLinks.map((s) => (
                <Link
                  key={s.label}
                  href="/services"
                  className="group flex items-center gap-1.5 text-sm font-semibold text-gray-600 transition-all hover:text-emerald-700"
                >
                  <ArrowRight className="h-3 w-3 text-emerald-500/0 group-hover:text-emerald-500 transition-all -translate-x-1 group-hover:translate-x-0" />
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
            <h3 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700">
              <span className="h-0.5 w-5 bg-emerald-500 rounded-full" />
              Get in Touch
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${CALL_NUMBER}`}
                className="group flex items-center gap-3 text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-white/70 text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-emerald-600">Primary</span>
                  +91 8541849118
                </div>
              </a>
              <a
                href={`tel:+${WA_NUMBER}`}
                className="group flex items-center gap-3 text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-white/70 text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-emerald-600">WhatsApp</span>
                  +91 8651070831
                </div>
              </a>
              <a
                href="mailto:jkinteriorofficial@gmail.com"
                className="group flex items-center gap-3 text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-white/70 text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="break-all">jkinteriorofficial@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm font-semibold text-gray-600">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-white/70 text-emerald-600">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="pt-0.5 leading-snug">Damaria, Rewahi,<br />Araria, Bihar – 854318</span>
              </div>

              {/* WhatsApp CTA */}
              <WhatsAppLink
                message="Hello JK Interior, I need help."
                className="mt-1 w-full shadow-[0_4px_16px_rgba(37,211,102,0.25)] hover:shadow-[0_4px_24px_rgba(37,211,102,0.4)]"
              >
                WhatsApp करें
              </WhatsAppLink>
            </div>
          </motion.div>
        </div>

        {/* Service Areas — linked city pages */}
        <motion.div
          {...(shouldReduce ? {} : {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
          })}
          className="mt-14"
        >
          <h3 className="mb-4 text-[10px] font-black uppercase tracking-widest text-emerald-700">
            Service Areas:
          </h3>
          <div className="flex flex-wrap gap-2">
            {cityLinks.map((city) => (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="text-[10px] font-bold text-emerald-700 rounded-full border border-emerald-300 bg-white/60 px-3 py-1 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                title={`Interior design and false ceiling in ${city.name}, Bihar`}
              >
                {city.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* SEO text */}
        <div className="mt-6 mb-12 rounded-xl border border-emerald-200 bg-white/50 p-4">
          <p className="text-xs leading-relaxed text-gray-500">
            JK Interior — Best interior designer in Forbesganj, Araria, Bihar. We provide PVC false ceiling, gypsum ceiling design, WPC wall paneling, UV marble sheet, modular TV unit design, and complete interior solutions across{' '}
            <Link href="/cities/forbesganj" className="underline underline-offset-2 hover:text-emerald-700 transition-colors">Forbesganj</Link>,{' '}
            <Link href="/cities/araria" className="underline underline-offset-2 hover:text-emerald-700 transition-colors">Araria</Link>,{' '}
            <Link href="/cities/jogbani" className="underline underline-offset-2 hover:text-emerald-700 transition-colors">Jogbani</Link>,{' '}
            <Link href="/cities/raniganj" className="underline underline-offset-2 hover:text-emerald-700 transition-colors">Raniganj</Link>,{' '}
            <Link href="/cities/narpatganj" className="underline underline-offset-2 hover:text-emerald-700 transition-colors">Narpatganj</Link>,{' '}
            <Link href="/cities/kursakanta" className="underline underline-offset-2 hover:text-emerald-700 transition-colors">Kursakanta</Link>,{' '}
            <Link href="/cities/tribeniganj" className="underline underline-offset-2 hover:text-emerald-700 transition-colors">Tribeniganj</Link>,{' '}
            <Link href="/cities/chhatapur" className="underline underline-offset-2 hover:text-emerald-700 transition-colors">Chhatapur</Link>,{' '}
            <Link href="/cities/supaul" className="underline underline-offset-2 hover:text-emerald-700 transition-colors">Supaul</Link> and{' '}
            <Link href="/cities/purnia" className="underline underline-offset-2 hover:text-emerald-700 transition-colors">Purnia</Link>.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-emerald-200 pt-8 md:flex-row">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700" suppressHydrationWarning>
              © {currentYear} JK Interior Forbesganj
            </p>
            <p className="mt-0.5 text-[10px] font-semibold text-gray-500">
              Araria&apos;s Most Trusted Interior Contractor
            </p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-semibold text-gray-500">
            <Link href="/services" className="hover:text-emerald-600 transition-colors">All Services</Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-emerald-600 transition-colors">FAQ</Link>
            <span>•</span>
            <span>Made with ❤ in Bihar</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import Image from "next/image"
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Facebook, Instagram } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/gallery", label: "Work Gallery" },
  { href: "/about", label: "About Us" },
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

const areas = ["Forbesganj", "Araria", "Jogbani", "Purnia", "Narpatganj", "Supaul"]

export default function Footer() {
  const shouldReduce = useReducedMotion()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden pt-20 pb-28 md:pb-12">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#040d20] to-[#020810]" />
        <div className="absolute inset-0 grid-texture opacity-20" />
        <div className="absolute top-0 inset-x-0 h-px section-divider" />
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
            <Image
              src="/logo.png"
              alt="JK Interior – False Ceiling Contractor in Forbesganj Bihar"
              width={180}
              height={70}
              className="object-contain h-14 w-auto mb-6 brightness-200 saturate-0"
              loading="lazy"
            />
            <div className="space-y-4 mb-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                Modern Interior & Ceiling Solutions
              </p>
              <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
                Premium interior design and false ceiling solutions in Bihar. Quality work for every budget — from PVC to complete home interiors.
              </p>
              <div className="rounded-xl border border-blue-500/15 bg-blue-500/8 p-4">
                <p className="text-xs leading-relaxed text-slate-500 italic">
                  "बिहार में प्रीमियम इंटीरियर डिजाइन और सीलिंग समाधान। आपके बजट में बेमिसाल कारीगरी।"
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/jkinterior"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JK Interior on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 hover:border-blue-400/40 hover:bg-blue-500/20 transition-all"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/jkinterior"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JK Interior on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 hover:border-blue-400/40 hover:bg-blue-500/20 transition-all"
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
            <h4 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
              <span className="h-0.5 w-5 bg-blue-500 rounded-full" />
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-all hover:text-blue-400"
                >
                  <ArrowRight className="h-3 w-3 text-blue-500/0 group-hover:text-blue-400 transition-all -translate-x-1 group-hover:translate-x-0" />
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
            <h4 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
              <span className="h-0.5 w-5 bg-blue-500 rounded-full" />
              Our Services
            </h4>
            <div className="flex flex-col gap-3">
              {serviceLinks.map((s) => (
                <Link
                  key={s.label}
                  href="/services"
                  className="group flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-all hover:text-blue-400"
                >
                  <ArrowRight className="h-3 w-3 text-blue-500/0 group-hover:text-blue-400 transition-all -translate-x-1 group-hover:translate-x-0" />
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
            <h4 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
              <span className="h-0.5 w-5 bg-blue-500 rounded-full" />
              Get in Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+918651070831"
                className="group flex items-center gap-3 text-sm font-semibold text-slate-500 hover:text-blue-400 transition-colors"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-600">Primary</span>
                  +91 8651070831
                </div>
              </a>
              <a
                href="tel:+918541849118"
                className="group flex items-center gap-3 text-sm font-semibold text-slate-500 hover:text-blue-400 transition-colors"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-600">Secondary</span>
                  +91 8541849118
                </div>
              </a>
              <a
                href="mailto:jkinteriorofficial@gmail.com"
                className="group flex items-center gap-3 text-sm font-semibold text-slate-500 hover:text-blue-400 transition-colors"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="break-all">jkinteriorofficial@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm font-semibold text-slate-500">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="pt-0.5 leading-snug">Forbesganj Dumariya,<br />Araria, Bihar – 854318</span>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/918651070831?text=Hello%20JK%20Interior%2C%20I%20need%20help."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,205,102,0.25)] transition-all hover:shadow-[0_4px_24px_rgba(37,205,102,0.4)] active:scale-95 mt-1"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp करें
              </a>
            </div>
          </motion.div>
        </div>

        {/* Areas strip */}
        <div className="mt-14 flex flex-wrap gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 py-1">Areas:</span>
          {areas.map((area) => (
            <span key={area} className="text-[10px] font-bold text-slate-600 rounded-full border border-slate-800 px-3 py-1">{area}</span>
          ))}
        </div>

        {/* SEO text */}
        <div className="mt-6 mb-12 rounded-xl border border-blue-500/10 bg-blue-500/5 p-4">
          <p className="text-xs leading-relaxed text-slate-600">
            JK Interior — Best interior designer in Forbesganj, Araria, Bihar. We provide PVC false ceiling, gypsum ceiling design, WPC wall paneling, UV marble sheet, modular TV unit design, and complete interior solutions across Forbesganj, Araria, Jogbani, Raniganj, Narpatganj, Kursakanta, Tribeniganj, Chhatapur, Supaul and Purnia.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-slate-800/60 pt-8 md:flex-row">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
              © {currentYear} JK Interior Forbesganj
            </p>
            <p className="mt-0.5 text-[10px] font-semibold text-slate-700">
              Araria's Most Trusted Interior Contractor
            </p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-semibold text-slate-700">
            <Link href="/contact" className="hover:text-slate-500 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/services" className="hover:text-slate-500 transition-colors">All Services</Link>
            <span>•</span>
            <span>Made with ❤ in Bihar</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import Image from "next/image"
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-16 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-50/50 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        className="mx-auto max-w-7xl px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-4">
          
          {/* Brand Column */}
          <motion.div variants={fadeSlideUpItem} className="md:col-span-1 lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="JK Interior – False Ceiling Contractor & Interior Designer in Forbesganj, Araria Bihar"
                width={160}
                height={60}
                className="object-contain h-14 w-auto mb-4"
                loading="lazy"
              />
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-600 mb-4">
                Modern Interior & Ceiling Solutions
              </p>
              <p className="max-w-xs text-sm leading-relaxed text-slate-600 font-medium">
                Premium interior design and ceiling solutions in Bihar. Quality work for every budget.
              </p>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-500 font-semibold italic">
                बिहार में प्रीमियम इंटीरियर डिजाइन और सीलिंग समाधान। आपके बजट में बेमिसाल कारीगरी।
              </p>
            </div>
          </motion.div>

          {/* Links Column */}
          <motion.div variants={fadeSlideUpItem}>
            <h4 className="mb-6 text-xs font-black uppercase tracking-widest text-slate-900 border-l-2 border-amber-500 pl-3">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home", title: "JK Interior Forbesganj home" },
                { href: "/services", label: "Services", title: "False ceiling & interior services in Araria" },
                { href: "/gallery", label: "Gallery", title: "Interior design & false ceiling gallery in Araria" },
                { href: "/#areas", label: "Service Areas", title: "Forbesganj, Araria, Jogbani, Narpatganj service areas" },
                { href: "/contact", label: "Contact Us", title: "Contact JK Interior Forbesganj for free quote" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  title={link.title}
                  className="group flex items-center text-sm font-bold text-slate-600 transition-all hover:text-amber-600"
                >
                  <span className="w-0 overflow-hidden transition-all group-hover:w-4 group-hover:mr-2 text-amber-500">—</span>
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={fadeSlideUpItem}>
            <h4 className="mb-6 text-xs font-black uppercase tracking-widest text-slate-900 border-l-2 border-amber-500 pl-3">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+918651070831"
                className="group flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <Phone className="h-4 w-4" />
                </div>
                +91 8651070831
              </a>
              <a
                href="mailto:jkinteriorofficial@gmail.com"
                className="group flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="break-all">jkinteriorofficial@gmail.com</span>
              </a>
              <div className="group flex items-start gap-3 text-sm font-bold text-slate-600">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="pt-1">Forbesganj Dumariya, Araria, Bihar - 854318</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeSlideUp}
          className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-10 md:flex-row"
        >
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              © {new Date().getFullYear()} JK Interior Forbesganj
            </p>
            <p className="mt-1 text-[10px] font-bold text-slate-500">
              Bihar's Trusted Interior Contractor
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">
              Crafted by
            </span>
            <span className="text-[10px] font-black text-amber-600 flex items-center gap-1">
              Jitendra Kumar <ExternalLink size={10} />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

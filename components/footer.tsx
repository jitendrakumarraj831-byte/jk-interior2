"use client"

import Image from "next/image"
import { Phone, Mail, MapPin, ExternalLink, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 pt-20 pb-10 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

      <motion.div
        className="mx-auto max-w-7xl px-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Section - 4 Columns Wide */}
          <motion.div variants={fadeSlideUpItem} className="lg:col-span-4">
            <Image
              src="/logo.png"
              alt="JK Interior – False Ceiling Contractor"
              width={180}
              height={70}
              className="object-contain h-16 w-auto mb-6"
              loading="lazy"
            />
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-600 mb-2">
                  Modern Interior & Ceiling Solutions
                </p>
                <p className="text-sm leading-relaxed text-slate-600 font-medium max-w-sm">
                  Premium interior design and ceiling solutions in Bihar. Quality work for every budget.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border-l-4 border-amber-500">
                <p className="text-xs leading-relaxed text-slate-500 font-semibold italic">
                  "बिहार में प्रीमियम इंटीरियर डिजाइन और सीलिंग समाधान। आपके बजट में बेमिसाल कारीगरी।"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Links - 3 Columns Wide */}
          <motion.div variants={fadeSlideUpItem} className="lg:col-span-3 lg:ml-auto">
            <h4 className="mb-8 text-sm font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
              <span className="h-1 w-6 bg-amber-500 rounded-full"></span>
              Quick Links
            </h4>
            <nav className="grid grid-cols-1 gap-4">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Our Services" },
                { href: "/gallery", label: "Work Gallery" },
                { href: "/#areas", label: "Service Areas" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center text-sm font-bold text-slate-600 transition-all hover:text-amber-600"
                >
                  <ArrowRight className="h-0 w-0 opacity-0 transition-all group-hover:h-3 group-hover:w-3 group-hover:opacity-100 group-hover:mr-2 text-amber-500" />
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Details - 5 Columns Wide */}
          <motion.div variants={fadeSlideUpItem} className="lg:col-span-5">
            <h4 className="mb-8 text-sm font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
              <span className="h-1 w-6 bg-amber-500 rounded-full"></span>
              Get in Touch
            </h4>
            <div className="grid gap-6">
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+918651070831"
                  className="group flex items-center gap-4 text-sm font-bold text-slate-700 hover:text-amber-600 transition-all"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Primary Contact</span>
                    +91 8651070831
                  </div>
                </a>
                <a
                  href="tel:+918541849118"
                  className="group flex items-center gap-4 text-sm font-bold text-slate-700 hover:text-amber-600 transition-all"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Secondary Contact</span>
                    +91 8541849118
                  </div>
                </a>
              </div>

              <a
                href="mailto:jkinteriorofficial@gmail.com"
                className="group flex items-center gap-4 text-sm font-bold text-slate-700 hover:text-amber-600 transition-all"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 group-hover:bg-amber-600 group-hover:text-white transition-all">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="break-all">jkinteriorofficial@gmail.com</span>
              </a>

              <div className="flex items-start gap-4 text-sm font-bold text-slate-700">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="pt-1 leading-snug">
                  Forbesganj Dumariya,<br />Araria, Bihar - 854318
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          variants={fadeSlideUp}
          className="mt-20 flex flex-col items-center justify-between gap-8 border-t border-slate-100 pt-8 md:flex-row"
        >
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              © {currentYear} JK Interior Forbesganj
            </p>
            <p className="mt-1 text-[10px] font-bold text-slate-500">
              Araria's Most Trusted Interior Contractor
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Expertise by
              </span>
              <span className="text-[11px] font-black text-amber-600 flex items-center gap-1.5">
                Jitendra Kumar <ExternalLink size={12} className="opacity-70" />
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

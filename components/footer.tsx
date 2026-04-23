"use client"

import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, ExternalLink, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 relative overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-50/60 blur-[100px] rounded-full" />

      <motion.div
        className="mx-auto max-w-7xl px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
          
          {/* Brand Profile */}
          <motion.div variants={fadeSlideUpItem} className="space-y-6">
            <Image 
              src="/logo.png" 
              alt="JK Interior Logo" 
              width={180} 
              height={60} 
              className="h-14 w-auto object-contain"
            />
            <p className="text-sm leading-relaxed text-slate-600 font-medium">
              Bihar ka bharosemand interior contractor. Hum dete hain premium quality False Ceiling aur Modern Interior designs, jo aapke ghar ko banaye behetarin.
            </p>
            <div className="flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-amber-500 hover:text-white transition-all shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-amber-500 hover:text-white transition-all shadow-sm">
                <Instagram size={18} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-amber-500 hover:text-white transition-all shadow-sm">
                <Youtube size={18} />
              </a>
            </div>
          </motion.div>

          {/* Our Services - Added for better look */}
          <motion.div variants={fadeSlideUpItem}>
            <h4 className="mb-7 text-xs font-black uppercase tracking-widest text-slate-900 border-l-2 border-amber-500 pl-3">
              Hamari Services
            </h4>
            <ul className="space-y-3">
              {["PVC False Ceiling", "Gypsum Board Work", "WPC Fluted Panels", "UV Marble Sheets", "Modular Kitchen"].map((item) => (
                <li key={item} className="flex items-center text-sm font-bold text-slate-500 hover:text-amber-600 transition-colors cursor-pointer group">
                  <ChevronRight size={14} className="mr-2 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div variants={fadeSlideUpItem}>
            <h4 className="mb-7 text-xs font-black uppercase tracking-widest text-slate-900 border-l-2 border-amber-500 pl-3">
              Useful Links
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "About Why Us", href: "/about" },
                { label: "Our Gallery", href: "/gallery" },
                { label: "Contact Us", href: "/contact" },
                { label: "Service Areas", href: "/#areas" }
              ].map((link) => (
                <a key={link.label} href={link.href} className="text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Details - Numbers Updated */}
          <motion.div variants={fadeSlideUpItem}>
            <h4 className="mb-7 text-xs font-black uppercase tracking-widest text-slate-900 border-l-2 border-amber-500 pl-3">
              Get in Touch
            </h4>
            <div className="space-y-5">
              <div className="space-y-3">
                <a href="tel:+918651070831" className="group flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-amber-600 transition-all">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                    <Phone size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-tighter">WhatsApp / Call</span>
                    +91 8651070831
                  </div>
                </a>
                <a href="tel:+918541849118" className="group flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-amber-600 transition-all">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                    <Phone size={16} />
                  </div>
                  +91 8541849118
                </a>
              </div>

              <a href="mailto:jkinteriorofficial@gmail.com" className="group flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                  <Mail size={16} />
                </div>
                <span className="break-all">jkinteriorofficial@gmail.com</span>
              </a>

              <div className="flex items-start gap-3 text-sm font-bold text-slate-600 pt-2 border-t border-slate-50">
                <MapPin size={18} className="text-amber-500 mt-1 shrink-0" />
                <span>Forbesganj Dumariya, Araria, Bihar - 854318</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Copyright and Dev Credit */}
        <motion.div 
          variants={fadeSlideUp}
          className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              © {new Date().getFullYear()} JK Interior Forbesganj
            </p>
            <p className="text-[10px] font-bold text-amber-600 mt-1 uppercase tracking-widest">
              Aapka Ghar, Hamaari Pehchaan
            </p>
          </div>

          <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-full border border-slate-100 shadow-sm transition-transform hover:scale-105">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
              Developed by
            </span>
            <span className="text-[10px] font-black text-slate-900 flex items-center gap-1.5">
              Jitendra Kumar <ExternalLink size={12} className="text-amber-500" />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Phone, Mail, Menu, X, MapPin } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#home", label: "Home", labelHi: "होम" },
  { href: "#services", label: "Services", labelHi: "सेवाएं" },
  { href: "#why-us", label: "Why Us", labelHi: "क्यों चुनें" },
  { href: "#gallery", label: "Gallery", labelHi: "गैलरी" },
  { href: "#areas", label: "Areas", labelHi: "सेवा क्षेत्र" },
  { href: "#contact", label: "Contact", labelHi: "संपर्क" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none",
        scrolled ? "top-2 sm:top-3" : "top-4 sm:top-6",
      )}
    >
      <motion.nav
        layout
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        className={cn(
          "pointer-events-auto w-full max-w-5xl rounded-full border border-gold/25 glass-panel shadow-[0_8px_40px_rgba(37,99,235,0.12)] backdrop-blur-xl px-2 py-2 sm:px-4 sm:py-2.5",
          scrolled && "border-gold/35 shadow-[0_12px_48px_rgba(37,99,235,0.18)]",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="relative group shrink-0 pl-1">
            <div className="absolute -inset-1 rounded-full bg-gold/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image
              src="/logo.png"
              alt="JK Interior Logo"
              width={160}
              height={52}
              className="relative h-9 w-auto sm:h-10 object-contain"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center min-w-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-gold transition-colors rounded-full hover:bg-blue-50"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <a
              href="tel:+918651070831"
              className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-white/[0.03] px-2.5 py-1.5 text-gold hover:border-gold/40 transition-colors"
            >
              <Phone className="h-3 w-3 fill-gold shrink-0" />
              <span className="hidden xl:inline">+91 8651070831</span>
            </a>
            <a
              href="mailto:jkinteriorofficial@gmail.com"
              className="hidden xl:flex items-center gap-1 rounded-full px-2 py-1.5 hover:text-gold transition-colors"
              title="jkinteriorofficial@gmail.com"
            >
              <Mail className="h-3 w-3 shrink-0" />
            </a>
            <span className="hidden 2xl:flex items-center gap-1 text-gold/70">
              <MapPin className="h-3 w-3" />
              Bihar • Forbesganj
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/918651070831"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex gold-gradient text-primary-foreground text-[10px] sm:text-xs font-black uppercase tracking-tight px-4 py-2 rounded-full btn-luxury-glow luxury-animated-shine"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 rounded-full border border-gold/25 text-gold glass-panel"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden border-t border-gold/15 mt-2 pt-3"
            >
              <div className="flex flex-col gap-4 pb-2 max-h-[70vh] overflow-y-auto">
                <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase">
                  <a
                    href="tel:+918651070831"
                    className="inline-flex items-center gap-2 text-gold"
                  >
                    <Phone className="h-3 w-3 fill-gold" />
                    +91 8651070831
                  </a>
                  <a
                    href="mailto:jkinteriorofficial@gmail.com"
                    className="inline-flex items-center gap-2 text-muted-foreground"
                  >
                    <Mail className="h-3 w-3" />
                    jkinteriorofficial@gmail.com
                  </a>
                  <span className="flex items-center gap-1 text-muted-foreground w-full sm:w-auto">
                    <MapPin className="h-3 w-3 text-gold" />
                    Bihar • Forbesganj
                  </span>
                </div>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    onClick={() => setMobileOpen(false)}
                    className="flex flex-col border-b border-gold/10 pb-3"
                  >
                    <span className="text-lg font-black text-foreground">{link.label}</span>
                    <span className="text-xs text-gold/60">{link.labelHi}</span>
                  </motion.a>
                ))}
                <a
                  href="https://wa.me/918651070831"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-gradient text-center rounded-2xl py-3.5 text-base font-black text-primary-foreground btn-luxury-glow luxury-animated-shine"
                >
                  Let&apos;s Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}

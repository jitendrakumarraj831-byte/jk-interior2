"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Phone, Mail, Menu, X, MapPin } from "lucide-react"
import Link from "next/link"

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

  // स्क्रॉल करने पर नेवबार का स्टाइल बदलने के लिए
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* 1. प्रीमियम टॉप बार */}
      <div className="bg-background/80 backdrop-blur-md border-b border-gold/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-6 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <a href="tel:+918651070831" className="flex items-center gap-2 text-gold transition-all hover:scale-105">
              <Phone className="h-3 w-3 fill-gold" />
              <span>+91 8651070831</span>
            </a>
            <a href="mailto:jkinteriorofficial@gmail.com" className="hidden items-center gap-2 text-muted-foreground transition-colors hover:text-gold sm:flex">
              <Mail className="h-3 w-3" />
              <span>jkinteriorofficial@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground/80">
            <MapPin className="h-3 w-3 text-gold" />
            <span>Bihar • Forbesganj</span>
          </div>
        </div>
      </div>

      {/* 2. मेन नेविगेशन (Glassmorphism Style) */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-gold/20 py-2 shadow-2xl shadow-gold/5" 
          : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          
          {/* Logo with Glow */}
          <Link href="/" className="relative group">
            <div className="absolute -inset-2 bg-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image
              src="/logo.png"
              alt="JK Interior Logo"
              width={180}
              height={60}
              className="relative object-contain h-12 w-auto md:h-14 transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Links - Modern Spacing & Hover */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-gold transition-all relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* WhatsApp Action Button */}
          <div className="hidden lg:block">
            <a
              href="https://wa.me/918651070831"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-background px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-tighter hover:bg-gold-hover hover:scale-105 transition-all shadow-lg shadow-gold/20"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-gold/10 border border-gold/20 text-gold lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu - Modern Animated Slide */}
        {mobileOpen && (
          <div className="absolute top-full left-0 w-full border-t border-gold/10 bg-background/95 backdrop-blur-2xl px-6 pb-10 pt-6 lg:hidden animate-in fade-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-col group"
                >
                  <span className="text-xl font-black text-foreground group-hover:text-gold transition-colors">{link.label}</span>
                  <span className="text-xs text-gold/60 font-medium">{link.labelHi}</span>
                </a>
              ))}
              <a
                href="https://wa.me/918651070831"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold mt-4 rounded-2xl px-5 py-4 text-center text-lg font-black text-background shadow-xl shadow-gold/20"
              >
                Let's Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

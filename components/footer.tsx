"use client"

import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { m } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

export default function Footer() {
  return (
    <footer className="border-t border-gold/15 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(219,234,254,0.35)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-48 bg-blue-200/25 blur-3xl rounded-full pointer-events-none" />
      <m.div
        className="mx-auto max-w-7xl px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <m.div
          className="grid gap-8 md:grid-cols-3"
          variants={staggerContainer}
        >
          <m.div variants={fadeSlideUpItem}>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="JK Interior – False Ceiling Contractor & Interior Designer in Forbesganj, Araria Bihar"
                width={140}
                height={50}
                className="object-contain h-12 w-auto"
                loading="lazy"
              />
            </div>

            <p className="text-[10px] uppercase tracking-widest text-gold font-mono">
              Modern Interior & Ceiling
            </p>

            <p className="text-sm leading-relaxed text-muted-foreground font-mono">
              Premium interior design and ceiling solutions in Bihar.
            </p>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground font-mono">
              बिहार में प्रीमियम इंटीरियर डिजाइन और सीलिंग समाधान।
            </p>
          </m.div>

          <m.div variants={fadeSlideUpItem}>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gold font-mono">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home", title: "JK Interior Forbesganj home" },
                { href: "/services", label: "Services", title: "False ceiling & interior services in Araria" },
                { href: "/about", label: "Why Us", title: "Why choose JK Interior in Forbesganj, Bihar" },
                { href: "/gallery", label: "Gallery", title: "Interior design & false ceiling gallery in Araria" },
                { href: "/#areas", label: "Service Areas", title: "Forbesganj, Araria, Jogbani, Narpatganj service areas" },
                { href: "/contact", label: "Contact", title: "Contact JK Interior Forbesganj for free quote" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  title={link.title}
                  className="text-sm text-muted-foreground transition-colors hover:text-gold font-mono"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </m.div>

          <m.div variants={fadeSlideUpItem}>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gold font-mono">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+918651070831"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold font-mono"
              >
                <Phone className="h-3.5 w-3.5 text-gold" />
                +91 8651070831
              </a>
              <a
                href="tel:+918541849118"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold font-mono"
              >
                <Phone className="h-3.5 w-3.5 text-gold" />
                +91 8541849118
              </a>
              <a
                href="mailto:jkinteriorofficial@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold font-mono"
              >
                <Mail className="h-3.5 w-3.5 text-gold" />
                jkinteriorofficial@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground font-mono">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                <span>Forbesganj Dumariya, Bihar</span>
              </div>
            </div>
          </m.div>
        </m.div>

        <m.div
          variants={fadeSlideUp}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gold/15 pt-8 md:flex-row"
        >
          <p className="text-xs text-muted-foreground font-mono">
            {`© ${new Date().getFullYear()} JK Interior. All rights reserved.`}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            “Designed & Developed by Jitendra Kumar”
          </p>
        </m.div>
      </m.div>
    </footer>
  )
}

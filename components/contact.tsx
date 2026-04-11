"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, MessageCircle, Send, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Message sent successfully! / संदेश सफलतापूर्वक भेज दिया गया!")
    }, 2000)
  }

  return (
    <section id="contact" className="bg-background py-24 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "JK Interior",
            telephone: "+91-8541849118",
            email: "jkinteriorofficial@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Forbesganj Dumariya",
              addressLocality: "Forbesganj",
              addressRegion: "Bihar",
              postalCode: "854318",
              addressCountry: "IN",
            },
            url: "https://jkinterior.online",
          }),
        }}
      />

      <motion.div
        className="mx-auto max-w-7xl px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={staggerContainer}
      >
        <motion.div className="mb-16 text-center" variants={fadeSlideUp}>
          <span className="mb-4 inline-block rounded-full glass-panel border-gold/25 px-4 py-1.5 text-xs uppercase tracking-widest text-gold font-mono font-bold">
            Contact Us / संपर्क करें
          </span>
          <h3 className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans text-balance">
            Get In <span className="gold-text">Touch</span>
          </h3>
          <p className="mx-auto max-w-xl text-muted-foreground font-medium">
            Ready to transform your space? Contact us today for a free
            consultation.
            <br />
            <span className="text-gold/80">
              अपना स्पेस ट्रांसफॉर्म करने के लिए तैयार हैं? आज ही संपर्क करें।
            </span>
          </p>
        </motion.div>

        <motion.div
          className="grid gap-12 lg:grid-cols-2 items-start"
          variants={staggerContainer}
        >
          <motion.div className="space-y-8" variants={staggerContainer}>
            <motion.div
              className="grid gap-6 sm:grid-cols-2"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeSlideUpItem}
                className="rounded-xl glass-card border-gold/20 p-5 hover:border-gold/35 transition-colors"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 border border-gold/25 text-gold">
                  <Phone className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-2">Call Us</h4>
                <div className="flex flex-col gap-1 text-sm font-mono text-muted-foreground">
                  <a href="tel:+918651070831" className="hover:text-gold transition-colors">
                    +91 8651070831
                  </a>
                  <a href="tel:+918541849118" className="hover:text-gold transition-colors">
                    +91 8541849118
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={fadeSlideUpItem}
                className="rounded-xl glass-card border-gold/20 p-5 hover:border-gold/35 transition-colors"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 border border-gold/25 text-gold">
                  <Mail className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-2">Email Us</h4>
                <a
                  href="mailto:jkinteriorofficial@gmail.com"
                  className="text-sm font-mono text-muted-foreground hover:text-gold break-all transition-colors"
                >
                  jkinteriorofficial@gmail.com
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeSlideUpItem}
              className="rounded-xl glass-card border-gold/20 p-6"
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 border border-gold/25 text-gold">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">
                    Our Location
                  </h4>
                  <p className="text-muted-foreground font-medium text-sm">
                    Forbesganj Dumariya, Araria, Bihar - 854318
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    फोर्ब्सगंज दुमरिया, अररिया, बिहार
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeSlideUpItem}>
              <a
                href="https://wa.me/918651070831?text=Hello%20JK%20Interior%2C%20I%20am%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient flex items-center justify-center gap-3 rounded-xl px-8 py-4 text-base font-bold text-primary-foreground btn-luxury-glow luxury-animated-shine transition-transform hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp पर बात करें
              </a>
            </motion.div>

            <motion.div
              variants={fadeSlideUpItem}
              className="rounded-xl overflow-hidden glass-panel border-gold/20 h-48"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57395.73360410759!2d87.215505432488!3d26.302302345091763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef05610e25537d%3A0xc0236e788734d0b!2sForbesganj%2C%20Bihar!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="JK Interior Forbesganj Location"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeSlideUp}
            className="rounded-2xl glass-card border-gold/25 p-8 shadow-2xl shadow-black/30"
          >
            <h4 className="text-2xl font-bold text-foreground mb-6 font-sans">
              Send Us a Message
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-lg glass-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="Your contact number"
                    className="w-full rounded-lg glass-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select Service
                </label>
                <select className="w-full rounded-lg glass-input px-4 py-3 text-sm text-foreground focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all bg-transparent">
                  <option>False Ceiling (PVC/Gypsum)</option>
                  <option>PVC Wall Paneling</option>
                  <option>WPC Fluted Panels</option>
                  <option>UV Marble Sheet</option>
                  <option>Modular Kitchen</option>
                  <option>Full Home Interior</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full rounded-lg glass-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="relative w-full flex items-center justify-center gap-2 overflow-hidden rounded-lg gold-gradient py-4 text-sm font-bold text-primary-foreground btn-luxury-glow luxury-animated-shine transition-all hover:brightness-110 disabled:opacity-70"
              >
                <span className="relative z-[1] inline-flex items-center gap-2">
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Submit Request / अनुरोध भेजें
                </span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, MessageCircle, Loader2, Clock, Star } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

const easeLux = [0.22, 1, 0.36, 1] as const

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const shouldReduce = useReducedMotion()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") || "").trim()
    const phone = String(data.get("phone") || "").trim()
    const service = String(data.get("service") || "").trim()
    const message = String(data.get("message") || "").trim()

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, service, message }),
      keepalive: true,
    }).catch(() => {})

    const text =
      `Hello JK Interior!\n\n` +
      `Naam: ${name}\n` +
      `Phone: ${phone}\n` +
      `Service: ${service}\n` +
      `Message: ${message}\n\n` +
      `Mujhe is service ke baare me jaankari aur free quote chahiye.`

    const waUrl = `https://wa.me/918651070831?text=${encodeURIComponent(text)}`

    try {
      window.open(waUrl, "_blank", "noopener,noreferrer")
      form.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.65, ease: easeLux },
      }

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
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
            url: "https://www.jkinterior.online",
          }),
        }}
      />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1630] via-[#071126] to-[#0a1630]" />
        <div className="absolute inset-0 grid-texture opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.06),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div {...animProps} className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5">
            <MessageCircle className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 sm:text-xs">संपर्क करें</span>
          </div>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Get In <span className="hero-gradient-text">Touch</span>
          </h2>
          <p className="mx-auto max-w-xl text-base font-medium text-slate-400">
            Ready to transform your space? Contact us today for a free consultation.{" "}
            <span className="text-blue-400">अपना स्पेस ट्रांसफॉर्म करने के लिए आज ही संपर्क करें।</span>
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">
          {/* LEFT: Info */}
          <div className="space-y-5">
            {/* Contact Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div
                {...animProps}
                className="glass-card p-5 transition-all duration-300 hover:border-blue-400/40 card-hover"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)]">
                  <Phone className="h-5 w-5" />
                </div>
                <h4 className="mb-3 text-sm font-black uppercase tracking-wider text-blue-300">Call Us</h4>
                <div className="flex flex-col gap-1.5 text-sm font-bold">
                  <a href="tel:+918651070831" className="text-white hover:text-blue-300 transition-colors">+91 8651070831</a>
                  <a href="tel:+918541849118" className="text-slate-400 hover:text-blue-300 transition-colors">+91 8541849118</a>
                </div>
              </motion.div>

              <motion.div
                {...(shouldReduce ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.08 } })}
                className="glass-card p-5 transition-all duration-300 hover:border-blue-400/40 card-hover"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)]">
                  <Mail className="h-5 w-5" />
                </div>
                <h4 className="mb-3 text-sm font-black uppercase tracking-wider text-blue-300">Email Us</h4>
                <a
                  href="mailto:jkinteriorofficial@gmail.com"
                  className="text-sm font-bold text-slate-300 hover:text-blue-300 break-all transition-colors"
                >
                  jkinteriorofficial@gmail.com
                </a>
              </motion.div>
            </div>

            {/* Location */}
            <motion.div
              {...(shouldReduce ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.12 } })}
              className="glass-card p-5 transition-all duration-300 hover:border-blue-400/40 card-hover"
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/25">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Our Location</h4>
                  <p className="text-slate-400 font-semibold text-sm">Forbesganj Dumariya, Araria, Bihar - 854318</p>
                  <p className="text-xs text-slate-600 mt-1">फारबिसगंज डुमरिया, अररिया, बिहार</p>
                </div>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              {...(shouldReduce ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.15 } })}
              className="glass-card p-5 transition-all duration-300 hover:border-blue-400/40 card-hover"
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/25">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-2">Working Hours</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between gap-8">
                      <span className="text-slate-400">Mon – Sat</span>
                      <span className="text-white font-semibold">8:00 AM – 8:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span className="text-slate-400">Sunday</span>
                      <span className="text-white font-semibold">9:00 AM – 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div
              {...(shouldReduce ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.18 } })}
            >
              <a
                href="https://wa.me/918651070831?text=Hello%20JK%20Interior%2C%20I%20am%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 py-4 text-base font-black text-white shadow-[0_4px_24px_rgba(37,205,102,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_4px_32px_rgba(37,205,102,0.45)] active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp पर बात करें
              </a>
            </motion.div>

            {/* Map */}
            <motion.div
              {...(shouldReduce ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.2 } })}
              className="overflow-hidden rounded-2xl border border-blue-500/20 h-44 shadow-[0_4px_24px_rgba(0,0,20,0.4)]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.238476840656!2d87.2514!3d26.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDE3JzI0LjAiTiA4N8KwMTUnMDUuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JK Interior Forbesganj Location"
              />
            </motion.div>
          </div>

          {/* RIGHT: Form */}
          <motion.div
            {...(shouldReduce ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.1 } })}
            className="glass-card-bright rounded-3xl p-7 md:p-9"
          >
            {/* Form Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)]">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white">Send Us a Message</h4>
                <p className="text-xs text-slate-500">Free consultation, no obligation</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Your Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Enter your name"
                    className="w-full rounded-xl glass-input px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9+\-\s]{7,15}"
                    placeholder="Your contact number"
                    className="w-full rounded-xl glass-input px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Select Service</label>
                <select
                  name="service"
                  defaultValue="False Ceiling (PVC/Gypsum)"
                  className="w-full rounded-xl glass-input px-4 py-3.5 text-sm text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none appearance-none cursor-pointer"
                >
                  <option className="bg-[#0d1f3c] text-white">False Ceiling (PVC/Gypsum)</option>
                  <option className="bg-[#0d1f3c] text-white">PVC Wall Paneling</option>
                  <option className="bg-[#0d1f3c] text-white">WPC Fluted Panels</option>
                  <option className="bg-[#0d1f3c] text-white">UV Marble Sheet</option>
                  <option className="bg-[#0d1f3c] text-white">Modular TV Unit</option>
                  <option className="bg-[#0d1f3c] text-white">Modular Kitchen</option>
                  <option className="bg-[#0d1f3c] text-white">Full Home Interior</option>
                  <option className="bg-[#0d1f3c] text-white">Office Interior</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="How can we help you? Share your requirements..."
                  className="w-full rounded-xl glass-input px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-sm font-black text-white shadow-[0_4px_24px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_4px_32px_rgba(37,99,235,0.55)] transition-all disabled:opacity-70 active:scale-[0.98] luxury-animated-shine"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MessageCircle className="h-4 w-4" />
                )}
                WhatsApp पर भेजें / Send via WhatsApp
              </button>

              <p className="text-center text-[10px] font-medium text-slate-600">
                Your message will open WhatsApp directly. Email backup also sent.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

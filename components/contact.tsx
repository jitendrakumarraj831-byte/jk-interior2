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
    <section id="contact" className="py-24 relative overflow-hidden">
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
        className="mx-auto max-w-7xl px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={staggerContainer}
      >
        <motion.div className="mb-16 text-center" variants={fadeSlideUp}>
          <span className="mb-4 inline-block rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-xs uppercase tracking-widest text-amber-600 font-mono font-bold">
            Contact Us / संपर्क करें
          </span>
          <h3 className="mb-4 text-3xl font-black text-slate-900 md:text-5xl font-sans text-balance">
            Get In <span className="aurora-text">Touch</span>
          </h3>
          <p className="mx-auto max-w-xl text-slate-600 font-medium">
            Ready to transform your space? Contact us today for a free
            consultation.
            <br />
            <span className="text-amber-600/80">
              अपना स्पेस ट्रांसफॉर्म करने के लिए तैयार हैं? आज ही संपर्क करें।
            </span>
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <motion.div className="space-y-8" variants={staggerContainer}>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Call Card */}
              <motion.div
                variants={fadeSlideUpItem}
                className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:border-amber-300 transition-all duration-300"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                  <Phone className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-tight">Call Us</h4>
                <div className="flex flex-col gap-1 text-sm font-bold text-slate-600">
                  <a href="tel:+918651070831" className="hover:text-amber-600 transition-colors">
                    +91 8651070831
                  </a>
                  <a href="tel:+918541849118" className="hover:text-amber-600 transition-colors">
                    +91 8541849118
                  </a>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div
                variants={fadeSlideUpItem}
                className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:border-amber-300 transition-all duration-300"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                  <Mail className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-tight">Email Us</h4>
                <a
                  href="mailto:jkinteriorofficial@gmail.com"
                  className="text-sm font-bold text-slate-600 hover:text-amber-600 break-all transition-colors"
                >
                  jkinteriorofficial@gmail.com
                </a>
              </motion.div>
            </div>

            {/* Location Card */}
            <motion.div
              variants={fadeSlideUpItem}
              className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:border-amber-300 transition-all duration-300"
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">
                    Our Location
                  </h4>
                  <p className="text-slate-600 font-semibold text-sm">
                    Forbesganj Dumariya, Araria, Bihar - 854318
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    फारबिसगंज डुमरिया, अररिया, बिहार
                  </p>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div variants={fadeSlideUpItem}>
              <a
                href="https://wa.me/918651070831?text=Hello%20JK%20Interior%2C%20I%20am%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl px-8 py-4 text-base font-black bg-[#25D366] text-white shadow-lg shadow-green-500/20 transition-transform hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp पर बात करें
              </a>
            </motion.div>

            {/* Map Frame */}
            <motion.div
              variants={fadeSlideUpItem}
              className="rounded-2xl overflow-hidden border border-slate-200 h-48 shadow-inner"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.238476840656!2d87.2514!3d26.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDE3JzI0LjAiTiA4N8KwMTUnMDUuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JK Interior Forbesganj Location"
              />
            </motion.div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            variants={fadeSlideUp}
            className="rounded-3xl bg-slate-50 border border-slate-200 p-8 md:p-10 shadow-2xl shadow-slate-200/60"
          >
            <h4 className="text-2xl font-black text-slate-900 mb-6 font-sans">
              Send Us a Message
            </h4>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-xl bg-white border border-slate-200 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="Your contact number"
                    className="w-full rounded-xl bg-white border border-slate-200 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                  Select Service
                </label>
                <select className="w-full rounded-xl bg-white border border-slate-200 px-4 py-3.5 text-sm text-slate-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none appearance-none">
                  <option>False Ceiling (PVC/Gypsum)</option>
                  <option>PVC Wall Paneling</option>
                  <option>WPC Fluted Panels</option>
                  <option>UV Marble Sheet</option>
                  <option>Modular Kitchen</option>
                  <option>Full Home Interior</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full rounded-xl bg-white border border-slate-200 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none resize-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-4 text-sm font-black text-white shadow-lg shadow-amber-500/30 hover:bg-amber-600 transition-all disabled:opacity-70 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Submit Request / अनुरोध भेजें
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

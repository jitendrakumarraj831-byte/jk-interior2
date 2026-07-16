
import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, MessageCircle, Loader2, Clock, Star } from "lucide-react"
import { motion } from "framer-motion"

const easeLux = [0.22, 1, 0.36, 1] as const

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") || "").trim().slice(0, 100)
    const phone = String(data.get("phone") || "").trim().slice(0, 20)
    const service = String(data.get("service") || "").trim().slice(0, 100)
    const message = String(data.get("message") || "").trim().slice(0, 500)

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
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const animProps = !mounted
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.65, ease: easeLux },
      }

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] via-white to-[#f0fdf4]" />
        <div className="absolute inset-0 grid-texture opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(5,150,105,0.05),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div {...animProps} className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5">
            <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 sm:text-xs">संपर्क करें</span>
          </div>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Get In <span className="hero-gradient-text">Touch</span>
          </h2>
          <p className="mx-auto max-w-xl text-base font-medium text-gray-600">
            Ready to transform your space? Contact us today for a free consultation.{" "}
            <span className="text-emerald-700 font-semibold">अपना स्पेस ट्रांसफॉर्म करने के लिए आज ही संपर्क करें।</span>
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">
          {/* LEFT: Info */}
          <div className="space-y-5">
            {/* Contact Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div
                {...animProps}
                className="glass-card p-5 transition-all duration-300 hover:border-emerald-300 card-hover"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-[0_4px_16px_rgba(5,150,105,0.35)]">
                  <Phone className="h-5 w-5" />
                </div>
                <h4 className="mb-3 text-sm font-black uppercase tracking-wider text-emerald-700">Call Us</h4>
                <div className="flex flex-col gap-1.5 text-sm font-bold">
                  <a href="tel:+918541849118" className="text-gray-900 hover:text-emerald-700 transition-colors">+91 8541849118</a>
                  <a href="tel:+918651070831" className="text-gray-500 hover:text-emerald-700 transition-colors">+91 8651070831</a>
                </div>
              </motion.div>

              <motion.div
                {...(!mounted ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.08 } })}
                className="glass-card p-5 transition-all duration-300 hover:border-emerald-300 card-hover"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-[0_4px_16px_rgba(5,150,105,0.35)]">
                  <Mail className="h-5 w-5" />
                </div>
                <h4 className="mb-3 text-sm font-black uppercase tracking-wider text-emerald-700">Email Us</h4>
                <a
                  href="mailto:jkinteriorofficial@gmail.com"
                  className="text-sm font-bold text-gray-700 hover:text-emerald-700 break-all transition-colors"
                >
                  jkinteriorofficial@gmail.com
                </a>
              </motion.div>
            </div>

            {/* Location */}
            <motion.div
              {...(!mounted ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.12 } })}
              className="glass-card p-5 transition-all duration-300 hover:border-emerald-300 card-hover"
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-1">Our Location</h4>
                  <p className="text-gray-600 font-semibold text-sm">Damaria, Rewahi, Araria, Bihar - 854318</p>
                  <p className="text-xs text-gray-400 mt-1">दमरिया, रेवाही, अररिया, बिहार</p>
                </div>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              {...(!mounted ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.15 } })}
              className="glass-card p-5 transition-all duration-300 hover:border-emerald-300 card-hover"
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Working Hours</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between gap-8">
                      <span className="text-gray-500">Mon – Sat</span>
                      <span className="text-gray-900 font-semibold">8:00 AM – 8:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span className="text-gray-500">Sunday</span>
                      <span className="text-gray-900 font-semibold">9:00 AM – 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div
              {...(!mounted ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.18 } })}
            >
              <a
                href="https://wa.me/918651070831?text=Hello%20JK%20Interior%2C%20I%20am%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 py-4 text-base font-black text-white shadow-[0_4px_24px_rgba(37,211,102,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_4px_32px_rgba(37,211,102,0.45)] active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp पर बात करें
              </a>
            </motion.div>

            {/* Map */}
            <motion.div
              {...(!mounted ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.2 } })}
              className="overflow-hidden rounded-2xl border border-emerald-200 h-44 shadow-sm"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.238476840656!2d87.2514!3d26.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDE3JzI0LjAiTiA4N8KwMTUnMDUuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JK Interior Forbesganj Location"
              />
            </motion.div>
          </div>

          {/* RIGHT: Form */}
          <motion.div
            {...(!mounted ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.1 } })}
            className="glass-card-bright rounded-3xl p-7 md:p-9"
          >
            {/* Form Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-[0_4px_16px_rgba(5,150,105,0.35)]">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xl font-black text-gray-900">Send Us a Message</h4>
                <p className="text-xs text-gray-500">Free consultation, no obligation</p>
              </div>
            </div>

            {submitted && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-semibold text-emerald-700 text-center">
                ✅ Message sent! We'll contact you within 2 hours.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Your Name</label>
                  <input
                    required
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Enter your name"
                    className="w-full rounded-xl glass-input px-4 py-3.5 text-sm placeholder:text-gray-400 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-phone" className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
                  <input
                    required
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9+\-\s]{7,15}"
                    placeholder="Your contact number"
                    className="w-full rounded-xl glass-input px-4 py-3.5 text-sm placeholder:text-gray-400 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-service" className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Select Service</label>
                <select
                  id="contact-service"
                  name="service"
                  defaultValue="False Ceiling (PVC/Gypsum)"
                  className="w-full rounded-xl glass-input px-4 py-3.5 text-sm transition-all outline-none appearance-none cursor-pointer text-gray-800"
                >
                  <option>False Ceiling (PVC/Gypsum)</option>
                  <option>PVC Wall Paneling</option>
                  <option>WPC Fluted Panels</option>
                  <option>UV Marble Sheet</option>
                  <option>Modular TV Unit</option>
                  <option>Modular Kitchen</option>
                  <option>Full Home Interior</option>
                  <option>Office Interior</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Message</label>
                <textarea
                  id="contact-message"
                  required
                  name="message"
                  rows={4}
                  placeholder="How can we help you? Share your requirements..."
                  className="w-full rounded-xl glass-input px-4 py-3.5 text-sm placeholder:text-gray-400 transition-all outline-none resize-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-sm font-black text-white shadow-[0_4px_24px_rgba(5,150,105,0.35)] hover:bg-emerald-500 hover:shadow-[0_4px_32px_rgba(5,150,105,0.5)] transition-all disabled:opacity-70 active:scale-[0.98] luxury-animated-shine"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MessageCircle className="h-4 w-4" />
                )}
                WhatsApp पर भेजें / Send via WhatsApp
              </button>

              <p className="text-center text-[10px] font-medium text-gray-400">
                Your message will open WhatsApp directly. We respond within 2 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

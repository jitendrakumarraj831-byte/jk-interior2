
import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, MessageCircle, Loader2, Clock, Star } from "lucide-react"
import { motion } from "framer-motion"
import SectionHeader from "@/components/ui/section-header"
import { WhatsAppLink } from "@/components/ui/cta-links"
import { CALL_NUMBER, WA_NUMBER } from "@/lib/business-data"

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

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`

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

      {/* Background — a dark "invitation" panel; the form itself stays a bright card floating on it */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-[#04211a] via-[#0a3328] to-[#04211a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_80%_10%,rgba(245,158,11,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_90%,rgba(16,185,129,0.14),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <SectionHeader
          icon={MessageCircle}
          badge="संपर्क करें"
          headingSize="md"
          dark
          title={<>Get In <span className="hero-gradient-text">Touch</span></>}
          subtitle={
            <>
              Call, WhatsApp, or fill the form below — a real person from our Forbesganj office replies, not a bot.{" "}
              <span className="text-emerald-300 font-semibold">कॉल करें, WhatsApp करें, या नीचे फॉर्म भरें।</span>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">
          {/* LEFT: Info */}
          <div className="space-y-5">
            {/* Contact Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div
                {...animProps}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-[0_4px_16px_rgba(5,150,105,0.35)]">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-emerald-300">Call Us</h3>
                <div className="flex flex-col gap-1.5 text-sm font-bold">
                  <a href={`tel:${CALL_NUMBER}`} className="text-white hover:text-emerald-300 transition-colors">+91 8541849118</a>
                  <a href={`tel:+${WA_NUMBER}`} className="text-slate-400 hover:text-emerald-300 transition-colors">+91 8651070831</a>
                </div>
              </motion.div>

              <motion.div
                {...(!mounted ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.08 } })}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-[0_4px_16px_rgba(5,150,105,0.35)]">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-emerald-300">Email Us</h3>
                <a
                  href="mailto:jkinteriorofficial@gmail.com"
                  className="text-sm font-bold text-slate-200 hover:text-emerald-300 break-all transition-colors"
                >
                  jkinteriorofficial@gmail.com
                </a>
              </motion.div>
            </div>

            {/* Location */}
            <motion.div
              {...(!mounted ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.12 } })}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30"
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Our Location</h3>
                  <p className="text-slate-300 font-semibold text-sm">Damaria Rewahi, Forbesganj, Bihar 854318</p>
                  <p className="text-xs text-slate-500 mt-1">दमरिया रेवाही, फारबिसगंज, बिहार</p>
                </div>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              {...(!mounted ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.15 } })}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30"
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Working Hours</h3>
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
              {...(!mounted ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.18 } })}
            >
              <WhatsAppLink
                size="lg"
                message="Hello JK Interior, I am interested in your services."
                className="w-full rounded-2xl px-8 py-4 text-base shadow-[0_4px_24px_rgba(37,211,102,0.3)] hover:scale-[1.02] hover:shadow-[0_4px_32px_rgba(37,211,102,0.45)]"
              >
                WhatsApp पर बात करें
              </WhatsAppLink>
            </motion.div>

            {/* Map */}
            <motion.div
              {...(!mounted ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.2 } })}
              className="overflow-hidden rounded-2xl border border-white/10 h-44 shadow-sm"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.064681149018!2d87.2034309!3d26.2920031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39efa3c3a605cc61%3A0xac1175566c0d0926!2sJk%20interior!5e0!3m2!1sen!2sin!4v1784167435421!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JK Interior Rewahi Location"
              />
            </motion.div>
          </div>

          {/* RIGHT: Form — a bright invitation card set against the dark panel */}
          <motion.div
            {...(!mounted ? {} : { ...animProps, transition: { ...animProps.transition, delay: 0.1 } })}
            className="rounded-3xl bg-white p-7 shadow-[0_30px_80px_rgba(0,0,0,0.35)] ring-1 ring-amber-300/40 md:p-9"
          >
            {/* Form Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-[0_4px_16px_rgba(5,150,105,0.35)]">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">Send Us a Message</h3>
                <p className="text-xs text-gray-500">Free consultation, no obligation</p>
              </div>
            </div>

            {submitted && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-semibold text-emerald-700 text-center">
                ✅ WhatsApp opened in a new tab — tap Send there to reach us. We'll reply within 2 hours.
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
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-700 py-4 text-sm font-black text-white shadow-[0_4px_24px_rgba(5,150,105,0.35)] hover:bg-emerald-600 hover:shadow-[0_4px_32px_rgba(5,150,105,0.5)] transition-all disabled:opacity-70 active:scale-[0.98] luxury-animated-shine"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MessageCircle className="h-4 w-4" />
                )}
                WhatsApp पर भेजें / Send via WhatsApp
              </button>

              <p className="text-center text-[10px] font-medium text-gray-500">
                Your message will open WhatsApp directly. We respond within 2 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

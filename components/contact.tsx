"use client"

import { useEffect, useRef, useState } from "react"
import { Phone, Mail, MapPin, MessageCircle, Send, Loader2 } from "lucide-react"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
            entry.target.classList.remove("opacity-0")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Yahan aap apna form submission logic (Web3Forms, Formspree, etc.) add kar sakte hain
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Message sent successfully! / संदेश सफलतापूर्वक भेज दिया गया!")
    }, 2000)
  }

  return (
    <section ref={sectionRef} id="contact" className="bg-background py-24 relative overflow-hidden">
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "JK Interior",
            "telephone": "+91-8541849118",
            "email": "jkinteriorofficial@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Forbesganj Dumariya",
              "addressLocality": "Forbesganj",
              "addressRegion": "Bihar",
              "postalCode": "854318",
              "addressCountry": "IN"
            },
            "url": "https://jkinterior.online"
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4">
        <div className="reveal mb-16 text-center opacity-0 transition-all duration-700">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-mono font-bold">
            Contact Us / संपर्क करें
          </span>
          <h3 className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans text-balance">
            Get In <span className="gold-text">Touch</span>
          </h3>
          <p className="mx-auto max-w-xl text-muted-foreground font-medium">
            Ready to transform your space? Contact us today for a free consultation.
            <br />
            <span className="text-primary/80">अपना स्पेस ट्रांसफॉर्म करने के लिए तैयार हैं? आज ही संपर्क करें।</span>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Left Side: Contact Info */}
          <div className="space-y-8">
            <div className="reveal grid gap-6 sm:grid-cols-2 opacity-0 transition-all duration-500">
              {/* Phone */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 transition-colors">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-2">Call Us</h4>
                <div className="flex flex-col gap-1 text-sm font-mono text-muted-foreground">
                  <a href="tel:+918651070831" className="hover:text-primary">+91 8651070831</a>
                  <a href="tel:+918541849118" className="hover:text-primary">+91 8541849118</a>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 transition-colors">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-2">Email Us</h4>
                <a href="mailto:jkinteriorofficial@gmail.com" className="text-sm font-mono text-muted-foreground hover:text-primary break-all">
                  jkinteriorofficial@gmail.com
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className="reveal rounded-xl border border-border bg-card p-6 shadow-sm opacity-0 transition-all duration-500 delay-100">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">Our Location</h4>
                  <p className="text-muted-foreground font-medium text-sm">Forbesganj Dumariya, Araria, Bihar - 854318</p>
                  <p className="text-xs text-muted-foreground mt-1">फोर्ब्सगंज दुमरिया, अररिया, बिहार</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Link */}
            <div className="reveal opacity-0 transition-all duration-500 delay-200">
              <a
                href="https://wa.me/918651070831?text=Hello%20JK%20Interior%2C%20I%20am%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient flex items-center justify-center gap-3 rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp पर बात करें
              </a>
            </div>
            
            {/* Map Placeholder or Iframe */}
            <div className="reveal rounded-xl overflow-hidden border border-border h-48 opacity-0 transition-all duration-500 delay-300">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57395.73360410759!2d87.215505432488!3d26.302302345091763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef05610e25537d%3A0xc0236e788734d0b!2sForbesganj%2C%20Bihar!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="JK Interior Forbesganj Location"
              />
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="reveal rounded-2xl border border-border bg-card p-8 shadow-xl opacity-0 transition-all duration-700 delay-200">
            <h4 className="text-2xl font-bold text-foreground mb-6 font-sans">Send Us a Message</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-border bg-surface-alt px-4 py-3 text-sm focus:border-primary focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="Your contact number"
                    className="w-full rounded-lg border border-border bg-surface-alt px-4 py-3 text-sm focus:border-primary focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Service</label>
                <select className="w-full rounded-lg border border-border bg-surface-alt px-4 py-3 text-sm focus:border-primary focus:outline-none transition-all">
                  <option>False Ceiling (PVC/Gypsum)</option>
                  <option>PVC Wall Paneling</option>
                  <option>WPC Fluted Panels</option>
                  <option>UV Marble Sheet</option>
                  <option>Modular Kitchen</option>
                  <option>Full Home Interior</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full rounded-lg border border-border bg-surface-alt px-4 py-3 text-sm focus:border-primary focus:outline-none transition-all"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-4 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Submit Request / अनुरोध भेजें
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


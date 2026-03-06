"use client"

import { useEffect, useRef } from "react"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="reveal mb-16 text-center opacity-0">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-mono">
            Contact Us / संपर्क करें
          </span>
          <h3 className="mb-4 text-3xl font-bold text-foreground md:text-5xl font-sans text-balance">
            Get In <span className="gold-text">Touch</span>
          </h3>
          <p className="mx-auto max-w-xl text-muted-foreground font-mono">
            Ready to transform your space? Contact us today for a free consultation.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground font-mono">
            अपना स्पेस ट्रांसफॉर्म करने के लिए तैयार हैं? आज ही हमसे संपर्क करें।
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact info */}
          <div className="reveal space-y-6 opacity-0">
            {/* Phone cards */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground font-sans">
                <Phone className="h-5 w-5 text-primary" />
                Phone / फ़ोन
              </h4>
              <div className="space-y-3">
                <a
                  href="tel:+918651070831"
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface-alt p-4 transition-all hover:border-primary/40 hover:shadow-sm font-mono"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-foreground">+91 8651070831</span>
                </a>
                <a
                  href="tel:+918541849118"
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface-alt p-4 transition-all hover:border-primary/40 hover:shadow-sm font-mono"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-foreground">+91 8541849118</span>
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground font-sans">
                <Mail className="h-5 w-5 text-primary" />
                Email / ईमेल
              </h4>
              <a
                href="mailto:jkinteriorofficial@gmail.com"
                className="flex items-center gap-3 rounded-lg border border-border bg-surface-alt p-4 transition-all hover:border-primary/40 hover:shadow-sm font-mono"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-foreground">jkinteriorofficial@gmail.com</span>
              </a>
            </div>

            {/* Address */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground font-sans">
                <MapPin className="h-5 w-5 text-primary" />
                Address / पता
              </h4>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-surface-alt p-4 font-mono">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-foreground">Forbesganj Dumariya, Bihar</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    फोर्ब्सगंज दुमरिया, बिहार
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918651070831?text=Hello%20JK%20Interior%2C%20I%20am%20interested%20in%20your%20interior%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="gold-gradient flex items-center justify-center gap-3 rounded-xl px-8 py-5 text-base font-bold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:opacity-90 font-mono"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp पर बात करें / Chat on WhatsApp
            </a>
          </div>

          {/* Google Maps */}
          <div className="reveal opacity-0" style={{ animationDelay: "0.2s" }}>
            <div className="h-full min-h-[400px] overflow-hidden rounded-xl border border-border shadow-sm lg:min-h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57267.12037773839!2d87.23!3d26.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5c3b1e3b4ecb1%3A0x42b65ba8e6fb5c6a!2sForbesganj%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JK Interior Location - Forbesganj, Bihar"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

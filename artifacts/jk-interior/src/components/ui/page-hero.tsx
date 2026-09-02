import type { ReactNode } from "react"
import { MapPin, Phone, type LucideIcon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { CallLink, WhatsAppLink } from "@/components/ui/cta-links"
import { PHONE_PRIMARY_DISPLAY, PHONE_SECONDARY, PHONE_SECONDARY_DISPLAY } from "@/lib/business-data"

const easeLux = [0.22, 1, 0.36, 1] as const

interface PageHeroProps {
  icon?: LucideIcon
  eyebrow?: string
  /** The page's real, visible <h1> — replaces an sr-only heading. */
  title: ReactNode
  subtitle: ReactNode
  /** WhatsApp pre-filled message, tailored to what this page is about. */
  whatsappMessage: string
  whatsappLabel?: string
  callLabel?: string
}

/**
 * A compact, on-brand hero band for pages that otherwise jump straight from
 * the navbar into their first section (Services, Gallery, Contact, FAQ). Gives
 * every page a real, visible <h1> plus a one-line pitch tied to what that page
 * is actually about, with both official numbers one tap away.
 */
export default function PageHero({
  icon: Icon = MapPin,
  eyebrow = "Narpatganj · Forbesganj · Araria District, Bihar",
  title,
  subtitle,
  whatsappMessage,
  whatsappLabel = "Message on WhatsApp",
  callLabel,
}: PageHeroProps) {
  const shouldReduce = useReducedMotion()

  const anim = (delay = 0) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: easeLux, delay },
        }

  return (
    <section className="relative overflow-hidden pt-36 pb-12 sm:pb-14">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f0] via-[#fdfbf6] to-white" />
        <div className="absolute right-0 top-10 h-[380px] w-[380px] rounded-full bg-gold-100/50 blur-3xl" />
        <div className="absolute inset-0 grid-texture opacity-[0.05]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
        <motion.div {...anim(0)} className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50/90 px-4 py-1.5 shadow-xs backdrop-blur-md">
          <Icon className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 sm:text-xs">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1 {...anim(0.1)} className="mb-3 font-serif text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {title}
        </motion.h1>

        <motion.p {...anim(0.2)} className="mb-7 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
          {subtitle}
        </motion.p>

        <motion.div {...anim(0.3)} className="flex flex-wrap gap-3">
          <CallLink shine ariaLabel={`Call JK Interior on ${PHONE_PRIMARY_DISPLAY}`}>
            {callLabel ?? `Call ${PHONE_PRIMARY_DISPLAY}`}
          </CallLink>
          <a
            href={`tel:${PHONE_SECONDARY}`}
            aria-label={`Call JK Interior on the second line ${PHONE_SECONDARY_DISPLAY}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-gold-500/8 px-6 py-3.5 text-sm font-bold text-gold-700 backdrop-blur-md transition-all hover:border-gold-500/50 hover:bg-gold-500/15 active:scale-95"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {`Call ${PHONE_SECONDARY_DISPLAY}`}
          </a>
          <WhatsAppLink message={whatsappMessage} ariaLabel={whatsappLabel}>
            {whatsappLabel}
          </WhatsAppLink>
        </motion.div>
      </div>
    </section>
  )
}

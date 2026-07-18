import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const easeLux = [0.22, 1, 0.36, 1] as const

/**
 * Shared section-header primitive — the badge + heading + subtext + divider
 * block repeated at the top of every major home-page section. Centralizing it
 * keeps spacing, type scale, and reveal animation consistent across sections.
 */

export type SectionHeaderTone = "emerald" | "amber"

interface SectionHeaderProps {
  icon: LucideIcon
  badge: string
  headingId?: string
  /** Full heading content, e.g. <>Premium Interior <span className="hero-gradient-text">Solutions</span></> */
  title: ReactNode
  subtitle?: ReactNode
  subtitleSecondary?: ReactNode
  tone?: SectionHeaderTone
  /** Use on dark section backgrounds (e.g. the process timeline). */
  dark?: boolean
  /** "lg" adds the largest heading step (lg:text-6xl) for hero-adjacent sections. */
  headingSize?: "md" | "lg"
  className?: string
}

const TONE_BADGE: Record<SectionHeaderTone, { light: string; dark: string }> = {
  emerald: {
    light: "border-emerald-500/30 bg-emerald-50 text-emerald-700",
    dark: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
  amber: {
    light: "border-amber-300 bg-amber-50 text-amber-700",
    dark: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
}

const TONE_DIVIDER: Record<SectionHeaderTone, string> = {
  emerald: "via-emerald-500",
  amber: "via-amber-400",
}

export default function SectionHeader({
  icon: Icon,
  badge,
  headingId,
  title,
  subtitle,
  subtitleSecondary,
  tone = "emerald",
  dark = false,
  headingSize = "lg",
  className,
}: SectionHeaderProps) {
  const shouldReduce = useReducedMotion()

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.7, ease: easeLux },
      }

  const badgeTone = dark ? TONE_BADGE[tone].dark : TONE_BADGE[tone].light

  return (
    <motion.div {...animProps} className={cn("mb-14 text-center sm:mb-16 lg:mb-20", className)}>
      <div className={cn("mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-sm", badgeTone)}>
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="text-[10px] font-bold uppercase tracking-widest sm:text-xs">{badge}</span>
      </div>

      <h2
        id={headingId}
        className={cn(
          "mb-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl",
          headingSize === "lg" && "lg:text-6xl",
          dark ? "text-white" : "text-gray-900",
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p className={cn("mx-auto max-w-2xl text-base font-medium sm:text-lg", subtitleSecondary ? "mb-3" : "mb-2", dark ? "text-slate-400" : "text-gray-600")}>
          {subtitle}
        </p>
      )}
      {subtitleSecondary && (
        <p className={cn("mx-auto max-w-xl text-sm sm:text-base", dark ? "text-slate-500" : "text-gray-500")}>
          {subtitleSecondary}
        </p>
      )}

      <motion.div
        initial={shouldReduce ? {} : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8, ease: easeLux }}
        className={cn("mx-auto mt-6 h-px w-32 origin-center rounded-full bg-gradient-to-r from-transparent to-transparent", TONE_DIVIDER[tone])}
      />
    </motion.div>
  )
}

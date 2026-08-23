import type { MouseEvent, ReactNode } from "react"
import { Phone, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { CALL_NUMBER, WA_NUMBER } from "@/lib/business-data"

/**
 * Shared CTA link primitives — single source of truth for the phone number,
 * WhatsApp number, and message-encoding logic used by every "Call" / "WhatsApp"
 * button across the site. Size/variant presets cover the common cases; pass
 * `className` to fine-tune spacing or weight for a specific placement.
 */

export type CtaSize = "sm" | "md" | "lg"
export type CtaVariant = "solid" | "outline"

const SIZE_CLASSES: Record<CtaSize, string> = {
  sm: "px-3.5 py-2 text-[11px] gap-1.5 font-bold",
  md: "px-6 py-3.5 text-sm gap-2 font-bold",
  lg: "px-7 py-4 text-sm sm:px-8 sm:py-4 sm:text-base gap-2 font-black",
}

const ICON_SIZE: Record<CtaSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-4 w-4 sm:h-5 sm:w-5",
}

const BASE = "inline-flex items-center justify-center rounded-xl transition-all active:scale-95 touch-manipulation"

interface CtaLinkBaseProps {
  size?: CtaSize
  variant?: CtaVariant
  shine?: boolean
  icon?: boolean
  className?: string
  children?: ReactNode
  ariaLabel?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export interface CallLinkProps extends CtaLinkBaseProps {}

export function CallLink({
  size = "md",
  variant = "solid",
  shine = false,
  icon = true,
  className,
  children,
  ariaLabel = "Call JK Interior",
  onClick,
}: CallLinkProps) {
  const variantClasses =
    // gold-600 (#ab861d) contrasts only ~3.9:1 against white text (fails WCAG AA's 4.5:1);
    // gold-700 (#896918) clears it (~5.5:1) while staying the same brand hue.
    variant === "solid"
      ? "bg-gold-700 text-white shadow-[0_4px_24px_rgba(201, 162, 39,0.4)] hover:bg-gold-600 hover:shadow-[0_4px_32px_rgba(201, 162, 39,0.55)]"
      : "border border-gold-500/30 bg-gold-500/8 text-gold-700 hover:border-gold-500/50 hover:bg-gold-500/15"

  // WCAG 2.5.3 "Label in Name": the accessible name must contain the visible
  // text. When the visible label is a plain string, fold it into the aria-label
  // instead of letting a differently-worded (or differently-languaged) label
  // silently replace it for screen reader / voice-control users.
  const visibleText = typeof children === "string" ? children : undefined
  const accessibleName = visibleText && !ariaLabel.includes(visibleText) ? `${visibleText} – ${ariaLabel}` : ariaLabel

  return (
    <a
      href={`tel:${CALL_NUMBER}`}
      aria-label={accessibleName}
      onClick={onClick}
      className={cn(BASE, SIZE_CLASSES[size], variantClasses, shine && "luxury-animated-shine", className)}
    >
      {icon && <Phone className={ICON_SIZE[size]} aria-hidden="true" />}
      {children ?? "Call Now"}
    </a>
  )
}

export interface WhatsAppLinkProps extends CtaLinkBaseProps {
  /** Plain-text message pre-filled into the WhatsApp chat. */
  message?: string
}

const DEFAULT_WA_MESSAGE = "Hi JK Interior, I need interior design help."

export function WhatsAppLink({
  size = "md",
  variant = "solid",
  shine = false,
  icon = true,
  className,
  children,
  ariaLabel = "WhatsApp JK Interior",
  message = DEFAULT_WA_MESSAGE,
  onClick,
}: WhatsAppLinkProps) {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
  const variantClasses =
    // WhatsApp's brand green (#25D366) only contrasts ~2:1 against white text (fails WCAG AA);
    // #0F7A3D is a darker shade of the same hue that clears 4.5:1 while still reading as "WhatsApp green".
    variant === "solid"
      ? "bg-[#0F7A3D] text-white shadow-[0_4px_24px_rgba(15,122,61,0.35)] hover:bg-[#0c6b35] hover:shadow-[0_4px_32px_rgba(15,122,61,0.5)]"
      // #128C7E only contrasts 3.84:1 against this light mint background; #0e6b60 clears 4.5:1.
      : "border border-[#25D366]/40 bg-[#25D366]/10 text-[#0e6b60] hover:border-[#25D366]/60 hover:bg-[#25D366]/20"

  const visibleText = typeof children === "string" ? children : undefined
  const accessibleName = visibleText && !ariaLabel.includes(visibleText) ? `${visibleText} – ${ariaLabel}` : ariaLabel

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleName}
      onClick={onClick}
      className={cn(BASE, SIZE_CLASSES[size], variantClasses, shine && "luxury-animated-shine", className)}
    >
      {icon && <MessageCircle className={ICON_SIZE[size]} aria-hidden="true" />}
      {children ?? "WhatsApp Now"}
    </a>
  )
}

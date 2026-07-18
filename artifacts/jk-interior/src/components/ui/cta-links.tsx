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
    variant === "solid"
      ? "bg-emerald-600 text-white shadow-[0_4px_24px_rgba(5,150,105,0.4)] hover:bg-emerald-500 hover:shadow-[0_4px_32px_rgba(5,150,105,0.55)]"
      : "border border-emerald-500/30 bg-emerald-500/8 text-emerald-700 hover:border-emerald-500/50 hover:bg-emerald-500/15"

  return (
    <a
      href={`tel:${CALL_NUMBER}`}
      aria-label={ariaLabel}
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
    variant === "solid"
      ? "bg-[#25D366] text-white shadow-[0_4px_24px_rgba(37,211,102,0.35)] hover:bg-[#20c05c] hover:shadow-[0_4px_32px_rgba(37,211,102,0.5)]"
      : "border border-[#25D366]/40 bg-[#25D366]/10 text-[#128C7E] hover:border-[#25D366]/60 hover:bg-[#25D366]/20"

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(BASE, SIZE_CLASSES[size], variantClasses, shine && "luxury-animated-shine", className)}
    >
      {icon && <MessageCircle className={ICON_SIZE[size]} aria-hidden="true" />}
      {children ?? "WhatsApp Now"}
    </a>
  )
}

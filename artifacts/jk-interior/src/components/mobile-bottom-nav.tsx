import { useEffect, useRef } from "react"
import { Phone, MessageCircle, Calculator, MapPin } from "lucide-react"
import { useLocation } from "wouter"

const CALL_NUMBER = "+918541849118"
const WA_NUMBER = "918651070831"
const SCROLL_RETRY_MS = 60
const SCROLL_RETRY_MAX = 30

const items = [
  {
    key: "call",
    label: "Call",
    icon: Phone,
    href: `tel:${CALL_NUMBER}`,
    kind: "tel" as const,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi JK Interior, I need a free quotation for interior work.")}`,
    kind: "external" as const,
  },
  {
    key: "quote",
    label: "Quote",
    icon: Calculator,
    kind: "hash" as const,
    path: "/",
    hash: "calculator",
  },
  {
    key: "location",
    label: "Location",
    icon: MapPin,
    kind: "hash" as const,
    path: "/contact",
    hash: "map",
  },
] as const

export default function MobileBottomNav() {
  const [pathname, navigate] = useLocation()
  const pendingHash = useRef<string | null>(null)

  const scrollToHash = (hash: string, attempt = 0) => {
    const el = document.getElementById(hash)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      pendingHash.current = null
      return
    }
    if (attempt >= SCROLL_RETRY_MAX) {
      pendingHash.current = null
      return
    }
    setTimeout(() => scrollToHash(hash, attempt + 1), SCROLL_RETRY_MS)
  }

  useEffect(() => {
    if (pendingHash.current) scrollToHash(pendingHash.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (pathname === "/admin") return null

  return (
    <nav
      className="mobile-cta-bar md:hidden"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const isActive = item.kind === "hash" && pathname === item.path
          const content = (
            <>
              <item.icon className={`h-5 w-5 ${item.key === "whatsapp" ? "text-[#25D366]" : "text-emerald-600"}`} aria-hidden="true" />
              <span className="text-[10px] font-bold text-gray-700">{item.label}</span>
            </>
          )
          const className =
            "flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-all active:scale-95 touch-manipulation" +
            (isActive ? " bg-emerald-50" : "")

          if (item.kind === "external") {
            return (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                aria-label={item.label}
              >
                {content}
              </a>
            )
          }

          if (item.kind === "tel") {
            return (
              <a key={item.key} href={item.href} className={className} aria-label={item.label}>
                {content}
              </a>
            )
          }

          return (
            <button
              key={item.key}
              type="button"
              className={className}
              aria-label={item.label}
              onClick={() => {
                if (pathname === item.path) {
                  scrollToHash(item.hash)
                } else {
                  pendingHash.current = item.hash
                  navigate(item.path)
                }
              }}
            >
              {content}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

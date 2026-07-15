import { Phone, MessageCircle, Calculator, MapPin } from "lucide-react"
import { Link, useLocation } from "wouter"

const CALL_NUMBER = "+918541849118"
const WA_NUMBER = "918651070831"

const items = [
  {
    key: "call",
    label: "Call",
    icon: Phone,
    href: `tel:${CALL_NUMBER}`,
    external: false,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi JK Interior, I need a free quotation for interior work.")}`,
    external: true,
  },
  {
    key: "quote",
    label: "Quote",
    icon: Calculator,
    href: "/#calculator",
    external: false,
  },
  {
    key: "location",
    label: "Location",
    icon: MapPin,
    href: "/contact#map",
    external: false,
  },
] as const

export default function MobileBottomNav() {
  const [pathname] = useLocation()

  if (pathname === "/admin") return null

  return (
    <nav
      className="mobile-cta-bar md:hidden"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const isActive = pathname === item.href
          const content = (
            <>
              <item.icon className={`h-5 w-5 ${item.key === "whatsapp" ? "text-[#25D366]" : "text-emerald-600"}`} aria-hidden="true" />
              <span className="text-[10px] font-bold text-gray-700">{item.label}</span>
            </>
          )
          const className =
            "flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-all active:scale-95 touch-manipulation" +
            (isActive ? " bg-emerald-50" : "")

          if (item.external) {
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

          if (item.href.startsWith("tel:")) {
            return (
              <a key={item.key} href={item.href} className={className} aria-label={item.label}>
                {content}
              </a>
            )
          }

          return (
            <Link key={item.key} href={item.href} className={className} aria-label={item.label}>
              {content}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

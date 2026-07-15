import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Gift, Phone } from "lucide-react"

const WA_NUMBER = "918651070831"
const CALL_NUMBER = "+918541849118"
const SESSION_KEY = "jk_any_popup_shown"
const SHOW_AFTER_MS = 25000
const SHOW_AFTER_SCROLL_PCT = 55

export default function LeadPopup() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem(SESSION_KEY)) return
    if (window.location.pathname === "/admin") return

    let shown = false
    const reveal = () => {
      if (shown) return
      if (sessionStorage.getItem(SESSION_KEY)) return
      shown = true
      setOpen(true)
      sessionStorage.setItem(SESSION_KEY, "1")
    }

    const timer = setTimeout(reveal, SHOW_AFTER_MS)

    const onScroll = () => {
      const pct =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (pct >= SHOW_AFTER_SCROLL_PCT) reveal()
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const text =
      `Hello JK Interior! Main free site visit / quote chahta hoon.\n\n` +
      `Naam: ${name}\nPhone: ${phone}`
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer")
    setSent(true)
    setTimeout(() => setOpen(false), 1400)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[900] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-4 pb-4 sm:pb-0"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Free site visit offer"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-2xl"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 text-gray-500 hover:bg-white hover:text-gray-800 transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 px-6 pt-8 pb-6 text-white">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black leading-tight">रुकिए! Free Site Visit बुक करें</h3>
              <p className="mt-1.5 text-sm text-emerald-50/90">
                आज ही request करें और पाएं free measurement + instant quotation। कोई obligation नहीं।
              </p>
            </div>

            <div className="px-6 py-6">
              {sent ? (
                <p className="text-center text-sm font-semibold text-emerald-700 py-6">
                  ✅ WhatsApp खुल गया — बस message send करें!
                </p>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="आपका नाम"
                    className="w-full rounded-xl glass-input px-4 py-3 text-sm outline-none"
                  />
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9+\-\s]{7,15}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="फोन / WhatsApp नंबर"
                    className="w-full rounded-xl glass-input px-4 py-3 text-sm outline-none"
                  />
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-black text-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all hover:bg-[#20c05c] active:scale-95"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Free Site Visit माँगें
                  </button>
                  <a
                    href={`tel:${CALL_NUMBER}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-3 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-100 active:scale-95"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    या सीधे कॉल करें: {CALL_NUMBER}
                  </a>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

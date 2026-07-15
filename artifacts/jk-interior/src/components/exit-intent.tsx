import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Percent, Phone } from "lucide-react"

const WA_NUMBER = "918651070831"
const CALL_NUMBER = "+918541849118"
const SESSION_KEY = "jk_any_popup_shown"
const EXIT_KEY = "jk_exit_intent_shown"

export default function ExitIntent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.location.pathname === "/admin") return
    // Coarse pointer devices (touch) don't have a reliable exit-intent signal.
    if (window.matchMedia?.("(pointer: coarse)").matches) return

    let armed = false
    const armTimer = setTimeout(() => { armed = true }, 4000)

    function onMouseLeave(e: MouseEvent) {
      if (!armed) return
      if (e.clientY > 0) return
      if (sessionStorage.getItem(SESSION_KEY) || sessionStorage.getItem(EXIT_KEY)) return
      setOpen(true)
      sessionStorage.setItem(SESSION_KEY, "1")
      sessionStorage.setItem(EXIT_KEY, "1")
    }

    document.addEventListener("mouseleave", onMouseLeave)
    return () => {
      clearTimeout(armTimer)
      document.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[900] flex items-center justify-center bg-black/55 backdrop-blur-sm px-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Special offer before you leave"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-2xl text-center"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 text-gray-500 hover:bg-white hover:text-gray-800 transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-7 pt-9 pb-2">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <Percent className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">रुकिए, जाने से पहले!</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Complete interior package पर <span className="font-bold text-emerald-700">combo discount</span> पाएं —
                सिर्फ आज site visit book करने पर। No hidden charges, no obligation.
              </p>
            </div>

            <div className="px-7 pb-8 pt-4 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi JK Interior, mujhe combo discount offer ke baare mein jaankari chahiye. Free site visit book karna hai.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-black text-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all hover:bg-[#20c05c] active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                Offer Claim करें — WhatsApp
              </a>
              <a
                href={`tel:${CALL_NUMBER}`}
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-3 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-100 active:scale-95"
              >
                <Phone className="h-3.5 w-3.5" />
                Call: {CALL_NUMBER}
              </a>
              <button
                onClick={() => setOpen(false)}
                className="text-[11px] font-semibold text-gray-400 hover:text-gray-600 mt-1"
              >
                नहीं धन्यवाद, बाद में देखूंगा
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

"use client"

import { motion } from "framer-motion"
import { type LeadCard, WA_NUMBER } from "./chat-types"
import { IWA, ICal } from "./chat-icons"

export function LeadConfirmCard({ data }: { data: LeadCard }) {
  const rows = [
    { label: "👤 Name",    value: data.name },
    { label: "📱 Phone",   value: data.phone },
    { label: "📍 City",    value: data.city       || "—" },
    { label: "🔧 Service", value: data.service    || "—" },
    ...(data.estimate     ? [{ label: "💰 Estimate",  value: data.estimate }]     : []),
    ...(data.preferredTime ? [{ label: "📅 Visit",     value: data.preferredTime }] : []),
  ]
  const d  = new Date(data.timestamp)
  const ts = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`
  const waMsg = [`🏠 JK Interior Inquiry`,`👤 ${data.name}`,`📱 ${data.phone}`,data.city && `📍 ${data.city}`,data.service && `🔧 ${data.service}`,data.estimate && `💰 Estimate: ${data.estimate}`,data.preferredTime && `📅 Visit: ${data.preferredTime}`,"\nFree site visit confirm kar dijiye! 🙏"].filter(Boolean).join("\n")
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`
  const bookHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi JK Interior! Main ${data.name} hoon${data.city ? ` (${data.city})` : ""}. Free site visit book karna chahta/chahti hoon${data.preferredTime ? ` — ${data.preferredTime}` : ""}. Please confirm! 🙏`)}`
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-bl-sm overflow-hidden border border-emerald-200 shadow-lg bg-white">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-2">
        <span className="text-lg shrink-0">🎉</span>
        <div className="min-w-0"><p className="text-[11px] md:text-xs font-bold text-white leading-tight">Booking Confirmed!</p><p className="text-[9px] md:text-[10px] text-white/70">{ts}</p></div>
      </div>
      <div className="px-3 md:px-4 py-2 md:py-2.5 space-y-1.5">
        {rows.map(r => (<div key={r.label} className="flex items-start gap-2 text-[11px] md:text-xs"><span className="text-gray-400 shrink-0 w-16 md:w-20 text-[10px] md:text-[11px] font-medium">{r.label}</span><span className="font-semibold break-all text-[11px] md:text-[12px] text-gray-800 flex-1">{r.value}</span></div>))}
      </div>
      <div className="px-3 md:px-4 pb-3 md:pb-3.5 pt-1 md:pt-1.5 space-y-2">
        <p className="text-[10px] md:text-[11px] text-emerald-700 font-semibold text-center bg-emerald-50 rounded-lg py-1.5">Our team will contact you shortly!</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2 md:py-2.5 text-[10px] md:text-[11px] font-bold text-white hover:opacity-90 transition-all"><IWA /> WhatsApp</a>
          <a href={bookHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2 md:py-2.5 text-[10px] md:text-[11px] font-bold text-white hover:bg-emerald-500 transition-all"><ICal /> Book Visit</a>
        </div>
      </div>
    </motion.div>
  )
}

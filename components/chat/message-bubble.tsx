"use client"

import { motion } from "framer-motion"
import { galleryImages } from "@/lib/gallery-data"
import { type Message } from "./chat-types"
import { LeadConfirmCard } from "./lead-confirm-card"

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g)
  return (<>{parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong>
    if (p.startsWith("*") && p.endsWith("*"))   return <em key={i} className="not-italic text-[11px] opacity-70">{p.slice(1, -1)}</em>
    return <span key={i}>{p}</span>
  })}</>)
}

export function MessageBubble({ m, idx }: { m: Message & { galleryType?: string }; idx: number }) {
  return (
    <motion.div
      key={m.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.03 }}
      className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
    >
      {m.role === "bot" && m.kind !== "card" && (
        <div className="shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
          <span className="text-[8px] font-black text-white">JK</span>
        </div>
      )}
      {m.role === "bot" && m.kind === "card" && <div className="h-6 w-6 shrink-0" />}

      {m.kind === "card" && m.cardData ? (
        <LeadConfirmCard data={m.cardData} />
      ) : (
        <div
          className={`max-w-[85%] sm:max-w-[80%] whitespace-pre-line rounded-2xl px-3 md:px-4 py-2 md:py-2.5 text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed shadow-sm ${
            m.role === "user"
              ? "bg-gradient-to-br from-emerald-700 to-emerald-500 text-white rounded-br-sm break-words"
              : "bg-white text-gray-800 rounded-bl-sm border border-gray-200 break-words"
          }`}
        >
          <RichText text={m.text} />
          {m.galleryType && (
            <div className="mt-2 md:mt-3 flex gap-2 md:gap-3 overflow-x-auto pb-1.5">
              {galleryImages
                .filter(img => img.category === m.galleryType)
                .slice(0, 6)
                .map((img, i) => (
                  <img key={i} src={img.src} alt={img.alt} className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl object-cover border border-gray-200 shrink-0" />
                ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

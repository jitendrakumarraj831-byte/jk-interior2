"use client"

import { motion } from "framer-motion"

export function TypingDots() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex items-end gap-2">
      <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-sm">
        <span className="text-[8px] font-black text-white tracking-tight">JK</span>
      </div>
      <div className="rounded-2xl rounded-bl-sm px-4 py-3 shadow-md bg-white border border-gray-100">
        <div className="flex gap-[5px] items-center h-[14px]">
          {[0, 160, 320].map(d => (
            <motion.span
              key={d}
              className="h-[7px] w-[7px] rounded-full bg-emerald-500"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: d / 1000 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

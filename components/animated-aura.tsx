"use client"

import { motion } from "framer-motion"

export default function AnimatedAura() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(201,162,74,0.12),transparent_50%)]" />
      <motion.div
        className="absolute -left-[20%] top-[5%] h-[min(90vw,720px)] w-[min(90vw,720px)] rounded-full bg-[radial-gradient(circle,rgba(212,175,106,0.22)_0%,rgba(139,111,48,0.06)_45%,transparent_70%)] blur-[100px]"
        animate={{
          x: [0, 48, -24, 0],
          y: [0, 36, 12, 0],
          scale: [1, 1.08, 1.02, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] bottom-[0%] h-[min(85vw,640px)] w-[min(85vw,640px)] rounded-full bg-[radial-gradient(circle,rgba(184,148,72,0.18)_0%,rgba(90,72,36,0.08)_50%,transparent_72%)] blur-[110px]"
        animate={{
          x: [0, -40, 28, 0],
          y: [0, -28, 16, 0],
          scale: [1.02, 1, 1.1, 1.02],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[50vh] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(230,201,128,0.08)_0%,transparent_65%)] blur-[80px]"
        animate={{ opacity: [0.35, 0.65, 0.4, 0.35], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(8,8,12,0.4)_50%,rgba(6,6,10,0.85)_100%)]" />
    </div>
  )
}

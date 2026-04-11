"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type BentoGridItem = {
  id: string
  className?: string
  children: ReactNode
}

type BentoGridProps = {
  items: BentoGridItem[]
  className?: string
}

export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[minmax(200px,auto)]",
        className,
      )}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -60px 0px" }}
          transition={{
            duration: 0.55,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn("min-h-[200px]", item.className)}
        >
          {item.children}
        </motion.div>
      ))}
    </div>
  )
}

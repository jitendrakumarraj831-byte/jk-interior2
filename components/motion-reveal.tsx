"use client"

import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

const easeLux = [0.22, 1, 0.36, 1] as const

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeLux },
  },
}

/** Use as child of a `staggerContainer` parent */
export const fadeSlideUpItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeLux },
  },
}

export const fadeSlideLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easeLux },
  },
}

export const fadeSlideRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easeLux },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
}

export function MotionView({
  children,
  className,
  direction = "up",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  direction?: "up" | "left" | "right" | "fade"
  delay?: number
}) {
  const initial =
    direction === "left"
      ? { opacity: 0, x: -28 }
      : direction === "right"
        ? { opacity: 0, x: 28 }
        : direction === "fade"
          ? { opacity: 0 }
          : { opacity: 0, y: 36 }

  const animate =
    direction === "left" || direction === "right"
      ? { opacity: 1, x: 0 }
      : direction === "fade"
        ? { opacity: 1 }
        : { opacity: 1, y: 0 }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.65, ease: easeLux, delay }}
    >
      {children}
    </motion.div>
  )
}

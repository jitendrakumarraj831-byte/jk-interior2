import type { Variants } from "framer-motion"

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

"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 35,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}

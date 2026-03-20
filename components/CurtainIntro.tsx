"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const HOLD = 0.4
const CURTAIN_DURATION = 1.4
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const

export default function CurtainIntro({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<"hold" | "reveal" | "done">("hold")

  useEffect(() => {
    if (sessionStorage.getItem("curtain-played")) {
      setPhase("done")
      onComplete?.()
      return
    }

    const revealTimer = setTimeout(() => setPhase("reveal"), HOLD * 1000)

    const doneTimer = setTimeout(() => {
      sessionStorage.setItem("curtain-played", "1")
      setPhase("done")
      onComplete?.()
    }, (HOLD + CURTAIN_DURATION) * 1000)

    return () => {
      clearTimeout(revealTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  if (phase === "done") return null

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left curtain */}
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2 bg-black origin-left"
            initial={{ scaleX: 1 }}
            animate={phase === "reveal" ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{ duration: CURTAIN_DURATION, ease: CURTAIN_EASE }}
          />

          {/* Right curtain */}
          <motion.div
            className="absolute top-0 right-0 h-full w-1/2 bg-black origin-right"
            initial={{ scaleX: 1 }}
            animate={phase === "reveal" ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{ duration: CURTAIN_DURATION, ease: CURTAIN_EASE }}
          />

          {/* Red accent line at the seam */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-red-500"
            initial={{ scaleY: 0, opacity: 1 }}
            animate={
              phase === "reveal"
                ? { scaleY: 1, opacity: 0 }
                : { scaleY: 1, opacity: 1 }
            }
            transition={
              phase === "reveal"
                ? { scaleY: { duration: 0.3 }, opacity: { duration: CURTAIN_DURATION, delay: 0.1 } }
                : { duration: 0.4, ease: "easeOut" }
            }
            style={{ originY: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

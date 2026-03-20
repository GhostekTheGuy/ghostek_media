"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FlagPL, FlagEN } from "@/components/ui/flag-icons"

interface LanguageSwitcherProps {
  flagClassName?: string
  className?: string
}

export function LanguageSwitcher({ flagClassName = "w-6 h-4", className = "" }: LanguageSwitcherProps) {
  const { i18n } = useTranslation()
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleLanguage = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    // Change language at the midpoint of the animation
    setTimeout(() => {
      i18n.changeLanguage(i18n.language === "en" ? "pl" : "en")
    }, 150)
    setTimeout(() => {
      setIsAnimating(false)
    }, 400)
  }, [i18n, isAnimating])

  return (
    <button
      onClick={toggleLanguage}
      className={`cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] ${className}`}
      aria-label="Toggle language"
      style={{ perspective: "200px" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i18n.language}
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {i18n.language === "en" ? (
            <FlagPL className={flagClassName} />
          ) : (
            <FlagEN className={flagClassName} />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}

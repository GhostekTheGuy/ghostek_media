"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CursorTrailProps {
  images: string[]
  className?: string
  containerId?: string
  fadeOutDuration?: number
}

interface TrailImage {
  id: number
  x: number
  y: number
  image: string
  createdAt: number
}

export function CursorTrail({ images, className = "", containerId, fadeOutDuration = 800 }: CursorTrailProps) {
  const [trail, setTrail] = useState<TrailImage[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const imageIndex = useRef(0)
  const idCounter = useRef(0)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (containerId) {
        const container = document.getElementById(containerId)
        if (container) {
          const rect = container.getBoundingClientRect()
          if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
            return
          }
        }
      }

      // Add image if moved enough distance
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y)
      if (dist > 60) {
        setTrail((t) => [
          ...t,
          {
            id: idCounter.current++,
            x: e.clientX,
            y: e.clientY,
            image: images[imageIndex.current++ % images.length],
            createdAt: Date.now(),
          },
        ])
        lastPos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const cleanupOld = () => {
      const now = Date.now()
      setTrail((t) => t.filter((img) => now - img.createdAt < fadeOutDuration + 1200))
      rafId = requestAnimationFrame(cleanupOld)
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    rafId = requestAnimationFrame(cleanupOld)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [containerId, images, fadeOutDuration, isMobile])

  if (isMobile) return null

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      <AnimatePresence>
        {trail.map((img) => {
          const age = Date.now() - img.createdAt
          const fadeStartTime = 1000 // Start fading after 1s
          const shouldFadeOut = age > fadeStartTime

          return (
            <motion.img
              key={img.id}
              src={img.image}
              alt=""
              className="absolute w-32 h-32 object-cover rounded-xl"
              style={{
                left: img.x - 64,
                top: img.y - 64,
              }}
              initial={{
                opacity: 0,
                scale: 0.6,
                rotate: Math.random() * 20 - 10,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: shouldFadeOut ? 0 : 1,
                scale: shouldFadeOut ? 0.5 : 1,
                rotate: shouldFadeOut ? Math.random() * 30 - 15 : 0,
                filter: shouldFadeOut ? "blur(6px)" : "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.3,
                rotate: Math.random() * 40 - 20,
                filter: "blur(8px)",
              }}
              transition={{
                duration: shouldFadeOut ? fadeOutDuration / 1000 : 0.6,
                ease: "easeOut",
              }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export function GlobalCursorDot() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <motion.div
      className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        left: position.x - 8,
        top: position.y - 8,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    />
  )
}

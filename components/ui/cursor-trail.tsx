"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface CursorTrailProps {
  images: string[]
  className?: string
  containerId?: string
}

interface TrailImage {
  id: number
  x: number
  y: number
  image: string
  createdAt: number
}

export function CursorTrail({ images, className = "", containerId }: CursorTrailProps) {
  const [trail, setTrail] = useState<TrailImage[]>([])
  const imageIndex = useRef(0)
  const idCounter = useRef(0)
  const lastPos = useRef({ x: 0, y: 0 })

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { damping: 30, stiffness: 500 })
  const springY = useSpring(cursorY, { damping: 30, stiffness: 500 })

  useEffect(() => {
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // container check
      if (containerId) {
        const c = document.getElementById(containerId)
        if (c) {
          const r = c.getBoundingClientRect()
          if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return
        }
      }

      // add image if moved enough
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y)
      if (dist > 60) {
        setTrail(t => [
          ...t,
          {
            id: idCounter.current++,
            x: e.clientX,
            y: e.clientY,
            image: images[imageIndex.current++ % images.length],
            createdAt: Date.now()
          }
        ])
        lastPos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const cleanupOld = () => {
      const now = Date.now()
      setTrail(t => t.filter(img => now - img.createdAt < 1500)) // 1.5s lifespan
      rafId = requestAnimationFrame(cleanupOld)
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    rafId = requestAnimationFrame(cleanupOld)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [containerId, images, cursorX, cursorY])

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      {trail.map(img => (
        <motion.img
          key={img.id}
          src={img.image}
          alt=""
          className="absolute w-32 h-32 object-cover rounded-xl"
          style={{
            left: img.x - 64, // center
            top: img.y - 64
          }}
          initial={{
            opacity: 0,
            scale: 0.6,
            rotate: Math.random() * 20 - 10,
            filter: "blur(4px)"
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)"
          }}
          exit={{
            opacity: 0,
            scale: 0.5,
            rotate: Math.random() * 30 - 15,
            filter: "blur(6px)"
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Cursor dot */}
      <motion.div
        className="fixed w-4 h-4 bg-red-500 rounded-full pointer-events-none z-50 shadow-[0_0_8px_rgba(255,0,0,0.6)]"
        style={{ left: springX, top: springY, x: -8, y: -8 }}
      />
    </div>
  )
}

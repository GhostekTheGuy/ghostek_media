"use client"

import { useRef, useEffect } from "react"
import { useScroll, useTransform, motion } from "framer-motion"

interface CurvedTextSliderProps {
  text?: string
  className?: string
  asBackground?: boolean
}

export default function CurvedTextSlider({
  text = "RAW. REAL. UNFILTERED. • CREATIVE DESIGN •",
  className = "",
  asBackground = false,
}: CurvedTextSliderProps) {
  const container = useRef<HTMLDivElement>(null)
  const paths = useRef<(SVGTextPathElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  })

  // Animate text along path on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (e) => {
      paths.current.forEach((path, i) => {
        if (path) {
          path.setAttribute("startOffset", -40 + i * 40 + e * 40 + "%")
        }
      })
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  const pathY = useTransform(scrollYProgress, [0, 0.3], [-100, 0])
  const pathOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0.5, 1])

  if (asBackground) {
    return (
      <div ref={container} className={`absolute inset-0 pointer-events-none ${className}`}>
        <motion.div
          style={{ y: pathY, opacity: pathOpacity }}
          className="w-full h-full flex items-center justify-center"
        >
          <svg className="w-full max-w-4xl" viewBox="0 0 250 90">
            <path
              fill="none"
              id="curve-bg"
              stroke="rgba(239, 68, 68, 0.2)"
              strokeWidth="0.5"
              d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
            />
            <text className="text-[4px] uppercase font-['Space_Grotesk']" style={{ fill: "rgba(239, 68, 68, 0.3)" }}>
              {[...Array(3)].map((_, i) => (
                <textPath key={i} ref={(ref) => (paths.current[i] = ref)} startOffset={i * 40 + "%"} href="#curve-bg">
                  {text}
                </textPath>
              ))}
            </text>
          </svg>
        </motion.div>
      </div>
    )
  }

  return (
    <div ref={container} className={`relative ${className}`}>
      <motion.div style={{ y: pathY, opacity: pathOpacity }} className="w-full py-10 bg-black relative z-30">
        <svg className="w-full" viewBox="0 0 250 90">
          <path
            fill="none"
            id="curve"
            stroke="rgba(239, 68, 68, 0.4)"
            strokeWidth="0.8"
            d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
          />
          <text className="text-[6px] uppercase font-['Space_Grotesk']" style={{ fill: "#ef4444" }}>
            {[...Array(3)].map((_, i) => (
              <textPath key={i} ref={(ref) => (paths.current[i] = ref)} startOffset={i * 40 + "%"} href="#curve">
                {text}
              </textPath>
            ))}
          </text>
        </svg>
      </motion.div>
    </div>
  )
}

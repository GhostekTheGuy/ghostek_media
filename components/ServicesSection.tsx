"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Code2,
  PenTool,
  Fingerprint,
  Orbit,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

const GRID_TOTAL = 20

function DotGrid() {
  const [activeDots, setActiveDots] = useState<Record<number, boolean>>({})
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  const sparkRandom = useCallback(() => {
    const count = 2 + Math.floor(Math.random() * 3)
    const picked: number[] = []
    while (picked.length < count) {
      const idx = Math.floor(Math.random() * GRID_TOTAL)
      if (!picked.includes(idx)) picked.push(idx)
    }

    setActiveDots((prev) => {
      const next = { ...prev }
      for (const idx of picked) {
        next[idx] = true
      }
      return next
    })

    for (const idx of picked) {
      const fadeDelay = 600 + Math.random() * 600
      const t = setTimeout(() => {
        setActiveDots((prev) => {
          const next = { ...prev }
          delete next[idx]
          return next
        })
      }, fadeDelay)
      timeoutsRef.current.push(t)
    }
  }, [])

  useEffect(() => {
    sparkRandom()
    let timer: NodeJS.Timeout
    const loop = () => {
      const delay = 800 + Math.random() * 700
      timer = setTimeout(() => {
        sparkRandom()
        loop()
      }, delay)
    }
    loop()
    return () => {
      clearTimeout(timer)
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [sparkRandom])

  return (
    <div
      className="grid gap-y-5 gap-x-5 mt-8 max-w-[140px]"
      style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
    >
      {Array.from({ length: GRID_TOTAL }).map((_, i) => {
        const isActive = Boolean(activeDots[i])
        return (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full mx-auto transition-all ease-in-out"
            style={{
              backgroundColor: isActive ? "#ef4444" : "#ffffff",
              opacity: isActive ? 1 : 0.15,
              boxShadow: isActive
                ? "0 0 6px 1px rgba(239,68,68,0.5)"
                : "none",
              transitionDuration: isActive ? "300ms" : "800ms",
            }}
          />
        )
      })}
    </div>
  )
}

interface ServiceItem {
  id: string
  title: string
  bottomLabel: string
  icon: typeof Code2
  image?: string
}

const servicesData: ServiceItem[] = [
  {
    id: "01",
    title: "Web Development",
    bottomLabel: "development",
    icon: Code2,
    image: "/images/keycaps.png",
  },
  {
    id: "02",
    title: "Product Design",
    bottomLabel: "design",
    icon: PenTool,
    image: "/images/reka.png",
  },
  {
    id: "03",
    title: "Brand Identity",
    bottomLabel: "branding",
    icon: Fingerprint,
    image: "/images/reka2.png",
  },
  {
    id: "04",
    title: "Motion and 3D",
    bottomLabel: "motion",
    icon: Orbit,
    image: "/images/ball.png",
  },
]

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      className="bg-black py-32 relative overflow-hidden"
      id="services"
      style={{ fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-2 text-white/30 text-sm tracking-wider">
              <p>002</p>
              <p>services</p>
            </div>
            <div className="md:col-span-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-tight max-w-2xl">
                Design, code, brand, animate - end to end.
              </h2>
            </div>
            <div className="md:col-span-4 flex justify-end">
              <p className="text-white/40 text-sm max-w-[200px] text-right leading-relaxed">
                One person. Full pipeline. No handoff friction.
              </p>
            </div>
          </div>
        </motion.header>

        {/* Main Accordion + Info Panel */}
        <div className="flex flex-col lg:flex-row h-auto lg:h-[600px] border-t border-b border-white/10">
          {/* Accordion */}
          <div className="flex flex-col lg:flex-row flex-1 h-full overflow-hidden">
            {servicesData.map((item, index) => {
              const isActive = activeIndex === index
              const isHovered = hoveredIndex === index
              const Icon = item.icon

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  style={{
                    willChange: "flex-grow",
                    flexGrow: isActive ? 1 : 0,
                    flexShrink: 0,
                    flexBasis: isActive ? "auto" : "120px",
                    minWidth: isActive ? "400px" : "120px",
                    maxWidth: isActive ? "600px" : "120px",
                  }}
                  className={
                    "relative group h-auto lg:h-full transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex flex-col overflow-hidden " +
                    (isActive
                      ? "bg-red-500 text-white z-10"
                      : "border-b lg:border-b-0 lg:border-r border-white/10 bg-transparent text-white/40 hover:bg-white/5 z-0")
                  }
                >
                  <div className="p-6 flex items-center gap-3 relative z-10">
                    <div
                      className={
                        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] " +
                        (isActive
                          ? "rotate-0"
                          : isHovered
                            ? "-translate-y-1 opacity-100"
                            : "opacity-50")
                      }
                    >
                      <ArrowUpRight
                        className={
                          "w-6 h-6 transition-transform duration-500 " +
                          (!isActive && !isHovered ? "-rotate-45" : "")
                        }
                      />
                    </div>
                    <span className="text-xl font-light tracking-wider">
                      {item.id}
                    </span>
                  </div>

                  <div
                    className={
                      "flex-1 px-6 pt-4 transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] " +
                      (isActive
                        ? "opacity-100 translate-y-0 delay-150 max-h-[500px] lg:max-h-none"
                        : "opacity-0 translate-y-4 pointer-events-none max-h-0 lg:max-h-none overflow-hidden")
                    }
                  >
                    <div className="pr-4 flex flex-col h-full">
                      <h3 className="text-2xl font-medium">
                        {item.title}
                      </h3>
                      <div
                        className="absolute inset-0 top-[60px] pointer-events-none overflow-visible"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-[135%] h-[135%] object-contain absolute top-1/2 left-1/2"
                            style={{
                              mixBlendMode: "multiply",
                              transform: "translate(calc(-50% + 70px), calc(-50% + 50px))",
                              maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                              WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-6 flex items-center gap-3 w-full z-10">
                    <div
                      className={
                        "transition-colors duration-[1200ms] " +
                        (isActive
                          ? "text-white"
                          : "text-white/20 group-hover:text-white/40")
                      }
                    >
                      {isActive ? (
                        <Icon className="w-5 h-5" />
                      ) : (
                        <div className="w-5 h-5 flex items-center justify-center text-xs tracking-wider opacity-50">
                          {"++"}
                        </div>
                      )}
                    </div>
                    <span
                      className={
                        "text-sm tracking-[0.3em] uppercase transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-left " +
                        (isActive
                          ? "opacity-100 translate-x-0 rotate-0"
                          : "opacity-0 lg:opacity-100 lg:-rotate-90 lg:absolute lg:bottom-[100px] lg:left-[30px] whitespace-nowrap")
                      }
                    >
                      {item.bottomLabel}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Info Panel */}
          <div className="hidden lg:flex flex-col w-[450px] p-10 bg-black shrink-0 justify-between">
            <div>
              <div className="flex justify-between items-center text-xs text-white/30 mb-12 uppercase tracking-[0.3em]">
                <span>Core Services</span>
                <span>4/4</span>
              </div>

              <h3 className="text-3xl text-white font-light leading-tight mb-6">
                Everything from concept to production, under one roof
              </h3>

              <p className="text-white/40 text-sm leading-relaxed mb-12">
                I handle the full creative and technical stack - so your
                project stays cohesive from first sketch to final deploy.
              </p>

              <DotGrid />
            </div>

            <div className="flex items-center gap-3 text-white/40 text-sm border-t border-white/10 pt-6 mt-8">
              <CheckCircle2 className="w-4 h-4 text-red-500" />
              <span>Design, develop, brand, animate.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-8">
          <div className="flex items-center gap-2">
            {servicesData.map((_, index) => (
              <div
                key={index}
                className={
                  "h-1.5 rounded-full transition-all duration-500 " +
                  (activeIndex === index ? "w-6 bg-red-500" : "w-2 bg-white/10")
                }
              />
            ))}
          </div>

          <button className="group flex items-center gap-4 hover:opacity-80 transition-opacity">
            <span className="text-white text-sm tracking-wider uppercase">
              Explore Services
            </span>
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

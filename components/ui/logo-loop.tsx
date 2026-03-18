"use client"

import { useRef, useEffect, useState, useCallback, type ReactNode } from "react"

interface LogoItem {
  node?: ReactNode
  src?: string
  alt?: string
  title?: string
  href?: string
  scale?: number
}

interface LogoLoopProps {
  logos: LogoItem[]
  speed?: number
  direction?: "left" | "right"
  logoHeight?: number
  gap?: number
  hoverSpeed?: number
  scaleOnHover?: boolean
  fadeOut?: boolean
  fadeOutColor?: string
  ariaLabel?: string
  className?: string
}

export default function LogoLoop({
  logos,
  speed = 100,
  direction = "left",
  logoHeight = 60,
  gap = 60,
  hoverSpeed,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = "#000000",
  ariaLabel = "Logo carousel",
  className,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const singleSetRef = useRef<HTMLDivElement>(null)
  const [copies, setCopies] = useState(2)
  const [duration, setDuration] = useState(20)
  const [ready, setReady] = useState(false)

  const calculate = useCallback(() => {
    const container = containerRef.current
    const singleSet = singleSetRef.current
    if (!container || !singleSet) return

    const containerWidth = container.offsetWidth
    const oneSetWidth = singleSet.scrollWidth

    if (oneSetWidth === 0) return

    // We need enough copies so that the total width >= 2x container width
    // This ensures when we translate -50%, there's always content visible
    const neededCopies = Math.max(2, Math.ceil((containerWidth * 2) / oneSetWidth) + 1)
    setCopies(neededCopies)

    // Duration = time to scroll one full set
    if (speed > 0) {
      setDuration(oneSetWidth / speed)
    }

    setReady(true)
  }, [speed])

  useEffect(() => {
    // Wait for all images to load before calculating
    const container = containerRef.current
    if (!container) return

    const images = container.querySelectorAll("img")
    let loadedCount = 0
    const totalImages = images.length

    const tryCalculate = () => {
      loadedCount++
      if (loadedCount >= totalImages) {
        calculate()
      }
    }

    if (totalImages === 0) {
      calculate()
    } else {
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++
        } else {
          img.addEventListener("load", tryCalculate, { once: true })
          img.addEventListener("error", tryCalculate, { once: true })
        }
      })
      if (loadedCount >= totalImages) calculate()
    }

    const observer = new ResizeObserver(calculate)
    observer.observe(container)
    return () => observer.disconnect()
  }, [logos, calculate])

  const pauseOnHover = hoverSpeed === 0
  const animName = direction === "left" ? "logo-loop-left" : "logo-loop-right"

  const renderLogo = (logo: LogoItem, i: number) => {
    const content = logo.node ? (
      <span
        style={{
          fontSize: logoHeight * 0.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: logoHeight,
          width: logoHeight,
          color: "currentColor",
          opacity: 0.8,
          transition: scaleOnHover ? "transform 0.3s ease, opacity 0.3s ease" : undefined,
        }}
        className={scaleOnHover ? "hover:scale-125 hover:!opacity-100" : ""}
      >
        {logo.node}
      </span>
    ) : logo.src ? (
      <img
        src={logo.src}
        alt={logo.alt || ""}
        draggable={false}
        style={{
          height: logoHeight * (logo.scale || 1),
          opacity: 0.8,
          width: "auto",
          objectFit: "contain",
          transition: scaleOnHover ? "transform 0.3s ease, opacity 0.3s ease" : undefined,
        }}
        className={scaleOnHover ? "hover:scale-125 hover:!opacity-100" : ""}
      />
    ) : null

    if (logo.href) {
      return (
        <a
          key={i}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          title={logo.title}
          style={{ marginRight: gap, flexShrink: 0, display: "flex", alignItems: "center" }}
        >
          {content}
        </a>
      )
    }

    return (
      <div
        key={i}
        title={logo.title}
        style={{ marginRight: gap, flexShrink: 0, display: "flex", alignItems: "center" }}
      >
        {content}
      </div>
    )
  }

  // Build the repeated sets
  const sets = Array.from({ length: copies }, (_, setIndex) =>
    logos.map((logo, logoIndex) => renderLogo(logo, setIndex * logos.length + logoIndex))
  )

  // The animation translates by (1/copies * 100)% — i.e. exactly one set worth
  const translatePercent = 100 / copies

  return (
    <>
      <style>{`
        @keyframes ${animName} {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${translatePercent}%); }
        }
      `}</style>
      <div
        ref={containerRef}
        className={className}
        role="marquee"
        aria-label={ariaLabel}
        style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "max-content",
            animation: ready ? `${animName} ${duration}s linear infinite` : "none",
          }}
          onMouseEnter={(e) => {
            if (pauseOnHover) e.currentTarget.style.animationPlayState = "paused"
          }}
          onMouseLeave={(e) => {
            if (pauseOnHover) e.currentTarget.style.animationPlayState = "running"
          }}
        >
          {/* Hidden measurement div for one set */}
          <div
            ref={singleSetRef}
            aria-hidden
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              visibility: "hidden",
              pointerEvents: "none",
            }}
          >
            {logos.map((logo, i) => renderLogo(logo, -1000 + i))}
          </div>

          {sets.map((set, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              {set}
            </div>
          ))}
        </div>

        {fadeOut && (
          <>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: 100,
                background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: 100,
                background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          </>
        )}
      </div>
    </>
  )
}

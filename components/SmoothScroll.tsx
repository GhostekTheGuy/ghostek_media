"use client"

import type React from "react"

import { useEffect } from "react"
import Lenis from "lenis"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })
    ;(window as any).lenis = lenis

    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="/#"]') as HTMLAnchorElement

      if (link) {
        e.preventDefault()
        const href = link.getAttribute("href")
        if (href) {
          const targetId = href.replace("/#", "")
          const targetElement = document.getElementById(targetId)

          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: 0,
              duration: 1.2,
            })
          }
        }
      }
    }

    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const targetId = hash.replace("#", "")
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          setTimeout(() => {
            lenis.scrollTo(targetElement, {
              offset: 0,
              duration: 1.2,
            })
          }, 100)
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    window.addEventListener("hashchange", handleHashChange)

    if (window.location.hash) {
      handleHashChange()
    }

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      window.removeEventListener("hashchange", handleHashChange)
      lenis.destroy()
      ;(window as any).lenis = null
    }
  }, [])

  return <>{children}</>
}

"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function PageTransition() {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const isAnchorLink = (url: string) => {
    return url.startsWith("#") || url.startsWith("/#")
  }

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsTransitioning(true)
    }

    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setIsTransitioning(false)
      }, 150) // Small delay to ensure smooth transition
    }

    // Listen for navigation events
    const originalPush = router.push
    const originalReplace = router.replace

    router.push = (...args) => {
      const url = args[0] as string
      if (isAnchorLink(url)) {
        return originalPush.apply(router, args)
      }

      handleRouteChangeStart()
      const result = originalPush.apply(router, args)

      // Check if result is a Promise
      if (result && typeof result.then === "function") {
        return result.then((res) => {
          handleRouteChangeComplete()
          return res
        })
      } else {
        // If not a Promise, handle completion with timeout
        setTimeout(handleRouteChangeComplete, 300)
        return result
      }
    }

    router.replace = (...args) => {
      const url = args[0] as string
      if (isAnchorLink(url)) {
        return originalReplace.apply(router, args)
      }

      handleRouteChangeStart()
      const result = originalReplace.apply(router, args)

      // Check if result is a Promise
      if (result && typeof result.then === "function") {
        return result.then((res) => {
          handleRouteChangeComplete()
          return res
        })
      } else {
        // If not a Promise, handle completion with timeout
        setTimeout(handleRouteChangeComplete, 300)
        return result
      }
    }

    // Listen for browser navigation (back/forward)
    const handlePopState = () => {
      handleRouteChangeStart()
      setTimeout(handleRouteChangeComplete, 300)
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      router.push = originalPush
      router.replace = originalReplace
      window.removeEventListener("popstate", handlePopState)
    }
  }, [router])

  return (
    <div
      className={`fixed inset-0 bg-black z-[10000] pointer-events-none transition-opacity duration-300 ease-in-out ${
        isTransitioning ? "opacity-100" : "opacity-0"
      }`}
    />
  )
}

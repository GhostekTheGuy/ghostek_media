"use client"

import { useEffect } from "react"

// Hook to track page views
export function usePageView(pagePath: string) {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch("/api/analytics/page-view", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pagePath }),
        })
      } catch (error) {
        console.error("Failed to track page view:", error)
      }
    }

    trackPageView()
  }, [pagePath])
}

// Function to track project views
export async function trackProjectView(projectId: number) {
  try {
    await fetch("/api/analytics/project-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId }),
    })
  } catch (error) {
    console.error("Failed to track project view:", error)
  }
}

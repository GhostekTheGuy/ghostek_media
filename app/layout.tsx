import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import { GlobalCursorDot } from "@/components/ui/cursor-trail"
import PageTransition from "@/components/ui/page-transition"
import { MobileMenuProvider } from "@/contexts/MobileMenuContext"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "ghostek-media",
  description: "get ready for masterpiece",
  generator: "cool",
  openGraph: {
    title: "Hubert Kolejko — Product Designer & Developer",
    description: "Combining design expertise with full-stack development to create visually appealing and user-friendly digital experiences.",
    url: "https://ghostekmedia.site",
    siteName: "ghostek-media",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hubert Kolejko — Creative. Technical.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubert Kolejko — Product Designer & Developer",
    description: "Combining design expertise with full-stack development to create visually appealing and user-friendly digital experiences.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-space-grotesk: ${spaceGrotesk.style.fontFamily};
}
        `}</style>
      </head>
      <body className={`${spaceGrotesk.variable} font-sans`}>
        <GlobalCursorDot />
        <PageTransition />
        <MobileMenuProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <ProgressiveBlur position="bottom" height="120px" className="fixed bottom-0 left-0 right-0 z-50" />
        </MobileMenuProvider>
      </body>
    </html>
  )
}

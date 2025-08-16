import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import { GlobalCursorDot } from "@/components/ui/cursor-trail"
import PageTransition from "@/components/ui/page-transition"
import { MobileMenuProvider } from "@/contexts/MobileMenuContext"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "ghostek-media",
  description: "get ready for masterpiece",
  generator: "cool",
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
        </MobileMenuProvider>
      </body>
    </html>
  )
}

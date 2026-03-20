"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  scroll?: boolean
}

export function Button({ children, href, onClick, className = "", scroll = false }: ButtonProps) {
  const content = (
    <div className="group flex items-center gap-4 hover:opacity-80 transition-opacity">
      <span className="text-white text-sm tracking-wider uppercase">{children}</span>
      <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
        <ArrowRight className="w-5 h-5" />
      </div>
    </div>
  )

  if (href) {
    const isExternal = href.startsWith("http")
    return (
      <Link
        href={href}
        scroll={scroll}
        className={`inline-block ${className}`}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  )
}

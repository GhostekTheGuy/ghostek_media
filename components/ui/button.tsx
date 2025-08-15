"use client"

import Link from "next/link"
import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  scroll?: boolean
}

export function Button({ children, href, onClick, className = "", scroll = false }: ButtonProps) {
  const baseClasses =
    "relative px-6 md:px-8 py-3 border border-white text-white text-sm tracking-wider overflow-hidden group transition-colors duration-300 z-10"
  const combinedClasses = `${baseClasses} ${className}`

  const buttonContent = (
    <>
      <span className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 -z-10"></span>
      <span className="relative z-10 group-hover:text-black transition-colors duration-300">{children}</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} scroll={scroll} className={`inline-block ${combinedClasses}`}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {buttonContent}
    </button>
  )
}

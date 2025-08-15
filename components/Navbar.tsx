"use client"

import { MobileMenu } from "@/components/ui/mobile-menu"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface NavbarProps {
  className?: string
}

export default function Navbar({ className = "" }: NavbarProps) {
  const pathname = usePathname()

  return (
    <nav className={`flex justify-between items-center p-6 relative z-10 ${className}`}>
      <Link
        href="/"
        scroll={false}
        className="text-white font-medium tracking-wider hover:text-red-500 transition-colors duration-300"
      >
        HUBERT KOLEJKO
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8 text-white text-sm tracking-wider">
        <Link
          href="/#about"
          scroll={false}
          className="relative hover:text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group"
        >
          ABOUT
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="/works"
          scroll={false}
          className={`relative cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group ${
            pathname === "/works" ? "text-red-500" : "hover:text-red-500"
          }`}
        >
          WORKS
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full ${
              pathname === "/works" ? "w-full" : "w-0"
            }`}
          ></span>
        </Link>
        <Link
          href="/#footer"
          scroll={false}
          className="relative hover:text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group"
        >
          CONTACT
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />
    </nav>
  )
}

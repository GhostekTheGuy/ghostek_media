"use client"

import { MobileMenu } from "@/components/ui/mobile-menu"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { FlagPL, FlagEN } from "@/components/ui/flag-icons"

interface NavbarProps {
  className?: string
}

export default function Navbar({ className = "" }: NavbarProps) {
  const pathname = usePathname()
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "pl" : "en")
  }

  return (
    <nav className={`flex justify-between items-center p-6 relative z-10 ${className}`}>
      <Link
        href="/"
        scroll={false}
        className="text-white font-medium tracking-wider hover:text-red-500 transition-colors duration-300"
      >
        HUBERT KOLEJKO
      </Link>

      {/* Center Language Switcher */}
      <button
        onClick={toggleLanguage}
        className="absolute left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] hidden md:block"
        aria-label="Toggle language"
      >
        {i18n.language === "en" ? (
          <FlagPL className="w-7 h-5 rounded-[3px]" />
        ) : (
          <FlagEN className="w-7 h-5 rounded-[3px]" />
        )}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8 text-white text-sm tracking-wider">
        <Link
          href="/#about"
          scroll={false}
          className="relative hover:text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group"
        >
          {t("nav.about")}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="/works"
          scroll={false}
          className={`relative cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group ${
            pathname === "/works" ? "text-red-500" : "hover:text-red-500"
          }`}
        >
          {t("nav.works")}
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
          {t("nav.contact")}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />
    </nav>
  )
}

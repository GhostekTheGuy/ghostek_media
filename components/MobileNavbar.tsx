"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"
import { MobileMenu } from "@/components/ui/mobile-menu"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

export default function MobileNavbar() {
  const { t } = useTranslation()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[150] flex justify-between items-center p-6 md:hidden"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      <Link
        href="/"
        scroll={false}
        className="text-white font-medium tracking-wider hover:text-red-500 transition-colors duration-300 relative z-10"
      >
        HUBERT KOLEJKO
      </Link>

      <div className="relative z-10 flex items-center gap-3">
        <LanguageSwitcher flagClassName="w-6 h-4" />
        <MobileMenu />
      </div>
    </nav>
  )
}

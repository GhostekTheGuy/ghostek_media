"use client"

import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useMobileMenu } from "@/contexts/MobileMenuContext"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

interface MobileMenuProps {
  className?: string
}

export function MobileMenu({ className }: MobileMenuProps) {
  const { isOpen, toggleMenu } = useMobileMenu()
  const { t } = useTranslation()

  const menuItems = [
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.works"), href: "/works" },
    { label: t("nav.contact"), href: "/#footer" },
  ]

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className={`md:hidden text-white p-2 z-[60] relative ${className}`}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 md:hidden"
            onClick={toggleMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-80 bg-black border-l border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full pt-20 px-8">
                <nav className="flex flex-col space-y-8">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="text-white text-xl tracking-wider hover:text-red-500 transition-colors"
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </motion.a>
                  ))}

                  {/* Language Switcher */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="border-t border-white/10 pt-8"
                  >
                    <LanguageSwitcher flagClassName="w-9 h-6" />
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

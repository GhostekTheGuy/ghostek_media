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
      {/* Hamburger Button — always on top */}
      <button
        onClick={toggleMenu}
        className={`md:hidden text-white p-2 z-[200] relative ${className}`}
        aria-label="Toggle menu"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[190] md:hidden"
            onClick={toggleMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 280,
                mass: 0.8,
              }}
              className="absolute right-0 top-0 h-full w-80 bg-black/95 backdrop-blur-lg border-l border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full pt-24 px-8">
                <nav className="flex flex-col space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.08 + 0.15,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="text-white text-2xl tracking-wider hover:text-red-500 transition-colors duration-300"
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </motion.a>
                  ))}

                  {/* Language Switcher */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="border-t border-white/10 pt-6"
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

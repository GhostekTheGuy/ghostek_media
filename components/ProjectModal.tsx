"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: number
    title: string
    subtitle: string
    category: string
    main_image: string
    sub_images: string[]
    startImageIndex?: number
  } | null
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }
    }

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || !isOpen) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      setShowScrollTop(scrollTop > 200)
    }

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()
      // Allow natural scrolling within the container
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    container.addEventListener("wheel", handleWheel, { passive: true })

    return () => {
      container.removeEventListener("scroll", handleScroll)
      container.removeEventListener("wheel", handleWheel)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  if (!project) return null

  const allImages = [project.main_image, ...(project.sub_images || [])]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
            onWheel={(e) => e.stopPropagation()}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onWheel={(e) => e.stopPropagation()}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] w-full bg-black rounded-lg overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Project Info Header */}
              <div className="p-6 bg-gradient-to-b from-black to-transparent relative z-10 flex-shrink-0">
                <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-lg text-gray-300 mb-2">{project.subtitle}</p>
                <span className="text-sm text-gray-400 uppercase tracking-wider">{project.category}</span>
              </div>

              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto focus:outline-none"
                style={{
                  scrollBehavior: "smooth",
                }}
                tabIndex={0}
              >
                <div className="space-y-4 p-6 pt-0">
                  {allImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="w-full rounded-lg overflow-hidden"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {showScrollTop && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={scrollToTop}
                    className="absolute bottom-6 right-6 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-colors duration-200 group"
                  >
                    <ChevronUp className="w-5 h-5 text-white group-hover:text-gray-200 transition-colors" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

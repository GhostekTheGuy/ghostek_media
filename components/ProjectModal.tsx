"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: number
    title: string
    subtitle: string
    category: string
    mainImage: string
    subImages: string[]
  } | null
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [allImages, setAllImages] = useState<string[]>([])

  useEffect(() => {
    if (project) {
      // Combine main image and sub images for navigation
      setAllImages([project.mainImage, ...project.subImages])
      setCurrentImageIndex(0)
    }
  }, [project])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentImageIndex, allImages.length])

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  if (!project) return null

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
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="relative max-w-6xl max-h-[90vh] w-full bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-white text-sm font-medium">
                  {currentImageIndex + 1} / {allImages.length}
                </span>
              </div>

              {/* Main Image */}
              <div className="relative aspect-video w-full">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  src={allImages[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-colors duration-200"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-colors duration-200"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6 bg-gradient-to-t from-black to-transparent">
                <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-lg text-gray-300 mb-2">{project.subtitle}</p>
                <span className="text-sm text-gray-400 uppercase tracking-wider">{project.category}</span>
              </div>

              {/* Thumbnail Navigation */}
              {allImages.length > 1 && (
                <div className="p-4 bg-black/50">
                  <div className="flex gap-2 justify-center overflow-x-auto">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                          index === currentImageIndex
                            ? "ring-2 ring-red-500 opacity-100"
                            : "opacity-60 hover:opacity-80"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

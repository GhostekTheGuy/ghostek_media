"use client"

import { useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: Array<{ url: string; filename: string }>
  currentIndex: number
  onNavigate: (index: number) => void
}

export default function ImageModal({ isOpen, onClose, images, currentIndex, onNavigate }: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(currentIndex - 1)
      } else if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  if (!isOpen || !images[currentIndex]) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground hover:bg-accent/80"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Navigation buttons */}
        {currentIndex > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary/20 text-white hover:bg-primary/40"
            onClick={() => onNavigate(currentIndex - 1)}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {currentIndex < images.length - 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary/20 text-white hover:bg-primary/40"
            onClick={() => onNavigate(currentIndex + 1)}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}

        {/* Image */}
        <img
          src={images[currentIndex].url || "/placeholder.svg"}
          alt={images[currentIndex].filename}
          className="max-w-full max-h-full object-contain"
        />

        {/* Image info */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
          <p className="text-sm opacity-80">{images[currentIndex].filename}</p>
          <p className="text-xs opacity-60">
            {currentIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  )
}

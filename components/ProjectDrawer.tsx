"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion"
import { X, ChevronUp } from "lucide-react"
import type { Project } from "@/lib/projects"
import { trackProjectView } from "@/hooks/useAnalytics"

interface ProjectDrawerProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

type ImageMeta = { src: string; ratio: number }

function DrawerGallery({ images, title }: { images: string[]; title: string }) {
  const [metas, setMetas] = useState<ImageMeta[]>([])

  useEffect(() => {
    let cancelled = false
    const loaded: ImageMeta[] = []

    const promises = images.map(
      (src, i) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => {
            loaded[i] = { src, ratio: img.naturalWidth / img.naturalHeight }
            resolve()
          }
          img.onerror = () => {
            loaded[i] = { src, ratio: 16 / 9 }
            resolve()
          }
          img.src = src
        })
    )

    Promise.all(promises).then(() => {
      if (!cancelled) setMetas(loaded.filter(Boolean))
    })

    return () => { cancelled = true }
  }, [images])

  if (metas.length === 0) return null

  // Group images: landscape (ratio > 1.3) = full width, rest = pair up
  const rows: ImageMeta[][] = []
  let buffer: ImageMeta[] = []

  for (const meta of metas) {
    if (meta.ratio > 1.3) {
      // Flush buffer first
      if (buffer.length > 0) {
        rows.push([...buffer])
        buffer = []
      }
      rows.push([meta])
    } else {
      buffer.push(meta)
      if (buffer.length === 2) {
        rows.push([...buffer])
        buffer = []
      }
    }
  }
  if (buffer.length > 0) rows.push([...buffer])

  return (
    <div className="px-6 md:px-10 pb-20">
      <div className="grid grid-cols-2 gap-3">
        {rows.map((row, rowIndex) => {
          if (row.length === 1) {
            return (
              <motion.div
                key={rowIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + rowIndex * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="col-span-2 overflow-hidden rounded-xl"
              >
                <img
                  src={row[0].src}
                  alt={`${title} - ${rowIndex + 1}`}
                  className="w-full h-auto object-cover"
                  loading={rowIndex === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            )
          }

          return row.map((meta, i) => (
            <motion.div
              key={`${rowIndex}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + rowIndex * 0.08 + i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
              className="col-span-1 overflow-hidden rounded-xl"
            >
              <img
                src={meta.src}
                alt={`${title} - ${rowIndex + 1}-${i + 1}`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.div>
          ))
        })}
      </div>
    </div>
  )
}

export default function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const dragY = useMotionValue(0)
  const backdropOpacity = useTransform(dragY, [0, 400], [1, 0])

  useEffect(() => {
    if (isOpen && project) {
      if (window.lenis) window.lenis.stop()
      document.documentElement.style.overflow = "hidden"
      trackProjectView(project.id)
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0
      }
    } else {
      document.documentElement.style.overflow = ""
      if (window.lenis) window.lenis.start()
    }
    return () => {
      document.documentElement.style.overflow = ""
      if (window.lenis) window.lenis.start()
    }
  }, [isOpen, project])

  useEffect(() => {
    const container = scrollRef.current
    if (!container || !isOpen) return

    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 300)
    }

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()
    }

    const handleTouch = (e: TouchEvent) => {
      e.stopPropagation()
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouch, { passive: true })
    container.addEventListener("touchmove", handleTouch, { passive: true })

    return () => {
      container.removeEventListener("scroll", handleScroll)
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouch)
      container.removeEventListener("touchmove", handleTouch)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (info.offset.y > 150 || info.velocity.y > 500) {
      onClose()
    } else {
      animate(dragY, 0, { type: "spring", damping: 30, stiffness: 300 })
    }
  }

  if (!project) return null

  const allImages = [
    project.main_image,
    ...project.sub_images,
    ...project.additional_images,
  ].filter(Boolean)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ opacity: backdropOpacity }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            style={{ y: dragY }}
            className="fixed inset-x-0 bottom-0 top-[3vh] z-[101] bg-black rounded-t-[20px] flex flex-col"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDrag={(_, info) => dragY.set(Math.max(0, info.offset.y))}
              onDragEnd={handleDragEnd}
              className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing shrink-0 touch-none"
            >
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </motion.div>

            {/* Close button - fixed */}
            <button
              onClick={onClose}
              className="absolute top-12 right-6 md:right-10 bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Scrollable content (header + gallery) */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            >
              {/* Header */}
              <div className="px-6 md:px-10 pb-6 pt-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-xs text-red-500 uppercase tracking-[0.3em] mb-3 block">
                    {project.category}
                  </span>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none pr-12">
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p className="text-lg md:text-xl text-gray-400 mt-3 tracking-wider">
                      {project.subtitle}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed max-w-2xl">
                      {project.description}
                    </p>
                  )}
                </motion.div>
              </div>

              <DrawerGallery images={allImages} title={project.title} />
            </div>

            {/* Scroll to top */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToTop}
                  className="absolute bottom-6 right-6 bg-red-500 hover:bg-red-600 rounded-full p-3 transition-colors z-10 shadow-lg shadow-red-500/20"
                >
                  <ChevronUp className="w-5 h-5 text-white" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

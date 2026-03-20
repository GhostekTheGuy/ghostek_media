"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageTransition from "@/components/PageTransition"
import BlurText from "@/components/ui/blur-text"
import { usePageView, trackProjectView } from "@/hooks/useAnalytics"
import { useTranslation } from "react-i18next"
import type { Project } from "@/lib/projects"

export default function ProjectPage() {
  const params = useParams()
  const id = params.id as string
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()

  usePageView(`/works/${id}`)

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/projects/${id}`, {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error("Project not found")
        }

        const data = await response.json()
        setProject(data.project)
        setError(null)
        await trackProjectView(Number(id))
      } catch (err) {
        console.error("Failed to load project:", err)
        setError("Project not found.")
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [id])

  const allImages = project
    ? [
        project.main_image,
        ...project.sub_images,
        ...project.additional_images,
      ].filter(Boolean)
    : []

  return (
    <PageTransition>
      <div
        className="min-h-screen bg-black text-white font-['Space_Grotesk']"
        style={{
          fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
        }}
      >
        <div className="max-w-[1440px] mx-auto relative z-20">
          <Navbar />
        </div>

        {/* Back button */}
        <div className="px-6 pt-[100px]">
          <div className="max-w-[1440px] mx-auto">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm uppercase tracking-wider">
                {t("works.title", "Works")}
              </span>
            </Link>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="px-6 py-20">
            <div className="max-w-[1440px] mx-auto">
              <div className="animate-pulse space-y-8">
                <div className="h-12 bg-white/5 rounded-lg w-2/3 mx-auto" />
                <div className="h-6 bg-white/5 rounded-lg w-1/3 mx-auto" />
                <div className="h-4 bg-white/5 rounded-lg w-1/4 mx-auto" />
                <div className="aspect-[16/9] bg-white/5 rounded-xl w-full" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-square bg-white/5 rounded-xl" />
                  <div className="aspect-square bg-white/5 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="px-6 py-40 text-center">
            <p className="text-red-400 text-lg">{error}</p>
            <Link
              href="/works"
              className="mt-6 inline-block px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t("works.title", "Back to Works")}
            </Link>
          </div>
        )}

        {/* Project content */}
        {!loading && !error && project && (
          <>
            {/* Header */}
            <div className="px-6 pt-12 pb-16">
              <div className="max-w-[1440px] mx-auto text-center">
                <BlurText
                  text={project.title}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight"
                  delay={100}
                  animateBy="words"
                  direction="top"
                />
                {project.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-6 text-xl md:text-2xl text-gray-300 tracking-wider"
                  >
                    {project.subtitle}
                  </motion.p>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-4"
                >
                  <span className="text-sm text-gray-500 uppercase tracking-[0.2em]">
                    {project.category}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Images */}
            <div className="px-6 pb-20">
              <div className="max-w-[1440px] mx-auto space-y-6">
                {allImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index === 0 ? 0.2 : 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full overflow-hidden rounded-xl"
                  >
                    <img
                      src={image}
                      alt={`${project.title} - ${index + 1}`}
                      className="w-full h-auto object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        <Footer />
      </div>
    </PageTransition>
  )
}

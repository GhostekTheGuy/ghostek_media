"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import BlurText from "@/components/ui/blur-text"
import Footer from "@/components/Footer"
import { ChevronRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import PageTransition from "@/components/PageTransition"
import ProjectModal from "@/components/ProjectModal"
import { fetchProjects, type Project } from "@/lib/projects"

const ProjectComponent = ({ project, hoveredItem, setHoveredItem, onProjectClick }: any) => {
  return (
    <div className="mb-12">
      {/* Large main project square */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative aspect-square overflow-hidden cursor-pointer group mb-4 rounded-xl"
        onMouseEnter={() => setHoveredItem(project.id)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => onProjectClick(project)}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${project.main_image})` }}
        />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />

        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-wide">
              {project.title}
            </h3>
            {project.subtitle && <p className="text-lg text-gray-300 tracking-wider">{project.subtitle}</p>}
          </div>

          <div className="flex justify-between items-end">
            <div className="text-base text-gray-400 uppercase tracking-wider">{project.category}</div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: hoveredItem === project.id ? 1 : 0,
                x: hoveredItem === project.id ? 0 : -10,
              }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredItem === project.id ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent pointer-events-none"
        />
      </motion.div>

      {/* Three small squares underneath */}
      <div className="grid grid-cols-3 gap-4">
        {project.sub_images.map((image: string, index: number) => (
          <motion.div
            key={`${project.id}-sub-${index}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden cursor-pointer group rounded-lg"
            onMouseEnter={() => setHoveredItem(`${project.id}-sub-${index}`)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => onProjectClick(project, index + 1)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${image})` }}
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />

            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: hoveredItem === `${project.id}-sub-${index}` ? 1 : 0,
                  x: hoveredItem === `${project.id}-sub-${index}` ? 0 : -10,
                }}
                transition={{ duration: 0.3 }}
                className="bg-white p-2 self-end"
              >
                <ChevronRight className="w-4 h-4 text-black" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredItem === `${project.id}-sub-${index}` ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent pointer-events-none"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function WorksPage() {
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        const fetchedProjects = await fetchProjects()
        setProjects(fetchedProjects)
        setError(null)
      } catch (err) {
        console.error("Failed to load projects:", err)
        setError("Failed to load projects. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const handleProjectClick = (project: any, startImageIndex = 0) => {
    setSelectedProject({ ...project, startImageIndex })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

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

        {/* Header Section */}
        <div className="px-6 pb-[100px] pt-[100px]">
          <div className="max-w-[1440px] mx-auto">
            <BlurText
              text="DIVE INTO MY WORKS"
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight text-center"
              delay={100}
              animateBy="words"
              direction="top"
            />
          </div>
        </div>

        {/* Portfolio Gallery */}
        <div className="px-6 pb-20">
          <div className="max-w-[1440px] mx-auto">
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <p className="text-red-400 text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && projects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No projects found.</p>
              </div>
            )}

            {!loading && !error && projects.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {projects.map((project) => (
                  <ProjectComponent
                    key={project.id}
                    project={project}
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    onProjectClick={handleProjectClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer />

        {/* ProjectModal component */}
        <ProjectModal isOpen={isModalOpen} onClose={handleCloseModal} project={selectedProject} />
      </div>
    </PageTransition>
  )
}

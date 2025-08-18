"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Upload, X, Save, ChevronUp, ChevronDown } from "lucide-react"
import { fetchProjects, createProject, updateProject, deleteProject, uploadImage, type Project } from "@/lib/projects"
import BlurText from "@/components/ui/blur-text"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import PageTransition from "@/components/PageTransition"

interface ProjectFormData {
  title: string
  subtitle: string
  category: string
  main_image: string
  sub_images: string[]
  additional_images: string[]
}

const initialFormData: ProjectFormData = {
  title: "",
  subtitle: "",
  category: "",
  main_image: "",
  sub_images: ["", "", ""],
  additional_images: [],
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData)
  const [uploading, setUploading] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [orderingAvailable, setOrderingAvailable] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const fetchedProjects = await fetchProjects()
      setProjects(fetchedProjects)
      setOrderingAvailable(fetchedProjects.length > 0 && fetchedProjects[0].order_position !== undefined)
    } catch (error) {
      console.error("Failed to load projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File, field: string, index?: number) => {
    try {
      setUploading(field + (index !== undefined ? `-${index}` : ""))
      const imageUrl = await uploadImage(file)

      if (imageUrl) {
        if (field === "main_image") {
          setFormData((prev) => ({ ...prev, main_image: imageUrl }))
        } else if (field === "sub_images" && index !== undefined) {
          setFormData((prev) => ({
            ...prev,
            sub_images: prev.sub_images.map((img, i) => (i === index ? imageUrl : img)),
          }))
        } else if (field === "additional_images") {
          setFormData((prev) => ({
            ...prev,
            additional_images: [...prev.additional_images, imageUrl],
          }))
        }
      }
    } catch (error) {
      console.error("Failed to upload image:", error)
    } finally {
      setUploading(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.main_image) {
      alert("Title and main image are required")
      return
    }

    try {
      setSaving(true)

      if (editingProject) {
        const updated = await updateProject(editingProject.id, formData)
        if (updated) {
          setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? updated : p)))
        }
      } else {
        const created = await createProject(formData)
        if (created) {
          setProjects((prev) => [...prev, created])
        }
      }

      handleCloseForm()
    } catch (error) {
      console.error("Failed to save project:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title || "",
      subtitle: project.subtitle || "",
      category: project.category || "",
      main_image: project.main_image || "",
      sub_images: [...(project.sub_images || []), "", "", ""].slice(0, 3),
      additional_images: project.additional_images || [],
    })
    setShowForm(true)
  }

  const handleDelete = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return

    try {
      const success = await deleteProject(project.id)
      if (success) {
        setProjects((prev) => prev.filter((p) => p.id !== project.id))
      }
    } catch (error) {
      console.error("Failed to delete project:", error)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProject(null)
    setFormData(initialFormData)
  }

  const removeAdditionalImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index),
    }))
  }

  const handleReorder = async (projectId: number, direction: "up" | "down") => {
    try {
      const response = await fetch(`/api/projects/${projectId}/reorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ direction }),
      })

      if (response.ok) {
        await loadProjects()
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.error || "Failed to reorder project"

        if (errorMessage.includes("migration") || errorMessage.includes("order_position")) {
          setOrderingAvailable(false)
          alert(
            "Project ordering requires a database migration. Please run the migration script: scripts/002_add_project_order.sql",
          )
        } else {
          alert(`Failed to reorder project: ${errorMessage}`)
        }
        console.error("Failed to reorder project:", errorMessage)
      }
    } catch (error) {
      console.error("Error reordering project:", error)
      alert("Failed to reorder project")
    }
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
        <div className="px-6 pb-[50px] pt-[100px]">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <BlurText
                text="ADMIN PANEL"
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight"
                delay={100}
                animateBy="words"
                direction="top"
              />
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium tracking-wide"
              >
                <Plus className="w-5 h-5" />
                Add Project
              </button>
            </div>

            {!orderingAvailable && (
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-yellow-200 font-medium">Project Ordering Unavailable</p>
                    <p className="text-yellow-300/80 text-sm mt-1">
                      Run the database migration script{" "}
                      <code className="bg-black/30 px-2 py-1 rounded text-xs">scripts/002_add_project_order.sql</code>{" "}
                      to enable project reordering.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="px-6 pb-20">
          <div className="max-w-[1440px] mx-auto">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-xl group cursor-pointer"
                  >
                    <div
                      className="h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.main_image})` }}
                    />

                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">{project.title}</h3>
                        {project.subtitle && <p className="text-gray-300 tracking-wider">{project.subtitle}</p>}
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="text-sm text-gray-400 uppercase tracking-wider">{project.category}</div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {orderingAvailable && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleReorder(project.id, "up")
                                }}
                                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-all duration-300"
                                title="Move up"
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleReorder(project.id, "down")
                                }}
                                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-all duration-300"
                                title="Move down"
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEdit(project)
                            }}
                            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-all duration-300"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(project)
                            }}
                            className="bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-500 transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent pointer-events-none"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer />

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-8">
            <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-gray-800">
              <div className="flex justify-between items-center p-6 border-b border-gray-800 rounded-t-xl flex-shrink-0 bg-black">
                <h2 className="text-2xl font-bold text-white">{editingProject ? "Edit Project" : "Add New Project"}</h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div
                className="flex-1 overflow-y-auto modal-scroll-container focus:outline-none"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  scrollBehavior: "smooth",
                }}
                tabIndex={0}
                onWheel={(e) => {
                  e.stopPropagation()
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    handleCloseForm()
                  }
                }}
              >
                <div className="p-6 bg-black">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
                        <input
                          type="text"
                          value={formData.subtitle}
                          onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        placeholder="e.g., branding, tech, design"
                      />
                    </div>

                    {/* Main Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Main Image *</label>
                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 bg-gray-800/50">
                        {formData.main_image ? (
                          <div className="relative">
                            <img
                              src={formData.main_image || "/placeholder.svg"}
                              alt="Main"
                              className="w-full h-48 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, main_image: "" }))}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer block text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <span className="text-gray-400">
                              {uploading === "main_image" ? "Uploading..." : "Click to upload main image"}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(file, "main_image")
                              }}
                              className="hidden"
                              disabled={uploading === "main_image"}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Sub Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Sub Images (3 images)</label>
                      <div className="grid grid-cols-3 gap-4">
                        {formData.sub_images.map((image, index) => (
                          <div
                            key={index}
                            className="border-2 border-dashed border-gray-700 rounded-lg p-2 bg-gray-800/50"
                          >
                            {image ? (
                              <div className="relative">
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt={`Sub ${index + 1}`}
                                  className="w-full h-24 object-cover rounded"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      sub_images: prev.sub_images.map((img, i) => (i === index ? "" : img)),
                                    }))
                                  }
                                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <label className="cursor-pointer block text-center h-24 flex flex-col justify-center">
                                <Upload className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                                <span className="text-xs text-gray-400">
                                  {uploading === `sub_images-${index}` ? "Uploading..." : "Upload"}
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) handleImageUpload(file, "sub_images", index)
                                  }}
                                  className="hidden"
                                  disabled={uploading === `sub_images-${index}`}
                                />
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Additional Images (for modal gallery)
                      </label>
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        {formData.additional_images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Additional ${index + 1}`}
                              className="w-full h-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeAdditionalImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <label className="cursor-pointer inline-flex items-center gap-2 bg-gray-800 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                        <Upload className="w-4 h-4" />
                        {uploading === "additional_images" ? "Uploading..." : "Add More Images"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(file, "additional_images")
                          }}
                          className="hidden"
                          disabled={uploading === "additional_images"}
                        />
                      </label>
                    </div>
                  </form>
                </div>
              </div>

              <div className="flex justify-end gap-4 p-6 border-t border-gray-800 rounded-b-xl flex-shrink-0 bg-black">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={saving || !formData.title || !formData.main_image}
                  className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

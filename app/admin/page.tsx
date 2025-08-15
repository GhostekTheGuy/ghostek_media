"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Upload, X, Save } from "lucide-react"
import { fetchProjects, createProject, updateProject, deleteProject, uploadImage, type Project } from "@/lib/projects"

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

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const fetchedProjects = await fetchProjects()
      setProjects(fetchedProjects)
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
      title: project.title,
      subtitle: project.subtitle,
      category: project.category,
      main_image: project.main_image,
      sub_images: [...project.sub_images, "", "", ""].slice(0, 3),
      additional_images: project.additional_images,
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${project.main_image})` }} />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{project.subtitle}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-4">{project.category}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project)}
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg flex-shrink-0">
                <h2 className="text-2xl font-bold">{editingProject ? "Edit Project" : "Add New Project"}</h2>
                <button onClick={handleCloseForm} className="text-gray-500 hover:text-gray-700">
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
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                        <input
                          type="text"
                          value={formData.subtitle}
                          onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="e.g., branding, tech, design"
                      />
                    </div>

                    {/* Main Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Main Image *</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
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
                            <span className="text-gray-600">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sub Images (3 images)</label>
                      <div className="grid grid-cols-3 gap-4">
                        {formData.sub_images.map((image, index) => (
                          <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-2">
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
                                <span className="text-xs text-gray-600">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label className="cursor-pointer inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
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

              <div className="flex justify-end gap-4 p-6 border-t bg-white rounded-b-lg flex-shrink-0">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={saving || !formData.title || !formData.main_image}
                  className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Upload, X, Save, GripVertical, BarChart3, Eye, TrendingUp, Calendar } from "lucide-react"
import { fetchProjects, createProject, updateProject, deleteProject, uploadImage, type Project } from "@/lib/projects"
import BlurText from "@/components/ui/blur-text"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import PageTransition from "@/components/PageTransition"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface AnalyticsStats {
  totalPageViews: number
  totalProjectViews: number
  topProjects: Array<{
    project_id: number
    title: string
    view_count: number
  }>
  recentViews: Array<{
    page_path: string
    view_count: number
  }>
}

function AnalyticsDashboard() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState(30)

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/analytics/stats?days=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Failed to load analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-900/50 rounded-xl p-6 mb-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="bg-gray-900/50 rounded-xl p-6 mb-8">
        <p className="text-gray-400">Analytics data unavailable. Make sure the database migration has been run.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/50 rounded-xl p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Analytics Dashboard</h2>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(Number(e.target.value))}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Total Page Views</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalPageViews.toLocaleString()}</div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-400">Project Views</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalProjectViews.toLocaleString()}</div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-400">Avg. Daily Views</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {Math.round((stats.totalPageViews + stats.totalProjectViews) / timeRange)}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-gray-400">Top Project Views</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.topProjects[0]?.view_count || 0}</div>
        </div>
      </div>

      {/* Top Projects and Pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Most Viewed Projects</h3>
          <div className="space-y-2">
            {stats.topProjects.slice(0, 5).map((project, index) => (
              <div key={project.project_id} className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <span className="text-white font-medium">{project.title}</span>
                </div>
                <span className="text-gray-400 text-sm">{project.view_count} views</span>
              </div>
            ))}
            {stats.topProjects.length === 0 && <p className="text-gray-500 text-sm">No project views yet</p>}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Page Views</h3>
          <div className="space-y-2">
            {stats.recentViews.slice(0, 5).map((page, index) => (
              <div key={page.page_path} className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <span className="text-white font-medium">{page.page_path}</span>
                </div>
                <span className="text-gray-400 text-sm">{page.view_count} views</span>
              </div>
            ))}
            {stats.recentViews.length === 0 && <p className="text-gray-500 text-sm">No page views yet</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

function SortableProjectCard({
  project,
  onEdit,
  onDelete,
  orderingAvailable,
}: {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
  orderingAvailable: boolean
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-xl group cursor-pointer ${isDragging ? "z-50 shadow-2xl" : ""}`}
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
              <button
                {...attributes}
                {...listeners}
                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-all duration-300 cursor-grab active:cursor-grabbing"
                title="Drag to reorder"
                onClick={(e) => e.stopPropagation()}
              >
                <GripVertical className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(project)
              }}
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-all duration-300"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(project)
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
  )
}

function SortableImageItem({
  image,
  index,
  onRemove,
  type,
}: {
  image: string
  index: number
  onRemove: () => void
  type: "sub" | "additional"
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `${type}-${index}`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <img
        src={image || "/placeholder.svg"}
        alt={`${type} ${index + 1}`}
        className={`w-full object-cover rounded ${type === "sub" ? "h-24" : "h-20"}`}
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-3 h-3" />
      </button>
      <button
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1 bg-white/20 backdrop-blur-sm text-white p-1 rounded-full hover:bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        title="Drag to reorder"
      >
        <GripVertical className="w-3 h-3" />
      </button>
    </div>
  )
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
      description: project.description || "",
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = projects.findIndex((project) => project.id === active.id)
    const newIndex = projects.findIndex((project) => project.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    // Optimistically update the UI
    const newProjects = arrayMove(projects, oldIndex, newIndex)
    setProjects(newProjects)

    try {
      // Update the order in the database
      const updates = newProjects.map((project, index) => ({
        id: project.id,
        order_position: index + 1,
      }))

      const response = await fetch("/api/projects/reorder-batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updates }),
      })

      if (!response.ok) {
        // Revert the optimistic update on error
        await loadProjects()
        const errorData = await response.json()
        const errorMessage = errorData.error || "Failed to reorder projects"

        if (errorMessage.includes("migration") || errorMessage.includes("order_position")) {
          setOrderingAvailable(false)
          alert(
            "Project ordering requires a database migration. Please run the migration script: scripts/002_add_project_order.sql",
          )
        } else {
          alert(`Failed to reorder projects: ${errorMessage}`)
        }
      }
    } catch (error) {
      // Revert the optimistic update on error
      await loadProjects()
      console.error("Error reordering projects:", error)
      alert("Failed to reorder projects")
    }
  }

  const handleSubImageDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const activeIndex = Number.parseInt(active.id.toString().split("-")[1])
    const overIndex = Number.parseInt(over.id.toString().split("-")[1])

    setFormData((prev) => ({
      ...prev,
      sub_images: arrayMove(prev.sub_images, activeIndex, overIndex),
    }))
  }

  const handleAdditionalImageDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const activeIndex = Number.parseInt(active.id.toString().split("-")[1])
    const overIndex = Number.parseInt(over.id.toString().split("-")[1])

    setFormData((prev) => ({
      ...prev,
      additional_images: arrayMove(prev.additional_images, activeIndex, overIndex),
    }))
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

            <AnalyticsDashboard />

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

            {orderingAvailable && projects.length > 0 && (
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-blue-200 font-medium">Drag & Drop Ordering</p>
                    <p className="text-blue-300/80 text-sm mt-1">
                      Drag projects by the grip handle to reorder them. Changes are saved automatically.
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
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                      <SortableProjectCard
                        key={project.id}
                        project={project}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        orderingAvailable={orderingAvailable}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
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

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent min-h-[100px] resize-y"
                        placeholder="Project description..."
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
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Sub Images (3 images) - Drag to reorder
                      </label>
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleSubImageDragEnd}
                      >
                        <SortableContext
                          items={formData.sub_images.map((_, index) => `sub-${index}`)}
                          strategy={horizontalListSortingStrategy}
                        >
                          <div className="grid grid-cols-3 gap-4">
                            {formData.sub_images.map((image, index) => (
                              <div
                                key={`sub-${index}`}
                                className="border-2 border-dashed border-gray-700 rounded-lg p-2 bg-gray-800/50"
                              >
                                {image ? (
                                  <SortableImageItem
                                    image={image}
                                    index={index}
                                    type="sub"
                                    onRemove={() =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        sub_images: prev.sub_images.map((img, i) => (i === index ? "" : img)),
                                      }))
                                    }
                                  />
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
                        </SortableContext>
                      </DndContext>
                    </div>

                    {/* Additional Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Additional Images (for modal gallery) - Drag to reorder
                      </label>
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleAdditionalImageDragEnd}
                      >
                        <SortableContext
                          items={formData.additional_images.map((_, index) => `additional-${index}`)}
                          strategy={horizontalListSortingStrategy}
                        >
                          <div className="grid grid-cols-4 gap-4 mb-4">
                            {formData.additional_images.map((image, index) => (
                              <SortableImageItem
                                key={`additional-${index}`}
                                image={image}
                                index={index}
                                type="additional"
                                onRemove={() => removeAdditionalImage(index)}
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
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

interface ProjectFormData {
  title: string
  subtitle: string
  description: string
  category: string
  main_image: string
  sub_images: string[]
  additional_images: string[]
}

const initialFormData: ProjectFormData = {
  title: "",
  subtitle: "",
  description: "",
  category: "",
  main_image: "",
  sub_images: ["", "", ""],
  additional_images: [],
}

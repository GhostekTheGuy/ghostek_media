"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, X } from "lucide-react"

interface ProjectImage {
  id?: number
  url: string
  alt: string
  display_order?: number
}

interface Project {
  id?: number
  title: string
  description: string
  category: string
  tags: string[]
  featured: boolean
  images: ProjectImage[]
  created_at?: string
  updated_at?: string
}

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    category: "",
    tags: [],
    featured: false,
    images: [],
  })
  const [newTag, setNewTag] = useState("")
  const [newImageUrl, setNewImageUrl] = useState("")
  const [newImageAlt, setNewImageAlt] = useState("")

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects"
      const method = editingProject ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchProjects()
        resetForm()
      }
    } catch (error) {
      console.error("Error saving project:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" })
      if (response.ok) {
        await fetchProjects()
      }
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData(project)
    setIsEditing(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      tags: [],
      featured: false,
      images: [],
    })
    setEditingProject(null)
    setIsEditing(false)
    setNewTag("")
    setNewImageUrl("")
    setNewImageAlt("")
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, { url: newImageUrl.trim(), alt: newImageAlt.trim() }],
      }))
      setNewImageUrl("")
      setNewImageAlt("")
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Project Manager</h2>
        <Button onClick={() => setIsEditing(true)} className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {isEditing && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">{editingProject ? "Edit Project" : "Add New Project"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Project Title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
                <Input
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <Textarea
                placeholder="Project Description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-gray-800 border-gray-600 text-white"
                rows={3}
              />

              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-gray-700 text-white">
                      {tag}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Input
                    placeholder="Image URL"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white md:col-span-2"
                  />
                  <Input
                    placeholder="Alt text"
                    value={newImageAlt}
                    onChange={(e) => setNewImageAlt(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Button type="button" onClick={addImage} variant="outline" className="w-full bg-transparent">
                  Add Image
                </Button>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-20 object-cover rounded"
                      />
                      <Button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 p-0 bg-red-500 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-white">
                  Featured Project
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-red-500 hover:bg-red-600">
                  {editingProject ? "Update" : "Create"} Project
                </Button>
                <Button type="button" onClick={resetForm} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <div className="flex gap-1">
                  <Button onClick={() => handleEdit(project)} size="sm" variant="outline" className="w-8 h-8 p-0">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    onClick={() => project.id && handleDelete(project.id)}
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-2">{project.description}</p>

              <div className="flex flex-wrap gap-1 mb-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-gray-700 text-white">
                    {tag}
                  </Badge>
                ))}
              </div>

              {project.featured && <Badge className="bg-red-500 text-white mb-2">Featured</Badge>}

              <div className="grid grid-cols-3 gap-1">
                {project.images.slice(0, 3).map((image, index) => (
                  <img
                    key={index}
                    src={image.image_url || image.url}
                    alt={image.alt_text || image.alt}
                    className="w-full h-16 object-cover rounded"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

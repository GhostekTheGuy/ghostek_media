"use client"

import { useState, useEffect } from "react"
import { Trash2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ImageUpload from "./ImageUpload"
import ImageModal from "./ImageModal"

interface GalleryImage {
  url: string
  filename: string
  category: string
  size: number
  uploadedAt: string
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [showManager, setShowManager] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = images.filter((img) => img.category === "hero")
  const featuredImages = images.filter((img) => img.category === "featured")
  const galleryImages = images.filter((img) => img.category === "gallery")

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/gallery/list")
      const data = await response.json()
      setImages(data.files || [])
    } catch (error) {
      console.error("Error fetching images:", error)
    }
  }

  const handleUpload = async (file: File, category: string) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("category", category)

      const response = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        await fetchImages()
      }
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (url: string) => {
    try {
      const response = await fetch("/api/gallery/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (response.ok) {
        await fetchImages()
      }
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  const openModal = (imageIndex: number, imageArray: GalleryImage[]) => {
    const globalIndex = images.findIndex((img) => img.url === imageArray[imageIndex].url)
    setCurrentImageIndex(globalIndex)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif text-card-foreground">WENTRA Portfolio</h1>
              <p className="text-muted-foreground font-sans">Modern portfolio with sophisticated image management</p>
            </div>
            <Button onClick={() => setShowManager(!showManager)} variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {showManager ? "Hide Manager" : "Manage Images"}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Management Interface */}
        {showManager && (
          <div className="mb-12 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <ImageUpload onUpload={handleUpload} category="hero" isUploading={isUploading} />
              <ImageUpload onUpload={handleUpload} category="featured" isUploading={isUploading} />
              <ImageUpload onUpload={handleUpload} category="gallery" isUploading={isUploading} />
            </div>
          </div>
        )}

        {/* Hero Section */}
        {heroImages.length > 0 && (
          <section className="mb-16">
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden group cursor-pointer">
              <img
                src={heroImages[0].url || "/placeholder.svg"}
                alt="Hero"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onClick={() => openModal(0, heroImages)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-4xl md:text-6xl font-bold font-serif mb-4">Explore Our Work</h2>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">View Portfolio</Button>
              </div>
              {showManager && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(heroImages[0].url)
                  }}
                  variant="destructive"
                  size="icon"
                  className="absolute top-4 right-4"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </section>
        )}

        {/* Featured Images */}
        {featuredImages.length > 0 && (
          <section className="mb-16">
            <h3 className="text-2xl font-bold font-serif mb-8 text-card-foreground">Featured Work</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredImages.slice(0, 3).map((image, index) => (
                <Card key={image.url} className="overflow-hidden group cursor-pointer relative">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.filename}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    onClick={() => openModal(index, featuredImages)}
                  />
                  {showManager && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(image.url)
                      }}
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold font-serif mb-8 text-card-foreground">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <Card key={image.url} className="overflow-hidden group cursor-pointer relative">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.filename}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    onClick={() => openModal(index, galleryImages)}
                  />
                  {showManager && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(image.url)
                      }}
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {images.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-4">No images yet</h3>
            <p className="text-muted-foreground mb-6">Upload your first image to get started</p>
            <Button onClick={() => setShowManager(true)}>Manage Images</Button>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={images}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
      />
    </div>
  )
}

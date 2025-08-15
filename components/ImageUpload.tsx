"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ImageUploadProps {
  onUpload: (file: File, category: string) => Promise<void>
  category: string
  isUploading: boolean
}

export default function ImageUpload({ onUpload, category, isUploading }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      onUpload(files[0], category)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      onUpload(files[0], category)
    }
  }

  return (
    <Card
      className={`p-8 border-2 border-dashed transition-colors ${
        dragActive ? "border-primary bg-muted" : "border-border"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="text-center">
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium mb-2">Upload {category} image</p>
        <p className="text-sm text-muted-foreground mb-4">Drag and drop an image here, or click to select</p>
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isUploading ? "Uploading..." : "Select Image"}
        </Button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
      </div>
    </Card>
  )
}

import { type NextRequest, NextResponse } from "next/server"
import { del } from "@vercel/blob"

// In-memory storage for projects (in production, use a database)
const projects: any[] = [
  {
    id: 1,
    title: "WENTRA",
    subtitle: "MARKETING AGENCY",
    category: "branding",
    mainImage: "/wentra-logo-branding.png",
    subImages: ["/wentra-ai-typography.png", "/wentra-laptop-mockup.png", "/wentra-business-cards.png"],
    additionalImages: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Pacantara",
    subtitle: "OUTDOOR BRAND",
    category: "branding",
    mainImage: "/pacantara-brand-landscape.png",
    subImages: ["/pacantara-shopping-bag.png", "/pacantara-gallery-exhibition.png", "/pacantara-altura-jacket.png"],
    additionalImages: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Harman West",
    subtitle: "BRAND IDENTITY",
    category: "branding",
    mainImage: "/harman-west-architecture.png",
    subImages: ["/harman-west-brand-identity.png", "/harman-west-logo-grid.png", "/harman-west-documents.png"],
    additionalImages: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "INGO",
    subtitle: "TECH SOLUTIONS",
    category: "tech",
    mainImage: "/ingo-tech-robot-detail.png",
    subImages: ["/ingo-tech-poster.png", "/ingo-robots-beyond-limits.png", "/ingo-employee-badges.png"],
    additionalImages: [],
    createdAt: new Date().toISOString(),
  },
]

// GET - Fetch single project
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = Number.parseInt(params.id)
    const project = projects.find((p) => p.id === projectId)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

// PUT - Update project
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = Number.parseInt(params.id)
    const body = await request.json()
    const { title, subtitle, category, mainImage, subImages, additionalImages } = body

    const projectIndex = projects.findIndex((p) => p.id === projectId)
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      title: title || projects[projectIndex].title,
      subtitle: subtitle !== undefined ? subtitle : projects[projectIndex].subtitle,
      category: category || projects[projectIndex].category,
      mainImage: mainImage || projects[projectIndex].mainImage,
      subImages: subImages || projects[projectIndex].subImages,
      additionalImages: additionalImages || projects[projectIndex].additionalImages,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ project: projects[projectIndex] })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = Number.parseInt(params.id)
    const projectIndex = projects.findIndex((p) => p.id === projectId)

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const project = projects[projectIndex]

    // Delete associated images from Vercel Blob if they are blob URLs
    const allImages = [project.mainImage, ...project.subImages, ...project.additionalImages]
    for (const imageUrl of allImages) {
      if (imageUrl.includes("blob.vercel-storage.com")) {
        try {
          await del(imageUrl)
        } catch (error) {
          console.warn("Failed to delete image from blob:", imageUrl, error)
        }
      }
    }

    projects.splice(projectIndex, 1)

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

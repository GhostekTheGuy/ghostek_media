import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

const PROJECTS_FILE = "projects.json"

async function getProjects() {
  try {
    const response = await fetch(`https://blob.vercel-storage.com/${PROJECTS_FILE}`, {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data.projects || []
    }
  } catch (error) {
    console.log("No existing projects file, starting with defaults")
  }

  // Return default projects if file doesn't exist
  return [
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
}

async function saveProjects(projects: any[]) {
  const data = JSON.stringify({ projects }, null, 2)
  await put(PROJECTS_FILE, data, {
    access: "private",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
}

// GET - Fetch all projects
export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, subtitle, category, mainImage, subImages, additionalImages } = body

    if (!title || !mainImage) {
      return NextResponse.json({ error: "Title and main image are required" }, { status: 400 })
    }

    const projects = await getProjects()

    const newProject = {
      id: Math.max(...projects.map((p) => p.id), 0) + 1,
      title,
      subtitle: subtitle || "",
      category: category || "uncategorized",
      mainImage,
      subImages: subImages || [],
      additionalImages: additionalImages || [],
      createdAt: new Date().toISOString(),
    }

    projects.push(newProject)
    await saveProjects(projects)

    return NextResponse.json({ project: newProject }, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { del, put } from "@vercel/blob"

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
    console.log("No existing projects file")
  }
  return []
}

async function saveProjects(projects: any[]) {
  const data = JSON.stringify({ projects }, null, 2)
  await put(PROJECTS_FILE, data, {
    access: "private",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
}

// GET - Fetch single project
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = Number.parseInt(params.id)
    const projects = await getProjects()
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

    const projects = await getProjects()
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

    await saveProjects(projects)

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
    const projects = await getProjects()
    const projectIndex = projects.findIndex((p) => p.id === projectId)

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const project = projects[projectIndex]

    const allImages = [project.mainImage, ...project.subImages, ...project.additionalImages]
    for (const imageUrl of allImages) {
      if (imageUrl.includes("blob.vercel-storage.com")) {
        try {
          await del(imageUrl, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
          })
        } catch (error) {
          console.warn("Failed to delete image from blob:", imageUrl, error)
        }
      }
    }

    projects.splice(projectIndex, 1)
    await saveProjects(projects)

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

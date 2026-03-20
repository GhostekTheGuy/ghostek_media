import { type NextRequest, NextResponse } from "next/server"
import { del } from "@vercel/blob"
import { getProjectById, updateProject, deleteProject, type UpdateProjectData } from "@/lib/database"

// GET - Fetch single project
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const projectId = Number.parseInt(id)
    const project = await getProjectById(projectId)

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
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const projectId = Number.parseInt(id)
    const body = await request.json()
    const { title, subtitle, description, category, main_image, sub_images, additional_images } = body

    const updateData: UpdateProjectData = {}

    if (title !== undefined) updateData.title = title
    if (subtitle !== undefined) updateData.subtitle = subtitle
    if (description !== undefined) updateData.description = description
    if (category !== undefined) updateData.category = category
    if (main_image !== undefined) updateData.main_image = main_image
    if (sub_images !== undefined) updateData.sub_images = sub_images
    if (additional_images !== undefined) updateData.additional_images = additional_images

    const updatedProject = await updateProject(projectId, updateData)

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ project: updatedProject })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const projectId = Number.parseInt(id)

    const project = await getProjectById(projectId)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Clean up images from Blob storage
    const allImages = [project.main_image, ...project.sub_images, ...project.additional_images]
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

    const deleted = await deleteProject(projectId)

    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
    }

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

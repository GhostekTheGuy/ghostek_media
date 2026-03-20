import { type NextRequest, NextResponse } from "next/server"
import { getAllProjects, createProject, type CreateProjectData } from "@/lib/database"

// GET - Fetch all projects
export async function GET() {
  try {
    const projects = await getAllProjects()
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
    const { title, subtitle, description, category, main_image, sub_images, additional_images } = body

    if (!title || !main_image) {
      return NextResponse.json({ error: "Title and main image are required" }, { status: 400 })
    }

    const projectData: CreateProjectData = {
      title,
      subtitle: subtitle || "",
      description: description || "",
      category: category || "uncategorized",
      main_image,
      sub_images: sub_images || [],
      additional_images: additional_images || [],
    }

    const newProject = await createProject(projectData)

    return NextResponse.json({ project: newProject }, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

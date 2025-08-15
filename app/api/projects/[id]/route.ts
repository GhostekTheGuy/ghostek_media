import { type NextRequest, NextResponse } from "next/server"
import { getDbConnection } from "@/lib/db"

// GET - Get a specific project with images
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const sql = getDbConnection()
    const projectId = Number.parseInt(params.id)

    const [project] = await sql`
      SELECT 
        p.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pi.id,
              'image_url', pi.image_url,
              'alt_text', pi.alt_text,
              'display_order', pi.display_order
            ) ORDER BY pi.display_order
          ) FILTER (WHERE pi.id IS NOT NULL),
          '[]'::json
        ) as images
      FROM projects p
      LEFT JOIN project_images pi ON p.id = pi.project_id
      WHERE p.id = ${projectId}
      GROUP BY p.id
    `

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

// PUT - Update a project
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const sql = getDbConnection()
    const projectId = Number.parseInt(params.id)
    const { title, description, category, tags, featured, images } = await request.json()

    // Update project
    const [project] = await sql`
      UPDATE projects 
      SET title = ${title}, description = ${description}, category = ${category}, 
          tags = ${tags || []}, featured = ${featured || false}, updated_at = NOW()
      WHERE id = ${projectId}
      RETURNING *
    `

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Update images if provided
    if (images) {
      // Delete existing images
      await sql`DELETE FROM project_images WHERE project_id = ${projectId}`

      // Add new images
      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        await sql`
          INSERT INTO project_images (project_id, image_url, alt_text, display_order)
          VALUES (${projectId}, ${image.url}, ${image.alt || ""}, ${i})
        `
      }
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE - Delete a project
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const sql = getDbConnection()
    const projectId = Number.parseInt(params.id)

    const [project] = await sql`
      DELETE FROM projects WHERE id = ${projectId} RETURNING *
    `

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

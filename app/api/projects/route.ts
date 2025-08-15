import { type NextRequest, NextResponse } from "next/server"
import { getDbConnection } from "@/lib/db"

// GET - List all projects with their images
export async function GET() {
  try {
    const sql = getDbConnection()

    const projects = await sql`
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
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  try {
    const sql = getDbConnection()

    const { title, description, category, tags, featured, images } = await request.json()

    // Create project
    const [project] = await sql`
      INSERT INTO projects (title, description, category, tags, featured)
      VALUES (${title}, ${description}, ${category}, ${tags || []}, ${featured || false})
      RETURNING *
    `

    // Add images if provided
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        await sql`
          INSERT INTO project_images (project_id, image_url, alt_text, display_order)
          VALUES (${project.id}, ${image.url}, ${image.alt || ""}, ${i})
        `
      }
    }

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

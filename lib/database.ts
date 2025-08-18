import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface Project {
  id: number
  title: string
  subtitle?: string
  category: string
  main_image: string
  sub_images: string[]
  additional_images: string[]
  created_at: string
  updated_at: string
  order_position: number
}

export interface CreateProjectData {
  title: string
  subtitle?: string
  category: string
  main_image: string
  sub_images: string[]
  additional_images: string[]
  order_position: number
}

export interface UpdateProjectData extends Partial<CreateProjectData> {}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const columnCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'order_position'
    `

    let projects
    if (columnCheck.length > 0) {
      // Column exists, use it for ordering
      projects = await sql`
        SELECT * FROM projects 
        ORDER BY order_position ASC, created_at DESC
      `
    } else {
      // Column doesn't exist yet, fallback to creation date ordering
      projects = await sql`
        SELECT *, 0 as order_position FROM projects 
        ORDER BY created_at DESC
      `
    }

    return projects as Project[]
  } catch (error) {
    console.error("Error fetching projects:", error)
    throw new Error(`Database connection failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function getProjectById(id: number): Promise<Project | null> {
  try {
    const projects = await sql`
      SELECT * FROM projects 
      WHERE id = ${id}
    `
    return (projects[0] as Project) || null
  } catch (error) {
    console.error("Error fetching project:", error)
    throw new Error("Failed to fetch project")
  }
}

export async function createProject(data: CreateProjectData): Promise<Project> {
  try {
    const projects = await sql`
      INSERT INTO projects (title, subtitle, category, main_image, sub_images, additional_images, order_position)
      VALUES (${data.title}, ${data.subtitle || null}, ${data.category}, ${data.main_image}, ${data.sub_images}, ${data.additional_images}, ${data.order_position})
      RETURNING *
    `
    return projects[0] as Project
  } catch (error) {
    console.error("Error creating project:", error)
    throw new Error("Failed to create project")
  }
}

export async function updateProject(id: number, data: UpdateProjectData): Promise<Project | null> {
  try {
    const projects = await sql`
      UPDATE projects 
      SET 
        title = COALESCE(${data.title}, title),
        subtitle = COALESCE(${data.subtitle}, subtitle),
        category = COALESCE(${data.category}, category),
        main_image = COALESCE(${data.main_image}, main_image),
        sub_images = COALESCE(${data.sub_images}, sub_images),
        additional_images = COALESCE(${data.additional_images}, additional_images),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return (projects[0] as Project) || null
  } catch (error) {
    console.error("Error updating project:", error)
    throw new Error("Failed to update project")
  }
}

export async function deleteProject(id: number): Promise<boolean> {
  try {
    const result = await sql`
      DELETE FROM projects 
      WHERE id = ${id}
    `
    return result.count > 0
  } catch (error) {
    console.error("Error deleting project:", error)
    throw new Error("Failed to delete project")
  }
}

export async function reorderProjects(projectId: number, direction: "up" | "down"): Promise<void> {
  try {
    const columnCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'order_position'
    `

    if (columnCheck.length === 0) {
      throw new Error(
        "Project ordering is not available. Please run the database migration to add the order_position column.",
      )
    }

    // Get current project and its order position
    const currentProject = await sql`
      SELECT id, order_position FROM projects WHERE id = ${projectId}
    `

    if (!currentProject[0]) {
      throw new Error("Project not found")
    }

    const currentOrder = currentProject[0].order_position

    if (direction === "up") {
      // Find the project with the next higher order (lower number)
      const targetProject = await sql`
        SELECT id, order_position FROM projects 
        WHERE order_position < ${currentOrder}
        ORDER BY order_position DESC
        LIMIT 1
      `

      if (targetProject[0]) {
        // Swap positions
        await sql`UPDATE projects SET order_position = ${targetProject[0].order_position} WHERE id = ${projectId}`
        await sql`UPDATE projects SET order_position = ${currentOrder} WHERE id = ${targetProject[0].id}`
      }
    } else {
      // Find the project with the next lower order (higher number)
      const targetProject = await sql`
        SELECT id, order_position FROM projects 
        WHERE order_position > ${currentOrder}
        ORDER BY order_position ASC
        LIMIT 1
      `

      if (targetProject[0]) {
        // Swap positions
        await sql`UPDATE projects SET order_position = ${targetProject[0].order_position} WHERE id = ${projectId}`
        await sql`UPDATE projects SET order_position = ${currentOrder} WHERE id = ${targetProject[0].id}`
      }
    }
  } catch (error) {
    console.error("Error reordering projects:", error)
    throw error
  }
}

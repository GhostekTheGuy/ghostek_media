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
}

export interface CreateProjectData {
  title: string
  subtitle?: string
  category: string
  main_image: string
  sub_images: string[]
  additional_images: string[]
}

export interface UpdateProjectData extends Partial<CreateProjectData> {}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await sql`
      SELECT * FROM projects 
      ORDER BY created_at DESC
    `
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
      INSERT INTO projects (title, subtitle, category, main_image, sub_images, additional_images)
      VALUES (${data.title}, ${data.subtitle || null}, ${data.category}, ${data.main_image}, ${data.sub_images}, ${data.additional_images})
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
    const updateFields = []
    const values = []
    let paramIndex = 1

    if (data.title !== undefined) {
      updateFields.push(`title = $${paramIndex++}`)
      values.push(data.title)
    }
    if (data.subtitle !== undefined) {
      updateFields.push(`subtitle = $${paramIndex++}`)
      values.push(data.subtitle)
    }
    if (data.category !== undefined) {
      updateFields.push(`category = $${paramIndex++}`)
      values.push(data.category)
    }
    if (data.main_image !== undefined) {
      updateFields.push(`main_image = $${paramIndex++}`)
      values.push(data.main_image)
    }
    if (data.sub_images !== undefined) {
      updateFields.push(`sub_images = $${paramIndex++}`)
      values.push(data.sub_images)
    }
    if (data.additional_images !== undefined) {
      updateFields.push(`additional_images = $${paramIndex++}`)
      values.push(data.additional_images)
    }

    if (updateFields.length === 0) {
      return await getProjectById(id)
    }

    updateFields.push(`updated_at = NOW()`)
    values.push(id)

    const query = `
      UPDATE projects 
      SET ${updateFields.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING *
    `

    const result = await sql.unsafe(query, values)
    return (result[0] as Project) || null
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

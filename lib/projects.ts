export interface Project {
  id: number
  title: string
  subtitle: string
  category: string
  main_image: string
  sub_images: string[]
  additional_images: string[]
  created_at: string
  updated_at: string
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch("/api/projects", {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.projects
  } catch (error) {
    console.error("Error fetching projects:", error)
    throw error
  }
}

export async function createProject(
  projectData: Omit<Project, "id" | "created_at" | "updated_at">,
): Promise<Project | null> {
  try {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })

    if (!response.ok) {
      throw new Error("Failed to create project")
    }

    const data = await response.json()
    return data.project
  } catch (error) {
    console.error("Error creating project:", error)
    return null
  }
}

export async function updateProject(id: number, projectData: Partial<Project>): Promise<Project | null> {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })

    if (!response.ok) {
      throw new Error("Failed to update project")
    }

    const data = await response.json()
    return data.project
  } catch (error) {
    console.error("Error updating project:", error)
    return null
  }
}

export async function deleteProject(id: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete project")
    }

    return true
  } catch (error) {
    console.error("Error deleting project:", error)
    return false
  }
}

export async function uploadImage(file: File): Promise<string | null> {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const data = await response.json()
    return data.url
  } catch (error) {
    console.error("Error uploading image:", error)
    return null
  }
}

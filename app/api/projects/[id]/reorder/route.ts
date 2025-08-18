import { type NextRequest, NextResponse } from "next/server"
import { reorderProjects } from "@/lib/database"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { direction } = await request.json()
    const projectId = Number.parseInt(params.id)

    if (!direction || !["up", "down"].includes(direction)) {
      return NextResponse.json({ error: 'Invalid direction. Must be "up" or "down"' }, { status: 400 })
    }

    await reorderProjects(projectId, direction)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering project:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to reorder project"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

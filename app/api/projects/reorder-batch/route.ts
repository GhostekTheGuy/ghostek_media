import { type NextRequest, NextResponse } from "next/server"
import { updateProjectOrder } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { updates } = await request.json()

    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: "Invalid updates format" }, { status: 400 })
    }

    // Update all project orders in batch
    for (const update of updates) {
      await updateProjectOrder(update.id, update.order_position)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating project order:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update project order" },
      { status: 500 },
    )
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { recordProjectView } from "@/lib/analytics"

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json()

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
    }

    const userAgent = request.headers.get("user-agent") || undefined
    const referrer = request.headers.get("referer") || undefined
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined

    await recordProjectView(Number.parseInt(projectId), userAgent, ipAddress, referrer)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error recording project view:", error)
    return NextResponse.json({ error: "Failed to record project view" }, { status: 500 })
  }
}

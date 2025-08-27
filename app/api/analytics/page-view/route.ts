import { type NextRequest, NextResponse } from "next/server"
import { recordPageView } from "@/lib/analytics"

export async function POST(request: NextRequest) {
  try {
    const { pagePath } = await request.json()

    if (!pagePath) {
      return NextResponse.json({ error: "Page path is required" }, { status: 400 })
    }

    const userAgent = request.headers.get("user-agent") || undefined
    const referrer = request.headers.get("referer") || undefined
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined

    await recordPageView(pagePath, userAgent, ipAddress, referrer)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error recording page view:", error)
    return NextResponse.json({ error: "Failed to record page view" }, { status: 500 })
  }
}

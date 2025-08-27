import { type NextRequest, NextResponse } from "next/server"
import { getAnalyticsStats } from "@/lib/analytics"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = Number.parseInt(searchParams.get("days") || "30")

    const stats = await getAnalyticsStats(days)

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching analytics stats:", error)
    return NextResponse.json({ error: "Failed to fetch analytics stats" }, { status: 500 })
  }
}

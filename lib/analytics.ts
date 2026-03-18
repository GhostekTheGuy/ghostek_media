import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface PageView {
  id: number
  page_path: string
  user_agent: string | null
  ip_address: string | null
  referrer: string | null
  created_at: string
}

export interface ProjectView {
  id: number
  project_id: number
  user_agent: string | null
  ip_address: string | null
  referrer: string | null
  created_at: string
}

export interface AnalyticsStats {
  totalPageViews: number
  totalProjectViews: number
  topProjects: Array<{
    project_id: number
    title: string
    view_count: number
  }>
  recentViews: Array<{
    page_path: string
    view_count: number
  }>
}

// Record a page view
export async function recordPageView(
  pagePath: string,
  userAgent?: string,
  ipAddress?: string,
  referrer?: string,
): Promise<void> {
  try {
    await sql`
      INSERT INTO page_views (page_path, user_agent, ip_address, referrer)
      VALUES (${pagePath}, ${userAgent || null}, ${ipAddress || null}, ${referrer || null})
    `
  } catch (error) {
    console.error("Error recording page view:", error)
  }
}

// Record a project view
export async function recordProjectView(
  projectId: number,
  userAgent?: string,
  ipAddress?: string,
  referrer?: string,
): Promise<void> {
  try {
    await sql`
      INSERT INTO project_views (project_id, user_agent, ip_address, referrer)
      VALUES (${projectId}, ${userAgent || null}, ${ipAddress || null}, ${referrer || null})
    `
  } catch (error) {
    console.error("Error recording project view:", error)
  }
}

// Get analytics statistics
export async function getAnalyticsStats(days = 30): Promise<AnalyticsStats> {
  try {
    const dateThreshold = new Date()
    dateThreshold.setDate(dateThreshold.getDate() - days)

    // Get total page views
    const totalPageViewsResult = await sql`
      SELECT COUNT(*) as count
      FROM page_views
      WHERE created_at >= ${dateThreshold.toISOString()}
    `
    const totalPageViews = Number.parseInt(totalPageViewsResult[0]?.count || "0")

    // Get total project views
    const totalProjectViewsResult = await sql`
      SELECT COUNT(*) as count
      FROM project_views
      WHERE created_at >= ${dateThreshold.toISOString()}
    `
    const totalProjectViews = Number.parseInt(totalProjectViewsResult[0]?.count || "0")

    // Get top projects by views
    const topProjectsResult = await sql`
      SELECT 
        pv.project_id,
        p.title,
        COUNT(*) as view_count
      FROM project_views pv
      JOIN projects p ON pv.project_id = p.id
      WHERE pv.created_at >= ${dateThreshold.toISOString()}
      GROUP BY pv.project_id, p.title
      ORDER BY view_count DESC
      LIMIT 10
    `

    const topProjects = topProjectsResult.map((row) => ({
      project_id: row.project_id,
      title: row.title,
      view_count: Number.parseInt(row.view_count),
    }))

    // Get recent page views
    const recentViewsResult = await sql`
      SELECT 
        page_path,
        COUNT(*) as view_count
      FROM page_views
      WHERE created_at >= ${dateThreshold.toISOString()}
      GROUP BY page_path
      ORDER BY view_count DESC
      LIMIT 10
    `

    const recentViews = recentViewsResult.map((row) => ({
      page_path: row.page_path,
      view_count: Number.parseInt(row.view_count),
    }))

    return {
      totalPageViews,
      totalProjectViews,
      topProjects,
      recentViews,
    }
  } catch (error) {
    console.error("Error fetching analytics stats:", error)
    return {
      totalPageViews: 0,
      totalProjectViews: 0,
      topProjects: [],
      recentViews: [],
    }
  }
}

export async function isAnalyticsAvailable(): Promise<boolean> {
  try {
    await sql`SELECT 1 FROM page_views LIMIT 1`
    return true
  } catch {
    return false
  }
}

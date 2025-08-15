import { neon } from "@neondatabase/serverless"

let sql: ReturnType<typeof neon> | null = null

function getDbConnection() {
  if (typeof process === "undefined" || typeof window !== "undefined") {
    throw new Error("Database connection should only be used on server side")
  }

  if (sql) {
    return sql
  }

  const databaseUrl =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.POSTGRES_URL_NON_POOLING

  if (!databaseUrl) {
    throw new Error("No database URL environment variable found. Please check your Neon integration.")
  }

  sql = neon(databaseUrl)
  return sql
}

export { getDbConnection }

"use client"

import { type ReactNode } from "react"
import "@/lib/i18n"

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

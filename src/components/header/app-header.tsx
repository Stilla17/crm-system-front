"use client"

import { usePathname } from "next/navigation"

import { getPageHeader } from "src/data/page-headers"

import { PageHeader } from "./page-header"

export function AppHeader() {
  const pathname = usePathname()
  const content = getPageHeader(pathname)

  return <PageHeader {...content} />
}

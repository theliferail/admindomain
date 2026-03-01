"use client"

import * as React from "react"
import Link from "next/link"

import { sidebarNavItems } from "@modules/dashboard/constants/navigation"
import { cn } from "@shared/lib/utils"

export default function MobileNav() {
  const [activeId, setActiveId] = React.useState<string>(sidebarNavItems[0]?.id ?? "")

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/75 lg:hidden">
      <div className="mx-auto flex max-w-3xl items-center justify-around px-4 py-3">
        {sidebarNavItems.map(({ id, href, label, icon: Icon }) => {
          const isActive = activeId === id

          return (
            <Link
              key={id}
              href={href}
              className={cn(
                "group flex flex-col items-center gap-1 text-xs font-medium tracking-tight transition-colors",
                isActive ? "text-[#1D4ED8]" : "text-slate-400 hover:text-[#1D4ED8]"
              )}
              onClick={(event) => {
                event.preventDefault()
                setActiveId(id)
              }}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-[#1D4ED8]" : "text-slate-400 group-hover:text-[#1D4ED8]"
                )}
              />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

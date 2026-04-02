"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

import {
  sidebarNavItems,
  sidebarInfoItem,
  infoPopupLinks,
} from "@modules/dashboard/constants/navigation"
import { cn } from "@shared/lib/utils"

export default function MobileNav() {
  const pathname = usePathname()
  const [infoOpen, setInfoOpen] = useState(false)

  const InfoIcon = sidebarInfoItem.icon

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/75 lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-around px-4 py-3">
          {sidebarNavItems.map(({ id, href, label, icon: Icon }) => {
            const isActive = pathname === href

            return (
              <Link
                key={id}
                href={href}
                className={cn(
                  "group flex flex-col items-center gap-1 text-xs font-medium tracking-tight transition-colors",
                  isActive ? "text-[#1D4ED8]" : "text-slate-400 hover:text-[#1D4ED8]"
                )}
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

          <button
            type="button"
            onClick={() => setInfoOpen((prev) => !prev)}
            className={cn(
              "group flex flex-col items-center gap-1 text-xs font-medium tracking-tight transition-colors",
              infoOpen ? "text-[#1D4ED8]" : "text-slate-400 hover:text-[#1D4ED8]"
            )}
          >
            <InfoIcon
              className={cn(
                "h-5 w-5 transition-colors",
                infoOpen ? "text-[#1D4ED8]" : "text-slate-400 group-hover:text-[#1D4ED8]"
              )}
            />
            <span>{sidebarInfoItem.label}</span>
          </button>
        </div>
      </nav>

      {infoOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center lg:hidden"
            onClick={() => setInfoOpen(false)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" />
            <div
              className="relative z-10 w-[85vw] max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] animate-in zoom-in-95 fade-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#29196E]">Info</h3>
                <button
                  type="button"
                  onClick={() => setInfoOpen(false)}
                  className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {infoPopupLinks.map(({ label, href, icon: LinkIcon }) => {
                  const isLinkActive = pathname === href
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setInfoOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        isLinkActive
                          ? "bg-[#1D4ED8] text-white"
                          : "text-slate-600 hover:bg-[#F3F7FF] hover:text-[#1D4ED8]"
                      )}
                    >
                      <LinkIcon
                        className={cn(
                          "h-5 w-5 transition-colors",
                          isLinkActive ? "text-white" : "text-slate-400"
                        )}
                      />
                      {label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

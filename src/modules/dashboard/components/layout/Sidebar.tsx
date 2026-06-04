"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

import { FooterLogoutButton } from "@modules/dashboard/components/layout/FooterLogoutButton"
import {
  sidebarNavItems,
  sidebarInfoItem,
  infoPopupLinks,
} from "@modules/dashboard/constants/navigation"
import { cn } from "@shared/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()
  const [infoOpen, setInfoOpen] = useState(false)

  const InfoIcon = sidebarInfoItem.icon

  return (
    <aside className="hidden h-full w-[260px] flex-col border border-slate-100 bg-white px-5 py-8 shadow-[0_20px_45px_-25px_rgba(15,23,42,0.45)] lg:flex">
      <nav className="flex flex-1 flex-col gap-5">
        {sidebarNavItems.map(({ id, href, label, icon: Icon }) => {
          const isActive = pathname === href

          return (
            <Link
              key={id}
              href={href}
              className={cn(
                "group flex h-[44px] w-[190px] items-center gap-[15px] rounded-[5px] px-[10px] py-2.5 text-[18px] tracking-tight transition-all",
                isActive
                  ? "bg-[#1D4ED8] text-white shadow-[0_14px_30px_-14px_rgba(29,78,216,0.65)]"
                  : "text-slate-500 hover:bg-[#F3F7FF] hover:text-[#1D4ED8]"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-[#1D4ED8]"
                )}
              />
              <span>{label}</span>
            </Link>
          )
        })}

        <div className="relative">
          <button
            type="button"
            onClick={() => setInfoOpen((prev) => !prev)}
            className={cn(
              "group flex h-[44px] w-[190px] items-center gap-[15px] rounded-[5px] px-[10px] py-2.5 text-[18px] tracking-tight transition-all",
              infoOpen
                ? "bg-[#1D4ED8] text-white shadow-[0_14px_30px_-14px_rgba(29,78,216,0.65)]"
                : "text-slate-500 hover:bg-[#F3F7FF] hover:text-[#1D4ED8]"
            )}
          >
            <InfoIcon
              className={cn(
                "h-4 w-4 transition-colors",
                infoOpen
                  ? "text-white"
                  : "text-slate-400 group-hover:text-[#1D4ED8]"
              )}
            />
            <span>{sidebarInfoItem.label}</span>
          </button>

        </div>

        {infoOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setInfoOpen(false)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" />
            <div
              className="relative z-10 w-[90vw] max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] animate-in zoom-in-95 fade-in duration-200"
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
          </div>
        )}
      </nav>

      <FooterLogoutButton />
    </aside>
  )
}
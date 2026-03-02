"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { FooterLogoutButton } from "@modules/dashboard/components/layout/FooterLogoutButton"
import { sidebarNavItems } from "@modules/dashboard/constants/navigation"
import { cn } from "@shared/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()

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
      </nav>

      <FooterLogoutButton />
    </aside>
  )
}
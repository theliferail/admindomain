import type { ComponentType, SVGProps } from "react"

import { CalendarClock, Home, LogOut, User } from "lucide-react"

export type SidebarNavItem = {
  id: string
  href: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const sidebarNavItems: SidebarNavItem[] = [
  {
    id: "home",
    href: "/dashboard",
    label: "Home",
    icon: Home,
  },
  {
    id: "account",
    href: "/dashboard/account",
    label: "Account Mgmt",
    icon: CalendarClock,
  },
  {
    id: "profile",
    href: "/dashboard/profile",
    label: "Profile",
    icon: User,
  },
]

export const sidebarUtilityItem = {
  id: "logout",
  href: "/logout",
  label: "Logout",
  icon: LogOut,
}

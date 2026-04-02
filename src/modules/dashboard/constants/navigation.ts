import type { ComponentType, SVGProps } from "react"

import {
  CalendarClock,
  ClipboardList,
  Home,
  Info,
  LogOut,
  User,
  Stethoscope,
  Building2,
  FlaskConical,
  Users,
  Pill,
} from "lucide-react"

export type SidebarNavItem = {
  id: string
  href: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export type InfoPopupLink = {
  label: string
  href: string
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

export const sidebarInfoItem: SidebarNavItem = {
  id: "info",
  href: "#",
  label: "Info",
  icon: Info,
}

export const infoPopupLinks: InfoPopupLink[] = [
  { label: "Hospitals", href: "/dashboard/hospital", icon: Building2 },
  { label: "Patients", href: "/dashboard/patients", icon: Users },
  { label: "Doctors", href: "/dashboard/doctor", icon: Stethoscope },
  { label: "Labs", href: "/dashboard/labs", icon: FlaskConical },
  { label: "Pharmacies", href: "/dashboard/pharmacy", icon: Pill },
  { label: "Pending tasks", href: "/dashboard/tasks", icon: ClipboardList },
]

export const sidebarUtilityItem = {
  id: "logout",
  href: "/logout",
  label: "Logout",
  icon: LogOut,
}

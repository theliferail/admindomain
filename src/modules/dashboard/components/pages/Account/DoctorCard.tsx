import { User } from "lucide-react"
import { cn } from "@shared/lib/utils"

export interface DoctorCardProps {
  name: string
  code: string
  userType?: string
  status?: string
  onView?: () => void
}

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  INACTIVE: "bg-gray-100 text-gray-500",
  SUSPENDED: "bg-red-100 text-red-700",
}

export default function DoctorCard({ name, code, userType, status, onView }: DoctorCardProps) {
  const badge = status ? statusStyles[status] ?? "bg-gray-100 text-gray-600" : undefined

  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#ECECFE] bg-white px-4 py-3 shadow-[0_8px_24px_-16px_rgba(52,24,135,0.25)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F0F1F5]">
        <User className="h-5 w-5 text-[#7A819F]" />
      </div>

      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold text-[#042362]">{name}</span>
        <span className="text-xs text-[#7A819F]">(#{code})</span>
        {userType && (
          <span className="text-xs text-[#7A819F] capitalize">{userType.toLowerCase()}</span>
        )}
        <button
          type="button"
          onClick={onView}
          className="mt-0.5 self-start text-xs font-medium text-[#1D4ED8] hover:underline"
        >
          View
        </button>
      </div>

      {status && badge && (
        <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium", badge)}>
          {status}
        </span>
      )}
    </div>
  )
}

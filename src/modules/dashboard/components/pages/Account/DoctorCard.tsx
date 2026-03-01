import { User } from "lucide-react"

export interface DoctorCardProps {
  name: string
  code: string
  onView?: () => void
}

export default function DoctorCard({ name, code, onView }: DoctorCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#ECECFE] bg-white px-4 py-3 shadow-[0_8px_24px_-16px_rgba(52,24,135,0.25)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F0F1F5]">
        <User className="h-5 w-5 text-[#7A819F]" />
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-[#042362]">{name}</span>
        <span className="text-xs text-[#7A819F]">(#{code})</span>
        <button
          type="button"
          onClick={onView}
          className="mt-0.5 self-start text-xs font-medium text-[#1D4ED8] hover:underline"
        >
          View
        </button>
      </div>
    </div>
  )
}

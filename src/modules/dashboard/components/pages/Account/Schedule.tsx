"use client"

import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@shared/components/ui/button"

export interface ScheduleEntry {
  day: string
  hours: string
}

export interface ScheduleProps {
  name: string
  avatarUrl?: string
  schedule: ScheduleEntry[]
}

export default function Schedule({ name, avatarUrl, schedule }: ScheduleProps) {
  const router = useRouter()

  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          aria-label="Go back"
          className="h-10 w-10 rounded-lg border-[#DADBF7] text-[#29196E] shadow-[0_10px_30px_-24px_rgba(9,84,235,0.5)] hover:bg-[#EEF2FF]"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-[#042362]">Schedule</h1>
      </div>

      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#E5E7F5]">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-[#7A819F]">
            {name.charAt(0)}
          </div>
        )}
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-1 gap-x-16 gap-y-4 sm:grid-cols-2">
          {schedule.map((entry) => (
            <div
              key={entry.day}
              className="flex items-baseline justify-between gap-4 border-b border-[#F0F1F5] pb-3"
            >
              <span className="text-xs text-[#7A819F]">{entry.day}</span>
              <span className="text-sm font-medium text-[#1E1E1E]">
                {entry.hours}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

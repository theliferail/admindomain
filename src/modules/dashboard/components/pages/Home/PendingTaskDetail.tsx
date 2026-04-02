"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@shared/components/ui/button"
import { cn } from "@shared/lib/utils"

export interface TaskItem {
  id: string
  name: string
  code: string
}

export interface TaskSection {
  title: string
  items: TaskItem[]
}

export interface PendingTaskDetailProps {
  heading: string
  sections: TaskSection[]
  onView?: (item: TaskItem) => void
  className?: string
}

function TaskCard({
  item,
  onView,
}: {
  item: TaskItem
  onView?: () => void
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#ECECFE] bg-[#F0F1F5] px-5 py-4 shadow-sm">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-[#2B2F4A]">{item.name}</span>
        <span className="text-xs text-[#7A819F]">{item.code}</span>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <button
          type="button"
          onClick={onView}
          className="px-3 py-1 text-xs font-medium text-[#0954EB] transition hover:text-[#3A0FC5]"
        >
          View
        </button>
      </div>
    </div>
  )
}

export default function PendingTaskDetail({
  heading,
  sections,
  onView,
  className,
}: PendingTaskDetailProps) {
  const router = useRouter()

  return (
    <section className={cn("flex flex-col gap-6", className)}>
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
        <h1 className="text-2xl font-semibold text-[#29196E]">{heading}</h1>
      </div>

      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-[#2B2F4A]">
              {section.title}
            </h3>
            {section.items.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[#DADBF7] bg-white py-8 text-center text-sm text-[#7A819F]">
                No items found.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {section.items.map((item) => (
                  <TaskCard
                    key={item.id}
                    item={item}
                    onView={() => onView?.(item)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

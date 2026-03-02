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

export interface PendingTasksPageProps {
  patientsWaiting?: TaskItem[]
  cancelledRefunds?: TaskItem[]
  reports?: TaskItem[]
  className?: string
}

interface TaskCardProps {
  item: TaskItem
  onView?: () => void
  onDone?: () => void
}

function TaskCard({ item, onView, onDone }: TaskCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#ECECFE] bg-white px-5 py-4 shadow-sm">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-[#2B2F4A]">{item.name}</span>
        <span className="text-xs text-[#7A819F]">{item.code}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onView}
          className="text-sm font-medium text-[#0954EB] transition hover:text-[#3A0FC5]"
        >
          View
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded border border-[#22C55E] px-3 py-1 text-xs font-medium text-[#22C55E] transition hover:bg-[#22C55E] hover:text-white"
        >
          Done
        </button>
      </div>
    </div>
  )
}

interface TaskSectionProps {
  title: string
  items: TaskItem[]
  onView?: (item: TaskItem) => void
  onDone?: (item: TaskItem) => void
}

function TaskSection({ title, items, onView, onDone }: TaskSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-[#2B2F4A]">{title}</h3>
      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#DADBF7] bg-white py-8 text-center text-sm text-[#7A819F]">
          No items found.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <TaskCard
              key={item.id}
              item={item}
              onView={() => onView?.(item)}
              onDone={() => onDone?.(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function PendingTasksPage({
  patientsWaiting = [],
  cancelledRefunds = [],
  reports = [],
  className,
}: PendingTasksPageProps) {
  const router = useRouter()

  function handleView(item: TaskItem) {
    console.log("View task:", item)
  }

  function handleDone(item: TaskItem) {
    console.log("Mark done:", item)
  }

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
        <h1 className="text-2xl font-semibold text-[#29196E]">
          Pending tasks
        </h1>
      </div>

      <div className="flex flex-col gap-8">
        <TaskSection
          title="Patients waiting to be rematched"
          items={patientsWaiting}
          onView={handleView}
          onDone={handleDone}
        />

        <TaskSection
          title="Cancelled appointments refunds"
          items={cancelledRefunds}
          onView={handleView}
          onDone={handleDone}
        />

        <TaskSection
          title="Reports"
          items={reports}
          onView={handleView}
          onDone={handleDone}
        />
      </div>
    </section>
  )
}

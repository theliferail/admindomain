"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@shared/components/ui/button"
import { Card } from "@shared/components/ui/card"
import { cn } from "@shared/lib/utils"

export interface PendingTaskCategory {
  title: string
  href: string
}

export interface PendingTasksPageProps {
  categories: PendingTaskCategory[]
  className?: string
}

export default function PendingTasksPage({
  categories,
  className,
}: PendingTasksPageProps) {
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
        <h1 className="text-2xl font-semibold text-[#29196E]">
          Pending tasks
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          >
            <Card className="h-full rounded-none border border-slate-200 bg-white px-6 py-5 text-sm font-medium text-slate-600 shadow-[0_18px_35px_-28px_rgba(15,23,42,0.45)] transition-shadow hover:shadow-[0_18px_38px_-20px_rgba(76,81,191,0.35)]">
              <div className="flex h-full items-center justify-between gap-4">
                <span className="truncate text-base font-normal text-slate-700">
                  {category.title}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

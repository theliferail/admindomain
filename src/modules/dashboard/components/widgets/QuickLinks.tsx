"use client"

import Link from "next/link"

import { Card } from "@shared/components/ui/card"
import { cn } from "@shared/lib/utils"

type QuickLinkItem = {
  title: string
  description?: string
  href?: string
}

type QuickLinksProps = {
  heading?: string
  items: QuickLinkItem[]
  className?: string
}

export default function QuickLinks({
  heading = "Quick links",
  items,
  className,
}: QuickLinksProps) {
  return (
    <section className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-normal text-slate-700">{heading}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const content = (
            <Card className="h-full rounded-none border border-slate-200 bg-white px-6 py-5 text-sm font-medium text-slate-600 shadow-[0_18px_35px_-28px_rgba(15,23,42,0.45)] transition-shadow hover:shadow-[0_18px_38px_-20px_rgba(76,81,191,0.35)]">
              <div className="flex h-full items-center justify-between gap-4">
                <span className="truncate text-base font-normal text-slate-700">
                  {item.title}
                </span>
                {item.description ? (
                  <span className="text-xs font-medium text-slate-400">
                    {item.description}
                  </span>
                ) : null}
              </div>
            </Card>
          )

          return item.href ? (
            <Link
              key={item.title}
              href={item.href}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              {content}
            </Link>
          ) : (
            <div key={item.title}>{content}</div>
          )
        })}
      </div>
    </section>
  )
}

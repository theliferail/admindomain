"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, Search } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@shared/components/ui/button"
import { Card, CardDescription, CardTitle } from "@shared/components/ui/card"
import { Input } from "@shared/components/ui/input"
import { Badge } from "@shared/components/ui/badge"
import { cn } from "@shared/lib/utils"

import pharmacyBadge from "@/public/pharmacybadge.svg"
import locationIcon from "@/public/location.svg"
import timeIcon from "@/public/time.svg"
import mobilefilterIcon from "@/public/mobilefilterIcon.svg"

export interface Lab {
  id: string
  code: string
  name: string
  location: string
  operatingHours: string
}

export interface LabPageProps {
  labs: Lab[]
  badgeLabel?: string
  className?: string
}

interface LabCardProps extends Lab {
  badgeLabel: string
  onClick?: () => void
}

function LabCard({
  name,
  code,
  location,
  operatingHours,
  badgeLabel,
  onClick,
}: LabCardProps) {
  return (
    <Card
      onClick={onClick}
      className="relative h-[152px] w-full cursor-pointer overflow-hidden border-[#ECECFE] rounded-xl gap-0 p-0 shadow-[0_18px_40px_-32px_rgba(52,24,135,0.55)] transition hover:shadow-[0_18px_40px_-24px_rgba(52,24,135,0.65)]"
    >
      <Badge className="inline-flex w-[102px] items-center gap-1.5 rounded-none rounded-br-full border-0 bg-[#C2C9D6] px-3 py-1.5 text-[11px] font-medium text-[#1E1E1E]">
        <Image
          src={pharmacyBadge}
          alt="Pharmacy badge"
          width={12}
          height={12}
          className="h-3 w-3"
        />
        {badgeLabel}
      </Badge>

      <div className="flex flex-col gap-1.5 px-5 pb-3 pt-2">
        <div>
          <CardTitle className="text-[15px] font-semibold text-[#042362]">
            {name}
          </CardTitle>
          <CardDescription className="text-[13px] text-[#1E1E1E]">
            ({code})
          </CardDescription>
        </div>

        <span aria-hidden className="block h-px w-full bg-[#E5E7F5]" />
        <div className="flex flex-col gap-1 text-[13px] text-[#5B5F79]">
          <div className="flex items-center gap-2.5">
            <Image
              src={locationIcon}
              alt="Location icon"
              width={16}
              height={16}
              className="h-4 w-4 shrink-0"
            />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Image
              src={timeIcon}
              alt="Operating hours icon"
              width={16}
              height={16}
              className="h-4 w-4 shrink-0"
            />
            <span>{operatingHours}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function LabPage({
  labs,
  badgeLabel = "Lab",
  className,
}: LabPageProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const filteredLabs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return labs
    }

    return labs.filter((lab) => lab.name.toLowerCase().includes(normalizedQuery))
  }, [labs, query])

  return (
    <section className={cn("flex flex-col gap-6", className)}>
      <header className="flex flex-col gap-4">
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
          <h1 className="text-2xl font-semibold text-[#29196E]">Lab</h1>
        </div>

        <div className="flex w-full flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A5C5]" />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for labs by name"
              className="h-11 rounded-lg border-[#DADBF7] pl-11 pr-4 text-sm text-[#2B2F4A] placeholder:text-[#A1A5C5]"
            />
          </div>

          <Button
            type="button"
            size="icon"
            aria-label="Filter labs"
            className="h-11 w-11 rounded-lg bg-[#0954EB] shadow-[0_18px_40px_-30px_rgba(89,23,234,0.9)] transition hover:bg-[#3A0FC5]"
          >
            <Image
              src={mobilefilterIcon}
              alt="Filter icon"
              width={18}
              height={18}
              className="h-[18px] w-[18px]"
            />
          </Button>
        </div>
      </header>

      {filteredLabs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#DADBF7] bg-white py-12 text-center text-sm text-[#7A819F]">
          No labs match the provided name.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredLabs.map((lab) => (
            <LabCard
              key={lab.id}
              badgeLabel={badgeLabel}
              onClick={() => router.push(`/dashboard/labs/${lab.id}`)}
              {...lab}
            />
          ))}
        </div>
      )}
    </section>
  )
}
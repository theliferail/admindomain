"use client"

import { ArrowLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@shared/components/ui/button"

export interface DoctorApplicationProps {
  name: string
  code: string
  status?: string
  avatarUrl?: string
}

const INFO_SECTIONS = [
  { label: "Personal Information", slug: "personal-information" },
  { label: "Professional Information", slug: "professional-information" },
  { label: "Schedule", slug: "schedule" },
]

export default function DoctorApplication({
  name,
  code,
  status = "Unverified",
  avatarUrl,
}: DoctorApplicationProps) {
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
        <h1 className="text-2xl font-semibold text-[#042362]">
          Doctor Application
        </h1>
      </div>

      <div className="flex items-center gap-5">
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
        <div className="flex flex-col">
          <span className="text-sm text-[#7A819F]">
            Status: <span className="font-semibold text-[#1E1E1E]">{status}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex flex-1 flex-col gap-0">
          {INFO_SECTIONS.map((section) => (
            <button
              key={section.label}
              type="button"
              onClick={() =>
                router.push(`/dashboard/account/${code}/${section.slug}`)
              }
              className="flex w-full items-center justify-between border-b border-[#E5E7F5] px-4 py-4 text-sm font-medium text-[#1E1E1E] transition hover:bg-[#F9F9FF]"
            >
              <span>{section.label}</span>
              <ChevronRight className="h-4 w-4 text-[#7A819F]" />
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 lg:w-[240px]">
          <Button
            type="button"
            className="h-11 w-full rounded-lg bg-[#5117EA] text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(81,23,234,0.65)] transition hover:bg-[#3A0FC5]"
          >
            Approve application
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-lg border-[#5117EA] text-sm font-semibold text-[#5117EA] transition hover:bg-[#F3EDFF]"
          >
            Request more information
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-lg border-red-400 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            Reject application
          </Button>
        </div>
      </div>
    </section>
  )
}

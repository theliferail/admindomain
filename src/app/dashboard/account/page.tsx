"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, Search } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import DoctorCard from "@modules/dashboard/components/pages/Account/DoctorCard"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"

import mobilefilterIcon from "@/public/mobilefilterIcon.svg"

const MOCK_DOCTORS = [
  { name: "Dr Ese Umukoro", code: "D255" },
  { name: "Dr Eben Agatha", code: "D637" },
  { name: "Dr Eben Agatha", code: "D637" },
  { name: "Dr Eben Agatha", code: "D637" },
]

export default function Account() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const filteredDoctors = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MOCK_DOCTORS
    return MOCK_DOCTORS.filter((d) => d.name.toLowerCase().includes(q))
  }, [query])

  return (
    <AdminLayout>
      <section className="flex flex-col gap-6">
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
            <h1 className="text-2xl font-semibold text-[#042362]">
              Account Management
            </h1>
          </div>

          <div className="flex w-full flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px] max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A5C5]" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for users using IDs"
                className="h-11 rounded-lg border-[#DADBF7] pl-11 pr-4 text-sm text-[#2B2F4A] placeholder:text-[#A1A5C5]"
              />
            </div>

            <Button
              type="button"
              size="icon"
              aria-label="Filter accounts"
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

        <div>
          <h2 className="mb-3 text-sm font-medium text-[#5B5F79]">
            Accounts yet to be verified
          </h2>

          {filteredDoctors.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#DADBF7] bg-white py-12 text-center text-sm text-[#7A819F]">
              No accounts match your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filteredDoctors.map((doctor, index) => (
                <DoctorCard
                  key={`${doctor.code}-${index}`}
                  name={doctor.name}
                  code={doctor.code}
                  onView={() =>
                    router.push(`/dashboard/account/${doctor.code}`)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  )
}
"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, MoreVertical, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@shared/components/ui/input"
import { Button } from "@shared/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@shared/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/components/ui/table"
import Image from "next/image"
import mobilefilterIcon from "@/public/mobilefilterIcon.svg"

export interface Patient {
    id: string
    name: string
    status: "Active" | "Suspended" | "Blocked"
}

type FilterOption = "All" | Patient["status"]

const FILTER_OPTIONS = [
    { label: "All", value: "All" },
    { label: "Active", value: "Active" },
    { label: "Suspended", value: "Suspended" },
    { label: "Blocked", value: "Blocked" },
] satisfies {label: string; value: FilterOption}[]

type PatientsProps = {
  patients: Patient[]
 }



export default function Patients({ patients }: PatientsProps) {
    const router = useRouter()
    const [statusFilter, setStatusFilter] = useState<FilterOption>("All")
    const [query, setQuery] = useState("")

    const filteredPatients = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()

        return patients.filter((patient) => {
            const matchesStatus = 
            statusFilter === "All" || patient.status.toLowerCase() === statusFilter.toLowerCase()
            const matchesQuery = 
            normalizedQuery.length === 0 ||
            patient.name.toLowerCase().includes(normalizedQuery)
            return matchesStatus && matchesQuery
        })
    }, [patients, query, statusFilter])
    return (
        <section className="flex flex-col gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.65)]">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            aria-label="Go back"
            className="h-10 w-10 rounded-lg border-slate-200 text-[#042362] shadow-[0_10px_30px_-24px_rgba(9,84,235,0.5)] hover:bg-[#EEF2FF]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold text-[#042362]">Patients</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for patients by name"
              className="h-11 rounded-lg border-slate-200 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                aria-label="Filter by status"
                className="h-11 w-11  bg-[#0954EB] text-white shadow-[0_20px_45px_-30px_rgba(95,43,255,0.85)] transition hover:bg-[#300dbbd2]"
              >
              <Image
              src={mobilefilterIcon}
              alt="Filter icon"
              width={18}
              height={18}
              className="h-[18px] w-[18px]"
            />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-36 rounded-xl border-slate-200 p-2 shadow-lg">
              <DropdownMenuRadioGroup
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as FilterOption)}
              >
                {FILTER_OPTIONS.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.value}
                    value={option.value}
                    className="rounded-lg px-3 py-2 text-sm text-slate-700 data-[state=checked]:bg-[#0954EB] data-[state=checked]:text-white"
                  >
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-100">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-[#F6F8FF]">
              <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                #
              </TableHead>
              <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                Name
              </TableHead>
              <TableHead className="h-12 px-6 text-right text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                More
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-center text-sm text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient, index) => (
                <TableRow
                  key={patient.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-transparent"
                >
                  <TableCell className="px-6 py-3 text-sm font text-[#1A1A1A]">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-6 py-3 text-sm text-[#1A1A1A] leading-auto">
                    {patient.name}
                  </TableCell>
                  <TableCell className="px-6 py-3 text-right">
                    <button
                      type="button"
                      aria-label={`View more actions for ${patient.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-slate-100 hover:text-slate-600"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
    
}
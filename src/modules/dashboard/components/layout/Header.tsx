"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

import Logo from "@/public/logo.svg"
import filterIcon from "@/public/filter.svg"
import notificationIcon from "@/public/notification.svg"

import { fetchTotalUsers, type User } from "@/actions/users/totalusers"
import { fetchPharmacies } from "@/actions/pharmacies/getpharmacies"
import type { Pharmacy } from "@/actions/pharmacies/getpharmacybyid"
import { fetchLabs } from "@/actions/labs/getlabs"
import type { Lab } from "@/actions/labs/getlabsbyid"
import { fetchHospitals } from "@/actions/hospitals/gethospitals"
import type { Hospital } from "@/actions/hospitals/gethospitals"

type SearchResult = {
  id: string
  name: string
  category: "Patient" | "Doctor" | "Pharmacy" | "Lab" | "Hospital"
  href: string
}

type FilterCategory = "All" | "Patient" | "Doctor" | "Pharmacy" | "Lab" | "Hospital"

const FILTER_OPTIONS: FilterCategory[] = ["All", "Patient", "Doctor", "Pharmacy", "Lab", "Hospital"]

export default function Header() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<FilterCategory>("All")
  const [showFilter, setShowFilter] = useState(false)

  const [allResults, setAllResults] = useState<SearchResult[]>([])
  const [loaded, setLoaded] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setShowFilter(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fetch all searchable data once
  const loadData = useCallback(async () => {
    if (loaded) return
    try {
      const [usersRes, pharmaciesRes, labsRes, hospitalsRes] = await Promise.allSettled([
        fetchTotalUsers(),
        fetchPharmacies(),
        fetchLabs(),
        fetchHospitals(),
      ])

      const results: SearchResult[] = []

      if (usersRes.status === "fulfilled") {
        usersRes.value.data.forEach((u: User) => {
          const category = u.userType === "DOCTOR" ? "Doctor" : "Patient"
          results.push({
            id: u.id,
            name: `${u.firstName} ${u.lastName}`,
            category,
            href: category === "Doctor" ? `/dashboard/doctor/${u.id}` : `/dashboard/patients/${u.id}`,
          })
        })
      }

      if (pharmaciesRes.status === "fulfilled") {
        pharmaciesRes.value.data.forEach((p: Pharmacy) => {
          results.push({
            id: p.id,
            name: p.pharmacyName,
            category: "Pharmacy",
            href: `/dashboard/pharmacy/${p.id}`,
          })
        })
      }

      if (labsRes.status === "fulfilled") {
        labsRes.value.data.forEach((l: Lab) => {
          results.push({
            id: l.id,
            name: l.labName,
            category: "Lab",
            href: `/dashboard/labs/${l.id}`,
          })
        })
      }

      if (hospitalsRes.status === "fulfilled") {
        hospitalsRes.value.data.forEach((h: Hospital) => {
          results.push({
            id: h.id,
            name: h.hospitalName,
            category: "Hospital",
            href: `/dashboard/hospital/${h.id}`,
          })
        })
      }

      setAllResults(results)
      setLoaded(true)
    } catch {
      setLoaded(true)
    }
  }, [loaded])

  // Load data when user focuses the search bar
  function handleFocus() {
    setOpen(true)
    loadData()
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allResults.filter((r) => {
      const matchesFilter = filter === "All" || r.category === filter
      const matchesQuery =
        !q || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [allResults, query, filter])

  function handleSelect(result: SearchResult) {
    setQuery("")
    setOpen(false)
    router.push(result.href)
  }

  const categoryColor: Record<string, string> = {
    Patient: "bg-blue-100 text-blue-700",
    Doctor: "bg-green-100 text-green-700",
    Pharmacy: "bg-purple-100 text-purple-700",
    Lab: "bg-amber-100 text-amber-700",
    Hospital: "bg-rose-100 text-rose-700",
  }

  return (
    <header className="flex h-[70px] w-full items-center gap-4 border-b border-border bg-white px-5 py-4 sm:gap-6 sm:px-8 lg:px-17">
      <div className="flex items-center">
        <Image src={Logo} alt="LifeRail" priority className="h-[41.25px] w-[80px] sm:w-28" />
      </div>
      <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
        <div ref={containerRef} className="relative hidden w-full max-w-xs md:block md:max-w-sm lg:max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (!open) setOpen(true)
            }}
            onFocus={handleFocus}
            placeholder="Search for doctors, pharmacies, patients, labs, hospitals with ID"
            className="w-full rounded-lg border border-border bg-white pl-12 pr-12 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setOpen(false) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Search results dropdown */}
          {open && (
            <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-border bg-white shadow-lg">
              {/* Filter pills */}
              <div className="flex flex-wrap gap-1.5 border-b border-border px-3 py-2">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFilter(opt)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      filter === opt
                        ? "bg-[#0954EB] text-white"
                        : "bg-[#F0F1F5] text-[#5B5F79] hover:bg-[#E5E7F5]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="max-h-72 overflow-y-auto">
                {!loaded ? (
                  <div className="px-4 py-6 text-center text-sm text-[#7A819F]">Loading...</div>
                ) : filtered.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm text-[#7A819F]">No results found.</div>
                ) : (
                  <ul>
                    {filtered.slice(0, 20).map((result) => (
                      <li key={`${result.category}-${result.id}`}>
                        <button
                          type="button"
                          onClick={() => handleSelect(result)}
                          className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-[#F0F1F5]"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-[#2B2F4A]">{result.name}</span>
                            <span className="text-xs text-[#7A819F]">ID: {result.id.slice(0, 8)}...</span>
                          </div>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${categoryColor[result.category] ?? "bg-gray-100 text-gray-700"}`}>
                            {result.category}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          aria-label="Filter"
          onClick={() => {
            setOpen(!open)
            loadData()
          }}
          className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary/30 sm:flex sm:pr-6"
        >
          <Image src={filterIcon} alt="" className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <Image src={notificationIcon} alt="" className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
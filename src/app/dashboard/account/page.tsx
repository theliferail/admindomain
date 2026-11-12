"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ChevronDown, Search } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import DoctorCard from "@modules/dashboard/components/pages/Account/DoctorCard"
import { Button } from "@shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@shared/components/ui/dropdown-menu"
import { Input } from "@shared/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@shared/components/ui/tabs"
import { fetchTotalUsers, type User } from "@/actions/users/totalusers"
import { fetchLabs } from "@/actions/labs/getlabs"
import { fetchHospitals, type Hospital } from "@/actions/hospitals/gethospitals"
import { fetchPharmacies } from "@/actions/pharmacies/getpharmacies"
import type { Lab } from "@/actions/labs/getlabsbyid"
import type { Pharmacy } from "@/actions/pharmacies/getpharmacybyid"

import mobilefilterIcon from "@/public/mobilefilterIcon.svg"

const STATUS_OPTIONS = ["ACTIVE", "PENDING", "INACTIVE", "SUSPENDED"] as const

const ORG_TYPES = [
  { value: "LAB", label: "Labs" },
  { value: "PHARMACY", label: "Pharmacies" },
  { value: "HOSPITAL", label: "Hospitals" },
] as const

type OrgType = (typeof ORG_TYPES)[number]["value"]

export default function Account() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set())

  // Doctors state
  const [doctors, setDoctors] = useState<User[]>([])
  const [loadingDoctors, setLoadingDoctors] = useState(true)

  // Organisation state
  const [orgType, setOrgType] = useState<OrgType>("LAB")
  const [labs, setLabs] = useState<Lab[]>([])
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loadingOrgs, setLoadingOrgs] = useState(true)

  useEffect(() => {
    fetchTotalUsers()
      .then((response) => {
        setDoctors(response.data.filter((u) => u.userType === "DOCTOR"))
      })
      .catch(() => setDoctors([]))
      .finally(() => setLoadingDoctors(false))

    let completed = 0
    const checkDone = () => {
      completed++
      if (completed === 3) setLoadingOrgs(false)
    }

    fetchLabs()
      .then((res) => setLabs(res.data))
      .catch(() => setLabs([]))
      .finally(checkDone)

    fetchPharmacies()
      .then((res) => setPharmacies(res.data))
      .catch(() => setPharmacies([]))
      .finally(checkDone)

    fetchHospitals()
      .then((res) => setHospitals(res.data))
      .catch(() => setHospitals([]))
      .finally(checkDone)
  }, [])

  const toggleStatus = (status: string) => {
    setStatusFilter((prev) => {
      const next = new Set(prev)
      if (next.has(status)) {
        next.delete(status)
      } else {
        next.add(status)
      }
      return next
    })
  }

  // Filtered doctors
  const filteredDoctors = useMemo(() => {
    let filtered = doctors

    if (statusFilter.size > 0) {
      filtered = filtered.filter((u) => statusFilter.has(u.status))
    }

    const q = query.trim().toLowerCase()
    if (q) {
      filtered = filtered.filter(
        (u) =>
          `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      )
    }

    return filtered
  }, [query, doctors, statusFilter])

  // Filtered organisations
  const filteredOrgs = useMemo(() => {
    const q = query.trim().toLowerCase()

    const filterByStatus = <T extends { status: string }>(items: T[]) =>
      statusFilter.size > 0 ? items.filter((i) => statusFilter.has(i.status)) : items

    if (orgType === "LAB") {
      let filtered = filterByStatus(labs)
      if (q) {
        filtered = filtered.filter(
          (l) =>
            l.labName.toLowerCase().includes(q) ||
            l.id.toLowerCase().includes(q) ||
            l.emailAddress.toLowerCase().includes(q)
        )
      }
      return filtered.map((l) => ({ id: l.id, name: l.labName, status: l.status, type: "Lab" as const }))
    }

    if (orgType === "PHARMACY") {
      let filtered = filterByStatus(pharmacies)
      if (q) {
        filtered = filtered.filter(
          (p) =>
            p.pharmacyName.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q) ||
            p.emailAddress.toLowerCase().includes(q)
        )
      }
      return filtered.map((p) => ({ id: p.id, name: p.pharmacyName, status: p.status, type: "Pharmacy" as const }))
    }

    // HOSPITAL
    let filtered = filterByStatus(hospitals)
    if (q) {
      filtered = filtered.filter(
        (h) =>
          h.hospitalName.toLowerCase().includes(q) ||
          h.id.toLowerCase().includes(q) ||
          h.emailAddress.toLowerCase().includes(q)
      )
    }
    return filtered.map((h) => ({ id: h.id, name: h.hospitalName, status: h.status, type: "Hospital" as const }))
  }, [query, orgType, labs, pharmacies, hospitals, statusFilter])

  const orgLabel = ORG_TYPES.find((o) => o.value === orgType)?.label ?? "Labs"

  return (
    <AdminLayout>
      <section className="flex flex-col gap-6">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              aria-label="Go back"
              className="flex items-center gap-2 px-4 py-2 text-base font-medium rounded-lg border-[#DADBF7] text-[#29196E] shadow-[0_10px_30px_-24px_rgba(9,84,235,0.5)] hover:bg-[#EEF2FF]"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
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
                placeholder="Search by name, email, or ID"
                className="h-11 rounded-lg border-[#DADBF7] pl-11 pr-4 text-sm text-[#2B2F4A] placeholder:text-[#A1A5C5]"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  aria-label="Filter accounts by status"
                  className="relative h-11 w-11 rounded-lg bg-[#0954EB] shadow-[0_18px_40px_-30px_rgba(89,23,234,0.9)] transition hover:bg-[#3A0FC5]"
                >
                  <Image
                    src={mobilefilterIcon}
                    alt="Filter icon"
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px]"
                  />
                  {statusFilter.size > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {statusFilter.size}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {STATUS_OPTIONS.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.has(status)}
                    onCheckedChange={() => toggleStatus(status)}
                    className="capitalize"
                  >
                    {status.toLowerCase()}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <Tabs defaultValue="doctors">
          <TabsList>
            <TabsTrigger value="doctors">
              Doctors ({filteredDoctors.length})
            </TabsTrigger>
            <TabsTrigger value="organisations">
              Organisations ({filteredOrgs.length})
            </TabsTrigger>
          </TabsList>

          {/* Doctors Tab */}
          <TabsContent value="doctors">
            {loadingDoctors ? (
              <div className="rounded-xl border border-dashed border-[#DADBF7] bg-white py-12 text-center text-sm text-[#7A819F]">
                Loading doctors…
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#DADBF7] bg-white py-12 text-center text-sm text-[#7A819F]">
                No doctor accounts found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredDoctors.map((user) => (
                  <DoctorCard
                    key={user.id}
                    name={`${user.firstName} ${user.lastName}`}
                    code={user.id}
                    userType={user.userType}
                    status={user.status}
                    onView={() => router.push(`/dashboard/account/${user.id}`)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Organisations Tab */}
          <TabsContent value="organisations" className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#5B5F79]">Type:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-lg border-[#DADBF7] px-4 py-2 text-sm font-medium text-[#2B2F4A]"
                  >
                    {orgLabel}
                    <ChevronDown className="h-4 w-4 text-[#A1A5C5]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40">
                  {ORG_TYPES.map((org) => (
                    <DropdownMenuItem
                      key={org.value}
                      onClick={() => setOrgType(org.value)}
                      className={orgType === org.value ? "font-semibold text-[#0954EB]" : ""}
                    >
                      {org.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {loadingOrgs ? (
              <div className="rounded-xl border border-dashed border-[#DADBF7] bg-white py-12 text-center text-sm text-[#7A819F]">
                Loading organisations…
              </div>
            ) : filteredOrgs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#DADBF7] bg-white py-12 text-center text-sm text-[#7A819F]">
                No {orgLabel.toLowerCase()} found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredOrgs.map((org) => (
                  <DoctorCard
                    key={org.id}
                    name={org.name}
                    code={org.id}
                    userType={org.type}
                    status={org.status}
                    onView={() =>
                      router.push(
                        orgType === "LAB"
                          ? `/dashboard/labs/${org.id}`
                          : orgType === "PHARMACY"
                            ? `/dashboard/pharmacy/${org.id}`
                            : `/dashboard/hospital/${org.id}`
                      )
                    }
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </AdminLayout>
  )
}

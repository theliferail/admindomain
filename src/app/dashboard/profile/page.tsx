"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, Search, User, Mail, Phone, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@shared/components/ui/sheet"
import { fetchTotalUsers, type User as UserType } from "@/actions/users/totalusers"
import { fetchLabs } from "@/actions/labs/getlabs"
import { fetchHospitals, type Hospital } from "@/actions/hospitals/gethospitals"
import { fetchPharmacies } from "@/actions/pharmacies/getpharmacies"
import type { Lab } from "@/actions/labs/getlabsbyid"
import type { Pharmacy } from "@/actions/pharmacies/getpharmacybyid"

type Organisation = {
  id: string
  name: string
  type: "Hospital" | "Lab" | "Pharmacy"
}

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  INACTIVE: "bg-gray-100 text-gray-500",
  SUSPENDED: "bg-red-100 text-red-700",
}

export default function ProfilePage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState<UserType[]>([])
  const [organisations, setOrganisations] = useState<Organisation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersRes, labsRes, pharmaciesRes, hospitalsRes] = await Promise.allSettled([
          fetchTotalUsers(),
          fetchLabs(),
          fetchPharmacies(),
          fetchHospitals(),
        ])

        if (usersRes.status === "fulfilled") {
          setUsers(usersRes.value.data)
        }

        const orgs: Organisation[] = []

        if (hospitalsRes.status === "fulfilled") {
          hospitalsRes.value.data.forEach((h: Hospital) =>
            orgs.push({ id: h.id, name: h.hospitalName, type: "Hospital" })
          )
        }

        if (labsRes.status === "fulfilled") {
          labsRes.value.data.forEach((l: Lab) =>
            orgs.push({ id: l.id, name: l.labName, type: "Lab" })
          )
        }

        if (pharmaciesRes.status === "fulfilled") {
          pharmaciesRes.value.data.forEach((p: Pharmacy) =>
            orgs.push({ id: p.id, name: p.pharmacyName, type: "Pharmacy" })
          )
        }

        setOrganisations(orgs)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Group users by userType (acting as org affiliation)
  const groupedByOrg = useMemo(() => {
    const q = query.trim().toLowerCase()

    const filtered = q
      ? users.filter(
          (u) =>
            `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
            u.id.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.userType.toLowerCase().includes(q)
        )
      : users

    const groups: Record<string, UserType[]> = {}

    // Group by organisation type
    for (const user of filtered) {
      const orgKey = user.userType || "UNASSIGNED"
      if (!groups[orgKey]) {
        groups[orgKey] = []
      }
      groups[orgKey].push(user)
    }

    return groups
  }, [users, query])

  const orgTypeLabel = (type: string) => {
    switch (type) {
      case "DOCTOR": return "Doctors"
      case "PATIENT": return "Patients"
      case "HOSPITAL": return "Hospital Staff"
      case "LAB": return "Lab Staff"
      case "PHARMACY": return "Pharmacy Staff"
      default: return type
    }
  }

  const handleViewUser = (user: UserType) => {
    setSelectedUser(user)
    setSheetOpen(true)
  }

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
            <h1 className="text-2xl font-semibold text-[#042362]">Profile</h1>
          </div>

          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A5C5]" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search staff by name, email, or ID"
              className="h-11 rounded-lg border-[#DADBF7] pl-11 pr-4 text-sm text-[#2B2F4A] placeholder:text-[#A1A5C5]"
            />
          </div>
        </header>

        {/* Organisation summary */}
        {organisations.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-[#5B5F79]">
              Registered Organisations ({organisations.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {organisations.map((org) => (
                <span
                  key={org.id}
                  className="rounded-full border border-[#DADBF7] bg-white px-3 py-1 text-xs font-medium text-[#2B2F4A]"
                >
                  {org.name}
                  <span className="ml-1 text-[#A1A5C5]">({org.type})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Staff grouped by organisation */}
        {loading ? (
          <div className="rounded-xl border border-dashed border-[#DADBF7] bg-white py-12 text-center text-sm text-[#7A819F]">
            Loading staff…
          </div>
        ) : Object.keys(groupedByOrg).length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#DADBF7] bg-white py-12 text-center text-sm text-[#7A819F]">
            No staff found.
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedByOrg).map(([orgType, orgUsers]) => (
              <div key={orgType}>
                <h3 className="mb-3 text-sm font-semibold text-[#042362]">
                  {orgTypeLabel(orgType)}{" "}
                  <span className="font-normal text-[#7A819F]">({orgUsers.length})</span>
                </h3>

                <div className="overflow-hidden rounded-xl border border-[#ECECFE] bg-white">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-[#ECECFE] bg-[#F8F9FC]">
                      <tr>
                        <th className="px-4 py-3 font-medium text-[#5B5F79]">Name</th>
                        <th className="hidden px-4 py-3 font-medium text-[#5B5F79] sm:table-cell">Email</th>
                        <th className="hidden px-4 py-3 font-medium text-[#5B5F79] md:table-cell">Phone</th>
                        <th className="px-4 py-3 font-medium text-[#5B5F79]">Status</th>
                        <th className="px-4 py-3 font-medium text-[#5B5F79]"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F1F5]">
                      {orgUsers.map((user) => (
                        <tr key={user.id} className="transition hover:bg-[#F8F9FC]">
                          <td className="px-4 py-3 font-medium text-[#042362]">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="hidden px-4 py-3 text-[#5B5F79] sm:table-cell">{user.email}</td>
                          <td className="hidden px-4 py-3 text-[#5B5F79] md:table-cell">{user.phone || "—"}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[user.status] ?? "bg-gray-100 text-gray-600"}`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => handleViewUser(user)}
                              className="text-xs font-medium text-[#0954EB] hover:underline"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* User detail side panel */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="overflow-y-auto">
          {selectedUser && (
            <>
              <SheetHeader>
                <SheetTitle className="text-[#042362]">
                  {selectedUser.firstName} {selectedUser.lastName}
                </SheetTitle>
                <SheetDescription>
                  {selectedUser.userType} — {selectedUser.status}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F1F5]">
                    <User className="h-7 w-7 text-[#7A819F]" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[#042362]">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </p>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[selectedUser.status] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {selectedUser.status}
                    </span>
                  </div>
                </div>

                <hr className="border-[#ECECFE]" />

                <dl className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-[#A1A5C5]" />
                    <div>
                      <dt className="text-xs font-medium text-[#A1A5C5]">Email</dt>
                      <dd className="text-sm text-[#1E1E1E]">{selectedUser.email}</dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-[#A1A5C5]" />
                    <div>
                      <dt className="text-xs font-medium text-[#A1A5C5]">Phone</dt>
                      <dd className="text-sm text-[#1E1E1E]">{selectedUser.phone || "—"}</dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="mt-0.5 h-4 w-4 text-[#A1A5C5]" />
                    <div>
                      <dt className="text-xs font-medium text-[#A1A5C5]">User Type</dt>
                      <dd className="text-sm text-[#1E1E1E] capitalize">{selectedUser.userType.toLowerCase()}</dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 text-[#A1A5C5]" />
                    <div>
                      <dt className="text-xs font-medium text-[#A1A5C5]">Registered</dt>
                      <dd className="text-sm text-[#1E1E1E]">
                        {new Date(selectedUser.createdAt).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </dd>
                    </div>
                  </div>

                  {selectedUser.roles.length > 0 && (
                    <div>
                      <dt className="mb-1 text-xs font-medium text-[#A1A5C5]">Roles</dt>
                      <dd className="flex flex-wrap gap-1">
                        {selectedUser.roles.map((role) => (
                          <span
                            key={role}
                            className="rounded-full bg-[#F0F1F5] px-2.5 py-0.5 text-[11px] font-medium text-[#2B2F4A]"
                          >
                            {role}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AdminLayout>
  )
}

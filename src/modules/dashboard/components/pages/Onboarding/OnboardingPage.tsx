"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  fetchOnboardingOrganizations,
  type Organization,
  type OrganizationStatus,
} from "@/actions/onboarding/getOrganizations"
import { Badge } from "@shared/components/ui/badge"
import { Button } from "@shared/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/components/ui/table"
import { cn } from "@shared/lib/utils"
import BusinessDetailModal from "./BusinessDetailModal"
import { toast } from "sonner"

type TabKey = "HOSPITAL" | "PHARMACY" | "LAB"

const TABS: { key: TabKey; label: string }[] = [
  { key: "HOSPITAL", label: "Hospital" },
  { key: "PHARMACY", label: "Pharmacy" },
  { key: "LAB", label: "Lab" },
]

const statusLabel: Record<OrganizationStatus, string> = {
  PENDING_ONBOARDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
}

const statusStyles: Record<OrganizationStatus, string> = {
  PENDING_ONBOARDING: "bg-amber-100 text-amber-700 border-amber-200",
  APPROVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  REJECTED: "bg-red-100 text-red-700 border-red-200",
}

export default function OnboardingPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabKey>("HOSPITAL")
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchOnboardingOrganizations()
      .then((res) => setOrganizations(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const currentData = useMemo(
    () => organizations.filter((org) => org.type === activeTab),
    [organizations, activeTab],
  )

  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const updateStatus = useCallback(
    (id: string, newStatus: OrganizationStatus) => {
      setOrganizations((prev) =>
        prev.map((org) => (org.id === id ? { ...org, status: newStatus } : org))
      )
    },
    [],
  )

  const handleStatusClick = useCallback((org: Organization) => {
    const businessId =
      org.type === "HOSPITAL"
        ? org.hospitalId
        : org.type === "PHARMACY"
          ? org.pharmacyId
          : org.labId

    if (businessId) {
      setSelectedOrgId(businessId)
      setModalOpen(true)
    } else {
      toast.error(`No ${org.type.toLowerCase()} ID found for this organization.`)
    }
  }, [])

  return (
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
            Onboarding Management
          </h1>
        </div>
      </header>

      <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 w-fit">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={cn(
              "rounded-md px-5 py-2 text-sm font-medium transition-all",
              activeTab === key
                ? "bg-[#1D4ED8] text-white shadow-sm"
                : "text-slate-500 hover:bg-white hover:text-slate-700"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Business Name
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email Address
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Phone Number
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </TableHead>
              <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-sm text-slate-500"
                >
                  Loading organizations…
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-sm text-red-500"
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-sm text-slate-400"
                >
                  No businesses found.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium text-slate-800">
                    {org.name}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {org.email}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {org.phone}
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => handleStatusClick(org)}
                      className="cursor-pointer"
                    >
                      <Badge
                        variant="outline"
                        className={cn("text-xs hover:ring-2 hover:ring-[#1D4ED8]/30 transition-shadow", statusStyles[org.status])}
                      >
                        {statusLabel[org.status]}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateStatus(org.id, "APPROVED")}
                        disabled={org.status === "APPROVED"}
                        aria-label={`Approve ${org.name}`}
                        className="rounded-md p-1.5 text-emerald-600 transition-colors hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(org.id, "REJECTED")}
                        disabled={org.status === "REJECTED"}
                        aria-label={`Reject ${org.name}`}
                        className="rounded-md p-1.5 text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {selectedOrgId && (
        <BusinessDetailModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setSelectedOrgId(null)
          }}
          businessId={selectedOrgId}
          businessType={activeTab}
          onApprove={(id) => updateStatus(id, "APPROVED")}
          onReject={(id) => updateStatus(id, "REJECTED")}
        />
      )}
    </section>
  )
}

"use client"

import { useState, useEffect, useMemo } from "react"
import { Clock } from "lucide-react"

import {
  fetchPendingInvitations,
  type PendingInvitation,
  type OrganizationType,
} from "@/actions/onboarding/getPendingInvitations"
import { Badge } from "@shared/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/components/ui/table"
import { cn } from "@shared/lib/utils"

type TabKey = OrganizationType

const TABS: { key: TabKey; label: string }[] = [
  { key: "HOSPITAL", label: "Hospital" },
  { key: "PHARMACY", label: "Pharmacy" },
  { key: "LAB", label: "Lab" },
]

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  ACCEPTED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  EXPIRED: "bg-slate-100 text-slate-500 border-slate-200",
}

const statusLabel: Record<string, string> = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  EXPIRED: "Expired",
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function PendingInvitations() {
  const [activeTab, setActiveTab] = useState<TabKey>("HOSPITAL")
  const [invitations, setInvitations] = useState<PendingInvitation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchPendingInvitations()
      .then((res) => setInvitations(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const currentData = useMemo(
    () => invitations.filter((inv) => inv.organizationType === activeTab),
    [invitations, activeTab],
  )

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-[#1D4ED8]" />
        <h2 className="text-lg font-semibold text-[#042362]">
          Pending Invitations
        </h2>
      </div>

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
                Email
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Phone
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Invited By
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Expires
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-12 text-center text-sm text-slate-500"
                >
                  Loading invitations…
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-12 text-center text-sm text-red-500"
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-12 text-center text-sm text-slate-400"
                >
                  No pending invitations found.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium text-slate-800">
                    {inv.businessName}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {inv.businessEmail}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {inv.businessPhone}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {inv.invitedByName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("text-xs", statusStyles[inv.status])}
                    >
                      {statusLabel[inv.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {formatDate(inv.expiresAt)}
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

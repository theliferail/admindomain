"use client"

import { useEffect, useState } from "react"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import Patients, { type Patient } from "@/src/modules/dashboard/components/pages/Home/Patients"
import { fetchTotalUsers } from "@/actions/users/totalusers"

const STATUS_MAP: Record<string, Patient["status"]> = {
  ACTIVE: "Active",
  SUSPENDED: "Suspended",
  BLOCKED: "Blocked",
  PENDING_VERIFICATION: "Active",
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTotalUsers()
      .then((response) => {
        const mapped: Patient[] = response.data
          .filter((user) => user.userType === "PATIENT")
          .map((user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`.trim(),
            status: STATUS_MAP[user.status] ?? "Active",
          }))
        setPatients(mapped)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load patients.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <AdminLayout>
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <span className="text-sm font-medium text-slate-500">Loading patients…</span>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : (
        <Patients patients={patients} />
      )}
    </AdminLayout>
  )
}

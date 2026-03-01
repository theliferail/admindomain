"use client"

import { useEffect, useState } from "react"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import Doctors, { type Doctor } from "@modules/dashboard/components/pages/Doctors"
import { fetchTotalUsers } from "@/actions/users/totalusers"
import { fetchUsersByStatus } from "@/actions/users/usersbystatus"

const STATUS_MAP: Record<string, Doctor["status"]> = {
  ACTIVE: "Active",
  SUSPENDED: "Suspended",
  BLOCKED: "Blocked",
  PENDING_VERIFICATION: "Active",
}

export default function Doctorpage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([fetchTotalUsers(), fetchUsersByStatus("ACTIVE")])
      .then(([allUsersRes, activeUsersRes]) => {
        const activeIds = new Set(
          activeUsersRes.data
            .filter((u) => u.userType === "DOCTOR")
            .map((u) => u.id)
        )

        const mapped: Doctor[] = allUsersRes.data
          .filter((user) => user.userType === "DOCTOR")
          .map((user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`.trim(),
            status: STATUS_MAP[user.status] ?? "Active",
            isOnline: activeIds.has(user.id),
          }))
        setDoctors(mapped)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load doctors.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <AdminLayout>
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <span className="text-sm font-medium text-slate-500">Loading doctors…</span>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : (
        <Doctors doctors={doctors} />
      )}
    </AdminLayout>
  )
}
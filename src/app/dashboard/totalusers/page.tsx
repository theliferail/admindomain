"use client"

import { useEffect, useState } from "react"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import Totalusers, {
  type TotalUser,
} from "@/src/modules/dashboard/components/pages/Home/Totalusers"
import { fetchTotalUsers } from "@/actions/users/totalusers"

const STATUS_MAP: Record<string, TotalUser["status"]> = {
  ACTIVE: "Active",
  SUSPENDED: "Suspended",
  BLOCKED: "Blocked",
  PENDING_VERIFICATION: "Active",
}

export default function TotalusersPage() {
  const [users, setUsers] = useState<TotalUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTotalUsers()
      .then((response) => {
        const mapped: TotalUser[] = response.data.map((user) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`.trim(),
          status: STATUS_MAP[user.status] ?? "Active",
        }))
        setUsers(mapped)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load users.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <AdminLayout>
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <span className="text-sm font-medium text-slate-500">Loading users…</span>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : (
        <Totalusers users={users} />
      )}
    </AdminLayout>
  )
}
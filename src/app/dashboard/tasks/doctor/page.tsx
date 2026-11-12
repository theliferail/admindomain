"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import PendingTaskDetail from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"
import type { TaskSection, TaskItem } from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"
import { fetchTotalUsers, type User } from "@/actions/users/totalusers"

export default function DoctorPendingTasks() {
  const router = useRouter()
  const [doctors, setDoctors] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTotalUsers()
      .then((res) => {
        setDoctors(res.data.filter((u) => u.userType === "DOCTOR"))
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const sections: TaskSection[] = useMemo(() => {
    const grouped: Record<string, User[]> = {}
    for (const doc of doctors) {
      const status = doc.status || "UNKNOWN"
      if (!grouped[status]) grouped[status] = []
      grouped[status].push(doc)
    }

    return Object.entries(grouped).map(([status, users]) => ({
      title: status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      items: users.map((u) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        code: `#${u.id.slice(0, 6).toUpperCase()}`,
      })),
    }))
  }, [doctors])

  function handleView(item: TaskItem) {
    router.push(`/dashboard/account/${item.id}`)
  }

  return (
    <AdminLayout>
      <PendingTaskDetail
        heading="Doctor pending tasks"
        sections={sections}
        loading={loading}
        error={error}
        onView={handleView}
      />
    </AdminLayout>
  )
}

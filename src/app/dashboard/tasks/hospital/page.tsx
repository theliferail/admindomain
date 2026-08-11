"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import PendingTaskDetail from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"
import type { TaskSection, TaskItem } from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"
import { fetchHospitals, type Hospital } from "@/actions/hospitals/gethospitals"

export default function HospitalPendingTasks() {
  const router = useRouter()
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchHospitals()
      .then((res) => setHospitals(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const sections: TaskSection[] = useMemo(() => {
    const grouped: Record<string, Hospital[]> = {}
    for (const h of hospitals) {
      const status = h.status || "UNKNOWN"
      if (!grouped[status]) grouped[status] = []
      grouped[status].push(h)
    }

    return Object.entries(grouped).map(([status, items]) => ({
      title: status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      items: items.map((h) => ({
        id: h.id,
        name: h.hospitalName,
        code: `#${h.id.slice(0, 6).toUpperCase()}`,
      })),
    }))
  }, [hospitals])

  function handleView(item: TaskItem) {
    router.push(`/dashboard/hospital/${item.id}`)
  }

  return (
    <AdminLayout>
      <PendingTaskDetail
        heading="Hospital pending tasks"
        sections={sections}
        loading={loading}
        error={error}
        onView={handleView}
      />
    </AdminLayout>
  )
}

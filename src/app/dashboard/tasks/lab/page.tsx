"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import PendingTaskDetail from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"
import type { TaskSection, TaskItem } from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"
import { fetchLabs } from "@/actions/labs/getlabs"
import type { Lab } from "@/actions/labs/getlabsbyid"

export default function LabPendingTasks() {
  const router = useRouter()
  const [labs, setLabs] = useState<Lab[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLabs()
      .then((res) => setLabs(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const sections: TaskSection[] = useMemo(() => {
    const grouped: Record<string, Lab[]> = {}
    for (const l of labs) {
      const status = l.status || "UNKNOWN"
      if (!grouped[status]) grouped[status] = []
      grouped[status].push(l)
    }

    return Object.entries(grouped).map(([status, items]) => ({
      title: status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      items: items.map((l) => ({
        id: l.id,
        name: l.labName,
        code: `#${l.id.slice(0, 6).toUpperCase()}`,
      })),
    }))
  }, [labs])

  function handleView(item: TaskItem) {
    router.push(`/dashboard/labs/${item.id}`)
  }

  return (
    <AdminLayout>
      <PendingTaskDetail
        heading="Lab pending tasks"
        sections={sections}
        loading={loading}
        error={error}
        onView={handleView}
      />
    </AdminLayout>
  )
}

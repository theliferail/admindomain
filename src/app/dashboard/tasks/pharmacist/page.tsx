"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import PendingTaskDetail from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"
import type { TaskSection, TaskItem } from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"
import { fetchPharmacies } from "@/actions/pharmacies/getpharmacies"
import type { Pharmacy } from "@/actions/pharmacies/getpharmacybyid"

export default function PharmacistPendingTasks() {
  const router = useRouter()
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPharmacies()
      .then((res) => setPharmacies(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const sections: TaskSection[] = useMemo(() => {
    const grouped: Record<string, Pharmacy[]> = {}
    for (const p of pharmacies) {
      const status = p.status || "UNKNOWN"
      if (!grouped[status]) grouped[status] = []
      grouped[status].push(p)
    }

    return Object.entries(grouped).map(([status, items]) => ({
      title: status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      items: items.map((p) => ({
        id: p.id,
        name: p.pharmacyName,
        code: `#${p.id.slice(0, 6).toUpperCase()}`,
      })),
    }))
  }, [pharmacies])

  function handleView(item: TaskItem) {
    router.push(`/dashboard/pharmacy/${item.id}`)
  }

  return (
    <AdminLayout>
      <PendingTaskDetail
        heading="Pharmacist pending tasks"
        sections={sections}
        loading={loading}
        error={error}
        onView={handleView}
      />
    </AdminLayout>
  )
}

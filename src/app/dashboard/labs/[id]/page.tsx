"use client"

import { useParams } from "next/navigation"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import LabDetail from "@modules/dashboard/components/pages/Home/LabDetail"

export default function LabDetailPage() {
  const params = useParams<{ id: string }>()

  return (
    <AdminLayout>
      <LabDetail id={params.id ?? ""} />
    </AdminLayout>
  )
}

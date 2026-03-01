"use client"

import { useParams } from "next/navigation"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import DoctorApplication from "@modules/dashboard/components/pages/Account/DoctorApplication"

export default function DoctorDetailPage() {
  const params = useParams<{ id: string }>()

  return (
    <AdminLayout>
      <DoctorApplication
        name="Dr Ese Umukoro"
        code={params.id ?? ""}
        status="Unverified"
      />
    </AdminLayout>
  )
}

"use client"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import CreateHospitalForm from "@/src/modules/dashboard/components/pages/Home/CreateHospital"

export default function CreateHospitalPage() {
  return (
    <AdminLayout>
      <CreateHospitalForm />
    </AdminLayout>
  )
}

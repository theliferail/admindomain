"use client"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import CreatePharmacyForm from "@/src/modules/dashboard/components/pages/Home/CreatePharmacy"

export default function CreatePharmacyPage() {
  return (
    <AdminLayout>
      <CreatePharmacyForm />
    </AdminLayout>
  )
}

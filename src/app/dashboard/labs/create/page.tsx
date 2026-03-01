"use client"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import CreateLabForm from "@/src/modules/dashboard/components/pages/Home/CreateLab"

export default function CreateLabPage() {
  return (
    <AdminLayout>
      <CreateLabForm />
    </AdminLayout>
  )
}

"use client"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import PendingTasksPage from "@/src/modules/dashboard/components/pages/Home/PendingTasks"
import type { PendingTaskCategory } from "@/src/modules/dashboard/components/pages/Home/PendingTasks"

const taskCategories: PendingTaskCategory[] = [
  { title: "Doctor pending tasks", href: "/dashboard/tasks/doctor" },
  { title: "Hospital pending tasks", href: "/dashboard/tasks/hospital" },
  { title: "Lab pending tasks", href: "/dashboard/tasks/lab" },
  { title: "Pharmacist pending tasks", href: "/dashboard/tasks/pharmacist" },
]

export default function Tasks() {
  return (
    <AdminLayout>
      <PendingTasksPage categories={taskCategories} />
    </AdminLayout>
  )
}

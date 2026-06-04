"use client"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import PendingTaskDetail from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"
import type { TaskSection, TaskItem } from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"

const sections: TaskSection[] = [
  {
    title: "Pending dispensing",
    items: [
      { id: "pd-1", name: "Akpan Etim Uyimeh", code: "#P001" },
      { id: "pd-2", name: "Akpan Etim Uyimeh", code: "#P002" },
    ],
  },
  {
    title: "Awaiting prescription",
    items: [
      { id: "pp-1", name: "Akpan Etim Uyimeh", code: "#P003" },
      { id: "pp-2", name: "Akpan Etim Uyimeh", code: "#P004" },
    ],
  },
  {
    title: "Awaiting authorization by Admin",
    items: [
      { id: "pa-1", name: "Akpan Etim Uyimeh", code: "#P005" },
      { id: "pa-2", name: "Akpan Etim Uyimeh", code: "#P006" },
    ],
  },
]

export default function PharmacistPendingTasks() {
  function handleView(item: TaskItem) {
    console.log("View:", item)
  }

  return (
    <AdminLayout>
      <PendingTaskDetail
        heading="Pharmacist pending tasks"
        sections={sections}
        onView={handleView}
      />
    </AdminLayout>
  )
}

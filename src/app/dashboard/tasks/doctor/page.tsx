"use client"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import PendingTaskDetail from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"
import type { TaskSection, TaskItem } from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"

const sections: TaskSection[] = [
  {
    title: "Pending verification",
    items: [
      { id: "dv-1", name: "Akpan Etim Uyimeh", code: "#D001" },
      { id: "dv-2", name: "Akpan Etim Uyimeh", code: "#D002" },
    ],
  },
  {
    title: "Pending consultation",
    items: [
      { id: "dc-1", name: "Akpan Etim Uyimeh", code: "#D003" },
      { id: "dc-2", name: "Akpan Etim Uyimeh", code: "#D004" },
    ],
  },
  {
    title: "Pending patient review",
    items: [
      { id: "dr-1", name: "Akpan Etim Uyimeh", code: "#D005" },
      { id: "dr-2", name: "Akpan Etim Uyimeh", code: "#D006" },
    ],
  },
]

export default function DoctorPendingTasks() {
  function handleView(item: TaskItem) {
    console.log("View:", item)
  }

  return (
    <AdminLayout>
      <PendingTaskDetail
        heading="Doctor pending tasks"
        sections={sections}
        onView={handleView}
      />
    </AdminLayout>
  )
}

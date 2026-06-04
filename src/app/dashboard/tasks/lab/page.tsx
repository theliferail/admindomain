"use client"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import PendingTaskDetail from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"
import type { TaskSection, TaskItem } from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"

const sections: TaskSection[] = [
  {
    title: "Patient Lab test",
    items: [
      { id: "lt-1", name: "Akpan Etim Uyimeh", code: "#L001" },
      { id: "lt-2", name: "Akpan Etim Uyimeh", code: "#L002" },
    ],
  },
  {
    title: "Patient Lab result",
    items: [
      { id: "lr-1", name: "Akpan Etim Uyimeh", code: "#L003" },
      { id: "lr-2", name: "Akpan Etim Uyimeh", code: "#L004" },
    ],
  },
]

export default function LabPendingTasks() {
  function handleView(item: TaskItem) {
    console.log("View:", item)
  }

  return (
    <AdminLayout>
      <PendingTaskDetail
        heading="Lab pending tasks"
        sections={sections}
        onView={handleView}
      />
    </AdminLayout>
  )
}

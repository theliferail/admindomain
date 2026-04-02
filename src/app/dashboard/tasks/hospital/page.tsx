"use client"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import PendingTaskDetail from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"
import type { TaskSection, TaskItem } from "@/src/modules/dashboard/components/pages/Home/PendingTaskDetail"

const sections: TaskSection[] = [
  {
    title: "Awaiting verification",
    items: [
      { id: "hv-1", name: "Akpan Etim Uyimeh", code: "#H001" },
      { id: "hv-2", name: "Akpan Etim Uyimeh", code: "#H002" },
    ],
  },
  {
    title: "Doctor awaiting approval",
    items: [
      { id: "ha-1", name: "Akpan Etim Uyimeh", code: "#H003" },
      { id: "ha-2", name: "Akpan Etim Uyimeh", code: "#H004" },
    ],
  },
]

export default function HospitalPendingTasks() {
  function handleView(item: TaskItem) {
    console.log("View:", item)
  }

  return (
    <AdminLayout>
      <PendingTaskDetail
        heading="Hospital pending tasks"
        sections={sections}
        onView={handleView}
      />
    </AdminLayout>
  )
}

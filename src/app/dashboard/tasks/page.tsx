"use client"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import PendingTasksPage from "@/src/modules/dashboard/components/pages/Home/PendingTasks"

const mockPatientsWaiting = [
  { id: "1", name: "Akpan Etim Uyimeh", code: "#P001" },
  { id: "2", name: "Akpan Etim Uyimeh", code: "#P001" },
  { id: "3", name: "Akpan Etim Uyimeh", code: "#P001" },
  { id: "4", name: "Akpan Etim Uyimeh", code: "#P001" },
]

const mockCancelledRefunds = [
  { id: "5", name: "Akpan Etim Uyimeh", code: "#P001" },
  { id: "6", name: "Akpan Etim Uyimeh", code: "#P001" },
  { id: "7", name: "Akpan Etim Uyimeh", code: "#P001" },
  { id: "8", name: "Akpan Etim Uyimeh", code: "#P001" },
]

const mockReports = [
  { id: "9", name: "Akpan Etim Uyimeh", code: "#P001" },
  { id: "10", name: "Akpan Etim Uyimeh", code: "#P001" },
  { id: "11", name: "Akpan Etim Uyimeh", code: "#P001" },
  { id: "12", name: "Akpan Etim Uyimeh", code: "#P001" },
]

export default function Tasks() {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#FFFFFF] -mx-5 -mt-10 px-5 pt-10 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8">
      <PendingTasksPage
        patientsWaiting={mockPatientsWaiting}
        cancelledRefunds={mockCancelledRefunds}
        reports={mockReports}
      />
      </div>
    </AdminLayout>
  )
}

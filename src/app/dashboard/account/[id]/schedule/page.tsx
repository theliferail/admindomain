"use client"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import Schedule from "@modules/dashboard/components/pages/Account/Schedule"

const MOCK_SCHEDULE = [
  { day: "Monday", hours: "8:00 AM - 4:00 PM" },
  { day: "Tuesday", hours: "8:00 AM - 4:00 PM" },
  { day: "Wednesday", hours: "8:00 AM - 4:00 PM" },
  { day: "Thursday", hours: "8:00 AM - 4:00 PM" },
  { day: "Friday", hours: "8:00 AM - 4:00 PM" },
  { day: "Saturday", hours: "8:00 AM - 5:00 PM" },
  { day: "Sunday", hours: "8:00 AM - 2:00 PM" },
]

export default function SchedulePage() {
  return (
    <AdminLayout>
      <Schedule
        name="Doctor Ahmed Oluwatobi"
        schedule={MOCK_SCHEDULE}
      />
    </AdminLayout>
  )
}

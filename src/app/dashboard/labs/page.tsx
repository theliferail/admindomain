"use client"

import { useEffect, useState } from "react"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import LabPage from "@/src/modules/dashboard/components/pages/Home/Lab"
import type { Lab as LabData } from "@/actions/labs/getlabsbyid"
import { fetchLabs } from "@/actions/labs/getlabs"

export default function Lab() {
  const [labs, setLabs] = useState<LabData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadLabs() {
      try {
        const response = await fetchLabs()
        setLabs(response.data)
      } catch {
        setLabs([])
      } finally {
        setLoading(false)
      }
    }

    loadLabs()
  }, [])

  return (
    <AdminLayout>
      {loading ? (
        <div className="flex items-center justify-center py-12 text-sm text-[#7A819F]">
          Loading labs...
        </div>
      ) : (
        <LabPage
          labs={labs.map((lab) => ({
            id: lab.id,
            code: lab.labLicenseNumber,
            name: lab.labName,
            location: `${lab.address}, ${lab.lga}, ${lab.state}`,
            operatingHours: lab.businessOperationalHours,
          }))}
        />
      )}
    </AdminLayout>
  )
}
"use client"

import { useEffect, useState } from "react"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import HospitalPage from "@/src/modules/dashboard/components/pages/Home/Hospital"
import type { Hospital as HospitalData } from "@/actions/hospitals/gethospitals"
import { fetchHospitals } from "@/actions/hospitals/gethospitals"

export default function Hospital() {
  const [hospitals, setHospitals] = useState<HospitalData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHospitals() {
      try {
        const response = await fetchHospitals()
        setHospitals(response.data)
      } catch {
        setHospitals([])
      } finally {
        setLoading(false)
      }
    }

    loadHospitals()
  }, [])

  return (
    <AdminLayout>
      {loading ? (
        <div className="flex items-center justify-center py-12 text-sm text-[#7A819F]">
          Loading hospitals...
        </div>
      ) : (
        <HospitalPage
          hospitals={hospitals.map((h) => ({
            id: h.id,
            code: h.licenseNumber,
            name: h.hospitalName,
            location: `${h.address}, ${h.lga}, ${h.state}`,
            operatingHours: h.businessOperationalHours,
          }))}
        />
      )}
    </AdminLayout>
  )
}
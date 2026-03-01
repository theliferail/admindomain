"use client"

import { useEffect, useState } from "react"

import AdminLayout from "@/src/modules/dashboard/layout/AdminLayout"
import PharmacyPage from "@/src/modules/dashboard/components/pages/Home/Pharmacy"
import type { Pharmacy as PharmacyData } from "@/actions/pharmacies/getpharmacybyid"
import { fetchPharmacies } from "@/actions/pharmacies/getpharmacies"

export default function Pharmacy() {
  const [pharmacies, setPharmacies] = useState<PharmacyData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPharmacies() {
      try {
        const response = await fetchPharmacies()
        setPharmacies(response.data)
      } catch {
        setPharmacies([])
      } finally {
        setLoading(false)
      }
    }

    loadPharmacies()
  }, [])

  return (
    <AdminLayout>
      {loading ? (
        <div className="flex items-center justify-center py-12 text-sm text-[#7A819F]">
          Loading pharmacies...
        </div>
      ) : (
        <PharmacyPage
          pharmacies={pharmacies.map((p) => ({
            id: p.id,
            code: p.pharmacyLicenseNumber,
            name: p.pharmacyName,
            location: `${p.address}, ${p.lga}, ${p.state}`,
            operatingHours: p.businessOperationalHours,
          }))}
        />
      )}
    </AdminLayout>
  )
}
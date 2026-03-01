"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@shared/components/ui/button"
import { getLabById, type Lab } from "@/actions/labs/getlabsbyid"

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="shrink-0 text-xs text-[#7A819F]">{label}</span>
      <span className="text-sm font-medium text-[#1E1E1E]">{value}</span>
    </div>
  )
}

export default function LabDetail({ id }: { id: string }) {
  const router = useRouter()
  const [lab, setLab] = useState<Lab | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLab() {
      try {
        setLoading(true)
        const response = await getLabById(id)
        setLab(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch lab details.")
      } finally {
        setLoading(false)
      }
    }

    fetchLab()
  }, [id])

  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            aria-label="Go back"
            className="h-10 w-10 rounded-lg border-[#DADBF7] text-[#29196E] shadow-[0_10px_30px_-24px_rgba(9,84,235,0.5)] hover:bg-[#EEF2FF]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-[#042362]">Lab Details</h1>
        </div>
        <div className="flex items-center justify-center py-12 text-sm text-[#7A819F]">
          Loading lab details...
        </div>
      </section>
    )
  }

  if (error || !lab) {
    return (
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            aria-label="Go back"
            className="h-10 w-10 rounded-lg border-[#DADBF7] text-[#29196E] shadow-[0_10px_30px_-24px_rgba(9,84,235,0.5)] hover:bg-[#EEF2FF]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-[#042362]">Lab Details</h1>
        </div>
        <div className="rounded-xl border border-dashed border-[#DADBF7] bg-white py-12 text-center text-sm text-red-500">
          {error ?? "Lab not found."}
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          aria-label="Go back"
          className="h-10 w-10 rounded-lg border-[#DADBF7] text-[#29196E] shadow-[0_10px_30px_-24px_rgba(9,84,235,0.5)] hover:bg-[#EEF2FF]"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-[#042362]">Lab Details</h1>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#042362]">{lab.labName}</h2>
        <span className="text-xs text-[#7A819F]">Status: <span className="font-semibold text-[#1E1E1E]">{lab.status}</span></span>
      </div>

      <div>
        <h3 className="mb-4 text-base font-semibold text-[#042362]">Lab Information</h3>
        <div className="grid grid-cols-1 gap-x-16 gap-y-4 sm:grid-cols-2">
          <InfoField label="Lab Name:" value={lab.labName} />
          <InfoField label="Email:" value={lab.emailAddress} />
          <InfoField label="Phone:" value={lab.phoneNumber} />
          <InfoField label="License Number:" value={lab.labLicenseNumber} />
          <InfoField label="Business Reg. No:" value={lab.businessRegistrationNumber} />
          <InfoField label="Operating Hours:" value={lab.businessOperationalHours} />
          <InfoField label="State:" value={lab.state} />
          <InfoField label="LGA:" value={lab.lga} />
          <InfoField label="Address:" value={lab.address} />
          <InfoField label="Popular Landmark:" value={lab.popularLandmark} />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-base font-semibold text-[#042362]">Person in Charge</h3>
        <div className="grid grid-cols-1 gap-x-16 gap-y-4 sm:grid-cols-2">
          <InfoField label="Name:" value={lab.personInChargeName} />
          <InfoField label="Phone:" value={lab.personInChargeNumber} />
          <InfoField label="Years of Practice:" value={String(lab.personInChargeYearsOfPractice)} />
          <InfoField label="License Number:" value={lab.personInChargeLicenseNumber} />
          <InfoField label="Licensing Body:" value={lab.personInChargeLicensingBody} />
          <InfoField label="Degree:" value={lab.personInChargeDegree} />
          <InfoField label="University:" value={lab.personInChargeUniversity} />
        </div>
      </div>
    </section>
  )
}

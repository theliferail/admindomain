"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Mail, Phone, Clock, MapPin, Building2, ExternalLink } from "lucide-react"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import { Button } from "@shared/components/ui/button"
import { getPharmacyById } from "@/actions/pharmacies/getpharmacybyid"
import type { Pharmacy } from "@/actions/pharmacies/getpharmacybyid"

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  APPROVED: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  PENDING_ONBOARDING: "bg-amber-100 text-amber-700",
  REJECTED: "bg-red-100 text-red-700",
}

function DocumentLink({ label, src }: { label: string; src: string }) {
  if (!src) return null
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:border-[#1D4ED8] hover:text-[#1D4ED8]"
    >
      <ExternalLink className="h-4 w-4" />
      {label}
    </a>
  )
}

export default function PharmacyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    getPharmacyById(id)
      .then((response) => setPharmacy(response.data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load pharmacy.")
      )
      .finally(() => setIsLoading(false))
  }, [id])

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 text-base font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </Button>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-sm font-medium text-slate-500">Loading pharmacy details…</span>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : pharmacy ? (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.65)]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold text-[#042362]">
                      {pharmacy.pharmacyName}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">Pharmacy</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[pharmacy.status] ?? "bg-slate-100 text-slate-600"}`}
                  >
                    {pharmacy.status}
                  </span>
                </div>

                <hr className="border-slate-100" />

                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1D4ED8]">Business Information</h3>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-medium text-slate-400">License Number</dt>
                      <dd className="text-sm text-[#1A1A1A]">{pharmacy.pharmacyLicenseNumber || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-slate-400">Registration Number</dt>
                      <dd className="text-sm text-[#1A1A1A]">{pharmacy.businessRegistrationNumber || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-slate-400">Operational Hours</dt>
                      <dd className="text-sm text-[#1A1A1A]">{pharmacy.businessOperationalHours || "—"}</dd>
                    </div>
                  </dl>
                </div>

                <hr className="border-slate-100" />

                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1D4ED8]">Contact & Location</h3>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <Mail className="mt-0.5 h-4 w-4 text-slate-400" />
                      <div>
                        <dt className="text-xs font-medium text-slate-400">Email</dt>
                        <dd className="text-sm text-[#1A1A1A]">{pharmacy.emailAddress}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4 text-slate-400" />
                      <div>
                        <dt className="text-xs font-medium text-slate-400">Phone</dt>
                        <dd className="text-sm text-[#1A1A1A]">{pharmacy.phoneNumber}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
                      <div>
                        <dt className="text-xs font-medium text-slate-400">Address</dt>
                        <dd className="text-sm text-[#1A1A1A]">{pharmacy.address}, {pharmacy.lga}, {pharmacy.state}</dd>
                      </div>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-slate-400">Landmark</dt>
                      <dd className="text-sm text-[#1A1A1A]">{pharmacy.popularLandmark || "—"}</dd>
                    </div>
                  </dl>
                </div>

                <hr className="border-slate-100" />

                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1D4ED8]">Pharmacist in Charge</h3>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-medium text-slate-400">Name</dt>
                      <dd className="text-sm text-[#1A1A1A]">{pharmacy.pharmacistInChargeName}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-slate-400">Phone</dt>
                      <dd className="text-sm text-[#1A1A1A]">{pharmacy.pharmacistInChargeNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-slate-400">Years of Practice</dt>
                      <dd className="text-sm text-[#1A1A1A]">{pharmacy.pharmacistInChargeYearsOfPractice}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-slate-400">License Number</dt>
                      <dd className="text-sm text-[#1A1A1A]">{pharmacy.pharmacistInChargeLicenseNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-slate-400">Licensing Body</dt>
                      <dd className="text-sm text-[#1A1A1A]">{pharmacy.pharmacistInChargeLicensingBody}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-slate-400">Degree</dt>
                      <dd className="text-sm text-[#1A1A1A]">{pharmacy.pharmacistInChargeDegree}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-slate-400">University</dt>
                      <dd className="text-sm text-[#1A1A1A]">{pharmacy.pharmacistInChargeUniversity}</dd>
                    </div>
                  </dl>
                </div>

                <hr className="border-slate-100" />

                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1D4ED8]">Documents</h3>
                  <div className="flex flex-wrap gap-3">
                    <DocumentLink label="Pharmacy License" src={pharmacy.pharmacyLicenseImage} />
                    <DocumentLink label="Proof of Qualification" src={pharmacy.proofOfQualificationImage} />
                    <DocumentLink label="Business Permit" src={pharmacy.businessPermitImage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </AdminLayout>
  )
}

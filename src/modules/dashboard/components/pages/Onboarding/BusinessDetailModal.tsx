"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { X, CheckCircle, XCircle, ExternalLink } from "lucide-react"
import { createPortal } from "react-dom"

import { getHospitalById } from "@/actions/hospitals/gethospitalbyid"
import { getPharmacyById } from "@/actions/pharmacies/getpharmacybyid"
import { getLabById } from "@/actions/labs/getlabsbyid"
import type { Hospital } from "@/actions/hospitals/gethospitals"
import type { Pharmacy } from "@/actions/pharmacies/getpharmacybyid"
import type { Lab } from "@/actions/labs/getlabsbyid"
import { Badge } from "@shared/components/ui/badge"
import { Button } from "@shared/components/ui/button"
import { cn } from "@shared/lib/utils"

type BusinessType = "HOSPITAL" | "PHARMACY" | "LAB"

type BusinessDetail = Hospital | Pharmacy | Lab

type Props = {
  open: boolean
  onClose: () => void
  businessId: string
  businessType: BusinessType
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

type FieldRow = { label: string; value: string | number | boolean | undefined }

function DetailField({ label, value }: FieldRow) {
  if (value === undefined || value === null || value === "") return null

  if (typeof value === "boolean") {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-slate-500">{label}</span>
        <Badge
          variant="outline"
          className={cn(
            "text-xs",
            value
              ? "border-emerald-200 bg-emerald-100 text-emerald-700"
              : "border-red-200 bg-red-100 text-red-700"
          )}
        >
          {value ? "Yes" : "No"}
        </Badge>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-start sm:justify-between">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="text-sm text-slate-800 sm:text-right sm:max-w-[60%]">
        {String(value)}
      </span>
    </div>
  )
}

function DocumentPreview({ label, src }: { label: string; src: string }) {
  if (!src) return null

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block h-36 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
      >
        <Image
          src={src}
          alt={label}
          fill
          className="object-contain transition-transform group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
          <ExternalLink className="h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </a>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1D4ED8]">
        {title}
      </h3>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  )
}

function getBusinessFields(type: BusinessType, data: BusinessDetail) {
  if (type === "HOSPITAL") {
    const d = data as Hospital
    return {
      business: [
        { label: "Hospital Name", value: d.hospitalName },
        { label: "License Number", value: d.licenseNumber },
        { label: "Registration Number", value: d.businessRegistrationNumber },
        { label: "Facility Type", value: d.facilityType },
        { label: "Accreditation Body", value: d.accreditationBody },
        { label: "Operational Hours", value: d.businessOperationalHours },
        { label: "Status", value: d.status },
      ],
      contact: [
        { label: "Email", value: d.emailAddress },
        { label: "Phone", value: d.phoneNumber },
        { label: "Emergency Contact", value: d.emergencyContact },
        { label: "State", value: d.state },
        { label: "LGA", value: d.lga },
        { label: "Address", value: d.address },
        { label: "Landmark", value: d.popularLandmark },
      ],
      person: [
        { label: "Name", value: d.pharmacistInChargeName },
        { label: "Phone", value: d.pharmacistInChargeNumber },
        { label: "Years of Practice", value: d.pharmacistInChargeYearsOfPractice },
        { label: "License Number", value: d.pharmacistInChargeLicenseNumber },
        { label: "Licensing Body", value: d.pharmacistInChargeLicensingBody },
        { label: "Degree", value: d.pharmacistInChargeDegree },
        { label: "University", value: d.pharmacistInChargeUniversity },
      ],
      documents: {
        license: d.pharmacyLicenseImage,
        qualification: d.proofOfQualificationImage,
        permit: d.businessPermitImage,
      },
      compliance: [
        { label: "Agreed to Terms", value: d.agreeToTerms },
        { label: "Consent to Liferail", value: d.consentToLiferail },
      ],
    }
  }

  if (type === "PHARMACY") {
    const d = data as Pharmacy
    return {
      business: [
        { label: "Pharmacy Name", value: d.pharmacyName },
        { label: "License Number", value: d.pharmacyLicenseNumber },
        { label: "Registration Number", value: d.businessRegistrationNumber },
        { label: "Operational Hours", value: d.businessOperationalHours },
        { label: "Status", value: d.status },
      ],
      contact: [
        { label: "Email", value: d.emailAddress },
        { label: "Phone", value: d.phoneNumber },
        { label: "State", value: d.state },
        { label: "LGA", value: d.lga },
        { label: "Address", value: d.address },
        { label: "Landmark", value: d.popularLandmark },
      ],
      person: [
        { label: "Name", value: d.pharmacistInChargeName },
        { label: "Phone", value: d.pharmacistInChargeNumber },
        { label: "Years of Practice", value: d.pharmacistInChargeYearsOfPractice },
        { label: "License Number", value: d.pharmacistInChargeLicenseNumber },
        { label: "Licensing Body", value: d.pharmacistInChargeLicensingBody },
        { label: "Degree", value: d.pharmacistInChargeDegree },
        { label: "University", value: d.pharmacistInChargeUniversity },
      ],
      documents: {
        license: d.pharmacyLicenseImage,
        qualification: d.proofOfQualificationImage,
        permit: d.businessPermitImage,
      },
      compliance: [
        { label: "Agreed to Terms", value: d.agreeToTerms },
        { label: "Consent to Liferail", value: d.consentToLiferail },
      ],
    }
  }

  const d = data as Lab
  return {
    business: [
      { label: "Lab Name", value: d.labName },
      { label: "License Number", value: d.labLicenseNumber },
      { label: "Registration Number", value: d.businessRegistrationNumber },
      { label: "Operational Hours", value: d.businessOperationalHours },
      { label: "Status", value: d.status },
    ],
    contact: [
      { label: "Email", value: d.emailAddress },
      { label: "Phone", value: d.phoneNumber },
      { label: "State", value: d.state },
      { label: "LGA", value: d.lga },
      { label: "Address", value: d.address },
      { label: "Landmark", value: d.popularLandmark },
    ],
    person: [
      { label: "Name", value: d.personInChargeName },
      { label: "Phone", value: d.personInChargeNumber },
      { label: "Years of Practice", value: d.personInChargeYearsOfPractice },
      { label: "License Number", value: d.personInChargeLicenseNumber },
      { label: "Licensing Body", value: d.personInChargeLicensingBody },
      { label: "Degree", value: d.personInChargeDegree },
      { label: "University", value: d.personInChargeUniversity },
    ],
    documents: {
      license: d.labLicenseImage,
      qualification: d.proofOfQualificationImage,
      permit: d.businessPermitImage,
    },
    compliance: [
      { label: "Agreed to Terms", value: d.agreeToTerms },
      { label: "Consent to Liferail", value: d.consentToLiferail },
    ],
  }
}

const typeLabel: Record<BusinessType, string> = {
  HOSPITAL: "Hospital",
  PHARMACY: "Pharmacy",
  LAB: "Lab",
}

export default function BusinessDetailModal({
  open,
  onClose,
  businessId,
  businessType,
  onApprove,
  onReject,
}: Props) {
  const [detail, setDetail] = useState<BusinessDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDetail = useCallback(async () => {
    setLoading(true)
    setError(null)
    setDetail(null)

    try {
      let result: BusinessDetail

      if (businessType === "HOSPITAL") {
        const res = await getHospitalById(businessId)
        result = res.data
      } else if (businessType === "PHARMACY") {
        const res = await getPharmacyById(businessId)
        result = res.data
      } else {
        const res = await getLabById(businessId)
        result = res.data
      }

      setDetail(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load details.")
    } finally {
      setLoading(false)
    }
  }, [businessId, businessType])

  useEffect(() => {
    if (open && businessId) {
      fetchDetail()
    }
  }, [open, businessId, fetchDetail])

  useEffect(() => {
    if (!open) return

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  const fields = detail ? getBusinessFields(businessType, detail) : null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex justify-end"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" />

      <div
        className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-[#042362]">
            {typeLabel[businessType]} Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <span className="text-sm font-medium text-slate-500">
                Loading details…
              </span>
            </div>
          ) : error ? (
            <div className="flex h-48 flex-col items-center justify-center gap-3">
              <span className="text-sm text-red-500">{error}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchDetail}
              >
                Retry
              </Button>
            </div>
          ) : fields ? (
            <div className="space-y-6">
              <Section title="Business Information">
                {fields.business.map((f) => (
                  <DetailField key={f.label} {...f} />
                ))}
              </Section>

              <Section title="Contact & Location">
                {fields.contact.map((f) => (
                  <DetailField key={f.label} {...f} />
                ))}
              </Section>

              <Section title="Person in Charge">
                {fields.person.map((f) => (
                  <DetailField key={f.label} {...f} />
                ))}
              </Section>

              <Section title="Documents">
                <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                  <DocumentPreview
                    label="License"
                    src={fields.documents.license}
                  />
                  <DocumentPreview
                    label="Proof of Qualification"
                    src={fields.documents.qualification}
                  />
                  <DocumentPreview
                    label="Business Permit"
                    src={fields.documents.permit}
                  />
                </div>
              </Section>

              <Section title="Compliance">
                {fields.compliance.map((f) => (
                  <DetailField key={f.label} {...f} />
                ))}
              </Section>
            </div>
          ) : null}
        </div>

        {detail && (
          <div className="flex items-center gap-3 border-t border-slate-200 px-6 py-4">
            <Button
              onClick={() => {
                onApprove(businessId)
                onClose()
              }}
              className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              onClick={() => {
                onReject(businessId)
                onClose()
              }}
              variant="outline"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

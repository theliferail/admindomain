"use client"

import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@shared/components/ui/button"

export interface ProfessionalInformationProps {
  name: string
  specialty: string
  doctorId: string
  avatarUrl?: string
  medicalSpecialty: string
  degreeQualification: string
  yearsOfPractice: string
  university: string
  medicalLicenseNumber: string
  affiliateHospital: string
  licensingBody: string
  biography: string
  medicalLicenseImageUrl?: string
  proofOfIdImageUrl?: string
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
      <span className="shrink-0 text-xs text-[#7A819F]">{label}</span>
      <span className="text-sm font-medium text-[#1E1E1E]">{value}</span>
    </div>
  )
}

export default function ProfessionalInformation({
  name,
  specialty,
  doctorId,
  avatarUrl,
  medicalSpecialty,
  degreeQualification,
  yearsOfPractice,
  university,
  medicalLicenseNumber,
  affiliateHospital,
  licensingBody,
  biography,
  medicalLicenseImageUrl,
  proofOfIdImageUrl,
}: ProfessionalInformationProps) {
  const router = useRouter()

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
        <h1 className="text-2xl font-semibold text-[#042362]">
          Professional Information
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#E5E7F5]">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-[#7A819F]">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-[#042362]">{name}</span>
          <span className="text-xs text-[#7A819F]">{specialty}</span>
          <span className="text-xs font-semibold text-[#1D4ED8]">{doctorId}</span>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-1 gap-x-16 gap-y-5 sm:grid-cols-2">
          <InfoField label="Medical specialty:" value={medicalSpecialty} />
          <InfoField label="Degree/Qualification:" value={degreeQualification} />
          <InfoField label="Years of practice:" value={yearsOfPractice} />
          <InfoField label="University/Medical school attended:" value={university} />
          <InfoField label="Medical license number:" value={medicalLicenseNumber} />
          <InfoField label="Affiliate hospital/Medical centre:" value={affiliateHospital} />
          <InfoField label="Licensing body:" value={licensingBody} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#042362]">
          Biography/Professional summary
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5B5F79]">{biography}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-[#042362]">Medical license</h3>
          {medicalLicenseImageUrl ? (
            <div className="overflow-hidden rounded-lg border border-[#E5E7F5]">
              <Image
                src={medicalLicenseImageUrl}
                alt="Medical license"
                width={400}
                height={280}
                className="h-auto w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-[#DADBF7] bg-[#F9F9FF] text-sm text-[#7A819F]">
              No image provided
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-[#042362]">Proof of identification</h3>
          {proofOfIdImageUrl ? (
            <div className="overflow-hidden rounded-lg border border-[#E5E7F5]">
              <Image
                src={proofOfIdImageUrl}
                alt="Proof of identification"
                width={400}
                height={280}
                className="h-auto w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-[#DADBF7] bg-[#F9F9FF] text-sm text-[#7A819F]">
              No image provided
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

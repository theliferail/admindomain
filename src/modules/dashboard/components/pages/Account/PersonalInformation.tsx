"use client"

import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@shared/components/ui/button"

export interface PersonalInformationProps {
  name: string
  email: string
  dob: string
  address: string
  gender: string
  doctorId: string
  phoneNo: string
  nin: string
  avatarUrl?: string
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="shrink-0 text-xs text-[#7A819F]">{label}</span>
      <span className="text-sm font-medium text-[#1E1E1E]">{value}</span>
    </div>
  )
}

export default function PersonalInformation({
  name,
  email,
  dob,
  address,
  gender,
  doctorId,
  phoneNo,
  nin,
  avatarUrl,
}: PersonalInformationProps) {
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
          Personal Information
        </h1>
      </div>

      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#E5E7F5]">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-[#7A819F]">
            {name.charAt(0)}
          </div>
        )}
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-1 gap-x-16 gap-y-5 sm:grid-cols-2">
          <InfoField label="Name:" value={name} />
          <InfoField label="Email:" value={email} />
          <InfoField label="DOB:" value={dob} />
          <InfoField label="Address:" value={address} />
          <InfoField label="Gender:" value={gender} />
          <InfoField label="Doctor ID:" value={doctorId} />
          <InfoField label="Phone no:" value={phoneNo} />
          <InfoField label="NIN:" value={nin} />
        </div>
      </div>
    </section>
  )
}

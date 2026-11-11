"use client"

import { useState } from "react"
import { ArrowLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { approveDoctor } from "@/actions/doctors/approveDoctor"
import { rejectDoctor } from "@/actions/doctors/rejectDoctor"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@shared/components/ui/alert-dialog"
import { Button } from "@shared/components/ui/button"

export interface DoctorApplicationProps {
  name: string
  code: string
  doctorId: string
  status?: string
  avatarUrl?: string
  profileError?: string | null
}

type Decision = "approved" | "rejected"

const formatStatus = (status: string) =>
  status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

const INFO_SECTIONS = [
  { label: "Personal Information", slug: "personal-information" },
  { label: "Professional Information", slug: "professional-information" },
  { label: "Schedule", slug: "schedule" },
]

export default function DoctorApplication({
  name,
  code,
  doctorId,
  status = "Unverified",
  avatarUrl,
  profileError,
}: DoctorApplicationProps) {
  const router = useRouter()
  const [approving, setApproving] = useState(false)
  const [rejecting, setRejecting] = useState(false)
  const [decision, setDecision] = useState<Decision | null>(null)
  const [reviewedStatus, setReviewedStatus] = useState<string | null>(null)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [reason, setReason] = useState("")

  const busy = approving || rejecting
  const actionsDisabled = busy || decision !== null || !doctorId
  const displayStatus = formatStatus(reviewedStatus ?? status)

  const handleApprove = async () => {
    setApproving(true)
    try {
      const res = await approveDoctor(doctorId)
      setReviewedStatus(res.data.status)
      setDecision("approved")
      toast.success(res.message || `${name} approved successfully.`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to approve doctor.")
    } finally {
      setApproving(false)
    }
  }

  const handleReject = async () => {
    if (!reason.trim()) {
      toast.error("Please enter a reason for rejecting this application.")
      return
    }

    setRejecting(true)
    try {
      const res = await rejectDoctor(doctorId, { reason })
      setReviewedStatus(res.data.status)
      setDecision("rejected")
      setRejectOpen(false)
      setReason("")
      toast.success(res.message || `${name}'s application was rejected.`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to reject doctor.")
    } finally {
      setRejecting(false)
    }
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex items-center gap-2 px-4 py-2 text-base font-medium rounded-lg border-[#DADBF7] text-[#29196E] shadow-[0_10px_30px_-24px_rgba(9,84,235,0.5)] hover:bg-[#EEF2FF]"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </Button>
        <h1 className="text-2xl font-semibold text-[#042362]">
          Doctor Application
        </h1>
      </div>

      <div className="flex items-center gap-5">
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
        <div className="flex flex-col">
          <span className="text-sm text-[#7A819F]">
            Status: <span className="font-semibold text-[#1E1E1E]">{displayStatus}</span>
          </span>
          {profileError && (
            <span className="mt-1 text-sm text-red-500">{profileError}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex flex-1 flex-col gap-0">
          {INFO_SECTIONS.map((section) => (
            <button
              key={section.label}
              type="button"
              onClick={() =>
                router.push(`/dashboard/account/${code}/${section.slug}`)
              }
              className="flex w-full items-center justify-between border-b border-[#E5E7F5] px-4 py-4 text-sm font-medium text-[#1E1E1E] transition hover:bg-[#F9F9FF]"
            >
              <span>{section.label}</span>
              <ChevronRight className="h-4 w-4 text-[#7A819F]" />
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 lg:w-[240px]">
          <Button
            type="button"
            onClick={handleApprove}
            disabled={actionsDisabled}
            className="h-11 w-full rounded-lg bg-[#5117EA] text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(81,23,234,0.65)] transition hover:bg-[#3A0FC5]"
          >
            {approving
              ? "Approving…"
              : decision === "approved"
                ? "Application approved"
                : "Approve application"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-lg border-[#5117EA] text-sm font-semibold text-[#5117EA] transition hover:bg-[#F3EDFF]"
          >
            Request more information
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setRejectOpen(true)}
            disabled={actionsDisabled}
            className="h-11 w-full rounded-lg border-red-400 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            {decision === "rejected" ? "Application rejected" : "Reject application"}
          </Button>
        </div>
      </div>

      <AlertDialog
        open={rejectOpen}
        onOpenChange={(open) => {
          if (rejecting) return
          setRejectOpen(open)
          if (!open) setReason("")
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject application</AlertDialogTitle>
            <AlertDialogDescription>
              Tell <span className="font-semibold">{name}</span> why their
              application is being rejected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Medical license image is unreadable"
            rows={4}
            disabled={rejecting}
            aria-label="Reason for rejection"
            className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-[#1E1E1E] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 disabled:opacity-60"
          />
          <AlertDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setRejectOpen(false)
                setReason("")
              }}
              disabled={rejecting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleReject}
              disabled={rejecting || !reason.trim()}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {rejecting ? "Rejecting…" : "Reject"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}

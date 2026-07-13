"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import { Button } from "@shared/components/ui/button"

export default function SettingsPage() {
  const router = useRouter()

  return (
    <AdminLayout>
      <section className="mx-auto w-full max-w-3xl space-y-6">
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
          <h1 className="text-2xl font-semibold text-[#29196E]">Settings</h1>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.65)]">
          <p className="text-sm text-slate-500">Settings page - to be implemented</p>
        </div>
      </section>
    </AdminLayout>
  )
}

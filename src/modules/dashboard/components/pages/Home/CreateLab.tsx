"use client"

import { useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { cn } from "@shared/lib/utils"
import { createLab } from "@/actions/labs/createlab"

interface CreateLabFormProps {
  className?: string
}

const inputClass =
  "h-11 rounded-lg border-[#DADBF7] px-4 text-sm text-[#2B2F4A] placeholder:text-[#A1A5C5]"

const labelClass = "text-sm font-medium text-[#29196E]"

const sectionTitleClass = "text-lg font-semibold text-[#29196E] sm:col-span-2"

const checkboxLabelClass =
  "flex items-center gap-2.5 text-sm text-[#2B2F4A] cursor-pointer"

export default function CreateLabForm({ className }: CreateLabFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    hospitalId: "",
    labName: "",
    labLicenseNumber: "",
    businessRegistrationNumber: "",
    emailAddress: "",
    phoneNumber: "",
    businessOperationalHours: "",
    state: "",
    lga: "",
    address: "",
    popularLandmark: "",
    personInChargeName: "",
    personInChargeNumber: "",
    personInChargeYearsOfPractice: "",
    personInChargeLicenseNumber: "",
    personInChargeLicensingBody: "",
    personInChargeDegree: "",
    personInChargeUniversity: "",
    labLicenseImage: "",
    proofOfQualificationImage: "",
    businessPermitImage: "",
    agreeToTerms: false,
    consentToLiferail: false,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await createLab({
        ...form,
        personInChargeYearsOfPractice: Number(
          form.personInChargeYearsOfPractice
        ),
      })
      router.push("/dashboard/labs")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create lab.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={cn("flex flex-col gap-6", className)}>
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
        <h1 className="text-2xl font-semibold text-[#29196E]">Create Lab</h1>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 rounded-xl border border-[#DADBF7] bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        {/* ── Lab Details ── */}
        <h2 className={sectionTitleClass}>Lab Details</h2>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="hospitalId" className={labelClass}>
            Hospital ID
          </label>
          <Input
            id="hospitalId"
            name="hospitalId"
            value={form.hospitalId}
            onChange={handleChange}
            placeholder="Enter hospital ID"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="labName" className={labelClass}>
            Lab Name
          </label>
          <Input
            id="labName"
            name="labName"
            value={form.labName}
            onChange={handleChange}
            placeholder="Enter lab name"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="labLicenseNumber" className={labelClass}>
            Lab License Number
          </label>
          <Input
            id="labLicenseNumber"
            name="labLicenseNumber"
            value={form.labLicenseNumber}
            onChange={handleChange}
            placeholder="Enter license number"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="businessRegistrationNumber" className={labelClass}>
            Business Registration Number
          </label>
          <Input
            id="businessRegistrationNumber"
            name="businessRegistrationNumber"
            value={form.businessRegistrationNumber}
            onChange={handleChange}
            placeholder="Enter registration number"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="emailAddress" className={labelClass}>
            Email Address
          </label>
          <Input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={form.emailAddress}
            onChange={handleChange}
            placeholder="Enter email address"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phoneNumber" className={labelClass}>
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="businessOperationalHours" className={labelClass}>
            Operating Hours
          </label>
          <Input
            id="businessOperationalHours"
            name="businessOperationalHours"
            value={form.businessOperationalHours}
            onChange={handleChange}
            placeholder="e.g. 8:00 AM - 10:00 PM"
            required
            className={inputClass}
          />
        </div>

        {/* ── Location ── */}
        <h2 className={cn(sectionTitleClass, "mt-2")}>Location</h2>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="state" className={labelClass}>
            State
          </label>
          <Input
            id="state"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="Enter state"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="lga" className={labelClass}>
            LGA
          </label>
          <Input
            id="lga"
            name="lga"
            value={form.lga}
            onChange={handleChange}
            placeholder="Enter LGA"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="address" className={labelClass}>
            Address
          </label>
          <Input
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="popularLandmark" className={labelClass}>
            Popular Landmark
          </label>
          <Input
            id="popularLandmark"
            name="popularLandmark"
            value={form.popularLandmark}
            onChange={handleChange}
            placeholder="Enter nearby landmark"
            className={inputClass}
          />
        </div>

        {/* ── Person In Charge ── */}
        <h2 className={cn(sectionTitleClass, "mt-2")}>Person In Charge</h2>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="personInChargeName" className={labelClass}>
            Full Name
          </label>
          <Input
            id="personInChargeName"
            name="personInChargeName"
            value={form.personInChargeName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="personInChargeNumber" className={labelClass}>
            Phone Number
          </label>
          <Input
            id="personInChargeNumber"
            name="personInChargeNumber"
            type="tel"
            value={form.personInChargeNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="personInChargeYearsOfPractice"
            className={labelClass}
          >
            Years of Practice
          </label>
          <Input
            id="personInChargeYearsOfPractice"
            name="personInChargeYearsOfPractice"
            type="number"
            min="0"
            value={form.personInChargeYearsOfPractice}
            onChange={handleChange}
            placeholder="e.g. 5"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="personInChargeLicenseNumber" className={labelClass}>
            License Number
          </label>
          <Input
            id="personInChargeLicenseNumber"
            name="personInChargeLicenseNumber"
            value={form.personInChargeLicenseNumber}
            onChange={handleChange}
            placeholder="Enter license number"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="personInChargeLicensingBody" className={labelClass}>
            Licensing Body
          </label>
          <Input
            id="personInChargeLicensingBody"
            name="personInChargeLicensingBody"
            value={form.personInChargeLicensingBody}
            onChange={handleChange}
            placeholder="Enter licensing body"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="personInChargeDegree" className={labelClass}>
            Degree
          </label>
          <Input
            id="personInChargeDegree"
            name="personInChargeDegree"
            value={form.personInChargeDegree}
            onChange={handleChange}
            placeholder="e.g. B.Sc Medical Lab Science"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="personInChargeUniversity" className={labelClass}>
            University
          </label>
          <Input
            id="personInChargeUniversity"
            name="personInChargeUniversity"
            value={form.personInChargeUniversity}
            onChange={handleChange}
            placeholder="Enter university name"
            required
            className={inputClass}
          />
        </div>

        {/* ── Documents ── */}
        <h2 className={cn(sectionTitleClass, "mt-2")}>Documents</h2>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="labLicenseImage" className={labelClass}>
            Lab License Image URL
          </label>
          <Input
            id="labLicenseImage"
            name="labLicenseImage"
            value={form.labLicenseImage}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="proofOfQualificationImage" className={labelClass}>
            Proof of Qualification Image URL
          </label>
          <Input
            id="proofOfQualificationImage"
            name="proofOfQualificationImage"
            value={form.proofOfQualificationImage}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="businessPermitImage" className={labelClass}>
            Business Permit Image URL
          </label>
          <Input
            id="businessPermitImage"
            name="businessPermitImage"
            value={form.businessPermitImage}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
            className={inputClass}
          />
        </div>

        {/* ── Consent ── */}
        <h2 className={cn(sectionTitleClass, "mt-2")}>Consent</h2>

        <div className="sm:col-span-2 flex flex-col gap-3">
          <label htmlFor="agreeToTerms" className={checkboxLabelClass}>
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={form.agreeToTerms}
              onChange={handleChange}
              required
              className="h-4 w-4 rounded border-[#DADBF7] text-[#0954EB] focus:ring-[#0954EB]"
            />
            I agree to the Terms and Conditions
          </label>

          <label htmlFor="consentToLiferail" className={checkboxLabelClass}>
            <input
              id="consentToLiferail"
              name="consentToLiferail"
              type="checkbox"
              checked={form.consentToLiferail}
              onChange={handleChange}
              required
              className="h-4 w-4 rounded border-[#DADBF7] text-[#0954EB] focus:ring-[#0954EB]"
            />
            I consent to Liferail data processing
          </label>
        </div>

        {/* ── Submit ── */}
        <div className="sm:col-span-2 mt-2">
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg bg-[#0954EB] text-sm font-medium text-white shadow-[0_18px_40px_-30px_rgba(89,23,234,0.9)] transition hover:bg-[#3A0FC5] sm:w-auto sm:px-8"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Creating..." : "Create Lab"}
          </Button>
        </div>
      </form>
    </section>
  )
}

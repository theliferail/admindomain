"use client"

import { useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import { cn } from "@shared/lib/utils"
import { createHospital } from "@/actions/hospitals/createhospital"

interface CreateHospitalFormProps {
  className?: string
}

const inputClass =
  "h-11 rounded-lg border-[#DADBF7] px-4 text-sm text-[#2B2F4A] placeholder:text-[#A1A5C5]"

const labelClass = "text-sm font-medium text-[#29196E]"

const sectionTitleClass = "text-lg font-semibold text-[#29196E] sm:col-span-2"

const checkboxLabelClass =
  "flex items-center gap-2.5 text-sm text-[#2B2F4A] cursor-pointer"

export default function CreateHospitalForm({
  className,
}: CreateHospitalFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    hospitalName: "",
    licenseNumber: "",
    businessRegistrationNumber: "",
    accreditationBody: "",
    facilityType: "",
    emailAddress: "",
    phoneNumber: "",
    emergencyContact: "",
    businessOperationalHours: "",
    state: "",
    lga: "",
    address: "",
    popularLandmark: "",
    pharmacistInChargeName: "",
    pharmacistInChargeNumber: "",
    pharmacistInChargeYearsOfPractice: "",
    pharmacistInChargeLicenseNumber: "",
    pharmacistInChargeLicensingBody: "",
    pharmacistInChargeDegree: "",
    pharmacistInChargeUniversity: "",
    pharmacyLicenseImage: "",
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
      await createHospital({
        ...form,
        pharmacistInChargeYearsOfPractice: Number(
          form.pharmacistInChargeYearsOfPractice
        ),
      })
      router.push("/dashboard/hospital")
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create hospital."
      )
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
        <h1 className="text-2xl font-semibold text-[#29196E]">
          Create Hospital
        </h1>
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
        {/* ── Hospital Details ── */}
        <h2 className={sectionTitleClass}>Hospital Details</h2>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="hospitalName" className={labelClass}>
            Hospital Name
          </label>
          <Input
            id="hospitalName"
            name="hospitalName"
            value={form.hospitalName}
            onChange={handleChange}
            placeholder="Enter hospital name"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="licenseNumber" className={labelClass}>
            License Number
          </label>
          <Input
            id="licenseNumber"
            name="licenseNumber"
            value={form.licenseNumber}
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
          <label htmlFor="accreditationBody" className={labelClass}>
            Accreditation Body
          </label>
          <Input
            id="accreditationBody"
            name="accreditationBody"
            value={form.accreditationBody}
            onChange={handleChange}
            placeholder="Enter accreditation body"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="facilityType" className={labelClass}>
            Facility Type
          </label>
          <Input
            id="facilityType"
            name="facilityType"
            value={form.facilityType}
            onChange={handleChange}
            placeholder="e.g. General Hospital, Clinic"
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
          <label htmlFor="emergencyContact" className={labelClass}>
            Emergency Contact
          </label>
          <Input
            id="emergencyContact"
            name="emergencyContact"
            type="tel"
            value={form.emergencyContact}
            onChange={handleChange}
            placeholder="Enter emergency contact"
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

        {/* ── Pharmacist In Charge ── */}
        <h2 className={cn(sectionTitleClass, "mt-2")}>
          Pharmacist In Charge
        </h2>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="pharmacistInChargeName" className={labelClass}>
            Full Name
          </label>
          <Input
            id="pharmacistInChargeName"
            name="pharmacistInChargeName"
            value={form.pharmacistInChargeName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="pharmacistInChargeNumber" className={labelClass}>
            Phone Number
          </label>
          <Input
            id="pharmacistInChargeNumber"
            name="pharmacistInChargeNumber"
            type="tel"
            value={form.pharmacistInChargeNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="pharmacistInChargeYearsOfPractice"
            className={labelClass}
          >
            Years of Practice
          </label>
          <Input
            id="pharmacistInChargeYearsOfPractice"
            name="pharmacistInChargeYearsOfPractice"
            type="number"
            min="0"
            value={form.pharmacistInChargeYearsOfPractice}
            onChange={handleChange}
            placeholder="e.g. 5"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="pharmacistInChargeLicenseNumber"
            className={labelClass}
          >
            License Number
          </label>
          <Input
            id="pharmacistInChargeLicenseNumber"
            name="pharmacistInChargeLicenseNumber"
            value={form.pharmacistInChargeLicenseNumber}
            onChange={handleChange}
            placeholder="Enter license number"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="pharmacistInChargeLicensingBody"
            className={labelClass}
          >
            Licensing Body
          </label>
          <Input
            id="pharmacistInChargeLicensingBody"
            name="pharmacistInChargeLicensingBody"
            value={form.pharmacistInChargeLicensingBody}
            onChange={handleChange}
            placeholder="Enter licensing body"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="pharmacistInChargeDegree" className={labelClass}>
            Degree
          </label>
          <Input
            id="pharmacistInChargeDegree"
            name="pharmacistInChargeDegree"
            value={form.pharmacistInChargeDegree}
            onChange={handleChange}
            placeholder="e.g. MBBS"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="pharmacistInChargeUniversity"
            className={labelClass}
          >
            University
          </label>
          <Input
            id="pharmacistInChargeUniversity"
            name="pharmacistInChargeUniversity"
            value={form.pharmacistInChargeUniversity}
            onChange={handleChange}
            placeholder="Enter university name"
            required
            className={inputClass}
          />
        </div>

        {/* ── Documents ── */}
        <h2 className={cn(sectionTitleClass, "mt-2")}>Documents</h2>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="pharmacyLicenseImage" className={labelClass}>
            License Image URL
          </label>
          <Input
            id="pharmacyLicenseImage"
            name="pharmacyLicenseImage"
            value={form.pharmacyLicenseImage}
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
            {loading ? "Creating..." : "Create Hospital"}
          </Button>
        </div>
      </form>
    </section>
  )
}

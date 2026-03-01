"use client"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import ProfessionalInformation from "@modules/dashboard/components/pages/Account/ProfessionalInformation"

export default function ProfessionalInformationPage() {
  return (
    <AdminLayout>
      <ProfessionalInformation
        name="Doctor Ahmed Oluwatobi"
        specialty="General medicine"
        doctorId="#D509"
        medicalSpecialty="General medicine"
        degreeQualification="PhD Surgery"
        yearsOfPractice="10"
        university="University of Lagos"
        medicalLicenseNumber="12345678"
        affiliateHospital="God's grace Hospital, Yaba, Lagos."
        licensingBody="Med and co"
        biography="Forem ipsum dolor sit amet, conctetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent perconubia nostra, per inceptos himenaeos."
      />
    </AdminLayout>
  )
}

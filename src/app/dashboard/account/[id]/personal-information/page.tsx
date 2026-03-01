"use client"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import PersonalInformation from "@modules/dashboard/components/pages/Account/PersonalInformation"

export default function PersonalInformationPage() {
  return (
    <AdminLayout>
      <PersonalInformation
        name="Doctor Ahmed Oluwatobi"
        email="ahmedtobi@gmail.com"
        dob="30/07/1989"
        address="4, Sanya close, Yaba, Lagos"
        gender="Male"
        doctorId="D509"
        phoneNo="08123456789"
        nin="9048473252728"
      />
    </AdminLayout>
  )
}

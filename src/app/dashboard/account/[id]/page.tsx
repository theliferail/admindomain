"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import DoctorApplication from "@modules/dashboard/components/pages/Account/DoctorApplication"
import { fetchDoctorByUserId } from "@/actions/doctors/getDoctors"
import type { Doctor } from "@/actions/doctors/approveDoctor"
import { fetchUserById } from "@/actions/users/usersbyid"
import type { User } from "@/actions/users/totalusers"

export default function DoctorDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params.id ?? ""
  const [user, setUser] = useState<User | null>(null)
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    fetchUserById(id)
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))

    fetchDoctorByUserId(id)
      .then((found) => {
        setDoctor(found)
        setProfileError(
          found ? null : "This user has no doctor profile yet, so it can't be approved or rejected.",
        )
      })
      .catch((err: Error) => setProfileError(err.message))
  }, [id])

  const person = doctor ?? user
  const name = person ? `${person.firstName} ${person.lastName}`.trim() : "Doctor"

  return (
    <AdminLayout>
      <DoctorApplication
        name={name}
        code={id}
        doctorId={doctor?.id ?? ""}
        status={doctor?.status ?? user?.status}
        profileError={profileError}
      />
    </AdminLayout>
  )
}

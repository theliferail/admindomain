"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Mail, Phone, Shield, Clock } from "lucide-react"

import AdminLayout from "@modules/dashboard/layout/AdminLayout"
import { Button } from "@shared/components/ui/button"
import { fetchUserById } from "@/actions/users/usersbyid"
import type { User } from "@/actions/users/totalusers"

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  SUSPENDED: "bg-amber-100 text-amber-700",
  BLOCKED: "bg-red-100 text-red-700",
  PENDING_VERIFICATION: "bg-blue-100 text-blue-700",
}

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    fetchUserById(id)
      .then((response) => setUser(response.data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load user.")
      )
      .finally(() => setIsLoading(false))
  }, [id])

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-sm font-medium text-slate-500">Loading user details…</span>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : user ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.65)]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-[#042362]">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">{user.userType}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[user.status] ?? "bg-slate-100 text-slate-600"}`}
                >
                  {user.status}
                </span>
              </div>

              <hr className="border-slate-100" />

              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-slate-400" />
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">Email</dt>
                    <dd className="text-sm text-[#1A1A1A]">{user.email}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-slate-400" />
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">Phone</dt>
                    <dd className="text-sm text-[#1A1A1A]">{user.phone || "—"}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-4 w-4 text-slate-400" />
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">Roles</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                        >
                          {role}
                        </span>
                      ))}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 text-slate-400" />
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">Created</dt>
                    <dd className="text-sm text-[#1A1A1A]">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        ) : null}
      </div>
    </AdminLayout>
  )
}

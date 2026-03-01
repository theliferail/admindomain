"use client"

import { useMemo, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, MoreVertical, Search, SlidersHorizontal, XCircle } from "lucide-react"

import { Button } from "@shared/components/ui/button"
import { Input } from "@shared/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@shared/components/ui/alert-dialog"

export interface TotalUser {
  id: string
  name: string
  status: "Active" | "Suspended" | "Blocked"
}

type FilterOption = "All" | TotalUser["status"]

const FILTER_OPTIONS = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Suspended", value: "Suspended" },
  { label: "Blocked", value: "Blocked" },
] satisfies { label: string; value: FilterOption }[]

type TotalUsersProps = {
  users: TotalUser[]
}

type ConfirmAction = {
  userId: string
  userName: string
  type: "approve" | "reject"
}

export default function Totalusers({ users }: TotalUsersProps) {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<FilterOption>("All")
  const [query, setQuery] = useState("")
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null)

  const handleRowClick = useCallback(
    (userId: string) => router.push(`/dashboard/totalusers/${userId}`),
    [router]
  )

  const handleConfirm = () => {
    if (!confirmAction) return
    // TODO: call approve/reject API here
    console.log(`[Totalusers] ${confirmAction.type} user ${confirmAction.userId}`)
    setConfirmAction(null)
  }

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return users.filter((user) => {
      const matchesStatus =
        statusFilter === "All" || user.status.toLowerCase() === statusFilter.toLowerCase()
      const matchesQuery =
        normalizedQuery.length === 0 || user.name.toLowerCase().includes(normalizedQuery)

      return matchesStatus && matchesQuery
    })
  }, [users, query, statusFilter])

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.65)]">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            aria-label="Go back"
            className="h-10 w-10 rounded-lg border-slate-200 text-[#042362] shadow-[0_10px_30px_-24px_rgba(9,84,235,0.5)] hover:bg-[#EEF2FF]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold text-[#042362]">Total Users</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for users by name"
              className="h-11 rounded-lg border-slate-200 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                aria-label="Filter by status"
                className="h-11 w-11  bg-[#0954EB] text-white shadow-[0_20px_45px_-30px_rgba(95,43,255,0.85)] transition hover:bg-[#300dbbd2]"
              >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={2.5} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-36 rounded-xl border-slate-200 p-2 shadow-lg">
              <DropdownMenuRadioGroup
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as FilterOption)}
              >
                {FILTER_OPTIONS.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.value}
                    value={option.value}
                    className="rounded-lg px-3 py-2 text-sm text-slate-700 data-[state=checked]:bg-[#0954EB] data-[state=checked]:text-white"
                  >
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-100">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-[#F6F8FF]">
              <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                #
              </TableHead>
              <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                Name
              </TableHead>
              <TableHead className="h-12 px-6 text-right text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                More
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-center text-sm text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user, index) => (
                <TableRow
                  key={user.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer transition"
                >
                  <TableCell
                    className="px-6 py-3 text-sm font text-[#1A1A1A]"
                    onClick={() => handleRowClick(user.id)}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    className="px-6 py-3 text-sm text-[#1A1A1A] leading-auto"
                    onClick={() => handleRowClick(user.id)}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell className="px-6 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label={`View more actions for ${user.name}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-slate-100 hover:text-slate-600"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-36 rounded-xl border-slate-200 p-2 shadow-lg">
                        <DropdownMenuItem
                          onClick={() => setConfirmAction({ userId: user.id, userName: user.name, type: "approve" })}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-green-600 cursor-pointer hover:bg-green-50"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setConfirmAction({ userId: user.id, userName: user.name, type: "reject" })}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 cursor-pointer hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!confirmAction} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to{" "}
              <span className={confirmAction?.type === "approve" ? "font-semibold text-green-600" : "font-semibold text-red-600"}>
                {confirmAction?.type}
              </span>{" "}
              user <span className="font-semibold">{confirmAction?.userName}</span>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={
                confirmAction?.type === "approve"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }
            >
              {confirmAction?.type === "approve" ? "Approve" : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
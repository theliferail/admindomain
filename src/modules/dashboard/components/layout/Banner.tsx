import Image from "next/image"
import { Search } from "lucide-react"

import adminAvatar from "@public/dashboardImage.svg"
import mobileFilterIcon from "@public/mobilefilterIcon.svg"
import mobilenotificationIcon from "@public/mobilenotification.svg"

interface BannerProps {
  userName?: string
}

export default function Banner({ userName }: BannerProps) {
  return (
    <section className="flex mb-8 h-[200px] w-full flex-col gap-5 rounded-b-[22px] bg-[#042362] px-5 py-6 text-white shadow-[0_28px_55px_-30px_rgba(25,14,140,0.8)] md:flex-row md:items-center md:justify-between md:gap-6 md:px-10 md:py-8">
      <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-start">
        <div className="flex items-center gap-4">
          <div className="relative  flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F6D4C8] md:h-[100px] md:w-[100px]">
            <Image
              src={adminAvatar}
              alt="Admin avatar"
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="space-y-1">
            <h5 className="mb- text-lg leading- tracking-tight font-[300] md:text-[18px] md:mb-6">Admin Dashboard</h5>
            <p className="text-sm font-[300] text-[#E3E9FF]">Hello, {userName ?? "Admin"}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Open filters"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white/50 md:hidden"
        >
          <Image src={mobilenotificationIcon} alt="" className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-between items-center gap-4 md:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
          <input
            type="search"
            placeholder="Search for doctors, pharmacies, labs..."
            className="w-[110%] border border-white/15 bg-white/10 pl-12 pr-4 py-2.5 text-sm placeholder:text-white/65 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
        <div className="">
        <button
          type="button"
          aria-label="Open filters"
          className="inline-flex h-10 w-10 items-center justify-center rounded-none bg-[#0954EB] transition hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white/50 md:hidden"
        >
          <Image src={mobileFilterIcon} alt="" className="h-5 w-5" />
        </button>
        </div>
      </div>
    </section>
  )
}
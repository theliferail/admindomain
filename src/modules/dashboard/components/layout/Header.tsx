"use client"

import Image from "next/image";
import { Search } from "lucide-react";

import Logo from "@/public/logo.svg";
import filterIcon from "@/public/filter.svg";
import notificationIcon from "@/public/notification.svg";

export default function Header() {
  return (
    <header className="flex h-[70px] w-full items-center gap-4 border-b border-border bg-white px-5 py-4 sm:gap-6 sm:px-8 lg:px-17">
      <div className="flex items-center">
        <Image src={Logo} alt="LifeRail" priority className="h-[41.25px] w-[80px] sm:w-28" />
      </div>
      <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
        <div className="relative hidden w-full max-w-xs md:block md:max-w-sm lg:max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search for doctors, pharmacies, patients, labs, hospitals with ID"
            className="w-full rounded-lg border border-border bg-white pl-12 pr-12 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <button
          type="button"
          aria-label="Filter"
          className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary/30 sm:flex sm:pr-6"
        >
          <Image src={filterIcon} alt="" className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <Image src={notificationIcon} alt="" className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
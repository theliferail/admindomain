"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { sidebarUtilityItem } from "@modules/dashboard/constants/navigation";
import { cn } from "@shared/lib/utils";
import { clearAccessToken } from "@shared/lib/axiosInstance";

export function FooterLogoutButton({ className }: { className?: string }) {
  const { label, icon: Icon } = sidebarUtilityItem;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      clearAccessToken();
      router.replace("/login");
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold tracking-tight text-[#CB4B1F] transition-all hover:bg-[#FFF5F0] hover:text-[#B93A0F] disabled:opacity-60",
        className,
      )}
    >
      <Icon className="h-5 w-5 text-[#CB4B1F] transition-colors group-hover:text-[#B93A0F]" />
      <span>{isPending ? "Logging out…" : label}</span>
    </button>
  );
}

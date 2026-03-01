"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Banner from "@modules/dashboard/components/layout/Banner";
import Header from "@modules/dashboard/components/layout/Header";
import MobileNav from "@modules/dashboard/components/layout/MobileNav";
import Sidebar from "@modules/dashboard/components/layout/Sidebar";
import { getAccessToken, clearAccessToken } from "@shared/lib/axiosInstance";
import { fetchMe, type AuthUser } from "@/actions/auth/getme";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    fetchMe()
      .then((response) => {
        setUser(response.data);
        setIsReady(true);
      })
      .catch(() => {
        clearAccessToken();
        router.replace("/login");
      });
  }, [router]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#f5f6fb]">
        <span className="text-sm font-medium text-slate-500">Loading admin workspace…</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f6fb] pb-20 lg:pb-0">
      <div className="sticky top-0 z-50 hidden bg-white shadow-sm lg:block">
        <Header />
      </div>

      <div className="flex flex-1 flex-col gap-10 pb-14 pl-0 pr-0 pt-0 lg:flex-row lg:items-start lg:gap-[15px] lg:pb-12 lg:pr-10">
        <div className="hidden lg:block lg:sticky lg:top-[70px] lg:self-start">
          <Sidebar />
        </div>
        <main className="flex-1">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 pb-8 sm:px-6 md:px-8">
            <Banner userName={user ? `${user.firstName} ${user.lastName}` : undefined} />
            {children}
          </div>
        </main>
      </div>

      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
}

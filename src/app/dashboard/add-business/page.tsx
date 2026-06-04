"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import AdminLayout from "@modules/dashboard/layout/AdminLayout";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";

const businessTypes = ["Pharmacy", "Lab", "Doctor", "Hospital"] as const;
type BusinessType = (typeof businessTypes)[number];

export default function AddBusinessPage() {
  const router = useRouter();
  const [businessType, setBusinessType] = useState<BusinessType | "">("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShare = async () => {
    if (!businessType || !email.trim() || !businessName.trim()) return;

    setIsSubmitting(true);
    try {
      // TODO: call API to share onboarding link
      console.log("Sharing onboarding link:", { businessType, email, businessName });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <section className="mx-auto w-full max-w-2xl space-y-6 px-4 sm:space-y-8 sm:px-0">
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
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[#29196E] sm:text-2xl">
              Add Business
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Select a business type.
            </p>
          </div>
        </div>

        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:space-y-6 sm:p-6">
          <div className="space-y-2">
            <label
              htmlFor="business-type"
              className="text-sm font-medium text-slate-700"
            >
              Business Type
            </label>
            <select
              id="business-type"
              value={businessType}
              onChange={(e) => {
                setBusinessType(e.target.value as BusinessType | "");
                setEmail("");
                setBusinessName("");
              }}
              className="border-input h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            >
              <option value="">Select a business type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {businessType && (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter business email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="business-name"
                  className="text-sm font-medium text-slate-700"
                >
                  Business Name
                </label>
                <Input
                  id="business-name"
                  type="text"
                  placeholder="Enter business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>

              <Button
                onClick={handleShare}
                disabled={isSubmitting || !email.trim() || !businessName.trim()}
                className="w-full bg-[#1D4ED8] hover:bg-[#1D4ED8]/90"
              >
                {isSubmitting ? "Sharing…" : "Share Onboarding Link"}
              </Button>
            </>
          )}
        </div>
      </section>
    </AdminLayout>
  );
}

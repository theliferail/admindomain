"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { loginAction } from "@/actions/auth/loginAction";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";
import logo from "@public/logo.svg"

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      setIsSubmitting(true);
      await loginAction({ email, password });
      router.push("/dashboard");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <div className="flex min-h-screen items-center justify-center bg-[#fff] px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden space-y-1 shadow-[0_24px_64px_-32px_rgba(46,40,100,0.35)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="flex h-full flex-col gap-10 px-8 py-10 sm:px-12 sm:py-14">
          <div className="space-y-8">
            <div className="font-semibold text-[#6034ff] sm:text-lg"><Image src={logo} alt="logo-icon" /></div>

            <div className="space-y-3">
              <h1 className="text-[32px] font-semibold tracking-tight text-[#11203E] sm:text-[32px]">
                Admin Log In
              </h1>
              <p className="text-sm text-[#666666] sm:text-[20px]">
                Welcome back. Please enter your details.
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@liferail.com"
                autoComplete="email"
                className="h-12 rounded-xl border-slate-200 bg-white/70 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:ring-[#8f57ff]/30"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-12 rounded-xl border-slate-200 bg-white/70 pr-12 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:ring-[#0954EB]/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-500 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0954EB]/40"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error ? (
              <div
                role="alert"
                className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </div>
            ) : null}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-none bg-[#0954EB] text-base font-semibold text-white shadow-[0_12px_28px_-12px_rgba(88,38,217,0.8)] transition-transform hover:translate-y-[-1px] hover:shadow-[0_18px_44px_-16px_rgba(88,38,217,0.85)] focus-visible:ring-[#8f57ff]/50 disabled:translate-y-0"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>

            <div className="text-right text-sm">
              <Link href="#" className="font-medium text-[#0954EB] hover:text-[#4016c7]">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>

        <div className="relative hidden bg-gradient-to-br from-[#f3f0ff] via-[#f6f7fb] to-[#edeafd] md:block">
          <div className="relative h-full w-full overflow-hidden rounded-none ">
            <div className="absolute inset-0">
              <Image
                src="/Male.svg"
                alt="Healthcare professionals"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f6f7fb]/95 via-transparent to-transparent" />
            </div>

          
          </div>
        </div>
      </div>
    </div>

  );
}

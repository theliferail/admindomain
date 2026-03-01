import type { AxiosError } from "axios";

import axiosInstance, {
  clearAccessToken,
  setAccessToken,
} from "@shared/lib/axiosInstance";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: Record<string, unknown>;
  };
  timestamp: string;
};

export async function loginAction({ email, password }: LoginPayload) {
  if (!email.trim() || !password.trim()) {
    throw new Error("Email and password are required.");
  }

  try {
    const { data } = await axiosInstance.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    const token = data?.data?.accessToken ?? null;

    if (token && typeof token === "string") {
      setAccessToken(token);
    }

    return data;
  } catch (error) {
    clearAccessToken();

    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to sign in. Please try again.";

    throw new Error(message);
  }
}

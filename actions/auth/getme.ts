import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";

export type AuthUser = {
  id: string;
  email: string;
  userType: string;
  status: string;
  firstName: string;
  lastName: string;
  phone: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
};

export type GetMeResponse = {
  success: boolean;
  message: string;
  data: AuthUser;
  timestamp: string;
};

export async function fetchMe() {
  try {
    const { data } = await axiosInstance.get<GetMeResponse>("/auth/me");

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch user profile. Please try again.";

    throw new Error(message);
  }
}

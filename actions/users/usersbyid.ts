import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";
import type { User } from "@/actions/users/totalusers";

export type UserByIdResponse = {
  success: boolean;
  message: string;
  data: User;
  timestamp: string;
};

export async function fetchUserById(id: string) {
  if (!id.trim()) {
    throw new Error("User ID is required.");
  }

  try {
    const { data } = await axiosInstance.get<UserByIdResponse>(`/users/${id}`);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch user. Please try again.";

    throw new Error(message);
  }
}
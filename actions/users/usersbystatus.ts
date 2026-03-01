import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";
import type { User } from "@/actions/users/totalusers";

export type UsersByStatusResponse = {
  success: boolean;
  message: string;
  data: User[];
  timestamp: string;
};

export async function fetchUsersByStatus(status: string) {
  if (!status.trim()) {
    throw new Error("Status is required.");
  }

  try {
    const { data } = await axiosInstance.get<UsersByStatusResponse>(
      `/users/status/${status}`
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch users by status. Please try again.";

    throw new Error(message);
  }
}

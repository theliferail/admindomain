import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";

export type User = {
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

export type TotalUsersResponse = {
  success: boolean;
  message: string;
  data: User[];
  timestamp: string;
};

export async function fetchTotalUsers() {
  try {
    const { data } = await axiosInstance.get<TotalUsersResponse>("/users");

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch users. Please try again.";

    throw new Error(message);
  }
}
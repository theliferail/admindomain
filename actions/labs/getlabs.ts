import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";
import type { Lab } from "./getlabsbyid";

export type GetLabsResponse = {
  success: boolean;
  message: string;
  data: Lab[];
  timestamp: string;
};

export async function fetchLabs() {
  try {
    const { data } = await axiosInstance.get<GetLabsResponse>("/laboratories");

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch labs. Please try again.";

    throw new Error(message);
  }
}

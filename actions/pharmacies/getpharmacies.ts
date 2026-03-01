import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";
import type { Pharmacy } from "./getpharmacybyid";

export type GetPharmaciesResponse = {
  success: boolean;
  message: string;
  data: Pharmacy[];
  timestamp: string;
};

export async function fetchPharmacies() {
  try {
    const { data } =
      await axiosInstance.get<GetPharmaciesResponse>("/pharmacies");

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch pharmacies. Please try again.";

    throw new Error(message);
  }
}

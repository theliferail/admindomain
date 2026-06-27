import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";
import type { Hospital } from "./gethospitals";

export type GetHospitalByIdResponse = {
  success: boolean;
  message: string;
  data: Hospital;
  timestamp: string;
};

export async function getHospitalById(id: string) {
  try {
    const { data } = await axiosInstance.get<GetHospitalByIdResponse>(
      `/hospitals/${id}`
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch hospital. Please try again.";

    throw new Error(message);
  }
}

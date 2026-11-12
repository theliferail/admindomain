import type { AxiosError } from "axios";

import { doctorAxiosInstance } from "@shared/lib/axiosInstance";
import type { Doctor } from "@/actions/doctors/approveDoctor";

export type GetDoctorsResponse = {
  success: boolean;
  message: string;
  data: Doctor[];
  timestamp: string;
};

export async function fetchDoctors() {
  try {
    const { data } = await doctorAxiosInstance.get<GetDoctorsResponse>("/doctors");

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch doctors. Please try again.";

    throw new Error(message);
  }
}

/**
 * Account Mgmt links to doctors by their RBAC user ID, but the doctor
 * service's admin endpoints need the doctor profile ID. Resolve one from the other.
 */
export async function fetchDoctorByUserId(userId: string) {
  const { data } = await fetchDoctors();

  return data.find((doctor) => doctor.userId === userId || doctor.id === userId) ?? null;
}

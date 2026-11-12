import type { AxiosError } from "axios";

import { doctorAxiosInstance } from "@shared/lib/axiosInstance";
import type { Doctor } from "@/actions/doctors/approveDoctor";

export type RejectDoctorPayload = {
  reason: string;
};

export type RejectDoctorResponse = {
  success: boolean;
  message: string;
  data: Doctor;
  timestamp: string;
};

export async function rejectDoctor(doctorId: string, payload: RejectDoctorPayload) {
  if (!doctorId.trim()) {
    throw new Error("Doctor ID is required.");
  }

  if (!payload.reason.trim()) {
    throw new Error("A reason is required to reject a doctor.");
  }

  try {
    const { data } = await doctorAxiosInstance.post<RejectDoctorResponse>(
      `/doctors/admin/${doctorId}/reject`,
      { reason: payload.reason.trim() },
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to reject doctor. Please try again.";

    throw new Error(message);
  }
}

import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";
import type { Lab } from "./getlabsbyid";

export type CreateLabPayload = {
  hospitalId: string;
  labName: string;
  labLicenseNumber: string;
  businessRegistrationNumber: string;
  emailAddress: string;
  phoneNumber: string;
  businessOperationalHours: string;
  state: string;
  lga: string;
  address: string;
  popularLandmark: string;
  personInChargeName: string;
  personInChargeNumber: string;
  personInChargeYearsOfPractice: number;
  personInChargeLicenseNumber: string;
  personInChargeLicensingBody: string;
  personInChargeDegree: string;
  personInChargeUniversity: string;
  labLicenseImage: string;
  proofOfQualificationImage: string;
  businessPermitImage: string;
  agreeToTerms: boolean;
  consentToLiferail: boolean;
};

export type CreateLabResponse = {
  success: boolean;
  message: string;
  data: Lab;
  timestamp: string;
};

export async function createLab(payload: CreateLabPayload) {
  try {
    const { data } = await axiosInstance.post<CreateLabResponse>(
      "/laboratories",
      payload
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to create lab. Please try again.";

    throw new Error(message);
  }
}

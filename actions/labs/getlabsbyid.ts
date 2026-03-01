import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";

export type Lab = {
  id: string;
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
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type GetLabByIdResponse = {
  success: boolean;
  message: string;
  data: Lab;
  timestamp: string;
};

export async function getLabById(id: string) {
  try {
    const { data } = await axiosInstance.get<GetLabByIdResponse>(
      `/laboratories/${id}`
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch lab. Please try again.";

    throw new Error(message);
  }
}

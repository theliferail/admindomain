import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";

export type Pharmacy = {
  id: string;
  hospitalId: string;
  pharmacyName: string;
  pharmacyLicenseNumber: string;
  businessRegistrationNumber: string;
  emailAddress: string;
  phoneNumber: string;
  businessOperationalHours: string;
  state: string;
  lga: string;
  address: string;
  popularLandmark: string;
  pharmacistInChargeName: string;
  pharmacistInChargeNumber: string;
  pharmacistInChargeYearsOfPractice: number;
  pharmacistInChargeLicenseNumber: string;
  pharmacistInChargeLicensingBody: string;
  pharmacistInChargeDegree: string;
  pharmacistInChargeUniversity: string;
  pharmacyLicenseImage: string;
  proofOfQualificationImage: string;
  businessPermitImage: string;
  agreeToTerms: boolean;
  consentToLiferail: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type GetPharmacyByIdResponse = {
  success: boolean;
  message: string;
  data: Pharmacy;
  timestamp: string;
};

export async function getPharmacyById(id: string) {
  try {
    const { data } = await axiosInstance.get<GetPharmacyByIdResponse>(
      `/pharmacies/${id}`
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch pharmacy. Please try again.";

    throw new Error(message);
  }
}

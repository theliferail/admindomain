import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";
import type { Pharmacy } from "./getpharmacybyid";

export type CreatePharmacyPayload = {
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
};

export type CreatePharmacyResponse = {
  success: boolean;
  message: string;
  data: Pharmacy;
  timestamp: string;
};

export async function createPharmacy(payload: CreatePharmacyPayload) {
  try {
    const { data } = await axiosInstance.post<CreatePharmacyResponse>(
      "/pharmacies",
      payload
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to create pharmacy. Please try again.";

    throw new Error(message);
  }
}

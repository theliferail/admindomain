import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";
import type { Hospital } from "./gethospitals";

export type CreateHospitalPayload = {
  hospitalName: string;
  licenseNumber: string;
  businessRegistrationNumber: string;
  accreditationBody: string;
  facilityType: string;
  emailAddress: string;
  phoneNumber: string;
  emergencyContact: string;
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

export type CreateHospitalResponse = {
  success: boolean;
  message: string;
  data: Hospital;
  timestamp: string;
};

export async function createHospital(payload: CreateHospitalPayload) {
  try {
    const { data } = await axiosInstance.post<CreateHospitalResponse>(
      "/hospitals",
      payload
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to create hospital. Please try again.";

    throw new Error(message);
  }
}

import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";

export type Hospital = {
  id: string;
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
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type GetHospitalsResponse = {
  success: boolean;
  message: string;
  data: Hospital[];
  timestamp: string;
};

export async function fetchHospitals() {
  try {
    const { data } =
      await axiosInstance.get<GetHospitalsResponse>("/hospitals");

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch hospitals. Please try again.";

    throw new Error(message);
  }
}

import type { AxiosError } from "axios";

import { doctorAxiosInstance } from "@shared/lib/axiosInstance";

export type DoctorStatus = "PENDING_VERIFICATION" | (string & {});

export type Doctor = {
  id: string;
  userId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  currentStateOfResidence: string;
  lga: string;
  bankName: string;
  recipientName: string;
  accountNumber: string;
  gender: string;
  generalConsultation: boolean;
  medicalSpecialty: string;
  yearsOfPractice: number;
  medicalLicenseNumber: string;
  licensingBody: string;
  degree: string;
  university: string;
  consultationAvailability: string;
  biography: string;
  medicalLicenseImage: string;
  proofOfIdentificationImage: string;
  proofOfQualificationImage: string;
  affiliateHospital?: string;
  preferredLanguage: string;
  agreeToTerms: boolean;
  consentToLiferail: boolean;
  profilePicture?: string;
  communicationPreference: string;
  status: DoctorStatus;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  canPractice: boolean;
  missingRequirements: string[];
  createdAt: string;
  updatedAt: string;
};

export type ApproveDoctorResponse = {
  success: boolean;
  message: string;
  data: Doctor;
  timestamp: string;
};

export async function approveDoctor(doctorId: string) {
  if (!doctorId.trim()) {
    throw new Error("Doctor ID is required.");
  }

  try {
    const { data } = await doctorAxiosInstance.post<ApproveDoctorResponse>(
      `/doctors/admin/${doctorId}/approve`,
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to approve doctor. Please try again.";

    throw new Error(message);
  }
}

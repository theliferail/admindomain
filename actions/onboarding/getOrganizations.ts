import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";

export type OrganizationType = "HOSPITAL" | "PHARMACY" | "LAB";

export type OrganizationStatus = "PENDING_ONBOARDING" | "APPROVED" | "REJECTED";

export type Organization = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: OrganizationType;
  status: OrganizationStatus;
  createdByUserId: string;
  adminUserId: string;
  createdAt: string;
  updatedAt: string;
};

export type GetOrganizationsResponse = {
  success: boolean;
  message: string;
  data: Organization[];
  timestamp: string;
};

export async function fetchOnboardingOrganizations() {
  try {
    const { data } = await axiosInstance.get<GetOrganizationsResponse>(
      "/api/onboarding/organizations",
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch onboarding organizations. Please try again.";

    throw new Error(message);
  }
}

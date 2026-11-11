import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";
import type { Organization } from "@/actions/onboarding/getOrganizations";

export type ApproveOrganizationResponse = {
  success: boolean;
  message: string;
  data: Organization;
  timestamp: string;
};

export async function approveOrganization(organizationId: string) {
  if (!organizationId.trim()) {
    throw new Error("Organization ID is required.");
  }

  try {
    const { data } = await axiosInstance.post<ApproveOrganizationResponse>(
      `/api/onboarding/organizations/${organizationId}/approve`,
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to approve organization. Please try again.";

    throw new Error(message);
  }
}

import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";

export type InvitePayload = {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  organizationType: "HOSPITAL" | "PHARMACY" | "LAB";
};

export type InviteResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    organizationType: "HOSPITAL" | "PHARMACY" | "LAB";
    status: "PENDING" | "ACCEPTED" | "EXPIRED";
    invitedByUserId: string;
    invitedByName: string;
    organizationId: string;
    expiresAt: string;
    createdAt: string;
  };
  timestamp: string;
};

export async function inviteOnboarding(payload: InvitePayload) {
  try {
    const { data } = await axiosInstance.post<InviteResponse>(
      "/onboarding/invite",
      payload,
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to send onboarding invite. Please try again.";

    throw new Error(message);
  }
}

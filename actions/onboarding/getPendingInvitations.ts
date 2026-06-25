import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";

export type InvitationStatus = "PENDING" | "ACCEPTED" | "EXPIRED";

export type OrganizationType = "HOSPITAL" | "PHARMACY" | "LAB";

export type PendingInvitation = {
  id: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  organizationType: OrganizationType;
  status: InvitationStatus;
  invitedByUserId: string;
  invitedByName: string;
  organizationId: string;
  expiresAt: string;
  createdAt: string;
};

export type GetPendingInvitationsResponse = {
  success: boolean;
  message: string;
  data: PendingInvitation[];
  timestamp: string;
};

export async function fetchPendingInvitations() {
  try {
    const { data } = await axiosInstance.get<GetPendingInvitationsResponse>(
      "/api/onboarding/invitations/pending",
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch pending invitations. Please try again.";

    throw new Error(message);
  }
}

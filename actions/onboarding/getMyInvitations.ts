import type { AxiosError } from "axios";

import axiosInstance from "@shared/lib/axiosInstance";
import type { PendingInvitation } from "./getPendingInvitations";

export type GetMyInvitationsResponse = {
  success: boolean;
  message: string;
  data: PendingInvitation[];
  timestamp: string;
};

export async function fetchMyInvitations() {
  try {
    const { data } = await axiosInstance.get<GetMyInvitationsResponse>(
      "/onboarding/invitations/my",
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.statusText ??
      axiosError.message ??
      "Unable to fetch your invitations. Please try again.";

    throw new Error(message);
  }
}

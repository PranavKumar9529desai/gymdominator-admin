"use server"
import { OwnerReqConfig } from "@/lib/AxiosInstance/ownerAxios";
import { AxiosResponse } from "axios";

interface OnBordingUser {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

interface OnBordingUserResponse {
  msg: string;
  users: OnBordingUser[];
}

export const GetOnBoardingUser = async () => {
  const ownerAxios = await OwnerReqConfig();
  try {
    const response: AxiosResponse<OnBordingUserResponse> = await ownerAxios.get(
      `/api/v1/owner/onbordingusers`
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching gyms:", error);
    return null;
  }
};

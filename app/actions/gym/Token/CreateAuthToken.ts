"use server";
import { OwnerReqConfig } from "@/lib/AxiosInstance/ownerAxios";
export default async function CreateAuthToken() {
  try {
    const ownerAxios = await OwnerReqConfig();
    const response = await ownerAxios.post(`/createauthtoken`, {});

    if (response.data) {
      return {
        success: true,
        token: response.data.token,
        message: "Token created successfully",
      };
    }
    return {
      success: false,
      message: "Failed to create token",
    };
  } catch (error) {
    console.error("Error creating token:", error);
    return {
      success: false,
      message: "Error creating token",
    };
  }
}

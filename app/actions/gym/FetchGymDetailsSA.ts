"use server";
import axios, { AxiosResponse } from "axios";
import { OwnerReqConfig } from "@/lib/AxiosInstance/ownerAxios";

export interface sessionType {
  role: string;
  user: {
    name: string;
    email: string;
  picture?: string | null;
  };
}

export default async function FetchGymDetailsSA() {
  // console.log("here are the cooploes", cookieStore);
  interface responseType {
    msg: string;
    gym : {
      gym_name: string;
      gym_logo: string;
      address: string;
      phone_number: string;
      Email: string;
    }
  }

  try {
    // Initialize Axios instance with Authorization header
    const ownerAxios = await OwnerReqConfig();
    const response: AxiosResponse<responseType> = await ownerAxios.get(
      `/api/v1/owner/gymdetails`
    );

    console.log("Gym details fetched successfully:", response.data.gym);
    return response.data.gym;
  } catch (err: any) {
    console.error("Error fetching gym details:", err.response?.data || err.message);
    return null; // Return null or handle the error as needed
  }
}

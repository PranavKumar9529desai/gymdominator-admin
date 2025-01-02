"use server";
import { auth } from "@/auth";
import axios, { AxiosInstance } from "axios";

export const OwnerReqConfig = async (): Promise<AxiosInstance> => {
  const session = await auth();

  const ownerAxios: AxiosInstance = await axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/owner`,
    headers: {
      Authorization: `${JSON.stringify(session)}`,
    },
  });

  return ownerAxios;
};

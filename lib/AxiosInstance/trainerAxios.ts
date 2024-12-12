// FILE: trainerAxios.ts

"use server";
import { auth } from "@/auth";
import axios, { AxiosInstance } from "axios";

export const TrainerReqConfig = async (): Promise<AxiosInstance> => {
  const session = await auth();

  const trainerAxios: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      Authorization: `${JSON.stringify(session)}`,
    },
  });

  console.log("trainerAxios from the trainerAxios file is ", trainerAxios);

  return trainerAxios;
};

"use server";
import axios, { AxiosResponse } from "axios";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import GetTokenSA from "../GetTokenSA";

export interface sessionType {
  role: string;
  user: {
    name: string;
    email: string;
  picture?: string | null;
  };
}

export default async function FetchGymDetailsSA({gymid , session}: {gymid: string , session  : sessionType}) {
  // console.log("here are the cooploes", cookieStore);
  interface responseType {
    msg: string;
    gym: {
      name: string;
      logo: string;
      address: string;
      phone: string;
      email: string;
    };
  }

  try {
    const response: AxiosResponse<responseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/owner/gymdetails/${gymid}`,
      { headers: { Authorization: `${JSON.stringify(session)}` } }
    );
    return response.data.gym;
  } catch (err) {
    console.log("error fetching gym details", err);
  }
}

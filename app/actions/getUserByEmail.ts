"use server";
import axios, { AxiosResponse } from "axios";

export interface userType {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  msg: string;
  user: userType;
}

export type RoleType = "gymOwner" | "trainer" | "sales";

export default async function getUserByEmail(
  email: string,
  Role: RoleType
): Promise<userType | false> {
  try {
    let response: AxiosResponse<LoginResponse> = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/signup/login/${Role}`,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let user = response.data.user;
    console.log("user from the response from the getuserByemail", user);
    return user;
  } catch (error) {
    console.log("error getting user by email", error);
    return false;
  }
}

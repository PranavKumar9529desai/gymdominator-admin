"use server";
import axios, { AxiosResponse } from "axios";

export interface userType {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface LoginResponse {
  msg: string;
  user: userType;
  role?: string;
}

export default async function getUserByEmail(
  email: string
): Promise<userType | false> {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/signup/login`,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    const user = response.data.user;
    if (user && response.data.role) {
      user.role = response.data.role;
    }
    
    console.log("user from getUserByEmail response:", user);
    return user;
  } catch (error) {
    console.log("error getting user by email", error);
    return false;
  }
}

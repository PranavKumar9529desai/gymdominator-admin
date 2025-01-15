"use server";
import axios, { AxiosResponse } from "axios";
import { GymInfo } from "../../types/next-auth";

// Modified userType to include both frontend and backend gym types
export interface userType {
  name: string;
  email: string;
  password: string;
  role?: string;
  gym?: GymInfo;
}

interface LoginResponse {
  msg: string;
  user: {
    name: string;
    email: string;
    password: string;
    role?: string;
    gym_id: number | null;
    id: number;
  };
  role?: string;
}

export default async function getUserByEmail(email: string): Promise<userType | false> {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/signup/login`,
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    
    const { user, role } = response.data;
    
    return user ? {
      ...user,
      role: role || user.role,
      gym: user.gym_id ? {
        gym_id: user.gym_id,
        id: user.id,
        name: user.name
      } : undefined
    } : false;
  } catch (error) {
    console.log("error getting user by email", error);
    return false;
  }
}

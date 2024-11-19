import { AxiosResponse } from "axios";
import axios from "axios";
import { headers } from "next/headers";

export type Role = "gymOwner" | "trainer"; // Add other roles as needed

export interface SignupResponse {
  msg: string;
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
  };
}

export default async function SignupSA(
  Role: string,
  name: string,
  email: string,
  password: string
) {
  let role = Role.toLowerCase();
  console.log("role rom, the signupSa ", role , name , email , password);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/signup/${role}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as SignupResponse;
    console.log("data from the signupsa",data)
    if (!data) {
      throw new Error("No data received");
    }

    return data.user;
  } catch (error) {
    console.error("Error signing up:", error);
    return error;
  }
}

interface UserExistsResponse {
  msg: string;
  user: null | {
    name: string;
    password: string;
    email: string;
  };
}

// does the user exists
export async function UserExistsSA(
  Role: Role,
  email: string,
  name: string,
  password: string
) {
  //  return true if user exists and password is correct

  let response: AxiosResponse<UserExistsResponse> = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/signup/isexists/${Role}`,
    {
      email,
      name,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log("response is this ", response);
  let user = response.data.user;
  if (user) {
    return user;
  } else {
    return false;
  }
}

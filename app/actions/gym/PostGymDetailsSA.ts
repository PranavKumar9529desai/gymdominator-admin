"use server";
import { OwnerReqConfig } from "@/lib/AxiosInstance/ownerAxios";
import { AxiosResponse } from "axios";

interface GymResponse {
  msg: string;
  gym: {
    gym_name: string;
    gym_logo: string;
    address : string;
    phone_number: string;
    Email: string;
  };
}

interface FormData {
  gym_name: string;
  gym_logo: File | null;
  address: string;
  phone_number: string;
  Email: string;
}

export default async function PostGymDetails(
  formData: string,
  image: string
) {
  console.log("received the request from the postgymdetais ", image , formData);
  try {
    const formdata : FormData  = JSON.parse(formData);
    const ownerAxios = await OwnerReqConfig();
    const payload = {
      gym_name: formdata.gym_name,
      gym_logo: image, // Base64 encoded image for D1 database
      address: formdata.address,
      phone_number: formdata.phone_number,
      Email: formdata.Email,
    };

    console.log("payload is ", payload);
    const response: AxiosResponse<GymResponse> = await ownerAxios.post(
      `/api/v1/owner/creategym`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Gym details submitted successfully:", response.data.gym);
      console.log("Gym details submitted successfully:", response.data.msg);
      return response.data.gym;
    } else {
      console.log("Failed to submit gym details:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error submitting the gym details:", error);
    return null;
  }
}
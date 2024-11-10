import axios, { AxiosResponse } from "axios";
export default async function FetchGymDetailsSA(gymid: string) {
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
    // this data wi;; come from the frontend
    const response : AxiosResponse<responseType> = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/owner/gymdetails/${gymid}`
    );
    return response.data.gym;
  } catch (err) {
    console.log("error fetching gym details", err);
  }
}

import axios from "axios";
interface FormData {
  gym_name: string;
  gym_logo: File | null;
  address: string;
  phone_number: string;
  Email: string;
}
export default async function PostGymDetails(
  formData: FormData,
  image: string 
) {
  try {
    

    const payload = {
      gym_name: formData.gym_name,
      gym_logo: image, // Base64 encoded image for D1 database
      address: formData.address,
      phone_number: formData.phone_number,
      Email: formData.Email,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/owner/creategym`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Gym details submitted successfully:", response.data.gym);
      return response.data.gym;
    } else {
      console.log("Failed to submit gym details:", response.data);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}

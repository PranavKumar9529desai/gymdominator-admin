import axios from "axios";

export const AddTrainerSA= async (
  name: string,
  email: string,
  password: string,
  gym_id: number
) => {
  let trainer = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/owner/addtrainer`,
    {
      name,
      email,
      password,
      gym_id,
    }
  );
  let data = trainer.data;
  console.log("trainer is created", data);
};

"use server";
import { TrainerReqConfig } from "@/lib/AxiosInstance/trainerAxios";

export interface AssignedUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  membershipStatus: string;
}

export const getUsersAssignedToTrainer = async () => {
  const trainerAxios = await TrainerReqConfig();
  try {
    const response = await trainerAxios.get('/assignedusers');
    const data = response.data;
    
    if (data.msg === "success") {
      return data.users as AssignedUser[];
    }
    return [];
  } catch (error) {
    console.error("Error fetching assigned users:", error);
    return [];
  }
};

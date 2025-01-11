"use server";
import { TrainerReqConfig } from "@/lib/AxiosInstance/trainerAxios";

export interface AssignedUser {
  id: string;
  name: string;
  email: string;
  HealthProfile?: {
    weight: number;
    height: number;
    goal: string | null;
    gender: string;
  } | null;
  WorkoutPlan?: {
    id: number;
    name: string;
  } | null;
  workoutPlanId?: number | null;
  workoutPlans?: {  // Updated to match new schema
    workoutPlan: {
      id: number;
      name: string;
    };
    isActive: boolean;
  }[];
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

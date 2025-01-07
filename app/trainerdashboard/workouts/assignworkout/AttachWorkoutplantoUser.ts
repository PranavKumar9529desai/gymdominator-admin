"use server";
import { TrainerReqConfig } from "@/lib/AxiosInstance/trainerAxios";

interface AssignWorkoutPlanResponse {
  msg: string;
  workoutPlan?: {
    name: string;
    id: number;
  };
}

export async function attachWorkoutPlanToUser(
  userId: string,
  workoutPlanId: string
): Promise<AssignWorkoutPlanResponse> {
  try {
    const trainerAxios = await TrainerReqConfig();
    const response = await trainerAxios.post('/assignworkoutplan', {
      userId: parseInt(userId),
      workoutPlanId: parseInt(workoutPlanId),
    });
    
    return response.data;
  } catch (error) {
    console.error("Error assigning workout plan:", error);
    throw new Error("Failed to assign workout plan");
  }
}

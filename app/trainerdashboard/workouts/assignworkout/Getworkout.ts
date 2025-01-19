"use server";
import { TrainerReqConfig } from "@/lib/AxiosInstance/trainerAxios";

export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  description: string;
  order: number;
}

export interface WorkoutSchedule {
  id: number;
  dayOfWeek: string;
  muscleTarget: string;
  duration: number;
  calories: number;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: number;
  name: string;
  description: string | null;
  schedules: WorkoutSchedule[];
}

export const getAllWorkoutPlans = async () => {
  const trainerAxios = await TrainerReqConfig();
  try {
    const response = await trainerAxios.get("/allworkoutplans");
    const data = response.data;

    if (data.msg === "success") {
      // console.log("this are the all of the workous" , data.workoutPlans);
      return {
        success: true,
        workoutPlans: data.workoutPlans as WorkoutPlan[],
      };
    }
    return {
      success: false,
      workoutPlans: [],
    };
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    return {
      success: false,
      workoutPlans: [],
      error: "Failed to fetch workout plans",
    };
  }
};

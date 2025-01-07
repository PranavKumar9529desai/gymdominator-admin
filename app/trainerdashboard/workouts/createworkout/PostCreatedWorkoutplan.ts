"use server";
import { TrainerReqConfig } from "@/lib/AxiosInstance/trainerAxios";

interface ExerciseInput {
  name: string;
  sets: number;
  reps: string;
  description: string;
  order: number;
}

interface ScheduleInput {
  dayOfWeek: string;
  muscleTarget: string;
  duration: number;
  calories: number;
  exercises: ExerciseInput[];
}

interface WorkoutPlanInput {
  name: string;
  description?: string;
  schedules: ScheduleInput[];
}

export const createWorkoutPlan = async (workoutPlan: WorkoutPlanInput) => {
  const trainerAxios = await TrainerReqConfig();

  try {
    const response = await trainerAxios.post('/createworkoutplans', workoutPlan);
    const data = response.data;

    if (response.status === 201) {
      return {
        success: true,
        message: "Workout plan created successfully",
        data: data.workoutPlan
      };
    } else {
      throw new Error(data.msg || "Failed to create workout plan");
    }
  } catch (error: any) {
    console.error("Error creating workout plan:", error);
    return {
      success: false,
      message: error.response?.data?.msg || "Failed to create workout plan",
      error: error.response?.data?.error || error.message
    };
  }
};

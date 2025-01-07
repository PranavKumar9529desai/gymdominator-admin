"use server";
import { TrainerReqConfig } from "@/lib/AxiosInstance/trainerAxios";

interface MealIngredientInput {
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}

interface MealInput {
  name: string;
  timeOfDay: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  instructions?: string;
  ingredients: MealIngredientInput[];
}

interface DietPlanInput {
  name: string;
  description?: string;
  targetCalories: number;
  proteinRatio: number;
  carbsRatio: number;
  fatsRatio: number;
  meals: MealInput[];
}

export const createDietPlan = async (dietPlan: DietPlanInput) => {
  const trainerAxios = await TrainerReqConfig();

  try {
    const response = await trainerAxios.post('/createdietplans', dietPlan);
    const data = response.data;

    if (response.status === 201) {
      return {
        success: true,
        message: "Diet plan created successfully",
        data: data.dietPlan
      };
    } else {
      throw new Error(data.msg || "Failed to create diet plan");
    }
  } catch (error: any) {
    console.error("Error creating diet plan:", error);
    return {
      success: false,
      message: error.response?.data?.msg || "Failed to create diet plan",
      error: error.response?.data?.error || error.message
    };
  }
};

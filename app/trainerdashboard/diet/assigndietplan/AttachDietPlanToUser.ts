import { TrainerReqConfig } from "@/lib/AxiosInstance/trainerAxios";

export const attachDietPlanToUser = async (userId: string, dietPlanId: string) => {
  const trainerAxios = await TrainerReqConfig();
  try {
    const response = await trainerAxios.post('/assigndietplan', {
      userId: parseInt(userId),
      dietPlanId: parseInt(dietPlanId)
    });
    
    return {
      success: response.data.msg === "Diet plan assigned successfully" || 
               response.data.msg === "Diet plan updated successfully",
      message: response.data.msg,
      previousPlan: response.data.previousPlan,
      newPlan: response.data.newPlan
    };
  } catch (error) {
    console.error("Error assigning diet plan:", error);
    throw error;
  }
};

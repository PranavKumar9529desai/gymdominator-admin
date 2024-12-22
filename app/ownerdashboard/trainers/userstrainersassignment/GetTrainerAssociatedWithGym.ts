"use server";
import { OwnerReqConfig } from "@/lib/AxiosInstance/ownerAxios";

export const getTrainerAssociatedWithGym = async () => {
  const ownerAxios = await OwnerReqConfig();
  try {
    const response = await ownerAxios.get(`/api/v1/owner/fetchtrainers`);
    const data: TrainerType[] = response.data.Trainers;
    // console.log("trainers data is from the fetchallgyms ", data);
    return data;
  } catch (error) {
    console.error("Error fetching trainers:", error);
    return [];
  }
};

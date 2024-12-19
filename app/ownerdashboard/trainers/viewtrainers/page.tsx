import ViewTrainersList from "@/components/gym-owner/viewTrainers";
import { getTrainerAssociatedWithGym } from "@/app/actions/gym/owner/GetTrainerAssociatedWithGym";
export default async function Page() {
  const trainers : TrainerType[]  | [] = await getTrainerAssociatedWithGym();

  return (
    <>
      <ViewTrainersList Trainers={trainers} />
    </>
  );
}

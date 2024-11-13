import ViewTrainersList from "@/components/gym-owner/viewTrainers";
import FetchTrainers from "@/app/actions/FetchtrainersSA";
export default async function Page({
  searchParams,
}: {
  searchParams: { gymid: string };
}) {
  let gymid = searchParams.gymid || "1";
  const trainers: Trainer[] = await FetchTrainers({ gymid: gymid });

  return (
    <>
      <ViewTrainersList Trainers={trainers} />
    </>
  );
}

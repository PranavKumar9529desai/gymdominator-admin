import ViewTrainersList from "@/components/gym-owner/viewTrainers";
import FetchTrainers from "@/app/actions/gym/FetchtrainersSA";
export default async function Page({
  searchParams,
}: {
  searchParams: { gymid: string };
}) {
  let gymid = searchParams.gymid;
  console.log("gym id fomr the view trainers page is ", gymid);
  if (searchParams.gymid == undefined) {
    gymid = "2";
  }
  const trainers: Trainer[] = await FetchTrainers({ gymid: gymid });

  return (
    <>
      <ViewTrainersList Trainers={trainers} />
    </>
  );
}

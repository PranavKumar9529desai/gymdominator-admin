import UserTrainerTable from "@/components/common/UsersTables";
import React from "react";
import { getTrainerAssociatedWithGym } from "@/app/actions/gym/owner/GetTrainerAssociatedWithGym";
import { getUsersAssociatedWithGym } from "@/app/actions/gym/owner/GetUserAssociatedwithGym";
export default async function page() {
  const Trainers: TrainerType[] = await getTrainerAssociatedWithGym();
  const Users: UserType[] = await getUsersAssociatedWithGym();
  console.log(
    "Trainers are from the userTrainerassignment",
    Trainers,
    "Users are this ",
    Users
  );
  return (
    <>
      <UserTrainerTable users={Users} trainers={Trainers} />
    </>
  );
}

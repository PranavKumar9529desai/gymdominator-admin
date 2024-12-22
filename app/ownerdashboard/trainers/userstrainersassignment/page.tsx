import UserTrainerTable from "@/components/common/UserTrainerAssignment";
import React from "react";
import { getTrainerAssociatedWithGym } from "./GetTrainerAssociatedWithGym";
import { getUsersAssociatedWithGym } from "./GetUserAssociatedwithGym";

export default async function page() {
  const Trainers = await getTrainerAssociatedWithGym();
  const Users = await getUsersAssociatedWithGym();
  return (
    <>
      <UserTrainerTable trainers={Trainers} users={Users} />
    </>
  );
}

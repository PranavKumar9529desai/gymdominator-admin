import UserTrainerTable from "@/components/common/UsersTables";
import { get } from "http";
import React from "react";
import { getTrainerAssociatedWithGym } from "@/app/actions/gym/owner/GetTrainerAssociatedWithGym";
import { getUsersAssociatedWithGym } from "@/app/actions/gym/GetUsersAssociatedWithGym";

export default function page() {
  const Trainers = getTrainerAssociatedWithGym();
  const Users = getUsersAssociatedWithGym(); 
  return (
    <>
      <UserTrainerTable Trainers={Trainers} Users={Users}/>
    </>
  );
}

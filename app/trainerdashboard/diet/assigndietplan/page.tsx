import AssignDietToUsers from "./AssignDietToUsers";
import { getUsersAssignedToTrainer } from "./GetassignedUserDietInfo"; // Updated import
import { getAllDietPlans } from "./GetallDiets";
import React from "react";

export default async function Page() {
  const [users, dietPlans] = await Promise.all([
    getUsersAssignedToTrainer(),
    getAllDietPlans()
  ]);

  return <AssignDietToUsers users={users} dietPlans={dietPlans} />;
}

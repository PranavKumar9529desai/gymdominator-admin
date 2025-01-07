import AssignDietToUsers from "./AssignDietToUsers";
import { getUsersAssignedToTrainer } from "./GetuserassignedTotrainers";
import { getAllDietPlans } from "./GetallDiets";
import React from "react";

export default async function Page() {
  const [users, dietPlans] = await Promise.all([
    getUsersAssignedToTrainer(),
    getAllDietPlans()
  ]);

  return <AssignDietToUsers users={users} dietPlans={dietPlans} />;
}

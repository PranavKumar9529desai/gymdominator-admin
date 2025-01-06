import { getUsersAssignedToTrainer } from "./GetuserassignedTotrainers";
import AssignedUserToTrainer from "./AssignedUserToTrainer";

export default async function AssignedUsersPage() {
  const users = await getUsersAssignedToTrainer();
  
  return (
    <div>
      <AssignedUserToTrainer users={users} />
    </div>
  );
}

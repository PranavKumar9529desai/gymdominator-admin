import { Users, Target, Dumbbell } from "lucide-react";
import UserWorkoutAssignment from "./UserWorkoutAssignment";
import { StatusCardProps } from "@/components/common/StatusCard";
import { getAllWorkoutPlans } from "./Getworkout";
import { getUsersAssignedToTrainer } from "./GetuserassignedTotrainers";

interface UserWithWorkout {
  id: number;
  name: string;
  gender: "Male" | "Female";
  goal: string;
  assignedWorkout?: string;
  email: string;
}

export default async function Page() {
  // Fetch both users and workout plans in parallel
  const [usersResponse, workoutPlansResponse] = await Promise.all([
    getUsersAssignedToTrainer(),
    getAllWorkoutPlans()
  ]);

  // Transform users data to match required format
  const users: UserWithWorkout[] = usersResponse.map(user => ({
    id: parseInt(user.id),
    name: user.name,
    email: user.email,
    gender: "Male", // You might want to get this from user profile
    goal: "Not set", // You might want to get this from user profile
    assignedWorkout: undefined
  }));

  // Calculate status cards data
  const statusCards: StatusCardProps[] = [
    {
      title: "Total Users",
      value: users.length,
      iconName: "users",
      gradient: "blue"
    },
    {
      title: "Assigned Workouts",
      value: users.filter(u => u.assignedWorkout).length,
      iconName: "dumbbell",
      gradient: "green"
    },
    {
      title: "Pending Assignments",
      value: users.filter(u => !u.assignedWorkout).length,
      iconName: "target",
      gradient: "red"
    }
  ];

  return (
    <div className="container mx-auto">
      <UserWorkoutAssignment 
        Users={users}
        statusCards={statusCards}
        workoutPlans={workoutPlansResponse.workoutPlans} 
      />
    </div>
  );
}

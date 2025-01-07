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
  const [usersResponse, workoutPlansResponse] = await Promise.all([
    getUsersAssignedToTrainer(),
    getAllWorkoutPlans()
  ]);

  // Transform users data to include workout plan information
  const users = usersResponse.map(user => ({
    id: parseInt(user.id),
    name: user.name,
    email: user.email,
    gender: user.HealthProfile?.gender || "Not Set",
    goal: user.HealthProfile?.goal || "Not Set",
    workoutPlanId: user.WorkoutPlan?.id || user.workoutPlanId,  // Check both locations
    workoutPlanName: user.WorkoutPlan?.name
  }));

  // Calculate status cards data with workout assignment info
  const statusCards = [
    {
      title: "Total Users",
      value: users.length,
      iconName: "users",
      gradient: "blue"
    },
    {
      title: "Assigned Workouts",
      value: users.filter(u => u.workoutPlanId).length,
      iconName: "dumbbell",
      gradient: "green"
    },
    {
      title: "Pending Assignments",
      value: users.filter(u => !u.workoutPlanId).length,
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

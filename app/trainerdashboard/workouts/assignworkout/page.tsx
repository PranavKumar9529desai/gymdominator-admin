import UserWorkoutAssignment from "./UserWorkoutAssignment";
import { getAllWorkoutPlans } from "./Getworkout";
import { getUsersAssignedToTrainer } from "./GetuserassignedTotrainers";


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
    gender: (user.HealthProfile?.gender as "Male" | "Female") || "Male",
    goal: user.HealthProfile?.goal || "Not Set",
    workoutPlanId: user.WorkoutPlan?.id ?? user.workoutPlanId ?? null,
    workoutPlanName: user.WorkoutPlan?.name ?? null
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
      // @ts-expect-error - Property 'users' does not exist on type 'never[]'.
        Users={users}
        statusCards={statusCards}
        workoutPlans={workoutPlansResponse.workoutPlans} 
      />
    </div>
  );
}

"use client";

import UserWorkoutAssignment from "./UserWorkoutAssignment";
import { Users, Target, Dumbbell } from "lucide-react";
import { StatusCardProps } from "@/components/common/StatusCard";
import React from "react";

interface MockUser {
  id: number;
  name: string;
  age: number;
  goal: string;
  assignedWorkout: string | undefined;
  gender: "Male" | "Female";
}

const mockUsers: MockUser[] = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    goal: "Weight Loss",
    assignedWorkout: undefined,
    gender: "Male"
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 30,
    goal: "Muscle Gain",
    assignedWorkout: "Strength Training",
    gender: "Female"
  },
  {
    id: 3,
    name: "Mike Johnson",
    age: 28,
    goal: "General Fitness",
    assignedWorkout: undefined,
    gender: "Male"
  },
  {
    id: 4,
    name: "Sarah Williams",
    age: 27,
    goal: "Weight Loss",
    assignedWorkout: "Weight Loss",
    gender: "Female"
  }
];

const statusCards: StatusCardProps[] = [
  {
    title: "Total Users",
    value: mockUsers.length,
    icon: Users,
    gradient: "blue"
  },
  {
    title: "Assigned Workouts",
    value: mockUsers.filter(u => u.assignedWorkout).length,
    icon: Dumbbell,
    gradient: "green"
  },
  {
    title: "Pending Assignments",
    value: mockUsers.filter(u => !u.assignedWorkout).length,
    icon: Target,
    gradient: "red"
  }
];

export default function Page() {
  return (
    <div className="container mx-auto ">
      
      <UserWorkoutAssignment 
        Users={mockUsers} 
        statusCards={statusCards}
      />
    </div>
  );
}

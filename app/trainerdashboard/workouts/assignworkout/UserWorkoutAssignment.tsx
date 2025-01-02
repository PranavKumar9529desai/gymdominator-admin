"use client";
import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Users, Target, Dumbbell, ArrowUpDown, LucideIcon } from "lucide-react";
import { DataTable } from "@/components/Table/UsersTable";
import { DataCard } from "@/components/Table/UserCard";
import { StatusCard, StatusCardProps } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserType {
  id: number;
  name: string;
  gender: "Male" | "Female";
  goal: string;
  assignedWorkout?: string;
}

const defaultWorkouts = [
  "Strength Training",
  "Weight Loss",
  "Muscle Gain",
  "General Fitness"
];

interface UserWorkoutAssignmentProps {
  Users: UserType[];
  statusCards: StatusCardProps[];
}

// Update columns with centered alignment
const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "goal",
    header: "Fitness Goal",
  },
  {
    accessorKey: "assignedWorkout",
    header: "Assign Workout",
    cell: ({ row }) => {
      const hasWorkout = !!row.original.assignedWorkout;
      return (
        <Select
          value={row.original.assignedWorkout}
          onValueChange={(value) => {
            // Handle workout assignment here
            console.log(`Assigning ${value} to user ${row.original.id}`);
          }}
        >
          <SelectTrigger className={`w-[180px] ${
            hasWorkout ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <SelectValue placeholder="Select workout" />
          </SelectTrigger>
          <SelectContent>
            {defaultWorkouts.map((workout) => (
              <SelectItem key={workout} value={workout}>
                {workout}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
];

export default function UserWorkoutAssignment({ 
  Users, 
  statusCards 
}: UserWorkoutAssignmentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState<"Male" | "Female" | "All">("All");
  const [assignmentFilter, setAssignmentFilter] = useState<"all" | "assigned" | "unassigned">("all");
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>(Users);

  // Calculate stats

  useEffect(() => {
    const filtered = Users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (genderFilter === "All" || user.gender === genderFilter) &&
        (assignmentFilter === "all" ||
          (assignmentFilter === "assigned" && user.assignedWorkout) ||
          (assignmentFilter === "unassigned" && !user.assignedWorkout))
    );
    setFilteredUsers(filtered);
  }, [searchTerm, genderFilter, assignmentFilter, Users]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Workout Assignment</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statusCards.map((card) => (
          <StatusCard 
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            gradient={card.gradient}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={genderFilter}
          onValueChange={(value: "Male" | "Female" | "All") => setGenderFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={assignmentFilter}
          onValueChange={(value: "all" | "assigned" | "unassigned") => 
            setAssignmentFilter(value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by assignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <DataTable
          data={filteredUsers}
          columns={columns}
          filterColumn="name"
        />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <DataCard
          data={filteredUsers}
          renderCard={(user) => (
            <div className="p-4 space-y-2">
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">Gender: {user.gender}</p>
              <p className="text-sm text-gray-500">Goal: {user.goal}</p>
              <Select
                value={user.assignedWorkout}
                onValueChange={(value) => {
                  console.log(`Assigning ${value} to user ${user.id}`);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select workout" />
                </SelectTrigger>
                <SelectContent>
                  {defaultWorkouts.map((workout) => (
                    <SelectItem key={workout} value={workout}>
                      {workout}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
    </div>
  );
}

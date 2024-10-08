"use client";
import React, { useState, useMemo } from "react";
import { Users, UserCheck, UserX, ChevronDown, Search } from "lucide-react";

interface User {
  id: number;
  name: string;
  gender: string;
  goal: string;
  workoutPlan: string | null;
}

interface WorkoutPlan {
  id: number;
  name: string;
}

export default function UserWorkoutAssignment({
  params,
}: {
  params: { trainerid: string };
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "pranav desai 1",
      gender: "Male",
      goal: "Weight Loss",
      workoutPlan: null,
    },
    {
      id: 2,
      name: "pranav desai 2",
      gender: "Female",
      goal: "Muscle Gain",
      workoutPlan: "Strength Training",
    },
    {
      id: 3,
      name: "pranav desai 3",
      gender: "Non-binary",
      goal: "General Fitness",
      workoutPlan: null,
    },
    {
      id: 4,
      name: "pranav desai 4",
      gender: "Female",
      goal: "Endurance",
      workoutPlan: "Cardio Focus",
    },
    {
      id: 5,
      name: "pranav desai 5",
      gender: "Male",
      goal: "Flexibility",
      workoutPlan: null,
    },
  ]);

  const workoutPlans: WorkoutPlan[] = [
    { id: 1, name: "Weight Loss Program" },
    { id: 2, name: "Muscle Building" },
    { id: 3, name: "Cardio Focus" },
    { id: 4, name: "Strength Training" },
    { id: 5, name: "Flexibility and Yoga" },
  ];

  const assignWorkoutPlan = (userId: number, planName: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, workoutPlan: planName || null } : user
      )
    );
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.goal.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const { totalUsers, assignedUsers, unassignedUsers } = useMemo(() => {
    const total = users.length;
    const assigned = users.filter((user) => user.workoutPlan).length;
    return {
      totalUsers: total,
      assignedUsers: assigned,
      unassignedUsers: total - assigned,
    };
  }, [users]);

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
        Welcome Trainer Number : {params.trainerid}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 sm:mb-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                {totalUsers}
              </p>
            </div>
            <Users className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Assigned Users</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                {assignedUsers}
              </p>
            </div>
            <UserCheck className="h-8 w-8 sm:h-10 sm:w-10 text-green-500" />
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unassigned Users</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                {unassignedUsers}
              </p>
            </div>
            <UserX className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search users"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="hidden sm:block">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Gender</th>
                <th className="px-4 py-2 text-left text-gray-600">Goal</th>
                <th className="px-4 py-2 text-left text-gray-600">
                  Assign Workout Plan
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-gray-800">{user.name}</td>
                  <td className="px-4 py-2 text-gray-800">{user.gender}</td>
                  <td className="px-4 py-2 text-gray-800">{user.goal}</td>
                  <td className="px-4 py-2">
                    <div className="relative">
                      <select
                        value={user.workoutPlan || ""}
                        onChange={(e) =>
                          assignWorkoutPlan(user.id, e.target.value)
                        }
                        className={`block w-full bg-white border ${
                          user.workoutPlan
                            ? "border-green-500"
                            : "border-gray-300"
                        } text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                      >
                        <option value="">Assign Plan</option>
                        {workoutPlans.map((plan) => (
                          <option key={plan.id} value={plan.name}>
                            {plan.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        {/* <ChevronDown size={20} /> */}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden">
          {filteredUsers.map((user) => (
            <div key={user.id} className="border-b border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{user.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Gender: {user.gender}
              </p>
              <p className="text-sm text-gray-600 mb-2">Goal: {user.goal}</p>
              <div className="relative">
                <select
                  value={user.workoutPlan || ""}
                  onChange={(e) => assignWorkoutPlan(user.id, e.target.value)}
                  className={`block w-full bg-white border ${
                    user.workoutPlan ? "border-green-500" : "border-gray-300"
                  } text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                >
                  <option value="">Assign Plan</option>
                  {workoutPlans.map((plan) => (
                    <option key={plan.id} value={plan.name}>
                      {plan.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

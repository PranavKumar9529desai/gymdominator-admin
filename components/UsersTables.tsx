"use client";
import React, { useState, useMemo } from "react";
import { ChevronDown, Users, UserCheck, UserX } from "lucide-react";

interface User {
  id: number;
  name: string;
  gender: string;
  goal: string;
  assignedTrainer: string | null;
}

interface Trainer {
  id: number;
  name: string;
}

export default function UserTrainerTable() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      gender: "Male",
      goal: "Weight Loss",
      assignedTrainer: null,
    },
    {
      id: 2,
      name: "Jane Smith",
      gender: "Female",
      goal: "Muscle Gain",
      assignedTrainer: null,
    },
    {
      id: 3,
      name: "Alex Johnson",
      gender: "Non-binary",
      goal: "General Fitness",
      assignedTrainer: null,
    },
    {
      id: 4,
      name: "Emily Brown",
      gender: "Female",
      goal: "Flexibility",
      assignedTrainer: "Sarah Coach",
    },
    {
      id: 5,
      name: "Michael Lee",
      gender: "Male",
      goal: "Endurance",
      assignedTrainer: null,
    },
    {
      id: 6,
      name: "pranav Desai",
      gender: "Male",
      goal: "Weight Loss",
      assignedTrainer: null,
    },
  ]);

  const trainers: Trainer[] = [
    { id: 1, name: "Mike Trainer" },
    { id: 2, name: "Sarah Coach" },
    { id: 3, name: "Chris Fitness" },
  ];

  const assignTrainer = (userId: number, trainerName: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, assignedTrainer: trainerName || null }
          : user
      )
    );
  };

  const { totalUsers, assignedUsers, unassignedUsers } = useMemo(() => {
    const total = users.length;
    const assigned = users.filter((user) => user.assignedTrainer).length;
    return {
      totalUsers: total,
      assignedUsers: assigned,
      unassignedUsers: total - assigned,
    };
  }, [users]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        User-Trainer Assignment
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-800">
                {totalUsers}
              </p>
            </div>
            <Users className="h-10 w-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Assigned Users</p>
              <p className="text-2xl font-semibold text-gray-800">
                {assignedUsers}
              </p>
            </div>
            <UserCheck className="h-10 w-10 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unassigned Users</p>
              <p className="text-2xl font-semibold text-gray-800">
                {unassignedUsers}
              </p>
            </div>
            <UserX className="h-10 w-10 text-red-500" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">User Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Gender</th>
              <th className="px-4 py-2 text-left text-gray-600">Goal</th>
              <th className="px-4 py-2 text-left text-gray-600">
                Assign Trainer
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.gender}</td>
                <td className="px-4 py-2">{user.goal}</td>
                <td className="px-4 py-2">
                  <div className="relative">
                    <select
                      value={user.assignedTrainer || ""}
                      onChange={(e) => assignTrainer(user.id, e.target.value)}
                      className={`block w-full bg-white border ${
                        user.assignedTrainer
                          ? "border-green-500"
                          : "border-gray-300"
                      } text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition-colors duration-200`}
                    >
                      <option value="">Assign Trainer</option>
                      {trainers.map((trainer) => (
                        <option key={trainer.id} value={trainer.name}>
                          {trainer.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

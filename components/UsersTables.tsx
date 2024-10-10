"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Users, UserCheck, UserX } from "lucide-react";
import FetchUser from "@/app/utils/FetchUser";
import UserTrainerTableSkeleton from "./Skeltons/UserTabelsSkelton";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [isloading, setisloading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    try {
      setisloading(true);
      // console.log(isloading);
      const fetchAllusers = async () => {
        let userslist = await FetchUser();
        // Ensure default values for missing fields
        let updatedUsers = userslist.map((user, index) => ({
          id: user.id ?? users.length + index + 1, // Assign default ID if missing
          name: user.name ?? "Unknown", // Default name if missing
          gender: user.gender ?? "Male", // Default gender if missing
          goal: user.goal ?? "None", // Default goal if missing
          assignedTrainer: user.assignedTrainer ?? null, // Default trainer if missing
        }));

        setUsers((prevUsers) => [...prevUsers, ...updatedUsers]);
      };
      // calling the fetchAllusers
      fetchAllusers();
    } catch (error) {
      setisloading(false);
      console.log(error);
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 2000);
    }
  }, []);

  // TODO get list of traniners from the backend
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
    const assigned = users.filter((user) => user.assignedTrainer).length;
    return {
      totalUsers: total,
      assignedUsers: assigned,
      unassignedUsers: total - assigned,
    };
  }, [users]);

  if (isloading) {
    return (
      <>
        <UserTrainerTableSkeleton />
      </>
    );
  } else {
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

        {/* search box */}
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
          <table className="min-w-full table-auto hidden md:table">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">User Name</th>
                <th className="px-4 py-2 text-left text-gray-600 ">Gender</th>
                <th className="px-4 py-2 text-left text-gray-600 ">Goal</th>
                <th className="px-4 py-2 text-left text-gray-600">
                  Assign Trainer
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  onClick={() => {
                    router.push(`/users/${user.id}`);
                  }}
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-50 w-full h-full"
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2 ">{user.gender}</td>
                  <td className="px-4 py-2 ">{user.goal}</td>
                  <td className="px-4 py-2">
                    <div className="relative">
                      <select
                        value={user.assignedTrainer || ""}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => assignTrainer(user.id, e.target.value)}
                        className={`block w-full bg-white border ${
                          user.assignedTrainer
                            ? "border-green-500"
                            : "border-gray-300"
                        } text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white border-1 focus:border-green-500 transition-colors duration-200`}
                      >
                        <option value="">Assign Trainer</option>
                        {trainers.map((trainer) => (
                          <option key={trainer.id} value={trainer.name}>
                            {trainer.name}
                          </option>
                        ))}
                      </select>
                      {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        {user.assignedTrainer ? (
                          <TicketCheckIcon className="" />
                          ) : (
                            <></>
                            )}
                            </div> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* here is mobile ui components */}
          <div className="sm:hidden ">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="border-b border-gray-200 p-4 "
                onClick={() => {
                  router.push(`/users/${user.id}`);
                }}
              >
                <h3 className="font-semibold text-gray-800 mb-2">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Gender: {user.gender}
                </p>
                <p className="text-sm text-gray-600 mb-2">Goal: {user.goal}</p>
                <div className="relative">
                  <select
                    value={user.assignedTrainer || ""}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => assignTrainer(user.id, e.target.value)}
                    className={`block w-full bg-white border ${
                      user.assignedTrainer
                        ? "border-green-500"
                        : "border-gray-300"
                    } text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                  >
                    <option value="">Assign Trainer</option>
                    {trainers.map((trainer) => (
                      <option key={trainer.id} value={trainer.name}>
                        {trainer.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    {/* <ChevronDown size={20} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

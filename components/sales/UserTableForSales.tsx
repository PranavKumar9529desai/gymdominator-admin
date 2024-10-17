"use client";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Users, UserCheck, UserX, Save, Search } from "lucide-react";

interface User {
  id: number;
  name: string;
  gender: string;
  goal: string;
  conversionAttempts: {
    date: Date;
    converted: boolean;
  }[];
}

export default function SalesTeamComponent() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Pranavkumar",
      gender: "M",
      goal: "build muscle",
      conversionAttempts: [
        { date: new Date(2023, 5, 12), converted: false },
        { date: new Date(2023, 6, 12), converted: false },
        { date: new Date(2023, 7, 12), converted: false },
      ],
    },
    {
      id: 12,
      name: "Pra",
      gender: "M",
      goal: "build muscle",
      conversionAttempts: [
        { date: new Date(2023, 5, 12), converted: false },
        { date: new Date(2023, 6, 12), converted: false },
        { date: new Date(2023, 7, 12), converted: false },
      ],
    },
    {
      id: 5,
      name: "Krishna",
      gender: "M",
      goal: "build muscle",
      conversionAttempts: [
        { date: new Date(2023, 5, 12), converted: false },
        { date: new Date(2023, 6, 12), converted: false },
        { date: new Date(2023, 7, 12), converted: false },
      ],
    },
    {
      id: 3,
      name: "shivam",
      gender: "M",
      goal: "build muscle",
      conversionAttempts: [
        { date: new Date(2023, 5, 12), converted: false },
        { date: new Date(2023, 6, 12), converted: false },
        { date: new Date(2023, 7, 12), converted: false },
      ],
    },
    {
      id: 4,
      name: "Sameer",
      gender: "M",
      goal: "build muscle",
      conversionAttempts: [
        { date: new Date(2023, 5, 12), converted: false },
        { date: new Date(2023, 6, 12), converted: false },
        { date: new Date(2023, 7, 12), converted: false },
      ],
    },
    {
      id: 2,
      name: "kumar",
      gender: "M",
      goal: "build muscle",
      conversionAttempts: [
        { date: new Date(2023, 5, 12), converted: false },
        { date: new Date(2023, 6, 12), converted: false },
        { date: new Date(2023, 7, 12), converted: false },
      ],
    },
    {
      id: 9,
      name: "Pranavkumar",
      gender: "M",
      goal: "build muscle",
      conversionAttempts: [
        { date: new Date(2023, 5, 12), converted: false },
        { date: new Date(2023, 6, 12), converted: false },
        { date: new Date(2023, 7, 12), converted: false },
      ],
    },
    // Add more users as needed
  ]);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.goal.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  console.log(searchTerm, filteredUsers);

  const handleConversionChange = (
    userId: number,
    attemptIndex: number,
    converted: boolean
  ) => {
    setUsers(
      filteredUsers.map((user) => {
        if (user.id === userId) {
          const newAttempts = [...user.conversionAttempts];
          newAttempts[attemptIndex] = {
            ...newAttempts[attemptIndex],
            converted,
          };
          return { ...user, conversionAttempts: newAttempts };
        }
        return user;
      })
    );
  };

  const handleSave = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      console.log(`Saving data for user ${userId}:`, user);
      // Implement your save logic here
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Desktop view */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-800">10</p>
            </div>
            <Users className="h-10 w-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Assigned Users</p>
              <p className="text-2xl font-semibold text-gray-800">22</p>
            </div>
            <UserCheck className="h-10 w-10 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unassigned Users</p>
              <p className="text-2xl font-semibold text-gray-800">8</p>
            </div>
            <UserX className="h-10 w-10 text-red-500" />
          </div>
        </div>
      </div>
      {/*  search box  */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              console.log(e.target.value);
              console.log(searchTerm);
              setSearchTerm(e.target.value);
            }}
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search users"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-300 *:text-black *:text-center">
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>1st CA</TableHead>
              <TableHead>2nd CA</TableHead>
              <TableHead>3rd CA</TableHead>
              <TableHead>Save</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="text-center">
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.goal}</TableCell>
                {user.conversionAttempts.map((attempt, index) => (
                  <TableCell key={index} className="">
                    <div className="inline-flex items-center gap-3">
                      {format(attempt.date, "dd MMM yyyy")}

                      <Checkbox
                        checked={attempt.converted}
                        onCheckedChange={(checked) =>
                          handleConversionChange(
                            user.id,
                            index,
                            checked as boolean
                          )
                        }
                      />
                    </div>
                  </TableCell>
                ))}
                <TableCell>
                  <Button onClick={() => handleSave(user.id)} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Gender:</span> {user.gender}
                </div>
                <div>
                  <span className="font-semibold">Goal:</span> {user.goal}
                </div>
                {user.conversionAttempts.map((attempt, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="font-semibold">{`${index + 1}${
                      ["st", "nd", "rd"][index] || "th"
                    } CA:`}</span>
                    <div className="flex items-center space-x-2">
                      <span>{format(attempt.date, "dd MMM yyyy")}</span>
                      <Checkbox
                        checked={attempt.converted}
                        onCheckedChange={(checked) =>
                          handleConversionChange(
                            user.id,
                            index,
                            checked as boolean
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
                <Button
                  onClick={() => handleSave(user.id)}
                  className="w-full mt-4"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, UserCheck, UserMinus } from "lucide-react";

interface User {
  id: number;
  name: string;
  gender: string;
  weight: number;
  goal: string;
  conversionAttempts: {
    date: string;
    converted: boolean;
  }[];
}

export default function UserTableForSalesTeam() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "User 1",
      gender: "M",
      weight: 90,
      goal: "Weight loss",
      conversionAttempts: [
        { date: "2023-06-01", converted: false },
        { date: "2023-06-15", converted: false },
        { date: "2023-06-30", converted: false },
      ],
    },
    {
      id: 2,
      name: "User 2",
      gender: "F",
      weight: 65,
      goal: "Muscle gain",
      conversionAttempts: [
        { date: "2023-06-02", converted: true },
        { date: "2023-06-16", converted: false },
        { date: "2023-06-30", converted: false },
      ],
    },
    // Add more users as needed
  ]);

  const totalUsers = users.length;
  const assignedUsers = users.filter((user) =>
    user.conversionAttempts.some((attempt) => attempt.converted)
  ).length;
  const unassignedUsers = totalUsers - assignedUsers;

  const handleConversionChange = (
    userId: number,
    attemptIndex: number,
    converted: boolean
  ) => {
    setUsers(
      users.map((user) => {
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

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assigned Users
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unassigned Users
            </CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unassignedUsers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Goal</TableHead>
                <TableHead className="text-center">
                  1st Conversion Attempt
                </TableHead>
                <TableHead className="text-center">
                  2nd Conversion Attempt
                </TableHead>
                <TableHead className="text-center">
                  3rd Conversion Attempt
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.weight}</TableCell>
                  <TableCell>{user.goal}</TableCell>
                  {user.conversionAttempts.map((attempt, index) => (
                    <TableCell key={index} className="text-center">
                      <div className=" flex gap-4 items-center justify-center">
                        {attempt.date}

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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

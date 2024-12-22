"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Users, UserCheck, UserX, ArrowUpDown } from "lucide-react";
import { DataTable } from "@/components/Table/UsersTable";
import { DataCard } from "@/components/Table/UserCard";
import { StatusCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AttendanceUser {
  id: number;
  name: string;
  gender: string;
  shift: "Morning" | "Evening";
  todaysAttendance: boolean;
}

const mockUsers: AttendanceUser[] = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    shift: "Morning",
    todaysAttendance: false,
  },
  {
    id: 3,
    name: "Bob Johnson",
    gender: "Male",
    shift: "Morning",
    todaysAttendance: true,
  },
  {
    id: 5,
    name: "Charlie Wilson",
    gender: "Male",
    shift: "Evening",
    todaysAttendance: true,
  },
];

const columns: ColumnDef<AttendanceUser>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        User Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "shift",
    header: "Shift",
  },
  {
    accessorKey: "todaysAttendance",
    header: "Attendance",
    cell: ({ row }) => {
      const attendance = row.getValue("todaysAttendance") as boolean;
      return (
        <div className={`font-medium ${attendance ? "text-green-600" : "text-red-600"}`}>
          {attendance ? "Present" : "Absent"}
        </div>
      );
    },
  },
];

export default function UserAttendance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [shiftFilter, setShiftFilter] = useState<"Morning" | "Evening" | "All">("All");
  const [filteredUsers, setFilteredUsers] = useState<AttendanceUser[]>(mockUsers);

  // Calculate stats
  const totalUsers = mockUsers.length;
  const presentUsers = mockUsers.filter(user => user.todaysAttendance).length;
  const absentUsers = totalUsers - presentUsers;

  const statusCards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      gradient: "blue"
    },
    {
      title: "Present Today",
      value: presentUsers,
      icon: UserCheck,
      gradient: "green"
    },
    {
      title: "Absent Today",
      value: absentUsers,
      icon: UserX,
      gradient: "red"
    },
  ] as const;

  useEffect(() => {
    const filtered = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (shiftFilter === "All" || user.shift === shiftFilter)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, shiftFilter]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Today's Attendance</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusCards.map((card) => (
          <StatusCard key={card.title} {...card} />
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={shiftFilter}
          onValueChange={(value: "Morning" | "Evening" | "All") => setShiftFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Shifts</SelectItem>
            <SelectItem value="Morning">Morning</SelectItem>
            <SelectItem value="Evening">Evening</SelectItem>
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
            <div className="p-4">
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">
                Gender: {user.gender}
              </p>
              <p className="text-sm text-gray-500">
                Shift: {user.shift}
              </p>
              <p className={`text-sm font-medium ${
                user.todaysAttendance ? "text-green-600" : "text-red-600"
              }`}>
                Status: {user.todaysAttendance ? "Present" : "Absent"}
              </p>
            </div>
          )}
        />
      </div>
    </div>
  );
}

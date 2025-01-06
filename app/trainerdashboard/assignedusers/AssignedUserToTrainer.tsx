"use client";
import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Users, UserCheck, Search, ArrowUpDown } from "lucide-react";
import { DataTable } from "@/components/Table/UsersTable";
import { DataCard } from "@/components/Table/UserCard";
import { StatusCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AssignedUser } from "./GetuserassignedTotrainers";

interface AssignedUserToTrainerProps {
  users: AssignedUser[];
}

const columns: ColumnDef<AssignedUser>[] = [
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
    cell: () => <div className="text-gray-500">Not Updated</div>,
  },
  {
    accessorKey: "goal",
    header: "Goal",
    cell: () => <div className="text-gray-500">Not Updated</div>,
  },
];

export default function AssignedUserToTrainer({ users }: AssignedUserToTrainerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<AssignedUser[]>(users);

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.membershipStatus === 'active').length;
  const inactiveUsers = totalUsers - activeUsers;

  const statusCards = [
    {
      title: "Total Assigned Users",
      value: totalUsers,
      icon: Users,
      gradient: "blue"
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      gradient: "green"
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      icon: Users,
      gradient: "red"
    },
  ] as const;

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Assigned Users</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statusCards.map((card) => (
          <StatusCard key={card.title} {...card} />
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2 mb-6">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
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
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-500">{user.phone}</p>
              <div className={`inline-block px-2 py-1 rounded-full text-sm ${
                user.membershipStatus === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {user.membershipStatus}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}

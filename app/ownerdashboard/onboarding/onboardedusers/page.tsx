"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Users, UserCheck, User, ArrowUpDown } from "lucide-react";
import { DataTable } from "@/components/Table/UsersTable";
import { DataCard } from "@/components/Table/UserCard";
import { StatusCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { GetOnBoardingUser } from "./GetOnBoardingUser";

interface User {
  id: number;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  status: "active" | "pending" | "inactive";
}

const calculateStatus = (startDate: Date | null, endDate: Date | null): User['status'] => {
  if (!startDate || !endDate) {
    return "pending";
  }
  // Active status logic - other statuses will be added later
  return "active";
};

export default function OnboardedUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await GetOnBoardingUser();
      if (response) {
        const transformedUsers: User[] = response.users.map(user => ({
          ...user,
          status: calculateStatus(user.startDate, user.endDate)
        }));
        setUsers(transformedUsers);
      }
    };
    fetchUsers();
  }, []);

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const pendingUsers = users.filter((u) => u.status === "pending").length;

  const statusCards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      gradient: "blue",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      gradient: "green",
    },
    {
      title: "Pending Users",
      value: pendingUsers,
      icon: User,
      gradient: "yellow",
    },
  ] as const;

  const columns: ColumnDef<User>[] = [
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
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => {
        const date = row.getValue("startDate") as Date;
        return <div>{date ? date.toLocaleDateString() : "N/A"}</div>;
      },
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        const date = row.getValue("endDate") as Date;
        return <div>{date ? date.toLocaleDateString() : "N/A"}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div
            className={`
            w-fit rounded-full px-4 py-1 text-xs font-semibold text-center
            ${
              status === "active"
                ? "bg-green-100 text-green-800"
                : status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }
          `}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Onboarding Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusCards.map((card) => (
          <StatusCard key={card.title} {...card} />
        ))}
      </div>

      <div className="hidden md:block">
        <DataTable data={users} columns={columns} filterColumn="name" />
      </div>

      <div className="md:hidden">
        <DataCard
          data={users}
          renderCard={(user) => (
            <div className="p-4">
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">
                Start: {user.startDate ? user.startDate.toLocaleDateString() : "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                End: {user.endDate ? user.endDate.toLocaleDateString() : "N/A"}
              </p>
              <div
                className={`
                mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold 
                ${
                  user.status === "active"
                    ? "bg-green-100 text-green-800"
                    : user.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }
              `}
              >
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}



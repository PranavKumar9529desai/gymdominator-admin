'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { Users, ArrowUpDown, Search, UserCheck, UtensilsCrossed } from 'lucide-react';
import { DataTable } from "@/components/Table/UsersTable";
import { DataCard } from "@/components/Table/UserCard";
import { StatusCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { AssignedUser } from './GetuserassignedTotrainers';
import { DietPlan } from './GetallDiets';
import { attachDietPlanToUser } from './AttachDietPlanToUser';

interface Props {
  users: AssignedUser[];
  dietPlans: DietPlan[];
}

const createColumns = (
  dietPlans: DietPlan[], 
  handleAssignment: (userId: string, dietPlanId: string) => Promise<void>
): ColumnDef<AssignedUser>[] => [
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "diet",
    header: "Assign Diet Plan",
    cell: ({ row }) => {
      const hasDiet = !!row.original.dietPlanId;
      const currentPlan = dietPlans.find(plan => plan.id === row.original.dietPlanId);
      
      return (
        <div className="flex flex-col gap-1">
          <Select
            onValueChange={(value) => {
              if (hasDiet) {
                if (confirm('This will replace the current diet plan. Continue?')) {
                  handleAssignment(row.original.id, value);
                }
              } else {
                handleAssignment(row.original.id, value);
              }
            }}
          >
            <SelectTrigger className={`w-[200px] ${
              hasDiet ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <SelectValue placeholder={
                hasDiet 
                  ? `Current: ${currentPlan?.name || 'Unknown Plan'}` 
                  : "No diet plan assigned"
              } />
            </SelectTrigger>
            <SelectContent>
              {dietPlans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id.toString()}>
                  {plan.name} ({plan.targetCalories} cal)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasDiet && (
            <p className="text-xs text-green-600">
              Active Plan: {currentPlan?.name}
            </p>
          )}
        </div>
      );
    },
  }
];

export default function AssignDietToUsers({ users, dietPlans }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Calculate stats
  const totalUsers = users.length;
  const usersWithDiet = users.filter(u => u.dietPlanId).length;
  const usersWithoutDiet = totalUsers - usersWithDiet;

  const statusCards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      gradient: "blue"
    },
    {
      title: "Users with Diet Plan",
      value: usersWithDiet,
      icon: UserCheck,
      gradient: "green"
    },
    {
      title: "Users without Diet Plan",
      value: usersWithoutDiet,
      icon: UtensilsCrossed,
      gradient: "red"
    },
  ] as const;

  const handleDietAssignment = async (userId: string, dietPlanId: string) => {
    try {
      const result = await attachDietPlanToUser(userId, dietPlanId);
      if (result.success) {
        toast.success(result.message);
        // Update local state to reflect the change
        setFilteredUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, dietPlanId: parseInt(dietPlanId) } : user
        ));
      } else {
        toast.error("Failed to assign diet plan");
      }
    } catch (error) {
      toast.error("Error assigning diet plan");
    }
  };

  const columns = useMemo(
    () => createColumns(dietPlans, handleDietAssignment),
    [dietPlans]
  );

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Diet Plan Assignment</h1>

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
          renderCard={(user) => {
            const hasDiet = !!user.dietPlanId;
            const currentPlan = dietPlans.find(p => p.id === user.dietPlanId);
            
            return (
              <div className="p-4 space-y-2">
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <Select
                  onValueChange={(value) => handleDietAssignment(user.id, value)}
                >
                  <SelectTrigger className={`w-full mt-2 ${
                    hasDiet ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <SelectValue placeholder={
                      hasDiet ? "Change Diet Plan" : "No diet plan assigned"
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {dietPlans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id.toString()}>
                        {plan.name} ({plan.targetCalories} cal)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {hasDiet && (
                  <div className="mt-2 text-xs text-green-600">
                    Current Plan: {currentPlan?.name}
                  </div>
                )}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

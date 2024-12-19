"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { AssignTrainerToUsers } from "@/app/actions/gym/owner/AssignTrainerToUsers";

interface UserTraienerAssignmentProps {
  users: UserType[];
  trainers: Trainer[];
}

export default function TrainerAssignment({
  users,
  trainers,
}: UserTraienerAssignmentProps) {
  const [search, setSearch] = useState("");
  const [assignedTrainers, setAssignedTrainers] = useState<Record<number, number>>(() => {
    // Initialize with existing trainer assignments
    const initialAssignments: Record<number, number> = {};
    users.forEach(user => {
      if (user.trainerid) {
        initialAssignments[user.id] = user.trainerid;
      }
    });
    return initialAssignments;
  });

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.HealthProfile.fullname.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // Calculate stats
  const stats = useMemo(() => {
    const assigned = Object.keys(assignedTrainers).length;
    return {
      total: users.length,
      assigned,
      unassigned: users.length - assigned,
    };
  }, [users, assignedTrainers]);

  const handleTrainerAssignment = async (userId: number, trainerId: string) => {
    console.log("user id is ", userId);
    console.log("trainer id is ", trainerId);
    try {
      const data = await AssignTrainerToUsers(userId.toString(), trainerId);

      // Update local state
      setAssignedTrainers((prev) => {
        if (trainerId === "0") {
          const { [userId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [userId]: parseInt(trainerId) };
      });

      // Get trainer and user names for the toast message
      const trainer = trainers.find(t => t.id === parseInt(trainerId));
      const user = users.find(u => u.id === userId);
      
      if (trainerId === "0") {
        toast.success(`Trainer unassigned from ${user?.name || 'user'}`);
      } else {
        toast.success(data.msg || `${trainer?.name || 'Trainer'} assigned to ${user?.name || 'user'}`);
      }
    } catch (error) {
      console.error("Error assigning trainer:", error);
      toast.error("Failed to assign trainer. Please try again.");
    }
  };

  return (
    <div className="space-y-6 p-4">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold">User-Trainer Assignment</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-400 to-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Assigned Users
            </CardTitle>
            <UserCheck className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats.assigned}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-400 to-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Unassigned Users
            </CardTitle>
            <UserX className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats.unassigned}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Weight (kg)</TableHead>
              <TableHead>Height (cm)</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Assign Trainer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.HealthProfile.fullname}
                </TableCell>
                <TableCell>{user.HealthProfile.weight}</TableCell>
                <TableCell>{user.HealthProfile.height}</TableCell>
                <TableCell>{user.HealthProfile.goal}</TableCell>
                <TableCell>
                  <Select
                    value={user.trainerid?.toString() || assignedTrainers[user.id]?.toString() || "0"}
                    onValueChange={(value) =>
                      handleTrainerAssignment(user.id, value)
                    }
                  >
                    <SelectTrigger
                      className={`w-[180px] ${
                        user.trainerid || assignedTrainers[user.id]
                          ? "bg-green-100 hover:bg-green-200"
                          : "bg-red-100 hover:bg-red-200"
                      }`}
                    >
                      <SelectValue placeholder="Select Trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Unassigned</SelectItem>
                      {trainers.map((trainer) => (
                        <SelectItem 
                          key={trainer.id} 
                          value={trainer.id.toString()}
                          className={user.trainerid === trainer.id ? "bg-blue-100" : ""}
                        >
                          {trainer.name} {user.trainerid === trainer.id ? "(Currently Assigned)" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <h3 className="font-semibold">{user.HealthProfile.fullname}</h3>
                <div className="text-sm text-muted-foreground">
                  Weight: {user.HealthProfile.weight} kg | Height:{" "}
                  {user.HealthProfile.height} cm
                </div>
                <div className="text-sm">Goal: {user.HealthProfile.goal}</div>
                <Select
                  value={user.trainerid?.toString() || assignedTrainers[user.id]?.toString() || "0"}
                  onValueChange={(value) =>
                    handleTrainerAssignment(user.id, value)
                  }
                >
                  <SelectTrigger
                    className={`w-full ${
                      user.trainerid || assignedTrainers[user.id]
                        ? "bg-green-100 hover:bg-green-200"
                        : "bg-red-100 hover:bg-red-200"
                    }`}
                  >
                    <SelectValue placeholder="Select Trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Unassigned</SelectItem>
                    {trainers.map((trainer) => (
                      <SelectItem 
                        key={trainer.id} 
                        value={trainer.id.toString()}
                        className={user.trainerid === trainer.id ? "bg-blue-100" : ""}
                      >
                        {trainer.name} {user.trainerid === trainer.id ? "(Currently Assigned)" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  Search,
  Clock,
  UserX,
  Users as UsersIcon,
} from "lucide-react";
// TODO do a backend call get the array from the api
// Mock data

const mockUsers = [
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

export default function UserAttendance() {
  // mock users data from the backend
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [shiftFilter, setShiftFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");

  useEffect(() => {
    let result = users;
    if (searchTerm) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (shiftFilter !== "All") {
      result = result.filter((user) => user.shift === shiftFilter);
    }
    if (genderFilter !== "All") {
      result = result.filter((user) => user.gender === genderFilter);
    }
    setFilteredUsers(result);
  }, [searchTerm, shiftFilter, genderFilter, users]);

  return (
    <div className="container mx-auto p-6 space-y-6 lg:px-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 lg:text-left text-center lg:my-4 my-2">
        User Attendance
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Users
            </CardTitle>
            <Users className="h-10 w-10 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">{users.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-500 to-rose-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Filtered Users
            </CardTitle>
            <UserCheck className="h-10 w-10 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">
              {filteredUsers.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select onValueChange={(value) => setShiftFilter(value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Clock className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Shifts</SelectItem>
            <SelectItem value="Morning">Morning</SelectItem>
            <SelectItem value="Afternoon">Afternoon</SelectItem>
            <SelectItem value="Evening">Evening</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setGenderFilter(value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <UsersIcon className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Genders</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-grow">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500  " />
            <Input
              placeholder="Search users..."
              className="pl-8 "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* table view for the desktop view */}
      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.shift}</TableCell>
                <TableCell className="">
                  {user.todaysAttendance == true ? (
                    <UserCheck className="text-green-600" />
                  ) : (
                    <UserX className="text-red-600" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* mobile view */}

      <div className="lg:hidden block pb-10">
        {filteredUsers.map((user) => {
          return (
            <div
              key={user.id}
              className="flex  flex-col items-start  border-b-2 py-4 space-y-2 font-semibold"
            >
              <div className="">
                <div className="">Name: {user.name}</div>
                <div>Gender : {user.gender}</div>
                <div>Shift : {user.shift}</div>
              </div>
              <div className="flex h-6 items-center gap-2">
                <div>Today's Attendance :</div>
                <UserX className="text-red-600 h-5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

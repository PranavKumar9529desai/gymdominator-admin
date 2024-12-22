"use client"

import { DataTable } from "@/components/Table/UsersTable"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Check, X, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusCard } from "@/components/common/StatusCard"

// Define the data type
interface AttendanceRecord {
  id: string
  userName: string
  attendance: boolean
  time: string
  date: Date
}

// Dummy data
const attendanceData: AttendanceRecord[] = [
  {
    id: "1",
    userName: "John Doe",
    attendance: true,
    time: "09:30 AM",
    date: new Date("2024-03-20")
  },
  {
    id: "2",
    userName: "Jane Smith",
    attendance: false,
    time: "-",
    date: new Date("2024-03-20")
  },
  {
    id: "3",
    userName: "Bob Johnson",
    attendance: true,
    time: "10:15 AM",
    date: new Date("2024-03-20")
  },
]

// Define columns
const columns: ColumnDef<AttendanceRecord>[] = [
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "attendance",
    header: "Attendance",
    cell: ({ row }) => {
      const attendance = row.getValue("attendance") as boolean
      return (
        <div className="flex justify-center">
          {attendance ? (
            <Check className="text-green-600" />
          ) : (
            <X className="text-red-600" />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "time",
    header: "Check-in Time",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as Date
      return <div>{date.toLocaleDateString()}</div>
    },
  },
]

export default function AttendancePage() {
  // Calculate attendance stats
  const totalUsers = attendanceData.length
  const presentUsers = attendanceData.filter(user => user.attendance).length
  const absentUsers = totalUsers - presentUsers

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
      icon: Check,
      gradient: "green"
    },
    {
      title: "Absent Today",
      value: absentUsers,
      icon: X,
      gradient: "red"
    }
  ] as const

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Today's Attendance</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statusCards.map((card) => (
          <StatusCard key={card.title} {...card} />
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <DataTable
          data={attendanceData}
          columns={columns}
          filterColumn="userName"
        />
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {attendanceData.map((record) => (
          <div 
            key={record.id}
            className="bg-white p-4 rounded-lg shadow space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{record.userName}</span>
              {record.attendance ? (
                <Check className="text-green-600" />
              ) : (
                <X className="text-red-600" />
              )}
            </div>
            <div className="text-sm text-gray-500">
              Time: {record.time}
            </div>
            <div className="text-sm text-gray-500">
              Date: {record.date.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
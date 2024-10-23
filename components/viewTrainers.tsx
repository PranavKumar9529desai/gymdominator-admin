"use client"
import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Clock } from 'lucide-react'

interface Trainer {
  id: number
  name: string
  assignedClients: number
  shift: 'Morning' | 'Evening'
}

export default function ViewTrainersList() {
  const [trainers, setTrainers] = useState<Trainer[]>([
    { id: 1, name: "John Doe", assignedClients: 5, shift: "Morning" },
    { id: 2, name: "Jane Smith", assignedClients: 7, shift: "Evening" },
    { id: 3, name: "Bob Johnson", assignedClients: 3, shift: "Morning" },
    { id: 4, name: "Alice Brown", assignedClients: 6, shift: "Evening" },
    { id: 5, name: "Charlie Wilson", assignedClients: 4, shift: "Morning" },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [shiftFilter, setShiftFilter] = useState<'Morning' | 'Evening' | 'All'>('All')
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>(trainers)

  useEffect(() => {
    const filtered = trainers.filter(trainer => 
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (shiftFilter === 'All' || trainer.shift === shiftFilter)
    )
    setFilteredTrainers(filtered)
  }, [searchTerm, shiftFilter, trainers])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trainer List</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trainers</CardTitle>
            <Users className="h-10 w-10 text-blue-6p00" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{trainers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filtered Trainers</CardTitle>
            <UserCheck className="h-10 w-10 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{filteredTrainers.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search trainers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/2"
        />
        <Select value={shiftFilter} onValueChange={(value: 'Morning' | 'Evening' | 'All') => setShiftFilter(value)}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Filter by shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Shifts</SelectItem>
            <SelectItem value="Morning">Morning</SelectItem>
            <SelectItem value="Evening">Evening</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trainer Name</TableHead>
            <TableHead>Assigned Clients</TableHead>
            <TableHead>Shift</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTrainers.map((trainer) => (
            <TableRow key={trainer.id}>
              <TableCell className="font-medium">{trainer.name}</TableCell>
              <TableCell>{trainer.assignedClients}</TableCell>
              <TableCell className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {trainer.shift}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
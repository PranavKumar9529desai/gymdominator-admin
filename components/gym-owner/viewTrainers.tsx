"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { TrainersAtom } from "@/app/state/Atoms/TrainersAtom";

interface ViewTrainersListProps {
  Trainers: TrainerType[];
}

export default function ViewTrainersList({ Trainers }: ViewTrainersListProps) {
  const router = useRouter();
  const [trainersAtoms] = useRecoilState(TrainersAtom);
  const [trainers] = useState<TrainerType[]>(Trainers);
  const [searchTerm, setSearchTerm] = useState("");
  const [shiftFilter, setShiftFilter] = useState<"Morning" | "Evening" | "All">(
    "All"
  );
  const [filteredTrainers, setFilteredTrainers] =
    useState<TrainerType[]>(trainers);

  useEffect(() => {
    console.log("Trainers are ", trainersAtoms);
    const filtered = trainers.filter(
      (trainer) =>
        trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (shiftFilter === "All" || trainer.shift === shiftFilter)
    );
    setFilteredTrainers(filtered);
  }, [searchTerm, shiftFilter, trainers]);

  const handleTrainerClick = (trainer: Trainer) => {
    router.push(
      `addtrainers?id=${trainer.id}&name=${encodeURIComponent(
        trainer.name
      )}&shift=${trainer.shift}&image=${trainer.image}`
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trainer List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold text-white">
              Total Trainers
            </CardTitle>
            <Users className="h-12 w-12 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white pb-2">
              {trainers.length}
            </div>
            <p className="text-sm font-light text-white">
              The total number of trainers available in your gym.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 via-teal-500 to-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold text-white">
              Filtered Trainers
            </CardTitle>
            <UserCheck className="h-12 w-12 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white pb-2">
              {filteredTrainers.length}
            </div>
            <p className="text-sm font-light text-white">
              The number of trainers that match the current filter criteria.
            </p>
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
        <Select
          value={shiftFilter}
          onValueChange={(value: "Morning" | "Evening" | "All") =>
            setShiftFilter(value)
          }
        >
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
            <TableRow
              key={trainer.id}
              onClick={() => handleTrainerClick(trainer)}
              className="cursor-pointer hover:bg-gray-100"
            >
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
  );
}

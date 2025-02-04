"use client";
import { AssignTrainerToUsers } from "@/app/(common)/actions/gym/owner/AssignTrainerToUsers";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { UserCheck, UserX, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { StatusCard } from "./StatusCard";

interface UserTraienerAssignmentProps {
	users: UserType[];
	trainers: Trainer[];
}

export default function TrainerAssignment({
	users,
	trainers,
}: UserTraienerAssignmentProps) {
	const [search, setSearch] = useState("");
	const [assignedTrainers, setAssignedTrainers] = useState<
		Record<number, number>
	>(() => {
		// Initialize with existing trainer assignments
		const initialAssignments: Record<number, number> = {};
		users.forEach((user) => {
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
				user.HealthProfile.fullname
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				" ",
		);
	}, [users, search]);

	// Calculate stats
	const stats = {
		totalUsers: users.length,
		assignedUsers: users.filter(
			(user) => user.trainerid || assignedTrainers[user.id],
		).length,
		unassignedUsers: users.filter(
			(user) => !user.trainerid && !assignedTrainers[user.id],
		).length,
	};

	const statusCards = [
		{
			title: "Total Users",
			value: stats.totalUsers,
			icon: Users,
			gradient: "blue",
		},
		{
			title: "Assigned Users",
			value: stats.assignedUsers,
			icon: UserCheck,
			gradient: "green",
		},
		{
			title: "Unassigned Users",
			value: stats.unassignedUsers,
			icon: UserX,
			gradient: "red",
		},
	] as const;

	const handleTrainerAssignment = async (userId: number, trainerId: string) => {
		console.log("user id is ", userId);
		console.log("trainer id is ", trainerId);
		try {
			const data = await AssignTrainerToUsers(userId.toString(), trainerId);

			// Update local state
			setAssignedTrainers((prev) => {
				if (trainerId === "0") {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { [userId]: _, ...rest } = prev;
					return rest;
				}
				return { ...prev, [userId]: Number.parseInt(trainerId) };
			});

			// Get trainer and user names for the toast message
			const trainer = trainers.find((t) => t.id === Number.parseInt(trainerId));
			const user = users.find((u) => u.id === userId);

			if (trainerId === "0") {
				toast.success(`Trainer unassigned from ${user?.name || "user"}`);
			} else {
				toast.success(
					data.msg ||
						`${trainer?.name || "Trainer"} assigned to ${user?.name || "user"}`,
				);
			}
		} catch (error) {
			console.error("Error assigning trainer:", error);
			toast.error("Failed to assign trainer. Please try again.");
		}
	};

	return (
		<div className="container mx-auto p-6 space-y-4">
			<Toaster position="top-right" />
			<h1 className="text-3xl font-bold text-center ">
				User-Trainer Assignment
			</h1>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{statusCards.map((card) => (
					<StatusCard key={card.title} {...card} />
				))}
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
									{user.HealthProfile?.fullname || ""}
								</TableCell>
								<TableCell>{user.HealthProfile?.weight || ""}</TableCell>
								<TableCell>{user.HealthProfile?.height || ""}</TableCell>
								<TableCell>{user.HealthProfile?.goal || ""}</TableCell>
								<TableCell>
									<Select
										value={
											user.trainerid?.toString() ||
											assignedTrainers[user.id]?.toString() ||
											"0"
										}
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
													className={
														user.trainerid === trainer.id ? "bg-blue-100" : ""
													}
												>
													{trainer.name}{" "}
													{user.trainerid === trainer.id
														? "(Currently Assigned)"
														: ""}
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
								<h3 className="font-semibold">
									{user.HealthProfile?.fullname || ""}
								</h3>
								<div className="text-sm text-muted-foreground">
									Weight: {user.HealthProfile.weight} kg | Height:{" "}
									{user.HealthProfile?.height} cm
								</div>
								<div className="text-sm">Goal: {user.HealthProfile.goal}</div>
								<Select
									value={
										user.trainerid?.toString() ||
										assignedTrainers[user.id]?.toString() ||
										"0"
									}
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
												className={
													user.trainerid === trainer.id ? "bg-blue-100" : ""
												}
											>
												{trainer.name}{" "}
												{user.trainerid === trainer.id
													? "(Currently Assigned)"
													: ""}
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

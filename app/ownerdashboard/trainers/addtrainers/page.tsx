"use client";
import { useSearchParams } from "next/navigation";
import AddTrainer from "@/components/gym-owner/EditTrainers";

export default function AddTrainerPage() {
  const searchParams = useSearchParams();

  const addTrainerProps = {
    id: searchParams.get("id") ? parseInt(searchParams.get("id")!) : undefined,
    name: searchParams.get("name") || "",
    shift: (searchParams.get("shift") as "morning" | "evening") || "morning",
    image: searchParams.get("image"),
    rating: searchParams.get("rating")
      ? parseInt(searchParams.get("rating")!)
      : 0,
  };

  return (
    <div className="container mx-auto p-4">
      <AddTrainer addTrainerProps={addTrainerProps} />
    </div>
  );
}

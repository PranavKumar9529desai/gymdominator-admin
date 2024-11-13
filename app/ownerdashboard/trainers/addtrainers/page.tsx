"use client";

import AddTrainer from "@/components/gym-owner/AddTrainer";
import { useSearchParams } from "next/navigation";

export default function AddTrainerPage() {
  const searchParams = useSearchParams();

  const addTrainerProps = {
    id: searchParams.get("id") ? parseInt(searchParams.get("id")!) : undefined,
    name: searchParams.get("name") || "",
    shift: (searchParams.get("shift") as "morning" | "evening") || "morning",
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

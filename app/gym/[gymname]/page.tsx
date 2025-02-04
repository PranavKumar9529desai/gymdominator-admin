import React from "react";
import FetchGymData from "./FetchGymData";
import Gym from "./Gym";

// Reintroduce generateStaticParams for static generation
interface GymNameResponse {
  msg: "success" | "unexpected error";
  gyms?: { name: string }[];
}

export async function generateStaticParams() {
  // Fetch all gym names to pre-render their pages at build time
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/public/gym/allgymnames`);
    const data: GymNameResponse = await response.json();
    if (data.msg === "success" && data.gyms) {
      return data.gyms.map((gym) => ({
        gymname: gym.name,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching gyms for static params:", error);
    return [];
  }
}

interface PageProps {
  params: {
    gymname: string;
  };
}

const GymPage = async ({ params }: PageProps) => {
  const { gymname } = params;
  console.log("gymname received:", gymname);

  const gymData = await FetchGymData(gymname);

  if (!gymData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Gym not found</h1>
      </div>
    );
  }

  return (
    <div>
      <Gym gymData={gymData} />
    </div>
  );
};

export default GymPage;

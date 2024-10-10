import React from "react";
import Image from "next/image";
import { Calendar, Phone, MapPin, TrendingUp, Award } from "lucide-react";
import UserProfileImage from "@/app/assests/profileImage.jpeg";

// TODO add get user data from the backend 
export default function UserProfileCard() {
  // Temporary data
  const userData = {
    // photo: "/placeholder.svg?height=80&width=80",
    name: "John Doe",
    challengeName: "30-Day Fitness Challenge",
    joinedDate: "May 1, 2023",
    completionDate: "May 30, 2023",
    contact: "+1 (123) 456-7890",
    address: "123 Fitness Street, Gym City, 12345",
  };

  const handleCheckProgress = () => {
    console.log("Checking progress...");
    // Add navigation or modal opening logic here
  };

  return (
    <div className=" bg-slate-600 flex  px-4 py-2  lg:w-full h-screen justify-center items-center lg:px-1 lg:py-1">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-auto container">
        <div className="bg-gradient-to-tr from-blue-600 to-violet-600 text-white p-4">
          <div className="flex items-center">
            <div className="relative w-20 h-20 mr-4">
              <Image
                src={UserProfileImage}
                alt={`${userData.name}'s profile picture`}
                layout="fill"
                objectFit="cover"
                className="rounded-full border-2 border-white"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-blue-200 flex items-center text-nowrap text-sm lg:text-base">
                <Award className="w-4 h-4 mr-1" />
                {userData.challengeName}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm text-gray-500 block mb-1">
                Joined Date
              </label>
              <p className="font-semibold text-gray-800 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                {userData.joinedDate}
              </p>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-500 block mb-1">
                Completion Date
              </label>
              <p className="font-semibold text-gray-800 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                {userData.completionDate}
              </p>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-500 block mb-1">
                Contact
              </label>
              <p className="font-semibold text-gray-800 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                {userData.contact}
              </p>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-500 block mb-1">
                Address
              </label>
              <p className="font-semibold text-gray-800 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                {userData.address}
              </p>
            </div>
          </div>
          <button
            // onClick={handleCheckProgress}
            className="
          bg-gradient-to-tr from-blue-600 to-violet-600 
          mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
          >
            Check Progress
            <TrendingUp className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

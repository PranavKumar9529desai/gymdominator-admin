import React from "react";
import Image from "next/image";
import { Calendar, Phone, MapPin, TrendingUp } from "lucide-react";
import profilImage from "@/app/assests/profileImage.jpeg"
interface UserProfileCardProps {
  photo: string;
  name: string;
  challengeName: string;
  joinedDate: string;
  completionDate: string;
  contact: string;
  address: string;
  onCheckProgress: () => void;
}

export default function UserProfileCard({
  params,
}: {
  params: { userid: string };
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto">
      <div className="p-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={profilImage}
            alt={`${"name"}'s profile picture`}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="space-y-3">
          <div className="flex  items-center ">
            <label className="text-sm text-gray-500">Name:</label>
            <p className="font-semibold text-gray-800">{" pranav desai"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Challenge Name:</label>
            <p className="font-semibold text-gray-800">{"challengeName"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-1" /> Joined Date:
            </label>
            <p className="font-semibold text-gray-800">{"joinedDate"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-1" /> Completion Date:
            </label>
            <p className="font-semibold text-gray-800">{"completionDate"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500 flex items-center">
              <Phone className="w-4 h-4 mr-1" /> Contact:
            </label>
            <p className="font-semibold text-gray-800">{"contact"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500 flex items-center">
              <MapPin className="w-4 h-4 mr-1" /> Address:
            </label>
            <p className="font-semibold text-gray-800">{"address"}</p>
          </div>
        </div>
        <button
          //   onClick={onCheckProgress}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
        >
          Check Progress
          <TrendingUp className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

"use client";
export const dynamic = 'force-dynamic'
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Phone, Mail, Key, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import NoGymDetails from "./NoGymDetails";


interface GymDetails {
  gym_name: string;
  gym_logo: string;
  address: string;
  phone_number: string;
  Email: string;
  gymauthtoken: string; // Add auth token to interface
}

export default function ViewGymDetails({
  gymDetails,
}: {
  gymDetails: GymDetails | null;
}) {
  const router = useRouter();

  if (!gymDetails) {
    return (
     <NoGymDetails /> 
    );
  }

  const handleEdit = () => {
    const params = new URLSearchParams({
      name: gymDetails.gym_name,
      logo: gymDetails.gym_logo,
      address: gymDetails.address,
      phone: gymDetails.phone_number,
      email: gymDetails.Email,
      authToken: gymDetails.gymauthtoken
    });
    router.push(`/ownerdashboard/gymdetails/editgymdetails?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6  w-full text-center ">Gym Details</h1>
      <Card className="bg-white shadow-lg">
        <CardHeader className="bg-indigo-700 text-white relative">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              {gymDetails?.gym_name}
            </CardTitle>
            
            {/* Three-dot menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-indigo-600">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  Edit Gym Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              {gymDetails?.gym_logo && (
                <Image
                  src={gymDetails.gym_logo}
                  alt={`${gymDetails.gym_name} logo`}
                  width={200}
                  height={200}
                  className="rounded-lg border border-gray-200 shadow-md object-cover"
                />
              )}
            </div>
            
            <div className="flex-grow space-y-6">
              <div className="grid gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Address</h2>
                    <p className="text-gray-700">{gymDetails?.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Phone Number</h2>
                    <p className="text-gray-700">{gymDetails?.phone_number}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Email</h2>
                    <p className="text-gray-700">{gymDetails?.Email}</p>
                  </div>
                </div>

                {gymDetails?.gymauthtoken && (
                  <div className="flex items-start gap-3">
                    <Key className="h-6 w-6 text-indigo-600 mt-1" />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Auth Token</h2>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded-md border border-gray-200">
                        {gymDetails.gymauthtoken}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Phone, Mail } from "lucide-react";


interface GymDetails {
      gym_name: string;
      gym_logo: string;
      address: string;
      phone_number: string;
      Email: string;
};

export default function ViewGymDetails({
  gymDetails,
}: {
 gymDetails :  GymDetails;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gym Details</h1>
      <Card className="bg-white shadow-lg">
        <CardHeader className="bg-indigo-700 text-white">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            {gymDetails?.gym_name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              {gymDetails?.gym_logo && (
                <Image
                  src={gymDetails.gym_logo}
                  alt={`${gymDetails.gym_name} logo`}
                  width={100}
                  height={100}
                  className="rounded-lg border border-gray-200 o"
                />
              )}
            </div>
            <div className="flex-grow space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Address
                  </h2>
                  <p className="text-gray-700">{gymDetails?.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Phone Number
                  </h2>
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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

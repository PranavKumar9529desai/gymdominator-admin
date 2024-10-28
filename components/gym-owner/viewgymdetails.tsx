import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Phone, Mail } from "lucide-react";

// This would typically come from your API or state management
const gymDetails = {
  name: "FitZone Elite",
  logo: "/placeholder.svg?height=100&width=100",
  address: "123 Fitness Street, Muscle City, ST 12345",
  phone: "+1 (555) 123-4567",
  email: "info@fitzone-elite.com",
};

export default function ViewGymDetails() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gym Details</h1>
      <Card className="bg-white shadow-lg">
        <CardHeader className="bg-indigo-700 text-white">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            {gymDetails.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <Image
                src={gymDetails.logo}
                alt={`${gymDetails.name} logo`}
                width={100}
                height={100}
                className="rounded-lg border border-gray-200"
              />
            </div>
            <div className="flex-grow space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Address
                  </h2>
                  <p className="text-gray-700">{gymDetails.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Phone Number
                  </h2>
                  <p className="text-gray-700">{gymDetails.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Email</h2>
                  <p className="text-gray-700">{gymDetails.email}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

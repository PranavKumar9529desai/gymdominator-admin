"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Phone, Mail } from "lucide-react";

// Define types for the gym data
type GymDetails = {
  name: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
};

export default function ViewGymDetails() {
  const [gymDetails, setGymDetails] = useState<GymDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/gymdetails`,
          {
            data: { name: "awd" },
          }
        );
        console.log(response);
        if (response.status === 200 && response.data.gym) {
          const { gym_name, gym_logo, address, phone_number, Email } =
            response.data.gym;
          console.log(gym_name, gym_logo, address, phone_number);
          setGymDetails({
            name: gym_name,
            logo: gym_logo,
            address: address,
            phone: phone_number,
            email: Email,
          });
        } else {
          setError("Failed to load gym details.");
        }
      } catch (err) {
        setError("Error fetching gym details.");
      } finally {
        setLoading(false);
      }
    };

    fetchGymDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gym Details</h1>
      <Card className="bg-white shadow-lg">
        <CardHeader className="bg-indigo-700 text-white">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            {gymDetails?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              {gymDetails?.logo && (
                <Image
                  src={gymDetails.logo}
                  alt={`${gymDetails.name} logo`}
                  width={100}
                  height={100}
                  className="rounded-lg border border-gray-200"
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
                  <p className="text-gray-700">{gymDetails?.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Email</h2>
                  <p className="text-gray-700">{gymDetails?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

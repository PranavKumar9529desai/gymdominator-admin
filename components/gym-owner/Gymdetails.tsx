"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Image as ImageIcon,
} from "lucide-react";

export default function GymDetails() {
  const [formData, setFormData] = useState({
    gym_name: "",
    gym_logo: null as File | null,
    address: "",
    phone_number: "",
    Email: "",
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        gym_logo: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with data: ", formData);
    try {
      let logoBase64 = null;
      if (formData.gym_logo) {
        logoBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          // @ts-nocheck
          reader.readAsDataURL(formData.gym_logo);
        });
      }

      const payload = {
        gym_name: formData.gym_name,
        gym_logo: logoBase64, // Base64 encoded image for D1 database
        address: formData.address,
        phone_number: formData.phone_number,
        Email: formData.Email,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/creategym`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Gym details submitted successfully:", response.data);
      } else {
        console.log("Failed to submit gym details:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-center">
          Enter Gym Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="gymName">Gym Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="gym_name"
                value={formData.gym_name}
                onChange={handleInputChange}
                placeholder="Enter gym name"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Gym Logo</Label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-gray-400" />
                )}
              </div>
              <Input
                id="gym_logo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" />
              <Textarea
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter gym address"
                className="pl-10 min-h-[80px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  type="tel"
                  placeholder="Enter phone number"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Enter email address"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-indigo-600  text-white text-base "
          >
            Save Gym Details
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

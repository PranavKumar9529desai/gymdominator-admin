"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PostGymDetails from "@/app/actions/gym/PostGymDetailsSA";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Loader from "@/app/ownerdashboard/gymdetails/editgymdetails/loading";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Image as ImageIcon,
} from "lucide-react";
import uploadImage from "@/app/actions/clouldnary/UploadImageSA";

export default function GymDetails() {
  const router = useRouter();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [Loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    gym_name: "",
    gym_logo: null as File | null,
    address: "",
    phone_number: "",
    Email: "",
  });
  console.log("image link is this ",uploadedImageUrl);
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
    setLoading(true);
    console.log("Form submitted with data: ", formData);
    if (formData.gym_logo && logoPreview) {
      try {
        const response = await fetch("/api/uploadimage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: logoPreview }),
        });

        const data = await response.json();
        console.log("Data from the image upload is ", data);
        if (response.ok) {
          const gym_image_url = data.url;
          console.log("gym url from the handleSubmit is ", gym_image_url);
          setUploadedImageUrl(gym_image_url);
          console.log("gym url from the handleSubmit is ", uploadedImageUrl);
          console.log("Form data is ", formData);
          console.log("postgym is called", PostGymDetails);
          const gym = await PostGymDetails(JSON.stringify(formData), gym_image_url);
          console.log("gym is created", gym);
          const  gymid = gym.id 
          console.log("gymid is ", gymid);
          setLoading(false);
          router.push(
            `/ownerdashboard/gymdetails/viewgymdetails?gymid=${gym.id}`
          );
        } else {
          setLoading(false);
          alert("Image upload failed: " + data.error);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error uploading image or posting gym details:", error);
        alert("An error occurred during upload.");
      }
    } else {
      setLoading(false);

      alert("Please upload the image");
    }
  };

  if (Loading) {
    return (
      <>
        <Loader />
      </>
    );
  } else {
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
}

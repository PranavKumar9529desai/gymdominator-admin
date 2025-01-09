"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2';
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PostGymDetails from "./PostGymDetailsSA";
import Image from "next/image";

const formSchema = z.object({
  gym_name: z.string().nonempty("Gym name is required"),
  gym_logo: z.string().nonempty("Gym logo is required"),
  address: z.string().nonempty("Address is required"),
  phone_number: z.string().nonempty("Phone number is required"),
  Email: z.string().nonempty("Email is required").email("Invalid email address"),
});

export default function CreateGymDetails() {
  const router = useRouter();
  const [Loading, setLoading] = useState<boolean>(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gym_name: "",
      gym_logo: "",
      address: "",
      phone_number: "",
      Email: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("gym_logo", file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await Swal.fire({
      title: 'Review Your Gym Details',
      html: `
        <div class="bg-white p-6 rounded-xl shadow-sm">
          <div class="space-y-3">
            <div class="flex items-center border-b border-gray-100 py-3">
              <span class="text-gray-600 font-medium w-32 shrink-0">Gym Name:</span>
              <span class="text-gray-900 ml-4 truncate text-left">${data.gym_name}</span>
            </div>
            <div class="flex items-center border-b border-gray-100 py-3">
              <span class="text-gray-600 font-medium w-32 shrink-0">Address:</span>
              <span class="text-gray-900 ml-4 truncate text-left">${data.address}</span>
            </div>
            <div class="flex items-center border-b border-gray-100 py-3">
              <span class="text-gray-600 font-medium w-32 shrink-0">Phone:</span>
              <span class="text-gray-900 ml-4 truncate text-left">${data.phone_number}</span>
            </div>
            <div class="flex items-center border-b border-gray-100 py-3">
              <span class="text-gray-600 font-medium w-32 shrink-0">Email:</span>
              <span class="text-gray-900 ml-4 truncate text-left">${data.Email}</span>
            </div>
            ${logoPreview ? `
              <div class="mt-4">
                <p class="text-gray-600 font-medium mb-2 text-left">Gym Logo</p>
                <img src="${logoPreview}" alt="Gym Logo" class="max-w-[150px] rounded-lg border border-gray-200">
              </div>
            ` : ''}
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Create Gym',
      cancelButtonText: 'Edit Again',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg text-white font-medium',
        cancelButton: 'bg-gray-500 hover:bg-gray-600 px-6 py-2.5 rounded-lg text-white font-medium',
        title: 'text-gray-900 text-xl font-semibold'
      }
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        let finalImageUrl = '';
        
        if (logoPreview) {
          const response = await fetch("/api/uploadimage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: logoPreview }),
          });

          const responseData = await response.json();
          if (response.ok) {
            finalImageUrl = responseData.url;
          } else {
            throw new Error("Image upload failed: " + responseData.error);
          }
        }

        const response = await PostGymDetails(JSON.stringify(data), finalImageUrl);
        if (response) {
          await Swal.fire({
            title: 'Success!',
            text: 'Gym created successfully',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          router.push('/ownerdashboard/gymdetails/viewgymdetails');
        } else {
          throw new Error("Failed to create gym");
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: `An error occurred: ${(error as Error).message}`,
          icon: 'error',
          confirmButtonColor: '#3085d6'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (Loading) {
    return <Loader />;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-center">
          Create New Gym
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="gymName">Gym Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="gym_name"
                {...form.register("gym_name")}
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
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <Input
                  id="gym_logo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" />
              <Textarea
                id="address"
                {...form.register("address")}
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
                  {...form.register("phone_number")}
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
                  {...form.register("Email")}
                  type="email"
                  placeholder="Enter email address"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-indigo-600 text-white text-base"
          >
            Create Gym
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

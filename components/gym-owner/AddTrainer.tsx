"use client";
import React, { useState, useEffect } from "react";
import { Upload, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WarningAlert from "../alerts/WarningAlert";
import { AddTrainerSA } from "@/app/actions/AddTrainerSA";

type ShiftType = "morning" | "evening";

interface AddTrainerProps {
  addTrainerProps: {
    id?: number;
    name?: string;
    shift?: ShiftType;
    rating?: number;
  };
}

const ShiftArray = [
  {
    name: "Morning",
    label: "morning",
  },
  {
    name: "Evening",
    label: "evening",
  },
];

// TODO: Implement backend call to add the trainers to the API.
export default function AddTrainer({ addTrainerProps }: AddTrainerProps) {
  const [name, setName] = useState<string>(addTrainerProps.name || "");
  const [image, setImage] = useState<File | null>(null);
  const [rating, setRating] = useState<number>(addTrainerProps.rating || 0);
  const [shift, setShift] = useState<ShiftType>(
    addTrainerProps.shift || "morning"
  );

  useEffect(() => {
    if (addTrainerProps.id) {
      // If an ID is present, you might want to fetch additional details.
      // This is optional based on your requirements.
      // For now, we're initializing state based on props.
      console.log("Editing Trainer with ID:", addTrainerProps.id);
    }
  }, [addTrainerProps.id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    // call the alret message and based of that figure out whether to submi or not .then
    Swal.fire({
      title: "Are you sure?",
      text: "Users will be able to select a newly created trainer as their assigned trainer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO show loader complete the backend request if success then show this otherwise jsut show some error occured
        Swal.fire({
          title: "Success!",
          text: "Trainer is sucessfully created.",
          icon: "success",
        }).then(() => {
          console.log("now submitting the form");
          // submit the form
        });
      }
    });
    console.log("this console log works");
  };

  return (
    <Card className="w-full h-full ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Add Trainer
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Trainer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter trainer's name"
              required
            />
          </div>
          <div>
            <label htmlFor="shift" className="text-sm">
              Shift
            </label>
            <select
              value={shift}
              required
              onChange={(e) => setShift(e.target.value as ShifType)}
              className="block w-full text-sm bg-white border text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <option value="" hidden>
                Select Shift
              </option>
              {ShiftArray.map((shiftItem, index) => (
                <option key={index} value={shiftItem.name}>
                  {shiftItem.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="image">Trainer Image</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="image"
                type="file"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <span className="text-sm text-gray-500">
                {image ? image.name : "No file chosen"}
              </span>
            </div>
          </div>
          <div>
            <Label>Initial Rating</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${
                    star <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-gradient-to-tr from-blue-600 to-violet-600 "
          >
            Add Trainer
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

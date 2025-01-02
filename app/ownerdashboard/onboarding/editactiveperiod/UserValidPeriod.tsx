"use client";

import { useState, useTransition } from "react";
import { format, addMonths} from "date-fns";
import { CalendarIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateUserActivePeriod } from "@/app/ownerdashboard/onboarding/editactiveperiod/actions/updateActivePeriod";
import { toast, Toaster } from "react-hot-toast";
import { validateUserValidity } from "./actions/typecheck";
import Swal from 'sweetalert2';

interface UserValidityPeriodProps {
  userId: string;
  userName: string;
  userImage?: string;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

export function UserValidityPeriod({
  userId,
  userName,
  userImage,
  initialStartDate,
  initialEndDate,
}: UserValidityPeriodProps) {
  const [isPending, startTransition] = useTransition();
  const [startDate, setStartDate] = useState<Date>(
    initialStartDate || new Date()
  );
  const [endDate, setEndDate] = useState<Date>(
    initialEndDate || addMonths(new Date(), 1)
  );
  const [shift, setShift] = useState<"morning" | "evening">("morning");
  const defaultImage = "https://randomuser.me/api/portraits";
  const handleSubmit = () => {
    startTransition(async () => {
      const userData = {
        userId: Number(userId),
        startDate,
        endDate,
        shift
      };

      const formatDisplayDate = (date: Date) => {
        return format(date, "dd-MM-yyyy");
      };

      const result = await Swal.fire({
        title: 'Update Gym Session Period',
        position : 'center',
        html: `
          <div class="text-left p-4">
        <div class="border-b pb-2 mb-4">
          <h3 class="font-medium text-gray-900">Session Details</h3>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Start Date:</span>
            <span class="font-medium">${formatDisplayDate(startDate)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">End Date:</span>
            <span class="font-medium">${formatDisplayDate(endDate)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Shift:</span>
            <span class="font-medium capitalize">${shift}</span>
          </div>
        </div>
          </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#dc2626',
        confirmButtonText: 'Confirm Update',
        cancelButtonText: 'Cancel',
        customClass: {
          popup: 'rounded-lg',
          title: 'text-xl font-medium text-gray-900'
        }
      });

      if (!result.isConfirmed) {
        return;
      }

      const validationResult = await validateUserValidity(userData);

      if (validationResult.success) {
        const updateResult = await UpdateUserActivePeriod({
          userId: Number(userId),
          startDate,
          endDate,
          shift,
        });

        if (updateResult.user) {
          console.log("before toast");  
          toast.success(`Validity period updated for ${userName}`, {
            duration: 3000,
            position: 'top-center',
          });
        } else {
          toast.error(updateResult.msg || 'Failed to update validity period');
        }
      } else {
        const errorMessages = Object.entries(validationResult.errors || {})
          .map(([field, errors]) => `${field}: ${errors?.join(', ')}`)
          .join('\n');
        toast.error(errorMessages);
      }
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm space-y-8">

      <Toaster position="top-right" />
      {/* Header Section with Avatar */}
      <div className="flex items-center space-x-6 pb-6 border-b border-gray-100">
        <Avatar className="w-24 h-24 ring-2 ring-gray-100">
          <AvatarImage
            src={userImage ? userImage : defaultImage}
            alt={userName}
          />
          <AvatarFallback className="bg-blue-50 text-blue-700 text-xl font-medium">
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{userName}</h2>
          <p className="text-sm text-gray-500">Membership Details</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="space-y-6">
        {/* Start Date */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Start Date</label>
          <div className="col-span-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal hover:bg-gray-50"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                  {format(startDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setStartDate(date)}
                  disabled={(date) =>
                    date < new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* End Date */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="text-sm font-medium text-gray-700">End Date</label>
          <div className="col-span-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal hover:bg-gray-50"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                  {format(endDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => date && setEndDate(date)}
                  disabled={(date) =>
                    date <= startDate || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Shift Selection */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Shift</label>
          <div className="col-span-2">
            <Select
              onValueChange={(value: "morning" | "evening") => setShift(value)}
              defaultValue={shift}
            >
              <SelectTrigger className="w-full hover:bg-gray-50">
                <SelectValue placeholder="Select a shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </span>
          ) : (
            "Update Membership"
          )}
        </Button>
      </div>
    </div>
  );
}

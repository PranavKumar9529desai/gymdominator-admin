// import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Users } from "lucide-react";
import GymManagar from "@/app/assests/gym-manager.webp";
import Image from "next/image";
// import DateComponent from "./DateComponent";
// import { Poppins } from "@next/font/google";

// const poppins = Poppins({
//   weight: "400",
//   subsets: ["latin"],
// });

export default function AttendanceComponent() {
  // get the user date
  let currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  // In a real application, this would be a unique identifier for the session
  // TODO  create new token/string that is consist of the
  // token = trainer-name + today's day
  const qrValue = `gymdominator-attendance-${currentDate} and the unique token is pranav desai`;

  function QrcodeScanned() {
    console.log("qr code is scanned");
  }
  return (
    <div className="min-h-screen flex lg:items-center justify-center px-2 pt-2">
      <Card className="w-full max-w-md bg-white shadow-xl overflow-hidden">
        <CardHeader className={`bg-primary`}>
          <CardTitle className="text-3xl font-extrabold text-center text-primary-foreground ">
            {/* <Image src={GymManagar} alt="GymManagar Image " className="o" /> */}
            GymManager
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 p-6">
          <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded-2xl shadow-inner overflow-hidden">
            <div className="">
              <QRCodeSVG value={qrValue} size={256} />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary bg-primary-foreground px-4 py-2 rounded-full ">
            {currentDate}
          </div>
          {/* <DateComponent /> */}
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50  lg:flex-row gap-2">
          <Button
            variant="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            <Home className="mr-2 h-5 w-5" /> Home
          </Button>
          <Button
            variant="outline"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            <Users className="mr-2 h-5 w-5" /> View Attendance
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
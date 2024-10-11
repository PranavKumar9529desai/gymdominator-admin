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
// import DateComponent from "./DateComponent";

export default function AttendanceComponent() {
  // get the user date
  let currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  // In a real application, this would be a unique identifier for the session
  const qrValue = `gymdominator-attendance-${currentDate}`;

  function QrcodeScanned() {
    console.log("qr code is scanned");
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <CardHeader className="bg-primary">
          <CardTitle className="text-3xl font-extrabold text-center text-primary-foreground">
            Gymdominator
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 p-6">
          <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded-2xl shadow-inner overflow-hidden">
            <div className="">
              <QRCodeSVG value={qrValue} size={256} />
            </div>
          </div>
          <div className="text-xl font-semibold text-primary bg-primary-foreground px-4 py-2 rounded-full">
            {currentDate}
          </div>
          {/* <DateComponent /> */}
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50 flex-col lg:flex-row gap-4">
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

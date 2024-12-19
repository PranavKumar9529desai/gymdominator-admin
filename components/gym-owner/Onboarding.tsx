import React from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface GymQRCodeOnboardingProps {
  qrdata: string;
  gymName: string;
}

const GymQRCodeOnboarding: React.FC<GymQRCodeOnboardingProps> = ({
  qrdata,
  gymName,
}) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-6">
        <CardTitle className="text-2xl font-bold">{gymName}</CardTitle>
        <CardDescription className="text-blue-100 mt-2">
          Welcome to your fitness journey
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg shadow-inner">
          <QRCodeSVG
            value={qrdata}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
          />
        </div>
        <p className="mt-6 text-center text-gray-600 font-medium">
          Scan the QR code to get enrolled into the gym
        </p>
        <div className="mt-4 w-full border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500 text-center">
            Need help? Contact our support team
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GymQRCodeOnboarding;

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
  title: string;
  subtitle: string;
}

const GymQRCode: React.FC<GymQRCodeOnboardingProps> = ({
  qrdata,
  title,
  subtitle,
}) => {
  console.log("qrdata gymname is ",qrdata,"gym name is",title);
  return (
    <Card className="w-full max-w-md mx-auto bg-white  shadow-lg rounded-lg overflow-hidden h-[100vh] md:h-auto">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-6">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-blue-100 mt-2 text-xl font-semibold tracking-[0.5px]">
          Welcome to your fitness journey
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 py-20 flex flex-col items-center justify-center border ">
        <div className="bg-white p-4 rounded-lg shadow-inner">
          <QRCodeSVG
            value={qrdata}
            size={300}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
          />
        </div>
       <p className="text-lg text-gray-500 text-center py-10">
          {subtitle}
          </p>
        
      </CardContent>
    </Card>
  );
};

export default GymQRCode;

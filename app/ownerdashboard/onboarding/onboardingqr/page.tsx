import GymQRCodeOnboarding from "@/components/gym-owner/QrCode";
import React from "react";
import { OnBoadingQrData } from "./GetOnBordingQrData";
export default async function page() {
  const { hash, gymname, gymid } = await OnBoadingQrData();
  const QrData = {
    OnboardingAction: {
      hash: hash,
      gymname: gymname,
      gymid: gymid,
    },
  };

  return (
    <div className="h-screen  flex justify-center items-center w-full p-4">
      <GymQRCodeOnboarding qrdata={JSON.stringify(QrData)} 
       title=""
       subtitle="Please scan the QR code to complete your onboarding process"
      />;
    </div>
  );
}

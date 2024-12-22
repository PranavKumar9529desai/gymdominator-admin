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
    <div className="h-screen bg-[#f0f0f0] flex justify-center items-center w-full">
      <GymQRCodeOnboarding qrdata={JSON.stringify(QrData)} gymName={gymname} />;
    </div>
  );
}

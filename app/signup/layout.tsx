import React from 'react';
import Image from 'next/image';
import GymDominatorLogo from '@/app/assests/gymheroImg.webp';
import { Metadata } from "next";
import GymDomImage from "@/app/assests/gymd.webp";

export const metadata: Metadata = {
  openGraph: {
    title: "GymDominator",
    description: "Professional gym management solution",
    images: [
      {
        url: GymDomImage.src,
        width: 1200,
        height: 630,
        alt: "GymDominator Preview",
      },
    ],
    type: "website",
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="min-h-screen flex">
        {/* Left side - Sign Up Form */}
        <div className="lg:w-1/2 sm:w-full flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* Right side - Logo and Branding */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-gray-50 to-blue-50 flex-col items-center justify-center p-8">
          <div className="max-w-xl text-center space-y-6">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-blue-100 opacity-50 rounded-full blur-2xl"></div>
              <div className="relative z-10 w-full h-full">
                <Image
                  src={GymDominatorLogo}
                  alt="GymNavigator Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  className="p-6"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome to <span className="text-blue-600">GymNavigator</span>
              </h2>
              <p className="text-base text-gray-600">
                Your ultimate platform for fitness tracking and workout management
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
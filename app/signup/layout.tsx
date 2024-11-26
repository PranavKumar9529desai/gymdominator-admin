import React from 'react';
import Image from 'next/image';
import GymDominatorLogo from '@/app/assests/gymheroImg.webp';

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="min-h-screen flex">
        {/* Left side - Sign In Form */}
        <div className="w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        {/* Right side - Logo and Branding */}
        <div className="w-1/2 bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-8 relative">
          <div className="max-w-md text-center h-full flex flex-col justify-center">
            <div className="relative w-full h-[400px] mb-3 mx-auto">
              <div className="absolute inset-0 bg-blue-100 opacity-50 rounded-full blur-xl "></div>
              <Image
                src={GymDominatorLogo}
                alt="GymDominator Logo"
                className="relative z-10 w-full h-full object-cover "
                priority
              />
            </div> 
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome to{" "}
              <span className="text-blue-600">
                GymDominator
              </span> 
            </h2>
            <p className="text-base text-gray-600">
              Your ultimate platform for fitness tracking and workout management
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
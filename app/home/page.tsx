import { Button } from "@/components/ui/button";
import LogoImage from "@/app/assests/gymd.webp";
import TestimonialCard from "./TestimonialsCard";
import { ArrowRight, BarChart2, Users, Calendar } from "lucide-react";
import Image from "next/image";
import FeatureCard from "./FeatureCard";
import CustomButton from "./CustomButton";
import { BackgroundBeams } from "@/components/beams";
import Footer from "./Footer";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { Rolestype } from "../types/next-auth";
export default async function HeroSection( request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const session = await auth();
  console.log("session from the hero section  ", session);
  console.log("token from the hero section  ", token);
  return (
    <main className="bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white min-h-screen overflow-hidden">
      <section className="relative pb-16 lg:pb-28">
        <div className="container mx-auto px-6 py-16 sm:py-28 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 lg:order-1 order-2 relative z-10">
              <div className="space-y-4 max-w-xl">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-center lg:text-left">
                  Elevate Your
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent block mt-2">
                    Gym Management
                  </span>
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed hidden sm:block font-light">
                  Streamline operations, enhance member experience, and drive
                  growth with our sophisticated management suite.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 mt-8">
                {/* @ts-ignore */}
                <CustomButton role={session?.role as Rolestype} />
                <Button
                  variant="outline"
                  className="hidden sm:flex items-center gap-2 bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600 font-medium px-6 py-3 rounded-lg transition-all duration-300"
                >

                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end lg:order-2 order-1 relative">
              <div className="relative w-80 h-80 sm:w-[500px] sm:h-[500px]">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-3xl "></div>
                <div className="absolute inset-0 bg-indigo-200/50 rounded-full blur-[100px] opacity-90 sm:opacity-75 "></div>
                <Image
                  src={LogoImage}
                  alt="GymDominator Logo"
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
        <BackgroundBeams className="opacity-40" />
      </section>

      <section className="py-24 bg-gray-900/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
            <div className="group">
              <FeatureCard
                Icon={BarChart2}
                title="Performance Tracking"
                description="Monitor gym metrics and member progress"
                className="transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/50 border border-gray-800"
              />
            </div>
            <div className="group">
              <FeatureCard
                Icon={BarChart2}
                title="Performance Tracking"
                description="Monitor gym metrics and member progress"
                className="transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/50 border border-gray-800"
              />
            </div>
            <div className="group">
              <FeatureCard
                Icon={BarChart2}
                title="Performance Tracking"
                description="Monitor gym metrics and member progress"
                className="transform hover:scale-105 transition-all duration-300 hover:bg-gray-800/50 border border-gray-800"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black/40 backdrop-blur-sm relative">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="GymDominator revolutionized our operations. We've seen a 30% increase in member retention."
              author="Sarah Johnson"
              role="Fitness Center Owner"
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-colors duration-300"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

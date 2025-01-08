import { ArrowRight } from "lucide-react";
import CustomButton from "./CustomButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LogoImage from "@/app/assests/gymd.webp";
import { BackgroundBeams } from "../../components/beams";
export default function Herosection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 lg:order-1 order-2 relative z-10">
            <div className="space-y-6 max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-center lg:text-left space-y-4">
                <span className="block mb-4">Elevate Your</span>
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent block">
                  Gym Management
                </span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed hidden sm:block font-light mt-8">
                Streamline operations, enhance member experience, and drive
                growth with our sophisticated management suite.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-8">
              <CustomButton />
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
  );
}

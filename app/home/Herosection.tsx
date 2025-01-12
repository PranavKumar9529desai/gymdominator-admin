import { ArrowRight } from "lucide-react";
import CustomButton from "./CustomButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LogoImage from "@/app/assests/gymd.webp";
import { BackgroundBeams } from "../../components/beams";

export default function Herosection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Mobile-only glow effect - Perfectly centered behind text */}
      <div className="absolute inset-0 lg:hidden flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl transform scale-110"></div>
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse transform scale-150"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content - Centered on mobile, left-aligned on desktop */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left relative z-10 py-8 lg:py-0">
            <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="block mb-2 sm:mb-4">Elevate Your</span>
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent inline-block">
                  Gym Management
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed mt-4">
                Streamline operations, enhance member experience, and drive
                growth with our sophisticated management suite.
              </p>
            </div>

            {/* Buttons - Full width on mobile, auto width on desktop */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-8">
              <div className="w-full sm:w-auto   ">
                <div className="w-fit  mx-auto sm:mx-0">
                  <CustomButton />
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full sm:w-auto hidden sm:flex items-center gap-2 bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600 font-medium px-6 py-3 rounded-lg transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Image Container - Hidden on all screens below lg breakpoint */}
          <div className="hidden lg:flex justify-end">
            <div className="relative w-[500px] h-[500px]">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 bg-indigo-200/50 rounded-full blur-[100px] opacity-90 sm:opacity-75"></div>
              <Image
                src={LogoImage}
                alt="GymNavigator Logo"
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

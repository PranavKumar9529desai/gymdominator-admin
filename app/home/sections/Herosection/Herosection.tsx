"use client"
import { ArrowRight } from "lucide-react";
import CustomButton from "../../CustomButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LogoImage from "@/app/assests/gymd.webp";
import { BackgroundBeams } from "../../../../components/beams";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Herosection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="min-h-[90vh]" />; // Loading state
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-black to-gray-950">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl animate-pulse top-[-250px] left-[-250px]"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-3xl animate-pulse bottom-[-250px] right-[-250px]"></div>
      </div>

      <div className="container mx-auto px-8 sm:px-12 lg:px-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 text-center lg:text-left relative z-10 py-8 lg:py-0"
          >
            <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                  <span className="block mb-2 sm:mb-4 text-white/90">Elevate Your</span>
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent inline-block animate-gradient">
                    Gym Management
                  </span>
                </h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-base sm:text-lg text-gray-300 leading-relaxed mt-4"
              >
                Streamline operations, enhance member experience, and drive
                growth with our sophisticated management suite.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-8"
            >
              <div className="w-full sm:w-auto group">
                <div className="w-fit mx-auto sm:mx-0">
                  <CustomButton />
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full sm:w-auto hidden sm:flex items-center gap-2 bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-blue-500 hover:scale-105 font-medium px-6 py-3 rounded-lg transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1,
              ease: "easeOut"  // Changed this line
            }}
            className="hidden lg:flex justify-end"
          >
            <div className="relative w-[500px] h-[500px]">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 bg-indigo-200/50 rounded-full blur-[100px] opacity-90 sm:opacity-75"></div>
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src={LogoImage}
                  alt="GymNavigator Logo"
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-gray-500 flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-blue-500 rounded-full"
          />
        </div>
      </motion.div>

      <BackgroundBeams className="opacity-40" />
    </section>
  );
}

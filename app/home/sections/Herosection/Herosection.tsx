"use client"
import { ArrowRight, Activity, Users, Dumbbell, UserCheck, UserCog } from "lucide-react";
import CustomButton from "../../CustomButton";
import { Button } from "@/components/ui/button";

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
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:flex justify-end"
          >
            <div className="relative w-[600px] h-[600px] perspective-1000">
              {/* 3D Dashboard Cards */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { 
                    icon: Users, 
                    title: "Onboarded Users", 
                    value: "1,847", 
                    color: "from-blue-500 to-blue-600",
                    growth: "+22%"
                  },
                  { 
                    icon: UserCheck, 
                    title: "Today's Attendance", 
                    value: "234", 
                    color: "from-green-500 to-green-600",
                    growth: "+18%"
                  },
                  { 
                    icon: UserCog, 
                    title: "Trainer Dashboard", 
                    value: "16", 
                    color: "from-purple-500 to-purple-600",
                    growth: "+5%"
                  },
                  { 
                    icon: Activity, 
                    title: "Active Users", 
                    value: "1,392", 
                    color: "from-orange-500 to-orange-600",
                    growth: "+15%"
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: 45 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      rotateX: 0,
                      z: Math.sin(i * 0.5) * 50 
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      z: 30,
                      rotateX: 10,
                      rotateY: 10
                    }}
                    transition={{ 
                      delay: i * 0.1,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="bg-gradient-to-br border border-white/10 rounded-xl p-6 transform-style-3d shadow-xl"
                  >
                    <div className={`rounded-full w-12 h-12 bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white/90">{item.title}</h3>
                    <div className="flex items-end gap-2 mt-2">
                      <span className="text-3xl font-bold text-white">{item.value}</span>
                      <span className="text-green-400 text-sm mb-1">{item.growth}</span>
                    </div>
                    
                    {/* Animated graph line */}
                    <motion.div 
                      className="h-1 bg-white/10 mt-4 rounded-full overflow-hidden"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: i * 0.2 + 0.5, duration: 1 }}
                    >
                      <motion.div 
                        className={`h-full bg-gradient-to-r ${item.color}`}
                        animate={{ 
                          x: ["-100%", "0%"],
                          opacity: [0.5, 1] 
                        }}
                        transition={{ 
                          duration: 1.5,
                          delay: i * 0.2 + 0.5,
                          ease: "easeOut"
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Floating Achievement Badges */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`badge-${i}`}
                    className="absolute"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                      x: Math.sin(i * 45) * 200,
                      y: Math.cos(i * 45) * 200,
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                      <Dumbbell className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
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

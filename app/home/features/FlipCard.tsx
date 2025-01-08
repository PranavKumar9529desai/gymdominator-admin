"use client";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { 
  QrCode, 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  BarChart3, 
  Smartphone 
} from "lucide-react";

const iconMap = {
  "Smart QR Attendance": QrCode,
  "Personalized Diet": LayoutDashboard,  // Changed this line
  "Trainer Assignment Hub": Users,
  "Personalized Fitness Journey": Dumbbell,
  "Advanced Analytics": BarChart3,
  "Member Portal": Smartphone,
};

interface FlipCardProps {
  title: string;
  description: string;
  icon: string | StaticImageData;
}

export const FlipCard = ({ title, description, icon }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = iconMap[title as keyof typeof iconMap];

  return (
    <motion.div
      className="flip-card cursor-pointer h-[400px] w-full perspective"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className="relative w-full h-full preserve-3d transition-all duration-700" 
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full p-8 rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-800 border border-zinc-700/50 shadow-lg backdrop-blur-sm">
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  {Icon && <Icon className="w-6 h-6 text-white" />}
                </div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-br from-white to-zinc-300 bg-clip-text text-transparent mb-4">
                {title}
              </h3>
              <p className="text-zinc-400 flex-grow">{description}</p>
              <div className="mt-6 text-sm text-zinc-500 flex items-center gap-2">
                Click to see feature <span className="animate-pulse">→</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-xl" />
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="h-full p-8 rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-800 border border-zinc-700/50 shadow-lg overflow-hidden">
            <div className="h-full flex flex-col items-center justify-center relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={icon}
                  alt={title}
                  fill
                  className="object-contain p-4 hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-sm text-zinc-500">Click to flip back</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

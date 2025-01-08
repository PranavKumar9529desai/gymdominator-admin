"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
}: {
  items: {
    icon: string;
    title: string;
    description: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setTimeout(() => setStart(true), 100);
  }, []);

  const speeds = {
    fast: 20,
    normal: 35,
    slow: 50,
  };

  return (
    <div
      className="relative overflow-hidden"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-4 w-max"
        animate={start ? {
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        } : {}}
        transition={{
          duration: speeds[speed],
          ease: "linear",
          repeat: Infinity,
          paused: pauseOnHover && isHovered,
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative group w-[350px] h-[350px] bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-8 relative z-10 h-full flex flex-col">
                <Image src={item.icon} alt={item.title} width={32} height={32} />
                <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-zinc-400 flex-grow">{item.description}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

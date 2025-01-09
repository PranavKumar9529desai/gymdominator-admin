"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TestimonialItem {
  image: string;
  quote: string;
  author: string;
  role: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
}: {
  items: TestimonialItem[];
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
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="relative group w-[450px] h-[400px] bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-8 relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.author}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{item.author}</h4>
                  <p className="text-sm text-zinc-400">{item.role}</p>
                </div>
              </div>
              <blockquote className="text-lg text-zinc-300 flex-grow">&ldquo;{item.quote}&rdquo;</blockquote>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

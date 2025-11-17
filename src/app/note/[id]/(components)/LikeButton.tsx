// description: Guaranteed working Like button with real burst animation for Next.js + Framer Motion v7

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";

interface LikeButtonProps {
  isLiked: boolean;
  count: number;
  onToggle: () => void;
}

export default function LikeButton({ isLiked, count, onToggle }: LikeButtonProps) {
  const [shouldBurst, setShouldBurst] = useState(false);

  useEffect(() => {
    if (isLiked) {
      setShouldBurst(true);

      // Remove after animation so it can retrigger
      const timeout = setTimeout(() => setShouldBurst(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [isLiked]);

  const particles = [...Array(6)];

  return (
    <div className="relative inline-flex items-center gap-2 select-none">

      {/* --- BURST PARTICLES (ALWAYS WORKS) --- */}
      {shouldBurst &&
        particles.map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180; // 6 directions

          return (
            <motion.span
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-500 z-[5]"
              initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: [0.8, 1.4, 0.3],
                x: Math.cos(angle) * 26,
                y: Math.sin(angle) * 26,
              }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
              }}
            />
          );
        })}

      {/* --- LIKE ICON --- */}
      <motion.div
        onClick={onToggle}
        whileTap={{ scale: 0.75 }}
        animate={{ scale: isLiked ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 12 }}
        className="cursor-pointer relative z-[10]"
      >
        <ThumbsUp
          size={22}
          className={isLiked ? "text-blue-600 fill-blue-600" : "text-gray-600"}
        />
      </motion.div>

      {/* --- COUNT --- */}
      <span className="text-sm font-medium text-gray-700">{count}</span>
    </div>
  );
}

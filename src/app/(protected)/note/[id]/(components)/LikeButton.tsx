"use client";

/* Short comments • smooth burst animation */

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";

interface LikeButtonProps {
  isLiked: boolean;
  count: number;
  onToggle: () => void;
}

export default function LikeButton({ isLiked, count, onToggle }: LikeButtonProps) {
  const [burst, setBurst] = useState(false);

  // trigger burst only WHEN clicking like
  const handleClick = useCallback(() => {
    if (!isLiked) {
      setBurst(true);
      setTimeout(() => setBurst(false), 550);
    }
    onToggle();
  }, [isLiked, onToggle]);

  // Generate particles
  const particles = Array.from({ length: 6 });

  return (
    <div className="relative inline-flex items-center gap-2 select-none">

      {/* --- Burst Particles --- */}
      {burst &&
        particles.map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;

          return (
            <motion.span
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-500 z-10"
              initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: [0.8, 1.3, 0.2],
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

      {/* --- Like Icon --- */}
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.75 }}
        animate={{ scale: isLiked ? 1.15 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="cursor-pointer relative z-20"
      >
        <ThumbsUp
          size={22}
          className={isLiked ? "text-blue-600 fill-blue-600" : "text-gray-600"}
        />
      </motion.button>

      {/* --- Counter --- */}
      <span className="text-sm font-medium text-gray-700">{count}</span>
    </div>
  );
}

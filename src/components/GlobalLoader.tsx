"use client";

/**
 * 🧭 GlobalLoader — Standard Top Progress Bar
 * ------------------------------------------------------------
 * - Lightweight and smooth
 * - Triggers automatically when RTK Query is fetching/mutating
 * - Uses Tailwind only (no NProgress, no motion)
 */

import { useSelector } from "react-redux";
import { api } from "@/feature/mainApi";
import { useEffect, useState } from "react";

export default function GlobalLoader() {
  // Select global fetching/mutating state safely
  const selectIsFetching =
    ((api.util as any)?.selectIsFetching as (state: any) => boolean) || (() => false);
  const selectIsMutating =
    ((api.util as any)?.selectIsMutating as (state: any) => boolean) || (() => false);

  const isFetching = useSelector(selectIsFetching);
  const isMutating = useSelector(selectIsMutating);

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isFetching || isMutating) {
      setVisible(true);
      // Gradually increase progress
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + Math.random() * 10; // simulate smooth load
          return prev;
        });
      }, 150);
    } else {
      // Complete and fade out
      setProgress(100);
      setTimeout(() => setVisible(false), 400);
      setTimeout(() => setProgress(0), 600);
    }

    return () => clearInterval(timer);
  }, [isFetching, isMutating]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-9999 h-[3px] bg-transparent">
      <div
        className="h-full bg-yellow-400 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

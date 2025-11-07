
"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

export default function NoteMentorAnimatedBackground({ className = "" }: Props) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none overflow-hidden -z-10 transition-colors duration-700 ${className}`}>

      {/* 🌗 Dual Gradient Background (Auto adapts to dark/light theme) */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-950 dark:to-slate-900 opacity-95" />

      {/* Animated Gradient Blobs */}
      <svg
        className="absolute -left-40 top-0 w-[1200px] h-[700px] opacity-25 dark:opacity-20"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="light1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="dark1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>

        <motion.ellipse
          cx="300"
          cy="120"
          rx="260"
          ry="110"
          fill="url(#light1)"
          className="dark:hidden"
          animate={reduce ? {} : { translateX: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        <motion.ellipse
          cx="300"
          cy="120"
          rx="260"
          ry="110"
          fill="url(#dark1)"
          className="hidden dark:block"
          animate={reduce ? {} : { translateX: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </svg>

      {/* 📝 Floating Note Cards */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-6xl px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
          <div className="relative h-[420px] sm:h-[380px] md:h-[340px] lg:h-[360px]">

            {/* Left Card */}
            <motion.div
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-10 sm:top-12 w-44 sm:w-56 md:w-64 lg:w-72 p-4 rounded-2xl backdrop-blur-md bg-white/40 dark:bg-white/10 border border-white/30 dark:border-white/5 shadow-lg">
              <div className="h-2 w-20 rounded-full bg-white/60 dark:bg-gray-400 mb-3" />
              <div className="h-3 w-28 rounded-full bg-white/50 dark:bg-gray-500 mb-2" />
              <div className="h-3 w-12 rounded-full bg-white/40 dark:bg-gray-600" />
            </motion.div>

            {/* Right Card */}
            <motion.div
              animate={reduce ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-24 sm:top-20 w-40 sm:w-48 md:w-56 lg:w-60 p-3 rounded-2xl backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/25 dark:border-white/5 shadow-md">
              <div className="h-3 w-24 rounded-full bg-white/60 dark:bg-gray-500 mb-3" />
              <div className="h-2 w-16 rounded-full bg-white/50 dark:bg-gray-600" />
            </motion.div>

      
          </div>
        </div>
      </div>

      {/* 🌊 Subtle Bottom Wave */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 w-full h-24 sm:h-32 md:h-36 lg:h-40 opacity-80 dark:opacity-40"
        animate={reduce ? {} : { translateY: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
          <path fill="currentColor" className="text-white dark:text-slate-900" d="M0,256L48,245.3C96,235,192,213,288,202.7C384,192,480,192,576,197.3C672,203,768,213,864,202.7C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </motion.div>
    </div>
  );
}
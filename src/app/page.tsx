

"use client";

import React from "react";
import { motion } from "framer-motion";
import NoteMentorAnimatedBackground from "@/components/heroAnimatedBg";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <section className="flex items-center justify-center h-full px-6 text-center relative">
      {/* ✨ Center Card */}
                <NoteMentorAnimatedBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl rounded-3xl p-8 md:p-10 backdrop-blur-lg 
        bg-white/60 dark:bg-white/10 border border-white/30 dark:border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-tr from-indigo-600 to-teal-400 flex items-center justify-center text-white font-semibold text-lg shadow-md">
            NM
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-teal-400">
            Welcome to NoteMentor
          </h1>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Your intelligent note companion — summarize handwritten notes, generate smart quizzes, 
          and study efficiently with adaptive learning powered by AI. 🚀
        </p>

        {/* Subtext */}
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          Start your journey by uploading notes or exploring your personalized dashboard.
        </p>

        {/* CTA Button */}
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-linear-to-r from-indigo-600 to-teal-400 text-white font-medium shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default HomePage;

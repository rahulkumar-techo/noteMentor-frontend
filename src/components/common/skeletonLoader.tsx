"use client";

import React from "react";
import { Card } from "../ui/card";

interface NoteSkeletonProps {
  type?: "page" | "cards";
  count?: number;
}

const NoteSkeleton: React.FC<NoteSkeletonProps> = ({ type = "page", count = 5 }) => {
  const items = Array.from({ length: count });

  // 🦴 DETAILS PAGE SKELETON
  if (type === "page") {
    return (
      <main className="min-h-screen w-full text-white px-4 md:px-8 py-10 animate-pulse">
        <section className="w-full md:max-w-6xl mx-auto space-y-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="h-8 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-lg" />
            <div className="flex gap-3">
              <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-lg" />
              <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-lg" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 bg-white/5 dark:bg-gray-900/30 border border-gray-800 rounded-2xl p-5 backdrop-blur-md">
            <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-4/6 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-3/5 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          {/* Attachments */}
          <div className="space-y-4">
            <div className="h-5 w-1/4 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((_, i) => (
                <div key={i} className="h-40 bg-gray-300 dark:bg-gray-700 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="flex items-center justify-center bg-[#0d0d0f]/70 rounded-2xl border border-gray-800 backdrop-blur-md p-6">
            <div className="w-full max-w-md space-y-3">
              <div className="h-5 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="flex gap-3">
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-lg" />
                <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-lg" />
                <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center pt-8">
            <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          </div>
        </section>
      </main>
    );
  }

  // 🧩 CARDS GRID SKELETON
  return (
    <Card className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-between w-full animate-pulse">
      {items.map((_, i) => (
        <div
          key={i}
          className="bg-white/10 dark:bg-gray-900/30 border border-gray-800 backdrop-blur-md rounded-2xl p-4 space-y-3"
        >
          {/* Thumbnail */}
          <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-xl" />
          {/* Title */}
          <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
          {/* Description */}
          <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
          {/* Footer actions */}
          <div className="flex gap-2 pt-2">
            <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-lg" />
            <div className="h-8 w-10 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>
      ))}
    </Card>
  );
};

export default NoteSkeleton;

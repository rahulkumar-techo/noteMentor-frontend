"use client";

import Link from "next/link";
import { FaHome, FaGhost } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black text-center px-6">
      <div>
        {/* Big funny icon */}
        <FaGhost className="mx-auto text-yellow-600 text-7xl animate-bounce" />

        <h1 className="text-6xl font-extrabold mt-4 text-yellow-600">404</h1>

        <h2 className="text-2xl mt-4 font-bold dark:text-white">
          Oops... This page went missing! 👀
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
          Sorry 😔  — looks like this page took a coffee break  
          <br /> and forgot to come back!
        </p>

        <p className="text-gray-600 dark:text-gray-400 mt-1">
          But don’t worry, we’ll take you home safely. 🏠
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-6 px-7 py-3 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition font-medium"
        >
          <FaHome /> Take Me Back Home
        </Link>
      </div>
    </div>
  );
}

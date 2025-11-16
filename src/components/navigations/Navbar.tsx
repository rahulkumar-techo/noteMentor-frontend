"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useGetUserQuery } from "@/feature/user/userApi";
import ProfileDropdown from "../ProfileDropDown";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const { data, isLoading, isError } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const user = data?.data || data?.user || data || null;

  // Hide on auth/dashboard pages
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")||
    pathname.startsWith("/feed")||
    pathname.startsWith("/note")
  ) {
    return null;
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Feed", href: "/feed" },
    { name: "Upload Notes", href: "/upload-notes" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        fixed top-4 left-1/2 -translate-x-1/2 z-50 
        w-[92%] sm:w-[90%] md:w-[85%]
        backdrop-blur-lg bg-white/40 dark:bg-white/10 
        border border-white/30 dark:border-white/10
        rounded-2xl px-4 sm:px-6 py-3 shadow-xl 
        flex items-center justify-between
      "
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base"
      >
        NoteMentor
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-sm font-medium transition-colors ${
              pathname === item.href
                ? "text-indigo-500 dark:text-teal-400"
                : "text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-teal-400"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Desktop Profile */}
      <div className="hidden md:flex items-center gap-3">
        {isLoading ? (
          <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
        ) : isError || !user ? (
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-teal-400 transition-colors"
          >
            Login
          </Link>
        ) : (
          <ProfileDropdown
            user={{
              name: user.fullname || user.name,
              email: user.email,
              image: user.avatar?.secure_url || user.image,
            }}
          />
        )}
      </div>

      {/* MOBILE RIGHT SIDE: Profile + Menu */}
      <div className="flex items-center gap-4 md:hidden">
        {/* Mobile Profile */}
        {isLoading ? (
          <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
        ) : isError || !user ? (
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-teal-400 transition-colors"
          >
            Login
          </Link>
        ) : (
          <ProfileDropdown
            user={{
              name: user.fullname || user.name,
              email: user.email,
              image: user.avatar?.secure_url || user.image,
            }}
          />
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-teal-400 transition-colors"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="
              absolute top-14 left-0 w-full rounded-2xl p-5 
              backdrop-blur-md bg-white/90 dark:bg-black/80 
              border border-white/30 dark:border-white/20 
              flex flex-col space-y-4 shadow-lg md:hidden
            "
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-teal-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useGetUserQuery } from "@/feature/user/userApi";
import ProfileDropdown from "../ProfileDropDown";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const pathname = usePathname();

  // ✅ Fetch user data once (no spam calls)
  const { data, isLoading, isError } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  // 🧠 Safe parsing (works with any backend structure)
  const user =
    data?.data || // case: { data: {...user} }
    data?.user || // case: { user: {...user} }
    data ||       // case: {...user}
    null;

  useEffect(() => setHydrated(true), []);

  // 🧱 Skip navbar on dashboard, login, signup
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  )
    return null;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Upload Notes", href: "/upload-notes" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  if (!hydrated) {
    return (
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[90%] md:w-[85%]
        backdrop-blur-lg bg-white/40 dark:bg-white/10 
        border border-white/30 dark:border-white/10
        rounded-2xl px-4 sm:px-6 py-3 shadow-xl flex items-center justify-between"
      >
        <Link
          href="/"
          className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base"
        >
          NoteMentor
        </Link>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[90%] md:w-[85%]
      backdrop-blur-lg bg-white/40 dark:bg-white/10 
      border border-white/30 dark:border-white/10
      rounded-2xl px-4 sm:px-6 py-3 shadow-xl flex items-center justify-between"
    >
      {/* 🚀 Logo */}
      <Link
        href="/"
        className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base"
      >
        NoteMentor
      </Link>

      {/* 📑 Nav Links (Desktop) */}
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

      {/* 📱 Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="md:hidden text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-teal-400 transition-colors"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* 🧍 User Section (Desktop) */}
      <div className="hidden md:flex items-center gap-2">
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
              name: user.fullname || user.name || "User",
              email: user.email,
              image: user.avatar?.secure_url || user.image || undefined,
            }}
            onSignOut={() => console.log("Logging out...")}
          />
        )}
      </div>

      {/* 📱 Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-14 left-0 w-full rounded-2xl p-4 
            backdrop-blur-md bg-black/80 border border-white/20 
            flex flex-col items-center space-y-3 shadow-lg md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-gray-200 hover:text-indigo-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-3 border-t border-white/20 w-full pt-3 flex justify-center">
              {isLoading ? (
                <span className="text-gray-300 text-sm">Loading...</span>
              ) : isError || !user ? (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-indigo-400 text-sm"
                >
                  Login
                </Link>
              ) : (
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="w-5 h-5" />
                  <span>{user.fullname || user.name}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

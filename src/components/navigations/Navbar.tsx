"use client";

/**
 * Hook-safe Navbar (No early return)
 * - GSAP animation
 * - Navbar hides on restricted routes using CSS, NOT return null
 * - Avoids React "Rendered fewer hooks" error
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useGetUserQuery } from "@/feature/user/userApi";
import ProfileDropdown from "../ProfileDropDown";
import gsap from "gsap";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { data, isLoading, isError } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const user = data?.data || data?.user || data || null;

  console.log({user})

  /* ------------------------------------
        Determine whether to hide navbar
  --------------------------------------- */
  const hidden =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/feed") ||
    pathname.startsWith("/note") ||
    pathname.startsWith("/upload-notes") ||
    pathname.startsWith("/complete-profile");

  /* ------------------------------------
         GSAP Animations (safe)
  --------------------------------------- */
  useEffect(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.35,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -5 },
        { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }
      );
    }
  }, [menuOpen]);

  /* ------------------------------------
         Component renders ALWAYS
         Navbar hides ONLY via CSS
  --------------------------------------- */
  return (
    <nav
      ref={navRef}
      className={`
        ${hidden ? "hidden" : "flex"} 
        fixed top-4 left-1/2 -translate-x-1/2 z-50 
        w-[92%] sm:w-[90%] md:w-[85%]
        backdrop-blur-lg bg-white/40 dark:bg-white/10 
        border border-white/30 dark:border-white/10
        rounded-2xl px-4 sm:px-6 py-3 shadow-xl
        items-center justify-between
      `}
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
        {[
          { name: "Home", href: "/" },
          { name: "Features", href: "/features" },
          { name: "Feed", href: "/feed" },
          { name: "Upload Notes", href: "/upload-notes" },
        ].map((item) => (
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
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-teal-400"
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

      {/* MOBILE SECTION */}
      <div className="flex items-center gap-4 md:hidden">
        {isLoading ? (
          <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
        ) : isError || !user ? (
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-teal-400"
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

        {/* Burger Menu */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-teal-400"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="
            absolute top-14 left-0 w-full rounded-2xl p-5 
            bg-black text-white 
            flex flex-col space-y-4 shadow-lg md:hidden
          "
        >
          {[
            { name: "Home", href: "/" },
            { name: "Features", href: "/features" },
            { name: "Feed", href: "/feed" },
            { name: "Upload Notes", href: "/upload-notes" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium hover:text-indigo-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

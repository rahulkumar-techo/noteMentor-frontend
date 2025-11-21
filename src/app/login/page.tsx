"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL||"https://notementor.onrender.com"

  return (
    <div className="min-h-screen flex flex-col justify-center items-center  text-white relative overflow-hidden">
      {/* Animated Gradient Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[radial-linear(circle_at_20%_30%,rgba(255,255,255,0.2),transparent_60%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-10 py-12 w-[90%] sm:w-[420px] text-center shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome Back 👋</h1>
        <p className="text-sm text-white/80 mb-8">
          Continue your journey with NoteMentor
        </p>

        {/* 🔥 Primary CTA: Google Login */}
        <Button
            onClick={() => window.location.replace(`${backendUrl}/auth/google`)}
          className="w-full bg-white text-gray-800 hover:bg-gray-100 py-6 text-base font-semibold rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all hover:scale-[1.02]"
        >
          <FcGoogle size={24} />
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center my-8">
          <span className="flex-1 h-px bg-white/30"></span>
          <span className="px-3 text-white/60 text-sm">or</span>
          <span className="flex-1 h-px bg-white/30"></span>
        </div>

        {/* Secondary - Email/Password */}
        <form className="flex flex-col gap-4 text-left">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <Button className="w-full bg-yellow-400 hover:bg-yellow-600 py-3 rounded-xl font-semibold shadow-md mt-2">
            Login
          </Button>
        </form>

        {/* Bottom Links */}
        <p className="text-sm text-white/70 mt-8">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-white underline hover:text-yellow-300">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

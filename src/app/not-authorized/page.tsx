"use client";


import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function NotAuthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-[#1a1a1a] border border-[#FFD700]/40 shadow-xl p-10 rounded-2xl max-w-md text-center"
      >
        <div className="flex justify-center mb-6">
          <ShieldAlert size={80} className="text-[#FFD700]" />
        </div>

        <h1 className="text-3xl font-bold text-[#FFD700] mb-4">
          Access Denied
        </h1>

        <p className="text-gray-300 mb-8 leading-relaxed">
          You don’t have permission to access this page.  
          If you believe this is a mistake, please contact support.
        </p>

        <Link
          href="/dashboard"
          className="inline-block bg-[#FFD700] text-black font-semibold px-6 py-3 rounded-xl hover:bg-[#e6c200] transition"
        >
          Go Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}

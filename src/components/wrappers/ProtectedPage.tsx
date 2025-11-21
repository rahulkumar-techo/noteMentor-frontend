"use client";

import { ReactNode } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Spinner from "../Spinner";

export default function ProtectedPage({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthGuard();

  // 1️⃣ Loading state while checking auth
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-1">
        <Spinner spinnerType="ballTriangle"/>
        <p className="text-gray-500 text-lg">
            Loading user data...</p>
      </div>
    );
  }

  // 2️⃣ If user is logged in AND profile is complete → show page
  if (user && user.isProfileComplete === true) {
    return <>{children}</>;
  }

  // 3️⃣ If hook already redirected, return null to avoid flashing content
  return null;
}

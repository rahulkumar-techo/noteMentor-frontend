"use client";

/**
 * 🔐 LogoutAction Component
 * ------------------------------------------------------
 * - Handles user logout with full UI feedback.
 * - Works as a <Button>, menu item, or icon button.
 * - Triggers /logout endpoint via RTK Query mutation.
 * - Clears cookies (server-side) and redirects to /login.
 * - Uses toast notifications for smooth UX.
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/feature/user/userApi";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LogoutActionProps {
  variant?: "button" | "menu-item" | "icon";
  label?: string;
  className?: string;
  onAfterLogout?: () => void;
}

export default function LogoutAction({
  variant = "menu-item",
  label = "Sign out",
  className = "",
  onAfterLogout,
}: LogoutActionProps) {
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 🧠 Loading indicator
      const toastId = toast.loading("Logging out...");

      // ✅ Always CALL the mutation (not reference it)
      const response = await logoutUser(undefined).unwrap();

      toast.dismiss(toastId);
      toast.success(response?.message || "Logged out successfully 👋");

      // 🔄 Optional callback and redirect
      onAfterLogout?.();
      router.push("/login");
    } catch (err: any) {
      console.error("Logout error:", err);
      toast.dismiss();
      toast.error("Logout failed. Please try again.");
    }
  };

  // 🧩 Variant: Full Button
  if (variant === "button") {
    return (
      <Button
        onClick={handleLogout}
        disabled={isLoading}
        variant="outline"
        className={`flex items-center gap-2 ${className}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Logging out...
          </>
        ) : (
          <>
            <LogOut className="w-4 h-4" />
            {label}
          </>
        )}
      </Button>
    );
  }

  // 🧩 Variant: Icon Only
  if (variant === "icon") {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className={`flex items-center justify-center rounded-full p-2 hover:bg-white/10 transition-colors ${className}`}
        title="Logout"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-gray-300" />
        ) : (
          <LogOut className="w-5 h-5 text-gray-300 hover:text-red-400" />
        )}
      </button>
    );
  }

  // 🧩 Default Variant: Dropdown Menu Item
  return (
    <DropdownMenuItem
      disabled={isLoading}
      onSelect={(e) => {
        e.preventDefault();
        handleLogout();
      }}
      className={`text-red-500 focus:text-red-600 font-medium cursor-pointer flex items-center gap-2 ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin w-4 h-4" /> Logging out...
        </>
      ) : (
        <>
          <LogOut className="w-4 h-4" />
          {label}
        </>
      )}
    </DropdownMenuItem>
  );
}

"use client";

/* Short comments • clean structure */

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

  // logout core
  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      const res = await logoutUser(undefined).unwrap();

      toast.success(res?.message || "Logged out");
      onAfterLogout?.();
      router.push("/login");
    } catch {
      toast.error("Logout failed");
    } finally {
      toast.dismiss(toastId);
    }
  };

  // reusable loading icon/text
  const LoadingIcon = (
    <>
      <Loader2 className="w-4 h-4 animate-spin" />
      Logging out...
    </>
  );

  const NormalIcon = (
    <>
      <LogOut className="w-4 h-4" />
      {label}
    </>
  );

  /* Variant: full button */
  if (variant === "button") {
    return (
      <Button
        onClick={handleLogout}
        disabled={isLoading}
        variant="outline"
        className={`flex items-center gap-2 ${className}`}
      >
        {isLoading ? LoadingIcon : NormalIcon}
      </Button>
    );
  }

  /* Variant: Icon-only */
  if (variant === "icon") {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className={`p-2 rounded-full hover:bg-white/10 transition-colors ${className}`}
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

  /* Default: Dropdown menu item */
  return (
    <DropdownMenuItem
      disabled={isLoading}
      onSelect={(e) => {
        e.preventDefault();
        handleLogout();
      }}
      className={`text-red-500 font-medium cursor-pointer flex items-center gap-2 ${className}`}
    >
      {isLoading ? LoadingIcon : NormalIcon}
    </DropdownMenuItem>
  );
}

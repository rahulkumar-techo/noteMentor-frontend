"use client";

/**
 * ProfileDropdown.tsx
 * ------------------------------------------------------
 * - Custom avatar dropdown (no Shadcn Avatar dependency)
 * - Displays user info & menu items
 * - Uses shared LogoutAction component
 */

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LogoutAction from "@/components/LogoutAction";

type UserInfo = {
  name?: string;
  email?: string;
  image?: string;
  avatar?: { secure_url?: string };
};

export default function ProfileDropdown({ user }: { user?: UserInfo }) {
  const [imageError, setImageError] = useState(false);

  const imageSrc = useMemo(() => {
    if (imageError) return null;
    return user?.image || user?.avatar?.secure_url || null;
  }, [user, imageError]);

  const initials = useMemo(() => {
    if (!user?.name) return "U";
    return (
      user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    );
  }, [user?.name]);

  const fallbackColors = [
    "from-indigo-500 to-teal-400",
    "from-pink-500 to-orange-400",
    "from-purple-500 to-blue-400",
  ];
  const color = fallbackColors[initials.charCodeAt(0) % fallbackColors.length];

  return (
    <DropdownMenu>
      {/* 👤 Avatar */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full p-0 focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all"
        >
          <div className="relative flex items-center justify-center h-9 w-9 rounded-full overflow-hidden border border-white/10 shadow-sm">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={user?.name || "User avatar"}
                fill
                sizes="36px"
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className={`flex items-center justify-center w-full h-full text-white text-sm font-semibold bg-gradient-to-tr ${color}`}
              >
                {initials}
              </div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>

      {/* 🧩 Dropdown Content */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-lg text-sm"
      >
        {/* 🧠 User Info */}
        <div className="px-4 py-3 border-b border-white/10">
          <p className="font-medium truncate">{user?.name || "Guest"}</p>
          {user?.email && (
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          )}
        </div>

        {/* 🔗 Menu Items */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="hover:text-indigo-400 transition-colors">
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings" className="hover:text-indigo-400 transition-colors">
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="hover:text-indigo-400 transition-colors">
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1 border-white/10" />

        {/* 🚪 Logout (Shared Component) */}
        <LogoutAction />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

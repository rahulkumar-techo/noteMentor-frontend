"use client";

/**
 * ProfileDropdown.tsx
 *
 * Description:
 * - Custom profile dropdown (no shadcn Avatar dependency).
 * - Automatically handles Google/Cloudinary/local images.
 * - Includes fallback with initials if image fails.
 * - Accessible, responsive, and visually clean.
 */

import React, { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type UserInfo = {
  name?: string;
  email?: string;
  image?: string;
  avatar?: { secure_url?: string };
};

interface ProfileDropdownProps {
  user?: UserInfo;
  onSignOut?: () => void;
}

export default function ProfileDropdown({ user, onSignOut }: ProfileDropdownProps) {
  const [imageError, setImageError] = useState(false);

  // 🧠 Determine safe image source
  const imageSrc =
    !imageError && (user?.image || user?.avatar?.secure_url)
      ? user?.image || user?.avatar?.secure_url
      : null;

      console.log(imageSrc)

  // 🧩 Generate initials from name
  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  // 🎨 Random background color (for fallback)
  const fallbackColors = [
    "bg-gradient-to-tr from-indigo-500 to-teal-400",
    "bg-gradient-to-tr from-pink-500 to-orange-400",
    "bg-gradient-to-tr from-purple-500 to-blue-400",
  ];
  const color = fallbackColors[initials.charCodeAt(0) % fallbackColors.length];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full p-0 focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all"
        >
          {/* ✅ Custom Avatar */}
          <div
            className="relative flex items-center justify-center h-9 w-9 rounded-full overflow-hidden border border-white/10 shadow-sm"
          >
            {imageSrc && !imageError ? (
              <Image
                src={imageSrc}
                alt={user?.name || "User avatar"}
                onError={() => setImageError(true)}
                className="object-cover w-full h-full transition-opacity duration-200"
                width={20}
                height={20}
              />
            ) : (
              <div
                className={`flex items-center justify-center w-full h-full text-white text-sm font-semibold ${color}`}
              >
                {initials}
              </div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 rounded-xl border border-white/10 bg-popover backdrop-blur-md shadow-lg"
      >
        {/* 🧑 User Info */}
        <div className="px-4 py-3 border-b border-white/10">
          <p className="text-sm font-medium truncate">{user?.name || "Guest"}</p>
          {user?.email && (
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          )}
        </div>

        {/* 🔗 Menu Links */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/me">Profile</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/billing">Billing</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1 border-white/10" />

        {/* 🚪 Sign Out */}
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            onSignOut?.();
          }}
          className="text-red-500 focus:text-red-600 font-medium cursor-pointer"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

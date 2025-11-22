"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CustomAvatar from "@/components/CustomAvatar";
import LogoutAction from "@/components/LogoutAction";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function SidebarUserBlock({ user }: { user: any }) {
  return (
    <div className="px-4 py-4 border-b border-gray-800">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-4 cursor-pointer">
            <CustomAvatar
              src={user?.avatar?.secure_url}
              className="w-11 h-11 rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-white">
                {user?.fullname}
              </span>
              <span className="text-xs text-gray-400">@{user?.username}</span>
            </div>

            <ChevronDown className="w-4 h-4 text-gray-300" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-52 dark:bg-[#161618] border border-gray-700"
          align="start"
        >
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>

          <LogoutAction variant="menu-item" />
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mt-3">
        <span className="inline-block text-[10px] font-semibold px-2 py-1 rounded-md bg-[#FFD700]/20 text-[#FFD700]">
          {user?.role?.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

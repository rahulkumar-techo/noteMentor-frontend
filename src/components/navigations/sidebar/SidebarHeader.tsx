"use client";

import { Bell, Menu, X } from "lucide-react";
import { SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

export default function SidebarHeaderSection() {
  const { open, toggleSidebar } = useSidebar();

  return (
    <SidebarHeader className="p-4 flex justify-between items-center border-b border-gray-800">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden text-gray-300 hover:text-[#FFD700]"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {open && (
          <Link href="/" className="text-xl font-bold text-[#FFD700] tracking-wide">
            NoteMentor
          </Link>
        )}
      </div>

      {open && <Bell className="w-5 h-5 text-[#FFD700]" />}
    </SidebarHeader>
  );
}

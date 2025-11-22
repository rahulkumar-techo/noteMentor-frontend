"use client";

/* Sidebar container with user role navigation */

import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

import { navItemsByRole } from "./sidebar/data";
import SidebarHeaderSection from "./sidebar/SidebarHeader";
import SidebarUserBlock from "./sidebar/SidebarUserBlock";
import SidebarNav from "./sidebar/SidebarNav";
import SidebarFooterSection from "./sidebar/SidebarFooter";

export function NoteMentorSidebar() {
  const { open } = useSidebar();
  const user = useSelector((state: RootState) => state.user.user);
  const role = user?.role?.toLowerCase() ?? "student";

  return (
    <Sidebar
      className={cn(
        "fixed md:relative h-screen flex flex-col border-r bg-[#0b0b0c] text-gray-200 border-gray-800 transition-all",
        open ? "w-64" : "w-0 md:w-20"
      )}
    >
      <SidebarHeaderSection />

      {open && <SidebarUserBlock user={user} />}

      <div className="flex-1 overflow-y-auto">
        <SidebarNav items={navItemsByRole[role]} role={role} />
      </div>

      <SidebarFooterSection open={open} />
    </Sidebar>
  );
}

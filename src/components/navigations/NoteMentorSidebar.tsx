"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

import { useSidebar } from "@/components/ui/sidebar";
import { navItemsByRole } from "./sidebar/data";
import SidebarHeaderSection from "./sidebar/SidebarHeader";
import SidebarUserBlock from "./sidebar/SidebarUserBlock";
import SidebarNav from "./sidebar/SidebarNav";
import SidebarFooterSection from "./sidebar/SidebarFooter";

export function NoteMentorSidebar() {
  const { open } = useSidebar();
  const user = useSelector((state: RootState) => state.user.user);

  const role = user?.role?.toLowerCase() || "student";
  const items = navItemsByRole[role];

  return (
    <Sidebar
      className={cn(
        "transition-all flex flex-col h-screen fixed md:relative border-r z-40 md:z-0",
        open ? "w-64" : "w-0 md:w-20",
        "bg-[#0b0b0c] text-gray-200 border-gray-800"
      )}
    >
      {/* Header */}
      <SidebarHeaderSection />

      {/* User Block */}
      {open && <SidebarUserBlock user={user} />}

      {/* NAV should stretch the middle space */}
      <div className="flex-1 overflow-y-auto">
        <SidebarNav items={items} role={role} />
      </div>

      {/* Footer always sticks to bottom */}
      <SidebarFooterSection open={open} />
    </Sidebar>
  );

}

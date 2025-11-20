"use client";

import {
  Home,
  BookOpen,
  FileText,
  Brain,
  Settings,
  Bell,
  Crown,
  Menu,
  X,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import CustomAvatar from "../CustomAvatar";

/* -----------------------------------------------
   🟡 ROLE-BASED NAVIGATION SYSTEM
-------------------------------------------------- */

const navItemsByRole: any = {
  student: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "My Notes", href: "/dashboard/my-notes" },
    { icon: Brain, label: "Quizzes", href: "/dashboard/quizzes" },
  ],

  teacher: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Subjects", href: "/dashboard/subjects" },
    { icon: Users, label: "Manage Students", href: "/dashboard/manage-students" },
    { icon: Brain, label: "Create Quizzes", href: "/dashboard/quizzes/create" },
  ],

  admin: [
    { icon: Home, label: "Admin Panel", href: "/dashboard/admin/overview" },
    { icon: Users, label: "Users", href: "/dashboard/admin/users" },
    { icon: Shield, label: "Roles & Permissions", href: "/dashboard/admin/role-permissions" },
    { icon: Settings, label: "System Settings", href: "/dashboard/admin/settings" },
  ],
};

export function NoteMentorSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user.user);

  // default to student if no role found
  const role = user?.role?.toLowerCase() || "student";
  const navItems = navItemsByRole[role] || navItemsByRole.student;

  return (
    <Sidebar
      className={cn(
        "transition-all flex flex-col justify-between h-screen fixed md:relative border-r z-40 md:z-0",
        open ? "w-64" : "w-0 md:w-20",
        "bg-[#0b0b0c] text-gray-200 border-gray-800 dark:bg-[#0d0d0f]"
      )}
    >
      {/* -----------------------------------------------
          HEADER
      -------------------------------------------------- */}
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
            <Link
              href="/"
              className="text-xl font-bold text-[#FFD700] tracking-wide"
            >
              NoteMentor
            </Link>
          )}
        </div>

        {open && (
          <Bell className="w-5 h-5 text-[#FFD700] hover:scale-110 transition-transform" />
        )}
      </SidebarHeader>

      {/* -----------------------------------------------
          USER BLOCK
      -------------------------------------------------- */}
      {open && (
        <div className="px-4 py-4 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <CustomAvatar
              src={user?.avatar?.secure_url}
              className="w-11 h-11 rounded-lg"
            />

            <div className="flex flex-col">
              <Link href={"/profile"} className="font-semibold text-sm text-white hover:underline hover:text-yellow-500">
                {user?.fullname}
              </Link>
              <span className="text-xs text-gray-400">
                @{(user as any)?.username}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <span className="inline-block text-[10px] font-semibold px-2 py-1
        rounded-md bg-[#FFD700]/20 text-[#FFD700]">
              {user?.role?.toUpperCase()}
            </span>
          </div>
        </div>
      )}
      {/* -----------------------------------------------
          NAVIGATION
      -------------------------------------------------- */}
      <SidebarContent className="flex-1 mt-2 overflow-y-auto">
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="px-4 mb-2 text-xs tracking-wider text-gray-500 uppercase">
              {role === "admin" ? "Admin Tools" : "Menu"}
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ icon: Icon, label, href }: any) => {
                const isActive = pathname === href;
                return (
                  <SidebarMenuItem key={label}>
                    <Link href={href}>
                      <SidebarMenuButton
                        className={cn(
                          "flex gap-3 items-center w-full px-4 py-2 text-sm rounded-lg transition-all duration-200",
                          "hover:scale-[1.01] active:scale-[0.98]",
                          isActive
                            ? "bg-[#FFD700]/15 border-l-4 border-[#FFD700] text-[#FFD700]"
                            : "text-gray-400 hover:bg-[#FFD700]/5 hover:text-[#FFD700]"
                        )}
                      >
                        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        {open && <span>{label}</span>}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* -----------------------------------------------
          FOOTER CTA
      -------------------------------------------------- */}
      <SidebarFooter className="p-4 border-t border-gray-800">
        <Button
          variant="outline"
          className={cn(
            "w-full font-semibold flex justify-center gap-2 transition-all duration-200",
            "text-gray-300 border-gray-700 hover:bg-[#FFD700]/10 hover:text-[#FFD700]",
            "dark:border-[#FFD700]/40 dark:text-[#FFD700] dark:hover:bg-[#FFD700] dark:hover:text-black"
          )}
        >
          <Crown className="w-4 h-4" />
          {open && "Upgrade to Pro"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

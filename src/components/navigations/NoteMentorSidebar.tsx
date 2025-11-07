/**
 * 🧭 NoteMentor Sidebar (Responsive + Collapsible)
 * - Fully mobile responsive
 * - Auto-hide on small screens
 * - Smooth transitions + dark mode
 * - Active route highlighting
 */

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

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "My Notes", href: "/dashboard/notes" },
  { icon: FileText, label: "Subjects", href: "/dashboard/subjects" },
  { icon: Brain, label: "Quizzes", href: "/dashboard/quizzes" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function NoteMentorSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar
      className={cn(
        "transition-all flex flex-col justify-between h-screen border-r fixed md:relative z-40 md:z-0",
        open ? "w-64" : "w-0 md:w-20",
        "bg-black text-gray-100 border-gray-800 dark:bg-[#0d0d0f] dark:text-white dark:border-[#FFD700]/20"
      )}
    >
      {/* Header */}
      <SidebarHeader className="p-4 border-b border-gray-800 dark:border-[#FFD700]/10 flex items-center justify-between">
        <div className="flex items-center gap-2 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden text-gray-400 hover:text-[#FFD700]"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {open && (
            <h1 className="text-xl font-bold text-[#FFD700] tracking-wide">
              NoteMentor
            </h1>
          )}
        </div>
        {open && <Bell className="w-5 h-5 text-[#FFD700]" />}
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="flex-1 mt-4 overflow-y-auto">
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="text-xs uppercase text-gray-500 dark:text-gray-400 px-4 mb-2">
              Menu
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ icon: Icon, label, href }) => {
                const isActive = pathname === href;
                return (
                  <SidebarMenuItem key={label}>
                    <Link href={href}>
                      <SidebarMenuButton
                        className={cn(
                          "flex items-center gap-3 w-full px-4 py-2 text-sm rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-[#FFD700]/10 text-[#FFD700] border-l-4 border-[#FFD700]"
                            : "text-gray-400 hover:bg-[#FFD700]/5 hover:text-[#FFD700]"
                        )}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
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

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-gray-800 dark:border-[#FFD700]/10">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-center font-semibold transition-all duration-200 hover:scale-[1.02]",
            "border-gray-600 text-gray-300 hover:bg-[#FFD700]/10",
            "dark:border-[#FFD700]/40 dark:text-[#FFD700] dark:hover:bg-[#FFD700] dark:hover:text-black"
          )}
        >
          <Crown className="w-4 h-4 mr-2" />
          {open && "Upgrade to Pro"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

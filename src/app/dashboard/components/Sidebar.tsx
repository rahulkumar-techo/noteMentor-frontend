/**
 * NoteMentor Sidebar (Dark + Gold Theme)
 * Built using Shadcn UI Sidebar primitives
 * Elegant, responsive, and modular
 */

"use client"

import {
  Home,
  BookOpen,
  FileText,
  Brain,
  Settings,
  Bell,
  Crown,
} from "lucide-react"
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BookOpen, label: "My Notes" },
  { icon: FileText, label: "Subjects" },
  { icon: Brain, label: "Quizzes" },
  { icon: Settings, label: "Settings" },
]

export function NoteMentorSidebar() {
  return (
    <Sidebar className="bg-[#0e0e10] text-white border-r border-[#FFD700]/20 w-64 flex flex-col justify-between">
      {/* Header */}
      <SidebarHeader className="p-4 border-b border-[#FFD700]/10 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#FFD700]">NoteMentor</h1>
        <Bell className="w-5 h-5 text-[#FFD700]" />
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="mt-2 flex-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase text-gray-400 px-4">
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ icon: Icon, label, active }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    className={cn(
                      "flex items-center text-sm rounded-lg px-4 py-2 transition-all w-full",
                      active
                        ? "bg-[#FFD700]/10 text-[#FFD700] border-l-4 border-[#FFD700]"
                        : "text-gray-300 hover:bg-[#FFD700]/5 hover:text-[#FFD700]"
                    )}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-[#FFD700]/10">
        <Button
          variant="outline"
          className="w-full border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-semibold"
        >
          <Crown className="w-4 h-4 mr-2" />
          Upgrade to Pro
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

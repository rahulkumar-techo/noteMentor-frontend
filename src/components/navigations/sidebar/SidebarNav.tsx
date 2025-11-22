"use client";

import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function SidebarNav({ items, role }: any) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-4 mb-2 text-xs tracking-wider text-gray-500 uppercase">
        {role === "admin" ? "Admin Tools" : "Menu"}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ icon: Icon, label, href }: any) => {
            const active = pathname === href;

            return (
              <SidebarMenuItem key={label}>
                <Link href={href}>
                  <SidebarMenuButton
                    className={cn(
                      "flex gap-3 items-center w-full px-4 py-2 text-sm rounded-lg transition-all",
                      active
                        ? "bg-[#FFD700]/15 border-l-4 border-[#FFD700] text-[#FFD700]"
                        : "text-gray-400 hover:bg-[#FFD700]/5 hover:text-[#FFD700]"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

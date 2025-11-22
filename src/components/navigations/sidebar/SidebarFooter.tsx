"use client";

import { SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SidebarFooterSection({ open }: { open: boolean }) {
  return (
    <SidebarFooter className="p-4 border-t border-gray-800">
      <Button
        variant="outline"
        className={cn(
          "w-full font-semibold flex justify-center gap-2",
          "text-gray-300 border-gray-700 hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
        )}
      >
        <Crown className="w-4 h-4" />
        {open && "Upgrade to Pro"}
      </Button>
    </SidebarFooter>
  );
}

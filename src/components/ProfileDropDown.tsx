/**
 * ProfileDropdown.tsx
 *
 * Description:
 * A reusable Profile dropdown component built with shadcn/ui primitives and Tailwind CSS.
 * - Default export is a React component.
 * - Accepts an optional `user` prop to show avatar, name, and email.
 * - Includes actions: View Profile, Settings, Billing, and Sign out.
 * - Accessibility-friendly and responsive.
 *
 * Usage:
 * <ProfileDropdown user={{ name: 'Rahul Kumar', email: 'rahul@example.com', image: '/me.jpg' }} onSignOut={handleSignOut} />
 */

import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";


type Props = {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
  onSignOut?: () => void;
};

export default function ProfileDropdown({ user, onSignOut }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full p-0">
          <Avatar className="h-9 w-9">
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name ?? "avatar"} />
            ) : (
              <AvatarFallback>{(user?.name ?? "U").slice(0, 2)}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="px-4 py-3">
          <p className="text-sm font-medium">{user?.name ?? "Guest"}</p>
          {user?.email && <p className="text-xs text-muted-foreground truncate">{user.email}</p>}
        </div>

        <DropdownMenuSeparator />

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

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            onSignOut?.();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

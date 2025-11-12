"use client";

/**
 * EditProfileDialog.tsx
 * ------------------------------------------------------
 * Shadcn dialog that wraps the profile edit form.
 */

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileForm from "./ProfileForm";

export default function EditProfileDialog({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  user: any;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-white/10 backdrop-blur-lg border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">Edit Profile</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update your academic and personalization details.
          </DialogDescription>
        </DialogHeader>

        <ProfileForm user={user} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

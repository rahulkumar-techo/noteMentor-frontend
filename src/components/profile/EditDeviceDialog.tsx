"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import DeviceForm from "./forms/DeviceForm";


export default function EditDeviceDialog({ open, setOpen, user }: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-white/10 backdrop-blur-lg border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">Edit Device & Settings</DialogTitle>
          <DialogDescription className="text-gray-400">
            Manage your theme, device type, and sync preferences.
          </DialogDescription>
        </DialogHeader>

        <DeviceForm user={user} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

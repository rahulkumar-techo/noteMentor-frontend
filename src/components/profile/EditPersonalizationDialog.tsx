"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PersonalizationForm from "./forms/PersonalizationForm";

export default function EditPersonalizationDialog({ open, setOpen, user }: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-white/10 backdrop-blur-lg border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">Edit Learning Preferences</DialogTitle>
          <DialogDescription className="text-gray-400">
            Adjust your speed, goals, and focus time.
          </DialogDescription>
        </DialogHeader>
        <PersonalizationForm user={user} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

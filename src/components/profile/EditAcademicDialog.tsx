"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AcademicForm from "./forms/AcademicForm";

export default function EditAcademicDialog({ open, setOpen, user }: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-white/10 backdrop-blur-lg border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">Edit Academic Info</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update your board, class, and subjects.
          </DialogDescription>
        </DialogHeader>
        <AcademicForm user={user} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

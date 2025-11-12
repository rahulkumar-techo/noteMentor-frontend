"use client";

/**
 * 🗑️ DeleteFileAlert
 * ------------------------------------------------------------
 * - Generic confirmation dialog for deleting images, PDFs, or thumbnails
 * - Works inside absolute containers (thumbnail/image cards)
 * - Handles async delete actions and user feedback
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteFileAlertProps {
  type: "image" | "pdf" | "thumbnail";
  public_id: string;
  onConfirm: (type: "image" | "pdf" | "thumbnail", id: string) => Promise<void>;
}

export function DeleteFileAlert({
  type,
  public_id,
  onConfirm,
}: DeleteFileAlertProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onConfirm(type, public_id);
      setOpen(false);
    } catch (err) {
      console.error(`❌ Failed to delete ${type}:`, err);
      alert(`Failed to delete ${type}. Try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="bg-black/60 hover:bg-red-600 text-white rounded-full p-1 transition duration-200 shadow-md"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-[#0b0b0b] border border-[#FFD700]/30 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#FFD700] capitalize">
            Delete this {type}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This action cannot be undone. The selected {type} will be
            permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel
            disabled={loading}
            className="bg-gray-800 text-white hover:bg-gray-700"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" /> Deleting...
              </>
            ) : (
              "Yes, delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

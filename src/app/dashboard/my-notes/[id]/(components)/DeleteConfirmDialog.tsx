import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function DeleteConfirmDialog({ open, onOpenChange, title, onDelete, deleting }: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0a0a0a] text-white border border-[#ff4d4d]/40 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-[#ff4d4d] text-lg">Confirm Delete</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-300 mt-2">Are you sure you want to delete <b>{title}</b>? This action cannot be undone.</p>
        <DialogFooter className="mt-5 flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10">Cancel</Button>
          <Button onClick={onDelete} disabled={deleting} className="bg-[#ff4d4d] hover:bg-[#e63e3e] text-white">{deleting ? "Deleting..." : "Delete"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
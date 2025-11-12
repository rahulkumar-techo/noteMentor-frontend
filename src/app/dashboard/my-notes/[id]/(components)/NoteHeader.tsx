"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";

export function NoteHeader({ title, onBack, onEdit, onDelete }: any) {
  return (
    <header className="flex flex-col gap-4 w-full border border-gray-800 bg-[#0d0d0f]/80 p-4 rounded-2xl shadow-sm backdrop-blur-md">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="text-[#FFD700] border-[#FFD700]/40 hover:bg-[#FFD700]/10 flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={onEdit}
            className="bg-[#FFD700] text-black hover:bg-[#e6c800] flex items-center gap-1 transition-all"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onDelete}
            className="border-[#ff4d4d]/40 text-[#ff4d4d] hover:bg-[#ff4d4d]/10 flex items-center gap-1 transition-all"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-base sm:text-lg font-semibold text-gray-300 flex items-center gap-2">
          <span className="text-white/70">Note Title:</span>
          <span className=" text-transparent bg-linear-to-r from-[#FFD700] to-[#ffae00] bg-clip-text  font-bold text-lg sm:text-xl truncate max-w-[85vw]">
            {title}
          </span>
        </h1>
      </div>
    </header>
  );
}
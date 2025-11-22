"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";

export function NoteHeader({ title, onBack, onEdit, onDelete }: any) {
  return (
    <header
      className="
        flex flex-col gap-4 w-full 
        bg-white dark:bg-neutral-900
        border border-gray-300 dark:border-neutral-700 
        p-4 rounded-2xl shadow-sm backdrop-blur-md
        text-gray-900 dark:text-white
        transition-colors
      "
    >
      <div className="flex justify-between items-center flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="
            text-yellow-600 dark:text-yellow-400 
            border-yellow-500/40 dark:border-yellow-500/30 
            hover:bg-yellow-500/10 transition-all
            flex items-center gap-2
          "
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={onEdit}
            className="
              bg-yellow-500 text-black hover:bg-yellow-600
              transition-all flex items-center gap-1
            "
          >
            <Edit2 className="w-4 h-4" /> Edit
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={onDelete}
            className="
              border-red-500/40 text-red-500 
              hover:bg-red-500/10 transition-all 
              flex items-center gap-1
            "
          >
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <h1 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <span className="text-gray-500 dark:text-gray-400">Note Title:</span>
          <span
            className="
              bg-clip-text text-transparent 
              bg-linear-to-r from-yellow-400 to-yellow-600 
              font-bold text-lg sm:text-xl truncate max-w-[85vw]
            "
          >
            {title}
          </span>
        </h1>
      </div>
    </header>
  );
}

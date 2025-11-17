
"use client";

import { Eye } from "lucide-react";

export default function ViewCounter({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2 text-gray-600 text-sm">
      <Eye size={18} />
      <span>{count}</span>
    </div>
  );
}

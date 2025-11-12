"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Eye } from "lucide-react";

export interface NoteCardProps {
  title: string;
  descriptions?: string;
  thumbnail?: string | null;
  createdAt: string;
  onView: () => void;
}

export default function NoteCard({
  title,
  descriptions,
  thumbnail,
  createdAt,
  onView,
}: NoteCardProps) {
  const hasThumbnail =
    typeof thumbnail === "string" && thumbnail.trim().length > 0;

  return (
    <Card className="w-full bg-[#0d0d0f]/80 border border-gray-800 hover:border-[#FFD700]/40 hover:shadow-[#FFD700]/10 transition-all duration-200 shadow-md rounded-2xl overflow-hidden">
      <CardContent className="p-2 sm:p-3 space-y-2">
        {hasThumbnail ? (
          <div className="relative w-full h-28 sm:h-36 rounded-md overflow-hidden">
            <Image
              src={thumbnail!}
              alt={title}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        ) : (
          <div className="w-full h-28 sm:h-36 bg-gray-800/40 flex items-center justify-center text-gray-500 text-xs sm:text-sm rounded-md">
            No Thumbnail
          </div>
        )}

        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-[#FFD700] truncate">
            {title}
          </h3>
          {descriptions && (
            <p className="text-gray-400 text-[10px] sm:text-xs line-clamp-2">
              {descriptions}
            </p>
          )}
        </div>

        <div className="flex justify-between flex-col md:flex-row items-start text-[9px] sm:text-xs text-gray-500">
          <p>{new Date(createdAt).toLocaleDateString()}</p>
          <Button
            onClick={onView}
            variant="outline"
            size="sm"
            className="border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10 px-2 sm:px-3 h-6 sm:h-8"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

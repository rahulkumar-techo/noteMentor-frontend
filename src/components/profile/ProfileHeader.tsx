"use client";

/**
 * ProfileHeader.tsx
 * ------------------------------------------------------
 * Displays avatar, name, email, and profile completion.
 */

import React, { useMemo } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function ProfileHeader({ user, onEdit }: { user: any; onEdit: () => void }) {
  const completion = useMemo(() => {
    const fields = {
      fullname: user?.fullname,
      board: user?.academic?.board,
      classOrYear: user?.academic?.classOrYear,
      learningSpeed: user?.personalization?.learningSpeed,
      theme: user?.settings?.theme,
    };
    const filled = Object.values(fields).filter((v) => v && v !== "").length;
    return Math.round((filled / Object.keys(fields).length) * 100);
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-teal-400 border border-white/20">
          <Image
            src={user?.avatar?.secure_url || user?.image || "/default-avatar.png"}
            alt="User avatar"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-lg font-semibold">{user?.fullname}</p>
        <p className="text-sm text-gray-300">{user?.email}</p>
      </div>

      <div className="flex flex-col w-full md:w-1/2 gap-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Profile Completion</span>
          <span className="text-sm font-semibold text-indigo-400">{completion}%</span>
        </div>
        <Progress value={completion} className="h-2 bg-white/10" />
        <div className="flex justify-end mt-2">
          <Button onClick={onEdit} variant="outline" className="border-white/20">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

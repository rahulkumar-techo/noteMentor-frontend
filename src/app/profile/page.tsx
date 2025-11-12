"use client";

/**
 * ⚡ Profile Page — NoteMentor
 * ------------------------------------------------------
 * - Elegant glassmorphism UI with smooth animations
 * - Edit Header (name, avatar, etc.)
 * - Academic + Personalization dialogs
 * - Integrated with RTK Query + Toast messages
 */

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit3, UserPen } from "lucide-react";
import toast from "react-hot-toast";

import {
  useGetUserQuery,
  useUpdateAcademicMutation,
  useUpdatePersonalizationMutation,
} from "@/feature/user/userApi";

import useApiMessage from "@/hooks/api-message";
import EditAcademicDialog from "@/components/profile/EditAcademicDialog";
import EditPersonalizationDialog from "@/components/profile/EditPersonalizationDialog";
import EditDeviceDialog from "@/components/profile/EditDeviceDialog";

export default function ProfilePage() {
  // 🧠 Fetch user data
  const { data, isLoading, isError } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const user = data?.data || data?.user || {};

  // 🎓 Academic mutation
  const [
    updateAcademic,
    { data: academicData, isError: isAcademicError, error: academicError, isSuccess: isAcademicSuccess },
  ] = useUpdateAcademicMutation();

  useApiMessage({
    isError: isAcademicError,
    error: academicError,
    isSuccess: isAcademicSuccess,
    successMessage: academicData?.data?.message || "Academic record updated successfully!",
  });

  // 💡 Personalization mutation
  const [
    updatePersonalization,
    { isError: isPersonalError, error: personalError, isSuccess: isPersonalSuccess, data: personalData },
  ] = useUpdatePersonalizationMutation();

  useApiMessage({
    isError: isPersonalError,
    error: personalError,
    isSuccess: isPersonalSuccess,
    successMessage:
      personalData?.data?.message || "Personalization preferences updated successfully!",
  });

  // 🧩 Dialog states
  const [academicOpen, setAcademicOpen] = useState(false);
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  const [headerEdit, setHeaderEdit] = useState(false);

  // 📊 Profile completion calculation
  const completion = useMemo(() => {
    if (!user) return 0;
    const fields = [
      user.fullname,
      user.academic?.board,
      user.academic?.classOrYear,
      user.personalization?.learningSpeed,
      user.settings?.theme,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [user]);

  // 🌀 Loading / Error states
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading your profile...
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load user data.
      </div>
    );

  if (!user?.fullname) {
    toast.error("User not found!");
    return null;
  }

  // 🎨 Main layout
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 to-gray-900 text-white px-4 py-8"
    >
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-10 transition-all">

        {/* 🔹 Header Section */}
        <div className="relative flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6">
          {/* 🖼️ Avatar + Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="relative group">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                <Image
                  src={user?.avatar?.secure_url || "/default-avatar.png"}
                  alt="User avatar"
                  fill
                  sizes="112px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* ✏️ Edit Header Button */}
              <button
                onClick={() => setHeaderEdit(true)}
                className="absolute bottom-2 right-2 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
              >
                <UserPen className="w-4 h-4 text-white" />
              </button>
            </div>

            <p className="text-lg sm:text-xl font-semibold mt-3">
              {user.fullname}
            </p>
            <p className="text-sm text-gray-300">{user.email}</p>
            <span className="text-xs text-gray-400 mt-1 capitalize">
              Role: {user.role || "guest"}
            </span>
          </div>

          {/* 📊 Progress Bar */}
          <div className="flex flex-col w-full md:w-1/2 gap-3 mt-4 md:mt-0">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Profile Completion</span>
              <span className="font-semibold text-indigo-400">{completion}%</span>
            </div>
            <Progress value={completion} className="h-2 bg-white/10" />
          </div>
        </div>

        {/* 🔧 Editable Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <ProfileCard
            title="🎓 Academic Info"
            fields={[
              { label: "Board", value: user.academic?.board },
              { label: "Class", value: user.academic?.classOrYear },
            ]}
            onEdit={() => setAcademicOpen(true)}
          />

          <ProfileCard
            title="💡 Personalization"
            fields={[
              { label: "Speed", value: user.personalization?.learningSpeed },
              { label: "Goal", value: user.personalization?.goalType },
            ]}
            onEdit={() => setPersonalizationOpen(true)}
          />

          <ProfileCard
            title="⚙️ Device Settings"
            fields={[
              { label: "Theme", value: user.settings?.theme },
              { label: "Storage", value: user.settings?.storageSync },
            ]}
            onEdit={() => toast.success("Device settings coming soon!")}
          />
        </div>

        {/* 🕒 Footer */}
        <div className="text-center text-gray-400 pt-6 text-xs">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* 🔸 Dialogs */}
      <EditAcademicDialog open={academicOpen} setOpen={setAcademicOpen} user={user} />
      <EditPersonalizationDialog open={personalizationOpen} setOpen={setPersonalizationOpen} user={user} />
      <EditDeviceDialog open={false} setOpen={() => { }} user={user} />

      {/* 🧩 Header Edit Dialog */}
      {headerEdit && (
        <HeaderEditDialog onClose={() => setHeaderEdit(false)} user={user} />
      )}
    </motion.div>
  );
}

/** 🧩 Reusable ProfileCard Component */
const ProfileCard = ({
  title,
  fields,
  onEdit,
}: {
  title: string;
  fields: { label: string; value?: string }[];
  onEdit: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="p-5 rounded-xl bg-white/10 border border-white/10 shadow-sm flex flex-col justify-between transition-all duration-300"
  >
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {fields.map((field, idx) => (
        <p key={idx} className="text-sm text-gray-400">
          {field.label}: {field.value || "N/A"}
        </p>
      ))}
    </div>
    <Button
      onClick={onEdit}
      variant="outline"
      size="sm"
      className="mt-3 border-white/20 w-full sm:w-auto text-sm"
    >
      <Edit3 className="w-4 h-4 mr-1" /> Edit
    </Button>
  </motion.div>
);

/** 🧩 Header Edit Dialog Component */
const HeaderEditDialog = ({
  onClose,
  user,
}: {
  onClose: () => void;
  user: any;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 w-80 sm:w-96 text-center"
      >
        <h3 className="text-lg font-semibold mb-3">Edit Profile Header</h3>
        <p className="text-gray-400 text-sm mb-4">
          Feature coming soon — update name, avatar, and role!
        </p>
        <div className="flex justify-center">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

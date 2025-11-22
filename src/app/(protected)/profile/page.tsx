"use client";

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

/* ------------------------------------------------------------
   ✨ Profile Page — Clean / Responsive / Theme-Aware
------------------------------------------------------------- */

export default function ProfilePage() {
  // 🧠 Fetch user
  const { data, isLoading, isError } = useGetUserQuery(undefined);
  const user = data?.data || data?.user || {};

  // 🎓 Academic mutation
  const [
    updateAcademic,
    { data: academicData, isError: isAcademicError, error: academicError, isSuccess: isAcademicSuccess }
  ] = useUpdateAcademicMutation();

  useApiMessage({
    isError: isAcademicError,
    error: academicError,
    isSuccess: isAcademicSuccess,
    successMessage: academicData?.data?.message || "Academic info updated!",
  });

  // 💡 Personalization mutation
  const [
    updatePersonalization,
    { isError: isPersonalError, error: personalError, isSuccess: isPersonalSuccess, data: personalData }
  ] = useUpdatePersonalizationMutation();

  useApiMessage({
    isError: isPersonalError,
    error: personalError,
    isSuccess: isPersonalSuccess,
    successMessage: personalData?.data?.message || "Preferences updated!",
  });

  // ✏️ Dialog states
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
      user.personalization?.goalType,
    ];

    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [user]);

  // 🔄 Loading
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

  /* ------------------------------------------------------------
     🎨 UI Layout
  ------------------------------------------------------------- */

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        min-h-screen px-4 py-10 
        bg-white dark:bg-black 
        text-black dark:text-white
        transition-colors
        flex items-center justify-center
      "
    >
      <div
        className="
          w-full max-w-5xl 
          bg-white dark:bg-neutral-900 
          border border-gray-200 dark:border-neutral-800
          rounded-3xl shadow-xl 
          p-6 sm:p-8 
          space-y-12
        "
      >
        {/* ------------------------------------------
            TOP SECTION — Avatar / Info / Progress
        ------------------------------------------- */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          
          {/* Avatar + User Info */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-300 dark:border-neutral-700">
                <Image
                  src={user?.avatar?.secure_url || "/default-avatar.png"}
                  alt="Avatar"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              <button
                onClick={() => setHeaderEdit(true)}
                className="
                  absolute bottom-1 right-1 
                  p-2 rounded-full 
                  bg-black/20 dark:bg-white/10
                  hover:bg-black/30 dark:hover:bg-white/20
                  backdrop-blur-md
                "
              >
                <UserPen className="w-4 h-4 text-white" />
              </button>
            </div>

            <p className="mt-3 text-xl font-semibold">{user.fullname}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {user.email}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs capitalize mt-1">
              Role: {user.role}
            </p>
          </div>

          {/* Progress */}
          <div className="w-full md:w-1/2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-300">Profile completion</span>
              <span className="font-semibold text-yellow-500">{completion}%</span>
            </div>
            <Progress value={completion} className="h-2 bg-gray-200 dark:bg-neutral-800" />
          </div>
        </div>

        {/* ------------------------------------------
            GRID SECTION — Academic + Personalization
        ------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              { label: "Learning speed", value: user.personalization?.learningSpeed },
              { label: "Goal", value: user.personalization?.goalType },
            ]}
            onEdit={() => setPersonalizationOpen(true)}
          />
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-xs">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>

      {/* Dialogs */}
      <EditAcademicDialog open={academicOpen} setOpen={setAcademicOpen} user={user} />
      <EditPersonalizationDialog open={personalizationOpen} setOpen={setPersonalizationOpen} user={user} />

      {headerEdit && (
        <HeaderEditDialog onClose={() => setHeaderEdit(false)} />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------
   🔹 Profile Card Component
------------------------------------------------------------- */
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
    whileHover={{ scale: 1.02 }}
    className="
      p-5 rounded-xl 
      bg-gray-50 dark:bg-neutral-800 
      border border-gray-200 dark:border-neutral-700 
      shadow-sm transition-all
    "
  >
    <h3 className="text-lg font-semibold mb-3">{title}</h3>

    {fields.map((f, i) => (
      <p key={i} className="text-sm text-gray-600 dark:text-gray-300">
        {f.label}: <span className="text-white">{f.value || "N/A"}</span>
      </p>
    ))}

    <Button
      size="sm"
      variant="outline"
      onClick={onEdit}
      className="mt-4 border-gray-300 dark:border-neutral-600"
    >
      <Edit3 className="w-4 h-4 mr-1" /> Edit
    </Button>
  </motion.div>
);

/* ------------------------------------------------------------
   🔹 Header Edit Dialog
------------------------------------------------------------- */ 
const HeaderEditDialog = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="
        p-6 w-80 sm:w-96 
        bg-white dark:bg-neutral-900
        border border-gray-200 dark:border-neutral-700
        rounded-2xl shadow-xl text-center
      "
    >
      <h3 className="text-lg font-semibold">Edit Profile Header</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Upload avatar, change name — coming soon!
      </p>

      <Button className="mt-6" onClick={onClose}>
        Close
      </Button>
    </motion.div>
  </div>
);

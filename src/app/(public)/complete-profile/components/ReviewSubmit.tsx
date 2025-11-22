"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

// shadcn UI
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ReviewSubmit({ formData }: any) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={ref}
      className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#FFD700]/40 text-white"
    >
      <h2 className="text-2xl font-bold text-[#FFD700] mb-4">
        Review & Confirm
      </h2>

      <p className="text-gray-300 mb-6">
        Please review your information before submitting.
      </p>

      {/* ------------ BASIC INFORMATION --------------- */}
      <Card className="bg-[#0f0f0f] border border-[#FFD700]/30 mb-6">
        <CardContent className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-[#FFD700]">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
            <div>
              <Label className="text-gray-400 text-xs">Role</Label>
              <p className="font-medium">{formData.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ------------ ACADEMIC INFORMATION --------------- */}
      <Card className="bg-[#0f0f0f] border border-[#FFD700]/30 mb-6">
        <CardContent className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-[#FFD700]">
            Academic Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
            <div>
              <Label className="text-gray-400 text-xs">Board</Label>
              <p className="font-medium">{formData.academic.board || "—"}</p>
            </div>

            <div>
              <Label className="text-gray-400 text-xs">Class / Year</Label>
              <p className="font-medium">{formData.academic.classOrYear || "—"}</p>
            </div>

            <div className="sm:col-span-2">
              <Label className="text-gray-400 text-xs">Subjects</Label>
              <p className="font-medium">
                {formData.academic.subjects.length > 0
                  ? formData.academic.subjects.join(", ")
                  : "—"}
              </p>
            </div>

            <div>
              <Label className="text-gray-400 text-xs">Language</Label>
              <p className="font-medium">
                {formData.academic.languagePreference}
              </p>
            </div>

            <div className="sm:col-span-2">
              <Label className="text-gray-400 text-xs">Exam Goal</Label>
              <p className="font-medium">{formData.academic.examGoal || "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ------------ PERSONALIZATION ---------------- */}
      <Card className="bg-[#0f0f0f] border border-[#FFD700]/30">
        <CardContent className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-[#FFD700]">
            Learning Personalization
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
            <div>
              <Label className="text-gray-400 text-xs">Learning Speed</Label>
              <p className="font-medium">
                {formData.personalization.learningSpeed}
              </p>
            </div>

            <div>
              <Label className="text-gray-400 text-xs">Focus Duration</Label>
              <p className="font-medium">
                {formData.personalization.focusDuration} minutes
              </p>
            </div>

            <div>
              <Label className="text-gray-400 text-xs">Goal Type</Label>
              <p className="font-medium">
                {formData.personalization.goalType
                  .replace("_", " ")
                  .toUpperCase()}
              </p>
            </div>

            <div>
              <Label className="text-gray-400 text-xs">Note Upload Type</Label>
              <p className="font-medium">
                {formData.personalization.noteUploadType}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

import StepWrapper from "./components/StepWrapper";
import BasicInfo from "./components/BasicInfo";
import AcademicInfo from "./components/AcademicInfo";
import PersonalizationInfo from "./components/PersonalizationInfo";
import ReviewSubmit from "./components/ReviewSubmit";

import { FormDataType } from "./types";

import { useComplete_profileMutation } from "@/feature/user/userApi";
import useApiMessage from "@/hooks/api-message";

export default function CompleteProfilePage() {
  const router = useRouter();

  /* -----------------------------
       Main form structure
  ------------------------------ */
  const [formData, setFormData] = useState<FormDataType>({
    role: "guest",
    academic: {
      board: "",
      classOrYear: "",
      subjects: [],
      languagePreference: "english",
      examGoal: "",
    },
    personalization: {
      learningSpeed: "moderate",
      goalType: "concept_clarity",
      focusDuration: 25,
      noteUploadType: "mixed",
    },
  });

  /* -----------------------------
      Type-Safe Update Functions
  ------------------------------ */

  // For nested sections: academic + personalization
  function updateFormData<
    Section extends "academic" | "personalization",
    Key extends keyof FormDataType[Section]
  >(section: Section, key: Key, value: FormDataType[Section][Key]) {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  }

  // For root-level fields: role
  function updateRootField<Key extends "role">(
    key: Key,
    value: FormDataType[Key]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  /* -----------------------------
      Step System
  ------------------------------ */
  const steps = [
    <BasicInfo
      key="basic"
      formData={formData}
      updateRootField={updateRootField}
    />,

    <AcademicInfo
      key="academic"
      formData={formData}
      updateFormData={updateFormData}
    />,

    <PersonalizationInfo
      key="personal"
      formData={formData}
      updateFormData={updateFormData}
    />,

    <ReviewSubmit
      key="review"
      formData={formData}
    />,
  ];

  const [step, setStep] = useState(0);
  const isLastStep = step === steps.length - 1;

  /* -----------------------------
      Backend Submission
  ------------------------------ */
  const [
    completeProfile,
    { isLoading, isSuccess, isError, error, data },
  ] = useComplete_profileMutation();

  useApiMessage({
    isSuccess,
    isError,
    error,
    successMessage: data?.data?.message,
  });



  const handleSubmit = async () => {
    await completeProfile(formData);
     router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">

        {/* Progress bar */}
        <div className="flex justify-between mb-6 px-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 mx-1 rounded-full ${idx <= step ? "bg-[#FFD700]" : "bg-gray-700"
                }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <StepWrapper>{steps[step]}</StepWrapper>

        {/* Footer Buttons */}
        <div className="flex justify-between mt-6">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-6 py-3 rounded-xl bg-gray-700 text-white hover:bg-gray-600"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {isLastStep ? (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 rounded-xl bg-[#FFD700] text-black font-bold hover:bg-[#e6c200] disabled:opacity-50"
            >
              {isLoading ? "Submitting..." : "Finish"}
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="px-6 py-3 rounded-xl bg-[#FFD700] text-black font-bold hover:bg-[#e6c200]"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

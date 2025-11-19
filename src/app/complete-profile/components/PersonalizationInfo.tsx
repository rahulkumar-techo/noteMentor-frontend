"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

// shadcn/ui components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function PersonalizationInfo({ formData, updateFormData }: any) {
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
      className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#FFD700]/40"
    >
      <h2 className="text-2xl font-bold text-[#FFD700] mb-4">
        Learning Personalization
      </h2>

      {/* Learning Speed */}
      <Label className="text-gray-300">Learning Speed</Label>
      <Select
        value={formData.personalization.learningSpeed}
        onValueChange={(v) =>
          updateFormData("personalization", "learningSpeed", v)
        }
      >
        <SelectTrigger className="mt-2 mb-5 bg-[#0f0f0f] text-white border-[#FFD700]/40">
          <SelectValue placeholder="Select speed" />
        </SelectTrigger>

        <SelectContent className="bg-[#1a1a1a] text-white border-[#FFD700]/20">
          <SelectItem value="fast">Fast</SelectItem>
          <SelectItem value="moderate">Moderate</SelectItem>
          <SelectItem value="slow">Slow</SelectItem>
        </SelectContent>
      </Select>

      {/* Focus Duration */}
      <Label className="text-gray-300 mt-4 block">Focus Duration (minutes)</Label>
      <Input
        type="number"
        value={formData.personalization.focusDuration}
        onChange={(e) =>
          updateFormData(
            "personalization",
            "focusDuration",
            Number(e.target.value)
          )
        }
        className="mt-2 mb-5 bg-[#0f0f0f] text-white border-[#FFD700]/40"
        placeholder="e.g. 25"
      />

      {/* Goal Type */}
      <Label className="text-gray-300 mt-4 block">Goal Type</Label>
      <Select
        value={formData.personalization.goalType}
        onValueChange={(v) =>
          updateFormData("personalization", "goalType", v)
        }
      >
        <SelectTrigger className="mt-2 bg-[#0f0f0f] text-white border-[#FFD700]/40">
          <SelectValue placeholder="Select learning goal" />
        </SelectTrigger>

        <SelectContent className="bg-[#1a1a1a] text-white border-[#FFD700]/20">
          <SelectItem value="concept_clarity">Concept Clarity</SelectItem>
          <SelectItem value="score_improvement">Score Improvement</SelectItem>
          <SelectItem value="revision">Revision</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

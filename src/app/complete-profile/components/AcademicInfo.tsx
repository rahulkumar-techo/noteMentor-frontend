"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

// shadcn components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function AcademicInfo({ formData, updateFormData }: any) {
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
        Academic Details
      </h2>

      {/* Board */}
      <Label className="text-gray-300">Board / Exam Type</Label>
      <Input
        value={formData.academic.board}
        onChange={(e) =>
          updateFormData("academic", "board", e.target.value)
        }
        className="mt-2 mb-5 bg-[#0f0f0f] text-white border-[#FFD700]/40"
        placeholder="CBSE, ICSE, State Board..."
      />

      {/* Class / Year */}
      <Label className="text-gray-300">Class / Year</Label>
      <Input
        value={formData.academic.classOrYear}
        onChange={(e) =>
          updateFormData("academic", "classOrYear", e.target.value)
        }
        className="mt-2 mb-5 bg-[#0f0f0f] text-white border-[#FFD700]/40"
        placeholder="10th, 12th, Graduation..."
      />

      {/* Subjects */}
      <Label className="text-gray-300">
        Subjects (comma separated)
      </Label>
      <Input
        value={formData.academic.subjects.join(", ")}
        onChange={(e) =>
          updateFormData(
            "academic",
            "subjects",
            e.target.value.split(",").map((s) => s.trim())
          )
        }
        className="mt-2 mb-5 bg-[#0f0f0f] text-white border-[#FFD700]/40"
        placeholder="Math, Science, English..."
      />

      {/* Language Preference */}
      <Label className="text-gray-300">Language Preference</Label>
      <Select
        value={formData.academic.languagePreference}
        onValueChange={(v) =>
          updateFormData("academic", "languagePreference", v)
        }
      >
        <SelectTrigger className="mt-2 bg-[#0f0f0f] text-white border-[#FFD700]/40">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent className="bg-[#1a1a1a] text-white border-[#FFD700]/20">
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="hindi">Hindi</SelectItem>
          <SelectItem value="hinglish">Hinglish</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

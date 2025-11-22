"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function BasicInfo({ formData, updateRootField }: any) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35 });
  }, []);

  return (
    <div ref={ref} className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#FFD700]/40">
      <h2 className="text-2xl font-bold text-[#FFD700] mb-1">Basic Information</h2>

      <label className="text-gray-300 font-medium">Your Role</label>
      <select
        value={formData.role}
        onChange={(e) => updateRootField("role", e.target.value)}
        className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-[#FFD700]/30 text-white"
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="guest">Guest</option>
      </select>
    </div>
  );
}

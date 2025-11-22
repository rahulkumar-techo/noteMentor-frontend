
"use client";

import React from "react";
import NoteForm from "@/app/(protected)/dashboard/create-questions/(components)/NoteForm";
import DisplayData from "@/app/(protected)/dashboard/create-questions/(components)/DisplayData";
import ProtectedRoute from "@/components/security/ProtectRoute";

const Page = () => {
  return (
    <ProtectedRoute allowedRoles={["instructor"]}>
      <div
        className="
        w-full 
        h-screen            
        grid 
        grid-cols-1 
        lg:grid-cols-2 
        gap-1 lg:gap-4       
        transition-all duration-300
      "
      >
        {/* Left Column - NoteForm */}
        <div
          className="
          h-full 
          flex 
          justify-center 
          items-start 
          lg:overflow-y-auto 
          px-2 md:px-4 
          py-4 
          lg:scrollbar-hide
          bg-transparent
        "
        >
          <NoteForm />
        </div>

        {/* Right Column - DisplayData */}
        <div
          className="
          h-full 
          flex 
          justify-center 
          items-start 
          lg:overflow-y-auto 
          px-2 md:px-4 
          py-4 
          lg:scrollbar-hide
          bg-transparent
        "
        >
          <DisplayData />
        </div>
      </div>
    </ProtectedRoute>

  );
};

export default Page;

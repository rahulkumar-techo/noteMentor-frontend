// NoteDetailsPage.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import NoteDetails from "./(components)/NoteDetails";
import { useGetNoteByIdQuery } from "@/feature/note/noteApi";
import NoteSkeleton from "@/components/common/skeletonLoader";

export default function NoteDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetNoteByIdQuery(id as string);

  if (isLoading) return <NoteSkeleton />;

  const note = data?.data;
 

  return (
   <div className="my-10">
     <NoteDetails
      note={note}
    />
   </div>
  );
}

// NoteDetailsPage.tsx
"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import NoteDetails from "./(components)/NoteDetails";
import { useGetNoteByIdQuery, useToggleLikesMutation, useUpdateViewsMutation } from "@/feature/note/noteApi";
import NoteSkeleton from "@/components/common/skeletonLoader";

export default function NoteDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetNoteByIdQuery(id as string);
  const [updateViews] = useUpdateViewsMutation();
  const [toggleLikes] = useToggleLikesMutation()

  useEffect(() => {
    if (id) updateViews({ id: id as string });
  }, [id]);

  if (isLoading) return <NoteSkeleton />;

  const note = data?.data;
 

  return (
   <div className="my-10">
     <NoteDetails
      note={note}
      toggleLikes={() => toggleLikes({ id: note._id })}
    />
   </div>
  );
}

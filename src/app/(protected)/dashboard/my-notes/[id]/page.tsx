"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  useGetNoteByIdQuery,
  useDeleteNoteMutation,
} from "@/feature/note/noteApi";

import EditNoteDialog from "./(components)/EditNoteDialog";
import { NoteHeader } from "./(components)/NoteHeader";
import { NoteDescription } from "./(components)/NoteDescription";
import { NoteAttachments } from "./(components)/NoteAttachments";
import { DeleteConfirmDialog } from "./(components)/DeleteConfirmDialog";
import NoteSettings from "./(components)/NoteSettings";
import NoteDetailsSkeleton from "@/components/common/skeletonLoader";
import CommentSystem from "@/components/comment-sys/CommentSystem";

export default function NoteDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useGetNoteByIdQuery(id as string);
  const note = data?.data;

  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();

  // const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isError || (!isLoading && !note)) {
      router.replace("/dashboard/my-notes");
    }
  }, [isError, isLoading, note, router]);

  const handleDeleteNote = async () => {
    try {
      await deleteNote({ noteId: id as string }).unwrap();
      router.push("/dashboard/my-notes");
    } finally {
      setIsDeleteConfirm(false);
    }
  };

  if (isLoading) return <NoteDetailsSkeleton count={6} />;

  if (!note) return null;

  return (
    <main className="min-h-screen text-white relative">
      <section className="w-full md:max-w-6xl md:mx-auto space-y-10">

        <NoteHeader
          title={note.title}
          onBack={() => router.back()}
          onEdit={() => router.push(`/dashboard/my-notes/${id}/edit`)}
          onDelete={() => setIsDeleteConfirm(true)}
        />

        <NoteDescription
          description={note.descriptions}
          user={note.userId?.fullname || "User"}
          createdAt={note.createdAt}
        />

        <NoteAttachments images={note.noteImages} pdfs={note.notePdfs} />
{/* 
        <EditNoteDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          note={note}
          refetch={refetch}
        /> */}

        <DeleteConfirmDialog
          open={isDeleteConfirm}
          onOpenChange={setIsDeleteConfirm}
          title={note.title}
          onDelete={handleDeleteNote}
          deleting={isDeleting}
        />

        <div className="flex items-center justify-center bg-[#0d0d0f]/70 rounded-2xl border border-gray-800 backdrop-blur-md">
          <NoteSettings noteId={id as string} defaultValues={note.settings} />
        </div>

        <CommentSystem noteId={id as string} />

        <div className="flex justify-center pt-8">
          <Button
            onClick={() => router.push("/dashboard/my-notes")}
            className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-semibold"
          >
            Back to My Notes
          </Button>
        </div>
      </section>
    </main>
  );
}

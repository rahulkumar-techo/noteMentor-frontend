
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  useGetNoteByIdQuery,
  useDeleteNoteMutation,
} from "@/feature/note/noteApi";
import EditNoteDialog from "@/app/dashboard/my-notes/[id]/(components)/EditNoteDialog";
import { NoteHeader } from "./(components)/NoteHeader";
import { NoteDescription } from "./(components)/NoteDescription";
import { NoteAttachments } from "./(components)/NoteAttachments";
import { DeleteConfirmDialog } from "./(components)/DeleteConfirmDialog";
import NoteSettings from "./(components)/NoteSettings";
import NoteDetailsSkeleton from "@/components/common/skeletonLoader";

export default function NoteDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetNoteByIdQuery(id as string);
  const [deleteNote, { isLoading: deleting }] = useDeleteNoteMutation();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const note = data?.data;

  console.log(note)

  const handleDelete = async () => {
    try {
      await deleteNote({noteId:String(id)}).unwrap();
      setIsDeleteConfirm(false);
      router.push("/dashboard/my-notes");
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  if (isLoading)
    return (
      <NoteDetailsSkeleton count={6} />
    );

  if (isError || !note)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-red-400">
        <p>Failed to load note details.</p>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mt-4 text-[#FFD700] border-[#FFD700]/40 hover:bg-[#FFD700]/10"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Go Back
        </Button>
      </main>
    );

  return (
    <main className="min-h-screen  text-white ">
      <section className=" w-full md:max-w-6xl md:mx-auto space-y-10">
        {/* Header */}
        <NoteHeader
          title={note.title}
          onBack={() => router.back()}
          onEdit={() => {router.push(`/dashboard/my-notes/${id}/edit`)}}
          onDelete={() => setIsDeleteConfirm(true)}
        />

        {/* Description */}
        <NoteDescription
          description={note.descriptions}
          user={note.userId?.fullname || "User"}
          createdAt={note.createdAt}
        />

        {/* Attachments */}
        <NoteAttachments images={note.noteImages} pdfs={note.notePdfs} />

        {/* Edit Dialog */}
        {note && (
          <EditNoteDialog
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            note={note}
            refetch={refetch}
          />
        )}

        {/* Delete Dialog */}
        <DeleteConfirmDialog
          open={isDeleteConfirm}
          onOpenChange={setIsDeleteConfirm}
          title={note.title}
          onDelete={handleDelete}
          deleting={deleting}
        />
        <div className="flex items-center justify-center bg-[#0d0d0f]/70 rounded-2xl border border-gray-800 backdrop-blur-md">
          <NoteSettings noteId={id as string || ""} defaultValues={note?.settings} />
        </div>

        {/* Back Button */}
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
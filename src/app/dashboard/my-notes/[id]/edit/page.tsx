"use client";

/**
 * 🧩 EditNoteClient
 * ------------------------------------------------------------
 * - Fetches and updates notes
 * - Delegates file upload & delete to EditNoteForm
 */

import {
  useGetNoteByIdQuery,
  useUpdateNoteMutation,
  useDeleteNoteFilesMutation,
} from "@/feature/note/noteApi";
import EditNoteForm from "./EditNoteForm";
import useApiMessage from "@/hooks/api-message";
import { useParams } from "next/navigation";

export default function EditNoteClient() {
  const { id } = useParams();
  const { data: noteData, isLoading } = useGetNoteByIdQuery(id as string);
  const [updateNote, updateStatus] = useUpdateNoteMutation();
  const [deleteNoteFiles] = useDeleteNoteFilesMutation();

  useApiMessage({
    isSuccess: updateStatus.isSuccess,
    isError: updateStatus.isError,
    error: updateStatus.error,
    successMessage: updateStatus.data?.message || "Note updated successfully!",
  });

  const handleSubmit = async (formData: FormData) => {
    await updateNote({ noteId: String(id), formData }).unwrap();
  };

  const handleDeleteFile = async (
    type: "image" | "pdf" | "thumbnail",
    public_id: string
  ) => {
    try {
      await deleteNoteFiles({
        noteId: String(id),
        noteImageIds: type === "image" ? [public_id] : [],
        notePdfIds: type === "pdf" ? [public_id] : [],
        thumbId: type === "thumbnail" ? public_id : "",
      }).unwrap();
    } catch (err) {
      console.error(`❌ Failed to delete ${type}:`, err);
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-400 mt-10">Loading note...</p>;

  return (
    <EditNoteForm
      note={noteData?.data}
      onSubmitForm={handleSubmit}
      onDeleteFile={handleDeleteFile}
      isSubmitting={updateStatus.isLoading}
    />
  );
}

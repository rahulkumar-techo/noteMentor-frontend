"use client";

import { useParams } from "next/navigation";
import {
  useGetNoteByIdQuery,
  useUpdateNoteMutation,
  useDeleteNoteFilesMutation,
} from "@/feature/note/noteApi";

import EditNoteForm from "./EditNoteForm";
import useApiMessage from "@/hooks/api-message";
import axiosInstance from "@/feature/axiosInstance";
import { useCloudinaryUpload } from "@/hooks/api-handler";
import UploadOverlay from "@/shared/utils/UploadOverlay";
import { useState } from "react";
import CommentSystem from "@/components/comment-sys/CommentSystem";

type CloudFile = {
  secure_url: string;
  public_id: string;
  bytes?: number;
  width?: number;
  height?: number;
  format?: string;
  resource_type?: string;
  folder?: string;
};

export default function EditNoteClient() {
  const { id } = useParams();

  // fetch
  const { data: noteData, isLoading } = useGetNoteByIdQuery(id as string);

  // mutations
  const [updateNote, updateState] = useUpdateNoteMutation();
  const [deleteNoteFiles] = useDeleteNoteFilesMutation();

  // cloud upload system
  const cloud = useCloudinaryUpload();

  // queue + current file
  const [queue, setQueue] = useState<string[]>([]);
  const [currentFile, setCurrentFile] = useState<string>("");

  // toast
  useApiMessage({
    isSuccess: updateState.isSuccess,
    isError: updateState.isError,
    error: updateState.error,
    successMessage: updateState.data?.message || "Note updated successfully!",
  });

  /* ------------------ SIGNED TOKEN ------------------ */
  const getSigned = async (folder: string) => {
    const res = await axiosInstance.get(`/note/signed-upload?folder=${folder}`);
    return res.data.data;
  };

  /* ------------------ SINGLE UPLOAD ------------------ */
  const uploadSingle = async (file: File, folder: string): Promise<CloudFile> => {
    setCurrentFile(file.name);
    const token = await getSigned(folder);
    return await cloud.upload(file, token); // cloud hook already handles progress
  };

  /* ------------------ MULTIPLE UPLOAD ------------------ */
  const uploadMany = async (files: File[], folder: string): Promise<CloudFile[]> => {
    const names = files.map((f) => f.name);
    setQueue(names);

    const results: CloudFile[] = [];

    for (const f of files) {
      setCurrentFile(f.name);
      const r = await uploadSingle(f, folder);
      results.push(r);

      // update queue after finishing file
      setQueue((prev) => prev.filter((x) => x !== f.name));
    }

    return results;
  };

  /* ------------------ SUBMIT HANDLER ------------------ */
  const handleSubmit = async ({
    title,
    descriptions,
    newThumb,
    newImages,
    newPdfs,
  }: {
    title: string;
    descriptions: string;
    newThumb: File | null;
    newImages: File[];
    newPdfs: File[];
  }) => {
    let uploadedThumb: CloudFile | null = null;
    let uploadedImages: CloudFile[] = [];
    let uploadedPdfs: CloudFile[] = [];

    // thumbnail
    if (newThumb) {
      uploadedThumb = await uploadSingle(newThumb, "noteThumb");
    }

    // images
    if (newImages.length) {
      uploadedImages = await uploadMany(newImages, "noteImages");
    }

    // pdfs
    if (newPdfs.length) {
      uploadedPdfs = await uploadMany(newPdfs, "notePdfs");
    }

    // send json
    await updateNote({
      noteId: String(id),
      formData: {
        title,
        descriptions,
        thumbnail: uploadedThumb,
        noteImages: uploadedImages,
        notePdfs: uploadedPdfs,
      },
    }).unwrap();
  };

  /* ------------------ DELETE FILE ------------------ */
  const handleDeleteFile = async (type: "image" | "pdf" | "thumbnail", publicId: string) => {
    try {
      await deleteNoteFiles({
        noteId: String(id),
        noteImageIds: type === "image" ? [publicId] : [],
        notePdfIds: type === "pdf" ? [publicId] : [],
        thumbId: type === "thumbnail" ? publicId : "",
      }).unwrap();
    } catch (err) {
      console.error(`Delete ${type} failed:`, err);
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-400 mt-10">Loading note...</p>;

  return (
    <>
      {/* overlay */}
      {cloud.loading && (
        <UploadOverlay
          progress={cloud.progress}
          speed={cloud.speed}
          eta={cloud.eta}
          loading={cloud.loading}
          onCancel={cloud.cancel}
          currentFile={currentFile}
          queue={queue}
        />
      )}

      <EditNoteForm
        note={noteData?.data}
        onSubmitForm={handleSubmit}
        onDeleteFile={handleDeleteFile}
        isSubmitting={updateState.isLoading}
        uploading={cloud.loading}
        progress={cloud.progress}
      />
    </>
  );
}

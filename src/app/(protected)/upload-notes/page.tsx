"use client";
/* 
  Upload Note Page 
  - Handles signed uploads (image/pdf)
  - Tracks queue + progress overlay
  - Saves final note to backend
*/

import { useCallback, useState } from "react";
import NoteUploadForm from "./(components)/NoteUploadForm";
import { useCloudinaryUpload } from "@/hooks/api-handler";
import UploadOverlay from "@/shared/utils/UploadOverlay";
import axiosInstance from "@/feature/axiosInstance";
import { useUploadNoteMutation } from "@/feature/note/noteApi";
import UploadNoteDocs from "./(components)/UploadNoteDocs";

export default function UploadNotePage() {
  const cloud = useCloudinaryUpload();

  const [uploadNote, { isLoading: saving, data: saved, isSuccess: isSaved }] =
    useUploadNoteMutation();

  const [currentFile, setCurrentFile] = useState("");
  const [queue, setQueue] = useState<string[]>([]);

  /* ---------------- GET SIGNED DETAILS ---------------- */
  const getSigned = async (folder: string) => {
    const res = await axiosInstance.get(`/note/signed-upload?folder=${folder}`);
    return res.data.data;
  };

  /* ---------------- SINGLE FILE UPLOAD ---------------- */
  const uploadFile = async (
    file: File,
    folder: string,
    type: "image" | "raw" = "image"
  ) => {
    setCurrentFile(file.name);
    setQueue((q) => q.filter((f) => f !== file.name));

    const token = await getSigned(folder);

    // pass resource_type for PDF
    return cloud.upload(file, { ...token, resource_type: type });
  };

  /* ---------------- MULTIPLE FILE UPLOAD ---------------- */
  const uploadBatch = async (files: File[], folder: string) => {
    setQueue(files.map((f) => f.name));
    return Promise.all(files.map((f) => uploadFile(f, folder)));
  };

  /* ---------------- MAIN UPLOAD HANDLER ---------------- */
  const handleUpload = useCallback(
    async (
      title: string,
      desc: string,
      thumb: File | null,
      images: File[],
      pdfs: File[]
    ) => {
      try {
        // validation
        if (!thumb) return alert("Thumbnail is required.");
        if (images.length > 10) return alert("Max 10 images allowed.");
        if (pdfs.length > 2) return alert("Max 2 PDFs allowed.");

        if (images.some((i) => i.size > 5 * 1024 * 1024))
          return alert("Images must be under 5MB.");

        if (pdfs.some((p) => p.size > 20 * 1024 * 1024))
          return alert("PDF must be under 20MB.");

        // upload files
        const thumbnail = await uploadFile(thumb, "noteThumb");

        const uploadedImages = images.length
          ? await uploadBatch(images, "noteImages")
          : [];

        const uploadedPdfs = pdfs.length
          ? await Promise.all(
              pdfs.map((f) => uploadFile(f, "notePdfs", "raw")) // raw upload
            )
          : [];

        // save note
        await uploadNote({
          title,
          descriptions: desc,
          thumbnail,
          noteImages: uploadedImages,
          notePdfs: uploadedPdfs,
        });
      } catch (err) {
        console.error("❌ Upload failed:", err);
        alert("Something went wrong while uploading!");
      }
    },
    [uploadNote]
  );

  return (
    <>
      {/* Overlay */}
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

      {/* Main UI */}
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white px-6">
        <section className="w-full max-w-5xl pb-16 space-y-10">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#FFD700]">
              Upload Your Notes
            </h1>
            <p className="text-sm text-gray-400">
              Upload images, PDFs, and a thumbnail.
            </p>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              ⬅ Back
            </button>
          </div>

          {/* Form */}
          <div className="flex flex-col items-center w-full rounded-2xl shadow-xl p-6 backdrop-blur-xl">
            <NoteUploadForm
              progressValue={cloud.progress}
              isUploading={saving}
              onSubmit={handleUpload}
              isSaved={isSaved}
            />
          </div>

          <UploadNoteDocs />
        </section>
      </main>
    </>
  );
}

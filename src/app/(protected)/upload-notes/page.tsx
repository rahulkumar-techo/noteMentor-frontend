"use client";

import { useCallback, useState } from "react";
import NoteUploadForm from "./(components)/NoteUploadForm";
import { useCloudinaryUpload } from "@/hooks/api-handler";
import UploadOverlay from "@/shared/utils/UploadOverlay";
import axiosInstance from "@/feature/axiosInstance";
import { useUploadNoteMutation } from "@/feature/note/noteApi";
import UploadNoteDocs from "./(components)/UploadNoteDocs";

export default function UploadNotePage() {
  const cloud = useCloudinaryUpload();
  const [uploadNote, { isLoading: saving, data: saved, isSuccess: isSaved }] = useUploadNoteMutation();

  // NEW: current file + queue
  const [currentFile, setCurrentFile] = useState<string>("");
  const [queue, setQueue] = useState<string[]>([]);


  // signed token
  const getSigned = async (folder: string) => {
    const res = await axiosInstance.get(`/note/signed-upload?folder=${folder}`);
    return res.data.data;
  };

  // upload a file
  const uploadFile = async (file: File, folder: string) => {
    setCurrentFile(file.name);                          // update current file
    setQueue((q) => q.filter((f) => f !== file.name));  // remove from queue

    const token = await getSigned(folder);
    return await cloud.upload(file, token);
  };

  // upload a group in parallel
  const uploadBatch = async (files: File[], folder: string) => {
    setQueue(files.map((f) => f.name));                 // set queue before upload
    return Promise.all(files.map((f) => uploadFile(f, folder)));
  };

  // main upload handler
const handleUpload = useCallback(
  async (title: string, desc: string, thumb: File | null, images: File[], pdfs: File[]) => {
    try {
      /* ---------------- VALIDATION ---------------- */

      // Thumbnail is required
      if (!thumb) {
        alert("Thumbnail is required.");
        return;
      }

      // Image limit
      if (images.length > 10) {
        alert("You can upload a maximum of 10 images.");
        return;
      }

      // PDF limit
      if (pdfs.length > 2) {
        alert("You can upload a maximum of 2 PDFs.");
        return;
      }

      // Ensure images are under 5MB
      const tooBigImages = images.filter((f) => f.size > 5 * 1024 * 1024);
      if (tooBigImages.length > 0) {
        alert("Some images are still over 5MB after compression.");
        return;
      }

      // Ensure PDFs are under 20MB
      const tooBigPdf = pdfs.filter((f) => f.size > 20 * 1024 * 1024);
      if (tooBigPdf.length > 0) {
        alert("PDFs must be under 20MB. Compression may have failed.");
        return;
      }

      /* ---------------- UPLOAD ---------------- */

      // Upload thumbnail
      const thumbnail = thumb ? await uploadFile(thumb, "noteThumb") : null;

      // Upload images
      const uploadedImages = images.length
        ? await uploadBatch(images, "noteImages")
        : [];

      // Upload PDFs
      const uploadedPdfs = pdfs.length
        ? await uploadBatch(pdfs, "notePdfs")
        : [];

      /* ---------------- SAVE TO BACKEND ---------------- */

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
  [ uploadNote]
);

  const note = saved?.data;

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

      {/* UI */}
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black  dark:text-white px-6 mt-0">
        <section className="w-full max-w-5xl   pb-16 space-y-10">

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#FFD700]">Upload Your Notes</h1>
            <p className="text-sm text-gray-400">Upload images, PDFs, and a thumbnail.</p>
            {/* Back Button */}
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              ⬅ Back
            </button>
          </div>

          {/* Form */}
          <div className="flex flex-col items-center w-full  rounded-2xl shadow-xl p-6 backdrop-blur-xl">
            <NoteUploadForm
              progressValue={cloud.progress}
              isUploading={saving}
              onSubmit={handleUpload}
              isSaved={isSaved}
            />
          </div>
          <UploadNoteDocs/>
        </section>
      </main>
    </>
  );
}

"use client";

import { useCallback } from "react";
import Image from "next/image";

import NoteUploadForm from "@/app/upload-notes/(components)/NoteUploadForm";
import useApiMessage from "@/hooks/api-message";
import { Card, CardContent } from "@/components/ui/card";
import { useFileUpload } from "@/hooks/api-handler";
import UploadOverlay from "./(components)/UploadOverlay";

export default function UploadNotePage() {
  const { upload, progress, speed, eta, loading, response, error, cancelUpload } =
    useFileUpload({path:"/note/upload",method:"post",retries:2});

  // Notifications + redirect
  useApiMessage({
    isSuccess: Boolean(response),
    isError: Boolean(error),
    error,
    successMessage: (response as any)?.message || "Note uploaded successfully!",
    redirectPath: "/dashboard/my-notes",
  });

  // Submit handler
const handleUpload = useCallback(
  async (
    title: string,
    descriptions: string,
    thumbnail: File | null,
    images: File[],
    pdfs: File[]
  ): Promise<void> => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      if (descriptions) formData.append("descriptions", descriptions);
      if (thumbnail) formData.append("thumbnail", thumbnail);

      images.forEach((img: File) => formData.append("noteImages", img));
      pdfs.forEach((pdf: File) => formData.append("notePdfs", pdf));

      await upload(formData);
    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
  },
  [upload]
);


  const note = (response as any)?.data;

  return (
    <>
      {/* Floating Upload Overlay */}
      {loading && (
        <UploadOverlay
          progress={progress}
          speed={speed}
          eta={eta}
          loading
          onCancel={cancelUpload}
        />
      )}

      {/* Main Page */}
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a1a1a] text-white px-6">
        <section className="w-full max-w-5xl pt-24 md:pt-28 pb-16 space-y-10">

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#FFD700] tracking-wide">
              Upload Your Notes
            </h1>
            <p className="text-sm text-gray-400">
              Upload images, PDFs, and a thumbnail to store your study notes.
            </p>
          </div>

          {/* Upload Form */}
          <div className="flex flex-col items-center w-full bg-[#0d0d0f]/70 border border-gray-800 rounded-2xl shadow-lg p-6 backdrop-blur-lg">
            <NoteUploadForm
              progressValue={progress}
              isUploading={loading}
              onSubmit={handleUpload}
            />
          </div>

          {/* Success Preview */}
          {note && (
            <Card className="bg-[#0d0d0f]/80 border border-gray-800 text-gray-200 rounded-2xl shadow-lg mt-8">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-[#FFD700] mb-3">
                  ✅ Upload Successful
                </h2>

                {note.thumbnail?.secure_url && (
                  <div className="flex justify-center">
                    <Image
                      src={note.thumbnail.secure_url}
                      alt={note.title}
                      width={180}
                      height={120}
                      className="rounded-xl border border-gray-700"
                    />
                  </div>
                )}

                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium text-[#FFD700]">Title:</span>{" "}
                    {note.title}
                  </p>

                  {note.descriptions && (
                    <p>
                      <span className="font-medium text-[#FFD700]">Description:</span>{" "}
                      {note.descriptions}
                    </p>
                  )}

                  <p>
                    <span className="font-medium text-[#FFD700]">Uploaded At:</span>{" "}
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-400">
                  {note.noteImages?.length > 0 && (
                    <p>🖼️ {note.noteImages.length} Image(s)</p>
                  )}

                  {note.notePdfs?.length > 0 && (
                    <p>📄 {note.notePdfs.length} PDF(s)</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </>
  );
}

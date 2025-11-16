"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

import NoteUploadForm from "@/app/upload-notes/(components)/NoteUploadForm";
import useApiMessage from "@/hooks/api-message";
import { Card, CardContent } from "@/components/ui/card";
import { useCloudinaryUpload } from "@/hooks/api-handler";
import UploadOverlay from "../../shared/utils/UploadOverlay";
import axiosInstance from "@/feature/axiosInstance";
import { useUploadNoteMutation } from "@/feature/note/noteApi";

export default function UploadNotePage() {
  const cloud = useCloudinaryUpload();
  const [uploadNote, { isLoading: saving, data: saved }] = useUploadNoteMutation();

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
        const thumbnail = thumb ? await uploadFile(thumb, "noteThumb") : null;
        const uploadedImages = await uploadBatch(images, "noteImages");
        const uploadedPdfs = await uploadBatch(pdfs, "notePdfs");

        await uploadNote({
          title,
          descriptions: desc,
          thumbnail,
          noteImages: uploadedImages,
          notePdfs: uploadedPdfs,
        });
      } catch (err) {
        console.error("❌ Upload failed:", err);
      }
    },
    [cloud, uploadNote]
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
      <main className="min-h-screen flex items-center justify-center bg-linear-to-b from-black via-[#0a0a0a] to-[#1a1a1a] text-white px-6 mt-0">
        <section className="w-full max-w-5xl pt-24 md:pt-28 pb-16 space-y-10">
            {/* Back Button */}
            <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
                ⬅ Back
            </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#FFD700]">Upload Your Notes</h1>
            <p className="text-sm text-gray-400">Upload images, PDFs, and a thumbnail.</p>
          </div>

          {/* Form */}
          <div className="flex flex-col items-center w-full bg-[#0d0d0f]/70 border border-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-xl">
            <NoteUploadForm
              progressValue={cloud.progress}
              isUploading={cloud.loading || saving}
              onSubmit={handleUpload}
            />
          </div>

          {/* Success Card */}
          {note && (
            <Card className="bg-[#0d0d0f]/80 border border-gray-800 text-gray-200 rounded-2xl shadow-xl mt-8">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-[#FFD700] mb-3">✅ Upload Successful</h2>

                {note.thumbnail?.secure_url && (
                  <div className="flex justify-center">
                    <Image
                      src={note.thumbnail.secure_url}
                      alt="thumbnail"
                      width={180}
                      height={120}
                      className="rounded-xl border border-gray-700"
                    />
                  </div>
                )}

                <div className="space-y-1 text-sm">
                  <p><span className="font-medium text-[#FFD700]">Title:</span> {note.title}</p>
                  <p>
                    <span className="font-medium text-[#FFD700]">Uploaded:</span>{" "}
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-400">
                  {!!note.noteImages?.length && <p>🖼️ {note.noteImages.length} Images</p>}
                  {!!note.notePdfs?.length && <p>📄 {note.notePdfs.length} PDFs</p>}
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </>
  );
}

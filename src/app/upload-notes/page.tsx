"use client";

/**
 * 📤 Upload Note Page
 * - Fully responsive (mobile → desktop)
 * - Two-column layout (Upload Form + Share Links)
 * - Prevents content from being hidden under the fixed navbar
 */

import { useState } from "react";
import NoteUploadForm from "@/components/note/NoteUploadForm";
import ShareLinkBox from "@/components/note/ShareLinkBox";

export default function UploadNotePage() {
  const [shareLinks, setShareLinks] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleUploadSuccess = (urls: string[]) => {
    const base = window.location.origin;
    const links = urls.map(
      (url) => `${base}/note/${encodeURIComponent(url.split("/").pop() || "")}`
    );
    setShareLinks(links);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      {/* Add top padding to prevent overlap with navbar */}
      <div className="w-full max-w-6xl flex flex-col pt-24 pb-10 md:pt-28">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-10 text-center">
          📚 Upload Your Notes
        </h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Upload Section */}
          <div className="w-full flex flex-col items-center justify-center">
            <NoteUploadForm
              onUploadSuccess={handleUploadSuccess}
              onFileSelect={setSelectedFiles}
            />

            {selectedFiles.length > 0 && (
              <p className="mt-4 text-sm text-gray-400 italic text-center">
                {selectedFiles.length} file
                {selectedFiles.length > 1 ? "s" : ""} selected.
              </p>
            )}
          </div>

          {/* Share Link Section */}
          <div className="w-full flex flex-col items-center justify-start">
            {shareLinks.length > 0 ? (
              <div className="w-full space-y-4 overflow-y-auto max-h-[70vh] px-1">
                {shareLinks.map((link) => (
                  <ShareLinkBox key={link} link={link} />
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 border border-gray-800 bg-[#0d0d0f]/40 rounded-xl p-6 text-center">
                <p className="text-sm md:text-base">
                  🔗 Share links will appear here after uploading your notes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

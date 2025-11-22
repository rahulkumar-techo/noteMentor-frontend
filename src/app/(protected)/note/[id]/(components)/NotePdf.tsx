
"use client";

import React from "react";

type PdfViewerProps = {
  fileUrl: string;
};

export function PdfViewer({ fileUrl }: PdfViewerProps) {
  if (!fileUrl) return <p className="text-red-400">No PDF file provided.</p>;

  return (
    <div className="w-full bg-[#0d0d0f]/70 p-2 sm:p-4  text-white text-center">
      <h2 className="text-lg font-semibold text-[#FFD700] mb-3">PDF Viewer</h2>

      <div className="relative w-full rounded-xl overflow-hidden border border-[#FFD700]/20">
        <iframe
          src={fileUrl}
          className="w-full h-[80vh] rounded-xl"
          title="PDF Document"
          loading="lazy"
          name="Pdf"
        />
      </div>

      <p className="text-xs text-gray-400 mt-3">
        If the PDF doesn’t load, <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-[#FFD700] underline">click here to open directly</a>.
      </p>
    </div>
  );
}
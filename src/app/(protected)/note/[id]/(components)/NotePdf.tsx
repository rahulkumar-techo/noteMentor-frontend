"use client";


import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Load PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type PdfViewerProps = {
  fileUrl: string;
};

export function PdfViewer({ fileUrl }: PdfViewerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);

  // Detect mobile device
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  if (!fileUrl) return <p className="text-red-400">No PDF file provided.</p>;

  return (
    <div className="w-full bg-[#0d0d0f]/70 p-3 sm:p-4 text-white text-center rounded-xl">
      <h2 className="text-lg font-semibold text-[#FFD700] mb-4">PDF Viewer</h2>

      {/* MOBILE VIEW — React PDF */}
      {isMobile ? (
        <div className="space-y-4 bg-[#151516] p-3 rounded-xl border border-[#FFD700]/20">
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<p className="text-gray-400">Loading PDF…</p>}
          >
            {Array.from(new Array(numPages), (_, i) => (
              <Page
                key={i}
                pageNumber={i + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                className="rounded-lg overflow-hidden shadow"
              />
            ))}
          </Document>
        </div>
      ) : (
        // DESKTOP VIEW — Iframe
        <div className="relative w-full rounded-xl overflow-hidden border border-[#FFD700]/20">
          <iframe
            src={fileUrl}
            className="w-full h-[80vh] rounded-xl"
            title="PDF Document"
            loading="lazy"
          />
        </div>
      )}

      {/* Download Link */}
      <p className="text-xs text-gray-400 mt-4">
        PDF not loading?{" "}
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFD700] underline"
        >
          Click here to open directly
        </a>.
      </p>
    </div>
  );
}

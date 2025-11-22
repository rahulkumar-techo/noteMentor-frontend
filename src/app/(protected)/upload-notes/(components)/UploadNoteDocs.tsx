"use client";

/* Short comments • responsive UI with icons */

import {
  Image as ImageIcon,
  FileUp,
  FileText,
  Combine,
  Info,
} from "lucide-react";

export default function UploadNoteDocs() {
  return (
    <div className="text-black dark:text-white dark:bg-black/20 border border-gray-700 rounded-xl p-5 space-y-5 md:space-y-6">
      {/* Header */}
      <h2 className="text-lg md:text-xl font-semibold text-yellow-400">
        Upload Guidelines
      </h2>

      {/* List */}
      <ul className="space-y-4 text-sm leading-relaxed">
        {/* 1. Thumbnail */}
        <li className="flex items-start gap-3">
          <ImageIcon className="w-5 h-5 mt-1 text-yellow-400 shrink-0" />
          <p>
            <span className="font-medium">Thumbnail image is required.</span>
            <br />
            This image will represent your note.
          </p>
        </li>

        {/* 2. Note Images */}
        <li className="flex items-start gap-3">
          <FileUp className="w-5 h-5 mt-1 text-green-400 shrink-0" />
          <p>
            You can upload up to{" "}
            <span className="font-medium">10 note images</span>.  
            Each must be under <span className="font-medium">5 MB</span>.
          </p>
        </li>

        {/* 3. PDFs */}
        <li className="flex items-start gap-3">
          <FileText className="w-5 h-5 mt-1 text-blue-400 shrink-0" />
          <p>
            Add up to <span className="font-medium">2 PDF files</span>.  
            Each must not exceed <span className="font-medium">20 MB</span>.
          </p>
        </li>

        {/* 4. Compression */}
        <li className="flex items-start gap-3">
          <Combine className="w-5 h-5 mt-1 text-purple-400 shrink-0" />
          <p>
            Large images and PDFs will be{" "}
            <span className="font-medium">automatically compressed</span>{" "}
            for faster upload performance.
          </p>
        </li>

        {/* 5. Title & Description */}
        <li className="flex items-start gap-3">
          <Info className="w-5 h-5 mt-1 text-gray-400 shrink-0" />
          <p>
            Ensure the title clearly reflects the topic.  
            Add a short description to help others understand the content.
          </p>
        </li>
      </ul>

      {/* Footer note */}
      <p className="text-xs text-gray-700 dark:text-gray-400">
        All uploads are securely processed and optimized for fast viewing.
      </p>
    </div>
  );
}

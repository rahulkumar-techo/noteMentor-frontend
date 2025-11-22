"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, Trash2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import * as fileHandlers from "@/shared/utils/fileHandlers";

interface Props {
  value: File[];
  setValue: (files: File[]) => void;
  isUploading?: boolean;
}

export default function PdfBox({ value, setValue, isUploading = false }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);

  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  // Convert bytes → MB string
  const mb = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = fileHandlers.getFilesArray(e);
    if (!files.length) return;

    // Only PDFs allowed
    if (!fileHandlers.areAllPdfs(files)) {
      return setAlertMsg("❌ Only PDF files are allowed.");
    }

    // Max 2 PDFs total
    if (value.length + files.length > 2) {
      return setAlertMsg("❌ You can upload maximum 2 PDFs.");
    }

    // Validate size
    const tooLarge = files.filter((f) => f.size > 20 * 1024 * 1024);

    if (tooLarge.length > 0) {
      setAlertMsg(
        `❌ ${tooLarge.length} file(s) exceed 20MB. Please upload PDFs under 20MB.`
      );
      return;
    }

    // All good — clear alert
    setAlertMsg(null);
    setValue([...value, ...files]);
  };

  const remove = (i: number) => {
    setValue(value.filter((_, idx) => idx !== i));
    setAlertMsg(null);
  };

  return (
    <div className="p-6 rounded-2xl shadow space-y-6">

      <p className="dark:text-gray-300 font-bold text-sm">
        PDFs Selected: <span className="text-yellow-400">{value.length}</span> / 2
      </p>

      {/* Upload Box */}
      <div
        onClick={() => ref.current?.click()}
        className="rounded-xl p-6 text-center cursor-pointer bg-black/10 border border-gray-700 hover:bg-black/20 transition"
      >
        <input
          ref={ref}
          type="file"
          accept="application/pdf"
          multiple
          onChange={handle}
          className="hidden"
          disabled={isUploading}
        />

        <UploadCloud className="mx-auto h-6 w-6 text-yellow-400" />
        <p className="text-gray-400 text-sm mt-2">
          Upload PDFs (max 2, max 20MB each)
        </p>
      </div>

      {/* Alerts */}
      {alertMsg && (
        <Alert className="border border-red-600 bg-red-900/20">
          <AlertTitle className="text-red-400">PDF Error</AlertTitle>
          <AlertDescription className="text-red-200">
            {alertMsg}
          </AlertDescription>
        </Alert>
      )}

      {/* Selected Files List */}
      <div className="space-y-3">
        {value.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No PDFs selected.</p>
        ) : (
          value.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-black/20 rounded"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-yellow-400" />
                <p className="text-sm truncate max-w-[420px] text-gray-200">
                  {file.name} — {mb(file.size)}MB
                </p>
              </div>

              <button onClick={() => remove(i)}>
                <Trash2 className="h-5 w-5 text-red-400" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

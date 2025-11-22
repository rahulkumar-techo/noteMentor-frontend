"use client";

import React, { useRef, useEffect, useState } from "react";
import { UploadCloud, Trash2 } from "lucide-react";
import * as fileHandlers from "@/shared/utils/fileHandlers";
import imageCompression from "browser-image-compression";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface Props {
  value: File[];
  setValue: (files: File[]) => void;
  isUploading?: boolean;
}

export default function ImagesBox({ value, setValue, isUploading = false }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [urls, setUrls] = useState<string[]>([]);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  // Generate previews
  useEffect(() => {
    const u = value.map(f => URL.createObjectURL(f));
    setUrls(u);
    return () => u.forEach(url => URL.revokeObjectURL(url));
  }, [value]);

  const onSelectImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = fileHandlers.getFilesArray(e);
    if (!files.length) return;

    if (!fileHandlers.areAllImages(files)) {
      return setAlertMsg("Only image files are allowed.");
    }

    if (value.length + files.length > 10) {
      return setAlertMsg("Maximum 10 images allowed.");
    }

    const finalFiles: File[] = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        // Auto compress
        const compressed = await imageCompression(file, {
          maxSizeMB: 5,
          maxWidthOrHeight: 2000,
          useWebWorker: true,
        });

        finalFiles.push(compressed);
      } else {
        finalFiles.push(file);
      }
    }

    setAlertMsg("Large images compressed automatically.");
    setValue([...value, ...finalFiles]);
  };

  const removeImage = (i: number) => setValue(value.filter((_, idx) => idx !== i));

  return (
    <div className="p-6 rounded-2xl  space-y-6 shadow-inner">

      <p className="dark:text-gray-300 font-bold text-sm">
        Images: <span className="text-yellow-400">{value.length}</span> / 10
      </p>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="rounded-xl p-6 text-center cursor-pointer border border-black dark:border-gray-700  hover:bg-black/20"
      >
        <input
          className="hidden"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onSelectImages}
          disabled={isUploading}
        />
        <UploadCloud className="mx-auto h-6 w-6 text-yellow-400" />
        <p className="text-sm text-gray-400 mt-2">Upload Images (max 10, max 5MB each)</p>
      </div>

      {alertMsg && (
        <Alert className="border border-yellow-600 bg-yellow-900/20">
          <AlertTitle className="text-yellow-400">Notice</AlertTitle>
          <AlertDescription className="text-gray-300">{alertMsg}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {value.length === 0 ? (
          <p className="col-span-full text-gray-500 text-center py-8">
            No images selected.
          </p>
        ) : (
          value.map((file, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden bg-black/20">
              <img src={urls[i]} className="w-full h-56 object-cover" />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-3 right-3 bg-black/60 p-2 rounded-full"
              >
                <Trash2 className="h-5 w-5 text-red-400" />
              </button>
              <div className="p-3 text-sm truncate text-gray-200">{file.name}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

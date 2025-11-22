
"use client";

import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FileImage, Upload } from "lucide-react";
import * as fileHandlers from "@/shared/utils/fileHandlers";
import { ImagePlus } from "lucide-react";

interface Props {
  value: File | null;
  onChange: (f: File | null) => void;
  isUploading?: boolean;
}

// use local uploaded sketch as example placeholder
const PLACEHOLDER = "/mnt/data/Screenshot 2025-11-22 053514.png";

export default function ThumbnailBox({ value, onChange, isUploading = false }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = React.useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setUrl(null);
      return;
    }
    const u = URL.createObjectURL(value);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [value]);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = fileHandlers.getFirstFile(e);
    if (!f) return;
    if (!fileHandlers.isImage(f)) {
      // keep prop-level messaging minimal — parent may show alerts
      return;
    }
    onChange(f);
  };

  return (
    <div className="p-6 rounded-2xl border  shadow-sm">
      <label className="block mb-2 text-sm font-medium">Thumbnail</label>

      <div
        onClick={() => ref.current?.click()}
        className="h-56 rounded-lg bg-black/20 overflow-hidden flex items-center justify-center cursor-pointer"
      >
        <Input ref={ref} type="file" accept="image/*" onChange={handle} className="hidden" disabled={isUploading} />

        {url ? (
          <img src={url} alt="thumbnail" className="w-full h-full object-cover" />
        ) : (
         <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-300">
            {/* Stylish Upload Icon */}
            <ImagePlus className="w-14 h-14 mb-2 opacity-80 group-hover:scale-110 transition-transform" />
            <p className="text-sm">Click to upload thumbnail</p>
          </div>
        )}
      </div>
    </div>
  );
}

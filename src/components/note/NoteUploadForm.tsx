"use client";

/**
 * 📁 NoteUploadForm Component (Enhanced)
 * - Supports both images + PDFs together
 * - Drag-sort / button-sort order control using Shadcn UI
 * - Rules:
 *   🧩 Max 2 PDFs
 *   📄 Each PDF ≤ 30 MB
 *   🖼️ Each Image ≤ 5 MB, Max 10 images
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ArrowUp, ArrowDown, Trash2, FileImage, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NoteUploadFormProps {
  onUploadSuccess: (urls: string[]) => void;
  onFileSelect?: (files: File[]) => void;
}

export default function NoteUploadForm({
  onUploadSuccess,
  onFileSelect,
}: NoteUploadFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedUrls, setCompletedUrls] = useState<string[]>([]);

  // 🧠 Validate file rules
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    const pdfs = selectedFiles.filter((f) => f.type === "application/pdf");
    const images = selectedFiles.filter((f) => f.type.startsWith("image/"));

    // ✅ Validation rules
    if (pdfs.length > 2) {
      setError("⚠️ You can upload a maximum of 2 PDF files.");
      return;
    }
    if (images.length > 10) {
      setError("⚠️ You can upload a maximum of 10 images.");
      return;
    }
    for (const pdf of pdfs) {
      if (pdf.size > 30 * 1024 * 1024) {
        setError(`❌ PDF "${pdf.name}" exceeds 30 MB limit.`);
        return;
      }
    }
    for (const img of images) {
      if (img.size > 5 * 1024 * 1024) {
        setError(`❌ Image "${img.name}" exceeds 5 MB limit.`);
        return;
      }
    }

    const allFiles = [...files, ...selectedFiles];
    setFiles(allFiles);
    onFileSelect?.(allFiles);
  };

  // ⬆️⬇️ Reorder functions
  const moveFile = (index: number, direction: "up" | "down") => {
    const newFiles = [...files];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    // Prevent going out of bounds
    if (newIndex < 0 || newIndex >= newFiles.length) return;

    // Swap positions
    const temp = newFiles[index];
    newFiles[index] = newFiles[newIndex];
    newFiles[newIndex] = temp;

    setFiles(newFiles);
    onFileSelect?.(newFiles);
  };

  // ❌ Remove file
  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFileSelect?.(updated);
  };

  // 📤 Simulated upload (replace later with real upload API)
  const simulateUpload = () => {
    if (!files.length) return alert("Please select files to upload!");
    if (error) return alert(error);

    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);

          const fakeUrls = files.map(
            (file) => `https://notementor-files.vercel.app/${file.name}`
          );

          setCompletedUrls(fakeUrls);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // ✅ Notify parent once upload completes
  useEffect(() => {
    if (completedUrls.length > 0) onUploadSuccess(completedUrls);
  }, [completedUrls, onUploadSuccess]);

  return (
    <div className="w-full border border-gray-800 bg-[#0d0d0f]/80 p-6 rounded-xl shadow-lg backdrop-blur-md space-y-4">
      <div>
        <label className="text-gray-300 text-sm mb-2 block">
          Select note files (PDF + images allowed)
        </label>
        <Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={handleFileChange}
          className="text-gray-200 border-gray-700"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* 🗂️ File list */}
      {files.length > 0 && (
        <div className="space-y-3 max-h-[40vh] overflow-y-auto">
          {files.map((file, i) => (
            <Card
              key={file.name}
              className={cn(
                "bg-[#0a0a0a] border-gray-800 hover:border-[#FFD700]/40 transition-all"
              )}
            >
              <CardContent className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3 truncate">
                  {file.type.startsWith("image/") ? (
                    <FileImage className="w-5 h-5 text-[#FFD700]" />
                  ) : (
                    <FileText className="w-5 h-5 text-[#FFD700]" />
                  )}
                  <div className="truncate">
                    <p className="text-sm text-[#FFD700] truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveFile(i, "up")}
                    disabled={i === 0}
                  >
                    <ArrowUp className="w-4 h-4 text-gray-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveFile(i, "down")}
                    disabled={i === files.length - 1}
                  >
                    <ArrowDown className="w-4 h-4 text-gray-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(i)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {uploading && <Progress value={progress} className="bg-gray-800" />}

      <Button
        onClick={simulateUpload}
        disabled={uploading}
        className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-black font-semibold transition-all duration-200"
      >
        {uploading ? "Uploading..." : "Upload Notes"}
      </Button>
    </div>
  );
}

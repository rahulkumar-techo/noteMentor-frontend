"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, FileImage, FileText, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { Spinner } from "../../../components/ui/spinner";
import { Progress } from "../../../components/ui/progress";

const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  descriptions: z.string().optional(),
  thumbnail: z.instanceof(File).optional().nullable(),
  files: z.array(z.instanceof(File)).min(1, "Please upload note files"),
});

type NoteFormValues = z.infer<typeof noteSchema>;

interface NoteUploadFormProps {
  onSubmit: (
    title: string,
    descriptions: string,
    thumbnail: File | null,
    files: File[]
  ) => void;
  isUploading?: boolean;
}

export default function NoteUploadForm({
  onSubmit,
  isUploading = false,
}: NoteUploadFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageCount, setImageCount] = useState(0);
  const [pdfCount, setPdfCount] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      descriptions: "",
      thumbnail: null,
      files: [],
    },
  });

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    if (!selected.length) return;
    e.target.value = ""; // reset input for re-selection

    const pdfs = selected.filter((f) => f.type === "application/pdf");
    const imgs = selected.filter((f) => f.type.startsWith("image/"));

    const totalImgs = imageCount + imgs.length;
    const totalPdfs = pdfCount + pdfs.length;

    if (totalImgs > 10) return setError("⚠️ You can upload up to 10 images only.");
    if (totalPdfs > 2) return setError("⚠️ You can upload up to 2 PDFs only.");

    setError(null);
    setImageCount(totalImgs);
    setPdfCount(totalPdfs);

    const updatedFiles = [...files, ...selected];
    setFiles(updatedFiles);
    form.setValue("files", updatedFiles);
  };

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    if (!file.type.startsWith("image/")) {
      return setError("❌ Thumbnail must be an image file.");
    }

    setThumbnail(file);
    form.setValue("thumbnail", file);
    setError(null);
  };

  const removeFile = (index: number) => {
    const file = files[index];
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);

    if (file.type.startsWith("image/")) setImageCount((c) => c - 1);
    else if (file.type === "application/pdf") setPdfCount((c) => c - 1);

    form.setValue("files", updated);
  };

  const onSubmitForm = (data: NoteFormValues) => {
    onSubmit(data.title, data.descriptions || "", data.thumbnail || null, data.files);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter note title"
                  {...field}
                  disabled={isUploading}
                  className="bg-transparent text-gray-200 border-gray-700 focus:ring-[#FFD700]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descriptions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short description..."
                  {...field}
                  disabled={isUploading}
                  className="bg-transparent text-gray-200 border-gray-700 focus:ring-[#FFD700]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Thumbnail (optional)</FormLabel>
          <div
            onClick={() => thumbInputRef.current?.click()}
            className="border-2 border-dashed border-gray-700 hover:border-[#FFD700]/50 rounded-xl p-5 text-center cursor-pointer relative"
          >
            <Input
              ref={thumbInputRef}
              type="file"
              accept="image/*"
              disabled={isUploading}
              onChange={handleThumbnail}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {thumbnail ? (
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="Thumbnail"
                className="mx-auto h-20 w-20 object-cover rounded-lg border border-gray-700"
              />
            ) : (
              <FileImage className="w-7 h-7 text-[#FFD700] mx-auto" />
            )}
          </div>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="files"
          render={() => (
            <FormItem>
              <FormLabel>Note Files</FormLabel>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-700 hover:border-[#FFD700]/50 rounded-xl p-6 text-center cursor-pointer relative"
              >
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  disabled={isUploading}
                  onChange={handleFiles}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <UploadCloud className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Click or drag to upload files</p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ⚠️ Warning and Count Summary */}
        <div className="text-sm text-gray-400 flex flex-col gap-1">
          <p>🖼️ {imageCount} / 10 Images</p>
          <p>📄 {pdfCount} / 2 PDFs</p>
          <p>🖋️ Thumbnail: {thumbnail ? "1 selected" : "None"}</p>
          {error && (
            <div className="flex items-center text-red-400 gap-2 mt-1">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
            {files.map((file, i) => (
              <Card key={file.name + i} className="bg-[#0a0a0a] border-gray-800">
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    {file.type.startsWith("image/") ? (
                      <FileImage className="w-5 h-5 text-[#FFD700]" />
                    ) : (
                      <FileText className="w-5 h-5 text-[#FFD700]" />
                    )}
                    <p className="text-sm text-gray-300 truncate">{file.name}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(i)}
                    disabled={isUploading}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="space-y-3">
          <Button
            type="submit"
            disabled={isUploading}
            className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-black font-semibold flex items-center justify-center gap-2 transition-all duration-200"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Notes"
            )}
          </Button>

          {isUploading && (
            <Progress
              value={70} // dummy progress or controlled externally
              className="h-2 bg-gray-800 [&>div]:bg-[#FFD700] animate-pulse"
            />
          )}
        </div>

      </form>
    </Form>
  );
}

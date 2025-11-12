"use client";

/**
 * ⚙️ EditNoteForm
 * ------------------------------------------------------------
 * - Handles full note editing: title, description, thumbnail, images, PDFs
 * - Clears local files after successful upload
 * - Resets form values automatically
 */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FileText, ImageIcon, Upload, AlertTriangle } from "lucide-react";
import { DeleteFileAlert } from "./DeleteAlert";

const MAX_IMAGES = 10;
const MAX_PDFS = 2;

const NoteSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  descriptions: z.string().min(10, "Description must be at least 10 characters"),
});

type NoteFormValues = z.infer<typeof NoteSchema>;

type NoteFile = {
  secure_url: string;
  public_id?: string;
  name?: string;
};

interface EditNoteFormProps {
  note: {
    _id: string;
    title: string;
    descriptions: string;
    noteImages?: NoteFile[];
    notePdfs?: NoteFile[];
    thumbnail?: NoteFile;
  };
  onSubmitForm: (form: FormData) => Promise<void>;
  onDeleteFile?: (type: "image" | "pdf" | "thumbnail", public_id: string) => Promise<void>;
  isSubmitting?: boolean;
}

export default function EditNoteForm({
  note,
  onSubmitForm,
  onDeleteFile,
  isSubmitting,
}: EditNoteFormProps) {
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: note?.title || "",
      descriptions: note?.descriptions || "",
    },
  });

  const [error, setError] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPdfs, setNewPdfs] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  // 🧠 Generate local previews for newly added images
  useEffect(() => {
    const urls = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [newImages]);

  // 🧾 Calculate totals
  const totalImages = (note.noteImages?.length || 0) + newImages.length;
  const totalPdfs = (note.notePdfs?.length || 0) + newPdfs.length;

  // 🖼️ Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (totalImages + files.length > MAX_IMAGES)
      return setError(`You can upload up to ${MAX_IMAGES} images.`);
    setError("");
    setNewImages((prev) => [...prev, ...files]);
  };

  // 📄 Handle PDF upload
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (totalPdfs + files.length > MAX_PDFS)
      return setError(`You can upload up to ${MAX_PDFS} PDFs.`);
    setError("");
    setNewPdfs((prev) => [...prev, ...files]);
  };

  // 📨 Handle submit
  const onSubmit = async (values: NoteFormValues) => {
    if (totalImages > MAX_IMAGES || totalPdfs > MAX_PDFS)
      return setError("File limit exceeded.");

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("descriptions", values.descriptions);
    newImages.forEach((f) => formData.append("noteImages", f));
    newPdfs.forEach((f) => formData.append("notePdfs", f));

    try {
      await onSubmitForm(formData);
      setError("");
      setSuccess(true);

      // ✅ Reset form + files after success
      setNewImages([]);
      setNewPdfs([]);
      setImagePreviews([]);
      form.reset(values);

      // Auto-hide success message
      setTimeout(() => setSuccess(false), 2500);
    } catch {
      setError("Failed to update note.");
    }
  };

  // 🧩 File delete button renderer
  const renderDelete = (type: "image" | "pdf" | "thumbnail", file: NoteFile) =>
    file?.public_id && onDeleteFile ? (
      <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <DeleteFileAlert
          type={type}
          public_id={file.public_id}
          onConfirm={onDeleteFile}
        />
      </div>
    ) : null;

  return (
    <div className="bg-[#0b0b0b] border border-[#FFD700]/30 text-white rounded-2xl p-6 shadow-lg space-y-6">
      {/* ✅ Success Message */}
      {success && (
        <Alert className="bg-green-900/40 border-green-600 text-green-300">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Note updated successfully!</AlertDescription>
        </Alert>
      )}

      {/* ❌ Error Message */}
      {error && (
        <Alert variant="destructive" className="bg-red-900/40 border-red-600">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* 🏷️ Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#FFD700]">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter note title"
                    className="bg-[#111] border-[#FFD700]/30 focus:border-[#FFD700]/60"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 📝 Description */}
          <FormField
            control={form.control}
            name="descriptions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#FFD700]">Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Enter note description"
                    className="bg-[#111] border-[#FFD700]/30 focus:border-[#FFD700]/60"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 🌄 Thumbnail */}
          {note?.thumbnail?.secure_url && (
            <section>
              <FormLabel className="text-[#FFD700]">Thumbnail</FormLabel>
              <div className="relative w-36 h-36 mt-3 group rounded-md overflow-hidden border border-[#FFD700]/30">
                <Image
                  src={note.thumbnail.secure_url}
                  alt="Thumbnail"
                  fill
                  className="object-cover rounded-md"
                />
                {renderDelete("thumbnail", note.thumbnail)}
              </div>
            </section>
          )}

          {/* 🖼️ Images */}
          <section>
            <FormLabel className="text-[#FFD700] flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Images ({totalImages}/{MAX_IMAGES})
            </FormLabel>
            <div className="flex flex-wrap gap-3 mt-3">
              {/* Existing Images */}
              {note.noteImages?.map((img, i) => (
                <div
                  key={i}
                  className="relative w-28 h-28 group rounded-md overflow-hidden border border-[#FFD700]/30"
                >
                  <Image
                    src={img.secure_url}
                    alt={`Note Image ${i}`}
                    fill
                    className="object-cover rounded-md"
                  />
                  {renderDelete("image", img)}
                </div>
              ))}

              {/* New Previews */}
              {imagePreviews.map((src, i) => (
                <div
                  key={`preview-${i}`}
                  className="relative w-28 h-28 rounded-md overflow-hidden border border-dashed border-[#FFD700]/40"
                >
                  <Image
                    src={src}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md opacity-70"
                  />
                </div>
              ))}

              {/* Upload Button */}
              <label className="w-28 h-28 flex flex-col items-center justify-center border border-dashed border-[#FFD700]/40 rounded-md text-xs text-[#FFD700]/80 hover:bg-[#FFD700]/10 cursor-pointer transition">
                <Upload className="w-5 h-5" /> Add
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </section>

          {/* 📄 PDFs */}
          <section>
            <FormLabel className="text-[#FFD700] flex items-center gap-2">
              <FileText className="w-4 h-4" /> PDFs ({totalPdfs}/{MAX_PDFS})
            </FormLabel>
            <div className="flex flex-col gap-2 mt-2">
              {note.notePdfs?.map((pdf, i) => (
                <div
                  key={i}
                  className="relative flex items-center justify-between bg-[#111] border border-[#FFD700]/30 rounded-md px-3 py-2 group"
                >
                  <span className="truncate text-[#FFD700]">
                    {pdf.name || pdf.secure_url}
                  </span>
                  {renderDelete("pdf", pdf)}
                </div>
              ))}

              {newPdfs.map((file, i) => (
                <div
                  key={`new-pdf-${i}`}
                  className="flex items-center justify-between bg-[#222] border border-dashed border-[#FFD700]/40 rounded-md px-3 py-2"
                >
                  <span className="truncate text-[#FFD700]/80">{file.name}</span>
                </div>
              ))}

              <label className="flex items-center justify-center gap-2 text-xs border border-dashed border-[#FFD700]/40 rounded-md px-3 py-2 text-[#FFD700]/80 hover:bg-[#FFD700]/10 cursor-pointer transition">
                <Upload className="w-4 h-4" /> Add PDFs
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  hidden
                  onChange={handlePdfUpload}
                />
              </label>
            </div>
          </section>

          {/* 💾 Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FFD700] text-black font-semibold hover:bg-[#e6c200]"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { ImageIcon, FileText, Upload, AlertTriangle } from "lucide-react";
import { DeleteFileAlert } from "./DeleteAlert";

/* ============================
   🔹 CONSTANTS & VALIDATION
============================ */

const MAX_IMAGES = 10;
const MAX_PDFS = 2;

const NoteSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  descriptions: z.string().min(10, "Description must be at least 10 characters"),
});

type FormValues = z.infer<typeof NoteSchema>;

export interface CloudFile {
  secure_url: string;
  public_id?: string;
  name?: string;
}

export interface NoteData {
  _id: string;
  title: string;
  descriptions: string;
  thumbnail?: CloudFile;
  noteImages?: CloudFile[];
  notePdfs?: CloudFile[];
}

interface EditNoteFormProps {
  note: NoteData;
  isSubmitting?: boolean;
  uploading?: boolean;
  progress?: number;
  onSubmitForm: (data: {
    title: string;
    descriptions: string;
    newThumb: File | null;
    newImages: File[];
    newPdfs: File[];
  }) => Promise<void>;
  onDeleteFile?: (
    type: "image" | "pdf" | "thumbnail",
    publicId: string
  ) => Promise<void>;
}

/* ============================
   🔹 COMPONENT
============================ */

export default function EditNoteForm({
  note,
  onSubmitForm,
  onDeleteFile,
  isSubmitting = false,
  uploading = false,
  progress = 0,
}: EditNoteFormProps) {
  /* ------------------------------
     🔹 Form Setup
  ------------------------------ */
  const form = useForm<FormValues>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: note.title,
      descriptions: note.descriptions,
    },
  });

  /* ------------------------------
     🔹 Local State
  ------------------------------ */
  const [newThumb, setNewThumb] = useState<File | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPdfs, setNewPdfs] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* ---------------------------------------
     🔹 Handle Image Previews
  ------------------------------------------ */
  useEffect(() => {
    const list = newImages.map((file) => URL.createObjectURL(file));
    setPreviews(list);

    return () => list.forEach((url) => URL.revokeObjectURL(url));
  }, [newImages]);

  /* ---------------------------------------
     🔹 Totals
  ------------------------------------------ */
  const totalImages = (note.noteImages?.length || 0) + newImages.length;
  const totalPdfs = (note.notePdfs?.length || 0) + newPdfs.length;

  /* ---------------------------------------
     🔹 Handlers
  ------------------------------------------ */

  const handleThumb = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewThumb(file);
  };

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (totalImages + files.length > MAX_IMAGES) {
      return setError(`You can upload max ${MAX_IMAGES} images.`);
    }

    setError("");
    setNewImages((prev) => [...prev, ...files]);
  };

  const handlePdfs = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (totalPdfs + files.length > MAX_PDFS) {
      return setError(`You can upload max ${MAX_PDFS} PDFs.`);
    }

    setError("");
    setNewPdfs((prev) => [...prev, ...files]);
  };

  /* ---------------------------------------
     🔹 Submit Form
  ------------------------------------------ */
  const submit = async (values: FormValues) => {
    try {
      await onSubmitForm({
        title: values.title,
        descriptions: values.descriptions,
        newThumb,
        newImages,
        newPdfs,
      });

      setSuccess(true);
      setError("");

      // reset new files
      setNewThumb(null);
      setNewImages([]);
      setNewPdfs([]);
      setPreviews([]);

      setTimeout(() => setSuccess(false), 2500);
    } catch {
      setError("Failed to update note");
    }
  };

  /* ---------------------------------------
     🔹 Delete Button Renderer
  ------------------------------------------ */
  const renderDeleteButton = (type: "image" | "pdf" | "thumbnail", f: CloudFile) =>
    f.public_id && onDeleteFile ? (
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
        <DeleteFileAlert type={type} public_id={f.public_id} onConfirm={onDeleteFile} />
      </div>
    ) : null;

  /* ============================
     UI STARTS HERE
  ============================= */

  return (
    <div className="bg-[#0b0b0b] border border-[#FFD700]/30 rounded-2xl p-6 space-y-6 text-white">

      {/* success message */}
      {success && (
        <Alert className="bg-green-900/40 border-green-500">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Note updated successfully.</AlertDescription>
        </Alert>
      )}

      {/* error message */}
      {error && (
        <Alert variant="destructive" className="bg-red-900/40 border-red-600">
          <AlertTriangle className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* uploading overlay */}
      {uploading && (
        <p className="text-yellow-400 text-sm">Uploading… {progress}%</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-8">

          {/* ---------------- TITLE ---------------- */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#FFD700]">Title</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-[#111] border-[#FFD700]/40" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ---------------- DESCRIPTION ---------------- */}
          <FormField
            control={form.control}
            name="descriptions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#FFD700]">Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} className="bg-[#111] border-[#FFD700]/40" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ---------------- THUMBNAIL ---------------- */}
          <section>
            <FormLabel className="text-[#FFD700]">Thumbnail</FormLabel>

            {/* existing thumbnail */}
            {note.thumbnail && !newThumb && (
              <div className="relative w-36 h-36 mt-3 group border border-[#FFD700]/30 rounded-md overflow-hidden">
                <Image src={note.thumbnail.secure_url} alt="thumbnail" fill className="object-cover" />
                {renderDeleteButton("thumbnail", note.thumbnail)}
              </div>
            )}

            {/* new thumb preview */}
            {newThumb && (
              <div className="relative w-36 h-36 mt-3 border border-[#FFD700]/40 rounded-md overflow-hidden">
                <Image src={URL.createObjectURL(newThumb)} alt="thumbnail" fill className="object-cover" />
              </div>
            )}

            {/* upload button */}
            <label className="inline-flex items-center gap-2 mt-3 cursor-pointer text-[#FFD700] text-xs px-3 py-2 border border-dashed border-[#FFD700]/40 rounded-md hover:bg-[#FFD700]/10 transition">
              <Upload className="w-4 h-4" /> Replace Thumbnail
              <input type="file" hidden accept="image/*" onChange={handleThumb} />
            </label>
          </section>

          {/* ---------------- IMAGES ---------------- */}
          <section>
            <FormLabel className="text-[#FFD700] flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Images ({totalImages}/{MAX_IMAGES})
            </FormLabel>

            <div className="flex flex-wrap gap-3 mt-3">

              {/* old images */}
              {note.noteImages?.map((img, idx) => (
                <div key={idx} className="relative w-28 h-28 group rounded-md overflow-hidden border border-[#FFD700]/30 shrink-0">
                  <Image src={img.secure_url} alt="" fill className="object-cover" />
                  {renderDeleteButton("image", img)}
                </div>
              ))}

              {/* new previews */}
              {previews.map((src, idx) => (
                <div key={idx} className="relative w-28 h-28 rounded-md overflow-hidden border border-dashed border-[#FFD700]/40">
                  <Image src={src} alt="preview" fill className="object-cover opacity-80" />
                </div>
              ))}

              {/* add button */}
              <label className="w-28 h-28 flex flex-col items-center justify-center border border-dashed border-[#FFD700]/40 rounded-md text-xs text-[#FFD700]/70 hover:bg-[#FFD700]/10 cursor-pointer transition">
                <Upload className="w-5 h-5" /> Add
                <input type="file" multiple hidden accept="image/*" onChange={handleImages} />
              </label>
            </div>
          </section>

          {/* ---------------- PDFs ---------------- */}
          <section>
            <FormLabel className="text-[#FFD700] flex items-center gap-2">
              <FileText className="w-4 h-4" /> PDFs ({totalPdfs}/{MAX_PDFS})
            </FormLabel>

            <div className="space-y-2 mt-2">

              {/* existing PDFs */}
              {note.notePdfs?.map((pdf, idx) => (
                <div key={idx} className="relative bg-[#111] border border-[#FFD700]/30 px-3 py-2 rounded-md group flex justify-between">
                  <span className="text-[#FFD700] truncate">{pdf.name || pdf.secure_url}</span>
                  {renderDeleteButton("pdf", pdf)}
                </div>
              ))}

              {/* new PDFs */}
              {newPdfs.map((file, idx) => (
                <div key={idx} className="bg-[#222] border border-dashed border-[#FFD700]/40 px-3 py-2 rounded-md text-[#FFD700]/70">
                  {file.name}
                </div>
              ))}

              {/* add PDFs */}
              <label className="flex items-center gap-2 text-xs border border-dashed border-[#FFD700]/40 px-3 py-2 rounded-md text-[#FFD700]/70 hover:bg-[#FFD700]/10 cursor-pointer transition">
                <Upload className="w-4 h-4" /> Add PDFs
                <input type="file" multiple hidden accept="application/pdf" onChange={handlePdfs} />
              </label>
            </div>
          </section>

          {/* ---------------- SUBMIT BUTTON ---------------- */}
          {(() => {
            const nothingToUpdate =
              !form.formState.isDirty &&
              !newThumb &&
              newImages.length === 0 &&
              newPdfs.length === 0;

            const disabled = isSubmitting || uploading || nothingToUpdate;

            return (
              <div className="flex justify-end">
                <Button
                  disabled={disabled}
                  className={`bg-[#FFD700] text-black font-semibold ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#e6c200] cursor-pointer"
                    }`}
                >
                  {(isSubmitting || uploading) ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            );
          })()}


        </form>
      </Form>
    </div>
  );
}

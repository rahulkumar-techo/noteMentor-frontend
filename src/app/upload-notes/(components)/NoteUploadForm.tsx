"use client";

/**
 * Note Upload Form (Separated Inputs for Images & PDFs)
 * -----------------------------------------------------------
 * - Thumbnail upload (single image)
 * - Images upload (up to 10)
 * - PDFs upload (up to 2)
 * - Clean state and Zod validation
 */

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
import { Progress } from "@/components/ui/progress";


// ⛔ UPDATED SCHEMA → images & pdfs are separate
const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  descriptions: z.string().optional(),

  thumbnail: z.instanceof(File).optional().nullable(),

  images: z.array(z.instanceof(File)).max(10, "Max 10 images allowed"),
  pdfs: z.array(z.instanceof(File)).max(2, "Max 2 PDFs allowed"),
});

type NoteFormValues = z.infer<typeof noteSchema>;

interface NoteUploadFormProps {
  onSubmit: (
    title: string,
    descriptions: string,
    thumbnail: File | null,
    images: File[],
    pdfs: File[]
  ) => void;
  isUploading?: boolean;
}

export default function NoteUploadForm({
  onSubmit,
  isUploading = false,
}: NoteUploadFormProps) {
  
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const thumbInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      descriptions: "",
      thumbnail: null,
      images: [],
      pdfs: [],
    },
  });

  // --------------------------
  //  HANDLE THUMBNAIL
  // --------------------------
  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("❌ Thumbnail must be an image.");
      return;
    }

    setError(null);
    setThumbnail(file);
    form.setValue("thumbnail", file);
  };

  // --------------------------
  //  HANDLE IMAGES
  // --------------------------
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    if (!selected.length) return;

    const imgs = selected.filter((f) => f.type.startsWith("image/"));
    if (imgs.length !== selected.length) {
      return setError("❌ Only image files allowed here.");
    }

    if (imageFiles.length + imgs.length > 10) {
      return setError("⚠️ Max 10 images allowed.");
    }

    const updated = [...imageFiles, ...imgs];
    setImageFiles(updated);
    form.setValue("images", updated);
    setError(null);
  };

  // --------------------------
  //  HANDLE PDFs
  // --------------------------
  const handlePdfs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    if (!selected.length) return;

    const pdfs = selected.filter((f) => f.type === "application/pdf");
    if (pdfs.length !== selected.length) {
      return setError("❌ Only PDF files allowed.");
    }

    if (pdfFiles.length + pdfs.length > 2) {
      return setError("⚠️ Max 2 PDFs allowed.");
    }

    const updated = [...pdfFiles, ...pdfs];
    setPdfFiles(updated);
    form.setValue("pdfs", updated);
    setError(null);
  };

  const removeImage = (i: number) => {
    const updated = imageFiles.filter((_, idx) => idx !== i);
    setImageFiles(updated);
    form.setValue("images", updated);
  };

  const removePdf = (i: number) => {
    const updated = pdfFiles.filter((_, idx) => idx !== i);
    setPdfFiles(updated);
    form.setValue("pdfs", updated);
  };

  const onSubmitForm = (data: NoteFormValues) => {
    onSubmit(
      data.title,
      data.descriptions || "",
      data.thumbnail || null,
      data.images,
      data.pdfs
    );
  };

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6 w-full">
        
        {/* ==================== TITLE ==================== */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} disabled={isUploading} className="bg-transparent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ==================== DESCRIPTION ==================== */}
        <FormField
          control={form.control}
          name="descriptions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={isUploading} className="bg-transparent" />
              </FormControl>
            </FormItem>
          )}
        />

        {/* ==================== THUMBNAIL ==================== */}
        <FormItem>
          <FormLabel>Thumbnail</FormLabel>
          <div
            className="border-2 border-dashed border-gray-700 p-4 rounded-xl cursor-pointer"
            onClick={() => thumbInputRef.current?.click()}
          >
            <Input
              ref={thumbInputRef}
              type="file"
              accept="image/*"
              onChange={handleThumbnail}
              className="hidden"
              disabled={isUploading}
            />

            {thumbnail ? (
              <img
                src={URL.createObjectURL(thumbnail)}
                className="h-20 w-20 mx-auto rounded-lg"
              />
            ) : (
              <FileImage className="mx-auto text-yellow-400 h-8 w-8" />
            )}
          </div>
        </FormItem>

        {/* ====================================================== */}
        {/* ==================== IMAGE UPLOAD ==================== */}
        {/* ====================================================== */}
        <FormItem>
          <FormLabel>Images (Max 10)</FormLabel>
          <div
            className="border-2 border-dashed border-gray-700 p-5 rounded-xl cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <Input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImages}
              className="hidden"
              disabled={isUploading}
            />
            <UploadCloud className="mx-auto text-yellow-400 h-7 w-7" />
            <p className="text-gray-400 text-sm mt-1">Upload Images</p>
          </div>

          {/* IMAGE LIST */}
          {imageFiles.map((file, index) => (
            <Card key={index} className="bg-black border-gray-800 mt-2">
              <CardContent className="flex justify-between p-3">
                <div className="flex gap-2 items-center">
                  <FileImage className="text-yellow-400 h-5 w-5" />
                  <p className="text-gray-300 text-sm">{file.name}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeImage(index)}>
                  <Trash2 className="text-red-500 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </FormItem>

        {/* ====================================================== */}
        {/* ==================== PDF UPLOAD ====================== */}
        {/* ====================================================== */}
        <FormItem>
          <FormLabel>PDF Files (Max 2)</FormLabel>
          <div
            className="border-2 border-dashed border-gray-700 p-5 rounded-xl cursor-pointer"
            onClick={() => pdfInputRef.current?.click()}
          >
            <Input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              multiple
              onChange={handlePdfs}
              className="hidden"
              disabled={isUploading}
            />
            <UploadCloud className="mx-auto text-yellow-400 h-7 w-7" />
            <p className="text-gray-400 text-sm mt-1">Upload PDFs</p>
          </div>

          {/* PDF LIST */}
          {pdfFiles.map((file, index) => (
            <Card key={index} className="bg-black border-gray-800 mt-2">
              <CardContent className="flex justify-between p-3">
                <div className="flex gap-2 items-center">
                  <FileText className="text-yellow-400 h-5 w-5" />
                  <p className="text-gray-300 text-sm">{file.name}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removePdf(index)}>
                  <Trash2 className="text-red-500 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </FormItem>

        {/* ==================== ERRORS ==================== */}
        {error && (
          <div className="flex items-center text-red-400 gap-2 mt-1">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        {/* ==================== SUBMIT ==================== */}
        <Button type="submit" disabled={isUploading} className="w-full bg-yellow-400 text-black">
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
            value={60}
            className="h-2 bg-gray-800 [&>div]:bg-yellow-400 animate-pulse"
          />
        )}

      </form>
    </Form>
  );
}

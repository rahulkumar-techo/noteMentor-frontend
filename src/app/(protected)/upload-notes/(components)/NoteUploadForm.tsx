"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Form } from "@/components/ui/form";
import TitleDescription from "./upload/TitleDescription";
import ThumbnailBox from "./upload/ThumbnailBox";
import ImagesBox from "./upload/ImagesBox";
import PdfBox from "./upload/PdfBox";
import { useRouter } from "next/navigation";


// ✅ Props Interface (Type Safe)
export interface NoteUploadFormProps {
  onSubmit: (
    title: string,
    descriptions: string,
    thumbnail: File | null,
    images: File[],
    pdfs: File[]
  ) => void | Promise<void>;
  isUploading?: boolean;
  progressValue?: number;
  isSaved?: boolean;
}

const noteSchema = z.object({
  title: z.string().min(1),
  descriptions: z.string().optional(),
  thumbnail: z.any().nullable(),
  images: z.any().optional(),
  pdfs: z.any().optional(),
});

export type NoteFormValues = z.infer<typeof noteSchema>;

export default function NoteUploadForm({
  onSubmit,
  isUploading = false,
  progressValue = 0,
  isSaved = false,
}: NoteUploadFormProps) {
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: { title: "", descriptions: "" },
  });

  const [thumbnail, setThumbnail] = React.useState<File | null>(null);
  const [images, setImages] = React.useState<File[]>([]);
  const [pdfs, setPdfs] = React.useState<File[]>([]);

  React.useEffect(() => {
    if (isSaved) {
      form.reset();
      setThumbnail(null);
      setImages([]);
      setPdfs([]);
    }
  }, [isSaved]);

  const handleSubmit = (data: NoteFormValues) => {
    onSubmit(data.title, data.descriptions || "", thumbnail, images, pdfs);
  };

  const router = useRouter();
  useEffect(() => {
    if (isSaved) {
      router.push("/dashboard/my-notes")
    }

  }, [isSaved])

  return (
    <Form {...form}>
      {/* VERY IMPORTANT — fixes “useFormContext is null” error */}

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <TitleDescription form={form} isUploading={isUploading} />
          <ThumbnailBox
            value={thumbnail}
            onChange={setThumbnail}
            isUploading={isUploading}
          />
        </div>

        <div className="space-y-6">
          <ImagesBox value={images} setValue={setImages} isUploading={isUploading} />
          <PdfBox value={pdfs} setValue={setPdfs} isUploading={isUploading} />
        </div>

        <div className="flex flex-col items-center">
          <Progress value={progressValue ?? 0} className="w-full max-w-lg mb-3" />
          <Button type="submit" disabled={isUploading} className="w-48">
            {isUploading ? "Uploading…" : "Upload Notes"}
          </Button>
        </div>

      </form>
    </Form>
  );
}

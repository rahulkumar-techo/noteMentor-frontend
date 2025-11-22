"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FileText, ImageIcon, Trash2, Upload, AlertTriangle } from "lucide-react";

type ExistingImage = { secure_url: string; [k: string]: any };
type ExistingPdf = { secure_url?: string; name?: string; [k: string]: any };
type ExistingPdfItem = { name: string; url?: string };
type NewPdfItem = { name: string; file: File };
type CombinedPdfItem = ExistingPdfItem | NewPdfItem;

type EditNoteDialogProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  note: {
    _id?: string;
    title?: string;
    descriptions?: string;
    noteImages?: ExistingImage[];
    notePdfs?: ExistingPdf[];
    [k: string]: any;
  } | null;
  refetch?: () => void;
};

export default function EditNoteDialog({ open, onOpenChange, note, refetch }: EditNoteDialogProps) {
  const [title, setTitle] = useState<string>(note?.title ?? "");
  const [descriptions, setDescriptions] = useState<string>(note?.descriptions ?? "");
  const [images, setImages] = useState<ExistingImage[]>(note?.noteImages ?? []);
  const [pdfs, setPdfs] = useState<ExistingPdf[]>(note?.notePdfs ?? []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [newPdfs, setNewPdfs] = useState<File[]>([]);
  const [newPdfPreviews, setNewPdfPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const MAX_IMAGES = 10;
  const MAX_PDFS = 2;

  useEffect(() => {
    setTitle(note?.title ?? "");
    setDescriptions(note?.descriptions ?? "");
    setImages(note?.noteImages ?? []);
    setPdfs(note?.notePdfs ?? []);
    setNewImages([]);
    setNewImagePreviews([]);
    setNewPdfs([]);
    setNewPdfPreviews([]);
    setError("");
  }, [note, open]);

  const totalImages = useMemo(() => images.length + newImages.length, [images.length, newImages.length]);
  const totalPdfs = useMemo(() => pdfs.length + newPdfs.length, [pdfs.length, newPdfs.length]);

  useEffect(() => {
    const urls = newImages.map((f) => URL.createObjectURL(f));
    setNewImagePreviews(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [newImages]);

  useEffect(() => {
    const urls = newPdfs.map((f) => URL.createObjectURL(f));
    setNewPdfPreviews(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [newPdfs]);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      if (!files.length) return;
      if (totalImages + files.length > MAX_IMAGES) {
        setError(`You can upload up to ${MAX_IMAGES} images in total.`);
        return;
      }
      setError("");
      setNewImages((prev) => [...prev, ...files]);
    },
    [MAX_IMAGES, totalImages]
  );

  const handlePdfUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      if (!files.length) return;
      if (totalPdfs + files.length > MAX_PDFS) {
        setError(`You can upload up to ${MAX_PDFS} PDFs in total.`);
        return;
      }
      setError("");
      setNewPdfs((prev) => [...prev, ...files]);
    },
    [MAX_PDFS, totalPdfs]
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      if (index < images.length) {
        setImages((prev) => prev.filter((_, i) => i !== index));
      } else {
        const newIndex = index - images.length;
        setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
      }
    },
    [images.length]
  );

  const handleRemovePdf = useCallback(
    (index: number) => {
      if (index < pdfs.length) {
        setPdfs((prev) => prev.filter((_, i) => i !== index));
      } else {
        const newIndex = index - pdfs.length;
        setNewPdfs((prev) => prev.filter((_, i) => i !== newIndex));
      }
    },
    [pdfs.length]
  );

  const isNewPdf = (pdf: CombinedPdfItem): pdf is NewPdfItem => {
    return (pdf as NewPdfItem).file !== undefined;
  };

  const combinedImagePreviews = useMemo(() => {
    const existing = images.map((img) => img.secure_url);
    return [...existing, ...newImagePreviews];
  }, [images, newImagePreviews]);

  const combinedPdfs: CombinedPdfItem[] = useMemo(() => {
    const existing: ExistingPdfItem[] = pdfs.map((p) => ({
      name: p.name ?? p.secure_url?.split("/").pop() ?? "PDF",
      url: p.secure_url,
    }));
    const added: NewPdfItem[] = newPdfs.map((f) => ({ name: f.name, file: f }));
    return [...existing, ...added];
  }, [pdfs, newPdfs]);

  const isDirty = useMemo(() => {
    if (!note) return true;
    if (title !== (note.title ?? "")) return true;
    if (descriptions !== (note.descriptions ?? "")) return true;
    if (images.length !== (note.noteImages?.length ?? 0)) return true;
    if (pdfs.length !== (note.notePdfs?.length ?? 0)) return true;
    if (newImages.length > 0 || newPdfs.length > 0) return true;
    return false;
  }, [title, descriptions, images, pdfs, newImages.length, newPdfs.length, note]);

  const handleSave = useCallback(async () => {
    if (totalImages > MAX_IMAGES) {
      setError(`You can upload up to ${MAX_IMAGES} images in total.`);
      return;
    }
    if (totalPdfs > MAX_PDFS) {
      setError(`You can upload up to ${MAX_PDFS} PDFs in total.`);
      return;
    }
    setError("");

    const form = new FormData();
    form.append("title", title);
    form.append("descriptions", descriptions);
    form.append("existingImages", JSON.stringify(images.map((im) => im.secure_url)));
    form.append("existingPdfs", JSON.stringify(pdfs.map((p) => p.secure_url ?? p.name ?? "")));
    newImages.forEach((file) => form.append("images", file));
    newPdfs.forEach((file) => form.append("pdfs", file));

    refetch?.();
    onOpenChange(false);
  }, [MAX_IMAGES, MAX_PDFS, descriptions, images, newImages, newPdfs, pdfs, refetch, title, totalImages, totalPdfs, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          bg-[#0a0a0a] text-white border border-[#FFD700]/30 rounded-2xl
          w-full max-w-[90vw] md:max-w-[1100px]
          max-h-[90vh] overflow-y-auto p-6
          scrollbar-thin scrollbar-thumb-[#FFD700]/30 scrollbar-track-transparent
        "
      >
        <DialogHeader>
          <DialogTitle className="text-[#FFD700] text-lg sm:text-xl">Edit Note</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-400/30 p-2 rounded-md text-sm mt-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-6 mt-5">
          <div className="flex flex-col gap-5">
            <div className="space-y-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded-md bg-[#111] border border-[#FFD700]/30 focus:border-[#FFD700] focus:outline-none"
                placeholder="Note Title"
              />
              <textarea
                rows={5}
                value={descriptions}
                onChange={(e) => setDescriptions(e.target.value)}
                className="w-full p-2 rounded-md bg-[#111] border border-[#FFD700]/30 focus:border-[#FFD700] focus:outline-none resize-none"
                placeholder="Description"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[#FFD700] font-medium flex items-center gap-2">
                  <FileText className="w-5 h-5" /> PDFs ({totalPdfs}/{MAX_PDFS})
                </p>

                <label className="flex items-center gap-2 text-xs cursor-pointer border border-[#FFD700]/40 px-3 py-1 rounded-md hover:bg-[#FFD700]/10 transition">
                  <Upload className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-[#FFD700]">Add PDFs</span>
                  <input type="file" accept="application/pdf" multiple hidden onChange={handlePdfUpload} />
                </label>
              </div>

              {combinedPdfs.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {combinedPdfs.map((p, i) => {
                    const isNew = isNewPdf(p);
                    const href = isNew ? newPdfPreviews[i - pdfs.length] : p.url;
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between w-full sm:w-auto border border-[#FFD700]/30 text-[#FFD700] text-sm px-3 py-2 rounded-md hover:bg-[#FFD700]/10 transition"
                      >
                        {href ? (
                          <a
                            href={isNew ? "#" : href}
                            target={isNew ? undefined : "_blank"}
                            rel={isNew ? undefined : "noopener noreferrer"}
                            className="flex items-center gap-2 truncate max-w-40"
                            onClick={(ev) => {
                              if (isNew) ev.preventDefault();
                            }}
                          >
                            <FileText className="w-4 h-4" /> {p.name}
                          </a>
                        ) : (
                          <span className="flex items-center gap-2 text-gray-400">
                            <FileText className="w-4 h-4" /> {p.name}
                          </span>
                        )}

                        <button onClick={() => handleRemovePdf(i)} className="ml-2 text-red-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-gray-500 text-sm border border-gray-700 rounded-md p-3 text-center">No PDFs Attached</div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-[#FFD700] font-medium flex items-center gap-2">
                <ImageIcon className="w-5 h-5" /> Images ({totalImages}/{MAX_IMAGES})
              </p>

              <label className="flex items-center gap-2 text-xs cursor-pointer border border-[#FFD700]/40 px-3 py-1 rounded-md hover:bg-[#FFD700]/10 transition">
                <Upload className="w-4 h-4 text-[#FFD700]" />
                <span className="text-[#FFD700]">Add Images</span>
                <input type="file" accept="image/*" multiple hidden onChange={handleImageUpload} />
              </label>
            </div>

            {totalImages > 0 ? (
              <div className="relative w-full overflow-visible">
                <Carousel className="relative z-40 w-full">
                  <CarouselContent>
                    {combinedImagePreviews.map((src, i) => (
                      <CarouselItem key={i}>
                        <div className="relative w-full h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden border border-[#FFD700]/30">
                          {src ? (
                            <Image src={src} alt={`Note Image ${i + 1}`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">No preview</div>
                          )}

                          <button onClick={() => handleRemoveImage(i)} className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-full z-50">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-black/40 hover:bg-[#FFD700]/40 text-white rounded-full p-2 shadow-md" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-black/40 hover:bg-[#FFD700]/40 text-white rounded-full p-2 shadow-md" />
                </Carousel>
              </div>
            ) : (
              <div className="w-full h-56 bg-[#1a1a1a] border border-gray-700 rounded-md flex items-center justify-center text-gray-500 text-sm">No Images</div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#FFD700] text-black hover:bg-[#e6c800]" disabled={!isDirty}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

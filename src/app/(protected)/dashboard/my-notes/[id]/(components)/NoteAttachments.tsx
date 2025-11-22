"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import PreviewImage from "@/components/PreviewImage";
import { PdfViewer } from "./DisplayPdfs";

export function NoteAttachments({ images = [], pdfs = [] }: any) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <>
      <section className="bg-white dark:bg-black p-6 rounded-2xl border border-gray-800 backdrop-blur-md">
        <h2 className="text-lg font-semibold text-[#FFD700] mb-3">
          Attachments
        </h2>

        {/* ---- IMAGES ---- */}
        {images.length > 0 && (
          <div className="mb-5">
            <p className="text-gray-300 mb-3">🖼 Images ({images.length})</p>

            <Carousel>
              <CarouselContent>
                {images.map((img: any, index: number) => (
                  <CarouselItem
                    key={index}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-2"
                  >
                    <div
                      className="relative w-full h-60 sm:h-72 md:h-80 rounded-xl overflow-hidden border border-[#FFD700]/20 cursor-pointer"
                      onClick={() => setPreviewImage(img.secure_url)}
                    >
                      <Image
                        src={img.secure_url}
                        alt="image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
        )}

        {/* ---- PDFs ---- */}
        {pdfs.length > 0 && (
          <div>
            <p className="text-gray-300 mb-2">📄 PDFs ({pdfs.length})</p>

            <div className="flex flex-col gap-2">
              {pdfs.map((pdf: any, i: number) => (
                <div
                  key={i}
                  className="border border-[#FFD700]/30 text-[#FFD700] text-xs sm:text-sm px-3 py-2 rounded-md"
                >
                  <PdfViewer fileUrl={pdf.secure_url} />
                  View PDF {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ---- MODAL ---- */}
      {previewImage && (
        <PreviewImage src={previewImage} onClose={() => setPreviewImage(null)} />
      )}
    </>
  );
}

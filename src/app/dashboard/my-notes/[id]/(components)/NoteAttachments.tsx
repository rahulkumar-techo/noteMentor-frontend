"use client"

import React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { PdfViewer } from "./DisplayPdfs";

export function NoteAttachments({ images, pdfs }: any) {
    return (
        <section className="bg-[#0d0d0f]/70 p-6 rounded-2xl border border-gray-800 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-[#FFD700] mb-3">Attachments</h2>

            {/* Images Carousel */}
            {images?.length > 0 && (
                <div className="mb-5">
                    <p className="text-gray-300 mb-3">🖼 Images ({images.length})</p>
                    <div className="relative w-full overflow-visible">
                        <Carousel className="relative w-full">
                            <CarouselContent>
                                {images.map((img: any, i: number) => (
                                    <CarouselItem key={i} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-2">
                                        <div className="relative w-full h-60 sm:h-72 md:h-80 rounded-xl overflow-hidden border border-[#FFD700]/20">
                                            <Image
                                                src={img.secure_url}
                                                alt={`Note image ${i + 1}`}
                                                fill
                                                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                                                className="object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-black/80 text-white hover:bg-[#FFD700]/60 border border-[#FFD700]/30 rounded-full p-3 shadow-lg backdrop-blur-md transition-all"
                            />
                            <CarouselNext
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-black/80 text-white hover:bg-[#FFD700]/60 border border-[#FFD700]/30 rounded-full p-3 shadow-lg backdrop-blur-md transition-all"
                            />
                        </Carousel>
                    </div>
                </div>
            )}

            {/* PDFs Section */}
            {pdfs?.length > 0 && (
                <div>
                    <p className="text-gray-300 mb-2">📄 PDFs ({pdfs.length})</p>
                    <div className="flex flex-wrap flex-col gap-2">
                        {pdfs.map((pdf: any, idx: number) => (
                            <div
                                key={idx}
                                className="border border-[#FFD700]/30 text-[#FFD700]  text-xs sm:text-sm px-3 py-2 rounded-md transition"
                            >
                                <PdfViewer fileUrl={pdf.secure_url} />
                                View PDF {idx + 1}
                            </div>

                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
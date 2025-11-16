// (components)/NoteDetails.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { PdfViewer } from "./NotePdf";
import CommentSystem from "@/components/comment-sys/CommentSystem";
import CustomAvatar from "@/components/CustomAvatar";

interface NoteDetailsProps {
    note: any;
}

export default function NoteDetails({ note }: NoteDetailsProps) {
    if (!note) return <div>No note found</div>;
    console.log(note)

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8">

            {/* Back Button */}
            <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
                ⬅ Back
            </button>

            {/* Title */}
            <h1 className="text-3xl font-bold">{note.title}</h1>

            {/* User Info + Description */}
            <div className="text-muted-foreground space-y-3">
                <div className="flex items-center gap-3">
                    {/* <div className="w-10 h-10 rounded-full bg-gray-300" /> */}
                    <CustomAvatar src={note?.authorId?.avatar?.secure_url}/>
                    <div>
                        <p className="font-medium">{note.authorId?.fullname || "Unknown User"}</p>
                        <p className="text-xs text-muted-foreground">
                            {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <p>{note.descriptions}</p>
            </div>

            <Separator />

            {/* Images Section */}
            {note.noteImages?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {note.noteImages.map((img: any, idx: number) => (
                        <Card key={idx} className="overflow-hidden">
                            <CardContent className="p-0">
                                <Image
                                    src={img.secure_url}
                                    alt={`img-${idx}`}
                                    width={800}
                                    height={500}
                                    className="w-full rounded-md object-cover"
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* PDFs Section */}
            {note.notePdfs?.length > 0 && (
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold">PDF Files</h2>

                    {note.notePdfs.map((pdf: any, idx: number) => (
                        <div key={idx}>
                            <PdfViewer fileUrl={pdf.secure_url} />
                        </div>
                    ))}
                </div>
            )}

            <Separator />

            {/* Comments Section */}

            <section>
                
                <CommentSystem noteId={note._id} />
            </section>
        </div>
    );
}

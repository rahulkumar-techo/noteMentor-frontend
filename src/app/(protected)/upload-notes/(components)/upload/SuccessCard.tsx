
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export interface UploadedNote {
  title: string;
  createdAt: string | Date;
  thumbnail?: { secure_url?: string };
  noteImages?: { secure_url: string }[];
  notePdfs?: { secure_url: string }[];
}

interface SuccessCardProps {
  note: UploadedNote;
}

export default function SuccessCard({ note }: SuccessCardProps) {
  return (
    <Card className="bg-black/40 border border-gray-800 text-gray-200 rounded-2xl shadow-lg mt-8">
      <CardContent className="p-6 space-y-5">
        
        <h2 className="text-xl font-semibold text-yellow-400">Upload Successful 🎉</h2>

        {/* Thumbnail */}
        {note.thumbnail?.secure_url && (
          <div className="flex justify-center">
            <Image
              src={note.thumbnail.secure_url}
              alt="thumbnail"
              width={180}
              height={120}
              className="rounded-xl border border-gray-700 shadow"
            />
          </div>
        )}

        {/* Meta info */}
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium text-yellow-400">Title:</span>{" "}
            {note.title}
          </p>
          <p>
            <span className="font-medium text-yellow-400">Uploaded:</span>{" "}
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Counts */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          {!!note.noteImages?.length && (
            <p>🖼️ {note.noteImages.length} Images</p>
          )}
          {!!note.notePdfs?.length && (
            <p>📄 {note.notePdfs.length} PDFs</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

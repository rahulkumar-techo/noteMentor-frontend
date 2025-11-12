"use client";


import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetNotesQuery } from "@/feature/note/noteApi";
import NoteCard from "@/app/dashboard/my-notes/(components)/NoteCard";
import { Spinner } from "@/components/ui/spinner";
import NoteDetailsSkeleton from "@/components/common/skeletonLoader";

export default function NotesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  // 🔹 Fetch notes from API
  const { data, isLoading, isError } = useGetNotesQuery(undefined);
  const notes = data?.data?.notes || [];

  // 🔹 Pagination logic
  const notesPerPage = 8;
  const totalPages = Math.ceil(notes.length / notesPerPage);

  const paginatedNotes = useMemo(() => {
    const start = (page - 1) * notesPerPage;
    return notes.slice(start, start + notesPerPage);
  }, [page, notes]);

  // 🔹 Handle View Details
  const handleView = (id: string) => {
    router.push(`/dashboard/my-notes/${id}`);
  };

  // 🔹 Loading / Error states
  if (isLoading)
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-400">
     <NoteDetailsSkeleton type="cards" count={10} />
      </main>
    );

  if (isError)
    return (
      <main className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load notes.
      </main>
    );

  return (
    <main className="min-h-screen bg-linear-to-b from-black via-[#0a0a0a] to-[#1a1a1a] text-white px-3 sm:px-5 md:px-8 py-8">
      <section className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <header className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#FFD700]">
            My Uploaded Notes
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            View and manage your uploaded notes easily
          </p>
        </header>

        {/* Notes Grid */}
        {notes.length > 0 ? (
          <div
            className="
              grid 
              grid-cols-2 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              gap-3 sm:gap-4 md:gap-5
              justify-center
            "
          >
            {paginatedNotes.map((note: any) => (
              <NoteCard
                key={note._id}
                title={note.title}
                descriptions={note.descriptions}
                thumbnail={
                  typeof note.thumbnail === "object"
                    ? note.thumbnail.secure_url
                    : ""
                }
                createdAt={note.createdAt}
                onView={() => handleView(note._id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center pt-10 text-sm sm:text-base">
            No notes uploaded yet.
          </p>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 sm:gap-5 mt-6 flex-wrap">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10 transition-all duration-200"
            >
              Prev
            </Button>

            <p className="text-gray-300 text-xs sm:text-sm">
              Page {page} of {totalPages}
            </p>

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10 transition-all duration-200"
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}

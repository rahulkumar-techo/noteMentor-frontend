/**
 * NoteCard Component
 * ------------------
 * Displays a single note item with:
 * - Thumbnail OR subject initial
 * - Title, excerpt, subjects
 * - Stats: likes, comments, views
 * - Creation time
 * 
 * This version improves:
 * - Readability
 * - Thumbnail fallback handling
 * - Safe optional data access
 * - Better structure & small reusable helpers
 */


import Image from "next/image";
import Link from "next/link";

export default function NoteCard({ item }: { item: any }) {
  const p = item?.payload || {};

  const likes = p.stats?.likesCount ?? p.stats?.likes?.length ?? 0;
  const comments = p.stats?.commentsCount ?? p.stats?.comments?.length ?? 0;
  const views = p.stats?.viewsCount ?? p.stats?.views?.length ?? 0;

  const subjects = p.subjects || [];
  const subjectLabel = subjects.length > 0 ? subjects.join(", ") : "No Subject";

  const thumbnailOrInitial = p?.thumbnail ? (
    <Image
      src={p.thumbnail}
      alt={p.title || "Thumbnail"}
      width={48}
      height={48}
      className="w-full h-full rounded-md object-cover"
    />
  ) : (
    subjects?.[0]?.[0] ?? "N"
  );

  return (
    <article className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow dark:bg-neutral-900">
      <div className="flex items-start gap-3">
        
        {/* Thumbnail or Initial */}
        <div className="w-12 h-12 rounded-md bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-sm font-medium text-slate-700 dark:text-slate-200 overflow-hidden">
          {thumbnailOrInitial}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs text-slate-500 dark:text-neutral-400">{subjectLabel}</p>

          <h3 className="mt-1 font-semibold text-gray-900 dark:text-white text-lg line-clamp-1">
            {p.title}
          </h3>

          <p className="mt-2 text-sm text-slate-700 dark:text-neutral-300 line-clamp-3">
            {p.excerpt}
          </p>

          {/* Stats */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
            <div className="flex items-center gap-3">
              <span>{likes} ❤</span>
              <span>{comments} 💬</span>
              <span>{views} 👁️</span>
            </div>

            <time className="text-[11px]">
              {new Date(item?.createdAt).toLocaleString()}
            </time>
          </div>
          <Link href={`/note/${p?.noteId}`} className="text-yellow-600 underline cursor-pointer">click to view notes</Link>
        </div>

      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function NoteCard({ item }: { item: any }) {
  const p = item?.payload || {};

  const likes = p.stats?.likesCount ?? p.stats?.likes?.length ?? 0;
  const comments = p.stats?.commentsCount ?? p.stats?.comments?.length ?? 0;
  const views = p.stats?.viewsCount ?? p.stats?.views?.length ?? 0;

  const subjects = p.subjects || [];
  const subjectLabel = subjects.length > 0 ? subjects.join(", ") : "General";

  console.log(p)

  return (
    <article
      className="
        bg-white dark:bg-neutral-900 
        border border-gray-200 dark:border-neutral-800 
        rounded-xl p-5 shadow-sm 
        hover:shadow-md transition-all
      "
    >
      {/* --- Header: Author + Time --- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="
            h-10 w-10 rounded-full overflow-hidden 
            bg-neutral-200 dark:bg-neutral-800 
            flex items-center justify-center text-sm font-medium
            text-neutral-700 dark:text-neutral-300
          ">
            {p.author?.avatar ? (
              <Image
                src={p.author.avatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              (p.authorId?.fullname?.[0] ?? "N")
            )}
          </div>

          <div>
            <p className="font-medium text-sm text-gray-900 dark:text-white">
              {p.author?.name ?? "Unknown User"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {subjectLabel}
            </p>
          </div>
        </div>

        <time className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(item?.createdAt).toLocaleDateString()}
        </time>
      </div>

      {/* --- Body: Title + Desc + Thumbnail --- */}
      <div className="mt-4 flex gap-4 items-start">

        {/* Left Side Text */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white text-base line-clamp-2">
            {p.title}
          </h3>

          {p.excerpt && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {p.excerpt}
            </p>
          )}

          <Link
            href={`/note/${p.noteId}`}
            className="
              mt-2 inline-block text-indigo-600 dark:text-indigo-400 
              text-sm font-medium hover:underline
            "
          >
            View note →
          </Link>
        </div>

        {/* Thumbnail Right Side (LinkedIn style) */}
        {p.thumbnail && (
          <div className="w-32 h-24 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800">
            <Image
              src={p.thumbnail}
              alt="thumbnail"
              width={128}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* --- Stats Row (LinkedIn style) --- */}
      <div className="
        mt-4 flex items-center justify-between 
        text-xs text-gray-600 dark:text-gray-400
        border-t border-gray-200 dark:border-neutral-800 pt-3
      ">
        <div className="flex items-center gap-4">
          <span>👍 {likes}</span>
          <span>💬 {comments}</span>
          <span>👁️ {views}</span>
        </div>

        <span className="text-xs cursor-pointer hover:underline text-indigo-600 dark:text-indigo-400">
          Engage
        </span>
      </div>
    </article>
  );
}

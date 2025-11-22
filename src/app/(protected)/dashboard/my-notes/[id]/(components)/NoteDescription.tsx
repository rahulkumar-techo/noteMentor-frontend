export function NoteDescription({ description, user, createdAt }: any) {
  return (
    <section
      className="
        px-3 md:p-6 rounded-2xl 
        bg-white dark:bg-neutral-900
        border border-gray-300 dark:border-neutral-700
        text-gray-800 dark:text-gray-100
        transition-colors
      "
    >
      <h2 className="text-xl font-semibold text-yellow-500 dark:text-yellow-400">
        About this Note
      </h2>

      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-1">
        {description || "No description provided."}
      </p>

      <div className="text-xs text-gray-600 dark:text-gray-400 mt-4 space-y-1">
        {user && (
          <p>
            👤 Uploaded by:
            <span className="text-gray-800 dark:text-gray-200 ml-1">{user}</span>
          </p>
        )}
        <p>
          🕒 Uploaded on:
          <span className="text-gray-800 dark:text-gray-200 ml-1">
            {new Date(createdAt).toLocaleString()}
          </span>
        </p>
      </div>
    </section>
  );
}

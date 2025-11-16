export function FeedLoadMore({ setLimit }: any) {
  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={() => setLimit((l: number) => l + 12)}
        className="px-5 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
      >
        Load more
      </button>
    </div>
  );
}
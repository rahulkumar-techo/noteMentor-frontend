import { ChangeEvent } from 'react';

export function FeedSearchBar({ search, setSearch, sortBy, setSortBy }: any) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-black/40 p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search notes, questions..."
        className="flex-1 px-4 py-2 rounded-xl border dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />

      <select
        className="px-4 py-2 rounded-xl border dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
        value={sortBy}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
      >
        <option value="latest">Latest</option>
        <option value="popular">Most Popular</option>
      </select>
    </div>
  );
}
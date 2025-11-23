import { useEffect, useMemo, useState } from 'react';
import { useGetFeedQuery } from '@/feature/feed/feedAPi';
import { FeedSearchBar } from './FeedSearchBar';
import { FeedGrid } from './FeedGrid';
import { FeedLoadMore } from './LoadMore';


export default function FeedList({ userId }: { userId?: string }) {
  const [limit, setLimit] = useState(12);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const { data: feed = [], isLoading, isError, refetch } = useGetFeedQuery({ limit, userId });
console.log(feed)
  const items = useMemo(() => {
    let arr = Array.isArray(feed) ? [...feed] : [];

    if (search.trim()) {
      arr = arr.filter((it: any) => it.payload?.title?.toLowerCase().includes(search.toLowerCase()));
    }

    if (sortBy === 'latest') {
      arr.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'popular') {
      arr.sort((a: any, b: any) => (b.payload?.stats?.likes?.length || 0) - (a.payload?.stats?.likes?.length || 0));
    }

    return arr;
  }, [feed, search, sortBy]);

  useEffect(() => {
    const t = setInterval(() => refetch(), 60000);
    return () => clearInterval(t);
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 bg-slate-200 dark:bg-neutral-800 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (isError) return <div className="p-4 text-red-500">Failed to load feed.</div>;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <FeedSearchBar search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} />

      <FeedGrid items={items} />

      <FeedLoadMore setLimit={setLimit} />
    </div>
  );
}

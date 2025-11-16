export default function AdCard({ item }: { item: any }) {
  const p = item.payload;
  return (
    <article className="bg-linear-to-r from-yellow-50 to-white rounded-2xl p-4 border dark:from-yellow-900 dark:to-black">
      <div className="flex gap-3 items-start">
        <div className="flex-1">
          <div className="text-[11px] text-slate-500 dark:text-neutral-400">Sponsored</div>
          <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">{p.title}</h3>
          <p className="mt-2 text-sm text-slate-700 dark:text-neutral-300">{p.body}</p>
        </div>
        {p.mediaUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.mediaUrl} alt="ad" className="w-24 h-24 object-cover rounded-md ml-2" />
        ) : null}
      </div>
    </article>
  );
}
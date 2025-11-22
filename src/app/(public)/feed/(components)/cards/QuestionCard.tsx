export default function QuestionCard({ item }: { item: any }) {
    const p = item.payload;
    return (
        <article className="bg-white rounded-2xl shadow-sm p-4 border dark:bg-neutral-900">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-semibold">
                    Q
                </div>
                <div className="flex-1">
                    <div className="text-xs text-indigo-600 font-medium">Question • {p.difficulty}</div>
                    <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-700 dark:text-neutral-300 line-clamp-3">{p.content}</p>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
                        <div>Attempts: {p.stats?.attempts ?? 0}</div>
                        <time>{new Date(item.createdAt).toLocaleString()}</time>
                    </div>
                </div>
            </div>
        </article>
    );
}
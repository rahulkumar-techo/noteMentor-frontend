
export default function CommentSkeleton() {
  return (
    <div className="animate-pulse p-4 bg-white dark:bg-neutral-900 border rounded-md">
      <div className="flex gap-3">
        <div className="w-8 h-8 bg-muted rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="w-32 h-3 bg-muted rounded" />
          <div className="w-full h-3 bg-muted rounded" />
          <div className="w-2/3 h-3 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export function CTA() {
  return (
    <section className="py-12">
      <div className="rounded-lg p-8 bg-white dark:bg-neutral-900 border dark:border-neutral-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-xl font-semibold">Ready to improve study sessions?</h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Sign up free and convert your first notebook in minutes.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-md">Create account</button>
          <button className="px-4 py-2 border rounded-md">Contact sales</button>
        </div>
      </div>
    </section>
  );
}
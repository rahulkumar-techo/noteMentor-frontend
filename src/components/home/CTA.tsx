export function CTA() {
  return (
    <section className="py-16  transition-colors">
      <div
        className=" rounded-2xl p-8  bg-white dark:bg-neutral-800/60 border border-gray-200 dark:border-neutral-700  shadow-sm hover:shadow-md  transition-all flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div>
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
            Ready to improve study sessions?
          </h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Sign up free and convert your first notebook in minutes.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            className="px-5 py-2.5 rounded-md   bg-yellow-600 hover:bg-yellow-700   text-white text-sm shadow-sm"
          >
            Create account
          </button>

          <button
            className="px-5 py-2.5 rounded-md text-smborder border-gray-300 dark:border-neutral-700bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200hover:bg-gray-100 dark:hover:bg-neutral-800transition-all "
          >
            Contact sales
          </button>
        </div>
      </div>
    </section>
  );
}

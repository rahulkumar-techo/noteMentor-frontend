export function TrustedBy() {
  return (
    <section
      className="
        py-10 
        bg-white dark:bg-neutral-900 
        transition-colors duration-300
      "
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Text */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Trusted by schools, tutors and students across India
        </p>

        {/* Badges */}
        <div className="flex gap-4 sm:gap-6 items-center flex-wrap">
          {["School", "Tutor", "Student"].map((label) => (
            <div
              key={label}
              className="
                h-9 px-4 rounded-lg
                bg-gray-100 dark:bg-neutral-800 
                text-gray-700 dark:text-gray-300
                flex items-center justify-center text-xs font-medium
                border border-gray-200 dark:border-neutral-700
                hover:border-yellow-500 hover:bg-yellow-500/10
                transition-all
              "
            >
              {label}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

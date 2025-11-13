export function TrustedBy() {
  return (
    <section className="py-6">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">Trusted by schools, tutors and students across India</p>
        <div className="flex gap-6 items-center flex-wrap">
          <div className="h-8 w-20 bg-gray-100 dark:bg-neutral-800 rounded flex items-center justify-center text-xs">School</div>
          <div className="h-8 w-20 bg-gray-100 dark:bg-neutral-800 rounded flex items-center justify-center text-xs">Tutor</div>
          <div className="h-8 w-20 bg-gray-100 dark:bg-neutral-800 rounded flex items-center justify-center text-xs">Student</div>
        </div>
      </div>
    </section>
  );
}
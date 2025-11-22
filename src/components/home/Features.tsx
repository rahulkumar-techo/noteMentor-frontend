export function Features() {
  const items = [
    { title: "AI-powered Summaries", desc: "Extract key points + concept maps." },
    { title: "Adaptive Quizzes", desc: "Difficulty adjusts to student level." },
    { title: "Multi-board Support", desc: "CBSE, ICSE, State boards." },
    { title: "Offline Mode", desc: "Study anywhere, sync later." }
  ];

  return (
    <section id="features" className="py-16  transition-colors">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
        Product features
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Built for Indian classrooms.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => (
          <div
            key={it.title}
            className=" rounded-xl p-6  bg-white dark:bg-neutral-800  border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:border-indigo-500 dark:hover:border-indigo-400 transition-all "
          >
            <h4 className="font-semibold text-gray-900 dark:text-white">{it.title}</h4>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

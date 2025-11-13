export function Features() {
  const items = [
    { title: "AI-powered Summaries", desc: "Extract key points + concept maps." },
    { title: "Adaptive Quizzes", desc: "Difficulty adjusts to student level." },
    { title: "Multi-board Support", desc: "CBSE, ICSE, State boards." },
    { title: "Offline Mode", desc: "Study anywhere, sync later." }
  ];

  return (
    <section id="features" className="py-12">
      <h3 className="text-2xl font-bold">Product features</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400">Built for Indian classrooms.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.title} className="rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5 shadow-sm">
            <h4 className="font-semibold">{it.title}</h4>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
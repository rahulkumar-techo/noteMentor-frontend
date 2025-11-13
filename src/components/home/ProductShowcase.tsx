export function ProductShowcase() {
  const cards = [
    { title: "Notebook → Summary", snippet: "Upload → get structured summary." },
    { title: "Auto-Quiz", snippet: "Generate quizzes with answers." },
    { title: "Teacher Dashboard", snippet: "Progress tracking + assignments." }
  ];

  return (
    <section id="showcase" className="py-12">
      <h3 className="text-2xl font-bold">What you can build with NoteMentor</h3>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.title} className="rounded-lg border dark:border-neutral-700 bg-gray-900 text-white p-5 font-mono shadow">
            <div className="text-sm text-indigo-300">{c.title}</div>
            <pre className="mt-3 text-xs">{c.snippet}</pre>
            <div className="mt-4 text-xs text-gray-300">Try with sample notes.</div>
          </div>
        ))}
      </div>
    </section>
  );
}
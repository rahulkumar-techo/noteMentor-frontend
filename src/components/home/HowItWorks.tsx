export function HowItWorks() {
  const steps = [
    { title: "Upload Notes", desc: "Upload images or PDFs." },
    { title: "AI Processing", desc: "OCR + summary + mapping." },
    { title: "Practice & Revise", desc: "Adaptive quizzes + tests." }
  ];

  return (
    <section id="how" className="py-12">
      <div className="grid lg:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div key={s.title} className="bg-white dark:bg-neutral-900 p-6 rounded-lg border dark:border-neutral-700 shadow-sm">
            <div className="text-yellow-600 font-bold text-xl">{String(i + 1).padStart(2, "0")}</div>
            <h4 className="mt-3 font-semibold">{s.title}</h4>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
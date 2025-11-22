export function HowItWorks() {
  const steps = [
    { title: "Upload Notes", desc: "Upload images or PDFs." },
    { title: "AI Processing", desc: "OCR + summary + mapping." },
    { title: "Practice & Revise", desc: "Adaptive quizzes + tests." }
  ];

  return (
    <section
      id="how"
      className="py-16  transition-colors"
    >
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        How it works
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="
              p-6 rounded-xl border 
              bg-white dark:bg-neutral-800 
              border-gray-200 dark:border-neutral-700
              shadow-sm hover:shadow-md 
              hover:border-yellow-500 dark:hover:border-yellow-500
              transition-all cursor-default
            "
          >
            {/* Step Number */}
            <div
              className="
                text-yellow-600 dark:text-yellow-400 
                font-bold text-xl tracking-wide
              "
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Step Title */}
            <h4 className="mt-3 font-semibold text-gray-900 dark:text-white">
              {s.title}
            </h4>

            {/* Step Description */}
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

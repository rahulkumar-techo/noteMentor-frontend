"use client";

import { motion } from "framer-motion";

export function ProductShowcase() {
  const cards = [
    {
      title: "Notebook → Summary",
      snippet: "Upload → get structured summary.",
    },
    {
      title: "Auto-Quiz",
      snippet: "Generate quizzes with answers.",
    },
    {
      title: "Teacher Dashboard",
      snippet: "Progress tracking + assignments.",
    },
  ];

  return (
    <section
      id="showcase"
      className="py-16  transition-colors"
    >
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
        What you can build with NoteMentor
      </h3>

      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Explore the core superpowers of the platform.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            viewport={{ once: true }}
            className="
              group rounded-xl p-6 font-mono
              bg-gray-50 dark:bg-neutral-800  
              border border-gray-200 dark:border-neutral-700 
              shadow-sm hover:shadow-lg hover:border-indigo-500 
              dark:hover:border-indigo-400 transition-all
            "
          >
            {/* Title */}
            <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
              {c.title}
            </div>

            {/* Code Snippet */}
            <pre
              className="
                mt-4 text-xs p-3 rounded-md
                bg-gray-200/60 dark:bg-neutral-700/60 
                text-gray-800 dark:text-gray-200
                border border-gray-300 dark:border-neutral-600
                overflow-x-auto
              "
            >
              {c.snippet}
            </pre>

            {/* Footer text */}
            <div className="mt-4 text-xs text-gray-700 dark:text-gray-400">
              Try with sample notes.
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

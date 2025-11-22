"use client";

import { motion } from "framer-motion";

export function Team() {
  const members = [
    { name: "Asha Patel", role: "Product Lead" },
    { name: "Rohit Kumar", role: "ML Engineer" },
    { name: "Sneha Rao", role: "Education Specialist" },
  ];

  return (
    <section
      id="team"
      className="py-16  transition-colors"
    >
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
        Team behind NoteMentor
      </h3>

      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Passionate people building smarter learning.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            viewport={{ once: true }}
            className="
              rounded-xl p-6 text-center 
              bg-white dark:bg-neutral-800 
              border border-gray-200 dark:border-neutral-700
              shadow-sm hover:shadow-lg 
              hover:border-indigo-500 dark:hover:border-indigo-400
              transition-all
            "
          >
            {/* Avatar */}
            <div
              className="
                mx-auto h-20 w-20 rounded-full 
                bg-indigo-100 dark:bg-indigo-900/40 
                flex items-center justify-center 
                text-2xl font-bold text-indigo-600 dark:text-indigo-400
              "
            >
              {m.name[0]}
            </div>

            <div className="mt-4 font-semibold text-gray-900 dark:text-white">
              {m.name}
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              {m.role}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

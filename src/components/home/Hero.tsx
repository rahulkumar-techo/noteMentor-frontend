"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-16 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* ----- Left Content ----- */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Turn messy notebooks into exam-ready study guides.
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
            NoteMentor processes handwritten + regional notes into clean summaries, 
            quizzes, and exam-ready materials automatically.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-md bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition">
              Try NoteMentor — Free
            </button>

            <button className="px-6 py-3 rounded-md border dark:border-neutral-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
              Learn more
            </button>
          </div>
        </div>

        {/* ----- Right Demo Box ----- */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border bg-white dark:bg-neutral-900 dark:border-neutral-700 shadow-sm p-5">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Live demo — convert notes
            </p>

            <div className="h-56 rounded-md flex items-center justify-center overflow-hidden">

              <Image
                src="/hero.png"
                alt="NoteMentor demo converting handwritten notes"
                width={500}
                height={400}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Upload a picture of notes → auto summary + questions.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

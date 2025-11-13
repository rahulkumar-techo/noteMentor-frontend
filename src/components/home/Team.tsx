export function Team() {
  const members = [
    { name: "Asha Patel", role: "Product Lead" },
    { name: "Rohit Kumar", role: "ML Engineer" },
    { name: "Sneha Rao", role: "Education Specialist" }
  ];

  return (
    <section id="team" className="py-12">
      <h3 className="text-2xl font-bold">Team behind NoteMentor</h3>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {members.map((m) => (
          <div key={m.name} className="rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5 text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-xl font-bold">{m.name[0]}</div>
            <div className="mt-3 font-semibold">{m.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
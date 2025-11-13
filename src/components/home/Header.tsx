export function Header() {
  return (
    <header className="py-6 border-b bg-white dark:bg-neutral-900 dark:border-neutral-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold">NM</div>
          <div>
            <h1 className="text-lg font-semibold">NoteMentor</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Smart notes. Smarter learning.</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
          <a className="hover:underline" href="#features">Features</a>
          <a className="hover:underline" href="#how">How it works</a>
          <a className="hover:underline" href="#showcase">Products</a>
          <a className="hover:underline" href="#team">Team</a>
          <button className="ml-4 rounded-md px-4 py-2 bg-indigo-600 text-white text-sm">Get Started</button>
        </nav>

        <div className="md:hidden">
          <button className="text-sm px-3 py-2 border rounded dark:border-neutral-700">Menu</button>
        </div>
      </div>
    </header>
  );
}
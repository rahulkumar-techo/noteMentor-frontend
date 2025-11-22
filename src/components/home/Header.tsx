"use client";


export function Header() {
  return (
    <header
      className="
        py-6 border-b 
        bg-white dark:bg-neutral-900 
        border-gray-200 dark:border-neutral-800
        transition-all duration-300
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div
            className="
              h-10 w-10 rounded-md 
              bg-indigo-600 dark:bg-indigo-500 
              flex items-center justify-center 
              text-white font-bold shadow-sm
            "
          >
            NM
          </div>

          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              NoteMentor
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Smart notes. Smarter learning.
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="#features">
            Features
          </a>
          <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="#how">
            How it works
          </a>
          <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="#showcase">
            Products
          </a>
          <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="#team">
            Team
          </a>

          {/* CTA */}
          <button
            className="
              ml-4 rounded-md px-4 py-2 
              bg-indigo-600 dark:bg-indigo-500 
              hover:bg-indigo-700 dark:hover:bg-indigo-600 
              text-white shadow-sm
            "
          >
            Get Started
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="
              text-sm px-3 py-2 rounded-md
              border border-gray-300 dark:border-neutral-700
              text-gray-700 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-neutral-800
              transition-colors
            "
          >
            Menu
          </button>
        </div>

      </div>
    </header>
  );
}

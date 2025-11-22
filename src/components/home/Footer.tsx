const Footer = () => {
  return (
    <footer className="mt-20 border-t bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-10 sm:px-8 lg:px-10">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className=" h-10 w-10 rounded-md  bg-yellow-600 dark:bg-yellow-500 flex items-center justify-center  text-white font-bold shadow-sm "
            >
              NM
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">NoteMentor</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Helping students learn smarter.
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="text-sm text-gray-600 dark:text-gray-400 flex gap-6">
            <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
              Docs
            </a>
            <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
              Privacy
            </a>
            <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
              Terms
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} NoteMentor — Built for Indian students and teachers.
        </div>
      </div>
    </footer>
  );
};
export default Footer;

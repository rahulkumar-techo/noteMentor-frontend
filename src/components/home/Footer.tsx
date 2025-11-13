import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
       <footer className="mt-16 border-t bg-white dark:bg-neutral-900 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-yellow-600 flex items-center justify-center text-white font-bold">NM</div>
              <div>
                <div className="font-semibold">NoteMentor</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Helping students learn smarter.</div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 flex gap-6">
            <a className="hover:underline">Docs</a>
            <a className="hover:underline">Privacy</a>
            <a className="hover:underline">Terms</a>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} NoteMentor — Built for Indian students and teachers.</div>
      </div>
    </footer>
  )
}

export default Footer